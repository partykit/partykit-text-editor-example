## PartyKit example: collaborative text editor

This example app features a collaborative text editor built with [Yjs](https://yjs.dev/), [Tiptap](https://tiptap.dev/) and [Supabase](https://supabase.com/).

## Getting Started

First, copy the `.env.example` file to `.env` in the project root.

```bash
cp .env.example .env
```

Then, create a new Supabase project and open the created `.env` file to fill in the missing environment variables with the new project information.

Then, run the development server:

```bash
npm install
npm run dev
```

This will start the PartyKit development server at port **1999**.
ś
Open [http://localhost:1999](http://localhost:1999) with your browser to see the result.

![text editor demo](./text-editor.gif)