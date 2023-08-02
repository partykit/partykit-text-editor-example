import type { Extension } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

/** Shared extensions for client and server */
export function getBaseExtensions(): Extension[] {
  return [
    StarterKit.configure({
      // The Collaboration extension comes with its own history handling
      history: false,
    }),
  ];
}
