import type { PartyKitServer } from "partykit/server";
import { onConnect } from "y-partykit";

import { createClient } from "@supabase/supabase-js";
import { TiptapTransformer } from "@hocuspocus/transformer";
import { getBaseExtensions } from "./extensions";

import * as Y from "yjs";

// Create a single supabase client for interacting with your database

const transformer = TiptapTransformer.extensions(getBaseExtensions());
const rootFragmentField = "default";

export default {
  async onConnect(conn, room) {
    const supabase = createClient(
      "https://kgbcnztvpzpdunqeljum.supabase.co",
      room.env.SUPABASE_KEY as string,
      { auth: { persistSession: false } }
    );
    await onConnect(conn, room, {
      async load() {
        const { data, error } = await supabase
          .from("documents")
          .select("document")
          .eq("name", room.id)
          .single();

        if (error) {
          console.error("ERROR", error);
        }

        if (data) {
          const doc = transformer.toYdoc(data.document, rootFragmentField);
          return doc;
        } else {
          return new Y.Doc();
        }
      },
      callback: {
        handler: async (doc) => {
          doc;
          const json = transformer.fromYdoc(doc, rootFragmentField);
          console.log(JSON.stringify(json.content, null, 2));

          const { data, error } = await supabase.from("documents").upsert(
            {
              name: room.id,
              document: json,
            },
            { onConflict: "name" }
          );

          if (error) {
            console.error("ERROR", error);
          }

          console.log("DATA", data);
        },
      },
    });
  },
} satisfies PartyKitServer;
