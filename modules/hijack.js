const chalk = require("chalk");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = async () => {
  console.clear();
  console.log(chalk.hex("#00FFD1")("🔍 Scanning target di jaringan... (butuh root)"));

  try {
    const output = execSync("sudo arp-scan --localnet").toString();
    const lines = output.split("\n").slice(2, -4); // skip header/footer

    const targets = lines.map(line => {
      const [ip, mac, vendor] = line.split("\t");
      return {
        name: `🟢 ${ip} - ${vendor || mac}`,
        value: ip
      };
    });

    if (targets.length === 0) {
      console.log(chalk.red("⚠️ Tidak ada target terdeteksi."));
      return;
    }

    const { target } = await inquirer.prompt([
      {
        type: "list",
        name: "target",
        message: chalk.cyan("🎯 Pilih target yang ingin di-exploit:"),
        choices: targets
      }
    ]);

    console.log(chalk.green(`✅ Target terpilih: ${target}`));

    // Ambil semua tools dari modules/hijack/
    const modulePath = path.join(__dirname, "hijack");
    const hijackFiles = fs.readdirSync(modulePath).filter(f => f.endsWith(".js"));

    const { chosenTool } = await inquirer.prompt([
      {
        type: "list",
        name: "chosenTool",
        message: chalk.yellow("🧨 Pilih exploit yang mau dijalankan:"),
        choices: hijackFiles.map(f => f.replace(".js", ""))
      }
    ]);

    const tool = require(path.join(modulePath, chosenTool));
    await tool(target);

  } catch (err) {
    console.error(chalk.red("❌ Gagal scan atau load module:"), err.message);
  }
};
