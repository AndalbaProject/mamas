/* ============================================================
   Happy Birthday • interaksi
   Atur semua isi di CONFIG ini lalu simpan.
   ============================================================ */
const CONFIG = {
  name: "Mamass 🫶",
  dateLabel: "13 JUNE 2003",
  stamp: "13 June",
  // kode rahasia (jumlah angka = jumlah titik di layar = 6). clue: tanggal spesial
  password: "060226",

  // ---------- surat ----------
  letter: [
    "Selamat ulang tahun yaa mas sayanggg, semogaa di umur yang baru ini mas selalu sehat, bahagia, rezekinya lancar, dan semua yang mas harapinn bisa terwujud satu per satu...",
    "Makasiii yaa udah hadir di hidup intann. Makasiii udaaa selalu sabar ngadepin aku, selalu dengerin cerita-cerita random aku, dan selalu ada bahkan di saat aku lagi nyebelin hihii. Jujurrr aku bersyukur banget bisa kenal dan punya mass sampai sekarang.",
    "Semogaa di hari spesial mas ini, mas bisa ngerasain betapa berharganya mas buat orang-orang di sekitar mass, termasuk buat aku 💋 Semogaa apa pun yang lagi mass kejar sekarang bisa segera tercapai, dan kalau nanti ada hari yang berat, semoga mas slaluu ingat kalau mass ga harus ngadepin semuanya sendirian.",
    "Pokoknya hari ini harus bahagia, ga boleh sedih, ga boleh overthinking, karena ini harinya mass hihi. Makasiiii uda lahir ke dunia dan ketemu aku 🤭",
    "Sekalii lagi, selamat ulang tahun ya sayang, semogaa senyum mass hari ini ga ilangg-ilang dan semoga aku masih bisa nemenin banyak ulang tahun mas hehee 🤍",
    "I love you more than words can explain. Happy birthday, my favorite person. 🎂❤️🫶🏻",
  ],
  letterSign: "Always yours 💕",

  // ---------- photo memories (pakai foto1..foto6 yang ada) ----------
  photos: [
    { img: "foto1.jpeg", cap: "Selamat ulang tahun ya sayangg. Semoga semesta selalu baik sama mas, sama seperti mas yang selalu baik ke aku. Intan sayang mas, hari ini, besok, dan seterusnya 💗🎂🥰" },
  ],

  // ---------- timeline ----------
  timeline: [
    { icon: "✨", tag: "The very beginning", title: "First Time We Met", text: "The day the world seemed to spin a little faster, and everything felt different from before." },
    { icon: "💬", tag: "A magical moment", title: "Our First Conversation", text: "The first words spoken, the first laughter shared — the beginning of thousands of stories we would write together." },
    { icon: "🌙", tag: "Growing closer", title: "Endless Late-Night Talks", text: "Hours that felt like minutes, talking about everything and nothing at all." },
    { icon: "💗", tag: "Today & always", title: "Loving You More Each Day", text: "Every moment with you becomes my new favourite memory." },
  ],

  // ---------- playlist ----------
  songs: [
    { title: "Celengan Rindu", artist: "Fiersa Besari",     src: "lagu1.mp3" },
    { title: "Lesung Pipi",    artist: "Raim Laode",         src: "lagu2.mp3" },
    { title: "Sempurna",       artist: "Andra & The Backbone", src: "lagu3.mp3" },
  ],

  // ---------- jar notes ----------
  jarNotes: [
    "Your presence alone is enough to make any room feel warmer.",
    "The way you laugh at your own jokes makes my whole day.",
    "You listen — really listen — and that means everything to me.",
    "You make the most ordinary moments feel like something special.",
    "Your kindness reaches people you don't even realize.",
    "Just being near you feels like coming home.",
    "You remind me, again and again, of what truly matters.",
  ],

  // ---------- final wish ----------
  wish: "Happy birthday, {name}. May your days always be filled with love, happiness, and all the beautiful things you deserve. I am grateful every single day to know you.",
};

/* ============================================================
   apply text content
   ============================================================ */
const $ = (id) => document.getElementById(id);
$("heroName").textContent = CONFIG.name;
$("letterName").textContent = CONFIG.name;
$("modalName").textContent = CONFIG.name;
$("heroDate").innerHTML = `${CONFIG.dateLabel} &nbsp;·&nbsp; THE MOST SPECIAL DAY`;
$("letterStamp").textContent = CONFIG.stamp;
$("wishText").textContent = CONFIG.wish.replace(/\{name\}/g, CONFIG.name);

$("letterBody").innerHTML =
  CONFIG.letter.map((p) => `<p>${p}</p>`).join("") +
  `<p class="sign">${CONFIG.letterSign}</p>`;

$("polaroids").innerHTML = CONFIG.photos
  .map((p, i) => {
    const r = (i % 2 ? 1 : -1) * (2 + (i % 3));
    return `<figure class="pola" data-i="${i}" style="--r:${r}deg">
      <span class="pic" style="background-image:url('${p.img}')"></span>
      <figcaption class="cap">${p.cap}</figcaption>
    </figure>`;
  })
  .join("");

$("timelineList") && ($("timelineList").innerHTML = CONFIG.timeline
  .map(
    (t) => `<div class="tl-card">
      <span class="tl-icon">${t.icon}</span>
      <p class="tl-tag">${t.tag}</p>
      <h3 class="tl-title">${t.title}</h3>
      <p class="tl-text">${t.text}</p>
    </div>`
  )
  .join(""));

/* ============================================================
   LOADER -> LOCK
   ============================================================ */
const loader = $("loader");
const lock = $("lock");
setTimeout(() => {
  loader.classList.add("fade");
  lock.classList.remove("hidden");
}, 2200);

/* ============================================================
   PASSWORD
   ============================================================ */
const pinDots = $("pinDots");
const keypad = $("keypad");
let pin = "";

function renderPin() {
  pinDots.querySelectorAll("span").forEach((d, i) => d.classList.toggle("filled", i < pin.length));
}
keypad.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  if (btn.dataset.key === "del") pin = pin.slice(0, -1);
  else if (pin.length < CONFIG.password.length) pin += btn.dataset.key;
  renderPin();
  if (pin.length === CONFIG.password.length) setTimeout(checkPin, 160);
});
function checkPin() {
  if (pin === CONFIG.password) {
    lock.classList.add("hidden");
    showGift();
  } else {
    pinDots.classList.add("shake");
    setTimeout(() => { pinDots.classList.remove("shake"); pin = ""; renderPin(); }, 500);
  }
}

/* ============================================================
   GIFT OPENING
   ============================================================ */
const gift = $("gift");
const giftbox = $("giftbox");
const main = $("main");

function showGift() {
  gift.classList.remove("hidden");
  giftbox.classList.add("shake-it");
}
giftbox.addEventListener("click", () => {
  if (giftbox.classList.contains("open")) return;
  giftbox.classList.remove("shake-it");
  giftbox.classList.add("open");
  burstPetals(40);
  startMusicOnce();
  setTimeout(() => {
    gift.classList.add("hidden");
    main.classList.remove("hidden");
    initReveal();
    window.scrollTo(0, 0);
  }, 1200);
});

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
function initReveal() {
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
    { threshold: 0.18 }
  );
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
}

/* ============================================================
   PHOTO LIGHTBOX
   ============================================================ */
const lightbox = $("lightbox");
const lbImg = $("lbImg");
const lbCap = $("lbCap");
$("polaroids").addEventListener("click", (e) => {
  const pola = e.target.closest(".pola");
  if (!pola) return;
  const p = CONFIG.photos[+pola.dataset.i];
  lbImg.src = p.img;
  lbCap.textContent = p.cap;
  lightbox.classList.remove("hidden");
});
function closeLightbox() { lightbox.classList.add("hidden"); }
$("lbClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

/* ============================================================
   DIGITAL BOUQUET
   ============================================================ */
const flowerMsg = $("flowerMsg");
const vaseStage = $("vaseStage");
document.querySelectorAll(".flower").forEach((f) => {
  f.addEventListener("click", () => {
    vaseStage.classList.add("gathered");
    flowerMsg.style.opacity = "0";
    setTimeout(() => {
      flowerMsg.textContent = f.dataset.msg;
      flowerMsg.style.opacity = "1";
    }, 200);
    burstPetals(8, f);
  });
});

/* ============================================================
   PLAYLIST
   ============================================================ */
const bgm = $("bgm");
const songListEl = $("songList");
const npTitle = $("npTitle");
const npArtist = $("npArtist");
const disc = $("disc");
const playBtn = $("playBtn");
const progressEl = $("progress");
const progressFill = $("progressFill");
let current = -1;

function renderSongs() {
  songListEl.innerHTML = "";
  CONFIG.songs.forEach((s, i) => {
    const li = document.createElement("li");
    li.className = "song" + (i === current ? " playing" : "");
    li.innerHTML =
      `<span class="s-num">${i + 1}</span>` +
      `<span class="s-meta"><span class="s-title">${s.title}</span><span class="s-artist">${s.artist || ""}</span></span>` +
      `<span class="s-eq"><i></i><i></i><i></i></span>`;
    li.addEventListener("click", () => loadTrack(i, true));
    songListEl.appendChild(li);
  });
}
function loadTrack(i, play) {
  current = (i + CONFIG.songs.length) % CONFIG.songs.length;
  const s = CONFIG.songs[current];
  npTitle.textContent = s.title;
  npArtist.textContent = s.artist || "";
  const src = s.src || "song.mp3";
  if (!bgm.src.endsWith(src)) bgm.src = src;
  renderSongs();
  if (play) bgm.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
}
function setPlaying(on) {
  playBtn.textContent = on ? "⏸" : "▶";
  disc.classList.toggle("spin", on);
  songListEl.classList.toggle("is-playing", on);
}
function tryPlayMusic() {
  bgm.volume = 0.5;
  if (!bgm.currentSrc.endsWith("song.mp3")) bgm.src = "song.mp3";
  bgm.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
}
playBtn.addEventListener("click", () => {
  if (bgm.paused) bgm.play().then(() => setPlaying(true)).catch(() => {});
  else { bgm.pause(); setPlaying(false); }
});
$("prevBtn").addEventListener("click", () => loadTrack(current - 1, true));
$("nextBtn").addEventListener("click", () => loadTrack(current + 1, true));
bgm.addEventListener("timeupdate", () => {
  if (bgm.duration) progressFill.style.width = (bgm.currentTime / bgm.duration) * 100 + "%";
});
bgm.addEventListener("ended", () => loadTrack(current + 1, true));
progressEl.addEventListener("click", (e) => {
  if (!bgm.duration) return;
  const r = progressEl.getBoundingClientRect();
  bgm.currentTime = ((e.clientX - r.left) / r.width) * bgm.duration;
});
renderSongs();
npTitle.textContent = "—";
npArtist.textContent = "tap a song to play";

/* ---------- mulai musik secepat mungkin ---------- */
let musicStarted = false;
function startMusicOnce() {
  if (musicStarted) return;
  musicStarted = true;
  tryPlayMusic();
}
/* coba langsung saat halaman dibuka (mungkin diblok browser) */
window.addEventListener("load", () => {
  bgm.volume = 0.5;
  bgm.play().then(() => { musicStarted = true; setPlaying(true); }).catch(() => {});
});
/* kalau diblok, mulai pada interaksi pertama (sentuh layar / klik / tekan tombol) */
["pointerdown", "touchstart", "keydown", "click"].forEach((ev) =>
  document.addEventListener(ev, startMusicOnce, { passive: true })
);

/* ============================================================
   SHAKE THE JAR
   ============================================================ */
const jar = $("jar");
const shakeBtn = $("shakeBtn");
const jarNote = $("jarNote");
let lastNote = -1;
shakeBtn.addEventListener("click", () => {
  jar.classList.add("shaking");
  jarNote.classList.remove("show");
  shakeBtn.disabled = true;
  setTimeout(() => {
    jar.classList.remove("shaking");
    let i;
    do { i = Math.floor(Math.random() * CONFIG.jarNotes.length); }
    while (i === lastNote && CONFIG.jarNotes.length > 1);
    lastNote = i;
    jarNote.textContent = "🫙 " + CONFIG.jarNotes[i];
    jarNote.classList.add("show");
    burstPetals(10);
    shakeBtn.disabled = false;
  }, 900);
});

/* ============================================================
   CELEBRATE MODAL
   ============================================================ */
const hbdModal = $("hbdModal");
$("celebrateBtn").addEventListener("click", () => {
  hbdModal.classList.remove("hidden");
  modalFlowerBurst();
  burstPetals(60);
});
$("closeModal").addEventListener("click", () => hbdModal.classList.add("hidden"));

/* ============================================================
   FLOWER PETALS
   ============================================================ */
const petals = $("petals");
const PETALS = ["🌸", "🌷", "🌼", "🌻", "🌹", "💮", "🏵️"];

function spawnPetal(x) {
  const p = document.createElement("span");
  p.className = "petal";
  p.textContent = PETALS[(Math.random() * PETALS.length) | 0];
  p.style.left = (x != null ? x : Math.random() * 100) + "%";
  p.style.fontSize = 14 + Math.random() * 18 + "px";
  p.style.animationDuration = 5 + Math.random() * 5 + "s";
  petals.appendChild(p);
  setTimeout(() => p.remove(), 11000);
}
function burstPetals(count, fromEl) {
  let x = null;
  if (fromEl) {
    const r = fromEl.getBoundingClientRect();
    x = ((r.left + r.width / 2) / window.innerWidth) * 100;
  }
  for (let i = 0; i < count; i++) setTimeout(() => spawnPetal(x), i * 40);
}
/* ambient */
setInterval(() => spawnPetal(), 1400);
spawnPetal();

/* modal flower burst */
function modalFlowerBurst() {
  const wrap = $("modalFlowers");
  wrap.innerHTML = "";
  for (let i = 0; i < 26; i++) {
    const f = document.createElement("span");
    f.textContent = PETALS[(Math.random() * PETALS.length) | 0];
    f.style.position = "absolute";
    f.style.left = Math.random() * 100 + "%";
    f.style.top = "-30px";
    f.style.fontSize = 16 + Math.random() * 16 + "px";
    f.style.animation = `fall ${4 + Math.random() * 4}s linear forwards`;
    f.style.animationDelay = Math.random() * 1.5 + "s";
    wrap.appendChild(f);
  }
}

/* music toggle via floating not needed; play starts on gift open */
/*edit
