import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../store/store'
import { createFolder, createFile } from '../store/fileSystemSlice'

export const FinderApp = () => {
  const dispatchAction = useDispatch()
  const fileSystemState = useSelector((st: RootState) => st.fileSystem)

  const [history, setHistory] = useState<string[]>(['root'])
  const [position, setPosition] = useState(0)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const folderId = history[position]

  const currentFolderContents = {
    folders: fileSystemState.folders.filter((f) => f.parentId === folderId),
    files: fileSystemState.files.filter((f) => f.parentId === folderId),
  }

  const currentFolderDetails = fileSystemState.folders.find((f) => f.id === folderId)

  const isBackDisabled = position === 0
  const isForwardDisabled = position === history.length - 1

  const navBack = () => {
    if (position > 0) {
      setPosition(p => p - 1)
      setSelectedIds([])
    }
  }

  const navFwd = () => {
    if (position < history.length - 1) {
      setPosition(p => p + 1)
      setSelectedIds([])
    }
  }

  const openFolder = (id: string) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, position + 1)
      newHistory.push(id)
      return newHistory
    })
    setPosition(p => p + 1)
    setSelectedIds([])
  }

  const handleItemSelect = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (e.ctrlKey || e.metaKey) {
      setSelectedIds(prev => prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
      )
    } else {
      setSelectedIds([id])
    }
  }

  const handleNewFolder = () => {
    const fName = prompt('Enter folder name:', 'New Folder')
    if (fName) {
      dispatchAction(createFolder({
        id: crypto.randomUUID(),
        name: fName,
        parentId: folderId,
      }))
    }
  }

  const handleNewFile = () => {
    const fName = prompt('Enter file name:', 'New File.txt')
    if (fName) {
      dispatchAction(createFile({
        id: crypto.randomUUID(),
        name: fName,
        parentId: folderId,
        extension: fName.split('.').pop() || '',
        content: '',
      }))
    }
  }

  return (
    <div className="flex h-full w-full flex-col bg-[#1c1c1e] text-slate-200 font-sans" onClick={() => setSelectedIds([])}>
      <div className="flex items-center justify-between border-b border-white/10 bg-[#252526] px-4 py-2 shadow-sm">
        <div className="flex gap-3">
          <button
            onClick={navBack}
            disabled={isBackDisabled}
            className={`flex h-7 w-7 items-center justify-center rounded transition-colors ${isBackDisabled ? "text-slate-600 cursor-not-allowed" : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            onClick={navFwd}
            disabled={isForwardDisabled}
            className={`flex h-7 w-7 items-center justify-center rounded transition-colors ${isForwardDisabled ? "text-slate-600 cursor-not-allowed" : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
        <div className="flex gap-2">
          <button onClick={handleNewFolder} className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors text-slate-300 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/5">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" /></svg>
            New Folder
          </button>
          <button onClick={handleNewFile} className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors text-slate-300 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/5">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
            New File
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-48 border-r border-white/5 bg-[#202020]/80 p-2 flex flex-col gap-1 backdrop-blur-md">
          <span className="mb-1 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Favorites
          </span>
          <div
            onClick={(e) => { e.stopPropagation(); openFolder("root"); }}
            className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${folderId === "root" ? "bg-slate-700/90 text-white shadow-sm" : "text-slate-300 hover:bg-white/10"
              }`}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" /></svg>
            Root
          </div>
          <div
            onClick={(e) => { e.stopPropagation(); openFolder("uh"); }}
            className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${folderId === "uh" ? "bg-slate-700/90 text-white shadow-sm" : "text-slate-300 hover:bg-white/10"
              }`}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
            Home
          </div>
          <div
            onClick={(e) => { e.stopPropagation(); openFolder("dc"); }}
            className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${folderId === "dc" ? "bg-slate-700/90 text-white shadow-sm" : "text-slate-300 hover:bg-white/10"
              }`}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
            Documents
          </div>
          <div
            onClick={(e) => { e.stopPropagation(); openFolder("dw"); }}
            className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${folderId === "dw" ? "bg-slate-700/90 text-white shadow-sm" : "text-slate-300 hover:bg-white/10"
              }`}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" /></svg>
            Downloads
          </div>
        </div>

        <div className="flex flex-1 flex-col bg-[#1e1e1e] pt-1 pl-1 " style={{ justifyContent: 'space-between' }}>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2">
            {currentFolderContents.folders.map((fItem) => (
              <div
                key={fItem.id}
                onClick={(e) => handleItemSelect(e, fItem.id)}
                onDoubleClick={(e) => { e.stopPropagation(); openFolder(fItem.id); }}
                className={`group flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-transparent transition-all ${selectedIds.includes(fItem.id) ? "bg-white/10 border-white/20" : "hover:bg-white/5"
                  }`}
              >
                <svg className="h-12 w-12 text-blue-400 drop-shadow-sm transition-transform group-active:scale-95" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
                <span className={`w-full truncate text-center text-[11px] px-1.5 py-0.5 rounded ${selectedIds.includes(fItem.id) ? "bg-blue-600 text-white" : "text-slate-200"}`}>
                  {fItem.name}
                </span>
              </div>
            ))}

            {currentFolderContents.files.map((fItem) => (
              <div
                key={fItem.id}
                onClick={(e) => handleItemSelect(e, fItem.id)}
                className={`group flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-transparent transition-all ${selectedIds.includes(fItem.id) ? "bg-white/10 border-white/20" : "hover:bg-white/5"
                  }`}
              >
                <div className="relative flex h-12 w-12 items-center justify-center text-slate-300 drop-shadow-sm transition-transform group-active:scale-95">
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  {fItem.extension && (
                    <span className="absolute bottom-1 font-mono text-[8px] font-bold uppercase tracking-wider text-slate-400 bg-[#1e1e1e] px-1 rounded-sm">
                      {fItem.extension}
                    </span>
                  )}
                </div>
                <span className={`w-full truncate text-center text-[11px] px-1.5 py-0.5 rounded ${selectedIds.includes(fItem.id) ? "bg-blue-600 text-white" : "text-slate-200"}`}>
                  {fItem.name}
                </span>
              </div>
            ))}
          </div>

          <div className="flex h-8 shrink-0 items-center border-t border-white/5 bg-[#252526] px-4 text-[11px] font-medium tracking-wide text-slate-400">
            {currentFolderDetails ? `/${currentFolderDetails.name === '~' || currentFolderDetails.name === '/' || currentFolderDetails.name === 'root' ? '' : currentFolderDetails.name}` : "Unknown Location"}
          </div>
        </div>
      </div>
    </div>
  )
}