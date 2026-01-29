import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { homedir } from "os";

// ============ Types ============
interface Task {
  id: number;
  name: string;
  completed: boolean;
  hidden: boolean;
  createdAt: string;
  completedAt?: string;
  hiddenAt?: string;
}

interface TaskData {
  tasks: Task[];
  nextId: number;
}

// ============ Config ============
const DATA_FILE = join(homedir(), "tasks-cli-storage.json");

// ============ Data Operations ============
function loadTasks(): TaskData {
  try {
    if (existsSync(DATA_FILE)) {
      const content = readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (error) {
    console.error("  ⚠️  Error loading tasks, starting fresh.");
  }
  return { tasks: [], nextId: 1 };
}

function saveTasks(data: TaskData): void {
  try {
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("  ❌ Error saving tasks:", error);
  }
}

// ============ Helper Functions ============
function getPendingTasks(data: TaskData): Task[] {
  return data.tasks.filter((task) => !task.completed && !task.hidden);
}

function getArchivedTasks(data: TaskData): Task[] {
  return data.tasks.filter((task) => task.completed && !task.hidden);
}

// ============ Commands ============
function addTask(taskName: string): void {
  const data = loadTasks();

  const newTask: Task = {
    id: data.nextId,
    name: taskName,
    completed: false,
    hidden: false,
    createdAt: new Date().toISOString(),
  };

  data.tasks.push(newTask);
  data.nextId++;
  saveTasks(data);

  const pendingTasks = getPendingTasks(data);
  const serialNumber = pendingTasks.length;

  console.log(`\n  ✅ Task added: "${taskName}"`);
  console.log(`  📍 Serial number: ${serialNumber}\n`);
}

function displayTasks(): void {
  const data = loadTasks();
  const pendingTasks = getPendingTasks(data);

  if (pendingTasks.length === 0) {
    console.log("\n  📋 No pending tasks! You're all caught up.\n");
    return;
  }

  console.log("\n  ───────────────────────────────────────");
  console.log("              📋 PENDING TASKS           ");
  console.log("  ───────────────────────────────────────");

  pendingTasks.forEach((task, index) => {
    const num = index + 1;
    console.log(`\n   ${num}. ${task.name}`);
  });

  console.log("\n  ───────────────────────────────────────");
  console.log(`  Total: ${pendingTasks.length} task(s)`);
  console.log("  ───────────────────────────────────────\n");
}

function markDone(serialNumber: number): void {
  const data = loadTasks();
  const pendingTasks = getPendingTasks(data);

  if (serialNumber < 1 || serialNumber > pendingTasks.length) {
    console.log("\n  ❌ Invalid task number!\n");
    return;
  }

  const taskToComplete = pendingTasks[serialNumber - 1];
  const taskIndex = data.tasks.findIndex((t) => t.id === taskToComplete.id);

  data.tasks[taskIndex].completed = true;
  data.tasks[taskIndex].completedAt = new Date().toISOString();

  saveTasks(data);
  console.log(`\n  ✅ Completed: "${taskToComplete.name}"\n`);
}

function deleteTask(input: string): void {
  const data = loadTasks();
  const arg = input.toLowerCase().trim();

  if (arg === "all") {
    const pendingTasks = getPendingTasks(data);

    if (pendingTasks.length === 0) {
      console.log("\n  📋 No pending tasks to delete.\n");
      return;
    }

    let count = 0;
    pendingTasks.forEach((task) => {
      const taskIndex = data.tasks.findIndex((t) => t.id === task.id);
      data.tasks[taskIndex].hidden = true;
      data.tasks[taskIndex].hiddenAt = new Date().toISOString();
      count++;
    });

    saveTasks(data);
    console.log(`\n  🗑️  Deleted ${count} pending task(s).\n`);
    return;
  }

  if (arg === "archive") {
    const archivedTasks = getArchivedTasks(data);

    if (archivedTasks.length === 0) {
      console.log("\n  📦 No archived tasks to delete.\n");
      return;
    }

    let count = 0;
    archivedTasks.forEach((task) => {
      const taskIndex = data.tasks.findIndex((t) => t.id === task.id);
      data.tasks[taskIndex].hidden = true;
      data.tasks[taskIndex].hiddenAt = new Date().toISOString();
      count++;
    });

    saveTasks(data);
    console.log(`\n  🗑️  Deleted ${count} archived task(s).\n`);
    return;
  }

  const serialNumber = parseInt(arg, 10);

  if (isNaN(serialNumber)) {
    console.log("\n  ❌ Invalid input!");
    console.log("  Usage: delete <number> | delete all | delete archive\n");
    return;
  }

  const pendingTasks = getPendingTasks(data);

  if (serialNumber < 1 || serialNumber > pendingTasks.length) {
    console.log("\n  ❌ Invalid task number!\n");
    return;
  }

  const taskToDelete = pendingTasks[serialNumber - 1];
  const taskIndex = data.tasks.findIndex((t) => t.id === taskToDelete.id);

  data.tasks[taskIndex].hidden = true;
  data.tasks[taskIndex].hiddenAt = new Date().toISOString();

  saveTasks(data);
  console.log(`\n  🗑️  Deleted: "${taskToDelete.name}"\n`);
}

function showArchive(): void {
  const data = loadTasks();
  const completedTasks = getArchivedTasks(data);

  if (completedTasks.length === 0) {
    console.log("\n  📦 No completed tasks in archive.\n");
    return;
  }

  console.log("\n  ───────────────────────────────────────");
  console.log("            📦 COMPLETED TASKS           ");
  console.log("  ───────────────────────────────────────");

  completedTasks.forEach((task, index) => {
    const completedDate = new Date(task.completedAt!);
    const dateStr = completedDate.toLocaleDateString();
    const timeStr = completedDate.toLocaleTimeString();

    console.log(`\n   ${index + 1}. ${task.name}`);
    console.log(`      └─ Completed: ${dateStr} at ${timeStr}`);
  });

  console.log("\n  ───────────────────────────────────────");
  console.log(`  Total: ${completedTasks.length} completed task(s)`);
  console.log("  ───────────────────────────────────────\n");
}

function showHelp(): void {
  console.log(`
  ───────────────────────────────────────────────────
                     TASKS-CLI                       
  ───────────────────────────────────────────────────

  COMMANDS:

    add <task>        Add a new task
    display           Show all pending tasks
    done <number>     Mark task as completed
    delete <number>   Delete a specific task
    delete all        Delete all pending tasks
    delete archive    Delete all archived tasks
    archive           Show completed tasks
    location          Show data file location
    help              Show this help message
    exit              Exit the program

  ───────────────────────────────────────────────────
  `);
}

function showLocation(): void {
  console.log(`\n  📁 Data file location:`);
  console.log(`     ${DATA_FILE}`);
  console.log(`\n  📊 File exists: ${existsSync(DATA_FILE) ? "Yes ✅" : "No (will be created on first save)"}\n`);
}

// ============ Process Command ============
function processCommand(input: string): boolean {
  const trimmed = input.trim();
  
  if (!trimmed) {
    return true;
  }

  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1).join(" ");

  if (command === "exit" || command === "quit" || command === "q") {
    console.log("\n  👋 Goodbye!\n");
    return false;
  }

  switch (command) {
    case "add":
      if (!args) {
        console.log("\n  ❌ Please provide a task name!");
        console.log("  Usage: add <task name>\n");
      } else {
        addTask(args);
      }
      break;

    case "done":
      const doneNum = parseInt(args, 10);
      if (isNaN(doneNum)) {
        console.log("\n  ❌ Please provide a valid task number!");
        console.log("  Usage: done <number>\n");
      } else {
        markDone(doneNum);
      }
      break;

    case "delete":
      if (!args) {
        console.log("\n  ❌ Please provide what to delete!");
        console.log("  Usage: delete <number> | delete all | delete archive\n");
      } else {
        deleteTask(args);
      }
      break;

    case "display":
    case "list":
    case "show":
      displayTasks();
      break;

    case "archive":
      showArchive();
      break;

    case "help":
      showHelp();
      break;

    case "location":
      showLocation();
      break;

    default:
      console.log(`\n  ❌ Unknown command: "${command}"`);
      console.log("  Type 'help' to see available commands.\n");
  }

  return true;
}

// ============ Interactive Mode ============
async function interactiveMode(): Promise<void> {
  showHelp();

  const prompt = "  ➜ ";
  process.stdout.write(prompt);

  for await (const line of console) {
    const shouldContinue = processCommand(line);

    if (!shouldContinue) {
      break;
    }

    process.stdout.write(prompt);
  }
}

// ============ Single Command Mode ============
function singleCommandMode(args: string[]): void {
  const input = args.join(" ");
  processCommand(input);
}

// ============ Main ============
async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    await interactiveMode();
  } else {
    singleCommandMode(args);
  }
}

main().catch(console.error);
