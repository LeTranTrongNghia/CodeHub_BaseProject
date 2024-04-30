// CodeEditorWrapper.jsx

import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Output from "./output";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "./constants";
import ProblemDescription from "./ProblemDescription";

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
      <div className="w-3/5 bg-gray-800 text-gray-300 p-4 rounded-md  mr-4">
        <ProblemDescription />
      </div>

      <div className="w-2/5 bg-gray-800 text-gray-300 p-4 rounded-md">
        <LanguageSelector language={language} onSelect={onSelect} />
        <Editor
          height="58vh"
          defaultLanguage={language}
          defaultValue={CODE_SNIPPETS[language]}
          theme="vs-dark"
          onMount={(editor) => {
            editorRef.current = editor;
          }}
          value={value}
          onChange={(value) => setValue(value)}
        />
        <Output editorRef={editorRef} language={language} />
      </div>
    </div>
  );
};

export default CodeEditorWrapper;
