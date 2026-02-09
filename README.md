

```markdown
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

## Prerequisites

- [Bun](https://bun.sh) v1.0 or later

```bash
curl -fsSL https://bun.sh/install | bash
```

---

## Installation

```bash
git clone https://github.com/wisqueo/tasks-cli.git
cd tasks-cli
bun install
```

---

## Usage

### Interactive Mode

Launch without arguments to enter an interactive session:

```bash
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
bun run index.ts add Fix the login bug
bun run index.ts display
bun run index.ts done 1
bun run index.ts archive
bun run index.ts delete 2
```

---

## Commands

| Command            | Description                        |
| ------------------ | ---------------------------------- |
| `add <task>`       | Add a new task                     |
| `display`          | Show all pending tasks             |
| `done <number>`    | Mark a pending task as completed   |
| `delete <number>`  | Delete a specific pending task     |
| `delete all`       | Delete **all** pending tasks       |
| `delete archive`   | Delete **all** archived tasks      |
| `archive`          | Show completed tasks with timestamps |
| `location`         | Show the data file path            |
| `help`             | Show the help screen               |
| `exit`             | Exit interactive mode              |

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

## Tip: Create a Global Alias

Add this to your `~/.bashrc`, `~/.zshrc`, or shell config:

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
