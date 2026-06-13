# 🏔️ AlpineOS

> A fully functional, persistent, browser-based operating system built with React and Redux.

AlpineOS is a web-based desktop environment powered by a custom Redux "kernel." It features real background process management, a persistent virtual file system, and an advanced window management engine. 

**[Live Demo](https://alpine-os-eight.vercel.app)**  | **[Contact Creator](mailto:ashishrajsingh75@gmail.com)**

---

## ✨ Core Architecture

* **Decoupled Window & Process Management:** Inspired by real operating systems, AlpineOS separates background processes from visual UI windows. Closing an app destroys both the UI frame and the underlying process ID via a custom Redux slice, preventing memory leaks and ghost processes.
* **Persistent Virtual File System (VFS):** Powered by `localForage` and `redux-persist`. You can create, edit, and delete files/folders, and the entire file tree survives browser refreshes and tab closures. 
* **Authentic Boot Sequence:** Simulates a real BIOS boot with dynamic delays, system checks, state hydration, and persistence-aware sleep/shutdown states.

## 💻 Desktop Environment

* **Native Terminal Engine:** A robust CLI that interacts directly with the VFS. Supports commands like `cd`, `ls`, `mkdir`, `rm`, `touch`, `echo`, `help`, and more.
* **Activity Manager:** A real-time system monitor detailing all active processes (PIDs), CPU/Memory telemetry visuals, and the ability to force-kill stubborn processes.
* **Advanced Window Manager:** Fully draggable, resizable windows with a dynamic z-index arbiter to handle window focus seamlessly.
* **Dynamic Menu Bar & Dock:** Linux-inspired navigation. The top menu bar contextually adapts to the currently focused application, while the bottom dock manages quick-access and active apps.
* **Context Menus:** Fully custom right-click menus that adapt based on the target (e.g., desktop, files, dock).

## 🛠️ Tech Stack

* **Frontend Framework:** React 18
* **State Management:** Redux Toolkit
* **State Persistence:** Redux Persist + localForage (IndexedDB)
* **Styling:** Tailwind CSS
* **Telemetry Visuals:** Recharts
* **Build Tool:** Vite

## 🚀 Run it Locally

Spinning up AlpineOS on your local machine is quick and straightforward.

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/ashish757/alpineos.git](https://github.com/ashish757/alpineos.git)