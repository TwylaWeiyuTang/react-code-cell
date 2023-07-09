"use client";

import TextEditor from "@/components/TextEditor";
import CodeCell from "@/components/code-cell";
import { Provider } from "react-redux";
import { store } from "@/state";

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <main className="flex min-h-screen flex-col items-center justify-between p-24 w-full">
          {/* <CodeCell /> */}
          <TextEditor />
        </main>
      </Provider>
    </>
  );
}
