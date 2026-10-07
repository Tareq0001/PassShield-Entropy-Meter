# PassShield Entropy Meter 🛡️🔐

> Offline-first password entropy calculator, brute-force crack time estimator, and cryptographically secure generator.

Developed by **Tareq Aboushi** ([@Tareq0001](https://github.com/Tareq0001)).

---

## 🌟 Features
- **Shannon Entropy Analysis:**
  - Real-time mathematical entropy evaluation:
    $$H = L \cdot \log_2(N)$$
    where $L$ is length and $N$ is character pool size.
- **Hardware-Calibrated Crack Time Estimates:**
  - Online Throttled Web Attacks (100 guesses/sec).
  - Fast Server Attacks (1,000 guesses/sec).
  - Offline GPU Hashcat Clusters ($10^{10}$ hashes/sec).
  - Supercomputer / Distributed ASIC Nodes ($10^{14}$ hashes/sec).
- **Pattern & Vulnerability Heuristics:**
  - Flags sequential runs (`1234`, `abcd`, `qwerty`).
  - Identifies repetitive characters (`aaaa`) and top common leaked passwords.
- **Cryptographic WebCrypto Generator:**
  - Powered by `window.crypto.getRandomValues()` for uniform pseudo-random security.
  - Granular character set toggles & ambiguous character removal (`0`, `O`, `l`, `1`, `I`).
  - Diceware memorable passphrase mode.
- **100% Client-Side Privacy:**
  - Zero network requests. All mathematical operations run entirely in local browser memory.
- **Bilingual Interface:**
  - Full Arabic and English typography with responsive RTL/LTR adaptation.

## 🚀 Live Demo
Experience the app live at:  
👉 **[https://tareq0001.github.io/PassShield-Entropy-Meter/](https://tareq0001.github.io/PassShield-Entropy-Meter/)**

## 🛠️ Tech Stack
- HTML5 Semantic Markup
- Modern CSS3 Grid & Flexbox with Cyberpunk Glassmorphism
- Pure Vanilla JavaScript (ES6+ & Web Cryptography API)
