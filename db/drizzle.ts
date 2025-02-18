import { drizzle } from "drizzle-orm/op-sqlite";
import {
  type DB,
  moveAssetsDatabase,
  openSync,
} from "@op-engineering/op-sqlite";

export const remoteDb = openSync({
  name: "local.db",
  url: process.env.EXPO_PUBLIC_TURSO_DATABASE_URL!,
  authToken: process.env.EXPO_PUBLIC_TURSO_AUTH_TOKEN!,
  syncInterval: 1000,
});

try {
  // Make the initial sync from the remote to the local database
  remoteDb.sync();
} catch (e) {
  console.log("Error syncing database", e);
}

export const db = drizzle(remoteDb);
