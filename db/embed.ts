import { openSync } from "@op-engineering/op-sqlite";

// Convert libsql:// to https:// for the Turso URL
const syncUrl = process.env.EXPO_PUBLIC_TURSO_DATABASE_URL?.replace(
  "libsql://",
  "https://"
)!;

const db = openSync({
  name: "local.db",
  url: syncUrl,
  authToken: process.env.EXPO_PUBLIC_TURSO_AUTH_TOKEN,
});

// Function to sync a read-only replica of the remote db
async function exportDb() {
  console.log("Starting sync...");
  const startTime = Date.now();
  try {
    db.sync();
    const elapsed = Date.now() - startTime;
    console.log(`Sync successful in ${elapsed}ms`);
  } catch (e) {
    const elapsed = Date.now() - startTime;
    console.log(`Error syncing, elapsed time: ${elapsed}ms`, e);
  }
}

console.log("Raw Sync URL:", process.env.EXPO_PUBLIC_TURSO_DATABASE_URL);
console.log("Modified Sync URL:", syncUrl);
console.log("Auth Token exists:", !!process.env.EXPO_PUBLIC_TURSO_AUTH_TOKEN);

exportDb().catch(console.error);
