# AlpineOS

> A fully functional, persistent, browser-based operating system built with React and Redux.

AlpineOS is a web-based desktop environment powered by a custom Redux "kernel." It features real background process management, a persistent virtual file system, and an advanced window management engine. 

What do you want?

**See live demo** [https://alpine-os-eight.vercel.app](https://alpine-os-eight.vercel.app)
** OR Wanna run locally** checkout bottom of the readme

**Contact Me** ashishrajsingh75@gmail.com

# Befroe Details here is the list of Things you can do in AlpineOS
- Create Text files and folders
- use Terminal to create file ```touch``` and folders ```mkdir```, change directory ```cd```, delete with ```rmdir```, more commands ```ls```, ```pwd```, ```whoami```, ```help```
- Use Activity App to see all the currenlty running processes
- Can open personalization setting by right click on the desktop, change wallpapers, more customization will be added soon 
- Browser - allows to visit wesite that do not block iframe requests like wikipedia
- Finder - File manager can do all the basic File management taks - CRUD, can selete files and folders just like real OS
- TextPad - allows creation and updation of text files

---

## ✨ What did i create?

* **Decoupled Window & Process Management:** Inspired by real operating systems, AlpineOS separates background processes from visual UI windows. Closing an app destroys both the UI frame and the underlying process ID via a custom Redux slice, preventing memory leaks and ghost processes.

![alt text](image.png)


* **Persistent Virtual File System:** Powered by `localForage` and `redux-persist`. You can create, edit, and delete files/folders, and the entire file tree survives browser refreshes and tab closures. 

![alt text](image-1.png)

* **Authentic Boot Sequence:** Simulates a real BIOS boot with dynamic delays, system checks, state hydration, and persistence-aware sleep/shutdown states.

![alt text](ScreenRecording2026-06-13at4.02.52PM-ezgif.com-video-to-gif-converter.gif)

* **Native Terminal Engine:** A robust CLI that interacts directly with the VFS. Supports commands like `cd`, `ls`, `mkdir`, `rm`, `touch`, `echo`, `help`, and more.
![alt text](image-2.png)

* **Activity Manager:** A real-time system monitor detailing all active processes (PIDs), CPU/Memory telemetry visuals, and the ability to force-kill stubborn processes.
![alt text](image-3.png)

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

## Whats the Future 
This is for my webOS1, for webOS2 i will be going way farrr
1. Media player
2. file uploads
3. Mini Apps, calulator, color picker, clock, calendar etc
4. a Tips app to let user know about OS
5. Animations
6. More customization , accent colors

## 🚀 Run it Locally

   ```bash
   git clone https://github.com/ashish757/alpineos.git
   cd alpineos
   npm install
   npm run dev
   ```
you are all set on http://localhost:5173
please let me know if anything breaks
ashishrajsingh75@gmail.com



# Acknowledgement
- use a subreddit r/wallpaper for most of the wallpapers featured in this project

# AI
- used AI to learn about real OS architectures, like how to solve the window positining? got to know how apple uses bounded cascade for positioning windows, 
- used AI to for quickly genrating eneric and reusable UI components, such as.
- took help from AI, and my collage friend to fix bugs, like closing window was not quiting the process itslef, window positioning problem and its algorithm
