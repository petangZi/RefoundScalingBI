// main.js
const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

// Animasi Pembuka
console.clear();
console.log(
  chalk.hex("#FF0000")(figlet.textSync("REFOUND SCALING", { horizontalLayout: "full" }))
);
console.log(chalk.gray("💻 AI Offensive Toolkit | by King REDZ😈\n"));

// Fungsi utama
(async () => {
  const toolsDir = path.join(__dirname, "modules");

  // Ambil semua file .js dari folder modules
  const toolFiles = fs.readdirSync(toolsDir).filter(file => file.endsWith(".js"));

  const toolChoices = toolFiles.map(file => {
    const name = file.replace(/\.js$/, "");
    return name;
  });

  toolChoices.push("❌ Keluar");

  // UI Pilihan Modul
  const { menu } = await inquirer.prompt([
    {
      type: "list",
      name: "menu",
      message: chalk.cyanBright("🧠 Pilih Modul RefoundScaling:"),
      choices: toolChoices,
    },
  ]);

  if (menu === "❌ Keluar") {
    console.log(chalk.green("👋 Sampai jumpa, Operator Refound! 😎"));
    process.exit(0);
  }

  // Load modul secara dinamis
  try {
    const selectedModule = require(`./modules/${menu}`);
    await selectedModule();
  } catch (err) {
    console.error(chalk.red("❌ Gagal load modul:"), err.message);
  }
})();
