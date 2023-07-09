"use client";

import { FC, useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

interface TextEditorProps {}

const TextEditor: FC<TextEditorProps> = ({}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState<string>("**Hello world!!!**");

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // close the markdown edit mode if user click on any part outside of editor
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor w-full" ref={ref}>
        <MDEditor value={value} onChange={(e) => setValue(e || "")} />
      </div>
    );
  }
  return (
    <div className="text-editor w-full card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
