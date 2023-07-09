"use client";

import { useState, useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./Preview";
import bundle from "@/bundler";
import Resizable from "./Resizable";

export default function CodeCell() {
  const [input, setInput] = useState("");
  const [err, setErr] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    // debouncing: execute bundle process only after 1s user stops typing
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div className="mb-20 w-full">
      <Resizable direction="vertical">
        <div className="w-full h-full flex flex-row items-center justify-center">
          <Resizable direction="horizontal">
            <CodeEditor
              initialValue="const a = 1;"
              onChange={(value) => setInput(value)}
            />
          </Resizable>

          <Preview code={code} err={err} />
        </div>
      </Resizable>
    </div>
  );
}
