import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "pjmjgioq",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});