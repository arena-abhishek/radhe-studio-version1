import test from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveRoute,
  getRouteMeta,
  filterPortfolioItems,
  validateInquiry,
  buildInquirySummary,
  buildWhatsAppDeepLink,
  calculateMainScrollProgress,
} from './inquiry';
import { mediaManifest } from '../config/mediaManifest';

test('resolveRoute maps known paths and falls back to root', () => {
  assert.equal(resolveRoute('/'), '/');
  assert.equal(resolveRoute('/about/'), '/about');
  assert.equal(resolveRoute('/services'), '/services');
  assert.equal(resolveRoute('/portfolio'), '/portfolio');
  assert.equal(resolveRoute('/contact'), '/contact');
  assert.equal(resolveRoute('/unknown-route'), '/');
});

test('getRouteMeta returns unique page titles and descriptions', () => {
  const home = getRouteMeta('/');
  const contact = getRouteMeta('/contact');
  assert.match(home.title, /Radhe Studio/);
  assert.notEqual(home.title, contact.title);
  assert.ok(contact.description.length >= 60);
});

test('filterPortfolioItems filters accurately by category', () => {
  const all = filterPortfolioItems(mediaManifest.portfolio, 'All');
  assert.equal(all.length, mediaManifest.portfolio.length);

  const weddings = filterPortfolioItems(mediaManifest.portfolio, 'Weddings');
  assert.ok(weddings.length > 0);
  assert.ok(weddings.every((item) => item.category === 'Weddings'));
});

test('validateInquiry catches missing or invalid fields without silent fallback', () => {
  const emptyErrors = validateInquiry({
    name: '',
    phone: '123',
    eventType: '',
    eventDate: '',
    location: '',
    message: 'hi',
  });
  assert.ok(emptyErrors.name);
  assert.ok(emptyErrors.phone);
  assert.ok(emptyErrors.eventType);
  assert.ok(emptyErrors.eventDate);
  assert.ok(emptyErrors.location);
  assert.ok(emptyErrors.message);

  const refDate = new Date('2026-11-19T00:00:00');
  const pastErrors = validateInquiry(
    {
      name: 'Aarav Patel',
      phone: '+91 98765 43210',
      eventType: 'Wedding Photography',
      eventDate: '2026-11-01',
      location: 'Tharad',
      message: 'Looking for calm documentary wedding coverage.',
    },
    refDate,
  );
  assert.ok(pastErrors.eventDate);

  const validErrors = validateInquiry(
    {
      name: 'Aarav Patel',
      phone: '+91 98765 43210',
      eventType: 'Wedding Photography',
      eventDate: '2026-12-15',
      location: 'Tharad',
      message: 'Looking for calm documentary wedding coverage for two days.',
    },
    refDate,
  );
  assert.deepEqual(validErrors, {});
});

test('buildInquirySummary formats user input into editable text', () => {
  const summary = buildInquirySummary({
    name: 'Meera Shah',
    phone: '9825012345',
    eventType: 'Pre-Wedding Photography',
    eventDate: '2026-12-20',
    location: 'Gujarat',
    message: 'Interested in a relaxed morning portrait session.',
  });
  assert.match(summary, /Radhe Studio/);
  assert.match(summary, /Pre-Wedding Photography/);
  assert.match(summary, /Meera Shah/);
  assert.match(summary, /2026-12-20/);
});

test('buildWhatsAppDeepLink stays null unless number is verified and provided', () => {
  assert.equal(buildWhatsAppDeepLink('Hello', null, false), null);
  assert.equal(buildWhatsAppDeepLink('Hello', '919876543210', false), null);
  assert.equal(buildWhatsAppDeepLink('Hello', null, true), null);

  const link = buildWhatsAppDeepLink('Hello Radhe Studio', '+91 98765 43210', true);
  assert.equal(link, 'https://wa.me/919876543210?text=Hello%20Radhe%20Studio');
});

test('calculateMainScrollProgress tracks main content bounds and clamps cleanly', () => {
  assert.equal(
    calculateMainScrollProgress({
      scrollY: 0,
      mainOffsetTop: 64,
      mainHeight: 2836,
      viewportHeight: 900,
    }),
    0,
  );
  assert.equal(
    calculateMainScrollProgress({
      scrollY: 1000,
      mainOffsetTop: 64,
      mainHeight: 2836,
      viewportHeight: 900,
    }),
    0.5,
  );
  assert.equal(
    calculateMainScrollProgress({
      scrollY: 2500,
      mainOffsetTop: 64,
      mainHeight: 2836,
      viewportHeight: 900,
    }),
    1,
  );
  assert.equal(
    calculateMainScrollProgress({
      scrollY: 100,
      mainOffsetTop: 64,
      mainHeight: 600,
      viewportHeight: 900,
    }),
    0,
  );
});
