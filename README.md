

# tasks-cli

A minimal, elegant command-line task manager built with [Bun](https://bun.sh).

Manage your to-do list entirely from the terminal — add tasks, mark them done, archive completed work, and clean up when you're finished. No databases, no cloud, no bloat. Just a single JSON file in your home directory.

---

## Features

- **Add, complete, and delete tasks** with simple commands
- **Archive** of completed tasks with timestamps
- **Interactive mode** — launch once and keep working
- **Single command mode** — fire and forget from your shell
- **Persistent storage** via a local JSON file (`~/tasks-cli-storage.json`)
- **Serial numbering** — tasks are referenced by their current position, not a fixed ID
- **Bulk delete** — clear all pending or all archived tasks at once

---

## Installation

### Option 1: Download the Executable (Recommended)

Grab the latest pre-built executable from [**GitHub Releases**](https://github.com/wisqueo/tasks-cli/releases) — no runtime required.

1. Download `tasks-cli.exe` from the [latest release](https://github.com/wisqueo/tasks-cli/releases/latest).
2. Place it somewhere in your system `PATH` (or any folder you prefer).
3. Run it:

```bash
tasks-cli
```

> **Note:** The executable is a standalone binary. No Bun or Node.js installation needed.

### Option 2: Run from Source

Requires [Bun](https://bun.sh) v1.0 or later.

```bash
# Install Bun if you haven't already
curl -fsSL https://bun.sh/install | bash

# Clone and run
git clone https://github.com/wisqueo/tasks-cli.git
cd tasks-cli
bun install
bun run index.ts
```

---

## Usage

### Interactive Mode

Launch without arguments to enter an interactive session:

```bash
# Using the executable
tasks-cli

# Or from source
bun run index.ts
```

You'll be greeted with a help screen and a persistent prompt:

```
  ➜ add Buy groceries
  ✅ Task added: "Buy groceries"
  📍 Serial number: 1

  ➜ add Read chapter 5
  ✅ Task added: "Read chapter 5"
  📍 Serial number: 2

  ➜ display

  ───────────────────────────────────────
              📋 PENDING TASKS
  ───────────────────────────────────────

   1. Buy groceries
   2. Read chapter 5

  ───────────────────────────────────────
  Total: 2 task(s)
  ───────────────────────────────────────

  ➜ done 1
  ✅ Completed: "Buy groceries"

  ➜ exit
  👋 Goodbye!
```

### Single Command Mode

Pass the command directly as arguments:

```bash
tasks-cli add Fix the login bug
tasks-cli display
tasks-cli done 1
tasks-cli archive
tasks-cli delete 2
```

---

## Commands

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `add <task>`       | Add a new task                       |
| `display`          | Show all pending tasks               |
| `done <number>`    | Mark a pending task as completed     |
| `delete <number>`  | Delete a specific pending task       |
| `delete all`       | Delete **all** pending tasks         |
| `delete archive`   | Delete **all** archived tasks        |
| `archive`          | Show completed tasks with timestamps |
| `location`         | Show the data file path              |
| `help`             | Show the help screen                 |
| `exit`             | Exit interactive mode                |

> **Aliases:** `list` and `show` work the same as `display`. `quit` and `q` work the same as `exit`.

---

## Data Storage

All tasks are stored in a single JSON file:

```
~/tasks-cli-storage.json
```

The file is human-readable and looks like this:

```json
{
  "tasks": [
    {
      "id": 1,
      "name": "Buy groceries",
      "completed": true,
      "hidden": false,
      "createdAt": "2025-01-15T10:30:00.000Z",
      "completedAt": "2025-01-15T12:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Read chapter 5",
      "completed": false,
      "hidden": false,
      "createdAt": "2025-01-15T10:31:00.000Z"
    }
  ],
  "nextId": 3
}
```

- **Completed** tasks move to the archive but stay in the file.
- **Deleted** tasks are soft-deleted (`hidden: true`) and excluded from all views.
- Run `location` to confirm the exact path on your system.

---

## Tip: Add to PATH

If you downloaded the executable, move it to a directory in your `PATH` for global access:

**Windows:**

```powershell
move tasks-cli.exe C:\Windows\System32\
```

Or add its folder to your `PATH` via **System Environment Variables**.

**Linux / macOS (from source):**

Add an alias to your `~/.bashrc`, `~/.zshrc`, or shell config:

```bash
alias tasks="bun /path/to/tasks-cli/index.ts"
```

Then use it from anywhere:

```bash
tasks add Write the README
tasks display
tasks done 1
```

---

## License

[MIT](LICENSE)
```
