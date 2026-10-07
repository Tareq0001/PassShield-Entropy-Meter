/**
 * PassShield Entropy Meter - Client-Side Password Entropy & Generator
 * Developer: Tareq Aboushi (Tareq0001)
 */

// --- Localization Strings ---
const i18nData = {
  ar: {
    appTitle: "PassShield Entropy Meter",
    appSubtitle: "مقياس رياضي لإنتروبيا كلمات المرور وتقدير زمن الاختراق ومولد آمن",
    offlineBadge: "آمن 100% بدون إنترنت",
    analyzeTitle: "فحص كلمة المرور",
    badgeMath: "معيار شانون (Shannon)",
    strEnterPass: "بانتظار إدخال كلمة المرور",
    strVeryWeak: "هشة وضعيفة للغاية ⚠️",
    strWeak: "ضعيفة ويمكن كسرها ⚠️",
    strFair: "متوسطة ومقبولة 🟡",
    strStrong: "قوية وآمنة 🟢",
    strVeryStrong: "فائقة الحصانة (Fort Knox) 🛡️",
    lblLength: "الطول الكلي",
    lblPool: "فضاء الحروف (N)",
    lblCombos: "مجموع التباديل",
    crackEstimates: "تقدير زمن الاختراق بالقوة العمياء (Brute-Force)",
    scenarioWeb: "هجوم ويب مقيد (100 محاولة/ث)",
    scenarioFast: "هجوم خادم سريع (1,000 محاولة/ث)",
    scenarioGpu: "مزرعة كروت شاشة GPU (10 مليار محاولة/ث)",
    scenarioSuper: "حاسوب فائق خارق (100 تريليون محاولة/ث)",
    criteriaTitle: "معايير المتانة والتنوع",
    critLen12: "طول كافٍ (12 حرفاً على الأقل)",
    critUpper: "أحرف كبيرة (A-Z)",
    critLower: "أحرف صغيرة (a-z)",
    critDigits: "أرقام (0-9)",
    critSymbols: "رموز خاصة (!@#$%)",
    critNoCommon: "خلو من الأنماط المتكررة والشائعة",
    genTitle: "توليد كلمة مرور فائقة الأمان",
    badgeCrypto: "تشفير WebCrypto",
    btnCopy: "نسخ",
    genLengthLbl: "طول كلمة المرور:",
    chkUpper: "أحرف كبيرة (A-Z)",
    chkLower: "أحرف صغيرة (a-z)",
    chkDigits: "أرقام (0-9)",
    chkSymbols: "رموز خاصة",
    chkAvoidSimilar: "استبعاد الحروف المتشابهة",
    btnGenerate: "توليد كلمة مرور جديدة",
    btnPassphrase: "توليد عبارة مرور (Diceware)",
    formulaTitle: "كيف تُحسب الإنتروبيا الرياضية؟",
    formulaDesc: "حيث L يمثل طول الكلمة، و N حجم فضاء الرموز الممكنة. كلما زادت قيمة H عن 60 بت، أصبحت الكلمة صامدة أمام هجمات القوة العمياء لأعوام وعقود.",
    toastCopied: "تم النسخ إلى الحافظة بنجاح! 📋",
    instant: "فوري (< ثانية)",
    seconds: "ثانية",
    minutes: "دقيقة",
    hours: "ساعة",
    days: "يوم",
    months: "شهر",
    years: "سنة",
    centuries: "قرن",
    millennia: "آلاف السنين",
    eons: "ملايين السنين"
  },
  en: {
    appTitle: "PassShield Entropy Meter",
    appSubtitle: "Mathematical Password Entropy Calculator, Crack Time Estimator & Secure Generator",
    offlineBadge: "100% Offline & Private",
    analyzeTitle: "Password Analysis",
    badgeMath: "Shannon Entropy",
    strEnterPass: "Awaiting password input...",
    strVeryWeak: "Extremely Fragile ⚠️",
    strWeak: "Weak & Vulnerable ⚠️",
    strFair: "Moderate & Acceptable 🟡",
    strStrong: "Strong & Resilient 🟢",
    strVeryStrong: "Fort Knox Fortress 🛡️",
    lblLength: "Total Length",
    lblPool: "Charset Pool (N)",
    lblCombos: "Combinations",
    crackEstimates: "Brute-Force Crack Time Estimates",
    scenarioWeb: "Throttled Web Attack (100 g/s)",
    scenarioFast: "Fast Online Server (1,000 g/s)",
    scenarioGpu: "GPU Cluster (10 Billion g/s)",
    scenarioSuper: "Supercomputer (100 Trillion g/s)",
    criteriaTitle: "Diversity & Robustness Criteria",
    critLen12: "Sufficient length (>= 12 characters)",
    critUpper: "Uppercase letters (A-Z)",
    critLower: "Lowercase letters (a-z)",
    critDigits: "Numbers (0-9)",
    critSymbols: "Special symbols (!@#$%)",
    critNoCommon: "No repetitive or predictable patterns",
    genTitle: "Generate Ultra-Secure Password",
    badgeCrypto: "WebCrypto API",
    btnCopy: "Copy",
    genLengthLbl: "Password Length:",
    chkUpper: "Uppercase (A-Z)",
    chkLower: "Lowercase (a-z)",
    chkDigits: "Digits (0-9)",
    chkSymbols: "Special Symbols",
    chkAvoidSimilar: "Exclude Ambiguous Characters",
    btnGenerate: "Generate New Password",
    btnPassphrase: "Generate Passphrase (Diceware)",
    formulaTitle: "How is Mathematical Entropy Calculated?",
    formulaDesc: "Where L is password length, and N is charset pool size. Any value of H above 60 bits remains practically immune to brute-force attacks across modern hardware.",
    toastCopied: "Copied to clipboard successfully! 📋",
    instant: "Instant (< 1s)",
    seconds: "sec",
    minutes: "min",
    hours: "hours",
    days: "days",
    months: "months",
    years: "years",
    centuries: "centuries",
    millennia: "millennia",
    eons: "million years"
  }
};

// Common Weak Passwords and Patterns
const commonPasswords = new Set([
  "password", "123456", "12345678", "qwerty", "123456789", "12345", "1234",
  "admin", "welcome", "login", "iloveyou", "abc123", "password123", "secret",
  "master", "testing", "football", "dragon", "baseball", "monkey", "sunshine"
]);

// Diceware Wordlist for Memorable Passphrases
const dicewareWords = [
  "solar", "falcon", "nexus", "quantum", "cipher", "matrix", "shield", "beacon",
  "orbit", "glacier", "vortex", "horizon", "pulsar", "zenith", "crystal", "aurora",
  "timber", "shadow", "summit", "canyon", "granite", "nebula", "meteor", "thunder",
  "velocity", "harbor", "compass", "voyager", "bastion", "eclipse", "safeguard", "beacon"
];

// --- State Variables ---
let currentLang = "ar";

// --- DOM Elements ---
const passwordInput = document.getElementById("passwordInput");
const toggleVisibilityBtn = document.getElementById("toggleVisibilityBtn");
const strengthLabel = document.getElementById("strengthLabel");
const entropyScore = document.getElementById("entropyScore");
const meterFill = document.getElementById("meterFill");
const metricLength = document.getElementById("metricLength");
const metricPool = document.getElementById("metricPool");
const metricCombos = document.getElementById("metricCombos");

const timeOnline = document.getElementById("timeOnline");
const timeFast = document.getElementById("timeFast");
const timeGpu = document.getElementById("timeGpu");
const timeSuper = document.getElementById("timeSuper");

const critLength = document.getElementById("critLength");
const critUpper = document.getElementById("critUpper");
const critLower = document.getElementById("critLower");
const critDigits = document.getElementById("critDigits");
const critSymbols = document.getElementById("critSymbols");
const critPatterns = document.getElementById("critPatterns");

// Generator elements
const genResult = document.getElementById("genResult");
const copyGenBtn = document.getElementById("copyGenBtn");
const genLength = document.getElementById("genLength");
const genLengthVal = document.getElementById("genLengthVal");
const chkUpper = document.getElementById("chkUpper");
const chkLower = document.getElementById("chkLower");
const chkDigits = document.getElementById("chkDigits");
const chkSymbols = document.getElementById("chkSymbols");
const chkAvoidSimilar = document.getElementById("chkAvoidSimilar");
const generateBtn = document.getElementById("generateBtn");
const generatePassphraseBtn = document.getElementById("generatePassphraseBtn");
const langToggleBtn = document.getElementById("langToggleBtn");
const toast = document.getElementById("toast");

// --- Password Analysis Engine ---
function analyzePassword(pwd) {
  const L = pwd.length;
  if (L === 0) {
    resetAnalysis();
    return;
  }

  const hasLower = /[a-z]/.test(pwd);
  const hasUpper = /[A-Z]/.test(pwd);
  const hasDigits = /[0-9]/.test(pwd);
  const hasSymbols = /[^a-zA-Z0-9\s]/.test(pwd);
  const hasSpace = /\s/.test(pwd);

  let poolSize = 0;
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasDigits) poolSize += 10;
  if (hasSymbols) poolSize += 33;
  if (hasSpace) poolSize += 1;

  if (poolSize === 0) poolSize = 1;

  // Base Shannon Entropy: H = L * log2(N)
  let entropy = L * Math.log2(poolSize);

  // Pattern detection penalties
  const lowerPwd = pwd.toLowerCase();
  let isCommon = commonPasswords.has(lowerPwd);
  let isRepeated = /^(.)\1+$/.test(pwd);
  let isSequential = /(012|123|234|345|456|567|678|789|abc|bcd|cde|def|qwe|asd)/i.test(pwd);

  if (isCommon) {
    entropy = Math.min(entropy, 15);
  } else if (isRepeated) {
    entropy = Math.min(entropy, 12);
  } else if (isSequential) {
    entropy = Math.max(0, entropy - 18);
  }

  // Update UI Elements
  metricLength.textContent = L;
  metricPool.textContent = poolSize;

  // Scientific notation for combinations
  const combosPow = L * Math.log10(poolSize);
  if (combosPow < 6) {
    metricCombos.textContent = Math.round(Math.pow(poolSize, L)).toLocaleString();
  } else {
    const exponent = Math.floor(combosPow);
    const mantissa = Math.pow(10, combosPow - exponent).toFixed(2);
    metricCombos.textContent = `${mantissa} × 10^${exponent}`;
  }

  entropyScore.textContent = `${entropy.toFixed(1)} Bits`;

  // Strength categorisation & Meter Fill
  let percentage = Math.min(100, Math.round((entropy / 100) * 100));
  meterFill.style.width = `${percentage}%`;

  const lang = i18nData[currentLang];

  if (entropy < 28) {
    meterFill.style.backgroundColor = "var(--accent-rose)";
    strengthLabel.textContent = lang.strVeryWeak;
    strengthLabel.style.color = "var(--accent-rose)";
  } else if (entropy < 45) {
    meterFill.style.backgroundColor = "var(--accent-amber)";
    strengthLabel.textContent = lang.strWeak;
    strengthLabel.style.color = "var(--accent-amber)";
  } else if (entropy < 65) {
    meterFill.style.backgroundColor = "#eab308";
    strengthLabel.textContent = lang.strFair;
    strengthLabel.style.color = "#eab308";
  } else if (entropy < 85) {
    meterFill.style.backgroundColor = "#38bdf8";
    strengthLabel.textContent = lang.strStrong;
    strengthLabel.style.color = "#38bdf8";
  } else {
    meterFill.style.backgroundColor = "var(--accent-emerald)";
    strengthLabel.textContent = lang.strVeryStrong;
    strengthLabel.style.color = "var(--accent-emerald)";
  }

  // Crack Times Calculation
  // Guesses needed = 2^(entropy - 1)
  const guessesLog10 = (entropy - 1) * Math.log10(2);

  timeOnline.textContent = formatCrackTime(guessesLog10, 2);      // 100 guesses/s = 10^2
  timeFast.textContent = formatCrackTime(guessesLog10, 3);        // 1,000 guesses/s = 10^3
  timeGpu.textContent = formatCrackTime(guessesLog10, 10);        // 10 Billion = 10^10
  timeSuper.textContent = formatCrackTime(guessesLog10, 14);      // 100 Trillion = 10^14

  // Criteria Checklist
  updateCriterion(critLength, L >= 12);
  updateCriterion(critUpper, hasUpper);
  updateCriterion(critLower, hasLower);
  updateCriterion(critDigits, hasDigits);
  updateCriterion(critSymbols, hasSymbols);
  updateCriterion(critPatterns, !isCommon && !isRepeated && !isSequential);
}

function updateCriterion(el, passed) {
  const icon = el.querySelector(".status-icon");
  if (passed) {
    el.classList.add("passed");
    icon.textContent = "✔";
  } else {
    el.classList.remove("passed");
    icon.textContent = "❌";
  }
}

function resetAnalysis() {
  const lang = i18nData[currentLang];
  strengthLabel.textContent = lang.strEnterPass;
  strengthLabel.style.color = "var(--text-muted)";
  entropyScore.textContent = "0.00 Bits";
  meterFill.style.width = "0%";
  metricLength.textContent = "0";
  metricPool.textContent = "0";
  metricCombos.textContent = "0";

  timeOnline.textContent = lang.instant;
  timeFast.textContent = lang.instant;
  timeGpu.textContent = lang.instant;
  timeSuper.textContent = lang.instant;

  [critLength, critUpper, critLower, critDigits, critSymbols].forEach(el => {
    updateCriterion(el, false);
  });
  updateCriterion(critPatterns, true);
}

function formatCrackTime(guessesLog10, speedLog10) {
  const lang = i18nData[currentLang];
  const netLog10 = guessesLog10 - speedLog10;

  if (netLog10 <= 0) return lang.instant;

  const seconds = Math.pow(10, netLog10);
  if (seconds < 60) return `${Math.round(seconds)} ${lang.seconds}`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.round(minutes)} ${lang.minutes}`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.round(hours)} ${lang.hours}`;
  const days = hours / 24;
  if (days < 30) return `${Math.round(days)} ${lang.days}`;
  const months = days / 30;
  if (months < 12) return `${Math.round(months)} ${lang.months}`;
  const years = days / 365.25;
  if (years < 100) return `${Math.round(years)} ${lang.years}`;
  if (years < 1000) return `${Math.round(years / 100)} ${lang.centuries}`;
  if (years < 1000000) return `${Math.round(years / 1000)} ${lang.millennia}`;
  return `${(years / 1000000).toExponential(1)} ${lang.eons}`;
}

// --- Cryptographic Generator ---
function getSecureRandomInt(max) {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % max;
}

function generatePassword() {
  const len = parseInt(genLength.value, 10);
  const useUpper = chkUpper.checked;
  const useLower = chkLower.checked;
  const useDigits = chkDigits.checked;
  const useSymbols = chkSymbols.checked;
  const avoidSimilar = chkAvoidSimilar.checked;

  let upperChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  let lowerChars = "abcdefghijkmnpqrstuvwxyz";
  let digitChars = "23456789";
  let symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  if (!avoidSimilar) {
    upperChars += "IO";
    lowerChars += "lo";
    digitChars += "01";
  }

  let charset = "";
  let mandatoryChars = [];

  if (useUpper) {
    charset += upperChars;
    mandatoryChars.push(upperChars[getSecureRandomInt(upperChars.length)]);
  }
  if (useLower) {
    charset += lowerChars;
    mandatoryChars.push(lowerChars[getSecureRandomInt(lowerChars.length)]);
  }
  if (useDigits) {
    charset += digitChars;
    mandatoryChars.push(digitChars[getSecureRandomInt(digitChars.length)]);
  }
  if (useSymbols) {
    charset += symbolChars;
    mandatoryChars.push(symbolChars[getSecureRandomInt(symbolChars.length)]);
  }

  if (charset.length === 0) {
    charset = lowerChars;
    mandatoryChars.push(lowerChars[getSecureRandomInt(lowerChars.length)]);
  }

  let result = [...mandatoryChars];
  for (let i = result.length; i < len; i++) {
    result.push(charset[getSecureRandomInt(charset.length)]);
  }

  // Fisher-Yates shuffle
  for (let i = result.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }

  const generated = result.join("");
  genResult.textContent = generated;

  // Auto-populate analyzer for instant feedback
  passwordInput.value = generated;
  analyzePassword(generated);
}

function generatePassphrase() {
  const count = 4;
  const words = [];
  for (let i = 0; i < count; i++) {
    words.push(dicewareWords[getSecureRandomInt(dicewareWords.length)]);
  }
  const digit = getSecureRandomInt(90) + 10;
  const generated = words.join("-") + "-" + digit;
  
  genResult.textContent = generated;
  passwordInput.value = generated;
  analyzePassword(generated);
}

// --- Clipboard & Toast ---
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    toast.textContent = i18nData[currentLang].toastCopied;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  });
}

// --- Localization Switching ---
function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (i18nData[lang][key]) {
      el.textContent = i18nData[lang][key];
    }
  });

  document.getElementById("langText").textContent = lang === "ar" ? "English" : "العربية";
  analyzePassword(passwordInput.value);
}

// --- Event Listeners ---
passwordInput.addEventListener("input", (e) => {
  analyzePassword(e.target.value);
});

toggleVisibilityBtn.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleVisibilityBtn.textContent = "🙈";
  } else {
    passwordInput.type = "password";
    toggleVisibilityBtn.textContent = "👁️";
  }
});

genLength.addEventListener("input", (e) => {
  genLengthVal.textContent = e.target.value;
});

generateBtn.addEventListener("click", generatePassword);
generatePassphraseBtn.addEventListener("click", generatePassphrase);

copyGenBtn.addEventListener("click", () => {
  const txt = genResult.textContent;
  if (txt && !txt.includes("اضغط") && !txt.includes("Click")) {
    copyToClipboard(txt);
  }
});

langToggleBtn.addEventListener("click", () => {
  setLanguage(currentLang === "ar" ? "en" : "ar");
});

// Initialise
window.addEventListener("DOMContentLoaded", () => {
  generatePassword();
});
