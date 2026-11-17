import test from 'node:test';
import assert from 'node:assert/strict';
import { parseBRL, formatBRL } from '../src/lib/money.js';

test('parseBRL: valor simples', () => {
  assert.equal(parseBRL('R$ 10,00'), 1000);
  assert.equal(parseBRL('R$ 1,99'), 199);
});

test('parseBRL: milhar com ponto', () => {
  assert.equal(parseBRL('R$ 1.299,90'), 129990);
  assert.equal(parseBRL('R$ 12.345,67'), 1234567);
});

test('parseBRL: sem centavos', () => {
  assert.equal(parseBRL('R$ 100'), 10000);
  assert.equal(parseBRL('R$ 1.500'), 150000);
});

test('parseBRL: espaço não separável (U+00A0)', () => {
  assert.equal(parseBRL('R$ 1.299,90'), 129990);
});

test('parseBRL: entradas inválidas retornam null', () => {
  assert.equal(parseBRL(null), null);
  assert.equal(parseBRL(''), null);
  assert.equal(parseBRL('abc'), null);
  assert.equal(parseBRL('R$ --10,00'), null);
});

test('formatBRL: roundtrip', () => {
  assert.equal(formatBRL(129990), 'R$ 1.299,90');
  assert.equal(formatBRL(1000), 'R$ 10,00');
  assert.equal(formatBRL(199), 'R$ 1,99');
});
