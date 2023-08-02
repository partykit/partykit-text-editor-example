import { createRoot } from "react-dom/client";
import * as React from "react";
import Tiptap from "./tiptap";

const root = document.getElementById("app")!;
createRoot(root).render(<Tiptap />);
