// src/Tiptap.jsx
import * as React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import useYProvider from "y-partykit/react";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";

import { getBaseExtensions } from "./extensions";

declare const PARTYKIT_HOST: string;

export default function Tiptap() {
  const provider = useYProvider({
    host: PARTYKIT_HOST,
    room: "y-partykit-text-editor-example", // replace with your own document name
    // // optionally, y-websocket options
    // options: {

    // },
  });

  const editor = useEditor({
    extensions: [
      ...getBaseExtensions(),
      Collaboration.configure({
        document: provider.doc,
      }),
      // Register the collaboration cursor extension
      CollaborationCursor.configure({
        provider: provider,
        user: {
          name: provider.id,
          color: "#f783bc",
        },
      }),
    ],
  });

  return <EditorContent style={{ border: "solid" }} editor={editor} />;
}
