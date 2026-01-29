# 🗓 Tasks-CLI

A simple, fast, and elegant command-line task manager built with [Bun](https://bun.sh/). Manage your tasks directly from the terminal with an interactive interface.

![Bun](https://img.shields.io/badge/Bun-v1.0+-black?logo=bun)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)
![Platform](https://img.shields.io/badge/Platform-Windows%20|%20macOS%20|%20Linux-lightgrey)

## ✨ Features

- ➕ **Add tasks** - Quickly add new tasks
- 📋 **Display tasks** - View all pending tasks with serial numbers
- ✅ **Mark complete** - Mark tasks as done using serial numbers
- 🗂 **Archive** - View completed tasks with completion timestamps
- 🧹 **Clear all** - Remove all tasks at once
- 💼 **Persistent storage** - Tasks saved locally in your home directory
- 🔥 **Interactive mode** - Continuous command input when double-clicked
- 📋 **Single executable** - Pre-built `.exe` included, no installation required

## 🔥 Installation

### Option 1: Download Pre-built Executable (Easiest)

A pre-built Windows executable is included in this repository.

1. Download `tasks-cli.exe` from this repository  
2. Place it anywhere on your computer  
3. Double-click to run in interactive mode, OR  
4. Open terminal/command prompt and run commands directly

```bash
# Run from command prompt
tasks-cli.exe add-- Buy groceries
tasks-cli.exe display

> 💡 Tip: Add the executable location to your system PATH for easy access from anywhere.



Option 2: Build from Source

Prerequisites

Bun v1.0 or higher


# Install Bun (if not already installed)
curl -fsSL https://bun.sh/install | bash

Clone & Setup

# Clone the repository
git clone https://github.com/yourusername/tasks-cli.git

# Navigate to directory
cd tasks-cli

# Install dependencies
bun install

# Run directly
bun run index.ts

# Or build your own executable
bun run build

🚀 Usage

Interactive Mode

Double-click the tasks-cli.exe or run without arguments:

# Using the executable
tasks-cli.exe

# Or using Bun
bun run index.ts

┌─────────────────────────────────────────────┐
  │            🗓 TASK MANAGER CLI               │
  │                                             │
  │  COMMANDS:                                  │
  │                                             │
  │  add-- <task>      Add a new task           │
  │  display           Show all pending tasks   │
  │  done-- <number>   Mark task as completed   │
  │  --archive         Show completed tasks     │
  │  --help            Show this help message   │
  │  --clear           Clear all tasks          │
  │  exit              Exit the program         │
  └─────────────────────────────────────────────┘

Single Command Mode

Run with arguments for quick one-off commands:

tasks-cli.exe add-- Buy groceries
tasks-cli.exe display
tasks-cli.exe done-- 1
tasks-cli.exe --archive

📝 Commands

Command	Description	Example

add-- <task>	Add a new task	add-- Buy groceries
display	Show all pending tasks	display
done-- <n>	Mark task #n as complete	done-- 1
--archive	Show completed tasks	archive
--help	Show help message	help
--clear	Delete all tasks	clear
exit / quit	Exit interactive mode	exit


💡 Examples

Adding Tasks

➜ add-- Complete project report
✔ Task added: "Complete project report"

➜ add-- Call mom
✔ Task added: "Call mom"

Viewing Pending Tasks

➜ display

  ┌───────────────────────────────┐
  │          📋 PENDING TASKS      │
  ├───────────────────────────────┤
  │ 1. Complete project report    │
  │ 2. Call mom                   │
  └───────────────────────────────┘

Completing a Task

➜ done-- 1
✔ Completed: "Complete project report"

Viewing Archive

➜ archive

  ┌───────────────────────────────┐
  │         🗂 COMPLETED TASKS     │
  ├───────────────────────────────┤
  │ 1. Complete project report    │
  │    └─ Completed: 1/15/2025 2:30 PM │
  └───────────────────────────────┘

🛠 Build Executable

Want to build your own executable? Run:

# Windows
bun build ./index.ts --compile --outfile tasks-cli.exe

# macOS / Linux
bun build ./index.ts --compile --outfile tasks-cli

The compiled executable can run on any machine without Bun installed.

💾 Data Storage

Tasks are stored in a JSON file in your home directory:

OS	Location

Windows	C:\Users\<username>\.task-manager-data.json
macOS	/Users/<username>/.task-manager-data.json
Linux	/home/<username>/.task-manager-data.json


🏗 Project Structure

tasks-cli/
├── index.ts          # Main application code
├── package.json      # Project configuration
├── tsconfig.json     # TypeScript configuration
├── bun.lock          # Dependency lock file
├── .gitignore        # Git ignore rules
├── README.md         # Documentation
└── tasks-cli.exe     # Pre-built Windows executable

📜 Scripts

# Run the application
bun run start

# Build executable
bun run build

✔ FAQ

Why use the pre-built .exe?

No need to install Bun or any dependencies

Just download and run

Perfect for quick setup on any Windows machine


Is my data safe?

All tasks are stored locally on your machine

No data is sent to any server

Data persists in your home directory


Can I use this on Mac/Linux?

Yes! Clone the repo and build using Bun

Or run directly with bun run index.ts


📖 License

This project is licensed under the MIT License - see the LICENSE file for details.

🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository


2. Create a feature branch (git checkout -b feature/amazing-feature)


3. Commit changes (git commit -m 'Add amazing feature')


4. Push to branch (git push origin feature/amazing-feature)


5. Open a Pull Request



📬 Contact

Your Name - @wisqueo

Project Link: https://github.com/wisqueo/tasks-cli


---

<p align="center">Made with ❤️ and Bun</p>
```
