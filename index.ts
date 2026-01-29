import { existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";

// ============ Types ============
interface Task {
  id: number;
  name: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

interface TaskData {
  tasks: Task[];
  nextId: number;
}

// ============ Config ============
const DATA_FILE = join(homedir(), ".task-manager-data.json");

// ============ Data Operations ============
async function loadTasks(): Promise<TaskData> {
  try {
    if (existsSync(DATA_FILE)) {
      const file = Bun.file(DATA_FILE);
      return await file.json();
    }
  } catch (error) {
    console.error("Error loading tasks, starting fresh.");
  }
  return { tasks: [], nextId: 1 };
}

async function saveTasks(data: TaskData): Promise<void> {
  await Bun.write(DATA_FILE, JSON.stringify(data, null, 2));
}

// ============ Commands ============
async function addTask(taskName: string): Promise<void> {
  const data = await loadTasks();
  
  const newTask: Task = {
    id: data.nextId,
    name: taskName,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  
  data.tasks.push(newTask);
  data.nextId++;
  await saveTasks(data);
  
  console.log(`\n  ✅ Task added: "${taskName}"\n`);
}

async function displayTasks(): Promise<void> {
  const data = await loadTasks();
  const pendingTasks = data.tasks.filter((task) => !task.completed);

  if (pendingTasks.length === 0) {
    console.log("\n  📋 No pending tasks! You're all caught up.\n");
    return;
  }

  console.log("\n  ╔══════════════════════════════════════╗");
  console.log("  ║          📋 PENDING TASKS            ║");
  console.log("  ╠══════════════════════════════════════╣");
  
  pendingTasks.forEach((task, index) => {
    const num = String(index + 1).padStart(2, " ");
    console.log(`  ║  ${num}. ${task.name.padEnd(33).slice(0, 33)} ║`);
  });
  
  console.log("  ╚══════════════════════════════════════╝\n");
}

async function markDone(serialNumber: number): Promise<void> {
  const data = await loadTasks();
  const pendingTasks = data.tasks.filter((task) => !task.completed);

  if (serialNumber < 1 || serialNumber > pendingTasks.length) {
    console.log("\n  ❌ Invalid task number!\n");
    return;
  }

  const taskToComplete = pendingTasks[serialNumber - 1];
  const taskIndex = data.tasks.findIndex((t) => t.id === taskToComplete.id);

  data.tasks[taskIndex].completed = true;
  data.tasks[taskIndex].completedAt = new Date().toISOString();

  await saveTasks(data);
  console.log(`\n  ✅ Completed: "${taskToComplete.name}"\n`);
}

async function showArchive(): Promise<void> {
  const data = await loadTasks();
  const completedTasks = data.tasks.filter((task) => task.completed);

  if (completedTasks.length === 0) {
    console.log("\n  📦 No completed tasks in archive.\n");
    return;
  }

  console.log("\n  ╔══════════════════════════════════════════════════╗");
  console.log("  ║              📦 COMPLETED TASKS                  ║");
  console.log("  ╠══════════════════════════════════════════════════╣");

  completedTasks.forEach((task, index) => {
    const completedDate = new Date(task.completedAt!);
    const dateStr = completedDate.toLocaleDateString();
    const timeStr = completedDate.toLocaleTimeString();
    
    console.log(`  ║  ${index + 1}. ${task.name.padEnd(43).slice(0, 43)} ║`);
    console.log(`  ║     └─ Completed: ${dateStr} at ${timeStr.padEnd(18)} ║`);
  });

  console.log("  ╚══════════════════════════════════════════════════╝\n");
}

function showHelp(): void {
  console.log(`
  ╔═══════════════════════════════════════════════════╗
  ║                TASKS-CLI                          ║
  ╠═══════════════════════════════════════════════════╣
  ║                                                   ║
  ║  COMMANDS:                                        ║
  ║                                                   ║
  ║  add-- <task>      Add a new task                 ║
  ║  display           Show all pending tasks         ║
  ║  done-- <number>   Mark task as completed         ║
  ║  --archive         Show completed tasks           ║
  ║  --help            Show this help message         ║
  ║  --clear           Clear all tasks                ║
  ║  exit              Exit the program               ║
  ║                                                   ║
  ╚═══════════════════════════════════════════════════╝
  `);
}

async function clearAllTasks(): Promise<void> {
  await saveTasks({ tasks: [], nextId: 1 });
  console.log("\n  🗑️  All tasks cleared!\n");
}

// ============ Process Command ============
async function processCommand(input: string): Promise<boolean> {
  const parts = input.trim().split(" ");
  const command = parts[0].toLowerCase();

  if (!command) {
    return true; // Continue loop on empty input
  }

  // Exit command
  if (command === "exit" || command === "quit" || command === "q") {
    console.log("\n  👋 Goodbye!\n");
    return false; // Stop the loop
  }

  // Handle add-- command
  if (command.startsWith("add--")) {
    let taskName = command.slice(5).trim();
    
    if (!taskName && parts.length > 1) {
      taskName = parts.slice(1).join(" ");
    }
    
    if (!taskName) {
      console.log("\n  ❌ Please provide a task name!");
      console.log("  Usage: add-- <task name>\n");
      return true;
    }
    
    await addTask(taskName);
    return true;
  }

  // Handle done-- command
  if (command.startsWith("done--")) {
    let serialStr = command.slice(6).trim();
    
    if (!serialStr && parts.length > 1) {
      serialStr = parts[1];
    }
    
    const serialNumber = parseInt(serialStr, 10);
    
    if (isNaN(serialNumber)) {
      console.log("\n  ❌ Please provide a valid task number!");
      console.log("  Usage: done-- <number>\n");
      return true;
    }
    
    await markDone(serialNumber);
    return true;
  }

  // Handle other commands
  switch (command) {
    case "display":
      await displayTasks();
      break;
    case "--archive":
    case "archive":
      await showArchive();
      break;
    case "--help":
    case "help":
      showHelp();
      break;
    case "--clear":
    case "clear":
      await clearAllTasks();
      break;
    default:
      console.log(`\n  ❌ Unknown command: "${command}"`);
      console.log("  Type 'help' to see available commands.\n");
  }

  return true; // Continue loop
}

// ============ Interactive Mode ============
async function interactiveMode(): Promise<void> {
  showHelp();
  
  const prompt = "  ➜ ";
  process.stdout.write(prompt);

  for await (const line of console) {
    const shouldContinue = await processCommand(line);
    
    if (!shouldContinue) {
      break;
    }
    
    process.stdout.write(prompt);
  }
}

// ============ Single Command Mode ============
async function singleCommandMode(args: string[]): Promise<void> {
  const input = args.join(" ");
  await processCommand(input);
}

// ============ Main ============
async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    // Interactive mode when no arguments (double-click or just running the exe)
    await interactiveMode();
  } else {
    // Single command mode when arguments provided
    await singleCommandMode(args);
  }
}

main().catch(console.error);