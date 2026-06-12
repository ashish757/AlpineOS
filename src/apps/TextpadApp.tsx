import { useState } from 'react';

export const TextpadApp = () => {
  const [content, setContent] = useState('');

  return (
    <div className="flex flex-col h-full bg-white text-black">
      <div className="border-b border-gray-300 p-2 bg-gray-100 flex gap-2">
        <button className="px-3 py-1 bg-white border border-gray-300 rounded shadow-sm text-sm hover:bg-gray-50">Save</button>
        <button className="px-3 py-1 bg-white border border-gray-300 rounded shadow-sm text-sm hover:bg-gray-50">Clear</button>
      </div>
      <textarea
        className="flex-1 w-full p-4 resize-none outline-none"
        placeholder="Type your notes here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
};

export default TextpadApp;
