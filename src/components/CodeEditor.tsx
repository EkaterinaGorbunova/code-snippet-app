'use client';
import { Editor } from '@monaco-editor/react';
import { useState, useEffect } from 'react';

interface CodeEditorProps {
  existingCode: string;
  onChange: (value: string) => void;
  onAutoSave?: (value: string) => Promise<void>;
}

export function CodeEditor({ existingCode, onChange, onAutoSave }: CodeEditorProps) {
  const [code, setCode] = useState(existingCode);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onAutoSave) {
        onAutoSave(code);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [code, onAutoSave]);

  const handleEditorChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    onChange(newCode);
  };

  return (
    <Editor
      height='100%'
      defaultLanguage='javascript'
      value={code}
      onChange={handleEditorChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        automaticLayout: true,
      }}
    />
  );
}
