import { createClient } from "@sanity/client";
import moment from "moment";
export const client = createClient({
  projectId: "pjmjgioq",
  dataset: "production",
  apiVersion: `v${moment(new Date()).format("YYYY-MM-DD")}`,
  useCdn: false,
  token: 'skpBFk1mZo9EewAnrgaXZ9cyr3vm53xqshSACAXhtsVdUpu7JNsj7eq9uh8SPZ2OFZRsWOd8oC3L9HkWH8vcg17BlyXwv9uLxt63vhK5Va2Wq8ojpxNCWFF5CLgntFZF4To4Bu4YH6wdBUy7eUzFkHMhBTfvenGEdOciKcjMPOlOYwiXv1yR'
});