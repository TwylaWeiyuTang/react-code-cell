import { FC, useRef } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import monaco from "monaco-editor";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import MonacoJSXHighlighter from "monaco-jsx-highlighter";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    const highlighter = new MonacoJSXHighlighter(
      //@ts-ignore
      window.monaco,
      parse,
      traverse,
      monacoEditor
    );

    // const highlighterDisposeFunc =
    //   highlighter.highlightOnDidChangeModelContent(100);
    // highlighterDisposeFunc();

    // let tid = null;
    // let debounceTime = 100;

    // monacoEditor.onDidChangeModelContent(() => {
    //   onChange(getValue());
    //   clearTimeout(tid);
    //   tid = setTimeout(() => {
    //     highlighter.highlightCode();
    //   }, debounceTime);
    // });

    highlighter.highlightOnDidChangeModelContent();
  };

  const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();

    // format the value
    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");

    editorRef.current.setValue(formatted);
  };

  return (
    <div className="group relative w-[calc(100%-10px)] h-full editor-wrapper">
      <button
        onClick={onFormatClick}
        className="button-format is-primary is-small absolute top-1 right-1 z-20 opacity-0 transition-opacity group-hover:opacity-100 bg-orange-500 px-6 py-2 text-slate-50"
      >
        Format
      </button>
      <MonacoEditor
        value={initialValue}
        editorDidMount={onEditorDidMount}
        height={"100%"}
        language="javascript"
        theme="dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
