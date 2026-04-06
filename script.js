const bootScreen = document.querySelector("[data-boot-screen]");
const bootStartButton = document.querySelector("[data-boot-start]");
const bootLinesNode = document.querySelector("[data-boot-lines]");
const bootProgress = document.querySelector("[data-boot-progress]");
const bootFill = document.querySelector("[data-boot-fill]");
const bootLabel = document.querySelector("[data-boot-label]");
const audioStatus = document.querySelector("[data-audio-status]");
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
const logoByTheme = {
  inferno: "./assets/hotheads-logo-trans.png",
  toxic: "./assets/hotheads-logo-trans-toxic.png",
  abyss: "./assets/hotheads-logo-trans-abyss.png",
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
  player: { x: 480, y: 270, radius: 16, hp: 100, flash: 0 },
  pickups: [],
  hazards: [],
  particles: [],
  collected: 0,
  target: scenes.hydra.game.target,
  running: false,
  won: false,
  lost: false,
  scanPulse: 0,
  hazardTimer: 0,
  pickupTimer: 0,
  hitCooldown: 0,
  elapsed: 0,
  currentPushX: 0,
};

const keys = Object.create(null);

let audioContext = null;
let holdTone = null;
let holdProgress = 0;
let holdAnimationFrame = 0;
let holdActive = false;
let holdCompleted = false;
let holdLastTick = 0;
let gameRaf = 0;
let lastFrame = 0;
let pendingVictoryNextScene = null;

const ctx = gameCanvas ? gameCanvas.getContext("2d") : null;

const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const random = (min, max) => min + Math.random() * (max - min);

const ensureAudio = async () => {
  if (!window.AudioContext && !window.webkitAudioContext) {
    if (audioStatus) {
      audioStatus.textContent = "Muted";
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

  if (audioStatus) {
    audioStatus.textContent = "Enabled";
  }

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

const updateHoldTone = () => {
  if (!audioContext || !holdTone) {
    return;
  }

  const now = audioContext.currentTime;
  const normalized = holdProgress / 100;
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
  if (state.booting || state.booted || holdCompleted) {
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

const updateMissionStats = () => {
  const scene = scenes[state.currentScene];
  state.shield = clamp(game.player.hp, 0, 100);
  state.sync = clamp((game.collected / game.target) * 100, 0, 100);
  renderMeters();
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
    "Use WASD or arrow keys to move. Q W E trigger abilities.",
    true
  );
};

const resetPlayer = () => {
  game.player.x = game.width * 0.5;
  game.player.y = game.height * 0.5;
  game.player.hp = 100;
  game.player.flash = 0;
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
  sceneImage.src = scene.image;
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

const applyTheme = (theme) => {
  if (!validThemes.has(theme)) {
    return;
  }

  state.theme = theme;
  document.body.dataset.theme = theme;
  saveTheme(theme);
  swapBrandLogo(theme);

  themeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.themeOption === theme);
  });
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
    victoryBackdrop.style.backgroundImage = `linear-gradient(180deg, rgba(2, 8, 12, 0.36), rgba(0, 0, 0, 0.86)), url("${scene.image}")`;
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
};

const applyAction = (action) => {
  if (!game.running) {
    writeConsole("Deploy into a mission first. Press Space inside the viewport.");
    uiBeep("warn");
    return;
  }

  if (action === "scan") {
    game.scanPulse = 2.2;
    state.sync = clamp(state.sync + 6, 0, 100);
    writeConsole("Scan pulse emitted. Objectives highlighted for a short interval.");
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
    state.heat = clamp(state.heat + 8, 0, 100);
    writeConsole(`Ignite burst released. ${cleared} nearby hazards scorched.`);
    spawnParticle(game.player.x, game.player.y, "#ff8f2a", 18);
    uiBeep("confirm");
  }

  if (action === "shield") {
    game.player.hp = clamp(game.player.hp + 22, 0, 100);
    writeConsole("Shield lattice reinforced. Hull integrity restored.");
    spawnParticle(game.player.x, game.player.y, "#7cffda", 16);
    uiBeep("warn");
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

const drawPlayer = () => {
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

const updatePlayer = (dt) => {
  const sceneConfig = scenes[state.currentScene].game;
  const speed = sceneConfig.playerSpeed;
  const moveX = (keys.arrowright || keys.d ? 1 : 0) - (keys.arrowleft || keys.a ? 1 : 0);
  const moveY = (keys.arrowdown || keys.s ? 1 : 0) - (keys.arrowup || keys.w ? 1 : 0);
  const length = Math.hypot(moveX, moveY) || 1;

  game.player.x += (moveX / length) * speed * dt + game.currentPushX * dt;
  game.player.y += (moveY / length) * speed * dt;

  if (state.currentScene === "river") {
    game.player.y += Math.sin(game.elapsed * 2.4 + game.player.x * 0.01) * 24 * dt;
  }

  game.player.x = clamp(game.player.x, 24, game.width - 24);
  game.player.y = clamp(game.player.y, 24, game.height - 24);
};

const updatePickups = () => {
  for (let i = game.pickups.length - 1; i >= 0; i -= 1) {
    const pickup = game.pickups[i];
    const hit = Math.hypot(pickup.x - game.player.x, pickup.y - game.player.y) < pickup.radius + game.player.radius;
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
    const hit = Math.hypot(hazard.x - game.player.x, hazard.y - game.player.y) < hazard.radius + game.player.radius;
    if (!hit) {
      continue;
    }

    const damage = state.currentScene === "warden" ? 18 : 12;
    game.player.hp = clamp(game.player.hp - damage, 0, 100);
    state.heat = clamp(state.heat + (state.currentScene === "warden" ? 10 : 6), 0, 100);
    game.hitCooldown = 0.7;
    game.player.flash = 0.16;
    spawnParticle(game.player.x, game.player.y, "#ffffff", 14);
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
  drawParticles();
  drawPlayer();

  if (!game.running) {
    drawIdleOverlay();
  }
};

const updateGame = (dt) => {
  if (!game.running) {
    drawGame();
    return;
  }

  game.elapsed += dt;
  game.scanPulse = Math.max(0, game.scanPulse - dt);
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
    renderScene("hydra");
  }

  if (key === "2") {
    renderScene("warden");
  }

  if (key === "3") {
    renderScene("river");
  }

  if (key === "q") {
    applyAction("scan");
  }

  if (key === "w") {
    applyAction("ignite");
  }

  if (key === "e") {
    applyAction("shield");
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
renderSceneLocks();
renderScene(state.currentScene);
renderMeters();
updateClock();
window.setInterval(updateClock, 1000);

if (ctx && !gameRaf) {
  gameRaf = window.requestAnimationFrame(tick);
}
