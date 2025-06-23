const { exec } = require("child_process");
const chalk = require("chalk");
const fs = require("fs");

module.exports = {
  run: (targetIP) => {
    console.log(chalk.cyan(`🔍 Men-sniff traffic dari ${targetIP}...`));
    
    const filename = `/data/data/com.termux/files/home/sniff-${Date.now()}.pcap`;

    const cmd = `tsu -c 'tcpdump host ${targetIP} -w ${filename}'`;

    exec(cmd, (err) => {
      if (err) {
        console.error(chalk.red("❌ Gagal sniff:"), err.message);
      } else {
        console.log(chalk.green(`✅ Traffic disimpan di ${filename}`));
      }
    });
  }
};
