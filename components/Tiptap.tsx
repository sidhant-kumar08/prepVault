'use client';

import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { forwardRef, useImperativeHandle, useState } from 'react';
import axios from 'axios';

const RichTextEditor = forwardRef((_, ref) => {
  const [loading, setLoading] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Underline,
      Italic,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: '<p>Write here....</p>',
  });

  useImperativeHandle(ref, () => editor, [editor]);

  if (!editor) return null;

  // Function to enhance text using AI
  const handleEnhanceText = async () => {
    const text = editor.getText();
    if (!text.trim()) return;

    setLoading(true);

    try {
      const response = await axios.post('/api/gemini', { userPrompt: text });
      const enhancedText = response.data.response;

      if (enhancedText) {
        editor.commands.setContent(enhancedText);
      }
    } catch (error) {
      console.error('Error enhancing text:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 dark:bg-neutral-700 shadow-md bg-white border border-neutral-400 rounded-lg">
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`px-3 py-1.5 dark:text-neutral-400 rounded hover:bg-gray-200 dark:bg-neutral-700 shadow-md bg-white border border-neutral-400 ${
            editor.isActive('bold') ? 'bg-gray-300 text-black' : 'text-gray-700'
          }`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`px-3 py-1.5 dark:text-neutral-400 rounded hover:bg-gray-200 dark:bg-neutral-700 shadow-md bg-white border border-neutral-400 ${
            editor.isActive('italic') ? 'bg-gray-300 text-black' : 'text-gray-700'
          }`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={`px-3 py-1.5 dark:text-neutral-400 rounded hover:bg-gray-200 dark:bg-neutral-700 shadow-md bg-white border border-neutral-400 ${
            editor.isActive('underline') ? 'bg-gray-300 text-black' : 'text-gray-700'
          }`}
        >
          Underline
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1.5 dark:text-neutral-400 rounded hover:bg-gray-200 dark:bg-neutral-700 shadow-md bg-white border border-neutral-400 ${
            editor.isActive('bulletList') ? 'bg-gray-300 text-black' : 'text-gray-700'
          }`}
        >
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1.5 dark:text-neutral-400 rounded hover:bg-gray-200 dark:bg-neutral-700 shadow-md bg-white border border-neutral-400 ${
            editor.isActive('orderedList') ? 'bg-gray-300 text-black' : 'text-gray-700'
          }`}
        >
          Ordered List
        </button>

        {/* Enhance Button */}
        <button
          onClick={handleEnhanceText}
          className="px-3 py-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border rounded shadow-md hover:opacity-80"
          disabled={loading}
        >
          {loading ? "Refactoring..." : "✨ Refactor using AI"}
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent
        className="prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none"
        editor={editor}
      />
    </div>
  );
});

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
