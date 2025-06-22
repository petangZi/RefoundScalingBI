// modules/dorkingSmart.js
const axios = require("axios");
const fs = require("fs");
const inquirer = require("inquirer");
const chalk = require("chalk");

const savePath = "./data/dork-results.json";

const exampleDorks = [
  'inurl:index.php?id=',
  'inurl:page=\"contact\"',
  'inurl:upload filetype:php',
  'intitle:admin login',
  'inurl:view.php?id=',
];

async function dorkSearch(query) {
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&num=10`;
  try {
    const res = await axios.get(searchUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    return res.data;
  } catch (err) {
    return null;
  }
}

async function runDorking() {
  console.clear();
  console.log(chalk.cyan("\n📡 RefoundScaling | Smart Dorking Engine\n"));

  const { keyword } = await inquirer.prompt([
    {
      type: "input",
      name: "keyword",
      message: "🔍 Masukkan kata kunci (contoh: .gov, smk, shop):",
    },
  ]);

  const results = [];

  for (const dork of exampleDorks) {
    const fullQuery = `${dork} site:${keyword}`;
    console.log(chalk.gray(`\n🔎 Mencari: ${fullQuery}`));
    const html = await dorkSearch(fullQuery);
    if (html) {
      results.push({ dork: fullQuery, status: "✔️ Fetched" });
    } else {
      results.push({ dork: fullQuery, status: "❌ Gagal" });
    }
  }
  const path = require("path");

const dir = path.join(__dirname, "../data");
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

  fs.writeFileSync(savePath, JSON.stringify(results, null, 2));
  console.log(chalk.green("\n✅ Selesai. Hasil disimpan di:"), savePath);
}

module.exports = runDorking;
