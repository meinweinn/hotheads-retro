const bootScreen = document.querySelector("[data-boot-screen]");
const bootBackground = document.querySelector("[data-boot-bg]");
const bootStartButton = document.querySelector("[data-boot-start]");
const bootLinesNode = document.querySelector("[data-boot-lines]");
const bootProgress = document.querySelector("[data-boot-progress]");
const bootFill = document.querySelector("[data-boot-fill]");
const bootLabel = document.querySelector("[data-boot-label]");
const bootThemeStage = document.querySelector("[data-boot-theme-stage]");
const bootIgniteStage = document.querySelector("[data-boot-ignite-stage]");
const bootThemeConfirm = document.querySelector("[data-boot-theme-confirm]");
const bootThemeFill = document.querySelector("[data-boot-theme-fill]");
const audioStatus = document.querySelector("[data-audio-status]");
const audioToggle = document.querySelector("[data-audio-toggle]");
const fullscreenToggle = document.querySelector("[data-fullscreen-toggle]");
const fullscreenLabel = document.querySelector("[data-fullscreen-label]");
const fullscreenPrompt = document.querySelector("[data-fullscreen-prompt]");
const fullscreenAccept = document.querySelector("[data-fullscreen-accept]");
const fullscreenDismiss = document.querySelector("[data-fullscreen-dismiss]");
const victoryScreen = document.querySelector("[data-victory-screen]");
const victoryBackdrop = document.querySelector("[data-victory-backdrop]");
const victoryChip = document.querySelector("[data-victory-chip]");
const victoryTitle = document.querySelector("[data-victory-title]");
const victoryCopy = document.querySelector("[data-victory-copy]");
const victoryObjective = document.querySelector("[data-victory-objective]");
const victoryShield = document.querySelector("[data-victory-shield]");
const victorySync = document.querySelector("[data-victory-sync]");
const victoryRewards = document.querySelector("[data-victory-rewards]");
const victoryContinueButton = document.querySelector("[data-victory-continue]");
const victoryReplayButton = document.querySelector("[data-victory-replay]");

const sceneButtons = document.querySelectorAll("[data-scene]");
const sceneStateNodes = document.querySelectorAll("[data-scene-state]");
const actionButtons = document.querySelectorAll("[data-action]");
const choiceButtons = document.querySelectorAll("[data-choice]");
const themeButtons = document.querySelectorAll("[data-theme-option]");

const sceneChip = document.querySelector("[data-scene-chip]");
const sceneTitle = document.querySelector("[data-scene-title]");
const sceneZone = document.querySelector("[data-scene-zone]");
const sceneRisk = document.querySelector("[data-scene-risk]");
const sceneImage = document.querySelector("[data-scene-image]");
const transmission = document.querySelector("[data-transmission]");
const consoleOutput = document.querySelector("[data-console-output]");
const objectiveTitle = document.querySelector("[data-objective-title]");
const objectiveCopy = document.querySelector("[data-objective-copy]");
const heatValue = document.querySelector("[data-heat-value]");
const shieldValue = document.querySelector("[data-shield-value]");
const syncValue = document.querySelector("[data-sync-value]");
const heatBar = document.querySelector("[data-heat-bar]");
const shieldBar = document.querySelector("[data-shield-bar]");
const syncBar = document.querySelector("[data-sync-bar]");
const inventoryList = document.querySelector("[data-inventory-list]");
const clockNode = document.querySelector("[data-clock]");
const gameCanvas = document.querySelector("[data-game-canvas]");
const gameViewport = gameCanvas ? gameCanvas.closest(".viewport") : null;
const gameStatusNode = document.querySelector("[data-game-status]");
const gameScoreNode = document.querySelector("[data-game-score]");
const gameCenterNode = document.querySelector("[data-game-center]");
const gameCenterTitle = document.querySelector("[data-game-center-title]");
const gameCenterCopy = document.querySelector("[data-game-center-copy]");
const brandLogo = document.querySelector("[data-brand-logo]");

const bootScript = [
  "IGNITION BUS .... OK",
  "ARCHIVE CORE ..... ONLINE",
  "PIXEL HUD ........ LOADED",
  "AUDIO CHANNEL .... ARMED",
  "QUEST ENGINE ..... READY",
];

const scenes = {
  hydra: {
    chip: "Chapter 01",
    title: "Hydra Gate",
    zone: "Zone // Cliffside Ruins",
    risk: "Risk // High",
    image: "./assets/scene-1.jpg",
    alt: "HotHeads hero facing a hydra.",
    transmission:
      "Hydra signatures detected beyond the ridge. Use scan commands before crossing the broken ledge.",
    objectiveTitle: "Reach the hydra overlook",
    objectiveCopy:
      "Collect relic shards and avoid hydra bolts. Scan helps reveal the next shard.",
    console:
      "Hydra Gate loaded. Move with WASD. Gather the relic shards before the sky breaks.",
    inventory: ["Flame Sigil / Equipped", "Bone Key / Dormant", "Ash Map / Traced"],
    game: {
      label: "Relics",
      target: 5,
      playerSpeed: 220,
      heatBase: 56,
      pickupColor: "#ffd463",
      hazardColor: "#92f7ff",
    },
  },
  warden: {
    chip: "Chapter 02",
    title: "Lava Warden",
    zone: "Zone // Furnace Hollow",
    risk: "Risk // Extreme",
    image: "./assets/scene-2.jpg",
    alt: "A beast forged in molten lava.",
    transmission:
      "The furnace beast is dormant but not dead. Relic shards are embedded in the arena floor.",
    objectiveTitle: "Extract relic shards",
    objectiveCopy:
      "Collect coolant nodes and survive the ember fall. Ignite clears nearby hazards.",
    console:
      "Lava Warden loaded. Heat is rising fast. Recover coolant nodes before the arena saturates.",
    inventory: ["Cracked Relic / Unstable", "Ash Hook / Equipped", "Furnace Lens / Online"],
    game: {
      label: "Coolant",
      target: 4,
      playerSpeed: 210,
      heatBase: 78,
      pickupColor: "#7cffda",
      hazardColor: "#ff7a2a",
    },
  },
  river: {
    chip: "Chapter 03",
    title: "River Run",
    zone: "Zone // Smoke Channel",
    risk: "Risk // Medium",
    image: "./assets/scene-3.jpg",
    alt: "A flaming boat crossing an infernal river.",
    transmission:
      "Convoy route confirmed. Smoke density is heavy but the river is still open for passage.",
    objectiveTitle: "Escort the convoy",
    objectiveCopy:
      "Capture lantern checkpoints while dodging debris drifting across the current.",
    console:
      "River Run loaded. Current is active. Tag each lantern beacon and keep the route clear.",
    inventory: ["Lantern Core / Active", "Smoke Chart / Updated", "Torch Pike / Ready"],
    game: {
      label: "Lanterns",
      target: 6,
      playerSpeed: 235,
      heatBase: 48,
      pickupColor: "#ffb851",
      hazardColor: "#d7e4ef",
    },
  },
};

const sceneOrder = ["hydra", "warden", "river"];
const progressStorageKey = "hotheads-archive-progress-v1";
const completedStorageKey = "hotheads-archive-completed-v1";
const themeStorageKey = "hotheads-archive-theme-v1";
const validThemes = new Set(["inferno", "toxic", "abyss"]);
const actionConfig = {
  scan: { hotkey: "1", label: "Scan Zone" },
  ignite: { hotkey: "2", label: "Ignite Relic", cooldown: 10 },
  shield: { hotkey: "3", label: "Raise Shield", cooldown: 20 },
  surge: { hotkey: "4", label: "Dash Surge" },
};
const actionDescriptions = {
  scan:
    "Scan Zone: reveals nearby objectives with a radar pulse. Usable once per mission.",
  ignite:
    "Ignite Relic: releases a close-range burst that clears nearby hazards. Cooldown: 10 seconds.",
  shield:
    "Raise Shield: restores 50% shield integrity and projects a defensive shell. Cooldown: 20 seconds.",
  surge:
    "Dash Surge: doubles movement speed for 1 second. Usable once per mission.",
};
const logoByTheme = {
  inferno: "./assets/hotheads-logo-trans.png",
  toxic: "./assets/hotheads-logo-trans-toxic.png",
  abyss: "./assets/hotheads-logo-trans-abyss.png",
};
const bootBackgroundByTheme = {
  inferno: "./assets/hh-bg-website-4k.png",
  toxic: "./assets/hh-bg-website-4k-toxic.jpg",
  abyss: "./assets/hh-bg-website-4k-abyss.jpg",
};
const characterSpriteByTheme = {
  inferno: "./assets/hothead-character.png",
  toxic: "./assets/hothead-character-toxic.png",
  abyss: "./assets/hothead-character-abyss.png",
};
const characterGlowByTheme = {
  inferno: {
    inner: [255, 214, 112],
    outer: [255, 106, 61],
  },
  toxic: {
    inner: [190, 255, 118],
    outer: [57, 255, 136],
  },
  abyss: {
    inner: [219, 164, 255],
    outer: [165, 96, 255],
  },
};
const scanPulseByTheme = {
  inferno: {
    ring: [255, 184, 81],
    fill: [255, 106, 61],
    sweep: [255, 226, 155],
  },
  toxic: {
    ring: [124, 255, 170],
    fill: [57, 255, 136],
    sweep: [215, 255, 167],
  },
  abyss: {
    ring: [139, 215, 255],
    fill: [165, 96, 255],
    sweep: [229, 195, 255],
  },
};
const igniteBurstByTheme = {
  inferno: {
    core: [255, 214, 112],
    ring: [255, 106, 61],
    ember: [255, 145, 48],
  },
  toxic: {
    core: [223, 255, 143],
    ring: [57, 255, 136],
    ember: [137, 255, 116],
  },
  abyss: {
    core: [235, 195, 255],
    ring: [165, 96, 255],
    ember: [122, 196, 255],
  },
};
const shieldPulseByTheme = {
  inferno: {
    shell: [255, 214, 112],
    ring: [255, 184, 81],
    glow: [255, 238, 196],
  },
  toxic: {
    shell: [190, 255, 118],
    ring: [124, 255, 170],
    glow: [230, 255, 204],
  },
  abyss: {
    shell: [200, 184, 255],
    ring: [139, 215, 255],
    glow: [239, 229, 255],
  },
};
const surgePulseByTheme = {
  inferno: {
    core: [255, 214, 112],
    trail: [255, 106, 61],
    spark: [255, 238, 196],
  },
  toxic: {
    core: [190, 255, 118],
    trail: [57, 255, 136],
    spark: [226, 255, 203],
  },
  abyss: {
    core: [200, 184, 255],
    trail: [139, 215, 255],
    spark: [239, 229, 255],
  },
};
const sceneImageByTheme = {
  hydra: {
    inferno: "./assets/scene-1.jpg",
    toxic: "./assets/scene-1-toxic.jpg",
    abyss: "./assets/scene-1-abyss.jpg",
  },
  warden: {
    inferno: "./assets/scene-2.jpg",
    toxic: "./assets/scene-2-toxic.jpg",
    abyss: "./assets/scene-2-abyss.jpg",
  },
  river: {
    inferno: "./assets/scene-3.jpg",
    toxic: "./assets/scene-3-toxic.jpg",
    abyss: "./assets/scene-3-abyss.jpg",
  },
};

const loadUnlockedIndex = () => {
  try {
    const raw = window.localStorage.getItem(progressStorageKey);
    if (raw === null) {
      return 0;
    }

    const parsed = Number(raw);
    if (Number.isNaN(parsed)) {
      return 0;
    }

    return Math.min(sceneOrder.length - 1, Math.max(0, parsed));
  } catch {
    return 0;
  }
};

const saveUnlockedIndex = (value) => {
  try {
    window.localStorage.setItem(progressStorageKey, String(value));
  } catch {
    // Ignore storage issues and keep progress in memory only.
  }
};

const loadCompletedScenes = () => {
  try {
    const raw = window.localStorage.getItem(completedStorageKey);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((sceneId) => sceneOrder.includes(sceneId));
  } catch {
    return [];
  }
};

const saveCompletedScenes = (completedScenes) => {
  try {
    window.localStorage.setItem(
      completedStorageKey,
      JSON.stringify(Array.from(completedScenes))
    );
  } catch {
    // Ignore storage issues and keep progress in memory only.
  }
};

const loadTheme = () => {
  try {
    const raw = window.localStorage.getItem(themeStorageKey);
    return validThemes.has(raw) ? raw : "inferno";
  } catch {
    return "inferno";
  }
};

const saveTheme = (theme) => {
  try {
    window.localStorage.setItem(themeStorageKey, theme);
  } catch {
    // Ignore storage issues and keep theme in memory only.
  }
};

const state = {
  currentScene: sceneOrder[loadUnlockedIndex()],
  heat: scenes[sceneOrder[loadUnlockedIndex()]].game.heatBase,
  shield: 100,
  sync: 0,
  booted: false,
  booting: false,
  unlockedIndex: loadUnlockedIndex(),
  completedScenes: new Set(loadCompletedScenes()),
  theme: loadTheme(),
};

const game = {
  width: 960,
  height: 540,
  player: {
    x: 480,
    y: 270,
    radius: 12,
    hitOffsetY: 14,
    hp: 100,
    flash: 0,
    direction: "right",
    moveX: 0,
    moveY: 0,
    stride: 0,
  },
  pickups: [],
  hazards: [],
  particles: [],
  collected: 0,
  target: scenes.hydra.game.target,
  running: false,
  won: false,
  lost: false,
  scanPulse: 0,
  scanPulseMax: 0,
  igniteBurst: 0,
  igniteBurstMax: 0,
  shieldPulse: 0,
  shieldPulseMax: 0,
  surgePulse: 0,
  surgePulseMax: 0,
  actionState: {
    scanUsed: false,
    igniteCooldown: 0,
    shieldCooldown: 0,
    surgeUsed: false,
    surgeTimer: 0,
  },
  hazardTimer: 0,
  pickupTimer: 0,
  hitCooldown: 0,
  elapsed: 0,
  currentPushX: 0,
};

const keys = Object.create(null);

let audioContext = null;
let audioEnabled = true;
let holdTone = null;
let holdProgress = 0;
let holdAnimationFrame = 0;
let holdActive = false;
let holdCompleted = false;
let holdLastTick = 0;
let gameRaf = 0;
let lastFrame = 0;
let pendingVictoryNextScene = null;
let bootThemeConfirmed = false;
let bootThemeHoldProgress = 0;
let bootThemeHoldActive = false;
let bootThemeHoldFrame = 0;
let bootThemeHoldLastTick = 0;
let bootBackgroundSwapId = 0;
let themeVisualsReady = false;
let bootThemeTransitioning = false;

const ctx = gameCanvas ? gameCanvas.getContext("2d") : null;
const characterSprite = new Image();
const bootThemeSequenceItems = bootThemeStage
  ? [
      ...bootThemeStage.querySelectorAll(".boot-theme-actions"),
      ...bootThemeStage.querySelectorAll(".boot-theme-card"),
      ...bootThemeStage.querySelectorAll(".boot-theme-head"),
    ]
  : [];
const bootIgniteSequenceItems = bootIgniteStage
  ? [
      ...bootIgniteStage.querySelectorAll(".boot-window"),
      ...bootIgniteStage.querySelectorAll(".boot-actions"),
    ]
  : [];
const characterSpriteState = {
  currentTheme: state.theme,
  currentImage: characterSprite,
  previousImage: null,
  mix: 1,
  requestId: 0,
};
characterSprite.src = characterSpriteByTheme[state.theme] || characterSpriteByTheme.inferno;
if (ctx) {
  ctx.imageSmoothingEnabled = true;
}

const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const random = (min, max) => min + Math.random() * (max - min);

const primeBootSequenceItems = (items, hidden = false) => {
  items.forEach((item) => {
    item.classList.add("boot-seq-item");
    item.classList.toggle("is-seq-hidden", hidden);
  });
};

const sequenceBootItemsOut = async (items, stepDelay = 280, settleDelay = 520) => {
  for (const item of items) {
    item.classList.add("is-seq-hidden");
    await wait(stepDelay);
  }

  await wait(settleDelay);
};

const sequenceBootItemsIn = async (items, stepDelay = 260, settleDelay = 420) => {
  items.forEach((item) => {
    item.classList.add("boot-seq-item", "is-seq-hidden");
  });

  await wait(40);

  for (const item of items) {
    item.classList.remove("is-seq-hidden");
    await wait(stepDelay);
  }

  await wait(settleDelay);
};

const updateAudioUi = () => {
  if (audioStatus) {
    audioStatus.textContent = audioEnabled ? "Enabled" : "Muted";
  }

  if (audioToggle) {
    audioToggle.classList.toggle("is-cooling", !audioEnabled);
  }
};

const ensureAudio = async () => {
  if (!audioEnabled) {
    updateAudioUi();
    return null;
  }

  if (!window.AudioContext && !window.webkitAudioContext) {
    if (audioStatus) {
      audioStatus.textContent = "Unavailable";
    }
    return null;
  }

  if (!audioContext) {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioCtor();
  }

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  updateAudioUi();

  return audioContext;
};

const playTone = async ({
  frequency = 440,
  duration = 0.09,
  type = "square",
  volume = 0.02,
  endFrequency = null,
} = {}) => {
  const audio = await ensureAudio();
  if (!audio) {
    return;
  }

  const oscillator = audio.createOscillator();
  const gainNode = audio.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audio.currentTime);

  if (endFrequency) {
    oscillator.frequency.exponentialRampToValueAtTime(
      endFrequency,
      audio.currentTime + duration
    );
  }

  gainNode.gain.setValueAtTime(0.0001, audio.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(volume, audio.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(audio.destination);
  oscillator.start();
  oscillator.stop(audio.currentTime + duration + 0.02);
};

const playNoiseBurst = async (duration = 0.05, volume = 0.012) => {
  const audio = await ensureAudio();
  if (!audio) {
    return;
  }

  const buffer = audio.createBuffer(1, audio.sampleRate * duration, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * 0.3;
  }

  const source = audio.createBufferSource();
  const gainNode = audio.createGain();
  source.buffer = buffer;
  gainNode.gain.setValueAtTime(volume, audio.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);
  source.connect(gainNode);
  gainNode.connect(audio.destination);
  source.start();
};

const uiBeep = (kind = "soft") => {
  if (kind === "soft") {
    playTone({ frequency: 320, endFrequency: 410, duration: 0.08, volume: 0.02 });
  }

  if (kind === "confirm") {
    playTone({ frequency: 440, endFrequency: 620, duration: 0.11, volume: 0.026 });
  }

  if (kind === "warn") {
    playTone({ frequency: 240, endFrequency: 180, duration: 0.1, volume: 0.022 });
  }
};

const updateFullscreenLabel = () => {
  if (!fullscreenLabel) {
    return;
  }

  fullscreenLabel.textContent = document.fullscreenElement ? "Exit Fullscreen" : "Fullscreen";
};

const hideFullscreenPrompt = () => {
  if (!fullscreenPrompt) {
    return;
  }

  fullscreenPrompt.classList.remove("is-visible");
  fullscreenPrompt.setAttribute("aria-hidden", "true");
};

const showFullscreenPrompt = () => {
  if (!fullscreenPrompt || document.fullscreenElement) {
    return;
  }

  fullscreenPrompt.classList.add("is-visible");
  fullscreenPrompt.setAttribute("aria-hidden", "false");
};

const toggleFullscreen = async () => {
  if (!document.fullscreenEnabled) {
    writeConsole("Fullscreen mode is not supported in this browser.");
    uiBeep("warn");
    return false;
  }

  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
    updateFullscreenLabel();
    uiBeep("soft");
    return true;
  } catch {
    writeConsole("Fullscreen request was blocked.");
    uiBeep("warn");
    return false;
  }
};

const toggleAudio = async () => {
  audioEnabled = !audioEnabled;

  if (!audioEnabled) {
    stopHoldTone();
    if (audioContext && audioContext.state === "running") {
      try {
        await audioContext.suspend();
      } catch {
        // Ignore suspend failures.
      }
    }
  } else if (audioContext && audioContext.state === "suspended") {
    try {
      await audioContext.resume();
    } catch {
      // Ignore resume failures.
    }
  }

  updateAudioUi();
  writeConsole(audioEnabled ? "Audio channel enabled." : "Audio channel muted.");
};

const startHoldTone = () => {
  if (!audioContext || holdTone) {
    return;
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  const filterNode = audioContext.createBiquadFilter();

  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(110, audioContext.currentTime);
  filterNode.type = "lowpass";
  filterNode.frequency.setValueAtTime(420, audioContext.currentTime);
  gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime);

  oscillator.connect(filterNode);
  filterNode.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start();
  holdTone = { oscillator, gainNode, filterNode };
};

const updateHoldTone = (progress = holdProgress) => {
  if (!audioContext || !holdTone) {
    return;
  }

  const now = audioContext.currentTime;
  const normalized = progress / 100;
  const frequency = 110 + normalized * 320;
  const cutoff = 420 + normalized * 1800;
  const volume = 0.012 + normalized * 0.045;

  holdTone.oscillator.frequency.cancelScheduledValues(now);
  holdTone.oscillator.frequency.setTargetAtTime(frequency, now, 0.04);
  holdTone.filterNode.frequency.cancelScheduledValues(now);
  holdTone.filterNode.frequency.setTargetAtTime(cutoff, now, 0.05);
  holdTone.gainNode.gain.cancelScheduledValues(now);
  holdTone.gainNode.gain.setTargetAtTime(volume, now, 0.035);
};

const stopHoldTone = () => {
  if (!audioContext || !holdTone) {
    return;
  }

  const { oscillator, gainNode, filterNode } = holdTone;
  const now = audioContext.currentTime;
  gainNode.gain.cancelScheduledValues(now);
  gainNode.gain.setTargetAtTime(0.0001, now, 0.05);
  filterNode.frequency.cancelScheduledValues(now);
  filterNode.frequency.setTargetAtTime(280, now, 0.06);
  oscillator.stop(now + 0.16);
  holdTone = null;
};

const writeConsole = (message) => {
  consoleOutput.textContent = `>> ${message}`;
};

const confirmBootTheme = async () => {
  if (bootThemeConfirmed || bootThemeTransitioning) {
    return;
  }

  bootThemeTransitioning = true;
  bootThemeConfirmed = true;
  bootThemeHoldActive = false;
  stopBootThemeHoldLoop();
  stopHoldTone();

  if (bootThemeConfirm) {
    bootThemeConfirm.classList.remove("is-holding");
    bootThemeConfirm.disabled = true;
  }

  uiBeep("confirm");
  playTone({ frequency: 640, endFrequency: 920, duration: 0.16, volume: 0.02, type: "triangle" });
  playNoiseBurst(0.045, 0.008);

  await sequenceBootItemsOut(bootThemeSequenceItems, 280, 560);

  if (bootThemeStage) {
    bootThemeStage.hidden = true;
  }

  if (bootIgniteStage) {
    bootIgniteStage.hidden = false;
  }

  renderHoldProgress();
  await sequenceBootItemsIn(bootIgniteSequenceItems, 300, 460);
  bootThemeTransitioning = false;
};

const renderBootThemeHoldProgress = () => {
  if (bootThemeFill) {
    bootThemeFill.style.width = `${bootThemeHoldProgress}%`;
  }
};

const stopBootThemeHoldLoop = () => {
  if (bootThemeHoldFrame) {
    window.cancelAnimationFrame(bootThemeHoldFrame);
    bootThemeHoldFrame = 0;
  }
};

const animateBootThemeHold = (time) => {
  if (!bootThemeHoldLastTick) {
    bootThemeHoldLastTick = time;
  }

  const delta = (time - bootThemeHoldLastTick) / 1000;
  bootThemeHoldLastTick = time;

  if (bootThemeHoldActive) {
    bootThemeHoldProgress = clamp(bootThemeHoldProgress + delta * 72, 0, 100);
  } else {
    bootThemeHoldProgress = clamp(bootThemeHoldProgress - delta * 110, 0, 100);
  }

  renderBootThemeHoldProgress();
  updateHoldTone(bootThemeHoldProgress);

  if (bootThemeConfirm) {
    bootThemeConfirm.classList.toggle(
      "is-holding",
      bootThemeHoldActive || bootThemeHoldProgress > 0
    );
  }

  if (!bootThemeConfirmed && bootThemeHoldProgress >= 100) {
    confirmBootTheme();
    return;
  }

  if (bootThemeHoldActive || bootThemeHoldProgress > 0) {
    bootThemeHoldFrame = window.requestAnimationFrame(animateBootThemeHold);
    return;
  }

  stopHoldTone();
  stopBootThemeHoldLoop();
};

const beginBootThemeHold = async () => {
  if (bootThemeConfirmed || bootThemeTransitioning) {
    return;
  }

  bootThemeHoldActive = true;
  bootThemeHoldLastTick = 0;
  await ensureAudio();
  startHoldTone();
  updateHoldTone(bootThemeHoldProgress);
  uiBeep("soft");

  if (!bootThemeHoldFrame) {
    bootThemeHoldFrame = window.requestAnimationFrame(animateBootThemeHold);
  }
};

const endBootThemeHold = () => {
  if (bootThemeConfirmed || bootThemeTransitioning) {
    return;
  }

  bootThemeHoldActive = false;
  bootThemeHoldLastTick = 0;

  if (!bootThemeHoldFrame && bootThemeHoldProgress > 0) {
    bootThemeHoldFrame = window.requestAnimationFrame(animateBootThemeHold);
  }
};

const renderHoldProgress = () => {
  if (bootFill) {
    bootFill.style.width = `${holdProgress}%`;
  }

  if (bootLabel) {
    bootLabel.textContent =
      holdProgress >= 100 ? "Ignition Ready" : `Hold To Start ${Math.round(holdProgress)}%`;
  }
};

const stopHoldLoop = () => {
  if (holdAnimationFrame) {
    window.cancelAnimationFrame(holdAnimationFrame);
    holdAnimationFrame = 0;
  }
};

const animateHold = (time) => {
  if (!holdLastTick) {
    holdLastTick = time;
  }

  const delta = (time - holdLastTick) / 1000;
  holdLastTick = time;

  if (holdActive) {
    holdProgress = clamp(holdProgress + delta * 58, 0, 100);
  } else {
    holdProgress = clamp(holdProgress - delta * 95, 0, 100);
  }

  renderHoldProgress();
  updateHoldTone();

  if (bootStartButton) {
    bootStartButton.classList.toggle("is-holding", holdActive || holdProgress > 0);
  }

  if (!holdCompleted && holdProgress >= 100) {
    holdCompleted = true;
    holdActive = false;
    stopHoldLoop();
    if (bootLabel) {
      bootLabel.textContent = "Igniting...";
    }
    startBootSequence();
    return;
  }

  if (!holdActive && holdProgress <= 0) {
    holdProgress = 0;
    renderHoldProgress();
    stopHoldTone();
    stopHoldLoop();
    return;
  }

  holdAnimationFrame = window.requestAnimationFrame(animateHold);
};

const beginHold = async () => {
  if (!bootThemeConfirmed || state.booting || state.booted || holdCompleted) {
    return;
  }

  holdActive = true;
  holdLastTick = 0;
  await ensureAudio();
  startHoldTone();
  updateHoldTone();
  uiBeep("soft");

  if (!holdAnimationFrame) {
    holdAnimationFrame = window.requestAnimationFrame(animateHold);
  }
};

const endHold = () => {
  if (state.booting || state.booted || holdCompleted) {
    return;
  }

  holdActive = false;
  holdLastTick = 0;

  if (!holdAnimationFrame && holdProgress > 0) {
    holdAnimationFrame = window.requestAnimationFrame(animateHold);
  }
};

const renderMeters = () => {
  heatValue.textContent = `${Math.round(state.heat)}%`;
  shieldValue.textContent = `${Math.round(state.shield)}%`;
  syncValue.textContent = `${Math.round(state.sync)}%`;
  heatBar.style.width = `${state.heat}%`;
  shieldBar.style.width = `${state.shield}%`;
  syncBar.style.width = `${state.sync}%`;
};

const setGameBanner = (status, score) => {
  if (gameStatusNode) {
    gameStatusNode.textContent = status;
  }
  if (gameScoreNode) {
    gameScoreNode.textContent = score;
  }
};

const setGameCenterMessage = (title, copy, visible = true) => {
  if (!gameCenterNode || !gameCenterTitle || !gameCenterCopy) {
    return;
  }

  gameCenterTitle.textContent = title;
  gameCenterCopy.textContent = copy;
  gameCenterNode.classList.toggle("is-hidden", !visible);
};

const getActionCooldown = (action) => {
  if (action === "ignite") {
    return game.actionState.igniteCooldown;
  }

  if (action === "shield") {
    return game.actionState.shieldCooldown;
  }

  return 0;
};

const getActionAvailability = (action) => {
  if (action === "scan" && game.actionState.scanUsed) {
    return {
      ready: false,
      reason: "used",
    };
  }

  if (action === "surge" && game.actionState.surgeUsed) {
    return {
      ready: false,
      reason: "used",
    };
  }

  const cooldown = getActionCooldown(action);
  if (cooldown > 0) {
    return {
      ready: false,
      reason: "cooldown",
      seconds: Math.ceil(cooldown),
    };
  }

  return {
    ready: true,
    reason: "ready",
  };
};

const renderActionButtons = () => {
  actionButtons.forEach((button) => {
    const action = button.dataset.action;
    const config = actionConfig[action];
    if (!config) {
      return;
    }

    const availability = getActionAvailability(action);
    let suffix = "";

    if (availability.reason === "used") {
      suffix = " • USED";
    } else if (availability.reason === "cooldown") {
      suffix = ` • ${availability.seconds}s`;
    }

    suffix = suffix.replace("â€¢", "-").replace("•", "-");
    button.textContent = `[${config.hotkey}] ${config.label}${suffix}`;
    button.disabled = game.running && !availability.ready;
    button.classList.toggle(
      "is-cooling",
      game.running && (availability.reason === "cooldown" || availability.reason === "used")
    );
  });
};

const updateMissionStats = () => {
  const scene = scenes[state.currentScene];
  state.shield = clamp(game.player.hp, 0, 100);
  state.sync = clamp((game.collected / game.target) * 100, 0, 100);
  renderMeters();
  renderActionButtons();
  setGameBanner(
    game.running
      ? `RUNNING // ${scene.title}`
      : isSceneCompleted(state.currentScene)
        ? `COMPLETED // ${scene.title}`
      : game.won
        ? "MISSION CLEAR"
        : game.lost
          ? "MISSION FAILED"
          : "PRESS SPACE TO DEPLOY",
    `${scene.game.label} ${game.collected}/${game.target}`
  );

  if (game.running) {
    setGameCenterMessage("", "", false);
    return;
  }

  if (isSceneCompleted(state.currentScene)) {
    setGameCenterMessage(
      "Chapter Completed",
      "This chapter is archived and can no longer be replayed.",
      true
    );
    return;
  }

  if (game.lost) {
    setGameCenterMessage(
      "Mission Failed",
      "Stabilize the route and press Space to try this chapter again.",
      true
    );
    return;
  }

  setGameCenterMessage(
    "Press Space To Start Mission",
    "Use WASD or arrow keys to move. 1 2 3 4 trigger abilities.",
    true
  );
};

const resetPlayer = () => {
  game.player.x = game.width * 0.5;
  game.player.y = game.height * 0.5;
  game.player.hp = 100;
  game.player.flash = 0;
  game.player.direction = "right";
  game.player.moveX = 0;
  game.player.moveY = 0;
  game.player.stride = 0;
};

const getPlayerHitPoint = () => ({
  x: game.player.x,
  y: game.player.y + game.player.hitOffsetY,
});

const resizeGameCanvas = () => {
  if (!gameCanvas || !gameViewport) {
    return;
  }

  const nextWidth = Math.max(320, Math.round(gameViewport.clientWidth));
  const nextHeight = Math.max(220, Math.round(gameViewport.clientHeight));

  if (!nextWidth || !nextHeight) {
    return;
  }

  const previousWidth = game.width;
  const previousHeight = game.height;

  if (gameCanvas.width === nextWidth && gameCanvas.height === nextHeight) {
    return;
  }

  gameCanvas.width = nextWidth;
  gameCanvas.height = nextHeight;
  game.width = nextWidth;
  game.height = nextHeight;

  if (ctx) {
    ctx.imageSmoothingEnabled = true;
  }

  if (!previousWidth || !previousHeight) {
    resetPlayer();
    return;
  }

  const scaleX = nextWidth / previousWidth;
  const scaleY = nextHeight / previousHeight;

  game.player.x *= scaleX;
  game.player.y *= scaleY;

  game.pickups.forEach((pickup) => {
    pickup.x *= scaleX;
    pickup.y *= scaleY;
  });

  game.hazards.forEach((hazard) => {
    hazard.x *= scaleX;
    hazard.y *= scaleY;
  });

  game.particles.forEach((particle) => {
    particle.x *= scaleX;
    particle.y *= scaleY;
  });

  game.player.x = clamp(game.player.x, 54, game.width - 54);
  game.player.y = clamp(game.player.y, 54, game.height - 40);
};

const spawnParticle = (x, y, color, amount = 8) => {
  for (let i = 0; i < amount; i += 1) {
    game.particles.push({
      x,
      y,
      vx: random(-80, 80),
      vy: random(-90, 90),
      life: random(0.25, 0.65),
      color,
      size: random(2, 4.5),
    });
  }
};

const createPickup = (sceneId) => {
  const config = scenes[sceneId].game;
  return {
    x: random(70, game.width - 70),
    y: random(70, game.height - 70),
    radius: 12,
    pulse: random(0, Math.PI * 2),
    color: config.pickupColor,
  };
};

const createHazard = (sceneId) => {
  if (sceneId === "hydra") {
    return {
      x: random(40, game.width - 40),
      y: -24,
      vx: random(-30, 30),
      vy: random(160, 240),
      radius: random(10, 16),
      color: scenes[sceneId].game.hazardColor,
    };
  }

  if (sceneId === "warden") {
    return {
      x: random(30, game.width - 30),
      y: -28,
      vx: random(-18, 18),
      vy: random(220, 310),
      radius: random(12, 20),
      color: scenes[sceneId].game.hazardColor,
    };
  }

  return {
    x: game.width + 30,
    y: random(60, game.height - 60),
    vx: random(-250, -160),
    vy: random(-18, 18),
    radius: random(13, 22),
    color: scenes[sceneId].game.hazardColor,
    kind: "water",
    stretch: random(1.15, 1.45),
    spin: random(-1.2, 1.2),
    tilt: random(-0.25, 0.25),
  };
};

const startMission = () => {
  const scene = scenes[state.currentScene];
  const config = scene.game;

  if (isSceneCompleted(state.currentScene)) {
    writeConsole(`${scene.title} already cleared. Completed chapters cannot be replayed.`);
    uiBeep("warn");
    updateMissionStats();
    return;
  }

  pendingVictoryNextScene = null;
  hideVictoryScreen();
  resetPlayer();
  game.pickups = [];
  game.hazards = [];
  game.particles = [];
  game.collected = 0;
  game.target = config.target;
  game.running = true;
  game.won = false;
  game.lost = false;
  game.scanPulse = 0;
  game.scanPulseMax = 0;
  game.igniteBurst = 0;
  game.igniteBurstMax = 0;
  game.shieldPulse = 0;
  game.shieldPulseMax = 0;
  game.surgePulse = 0;
  game.surgePulseMax = 0;
  game.actionState.scanUsed = false;
  game.actionState.igniteCooldown = 0;
  game.actionState.shieldCooldown = 0;
  game.actionState.surgeUsed = false;
  game.actionState.surgeTimer = 0;
  game.hazardTimer = 0;
  game.pickupTimer = 0;
  game.hitCooldown = 0;
  game.elapsed = 0;
  game.currentPushX = state.currentScene === "river" ? 20 : 0;
  state.heat = config.heatBase;
  state.sync = 0;
  state.shield = 100;

  for (let i = 0; i < Math.min(3, config.target); i += 1) {
    game.pickups.push(createPickup(state.currentScene));
  }

  writeConsole(`${scene.title} deployed. Move now. ${scene.objectiveCopy}`);
  uiBeep("confirm");
  updateMissionStats();
};

const finishMission = (won) => {
  game.running = false;
  game.won = won;
  game.lost = !won;
  if (won) {
    state.completedScenes.add(state.currentScene);
    saveCompletedScenes(state.completedScenes);
    const currentIndex = getSceneIndex(state.currentScene);
    const nextSceneId = sceneOrder[currentIndex + 1];

    if (currentIndex === state.unlockedIndex && nextSceneId) {
      state.unlockedIndex += 1;
      saveUnlockedIndex(state.unlockedIndex);
      renderSceneLocks();
      writeConsole(
        `${scenes[state.currentScene].title} complete. ${scenes[nextSceneId].title} unlocked.`
      );
    } else if (!nextSceneId) {
      writeConsole(
        `${scenes[state.currentScene].title} complete. Archive fully cleared. All chapters conquered.`
      );
    } else {
      writeConsole(`${scenes[state.currentScene].title} complete. Archive marks the route as secured.`);
    }

    uiBeep("confirm");
    showVictoryScreen({ sceneId: state.currentScene, nextSceneId });
  } else {
    writeConsole(`${scenes[state.currentScene].title} failed. Stabilize and press Space to redeploy.`);
    uiBeep("warn");
  }
  updateMissionStats();
};

const renderScene = (sceneId) => {
  const scene = scenes[sceneId];
  if (!scene) {
    return;
  }

  if (!canAccessScene(sceneId)) {
    const previousSceneId = sceneOrder[Math.max(0, getSceneIndex(sceneId) - 1)];
    writeConsole(
      `${scene.title} locked. Clear ${scenes[previousSceneId].title} before entering this chapter.`
    );
    uiBeep("warn");
    renderSceneLocks();
    return;
  }

  state.currentScene = sceneId;
  pendingVictoryNextScene = null;
  hideVictoryScreen();
  sceneChip.textContent = scene.chip;
  sceneTitle.textContent = scene.title;
  sceneZone.textContent = scene.zone;
  sceneRisk.textContent = scene.risk;
  swapSceneImage(sceneId, state.theme, true);
  sceneImage.alt = scene.alt;
  transmission.textContent = scene.transmission;
  objectiveTitle.textContent = scene.objectiveTitle;
  objectiveCopy.textContent = scene.objectiveCopy;
  inventoryList.innerHTML = scene.inventory.map((item) => `<li>${item}</li>`).join("");
  writeConsole(scene.console);

  sceneButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.scene === sceneId);
  });

  game.running = false;
  game.won = false;
  game.lost = false;
  state.heat = scene.game.heatBase;
  state.shield = 100;
  state.sync = 0;
  resetPlayer();
  game.pickups = [];
  game.hazards = [];
  game.particles = [];
  game.target = scene.game.target;
  updateMissionStats();
  renderSceneLocks();
};

const pulseButton = (button) => {
  button.classList.add("is-live");
  window.setTimeout(() => button.classList.remove("is-live"), 220);
};

const swapBrandLogo = (theme) => {
  if (!brandLogo) {
    return;
  }

  const nextSrc = logoByTheme[theme] || logoByTheme.inferno;
  const currentSrc = brandLogo.getAttribute("src");

  if (currentSrc === nextSrc) {
    brandLogo.classList.remove("is-switching");
    return;
  }

  const nextImage = new Image();
  nextImage.onload = () => {
    brandLogo.classList.add("is-switching");

    window.setTimeout(() => {
      brandLogo.src = nextSrc;

      window.setTimeout(() => {
        brandLogo.classList.remove("is-switching");
      }, 40);
    }, 150);
  };
  nextImage.src = nextSrc;
};

const swapBootBackground = (theme, immediate = false) => {
  if (!bootBackground) {
    return;
  }

  const nextSrc = bootBackgroundByTheme[theme] || bootBackgroundByTheme.inferno;
  const currentTheme = bootBackground.dataset.bgTheme;

  if (immediate) {
    bootBackground.dataset.bgTheme = theme;
    bootBackground.style.backgroundImage = `url("${nextSrc}")`;
    bootBackground.classList.remove("is-switching");
    return;
  }

  if (currentTheme === theme) {
    return;
  }

  const requestId = ++bootBackgroundSwapId;
  const nextImage = new Image();
  nextImage.onload = () => {
    if (requestId !== bootBackgroundSwapId) {
      return;
    }

    bootBackground.classList.add("is-switching");

    window.setTimeout(() => {
      if (requestId !== bootBackgroundSwapId) {
        return;
      }

      bootBackground.style.backgroundImage = `url("${nextSrc}")`;
      bootBackground.dataset.bgTheme = theme;

      window.setTimeout(() => {
        if (requestId === bootBackgroundSwapId) {
          bootBackground.classList.remove("is-switching");
        }
      }, 110);
    }, 150);
  };
  nextImage.src = nextSrc;
};

const getSceneImageSrc = (sceneId, theme) => {
  const sceneThemeMap = sceneImageByTheme[sceneId];
  if (sceneThemeMap && sceneThemeMap[theme]) {
    return sceneThemeMap[theme];
  }

  return scenes[sceneId]?.image || "";
};

const swapSceneImage = (sceneId, theme, immediate = false) => {
  if (!sceneImage || !scenes[sceneId]) {
    return;
  }

  const nextSrc = getSceneImageSrc(sceneId, theme);
  const currentSrc = sceneImage.getAttribute("src");

  if (currentSrc === nextSrc) {
    sceneImage.classList.remove("is-switching");
    return;
  }

  if (immediate) {
    sceneImage.classList.remove("is-switching");
    sceneImage.src = nextSrc;
    return;
  }

  const nextImage = new Image();
  nextImage.onload = () => {
    sceneImage.classList.add("is-switching");

    window.setTimeout(() => {
      sceneImage.src = nextSrc;

      window.setTimeout(() => {
        sceneImage.classList.remove("is-switching");
      }, 40);
    }, 150);
  };
  nextImage.src = nextSrc;
};

const swapCharacterSprite = (theme, immediate = false) => {
  const nextSrc = characterSpriteByTheme[theme] || characterSpriteByTheme.inferno;
  if (!nextSrc) {
    return;
  }

  if (characterSpriteState.currentTheme === theme && characterSpriteState.mix >= 1) {
    return;
  }

  const requestId = characterSpriteState.requestId + 1;
  characterSpriteState.requestId = requestId;

  const nextImage = new Image();
  nextImage.onload = () => {
    if (requestId !== characterSpriteState.requestId) {
      return;
    }

    if (immediate || !characterSpriteState.currentImage?.complete) {
      characterSpriteState.currentTheme = theme;
      characterSpriteState.currentImage = nextImage;
      characterSpriteState.previousImage = null;
      characterSpriteState.mix = 1;
      return;
    }

    characterSpriteState.currentTheme = theme;
    characterSpriteState.previousImage = characterSpriteState.currentImage;
    characterSpriteState.currentImage = nextImage;
    characterSpriteState.mix = 0;
  };
  nextImage.src = nextSrc;
};

const applyTheme = (theme) => {
  if (!validThemes.has(theme)) {
    return;
  }

  state.theme = theme;
  document.body.dataset.theme = theme;
  saveTheme(theme);
  swapBootBackground(theme, !themeVisualsReady);
  swapBrandLogo(theme);
  swapSceneImage(state.currentScene, theme);
  swapCharacterSprite(theme);

  themeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.themeOption === theme);
  });

  themeVisualsReady = true;
};

const getSceneIndex = (sceneId) => sceneOrder.indexOf(sceneId);
const canAccessScene = (sceneId) => getSceneIndex(sceneId) <= state.unlockedIndex;
const isSceneCompleted = (sceneId) => state.completedScenes.has(sceneId);

const renderSceneLocks = () => {
  sceneButtons.forEach((button) => {
    const sceneId = button.dataset.scene;
    const unlocked = canAccessScene(sceneId);
    const completed = isSceneCompleted(sceneId);

    button.classList.toggle("is-locked", !unlocked);
    button.classList.toggle("is-completed", completed);
    button.setAttribute("aria-disabled", unlocked ? "false" : "true");
    button.title = unlocked ? "" : "Finish previous chapter first";
  });

  sceneStateNodes.forEach((node) => {
    const sceneId = node.dataset.sceneState;
    if (isSceneCompleted(sceneId)) {
      node.textContent = "Cleared";
      return;
    }

    if (canAccessScene(sceneId)) {
      node.textContent = "Unlocked";
      return;
    }

    node.textContent = "Locked";
  });
};

const hideVictoryScreen = () => {
  if (!victoryScreen) {
    return;
  }

  victoryScreen.classList.remove("is-visible");
  victoryScreen.setAttribute("aria-hidden", "true");
};

const showVictoryScreen = ({ sceneId, nextSceneId }) => {
  if (!victoryScreen) {
    return;
  }

  const scene = scenes[sceneId];
  const rewards = [
    "Archive route data restored",
    nextSceneId ? `${scenes[nextSceneId].title} access granted` : "Archive path fully completed",
    "Relic cache synchronized",
  ];

  pendingVictoryNextScene = nextSceneId || null;
  victoryChip.textContent = nextSceneId ? "Chapter Clear" : "Archive Complete";
  victoryTitle.textContent = nextSceneId ? `${scene.title} Secured` : `${scene.title} Conquered`;
  victoryCopy.textContent = nextSceneId
    ? `The route is clear. Your squad can now descend into ${scenes[nextSceneId].title}.`
    : "All chapters are complete. The archive recognizes a full infernal clear.";
  victoryObjective.textContent = `${game.collected} / ${game.target}`;
  victoryShield.textContent = `${Math.round(game.player.hp)}%`;
  victorySync.textContent = `${Math.round(state.sync)}%`;
  victoryRewards.innerHTML = rewards.map((item) => `<li>${item}</li>`).join("");
  if (victoryBackdrop) {
    victoryBackdrop.style.backgroundImage = `linear-gradient(180deg, rgba(2, 8, 12, 0.36), rgba(0, 0, 0, 0.86)), url("${getSceneImageSrc(sceneId, state.theme)}")`;
  }
  if (victoryContinueButton) {
    victoryContinueButton.textContent = nextSceneId ? "Continue" : "Stay In Archive";
  }
  if (victoryReplayButton) {
    victoryReplayButton.hidden = true;
  }
  victoryScreen.classList.add("is-visible");
  victoryScreen.setAttribute("aria-hidden", "false");
};

const startBootSequence = async () => {
  if (state.booting || state.booted) {
    return;
  }

  state.booting = true;
  holdCompleted = true;
  stopHoldTone();

  if (bootStartButton) {
    bootStartButton.classList.remove("is-holding");
    bootStartButton.disabled = true;
  }

  await ensureAudio();
  uiBeep("soft");

  if (bootLinesNode) {
    bootLinesNode.innerHTML = "";
  }

  for (let i = 0; i < bootScript.length; i += 1) {
    const line = document.createElement("p");
    line.textContent = `> ${bootScript[i]}`;
    bootLinesNode.appendChild(line);

    if (bootProgress) {
      bootProgress.style.width = `${((i + 1) / bootScript.length) * 100}%`;
    }

    uiBeep(i === bootScript.length - 1 ? "confirm" : "soft");
    if (i % 2 === 0) {
      playNoiseBurst();
    }
    await wait(280);
  }

  const finalLine = document.createElement("p");
  finalLine.textContent = "> ARCHIVE NODE READY // WELCOME, OPERATOR";
  bootLinesNode.appendChild(finalLine);
  uiBeep("confirm");

  await wait(420);
  document.body.classList.remove("is-booting");
  state.booted = true;

  if (bootScreen) {
    bootScreen.classList.add("is-hidden");
  }

  writeConsole("System live. Select a chapter, then press Space to deploy.");
  showFullscreenPrompt();
};

const applyAction = (action) => {
  if (!game.running) {
    writeConsole(actionDescriptions[action] || "Skill data unavailable.");
    uiBeep("soft");
    return;
  }

  const availability = getActionAvailability(action);
  if (!availability.ready) {
    if (availability.reason === "used" && action === "scan") {
      writeConsole("Scan Zone can only be used once per mission.");
    } else if (availability.reason === "used" && action === "surge") {
      writeConsole("Dash Surge can only be used once per mission.");
    } else if (availability.reason === "cooldown") {
      writeConsole(`${actionConfig[action].label} cooling down. ${availability.seconds}s remaining.`);
    }
    uiBeep("warn");
    updateMissionStats();
    return;
  }

  if (action === "scan") {
    game.actionState.scanUsed = true;
    game.scanPulse = 2.2;
    game.scanPulseMax = 2.2;
    state.sync = clamp(state.sync + 6, 0, 100);
    writeConsole("Scan pulse emitted. Objectives highlighted for a short interval.");
    spawnParticle(game.player.x, game.player.y - 10, "#ffffff", 10);
    uiBeep("soft");
  }

  if (action === "ignite") {
    let cleared = 0;
    game.hazards = game.hazards.filter((hazard) => {
      const distance = Math.hypot(hazard.x - game.player.x, hazard.y - game.player.y);
      const keep = distance > 120;
      if (!keep) {
        cleared += 1;
      }
      return keep;
    });
    game.actionState.igniteCooldown = actionConfig.ignite.cooldown;
    game.igniteBurst = 0.72;
    game.igniteBurstMax = 0.72;
    state.heat = clamp(state.heat + 8, 0, 100);
    writeConsole(`Ignite burst released. ${cleared} nearby hazards scorched.`);
    spawnParticle(game.player.x, game.player.y, "#ff8f2a", 18);
    spawnParticle(game.player.x, game.player.y - 8, "#ffd463", 12);
    uiBeep("confirm");
  }

  if (action === "shield") {
    game.actionState.shieldCooldown = actionConfig.shield.cooldown;
    game.shieldPulse = 1.05;
    game.shieldPulseMax = 1.05;
    game.player.hp = clamp(game.player.hp + 50, 0, 100);
    writeConsole("Shield lattice reinforced. Hull integrity restored by 50%.");
    spawnParticle(game.player.x, game.player.y, "#7cffda", 16);
    uiBeep("warn");
  }

  if (action === "surge") {
    game.actionState.surgeUsed = true;
    game.actionState.surgeTimer = 1;
    game.surgePulse = 1;
    game.surgePulseMax = 1;
    writeConsole("Dash Surge engaged. Movement speed doubled for 1 second.");
    spawnParticle(game.player.x, game.player.y - 6, "#ffffff", 14);
    uiBeep("confirm");
  }

  updateMissionStats();
};

const applyChoice = (choice) => {
  if (choice === "accept") {
    writeConsole(`Quest accepted for ${scenes[state.currentScene].title}. Press Space to deploy.`);
    uiBeep("confirm");
  }

  if (choice === "reroute") {
    renderScene(state.currentScene);
    writeConsole("Squad rerouted. Mission state reset.");
    uiBeep("warn");
  }

  if (choice === "cache") {
    game.player.hp = clamp(game.player.hp + 12, 0, 100);
    state.sync = clamp(state.sync + 4, 0, 100);
    writeConsole("Support cache opened. Integrity and sync nudged upward.");
    uiBeep("soft");
    updateMissionStats();
  }
};

const drawIdleOverlay = () => {
  if (!ctx) {
    return;
  }

  ctx.fillStyle = "rgba(4, 9, 12, 0.35)";
  ctx.fillRect(0, 0, game.width, game.height);
  ctx.strokeStyle = "rgba(124,255,218,0.18)";
  ctx.strokeRect(36, 36, game.width - 72, game.height - 72);
};

const drawFallbackPlayer = () => {
  const flicker = Math.sin(game.elapsed * 10) * 2;
  ctx.save();
  ctx.translate(game.player.x, game.player.y);
  ctx.fillStyle = game.player.flash > 0 ? "#ffffff" : "#ffcb6b";
  ctx.beginPath();
  ctx.arc(0, 0, game.player.radius + flicker * 0.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ff6a3d";
  ctx.beginPath();
  ctx.moveTo(0, -game.player.radius - 8);
  ctx.lineTo(7, -4);
  ctx.lineTo(-7, -4);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

const drawPlayer = () => {
  const activeSprite = characterSpriteState.currentImage;
  const previousSprite = characterSpriteState.previousImage;
  if (!activeSprite?.complete || !activeSprite.naturalWidth) {
    drawFallbackPlayer();
    return;
  }

  const moving = Math.hypot(game.player.moveX, game.player.moveY) > 0.05 && game.running;
  const step = moving ? Math.sin(game.player.stride) : 0;
  const bob = moving
    ? Math.abs(Math.sin(game.player.stride * 1.35)) * 7
    : Math.sin(game.elapsed * 2.4) * 1.5;
  const glowPulse = 0.22 + Math.abs(Math.sin(game.elapsed * 3.8)) * 0.18;
  const glowPalette = characterGlowByTheme[state.theme] || characterGlowByTheme.inferno;

  let scaleX = 1;
  let rotation = 0;
  let lift = 0;

  if (game.player.direction === "left") {
    scaleX = -1;
    rotation = -0.05;
  } else if (game.player.direction === "right") {
    rotation = 0.05;
  } else if (game.player.direction === "up") {
    rotation = -0.025;
    lift = -6;
  } else if (game.player.direction === "down") {
    rotation = 0.02;
    lift = 4;
  }

  if (moving) {
    rotation += step * 0.05;
  }

  const spriteScale = 0.085;
  const drawWidth = activeSprite.naturalWidth * spriteScale;
  const drawHeight = activeSprite.naturalHeight * spriteScale;
  const drawX = -drawWidth / 2;
  const drawY = -drawHeight + 28;

  const drawSpriteImage = (image, alpha = 1) => {
    if (!image?.complete || !image.naturalWidth) {
      return;
    }

    const imageWidth = image.naturalWidth * spriteScale;
    const imageHeight = image.naturalHeight * spriteScale;
    const imageX = -imageWidth / 2;
    const imageY = -imageHeight + 28;

    ctx.save();
    ctx.globalAlpha = alpha;

    if (scaleX < 0) {
      ctx.scale(-1, 1);
      ctx.drawImage(image, -imageWidth / 2, imageY, imageWidth, imageHeight);
    } else {
      ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);
    }

    ctx.restore();
  };

  ctx.save();
  ctx.translate(game.player.x, game.player.y);

  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.beginPath();
  ctx.ellipse(0, 34, 17, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  const glow = ctx.createRadialGradient(0, -6, 4, 0, -6, 54);
  glow.addColorStop(
    0,
    `rgba(${glowPalette.inner[0]}, ${glowPalette.inner[1]}, ${glowPalette.inner[2]}, ${0.26 + glowPulse})`
  );
  glow.addColorStop(
    0.55,
    `rgba(${glowPalette.outer[0]}, ${glowPalette.outer[1]}, ${glowPalette.outer[2]}, ${0.18 + glowPulse * 0.45})`
  );
  glow.addColorStop(
    1,
    `rgba(${glowPalette.outer[0]}, ${glowPalette.outer[1]}, ${glowPalette.outer[2]}, 0)`
  );
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, -8, 54, 0, Math.PI * 2);
  ctx.fill();

  ctx.translate(0, bob + lift - 2);
  ctx.rotate(rotation);

  if (game.player.flash > 0) {
    drawSpriteImage(activeSprite, 0.42);
    ctx.globalCompositeOperation = "screen";
  }

  if (previousSprite && characterSpriteState.mix < 1) {
    drawSpriteImage(previousSprite, 1 - characterSpriteState.mix);
  }
  drawSpriteImage(activeSprite, characterSpriteState.mix);
  ctx.restore();
};

const drawPickup = (pickup) => {
  const pulse = 1 + Math.sin(game.elapsed * 4 + pickup.pulse) * 0.14;
  ctx.save();
  ctx.translate(pickup.x, pickup.y);
  ctx.rotate(game.elapsed + pickup.pulse);
  ctx.fillStyle = pickup.color;
  ctx.beginPath();
  ctx.moveTo(0, -pickup.radius * pulse);
  ctx.lineTo(pickup.radius * pulse, 0);
  ctx.lineTo(0, pickup.radius * pulse);
  ctx.lineTo(-pickup.radius * pulse, 0);
  ctx.closePath();
  ctx.fill();
  if (game.scanPulse > 0) {
    ctx.strokeStyle = "rgba(124,255,218,0.7)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, pickup.radius * 1.8, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
};

const drawHazard = (hazard) => {
  ctx.save();
  ctx.translate(hazard.x, hazard.y);

  if (hazard.kind === "water") {
    const angle = Math.atan2(hazard.vy, hazard.vx) + Math.PI * 0.5 + (hazard.tilt || 0);
    const stretch = hazard.stretch || 1.25;
    const tail = hazard.radius * stretch;
    const body = hazard.radius * 0.78;

    ctx.rotate(angle);
    ctx.globalCompositeOperation = "screen";

    const dropletGradient = ctx.createLinearGradient(0, -tail, 0, body);
    dropletGradient.addColorStop(0, "rgba(242, 251, 255, 0.96)");
    dropletGradient.addColorStop(0.42, "rgba(168, 227, 255, 0.92)");
    dropletGradient.addColorStop(1, hazard.color);

    ctx.fillStyle = dropletGradient;
    ctx.beginPath();
    ctx.moveTo(0, -tail);
    ctx.bezierCurveTo(body * 0.95, -tail * 0.18, body, body * 0.55, 0, body);
    ctx.bezierCurveTo(-body, body * 0.55, -body * 0.95, -tail * 0.18, 0, -tail);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.48)";
    ctx.beginPath();
    ctx.ellipse(-body * 0.2, -tail * 0.18, body * 0.22, tail * 0.2, -0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(187, 236, 255, 0.34)";
    ctx.lineWidth = Math.max(1.5, hazard.radius * 0.11);
    ctx.beginPath();
    ctx.moveTo(0, body * 0.4);
    ctx.lineTo(0, body * 0.95);
    ctx.stroke();

    ctx.globalAlpha = 0.22;
    ctx.fillStyle = "rgba(195, 238, 255, 0.7)";
    ctx.beginPath();
    ctx.arc(body * 0.82, -body * 0.1, body * 0.16, 0, Math.PI * 2);
    ctx.arc(body * 1.18, body * 0.12, body * 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  ctx.fillStyle = hazard.color;
  ctx.beginPath();
  ctx.arc(0, 0, hazard.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.28)";
  ctx.beginPath();
  ctx.arc(-hazard.radius * 0.2, -hazard.radius * 0.25, hazard.radius * 0.35, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

const drawParticles = () => {
  game.particles.forEach((particle) => {
    ctx.globalAlpha = particle.life;
    ctx.fillStyle = particle.color;
    ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
  });
  ctx.globalAlpha = 1;
};

const drawScanPulse = () => {
  if (!game.scanPulse || !game.scanPulseMax) {
    return;
  }

  const progress = 1 - game.scanPulse / game.scanPulseMax;
  const alpha = Math.max(0, game.scanPulse / game.scanPulseMax);
  const radius = 34 + progress * 210;
  const sweepAngle = -Math.PI * 0.5 + progress * Math.PI * 2.1;
  const palette = scanPulseByTheme[state.theme] || scanPulseByTheme.inferno;

  ctx.save();
  ctx.translate(game.player.x, game.player.y + 4);
  ctx.globalCompositeOperation = "screen";

  const fillGradient = ctx.createRadialGradient(0, 0, 10, 0, 0, radius);
  fillGradient.addColorStop(
    0,
    `rgba(${palette.fill[0]}, ${palette.fill[1]}, ${palette.fill[2]}, ${0.16 * alpha})`
  );
  fillGradient.addColorStop(
    0.55,
    `rgba(${palette.ring[0]}, ${palette.ring[1]}, ${palette.ring[2]}, ${0.08 * alpha})`
  );
  fillGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = fillGradient;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `rgba(${palette.ring[0]}, ${palette.ring[1]}, ${palette.ring[2]}, ${0.8 * alpha})`;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = `rgba(${palette.sweep[0]}, ${palette.sweep[1]}, ${palette.sweep[2]}, ${0.55 * alpha})`;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.arc(0, 0, Math.max(18, radius - 24), 0, Math.PI * 2);
  ctx.stroke();

  const sweepGradient = ctx.createRadialGradient(0, 0, radius * 0.15, 0, 0, radius);
  sweepGradient.addColorStop(
    0,
    `rgba(${palette.sweep[0]}, ${palette.sweep[1]}, ${palette.sweep[2]}, 0.24)`
  );
  sweepGradient.addColorStop(
    1,
    `rgba(${palette.sweep[0]}, ${palette.sweep[1]}, ${palette.sweep[2]}, 0)`
  );
  ctx.fillStyle = sweepGradient;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, radius, sweepAngle - 0.34, sweepAngle + 0.16);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = `rgba(${palette.sweep[0]}, ${palette.sweep[1]}, ${palette.sweep[2]}, ${0.9 * alpha})`;
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.cos(sweepAngle) * radius, Math.sin(sweepAngle) * radius);
  ctx.stroke();

  ctx.restore();
};

const drawIgniteBurst = () => {
  if (!game.igniteBurst || !game.igniteBurstMax) {
    return;
  }

  const progress = 1 - game.igniteBurst / game.igniteBurstMax;
  const alpha = Math.max(0, game.igniteBurst / game.igniteBurstMax);
  const radius = 30 + progress * 116;
  const innerRadius = Math.max(12, radius * 0.34);
  const palette = igniteBurstByTheme[state.theme] || igniteBurstByTheme.inferno;

  ctx.save();
  ctx.translate(game.player.x, game.player.y + 6);
  ctx.globalCompositeOperation = "screen";

  const core = ctx.createRadialGradient(0, 0, 8, 0, 0, radius);
  core.addColorStop(
    0,
    `rgba(${palette.core[0]}, ${palette.core[1]}, ${palette.core[2]}, ${0.34 * alpha})`
  );
  core.addColorStop(
    0.4,
    `rgba(${palette.ring[0]}, ${palette.ring[1]}, ${palette.ring[2]}, ${0.24 * alpha})`
  );
  core.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 4.5 - progress * 2.1;
  ctx.strokeStyle = `rgba(${palette.ring[0]}, ${palette.ring[1]}, ${palette.ring[2]}, ${0.86 * alpha})`;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 2.2;
  ctx.strokeStyle = `rgba(${palette.core[0]}, ${palette.core[1]}, ${palette.core[2]}, ${0.72 * alpha})`;
  ctx.beginPath();
  ctx.arc(0, 0, innerRadius, 0, Math.PI * 2);
  ctx.stroke();

  const spikeCount = 12;
  for (let i = 0; i < spikeCount; i += 1) {
    const angle = (Math.PI * 2 * i) / spikeCount + game.elapsed * 0.8;
    const variance = Math.sin(game.elapsed * 22 + i * 1.7) * 12;
    const start = innerRadius + (i % 2) * 8;
    const end = radius + 18 + variance;

    ctx.strokeStyle = `rgba(${palette.ember[0]}, ${palette.ember[1]}, ${palette.ember[2]}, ${0.55 * alpha})`;
    ctx.lineWidth = i % 2 === 0 ? 3 : 2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * start, Math.sin(angle) * start);
    ctx.lineTo(Math.cos(angle) * end, Math.sin(angle) * end);
    ctx.stroke();
  }

  ctx.restore();
};

const drawShieldPulse = () => {
  if (!game.shieldPulse || !game.shieldPulseMax) {
    return;
  }

  const progress = 1 - game.shieldPulse / game.shieldPulseMax;
  const alpha = Math.max(0, game.shieldPulse / game.shieldPulseMax);
  const palette = shieldPulseByTheme[state.theme] || shieldPulseByTheme.inferno;
  const shellWidth = 46 + progress * 10;
  const shellHeight = 58 + progress * 12;
  const rise = progress * 10;

  ctx.save();
  ctx.translate(game.player.x, game.player.y - 2 - rise);
  ctx.globalCompositeOperation = "screen";

  const shell = ctx.createRadialGradient(0, 6, 10, 0, 6, shellHeight);
  shell.addColorStop(
    0,
    `rgba(${palette.glow[0]}, ${palette.glow[1]}, ${palette.glow[2]}, ${0.12 * alpha})`
  );
  shell.addColorStop(
    0.5,
    `rgba(${palette.shell[0]}, ${palette.shell[1]}, ${palette.shell[2]}, ${0.18 * alpha})`
  );
  shell.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = shell;
  ctx.beginPath();
  ctx.ellipse(0, 8, shellWidth, shellHeight, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `rgba(${palette.ring[0]}, ${palette.ring[1]}, ${palette.ring[2]}, ${0.78 * alpha})`;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(0, 8, shellWidth, shellHeight, 0, Math.PI * 1.04, Math.PI * 1.96);
  ctx.stroke();

  ctx.lineWidth = 1.8;
  ctx.strokeStyle = `rgba(${palette.glow[0]}, ${palette.glow[1]}, ${palette.glow[2]}, ${0.62 * alpha})`;
  ctx.beginPath();
  ctx.ellipse(0, 8, shellWidth - 10, shellHeight - 12, 0, Math.PI * 1.08, Math.PI * 1.92);
  ctx.stroke();

  const ringOffsets = [-22, 0, 22];
  ringOffsets.forEach((offset, index) => {
    ctx.strokeStyle = `rgba(${palette.shell[0]}, ${palette.shell[1]}, ${palette.shell[2]}, ${0.28 * alpha})`;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(offset, 8, 8 + index * 2, shellHeight - 18, 0, Math.PI * 1.18, Math.PI * 1.82);
    ctx.stroke();
  });

  ctx.strokeStyle = `rgba(${palette.ring[0]}, ${palette.ring[1]}, ${palette.ring[2]}, ${0.72 * alpha})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(0, 44, shellWidth * 0.7, 10 + progress * 6, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
};

const drawSurgePulse = () => {
  if (!game.actionState.surgeTimer && !game.surgePulse) {
    return;
  }

  const alpha = Math.max(
    game.actionState.surgeTimer > 0 ? game.actionState.surgeTimer : 0,
    game.surgePulseMax ? game.surgePulse / game.surgePulseMax : 0
  );
  const palette = surgePulseByTheme[state.theme] || surgePulseByTheme.inferno;
  const dirX = game.player.moveX || (game.player.direction === "left" ? -1 : game.player.direction === "right" ? 1 : 0);
  const dirY = game.player.moveY || (game.player.direction === "up" ? -1 : game.player.direction === "down" ? 1 : 0);
  const length = Math.hypot(dirX, dirY) || 1;
  const nx = dirX / length;
  const ny = dirY / length;
  const tailX = -nx * 42;
  const tailY = -ny * 42;

  ctx.save();
  ctx.translate(game.player.x, game.player.y - 6);
  ctx.globalCompositeOperation = "screen";

  const core = ctx.createRadialGradient(0, 0, 6, 0, 0, 52);
  core.addColorStop(0, `rgba(${palette.spark[0]}, ${palette.spark[1]}, ${palette.spark[2]}, ${0.22 * alpha})`);
  core.addColorStop(0.45, `rgba(${palette.core[0]}, ${palette.core[1]}, ${palette.core[2]}, ${0.18 * alpha})`);
  core.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(0, 0, 52, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `rgba(${palette.trail[0]}, ${palette.trail[1]}, ${palette.trail[2]}, ${0.6 * alpha})`;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(tailX, tailY);
  ctx.stroke();

  ctx.strokeStyle = `rgba(${palette.spark[0]}, ${palette.spark[1]}, ${palette.spark[2]}, ${0.7 * alpha})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(nx * 10, ny * 10);
  ctx.lineTo(-nx * 56, -ny * 56);
  ctx.stroke();

  for (let i = 0; i < 3; i += 1) {
    const offset = 14 + i * 10;
    ctx.strokeStyle = `rgba(${palette.core[0]}, ${palette.core[1]}, ${palette.core[2]}, ${(0.28 - i * 0.06) * alpha})`;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(-nx * offset, -ny * offset, 14 + i * 5, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
};

const updatePlayer = (dt) => {
  const sceneConfig = scenes[state.currentScene].game;
  const speedMultiplier = game.actionState.surgeTimer > 0 ? 2 : 1;
  const speed = sceneConfig.playerSpeed * speedMultiplier;
  const moveX = (keys.arrowright || keys.d ? 1 : 0) - (keys.arrowleft || keys.a ? 1 : 0);
  const moveY = (keys.arrowdown || keys.s ? 1 : 0) - (keys.arrowup || keys.w ? 1 : 0);
  const length = Math.hypot(moveX, moveY) || 1;
  const normalizedMoveX = moveX / length;
  const normalizedMoveY = moveY / length;
  const moving = Math.hypot(moveX, moveY) > 0;

  game.player.moveX = moving ? normalizedMoveX : 0;
  game.player.moveY = moving ? normalizedMoveY : 0;

  if (moving) {
    if (Math.abs(moveX) >= Math.abs(moveY)) {
      game.player.direction = moveX > 0 ? "right" : "left";
    } else {
      game.player.direction = moveY > 0 ? "down" : "up";
    }

    game.player.stride += dt * 10 * speedMultiplier;
  } else {
    game.player.stride += dt * 2.4;
  }

  game.player.x += normalizedMoveX * speed * dt + game.currentPushX * dt;
  game.player.y += normalizedMoveY * speed * dt;

  if (state.currentScene === "river") {
    game.player.y += Math.sin(game.elapsed * 2.4 + game.player.x * 0.01) * 24 * dt;
  }

  game.player.x = clamp(game.player.x, 54, game.width - 54);
  game.player.y = clamp(game.player.y, 54, game.height - 40);
};

const updatePickups = () => {
  const hitPoint = getPlayerHitPoint();

  for (let i = game.pickups.length - 1; i >= 0; i -= 1) {
    const pickup = game.pickups[i];
    const hit =
      Math.hypot(pickup.x - hitPoint.x, pickup.y - hitPoint.y) <
      pickup.radius + game.player.radius;
    if (!hit) {
      continue;
    }

    game.pickups.splice(i, 1);
    game.collected += 1;
    spawnParticle(pickup.x, pickup.y, pickup.color, 10);
    uiBeep("confirm");

    if (game.collected >= game.target) {
      finishMission(true);
      return;
    }
  }

  if (game.pickups.length < Math.min(3, game.target - game.collected)) {
    game.pickups.push(createPickup(state.currentScene));
  }
};

const updateHazards = (dt) => {
  const hitPoint = getPlayerHitPoint();

  game.hazardTimer -= dt;
  const spawnRate =
    state.currentScene === "hydra" ? 0.78 : state.currentScene === "warden" ? 0.52 : 0.66;

  if (game.hazardTimer <= 0) {
    game.hazards.push(createHazard(state.currentScene));
    game.hazardTimer = spawnRate;
  }

  game.hazards.forEach((hazard) => {
    hazard.x += hazard.vx * dt;
    hazard.y += hazard.vy * dt;
  });

  game.hazards = game.hazards.filter((hazard) => (
    hazard.x > -50 &&
    hazard.x < game.width + 50 &&
    hazard.y > -50 &&
    hazard.y < game.height + 50
  ));

  if (game.hitCooldown > 0) {
    game.hitCooldown -= dt;
  }

  if (game.player.flash > 0) {
    game.player.flash -= dt;
  }

  if (game.hitCooldown > 0) {
    return;
  }

  for (const hazard of game.hazards) {
    const hit =
      Math.hypot(hazard.x - hitPoint.x, hazard.y - hitPoint.y) <
      hazard.radius + game.player.radius;
    if (!hit) {
      continue;
    }

    const damage = state.currentScene === "warden" ? 18 : 12;
    game.player.hp = clamp(game.player.hp - damage, 0, 100);
    state.heat = clamp(state.heat + (state.currentScene === "warden" ? 10 : 6), 0, 100);
    game.hitCooldown = 0.7;
    game.player.flash = 0.16;
    spawnParticle(
      hitPoint.x,
      hitPoint.y,
      state.currentScene === "river" ? "#b6ebff" : "#ffffff",
      14
    );
    uiBeep("warn");
    writeConsole(`Impact detected in ${scenes[state.currentScene].title}. Integrity reduced.`);

    if (game.player.hp <= 0) {
      finishMission(false);
      return;
    }

    break;
  }
};

const updateParticles = (dt) => {
  game.particles.forEach((particle) => {
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.vx *= 0.96;
    particle.vy *= 0.96;
    particle.life -= dt * 1.6;
  });
  game.particles = game.particles.filter((particle) => particle.life > 0);
};

const drawGame = () => {
  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, game.width, game.height);
  ctx.fillStyle = "rgba(4, 6, 9, 0.12)";
  ctx.fillRect(0, 0, game.width, game.height);

  game.pickups.forEach(drawPickup);
  game.hazards.forEach(drawHazard);
  drawScanPulse();
  drawIgniteBurst();
  drawShieldPulse();
  drawSurgePulse();
  drawParticles();
  drawPlayer();

  if (!game.running) {
    drawIdleOverlay();
  }
};

const updateGame = (dt) => {
  if (characterSpriteState.mix < 1) {
    characterSpriteState.mix = Math.min(1, characterSpriteState.mix + dt * 4.8);
    if (characterSpriteState.mix >= 1) {
      characterSpriteState.previousImage = null;
    }
  }

  if (!game.running) {
    drawGame();
    return;
  }

  game.elapsed += dt;
  game.scanPulse = Math.max(0, game.scanPulse - dt);
  game.igniteBurst = Math.max(0, game.igniteBurst - dt);
  game.shieldPulse = Math.max(0, game.shieldPulse - dt);
  game.surgePulse = Math.max(0, game.surgePulse - dt);
  game.actionState.igniteCooldown = Math.max(0, game.actionState.igniteCooldown - dt);
  game.actionState.shieldCooldown = Math.max(0, game.actionState.shieldCooldown - dt);
  game.actionState.surgeTimer = Math.max(0, game.actionState.surgeTimer - dt);
  state.heat = clamp(state.heat + (state.currentScene === "warden" ? 2.8 : 1.1) * dt, 0, 100);

  updatePlayer(dt);
  updatePickups();
  updateHazards(dt);
  updateParticles(dt);

  if (state.heat >= 100 && game.running) {
    finishMission(false);
  }

  updateMissionStats();
  drawGame();
};

const tick = (time) => {
  if (!lastFrame) {
    lastFrame = time;
  }

  const dt = Math.min(0.033, (time - lastFrame) / 1000);
  lastFrame = time;
  updateGame(dt);
  gameRaf = window.requestAnimationFrame(tick);
};

sceneButtons.forEach((button) => {
  button.addEventListener("click", () => {
    renderScene(button.dataset.scene);
    if (canAccessScene(button.dataset.scene)) {
      pulseButton(button);
      uiBeep("soft");
    }
  });
});

actionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyAction(button.dataset.action);
    pulseButton(button);
  });
});

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyChoice(button.dataset.choice);
    pulseButton(button);
  });
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyTheme(button.dataset.themeOption);
    pulseButton(button);
    uiBeep("soft");
  });
});

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  keys[key] = true;

  if (key === " " && state.booted) {
    event.preventDefault();
    if (!game.running) {
      startMission();
    }
  }

  if (!state.booted) {
    return;
  }

  if (key === "1") {
    applyAction("scan");
  }

  if (key === "2") {
    applyAction("ignite");
  }

  if (key === "3") {
    applyAction("shield");
  }

  if (key === "4") {
    applyAction("surge");
  }
});

window.addEventListener("keyup", (event) => {
  keys[event.key.toLowerCase()] = false;
});

if (bootStartButton) {
  renderHoldProgress();
  bootStartButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    beginHold();
  });
  bootStartButton.addEventListener("pointerup", endHold);
  bootStartButton.addEventListener("pointerleave", endHold);
  bootStartButton.addEventListener("pointercancel", endHold);
  window.addEventListener("pointerup", endHold);
}

if (bootThemeConfirm) {
  bootThemeConfirm.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    beginBootThemeHold();
  });
  bootThemeConfirm.addEventListener("pointerup", endBootThemeHold);
  bootThemeConfirm.addEventListener("pointerleave", endBootThemeHold);
  bootThemeConfirm.addEventListener("pointercancel", endBootThemeHold);
  window.addEventListener("pointerup", endBootThemeHold);
}

primeBootSequenceItems(bootThemeSequenceItems);
primeBootSequenceItems(bootIgniteSequenceItems, true);

if (fullscreenToggle) {
  fullscreenToggle.addEventListener("click", () => {
    toggleFullscreen();
  });
}

if (audioToggle) {
  audioToggle.addEventListener("click", () => {
    toggleAudio();
  });
}

if (fullscreenAccept) {
  fullscreenAccept.addEventListener("click", async () => {
    const entered = await toggleFullscreen();
    if (entered || document.fullscreenElement) {
      hideFullscreenPrompt();
      writeConsole("Fullscreen engaged. Archive viewport expanded.");
    }
  });
}

if (fullscreenDismiss) {
  fullscreenDismiss.addEventListener("click", () => {
    hideFullscreenPrompt();
    writeConsole("Continuing in windowed mode. Fullscreen remains available from the top bar.");
    uiBeep("soft");
  });
}

document.addEventListener("fullscreenchange", () => {
  updateFullscreenLabel();
  if (document.fullscreenElement) {
    hideFullscreenPrompt();
  }
});

if (victoryContinueButton) {
  victoryContinueButton.addEventListener("click", () => {
    const nextSceneId = pendingVictoryNextScene;
    hideVictoryScreen();
    uiBeep("confirm");

    if (nextSceneId) {
      renderScene(nextSceneId);
      writeConsole(
        `${scenes[nextSceneId].title} unlocked. Press Space to begin the next chapter.`
      );
    } else {
      writeConsole("Archive fully cleared. Replay any unlocked chapter whenever you want.");
    }

    pendingVictoryNextScene = null;
  });
}

const updateClock = () => {
  if (!clockNode) {
    return;
  }

  const now = new Date();
  const parts = [
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0"),
  ];
  clockNode.textContent = parts.join(":");
};

applyTheme(state.theme);
resizeGameCanvas();
renderSceneLocks();
renderScene(state.currentScene);
renderMeters();
updateAudioUi();
updateFullscreenLabel();
updateClock();
window.setInterval(updateClock, 1000);
window.addEventListener("resize", resizeGameCanvas);

if (ctx && !gameRaf) {
  gameRaf = window.requestAnimationFrame(tick);
}
