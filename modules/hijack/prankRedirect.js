// prankRedirect.js
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const open = require("open");

const fakeNetworkScan = async () => {
  console.clear();
  console.log(chalk.red(figlet.textSync("PRANK PANEL")));
  console.log(chalk.green("📡 Memindai jaringan...") + " (simulasi)");
  await new Promise((r) => setTimeout(r, 1500));

  return [
    { ip: "192.168.1.5", device: "Android - Redmi Note 10" },
    { ip: "192.168.1.8", device: "Windows - Chrome" },
    { ip: "192.168.1.12", device: "iOS - Safari" },
  ];
};

const prankRedirect = async () => {
  const devices = await fakeNetworkScan();

  const { selectedDevice } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedDevice",
      message: "🎯 Pilih target jaringan:",
      choices: devices.map((d) => `${d.device} (${d.ip})`),
    },
  ]);

  const { mode } = await inquirer.prompt([
    {
      type: "list",
      name: "mode",
      message: `🧪 Pilih mode prank untuk ${selectedDevice}:`,
      choices: [
        "🔗 Redirect ke Video YouTube",
        "🔒 Simulasi Lockscreen (Android Only)",
        "❌ Batal",
      ],
    },
  ]);

  if (mode === "🔗 Redirect ke Video YouTube") {
    const { ytLink } = await inquirer.prompt([
      {
        type: "input",
        name: "ytLink",
        message: "🎥 Masukkan link video YouTube:",
        validate: (val) => val.includes("youtube.com") || "Link tidak valid",
      },
    ]);

    console.log(
      chalk.cyan(`🚀 Mengarahkan ${selectedDevice} ke: ${ytLink} (simulasi)`)
    );
    await new Promise((r) => setTimeout(r, 1000));
    open(ytLink); // hanya untuk simulasi
  } else if (mode === "🔒 Simulasi Lockscreen (Android Only)") {
    console.log(
      chalk.yellow(
        `🔐 Mengunci layar ${selectedDevice} (simulasi: nonaktifkan kontrol UI)`
      )
    );
    console.log(
      chalk.gray("[INFO] Untuk versi asli harus inject ke app / browser korban.")
    );
  } else {
    console.log(chalk.gray("❌ Dibatalkan."));
  }
};

module.exports = prankRedirect;
