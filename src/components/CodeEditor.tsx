'use client';
import { Editor } from '@monaco-editor/react';

interface CodeEditorProps {
  existingCode: string;
  onChange: (value: string) => void;
}

  // function handleEditorChange(value: string | undefined) {
  //   // Debounce Function
  //   debounce(() => saveToDatabase(code))
  // }

export function CodeEditor({ existingCode, onChange }: CodeEditorProps) {
  return (
    <Editor
      height='100%'
      defaultLanguage='javascript'
      value={existingCode}
      onChange={(value) => onChange(value || '')}
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
