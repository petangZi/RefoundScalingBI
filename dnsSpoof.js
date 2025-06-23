const { exec } = require("child_process");
const chalk = require("chalk");

module.exports = {
  run: (targetIP) => {
    console.log(chalk.green(`📡 Memalsukan DNS untuk ${targetIP}...`));

    const spoofIP = "192.168.1.100"; // ganti ini ke IP lo
    const spoofedDomain = "google.com";

    const cmd = `tsu -c 'echo "${spoofIP} ${spoofedDomain}" > /etc/hosts'`;

    exec(cmd, (err) => {
      if (err) {
        console.error(chalk.red("❌ Gagal spoof DNS:", err.message));
      } else {
        console.log(chalk.green(`✅ DNS ${spoofedDomain} dialihkan ke ${spoofIP}`));
      }
    });
  }
};
