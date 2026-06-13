import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { createFolder, createFile } from '../store/fileSystemSlice'
import { closeWindow, type WindowState } from '../store/windowSlice'
import { removeProcess } from '../store/processSlice'

export const TerminalApp = ({ winInfo }: { winInfo: WindowState }) => {
  const dispatch = useDispatch()
  const fileSystemState = useSelector((state: RootState) => state.fileSystem)
  const { files, folders } = fileSystemState

  const [currentFolderId, setCurrentFolderId] = useState('root')
  const [history, setHistory] = useState<string[]>(['Welcome to AlpineOS Terminal! Type "help" for a list of commands.'])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  const getPath = (folderId: string) => {
    let currentId = folderId
    const pathParts: string[] = []
    let depthGuard = 50
    while (currentId && depthGuard > 0) {
      const folder = folders.find((f) => f.id === currentId)
      if (!folder) break
      if (folder.name !== '/' && folder.name.toLowerCase() !== 'root') {
        pathParts.unshift(folder.name)
      }
      currentId = folder.parentId
      depthGuard--
    }
    return '/' + pathParts.join('/')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim()
      const newCommandHistory = [...commandHistory, cmd]
      setCommandHistory(newCommandHistory)
      setHistoryIndex(newCommandHistory.length)
      
      const newHistory = [...history, `user@webos:~$ ${cmd}`]
      
      if (cmd === '') {
        setHistory(newHistory)
        setInput('')
        return
      }

      const args = cmd.split(' ')
      const command = args[0]
      const target = args.slice(1).join(' ')
      let output = ''

      if (command === 'pwd') {
        output = getPath(currentFolderId)
      } else if (command === 'ls') {
        const folderNames = folders
          .filter((f) => f.parentId === currentFolderId)
          .map((f) => f.name + '/')
        const fileNames = files
          .filter((f) => f.parentId === currentFolderId)
          .map((f) => f.name + (f.extension ? '.' + f.extension : ''))
        output = [...folderNames, ...fileNames].join('  ')
      } else if (command === 'cd') {
        if (!target) {
          setCurrentFolderId('root')
        } else if (target === '..') {
          const currentFolder = folders.find((f) => f.id === currentFolderId)
          if (currentFolder && currentFolder.parentId) {
            setCurrentFolderId(currentFolder.parentId)
          }
        } else {
          const targetFolder = folders.find(
            (f) => f.parentId === currentFolderId && f.name === target
          )
          if (targetFolder) {
            setCurrentFolderId(targetFolder.id)
          } else {
            output = `cd: ${target}: No such file or directory`
          }
        }
      } else if (command === 'mkdir') {
        if (!target) {
          output = 'mkdir: missing operand'
        } else {
          dispatch(
            createFolder({
              id: crypto.randomUUID(),
              name: target,
              parentId: currentFolderId,
            })
          )
        }
      } 
      else if (command === 'exit') {
          dispatch(removeProcess(winInfo.processId))
          dispatch(closeWindow(winInfo.id))
      } 
      else if (command === 'whoami') {
        output = 'user'
      } 
      else if (command === 'help') {
        output = `Supported commands:
              - whoami: Show current user
              - pwd: Show current directory
              - ls: List files and folders
              - cd [dir]: Change directory
              - mkdir [name]: Create a new folder
              - touch [name]: Create a new file
              - echo [text]: Print text to the terminal
              - clear: Clear the terminal history
              - mkdir: Create Folder
              - rm: Remove files and folders
              - exit: Close the terminal
              - help: Show this help message
              `  

      } else if (command === 'touch') {
        if (!target) {
          output = 'touch: missing file operand'
        } else {
          const parts = target.split('.')
          const ext = parts.length > 1 ? parts.pop() || '' : ''
          const name = parts.join('.')
          dispatch(
            createFile({
              id: crypto.randomUUID(),
              name,
              extension: ext,
              parentId: currentFolderId,
              content: '',
            })
          )
        }
      } else if (command === 'clear') {
        setHistory([])
        setInput('')
        return
      } else if (command === 'echo') {
        output = target
      } else {
        output = `Command not found: ${command}`
      }

      if (output) {
        newHistory.push(output)
      }
      
      setHistory(newHistory)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      } else {
        setHistoryIndex(commandHistory.length)
        setInput('')
      }
    }
  }

  return (
    <div className="flex h-full w-full flex-col bg-black p-4 font-mono text-sm text-green-400 overflow-hidden" onClick={() => document.getElementById(`term-input-${winInfo.id}`)?.focus()}>
      <div ref={scrollRef} className="flex-1 overflow-y-auto whitespace-pre-wrap pb-2">
        {history.map((line, idx) => (
          <div key={idx} className="min-h-[1.25rem] break-all">{line}</div>
        ))}
        <div className="flex">
          <span className="mr-2 text-green-400">user@webos:~$</span>
          <input
            id={`term-input-${winInfo.id}`}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-green-400 outline-none border-none caret-green-400"
            autoComplete="off"
            spellCheck="false"
            autoFocus
          />
        </div>
      </div>
    </div>
  )
}

export default TerminalApp
