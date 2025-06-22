#!/bin/bash

echo "🧠 RefoundScalingAI Setup by King REDZ😈"
echo "🔍 Mengecek dan memasang semua yang dibutuhkan..."

# Deteksi OS / Package Manager
if command -v pkg &>/dev/null; then
    echo "📱 Deteksi: Termux (Android)"
    pkg update -y
    pkg install nodejs -y
elif command -v apt &>/dev/null; then
    echo "💻 Deteksi: Linux (Debian/Ubuntu)"
    sudo apt update -y
    sudo apt install nodejs npm -y
else
    echo "❌ Tidak bisa mendeteksi package manager (apt/pkg)"
    exit 1
fi

# Install dependencies dari package.json
echo "📦 Menginstall dependency dari package.json..."
npm install

# Jalanin main.js
echo "🚀 Menjalankan RefoundScalingAI..."
sleep 1
node main.js
