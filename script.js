
// Rafu & Tonu — সহজে বদলানো যায় এমন JavaScript
// পাসওয়ার্ড বদলাতে নিচের PASSWORD-এর মান পরিবর্তন কর।
const PASSWORD = "Puchkii";

const screens = [...document.querySelectorAll(".screen")];
const nav = document.getElementById("mainNav");
const pageCounter = document.getElementById("pageCounter");

let historyStack = [];
let currentScreen = "gate";

// প্রতিটি সেকশনের আগের স্ক্রল পজিশন মনে রাখবে
const scrollPositions = {};

const sectionNames = {
  home:"হোম", story:"আমাদের গল্প", gallery:"ছবি", timeline:"টাইমলাইন",
  letter:"গোপন চিঠি", messages:"Message Jar", comfort:"মন খারাপের সময়",
  quiz:"কুইজ", fun:"Funny Corner", promise:"ছোট্ট প্রতিশ্রুতি",
  birthday:"জন্মদিন", music:"আমাদের গান", countdownHeart:"হার্ট অ্যানিমেশন",
  wish:"ভবিষ্যতের ইচ্ছা", gifts:"উপহারের বাক্স", surprise:"শেষ সারপ্রাইজ",
  moments:"স্মৃতির বাক্স", reasons:"তুই কেন স্পেশাল",
  dailyNote:"আজকের নোট", extra:"মনের ছোট্ট বাক্স"
};

// সেকশন পরিবর্তনের মূল ফাংশন
function showScreen(id, remember = true) {
  const target = document.getElementById(id);
  if (!target) return;

  // বর্তমান সেকশনের স্ক্রল পজিশন সংরক্ষণ
  if (currentScreen !== id) {
    scrollPositions[currentScreen] = window.scrollY;
  }

  if (remember && currentScreen !== id) {
    historyStack.push(currentScreen);
  }

  screens.forEach(s =>
    s.classList.toggle("active", s.id === id)
  );

  currentScreen = id;

  pageCounter.textContent =
    sectionNames[id] || "তোর মতো করে ঘুরে দেখ 💗";

  document.querySelectorAll("[data-go]").forEach(b =>
    b.classList.toggle("active", b.dataset.go === id)
  );

  nav.classList.remove("open");

  // নতুন সেকশন বা আগের সংরক্ষিত অবস্থায় নিয়ে যাবে
  requestAnimationFrame(() => {
    window.scrollTo({
      top: scrollPositions[id] || 0,
      behavior: "auto"
    });
  });
}

// পাসওয়ার্ড দিয়ে ওয়েবসাইট খোলা
function unlock() {
  const input = document.getElementById("passwordInput");

  if (input.value.trim().toLowerCase() === PASSWORD.toLowerCase()) {
    document.getElementById("gateError").textContent = "";
    historyStack = [];
    showScreen("home", false);
  } else {
    document.getElementById("gateError").textContent =
      "পাসওয়ার্ডটা মেলেনি—আবার চেষ্টা কর 💗";
    input.focus();
  }
}

document.getElementById("unlockBtn").addEventListener("click", unlock);

document.getElementById("passwordInput").addEventListener("keydown", e => {
  if (e.key === "Enter") unlock();
});

document.querySelectorAll("[data-go]").forEach(b =>
  b.addEventListener("click", () => showScreen(b.dataset.go))
);

document.querySelectorAll("[data-home]").forEach(b =>
  b.addEventListener("click", e => {
    e.preventDefault();
    showScreen("home");
  })
);

document.getElementById("homeBtn").addEventListener("click", () =>
  showScreen("home")
);

// আগের সেকশনে ফিরে যাওয়া
document.getElementById("backBtn").addEventListener("click", () => {
  let previous = historyStack.pop();

  if (!previous || previous === "gate") {
    previous = "home";
  }

  showScreen(previous, false);
});

document.getElementById("menuToggle").addEventListener("click", () =>
  nav.classList.toggle("open")
);

// হোম পেজের টাইলস
const tiles = [
  ["📖","আমাদের গল্প","শুরু থেকে আবার ফিরে আসা","story"],
  ["📸","ছবির অ্যালবাম","ছবি আর TikTok স্মৃতি","gallery"],
  ["⏳","গল্পের দিনগুলো","বন্ধুত্বের টাইমলাইন","timeline"],
  ["💌","গোপন চিঠি","তোর জন্য কিছু কথা","letter"],
  ["🫙","Message Jar","একটা মেসেজ তুলে নে","messages"],
  ["🌙","মুড কর্নার","আজ তোর মুড কেমন?","comfort"],
  ["🧠","বন্ধুত্বের কুইজ","তুই আমাকে কতটা চিনিস?","quiz"],
  ["😂","Funny Corner","মিম আর মজার কথা","fun"],
  ["🤝","ছোট্ট প্রতিশ্রুতি","যত্ন আর বোঝাপড়া","promise"],
  ["🎂","জন্মদিন","কাউন্টডাউন আর শুভেচ্ছা","birthday"],
  ["🎧","আমাদের গান","পছন্দের গানগুলো","music"],
  ["🎁","শেষ সারপ্রাইজ","একটা বিশেষ বার্তা","surprise"],
  ["📸","স্মৃতির বাক্স","মনে পড়া মুহূর্ত","moments"],
  ["🌸","তুই কেন স্পেশাল","মিষ্টি কিছু কথা","reasons"],
  ["💌","আজকের নোট","নিজের যত্নের কথা","dailyNote"],
  ["✨","মনের ছোট্ট বাক্স","মনে রাখার কথা","extra"]
];

document.getElementById("homeTiles").innerHTML = tiles.map(t =>
  `<button class="tile" data-go="${t[3]}"><span class="tile-icon">${t[0]}</span><h3>${t[1]}</h3><p>${t[2]}</p></button>`
).join("");

document.querySelectorAll("#homeTiles [data-go]").forEach(b =>
  b.addEventListener("click", () => showScreen(b.dataset.go))
);

// ছবির গ্যালারি
const photoGroups = [
  {
    id:"rafiGallery",
    files:["rafi1.jpg"],
    captions:["Rafu-এর ছবি 💗"]
  },
  {
    id:"tonuGallery",
    files:["tonu1.jpg"],
    captions:["Tonu-এর ছবি 🫶"]
  },
  {
    id:"tiktokGallery",
    files:["rafi-tiktok.jpg","tonu-tiktok.jpg","combined-tiktok.jpg"],
    captions:[
      "Rafu-এর TikTok আইডি",
      "Tonu-এর TikTok আইডি",
      "আমাদের Combined TikTok 💞"
    ]
  }
];

photoGroups.forEach(group => {
  const container = document.getElementById(group.id);

  container.innerHTML = group.files.map((file,i) => `
    <button class="photo-card" data-file="${file}" data-caption="${group.captions[i]}">
      <div class="placeholder" data-placeholder>♡</div>
      <span>${group.captions[i]}</span>
    </button>
  `).join("");

  group.files.forEach((file,i) => {
    const card = container.querySelectorAll(".photo-card")[i];

    const img = new Image();
    img.src = file;
    img.alt = group.captions[i];

    img.onload = () => {
      const ph = card.querySelector("[data-placeholder]");
      if (ph) ph.replaceWith(img);
    };

    card.addEventListener("click", () => {
      const lightbox = document.getElementById("lightbox");
      const big = document.getElementById("lightboxImage");

      big.src = file;
      big.alt = group.captions[i];

      document.getElementById("lightboxCaption").textContent =
        group.captions[i];

      lightbox.classList.remove("hidden");

      big.onerror = () => {
        lightbox.classList.add("hidden");
        alert("এই ছবিটি assets ফোল্ডারে যোগ করলেই দেখা যাবে: " + file);
      };
    });
  });
});

function closeLightbox() {
  document.getElementById("lightbox").classList.add("hidden");
}

document.getElementById("closeLightbox").addEventListener("click", closeLightbox);

document.getElementById("lightbox").addEventListener("click", e => {
  if (e.target.id === "lightbox") closeLightbox();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});

// Message Jar
const messages = [
  "ময়না, নিজের যত্ন নিস—তোরও বিশ্রাম দরকার। 💗🌷",
  "পুচকি, তুই যেমন আছিস তেমনভাবেই মূল্যবান। 🫶🥹",
  "আজ একটু হাসিস—ছোট্ট হাসিও দিনটা সুন্দর করতে পারে। 😊💖",
  "মন খারাপ হলে একা সব সামলাতে হবে না; বিশ্বাসের কাউকে বলিস। 🌙💌",
  "আমাদের মিমগুলোর কথা মনে আছে? আবার একদিন হাসাহাসি করব! 😂💗",
  "ব্যস্ত থাকলে নিজের জন্যও একটু সময় রাখিস। ✨🌸",
  "আমাদের সুন্দর স্মৃতিগুলো যত্ন করে রাখিস। 💌🫶",
  "তোর স্বপ্নগুলো এক এক করে পূরণ হোক। 🎀🌟",
  "তুই হাসলে আশেপাশের মুহূর্তগুলোও হালকা লাগে। 😊🌷",
  "সব সময় শক্ত থাকার দরকার নেই—বিশ্রামও জরুরি। 🫂💗",
  "নিজের অনুভূতিকে কখনো ছোট ভাবিস না। 🥹💌",
  "আজকের ছোট্ট ভালো লাগাটাও উদযাপন করিস। ✨💖",
  "একটা খারাপ দিন মানেই খারাপ জীবন নয়। 🌦️🌈",
  "তোর পছন্দের গান শুনে একটু আরাম করিস। 🎧💞",
  "বন্ধুত্ব মানে কথা, সম্মান আর বোঝাপড়া। 🤝💗",
  "নিজের গতিতে এগিয়ে যা—তাড়া নেই। 🌱✨",
  "পুরোনো মজার স্মৃতি মনে করে একটু হাসিস। 😂📸",
  "তুই গুরুত্বপূর্ণ, তোর কথাও গুরুত্বপূর্ণ। 💌🥹",
  "আজ নিজের জন্য একটা ছোট্ট ভালো কাজ করিস। 🌷🫶",
  "তোর দিনটা শান্ত আর সুন্দর হোক। 🌙💖",
  "যা পারিস না, সেটা শেখার সময় নিজেকে সময় দিস। 🌱📚",
  "ভুল হলে শেখা যায়—নিজেকে দোষ দিয়ে আটকে থাকিস না। 💗✨",
  "একটু পানি খা, কাঁধটা ঢিলে কর, আর আরাম কর। 💧🌸",
  "স্মৃতির সব দিন নিখুঁত না হলেও কিছু মুহূর্ত খুব দামি। 📖💞",
  "তোর নিজের স্বপ্নগুলোকে গুরুত্ব দিস। 🌟🫶",
  "যখন ইচ্ছে, নিজের মতো করে হাসিস। 😭💗",
  "চুপচাপ দিনেও তোর মূল্য কমে যায় না। 🌙💌",
  "একটা মিষ্টি গান আর একটু শান্তি—আজ এতটুকুই যথেষ্ট। 🎧🌷",
  "আমাদের গল্পে হাসি যেমন আছে, শেখার মুহূর্তও আছে। 📖💖",
  "কেউ ব্যস্ত থাকলে নিজের মনকেও যত্নে রাখিস। 🫶🌼",
  "নিজের সীমা আর অন্যের সীমা—দুটোকেই সম্মান করিস। 🤝💗",
  "আজকের জন্য তোর প্রতি একটুখানি মায়া রইল। 🥹💞",
  "ছোট্ট অগ্রগতিও অগ্রগতি—নিজেকে বাহবা দিস। 🌱🎀",
  "তোর প্রিয় মানুষদের সঙ্গে সুন্দর কথা জমা করিস। 💌🌷",
  "মন খারাপ এলে ধীরে ধীরে সময় নে, তাড়া করিস না। 🌧️🫂",
  "তুই নিজের মতো করে সুন্দর একটা ভবিষ্যৎ গড়তে পারিস। ✨💖",
  "একটা হাসি, একটা গান, একটা বিরতি—নিজেকে একটু সময় দে। 🎧😊",
  "আমাদের কম্বাইন্ড অ্যাকাউন্টটাও ছোট্ট স্মৃতির অ্যালবাম। 📱💞",
  "নিজের প্রতি নরম হ—তুইও যত্ন পাওয়ার যোগ্য। 🫶🌸",
  "এই ছোট্ট মেসেজটা মনে করিয়ে দিক: ভালো থাকিস, পুচকি। 💗🥹"
];

document.getElementById("drawMessage").addEventListener("click", () => {
  const last = document.getElementById("jarMessage").dataset.last;

  let next = Math.floor(Math.random() * messages.length);

  if (messages.length > 1 && String(next) === last) {
    next = (next + 1) % messages.length;
  }

  document.getElementById("jarMessage").dataset.last = next;
  document.getElementById("jarMessage").textContent = messages[next];
});

// Mood Corner
const moodMessages = {
  happy:"এই খুশিটা উপভোগ কর! আজকের সুন্দর মুহূর্তটা মনে রাখিস 😊💗",
  sad:"পুচকি, মন খারাপ হওয়া স্বাভাবিক। একটু পানি খা, বিশ্রাম নে, আর চাইলে বিশ্বাসের কারও সঙ্গে কথা বলিস। তোর অনুভূতি গুরুত্বপূর্ণ। 🌙",
  bored:"চল, একটা মিম দেখি বা পুরোনো কোনো মজার স্মৃতি মনে করি! 😂",
  angry:"একটু থাম, ধীরে শ্বাস নে, তারপর শান্ত হলে কথা বলিস। তোর অনুভূতি বলা যায়—কিন্তু নিজের আর অন্যের প্রতি নরম থাকিস। 🌷"
};

document.querySelectorAll("[data-mood]").forEach(b =>
  b.addEventListener("click", () => {
    document.getElementById("moodMessage").textContent =
      moodMessages[b.dataset.mood];
  })
);

// Quiz
const quizData = [
 ["Rafu-এর বন্ধুর ডাকনাম কী?",["Puchkii","Mishti","Jui"],0],
 ["তোদের প্রথম পরিচয় কোথায়?",["Facebook page","Halal People WhatsApp group","স্কুলে"],1],
 ["তোরা কোন গেম খেলতিস?",["Minecraft","Roblox","Free Fire"],2],
 ["তনুর জন্মদিন কবে?",["২৮ মে","১৪ ফেব্রুয়ারি","১২ ডিসেম্বর"],0],
 ["তোদের একসঙ্গে পোস্ট করার অ্যাকাউন্ট কোনটি?",["YouTube","Combined TikTok","Instagram"],1],
 ["Rafu তনুকে কী নামে ডাকে?",["পুচকি","রানি সাহেবা","ম্যাডাম"],0],
 ["তোদের প্রথম পরিচয়ের অ্যাপ কোনটি ছিল?",["WhatsApp","Telegram","Snapchat"],0],
 ["প্রথম পরিচয়ের গ্রুপের নাম কী ছিল?",["Halal People","Friends Forever","SSC Squad"],0],
 ["তোদের গল্পে Marufa কে ছিল?",["সেই সময়ের পরিচিত বন্ধু","শিক্ষক","কাজিন"],0],
 ["তোরা কী শেয়ার করতে পছন্দ করিস?",["শুধু খবর","মিম আর রিল","শুধু নোট"],1],
 ["তনুর জন্মদিন কোন মাসে?",["জানুয়ারি","মে","ডিসেম্বর"],1],
 ["এই ওয়েবসাইটটা কীসের জন্য?",["পরীক্ষার রুটিন","বন্ধুত্বের স্মৃতি আর উপহার","অনলাইন দোকান"],1],
 ["Message Jar-এ কী পাওয়া যায়?",["ছোট্ট মিষ্টি মেসেজ","পরীক্ষার নম্বর","আবহাওয়া"],0],
 ["মন খারাপ হলে কী করা ভালো?",["সব লুকিয়ে রাখা","বিশ্বাসের কারও সঙ্গে কথা বলা","নিজেকে দোষ দেওয়া"],1],
 ["বন্ধুত্বে কোনটা গুরুত্বপূর্ণ?",["চাপ দেওয়া","সম্মান আর বোঝাপড়া","সব সময় একমত হওয়া"],1],
 ["তনুর জন্য চিঠিটা কে লিখেছে?",["Rafu","Marufa","Apon"],0],
 ["১৫ সেকেন্ডের অ্যানিমেশনটি কী?",["হার্ট ভরার অ্যানিমেশন","রকেট","ঘড়ি"],0],
 ["ছবির অ্যালবামে কী আছে?",["শুধু ফুল","Rafu, Tonu ও TikTok স্ক্রিনশট","শুধু বই"],1],
 ["তনুর জন্য উপহারটা কেমন?",["স্মৃতিভরা ছোট্ট ওয়েবসাইট","গেমিং দোকান","ক্লাস নোট"],0],
 ["তোর স্বপ্ন নিয়ে কী করা উচিত?",["গুরুত্ব দেওয়া","ভুলে যাওয়া","অন্যের সঙ্গে তুলনা করা"],0],
 ["কোনটা স্বাস্থ্যকর বন্ধুত্বের অংশ?",["নিজের সীমা মানা","জোর করা","রাগ দেখিয়ে বাধ্য করা"],0],
 ["তনুর পছন্দের গানের তালিকায় কোনটি আছে?",["Moho","Baby Shark","Jingle Bells"],0],
 ["ওয়েবসাইটের গেটের প্রাথমিক পাসওয়ার্ড কী?",["Puchkii","Rafu123","Tonu2026"],0],
 ["কুইজে মোট কয়টি প্রশ্ন আছে?",["১০টি","২০টি","৩০টি"],2],
 ["সারপ্রাইজের মূল উদ্দেশ্য কী?",["চাপ তৈরি করা","স্মৃতি আর মায়া ভাগ করা","নম্বর দেওয়া"],1],
 ["বন্ধু ব্যস্ত থাকলে কী করা যায়?",["বারবার চাপ দেওয়া","সময় ও স্পেসকে সম্মান করা","রাগ করে থাকা"],1],
 ["একটি মজার স্মৃতি কী হতে পারে?",["মিম শেয়ার করে হাসা","শুধু ঝগড়া","পরীক্ষার খাতা"],0],
 ["নিজের যত্নের মধ্যে কোনটি পড়ে?",["বিশ্রাম নেওয়া","নিজেকে অবহেলা করা","ঘুম বাদ দেওয়া"],0],
 ["বন্ধুত্বের স্মৃতি কোথায় রাখা হয়েছে?",["এই ওয়েবসাইটে","ক্যালকুলেটরে","কোনো জায়গায় নয়"],0],
 ["তনুর জন্য শেষ শুভকামনা কী?",["ভালো থাকুক আর স্বপ্ন পূরণ হোক","সব সময় ব্যস্ত থাকুক","কখনো বিশ্রাম না নিক"],0]
];

document.getElementById("quizQuestions").innerHTML = quizData.map((q,i) =>
  `<div class="question"><p>${i+1}. ${q[0]} 💗</p>${q[1].map((opt,j)=>
  `<label><input type="radio" name="q${i+1}" value="${j}" required> ${opt}</label>`
  ).join("")}</div>`
).join("");

document.getElementById("quizForm").addEventListener("submit", e => {
  e.preventDefault();

  let score = 0;

  quizData.forEach((q,i) => {
    const picked = document.querySelector(`input[name="q${i+1}"]:checked`);
    if (picked && Number(picked.value) === q[2]) score++;
  });

  document.getElementById("quizResult").textContent =
    `তোর স্কোর ${score}/30 🥹💗 ${
      score >= 25
        ? "ওয়াও! তুই তো আমাদের গল্প দারুণ মনে রেখেছিস! 🫶✨"
        : score >= 15
        ? "ভালোই করেছিস! আরেকবার চেষ্টা করবি? 🌷"
        : "চিন্তা নেই—আবার খেল, মজাটাই আসল! 💌"
    }`;

  document.getElementById("quizPrize").classList.toggle("hidden", score < 25);
});

// Funny Corner
const funnyLines = [
  "আমরা সিরিয়াস কথা বলতে গিয়ে আবার মিমে চলে যাই 😭",
  "একটা রিল পাঠিয়ে বলা: ‘এইটা একদম তুই!’ 😂",
  "Sad mood-এ ঢুকে Funny Corner-এ এসে হাসতে শুরু! 🤭",
  "আমাদের কম্বাইন্ড অ্যাকাউন্টের প্রতিটা পোস্ট একটা নতুন স্মৃতি। 💗"
];

document.getElementById("newFunny").addEventListener("click", () => {
  const el = document.getElementById("funnyLine");
  let n = Math.floor(Math.random() * funnyLines.length);
  el.textContent = funnyLines[n];
});

// Gift Boxes
document.querySelectorAll("[data-gift]").forEach(b =>
  b.addEventListener("click", () => {
    document.getElementById("giftMessage").textContent = b.dataset.gift;
  })
);

// Wish Box
document.getElementById("showWish").addEventListener("click", () => {
  const value = document.getElementById("wishInput").value.trim();

  document.getElementById("wishOutput").textContent =
    value ? `তোর ইচ্ছা: ${value}` : "আগে একটা ইচ্ছা লিখে নে 💗";
});

// Final Surprise
document.getElementById("finalSurprise").addEventListener("click", () => {
  document.getElementById("finalReveal").classList.remove("hidden");
  document.getElementById("finalSurprise").classList.add("hidden");
});

// ১৫ সেকেন্ডের হার্ট অ্যানিমেশন
let heartTimer = null;

document.getElementById("startHeart").addEventListener("click", () => {
  const heart = document.getElementById("bigHeart");
  const text = document.getElementById("heartText");

  heart.classList.remove("filling");
  void heart.offsetWidth;
  heart.classList.add("filling");

  text.textContent = "একটু অপেক্ষা কর... 💗";

  if (heartTimer) clearTimeout(heartTimer);

  heartTimer = setTimeout(() => {
    text.textContent = "এই ছোট্ট হার্টটা তোর জন্য, পুচকি! 🫶";
    heart.classList.remove("filling");
    heart.textContent = "♥";
  }, 15000);

  heart.textContent = "♡";
});

// জন্মদিনের কাউন্টডাউন
function updateCountdown() {
  const now = new Date();
  let year = now.getFullYear();

  let birthday = new Date(year, 4, 28, 0, 0, 0);

  if (birthday.getTime() < now.getTime()) {
    birthday = new Date(year + 1, 4, 28, 0, 0, 0);
  }

  const diff = birthday - now;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);

  document.getElementById("countdown").textContent =
    `${days} দিন ${hours} ঘণ্টা ${mins} মিনিট`;
}

updateCountdown();
setInterval(updateCountdown, 60000);
