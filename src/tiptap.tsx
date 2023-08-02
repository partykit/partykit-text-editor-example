// src/Tiptap.jsx
import * as React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import * as Y from "yjs";
import Provider from "y-partykit/provider";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";

import { getBaseExtensions } from "./extensions";

const doc = new Y.Doc();

const provider = new Provider(
  "localhost:1999",
  "y-partykit-text-editor-example",
  doc
);

const Tiptap = () => {
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
          color: "#f783ac",
        },
      }),
    ],
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
