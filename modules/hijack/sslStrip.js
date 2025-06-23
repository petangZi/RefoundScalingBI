const { exec } = require("child_process");
const chalk = require("chalk");

module.exports = {
  run: () => {
    console.log(chalk.red("🧨 Menjalankan SSLStrip..."));

    const cmd = `tsu -c 'sslstrip -l 8080'`; // Pastikan sslstrip udah diinstall

    exec(cmd, (err) => {
      if (err) {
        console.error(chalk.red("❌ Gagal menjalankan SSLStrip:"), err.message);
      } else {
        console.log(chalk.green("✅ SSLStrip aktif di port 8080!"));
      }
    });
  }
};
