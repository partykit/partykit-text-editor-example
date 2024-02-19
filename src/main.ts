import type * as Party from "partykit/server";
import { onConnect } from "y-partykit";

import { createClient } from "@supabase/supabase-js";
import { TiptapTransformer } from "@hocuspocus/transformer";
import { getBaseExtensions } from "./extensions";

import * as Y from "yjs";

// Create a single supabase client for interacting with your database

const transformer = TiptapTransformer.extensions(getBaseExtensions());
const rootFragmentField = "default";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string,
  { auth: { persistSession: false } }
);

export default class implements Party.Server {
  constructor(public room: Party.Room) {}
  async onConnect(connection: Party.Connection) {
    const party = this.room;

    await onConnect(connection, this.room, {
      async load() {
        // console.log("trying to load from database...");

        const { data, error } = await supabase
          .from("documents")
          .select("document")
          .eq("name", party.id)
          .maybeSingle();

        if (error) {
          console.error("failed to load from database:", error);
        }

        if (data) {
          // console.log("receieved intial data from database");
          const doc = transformer.toYdoc(data.document, rootFragmentField);
          return doc;
        } else {
          // console.log("no initial data, creating new doc");
          return new Y.Doc();
        }
      },
      callback: {
        handler: async (doc) => {
          // console.log("saving to database...");
          const json = transformer.fromYdoc(doc, rootFragmentField);

          const { data, error } = await supabase.from("documents").upsert(
            {
              name: party.id,
              document: json,
            },
            { onConflict: "name" }
          );

          if (error) {
            console.error("error", error);
          }

          // console.log("saved to database");
        },
      },
    });
  }
}
