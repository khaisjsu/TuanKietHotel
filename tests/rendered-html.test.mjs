import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("homepage contains the real retreat experience", async () => {
  const page = await read("app/page.tsx");
  assert.match(page, /Tuan Kiet Retreat/i);
  assert.match(page, /A quieter way/i);
  assert.match(page, /Pine View Suite/i);
  assert.match(page, /Book your stay/i);
  assert.doesNotMatch(page, /Your site is taking shape|codex-preview|react-loading-skeleton/i);
});

test("booking flow validates and persists requests", async () => {
  const form = await read("app/booking-form.tsx");
  const route = await read("app/api/bookings/route.ts");
  assert.match(form, /fetch\("\/api\/bookings"/);
  assert.match(form, /Request to book/);
  assert.match(route, /getDb\(\)/);
  assert.match(route, /checkOut/);
  assert.match(route, /allowedRooms/);
});

test("private family dashboard uses platform authentication", async () => {
  const admin = await read("app/admin/bookings/page.tsx");
  const auth = await read("app/chatgpt-auth.ts");
  assert.match(admin, /requireChatGPTUser/);
  assert.match(admin, /chatGPTSignOutPath/);
  assert.match(auth, /oai-authenticated-user-email/);
  assert.match(auth, /safeRelativeReturnPath/);
});

test("deployment metadata and database migration are present", async () => {
  const layout = await read("app/layout.tsx");
  const host = await read(".openai/hosting.json");
  const migration = await read("drizzle/0001_low_blue_blade.sql");
  assert.match(layout, /Tuan Kiet Retreat \| A quieter stay in Da Lat/);
  assert.match(host, /"d1":\s*"DB"/);
  assert.match(migration, /CREATE INDEX/);
});
