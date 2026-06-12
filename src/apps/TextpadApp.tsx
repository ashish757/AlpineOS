import { useState } from 'react';

export const TextpadApp = () => {
  const [content, setContent] = useState('');

  return (
    <div className="flex flex-col h-full bg-white text-black">
      <textarea
        className="flex-1 text-xl w-full p-2 resize-none outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
};

export default TextpadApp;
