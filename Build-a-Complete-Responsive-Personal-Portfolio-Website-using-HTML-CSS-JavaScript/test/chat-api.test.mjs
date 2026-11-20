import assert from 'node:assert/strict';
import test from 'node:test';
import chat from '../api/chat.mjs';

const originalFetch = globalThis.fetch;
const originalConsoleError = console.error;

const withEnvironment = async (values, run) => {
  const previous = new Map(Object.keys(values).map(key => [key, process.env[key]]));
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    await run();
  } finally {
    for (const [key, value] of previous) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
};

const request = (body, method = 'POST') => new Request('https://portfolio.example/api/chat', {
  method,
  headers: { 'Content-Type': 'application/json' },
  ...(body === undefined ? {} : { body: JSON.stringify(body) })
});

test('rejects methods other than POST', async () => {
  const response = await chat.fetch(request(undefined, 'GET'));
  assert.equal(response.status, 405);
  assert.equal(response.headers.get('Allow'), 'POST');
});

test('returns a clear configuration error when the API key is missing', async () => {
  await withEnvironment({ GEMINI_API_KEY: undefined }, async () => {
    const response = await chat.fetch(request({ message: 'Hello' }));
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { error: 'AI is not configured' });
  });
});

test('rejects malformed, empty, and oversized requests', async () => {
  await withEnvironment({ GEMINI_API_KEY: 'test-key' }, async () => {
    const malformed = await chat.fetch(new Request('https://portfolio.example/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{'
    }));
    const empty = await chat.fetch(request({ message: '  ' }));
    const oversized = await chat.fetch(request({ message: 'x'.repeat(1001) }));
    assert.equal(malformed.status, 400);
    assert.equal(empty.status, 400);
    assert.equal(oversized.status, 400);
  });
});

test('calls Gemini with bounded history and returns its reply', async () => {
  await withEnvironment({ GEMINI_API_KEY: 'test-key', GEMINI_MODEL: 'gemini-test' }, async () => {
    globalThis.fetch = async (url, options) => {
      assert.match(url, /models\/gemini-test:generateContent$/);
      assert.equal(options.headers['x-goog-api-key'], 'test-key');
      const payload = JSON.parse(options.body);
      assert.equal(payload.contents.length, 2);
      return Response.json({
        candidates: [{ content: { parts: [{ text: 'Hello from Gemini.' }] } }]
      });
    };

    const response = await chat.fetch(request({
      message: 'Hello',
      history: [{ role: 'user', text: 'Earlier question' }, { role: 'invalid', text: 'Ignore me' }]
    }));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.deepEqual(await response.json(), { reply: 'Hello from Gemini.' });
  });
});

test('returns a provider error instead of a success-shaped response', async () => {
  await withEnvironment({ GEMINI_API_KEY: 'test-key' }, async () => {
    globalThis.fetch = async () => Response.json({ error: 'provider error' }, { status: 429 });
    console.error = () => {};
    const response = await chat.fetch(request({ message: 'Hello' }));
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { error: 'AI provider request failed' });
  });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  console.error = originalConsoleError;
});
