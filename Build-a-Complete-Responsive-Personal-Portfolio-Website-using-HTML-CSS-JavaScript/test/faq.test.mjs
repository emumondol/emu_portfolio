import assert from 'node:assert/strict';
import test from 'node:test';
import { getPortfolioFaqReply } from '../faq.mjs';

test('answers skills questions with Emu-provided percentages', () => {
  const reply = getPortfolioFaqReply("What are Emu's skills?");
  assert.match(reply, /HTML 85%/);
  assert.match(reply, /JavaScript 70%/);
  assert.match(reply, /Java 75%/);
  assert.match(reply, /CSS 80%/);
  assert.match(reply, /C 85%/);
});

test('answers education questions in Bangla', () => {
  const reply = getPortfolioFaqReply('এমদাদুল কোথায় পড়াশোনা করে?');
  assert.match(reply, /Daffodil International University/);
  assert.match(reply, /৩১ ডিসেম্বর ২০২৮/);
});

test('answers Banglish questions about education', () => {
  const reply = getPortfolioFaqReply('Emu kothay porashona kore?');
  assert.match(reply, /Daffodil International University/);
  assert.match(reply, /December 31, 2028/);
});

test('answers certificate questions without inventing credentials', () => {
  const reply = getPortfolioFaqReply('What certificates does he have?');
  assert.match(reply, /Intellipaat Free SQL Certification Course/);
  assert.match(reply, /Day Long Seminar on Career Planning Roadmap/);
});

test('answers project questions with the verified repository status', () => {
  const reply = getPortfolioFaqReply('What projects are on his GitHub?');
  assert.match(reply, /no public repositories/i);
  assert.match(reply, /not as completed projects/i);
});

test('declines unrelated questions in English and Bangla', () => {
  assert.match(getPortfolioFaqReply('What is the capital of Japan?'), /only answer questions about Emdadul’s portfolio/i);
  assert.match(getPortfolioFaqReply('ঢাকার আবহাওয়া কেমন?'), /শুধু এমদাদুলের পোর্টফোলিও/);
});

test('combines multiple portfolio FAQ answers', () => {
  const reply = getPortfolioFaqReply('Tell me about his education and certificates');
  assert.match(reply, /Daffodil International University/);
  assert.match(reply, /Intellipaat Free SQL Certification Course/);
});

test('declines unknown general technical questions', () => {
  assert.match(getPortfolioFaqReply('Explain recursion with an example'), /only answer questions about Emdadul’s portfolio/i);
});

test('declines generic questions that mention portfolio topics but are not about Emu', () => {
  assert.match(getPortfolioFaqReply('What is a university?'), /only answer questions about Emdadul’s portfolio/i);
  assert.match(getPortfolioFaqReply('How do I build a portfolio?'), /only answer questions about Emdadul’s portfolio/i);
});

test('answers direct questions about Emu despite general-question wording', () => {
  assert.match(getPortfolioFaqReply('How can I contact Emu?'), /emdadulhaqueemu2@gmail.com/);
});
