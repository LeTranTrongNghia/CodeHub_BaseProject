// CodeEditorWrapper.jsx

import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Output from "./output";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "./constants";

const CodeEditorWrapper = () => {
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const editorRef = useRef();

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setValue(CODE_SNIPPETS[language]);
    }
  }, [language]);

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-400 px-6 py-8">
      <div className="w-2/3 bg-gray-800 text-gray-300 p-4 rounded-md  mr-4">
        <LanguageSelector language={language} onSelect={onSelect} />
        <Editor
          height="75vh"
          defaultLanguage={language}
          defaultValue={CODE_SNIPPETS[language]}
          theme="vs-dark"
          onMount={(editor) => {
            editorRef.current = editor;
          }}
          value={value}
          onChange={(value) => setValue(value)}
        />
      </div>

      <div className="w-1/3 bg-gray-800 text-gray-300 p-4 rounded-md">
        <Output editorRef={editorRef} language={language} />
      </div>
    </div>
  );
};

export default CodeEditorWrapper;
