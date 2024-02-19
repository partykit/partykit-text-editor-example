// src/Tiptap.jsx
import { useEditor, EditorContent } from "@tiptap/react";
import useYProvider from "y-partykit/react";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import StarterKit from "@tiptap/starter-kit";

// 5 bright colors
const colours = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF"];

// Pick a random color from the list
// This is just for demonstration purposes
const MY_COLOR = colours[Math.floor(Math.random() * colours.length)];

export default function Tiptap() {
  const provider = useYProvider({
    room: "y-partykit-text-editor-example", // replace with your own document name
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // The Collaboration extension comes with its own history handling
        history: false,
      }),
      Collaboration.configure({
        document: provider.doc,
      }),
      // Register the collaboration cursor extension
      CollaborationCursor.configure({
        provider: provider,
        user: {
          name: provider.id,
          color: MY_COLOR,
        },
      }),
    ],
  });

  return <EditorContent style={{ border: "solid" }} editor={editor} />;
}
