import { useState } from 'react';

export const TerminalApp = () => {
  const [history, setHistory] = useState<string[]>(['Welcome to AlpineOS Terminal v1.0.0', 'Type "help" for a list of available commands.']);
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      let response = '';

      if (cmd === 'help') {
        response = 'Available commands: help, echo, clear, date, whoami';
      } else if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (cmd.startsWith('echo ')) {
        response = cmd.substring(5);
      } else if (cmd === 'date') {
        response = new Date().toString();
      } else if (cmd === 'whoami') {
        response = 'alpine_user';
      } else if (cmd !== '') {
        response = `Command not found: ${cmd}`;
      }

      setHistory((prev) => [...prev, `user@alpine:~$ ${cmd}`, ...(response ? [response] : [])]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-black text-green-400 p-2 font-mono text-sm overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">{line}</div>
        ))}
      </div>
      <div className="flex mt-2">
        <span className="mr-2">user@alpine:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none border-none text-green-400"
          autoFocus
        />
      </div>
    </div>
  );
};

export default TerminalApp;
