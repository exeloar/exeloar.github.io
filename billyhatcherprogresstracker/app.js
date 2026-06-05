// ─────────────────────────────────────────────
// Game State
// ─────────────────────────────────────────────

class GameState {
  constructor(saved) {
    if (saved) {
      this.levels = saved.levels;
      this.eggs   = saved.eggs;
    } else {
      this.levels = Array.from({length: 56}, () => ({
        state: 'INACCESSIBLE',
        rank:  'NORANK',
        coins: [false, false, false, false, false]
      }));
      this.eggs = Array(72).fill(false);
      this.levels[0].state = 'INCOMPLETE';
    }
  }

  get levelsCompleted() { return this.levels.filter(l => l.state === 'COMPLETE').length; }
  get chickCoins()      { return this.levels.reduce((n, l) => n + l.coins.filter(Boolean).length, 0); }
  get eggsHatched()     { return this.eggs.filter(Boolean).length; }
  get sRanks()          { return this.levels.filter(l => l.rank === 'S').length; }
  get courageEmblems() {
    let e = this.levelsCompleted;
    if (this.levelsCompleted === 56)  e++;
    if (this.sRanks          === 56)  e++;
    if (this.eggsHatched     === 72)  e++;
    if (this.chickCoins      === 280) e++;
    return e;
  }

  setLevelComplete(id, rank) {
    this.levels[id].rank  = rank;
    this.levels[id].state = 'COMPLETE';
    this._propagate(id, 'COMPLETE');
    this.save();
  }

  setLevelIncomplete(id) {
    this.levels[id].rank  = 'NORANK';
    this.levels[id].state = 'INCOMPLETE';
    this._propagate(id, 'INCOMPLETE');
    this.save();
  }

  setRank(id, rank) {
    this.levels[id].rank = rank;
    this.save();
  }

  toggleCoin(levelId, coinIdx) {
    this.levels[levelId].coins[coinIdx] = !this.levels[levelId].coins[coinIdx];
    this.save();
  }

  toggleEgg(eggId) {
    this.eggs[eggId] = !this.eggs[eggId];
    this.save();
  }

  _propagate(id, newState) {
    const worldNum = Math.floor(id / 8);
    const levelNum = id % 8;
    const follow   = newState === 'COMPLETE' ? 'INCOMPLETE' : 'INACCESSIBLE';
    const follow_targets = [];

    // Levels 0-3 unlock the next level in sequence
    if (levelNum <= 3) {
      const next = worldNum * 8 + levelNum + 1;
      // Sand world (5) level 2 → level 3 requires 25+ emblems
      const isSandSpecial = (worldNum === 5 && levelNum === 2);
      if (!isSandSpecial || this.courageEmblems >= 25) {
        if (next < 56) follow_targets.push(next);
      }
    }

    // Level 0 completing unlocks friend levels in that world (if trigger levels done)
    if (levelNum === 0) {
      for (let f = 0; f < 3; f++) {
        const triggerLevel = (1 + f) * 8 + 3;
        if (this.levels[triggerLevel].state === 'COMPLETE') {
          const friend = worldNum * 8 + f + 5;
          if (friend < 56) follow_targets.push(friend);
        }
      }
    }
    // Boss level (1) in worlds 0-4 unlocks next world's first level
    else if (worldNum <= 4 && levelNum === 1) {
      follow_targets.push((worldNum + 1) * 8);
    }
    // Friend-key level (worlds 1-3, level 3) unlocks friend levels across all worlds
    else if (worldNum >= 1 && worldNum <= 3 && levelNum === 3) {
      for (let w = 0; w < 7; w++) {
        if (this.levels[w * 8].state === 'COMPLETE') {
          const friend = w * 8 + (4 + worldNum);
          if (friend < 56) follow_targets.push(friend);
        }
      }
    }
    // Sand level 2 unlocks Giant Palace level 0
    else if (worldNum === 5 && levelNum === 2) {
      follow_targets.push(48);
    }

    for (const t of follow_targets) {
      if (this.levels[t]) this.levels[t].state = follow;
    }
  }

  save() {
    localStorage.setItem('billyProgress', JSON.stringify({levels: this.levels, eggs: this.eggs}));
  }

  static load() {
    try {
      const raw = localStorage.getItem('billyProgress');
      if (raw) return new GameState(JSON.parse(raw));
    } catch(e) {}
    return new GameState(null);
  }

  reset() {
    localStorage.removeItem('billyProgress');
    return new GameState(null);
  }
}

// ─────────────────────────────────────────────
// UI State
// ─────────────────────────────────────────────

let gs = GameState.load();
let selectedWorld = 0;
let selectedLevel = 0;
let selectedEgg   = -1;
let activeTab     = 'level-select';

// ─────────────────────────────────────────────
// Tab switching
// ─────────────────────────────────────────────

function showTab(id) {
  activeTab = id;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === id));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.id === id));
}

// ─────────────────────────────────────────────
// Header stats
// ─────────────────────────────────────────────

function updateStats() {
  const set = (id, val, max) => {
    document.getElementById('stat-' + id).textContent = val;
    document.getElementById('bar-'  + id).style.width = (val / max * 100) + '%';
    document.getElementById('stat-' + id).parentElement.parentElement
      .querySelector('.stat-max').textContent = '/' + max;
  };
  set('emblems', gs.courageEmblems, 60);
  set('levels',  gs.levelsCompleted, 56);
  set('coins',   gs.chickCoins, 280);
  set('eggs',    gs.eggsHatched, 72);
  set('sranks',  gs.sRanks, 56);

  const pct = Math.round(gs.courageEmblems / 60 * 100);
  document.getElementById('overall-pct').textContent = pct + '%';
  document.getElementById('overall-bar').style.width = pct + '%';
}

// ─────────────────────────────────────────────
// Level Select
// ─────────────────────────────────────────────

function renderWorldButtons() {
  const container = document.getElementById('world-buttons');
  container.innerHTML = '';
  GAME_DATA.WORLD_NAMES.forEach((name, i) => {
    const btn = document.createElement('button');
    btn.className = 'world-btn' + (i === selectedWorld ? ' active' : '');
    btn.textContent = name;
    btn.onclick = () => { selectedWorld = i; selectedLevel = i * 8; renderLevelSelect(); };
    container.appendChild(btn);
  });
}

function renderMissionButtons() {
  const container = document.getElementById('mission-buttons');
  container.innerHTML = '';
  for (let m = 0; m < 8; m++) {
    const levelId = selectedWorld * 8 + m;
    const level   = gs.levels[levelId];
    const btn     = document.createElement('button');
    btn.className = 'mission-btn';
    if (levelId === selectedLevel) btn.classList.add('active');
    if (level.state === 'INACCESSIBLE') btn.classList.add('locked');
    if (level.state === 'COMPLETE')     btn.classList.add('complete');

    const num  = document.createElement('span');
    num.className = 'mission-num';
    num.textContent = 'M' + (m + 1);

    const nameEl = document.createElement('span');
    nameEl.className = 'mission-name';
    nameEl.textContent = GAME_DATA.LEVEL_NAMES[levelId];

    const status = document.createElement('span');
    status.className = 'mission-status';
    if (level.state === 'COMPLETE') {
      status.textContent = level.rank === 'NORANK' ? '✓' : level.rank;
      status.classList.add('rank-' + level.rank);
    } else if (level.state === 'INACCESSIBLE') {
      status.textContent = '🔒';
    }

    btn.appendChild(num);
    btn.appendChild(nameEl);
    btn.appendChild(status);
    btn.onclick = () => { selectedLevel = levelId; renderLevelDetail(); renderMissionButtons(); };
    container.appendChild(btn);
  }
}

function openMapModal(levelId) {
  const worldNum   = Math.floor(levelId / 8);
  const missionNum = levelId % 8;
  const mapPath    = `assets/maps/${worldNum + 1}-${missionNum + 1}.png`;

  const overlay = document.createElement('div');
  overlay.className = 'map-overlay';

  const img = document.createElement('img');
  img.src = mapPath;
  img.alt = `${GAME_DATA.WORLD_NAMES[worldNum]} M${missionNum + 1} map`;
  img.className = 'map-img';
  overlay.appendChild(img);

  const close = () => { if (document.body.contains(overlay)) document.body.removeChild(overlay); };
  overlay.onclick = (e) => { if (e.target === overlay) close(); };

  const onKey = (e) => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); } };
  document.addEventListener('keydown', onKey);

  document.body.appendChild(overlay);
}

function renderLevelDetail() {
  const container = document.getElementById('level-detail');
  const levelId   = selectedLevel;
  const level     = gs.levels[levelId];
  const worldNum  = Math.floor(levelId / 8);
  const missionNum = levelId % 8;

  container.innerHTML = '';

  // World banner
  const banner = document.createElement('div');
  banner.className = 'level-banner';
  banner.style.backgroundImage = `url('${GAME_DATA.WORLD_IMAGES[worldNum]}')`;

  const bannerText = document.createElement('div');
  bannerText.className = 'level-banner-text';

  const worldName = document.createElement('span');
  worldName.className = 'banner-world';
  worldName.textContent = GAME_DATA.WORLD_NAMES[worldNum];

  const missionLabel = document.createElement('span');
  missionLabel.className = 'banner-mission';
  missionLabel.textContent = 'Mission ' + (missionNum + 1);

  const levelName = document.createElement('h2');
  levelName.className = 'banner-level-name';
  levelName.textContent = GAME_DATA.LEVEL_NAMES[levelId];

  bannerText.appendChild(worldName);
  bannerText.appendChild(missionLabel);
  bannerText.appendChild(levelName);
  banner.appendChild(bannerText);
  container.appendChild(banner);

  // Controls row
  const controls = document.createElement('div');
  controls.className = 'level-controls';

  // Complete toggle button
  const completeBtn = document.createElement('button');
  if (level.state === 'COMPLETE') {
    completeBtn.className = 'btn btn-danger';
    completeBtn.textContent = '✓ Mark Incomplete';
    completeBtn.onclick = () => {
      gs.setLevelIncomplete(levelId);
      renderLevelSelect();
      updateStats();
    };
  } else {
    completeBtn.className = 'btn btn-success';
    completeBtn.textContent = level.state === 'INACCESSIBLE' ? '🔒 Mark Complete' : 'Mark Complete';
    completeBtn.onclick = () => {
      const rank = rankSelect.value;
      gs.setLevelComplete(levelId, rank);
      renderLevelSelect();
      updateStats();
    };
  }

  // Rank selector
  const rankWrapper = document.createElement('div');
  rankWrapper.className = 'rank-wrapper';
  const rankLabel = document.createElement('label');
  rankLabel.textContent = 'Rank:';
  const rankSelect = document.createElement('select');
  rankSelect.className = 'rank-select';
  ['NORANK','D','C','B','A','S'].forEach(r => {
    const opt = document.createElement('option');
    opt.value = r;
    opt.textContent = r === 'NORANK' ? '—' : r;
    if (r === level.rank) opt.selected = true;
    rankSelect.appendChild(opt);
  });
  rankSelect.onchange = () => {
    if (level.state === 'COMPLETE') {
      gs.setRank(levelId, rankSelect.value);
      renderMissionButtons();
      updateStats();
    }
  };
  rankWrapper.appendChild(rankLabel);
  rankWrapper.appendChild(rankSelect);

  // Map button (right-aligned)
  const mapBtn = document.createElement('button');
  mapBtn.className = 'btn btn-primary';
  mapBtn.textContent = 'View Map';
  mapBtn.style.marginLeft = 'auto';
  mapBtn.onclick = () => openMapModal(levelId);

  controls.appendChild(completeBtn);
  controls.appendChild(rankWrapper);
  controls.appendChild(mapBtn);
  container.appendChild(controls);

  // Chick Coins section
  const coinSection = document.createElement('div');
  coinSection.className = 'coin-section';

  const coinTitle = document.createElement('h3');
  const collectedCount = level.coins.filter(Boolean).length;
  coinTitle.textContent = `Chick Coins  ${collectedCount}/5`;
  coinSection.appendChild(coinTitle);

  const coinRow = document.createElement('div');
  coinRow.className = 'coin-row';

  const hintBox = document.createElement('div');
  hintBox.className = 'coin-hint';
  hintBox.textContent = 'Hover a coin for its location hint';

  level.coins.forEach((collected, i) => {
    const btn = document.createElement('button');
    btn.className = 'coin-btn' + (collected ? ' collected' : '');
    btn.title = GAME_DATA.CHICK_COIN_NOTES[levelId][i];

    const img = document.createElement('img');
    img.src = 'assets/misc/chickCoin.png';
    img.alt = 'Chick Coin';
    btn.appendChild(img);

    const coinNum = document.createElement('span');
    coinNum.textContent = i + 1;
    btn.appendChild(coinNum);

    btn.onmouseenter = () => { hintBox.textContent = (i + 1) + '. ' + GAME_DATA.CHICK_COIN_NOTES[levelId][i]; };
    btn.onmouseleave = () => { hintBox.textContent = 'Hover a coin for its location hint'; };
    btn.onclick = () => {
      gs.toggleCoin(levelId, i);
      renderLevelDetail();
      updateStats();
    };
    coinRow.appendChild(btn);
  });

  coinSection.appendChild(coinRow);
  coinSection.appendChild(hintBox);
  container.appendChild(coinSection);

  // Eggs in this level
  const eggIds = GAME_DATA.EGGS_IN_LEVELS[levelId];
  if (eggIds.length > 0) {
    const eggSection = document.createElement('div');
    eggSection.className = 'level-eggs-section';

    const eggTitle = document.createElement('h3');
    const hatchedHere = eggIds.filter(id => gs.eggs[id]).length;
    eggTitle.textContent = `Eggs in this Level  ${hatchedHere}/${eggIds.length}`;
    eggSection.appendChild(eggTitle);

    const eggGrid = document.createElement('div');
    eggGrid.className = 'level-egg-grid';

    eggIds.forEach(eggId => {
      const card = document.createElement('button');
      card.className = 'level-egg-card' + (gs.eggs[eggId] ? ' hatched' : '');
      card.title = GAME_DATA.EGG_NAMES[eggId];

      const img = document.createElement('img');
      img.src = `assets/eggs/numbered/${eggId+1}.png`;
      img.alt = GAME_DATA.EGG_NAMES[eggId];
      card.appendChild(img);

      if (gs.eggs[eggId]) {
        const ck = document.createElement('div');
        ck.className = 'hatched-mark';
        ck.textContent = '✓';
        card.appendChild(ck);
      }

      const name = document.createElement('span');
      name.textContent = GAME_DATA.EGG_NAMES[eggId];
      card.appendChild(name);

      card.onclick = () => {
        gs.toggleEgg(eggId);
        renderLevelDetail();
        renderEggGallery();
        updateStats();
      };
      eggGrid.appendChild(card);
    });

    eggSection.appendChild(eggGrid);
    container.appendChild(eggSection);
  } else {
    const noEggs = document.createElement('p');
    noEggs.className = 'no-eggs-msg';
    noEggs.textContent = 'No eggs in this level.';
    container.appendChild(noEggs);
  }
}

function renderLevelSelect() {
  renderWorldButtons();
  renderMissionButtons();
  renderLevelDetail();
}

// ─────────────────────────────────────────────
// Egg Gallery helpers
// ─────────────────────────────────────────────

function buildFruitSection(preferredFruits, points) {
  const fruitSection = document.createElement('div');
  fruitSection.className = 'fruit-section';

  const fruitHeader = document.createElement('div');
  fruitHeader.className = 'fruit-header';
  const fruitTitle = document.createElement('h3');
  fruitTitle.textContent = 'Fruit Preferences';
  const ptsBadge = document.createElement('span');
  ptsBadge.className = 'pts-badge';
  ptsBadge.textContent = points === 0 ? 'Free' : points + ' pts to hatch';
  fruitHeader.appendChild(fruitTitle);
  fruitHeader.appendChild(ptsBadge);
  fruitSection.appendChild(fruitHeader);

  const fruitRow = document.createElement('div');
  fruitRow.className = 'fruit-row';
  GAME_DATA.FRUITS.forEach((name, fi) => {
    const preferred = preferredFruits.includes(fi);
    const chip = document.createElement('div');
    chip.className = 'fruit-chip' + (preferred ? ' preferred' : '');
    chip.title = name + (preferred ? ' (preferred)' : '');
    const em = document.createElement('span');
    em.className = 'fruit-emoji';
    em.textContent = GAME_DATA.FRUIT_EMOJI[fi];
    const lbl = document.createElement('span');
    lbl.className = 'fruit-label';
    lbl.textContent = name;
    const pts = document.createElement('span');
    pts.className = 'fruit-pts';
    pts.textContent = preferred ? '+2 / +10' : '+1 / +5';
    chip.appendChild(em);
    chip.appendChild(lbl);
    chip.appendChild(pts);
    fruitRow.appendChild(chip);
  });
  fruitSection.appendChild(fruitRow);

  const table = document.createElement('table');
  table.className = 'fruit-table';
  table.innerHTML = `
    <thead><tr><th></th><th>Normal</th><th>Preferred</th></tr></thead>
    <tbody>
      <tr><td>Small</td><td>+1</td><td class="pref-col">+2</td></tr>
      <tr><td>Large</td><td>+5</td><td class="pref-col">+10</td></tr>
    </tbody>`;
  fruitSection.appendChild(table);
  return fruitSection;
}

function renderEggZeroRow() {
  const row = document.getElementById('egg-zero-row');
  row.innerHTML = '';

  const label = document.createElement('span');
  label.className = 'egg-zero-label';
  label.textContent = 'Base Egg';
  row.appendChild(label);

  const card = document.createElement('button');
  card.className = 'egg-card egg-zero-card' + (selectedEgg === -1 ? ' selected' : '');
  card.title = GAME_DATA.EGG_ZERO.name;
  const img = document.createElement('img');
  img.src = 'assets/eggs/numbered/0.png';
  img.alt = GAME_DATA.EGG_ZERO.name;
  card.appendChild(img);
  card.onclick = () => { selectedEgg = -1; renderEggDetail(); renderEggZeroRow(); renderEggGallery(); };
  row.appendChild(card);
}

// ─────────────────────────────────────────────
// Egg Gallery
// ─────────────────────────────────────────────

function renderEggGallery() {
  const grid = document.getElementById('egg-grid');
  grid.innerHTML = '';

  for (let i = 0; i < 72; i++) {
    const card = document.createElement('button');
    card.className = 'egg-card' + (gs.eggs[i] ? ' hatched' : '') + (i === selectedEgg ? ' selected' : '');
    card.title = GAME_DATA.EGG_NAMES[i];

    const img = document.createElement('img');
    img.src = `assets/eggs/numbered/${i+1}.png`;
    img.alt = GAME_DATA.EGG_NAMES[i];
    card.appendChild(img);

    if (gs.eggs[i]) {
      const ck = document.createElement('div');
      ck.className = 'hatched-mark';
      ck.textContent = '✓';
      card.appendChild(ck);
    }

    card.onclick = () => { selectedEgg = i; renderEggDetail(); renderEggGallery(); };
    grid.appendChild(card);
  }
}

function renderEggDetail() {
  const panel = document.getElementById('egg-detail');
  panel.innerHTML = '';

  // ── Empty spotted egg (base egg) ──
  if (selectedEgg === -1) {
    const z = GAME_DATA.EGG_ZERO;
    const imgWrap = document.createElement('div');
    imgWrap.className = 'egg-detail-img-wrap';
    const img = document.createElement('img');
    img.src = 'assets/eggs/numbered/0.png';
    img.alt = z.name;
    img.className = 'egg-detail-img';
    imgWrap.appendChild(img);
    panel.appendChild(imgWrap);

    const name = document.createElement('h2');
    name.className = 'egg-detail-name';
    name.textContent = z.name;
    panel.appendChild(name);

    const info = document.createElement('span');
    info.className = 'egg-status-badge';
    info.textContent = 'Base egg — not collectible';
    panel.appendChild(info);

    panel.appendChild(buildFruitSection(z.fruits, z.points));
    return;
  }

  // ── Regular egg ──
  const eggId  = selectedEgg;
  const hatched = gs.eggs[eggId];

  const imgWrap = document.createElement('div');
  imgWrap.className = 'egg-detail-img-wrap';
  const img = document.createElement('img');
  img.src = `assets/eggs/normal/${GAME_DATA.EGG_HQ_IMAGES[eggId]}`;
  img.alt = GAME_DATA.EGG_NAMES[eggId];
  img.className = 'egg-detail-img';
  imgWrap.appendChild(img);

  const itemImg = document.createElement('img');
  itemImg.src = `assets/animalsanditems/${eggId+1}.png`;
  itemImg.alt = GAME_DATA.EGG_NAMES[eggId] + ' hatch result';
  itemImg.className = 'egg-item-img';
  imgWrap.appendChild(itemImg);

  if (hatched) {
    const ck = document.createElement('div');
    ck.className = 'hatched-mark hatched-mark-lg';
    ck.textContent = '✓';
    imgWrap.appendChild(ck);
  }
  panel.appendChild(imgWrap);

  const name = document.createElement('h2');
  name.className = 'egg-detail-name';
  name.textContent = GAME_DATA.EGG_NAMES[eggId];
  panel.appendChild(name);

  const statusBadge = document.createElement('span');
  statusBadge.className = 'egg-status-badge' + (hatched ? ' hatched' : '');
  statusBadge.textContent = hatched ? 'Hatched' : 'Not Hatched';
  panel.appendChild(statusBadge);

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'btn ' + (hatched ? 'btn-danger' : 'btn-success');
  toggleBtn.textContent = hatched ? 'Mark Not Hatched' : 'Mark Hatched';
  toggleBtn.onclick = () => {
    gs.toggleEgg(eggId);
    renderEggGallery();
    renderEggDetail();
    renderMissionButtons();
    renderLevelDetail();
    updateStats();
  };
  panel.appendChild(toggleBtn);

  const fruitData = GAME_DATA.EGG_FRUIT_DATA[eggId];
  panel.appendChild(buildFruitSection(fruitData.f, fruitData.p));

  // Coin requirement (Sonic through Amigo)
  const coinReq = GAME_DATA.EGG_COIN_REQUIREMENTS[eggId];
  if (coinReq !== undefined) {
    const coinReqEl = document.createElement('div');
    coinReqEl.className = 'coin-req';
    const coinImg = document.createElement('img');
    coinImg.src = 'assets/misc/chickCoin.png';
    coinImg.alt = 'Chick Coin';
    const coinText = document.createElement('span');
    const collected = gs.chickCoins;
    const met = collected >= coinReq;
    coinText.textContent = `Requires ${coinReq} chick coins to unlock`;
    coinReqEl.classList.toggle('coin-req-met', met);
    coinReqEl.appendChild(coinImg);
    coinReqEl.appendChild(coinText);
    panel.appendChild(coinReqEl);
  }

  // Level locations
  const locations = GAME_DATA.EGG_LOCATIONS[eggId];
  if (locations.length > 0) {
    const locTitle = document.createElement('h3');
    locTitle.textContent = 'Found in Levels';
    panel.appendChild(locTitle);

    const locList = document.createElement('ul');
    locList.className = 'egg-locations-list';
    locations.forEach(lvlId => {
      const li = document.createElement('li');
      const worldIdx = Math.floor(lvlId / 8);
      const mNum     = lvlId % 8;
      const lvlState = gs.levels[lvlId].state;
      li.textContent = `${GAME_DATA.WORLD_NAMES[worldIdx]} M${mNum + 1} — ${GAME_DATA.LEVEL_NAMES[lvlId]}`;
      if (lvlState === 'COMPLETE') li.classList.add('loc-complete');
      li.onclick = () => {
        selectedWorld = worldIdx;
        selectedLevel = lvlId;
        showTab('level-select');
        renderLevelSelect();
      };
      li.style.cursor = 'pointer';
      locList.appendChild(li);
    });
    panel.appendChild(locList);
  }
}

// ─────────────────────────────────────────────
// Reset button
// ─────────────────────────────────────────────

function resetProgress() {
  if (confirm('Reset ALL progress? This cannot be undone.')) {
    gs = gs.reset();
    selectedWorld = 0;
    selectedLevel = 0;
    selectedEgg   = -1;
    renderLevelSelect();
    renderEggGallery();
    renderEggDetail();
    updateStats();
  }
}

// ─────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
      showTab(btn.dataset.tab);
      if (btn.dataset.tab === 'egg-gallery') { renderEggZeroRow(); renderEggGallery(); renderEggDetail(); }
    };
  });

  renderLevelSelect();
  renderEggZeroRow();
  renderEggGallery();
  renderEggDetail();
  updateStats();
});
