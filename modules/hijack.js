const { exec } = require("child_process");
const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

function scanNetwork(callback) {
  console.log(chalk.cyan("\n📡 Memulai scan jaringan...\n"));

  const cmd = "ip neigh show"; // buat Termux/Linux
  exec(cmd, (err, stdout, stderr) => {
    if (err || stderr) {
      console.error(chalk.red("❌ Gagal scan jaringan!"), err?.message || stderr);
      return;
    }

    const targets = stdout
      .trim()
      .split("\n")
      .map((line, i) => {
        const parts = line.trim().split(/\s+/);
        return {
          name: `${parts[0]} (${parts.includes("lladdr") ? parts[parts.indexOf("lladdr") + 1] : "N/A"})`,
          value: parts[0],
        };
      });

    if (targets.length === 0) {
      console.log(chalk.yellow("⚠️ Tidak ada perangkat terdeteksi."));
      return;
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "targetIP",
          message: "🎯 Pilih target untuk di-exploit:",
          choices: targets,
        },
      ])
      .then((answers) => {
        loadHijackModules(answers.targetIP);
        if (callback) callback(answers.targetIP);
      });
  });
}

function loadHijackModules(targetIP) {
  console.log(chalk.green(`\n🔥 Target dipilih: ${targetIP}`));
  console.log(chalk.cyan("📦 Memuat fitur hijack...\n"));

  const hijackPath = path.join(__dirname, "hijack");
  const files = fs.readdirSync(hijackPath).filter((f) => f.endsWith(".js"));

  inquirer
    .prompt([
      {
        type: "list",
        name: "module",
        message: "🚀 Pilih modul exploit yang ingin dijalankan:",
        choices: files,
      },
    ])
    .then((ans) => {
      const modulePath = path.join(hijackPath, ans.module);
      const selectedModule = require(modulePath);
      if (typeof selectedModule.run === "function") {
        selectedModule.run(targetIP);
      } else {
        console.log(chalk.red("❌ Modul tidak memiliki fungsi `run(targetIP)`!"));
      }
    });
}

module.exports = {
  scanNetwork,
};
