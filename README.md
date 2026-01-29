

```markdown
# Tasks CLI 📝

A lightweight, blazing fast command-line to-do list manager built with [Bun](https://bun.sh). 

Keep track of your tasks directly from your terminal with a persistent, local storage system. This tool supports both an interactive mode and single-command operations.

## ✨ Features

- **🚀 Fast & Lightweight:** Built using the Bun runtime.
- **💾 Persistent Storage:** Tasks are saved locally (`tasks-cli-storage.json` in your home directory).
- **🖥️ Dual Modes:** 
  - **Interactive Mode:** A shell-like interface for managing tasks.
  - **Command Mode:** Execute single commands directly (e.g., `tasks add "Buy milk"`).
- **📦 Zero Dependencies:** Uses standard libraries and Bun APIs.
- **📂 Archiving:** Keep your task list clean by archiving completed items.

## 📥 Installation

### Option 1: Standalone Executable (Windows)
If you don't want to install Bun, you can simply download the standalone executable.

1. Go to the **[Releases](../../releases)** page of this repository.
2. Download `tasks.exe`.
3. (Optional) Add the folder containing `tasks.exe` to your system's PATH variables to run it from anywhere.

### Option 2: Run from Source (Requires Bun)
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tasks-cli.git
   cd tasks-cli
   ```
2. Run directly using Bun:
   ```bash
   bun run index.ts
   ```

## 🎮 Usage

### Interactive Mode
Simply run the executable without any arguments to enter the interactive shell:

```bash
./tasks.exe
# OR
bun run index.ts
```

Output:
```text
  ───────────────────────────────────────────────────
                     TASKS-CLI                       
  ───────────────────────────────────────────────────
  ➜ 
```

### Command Reference

You can run these commands inside the interactive mode, or pass them as arguments to the executable (e.g., `./tasks.exe add "My Task"`).

| Command | Description | Example |
| :--- | :--- | :--- |
| `add <task>` | Add a new pending task | `add Buy Coffee` |
| `display` / `list` | Show all pending tasks | `display` |
| `done <number>` | Mark a specific task number as completed | `done 1` |
| `delete <number>` | Delete a specific task permanently | `delete 2` |
| `delete all` | Delete **all pending** tasks (Does not delete archive) | `delete all` |
| `delete archive` | Delete **all archived** tasks | `delete archive` |
| `archive` | Show the list of completed tasks | `archive` |
| `location` | Show where the data JSON file is stored | `location` |
| `help` | Show the help menu | `help` |
| `exit` | Exit the program (Interactive mode only) | `exit` |

## 🛠️ Building the Executable

If you want to compile the code into an `.exe` yourself, you can use Bun's built-in bundler.

```bash
bun build ./index.ts --compile --outfile tasks.exe
```

## 📁 Data Storage

Your tasks are stored in a simple JSON file located in your user home directory to ensure they persist even if you move the executable.

- **File Path:** `~/tasks-cli-storage.json` (e.g., `C:\Users\YourName\tasks-cli-storage.json`)

You can modify this file manually if needed, or back it up to save your task history.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
```

