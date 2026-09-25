const QUESTS = [
  {
    key: "hero",
    short: "主人公",
    title: "主人公の核を見つける",
    enemy: "ぼんやりの霧",
    time: "約5分",
    dialogue: "上手に説明しなくて大丈夫。まずは、心が動く主人公を一人だけ連れてこよう。",
    prompt: "どんな人物・生き物を描きたい？ 見た目だけでなく、その人らしさが伝わる言葉をひとつ添えてみて。",
    placeholder: "例：雨音を集めて旅する、少し臆病な魔法使いの少女",
    suggestions: [
      "小さな竜を守る少年", "記憶をなくした星の旅人", "古い森で暮らす白い狐",
      "雨音を瓶に集める魔法使い", "影だけが成長しない少女", "壊れた機械を治す旅人",
      "人の夢に迷い込む黒猫", "最後の星を探す天文学者", "名前を持たない森の番人",
      "月明かりで手紙を書く幽霊"
    ]
  },
  {
    key: "emotion",
    short: "感情",
    title: "感情を仕草に変える",
    enemy: "無表情の壁",
    time: "約5分",
    dialogue: "感情は、顔だけじゃなく手や姿勢にも隠れている。静かな動きを一つ選ぼう。",
    prompt: "主人公はいま何を感じていて、それがどんな仕草に表れている？",
    placeholder: "例：不安を隠すように、濡れた手紙を胸元で強く握っている",
    suggestions: [
      "期待に目を細める", "寂しさに肩をすぼめる", "決意して一歩を踏み出す",
      "不安を隠して袖を握る", "安心して小さく息を吐く", "驚いて言葉を失う",
      "怒りをこらえて拳をほどく", "大切なものを胸に抱える", "遠くを見つめて微笑む",
      "涙をぬぐわず空を見上げる"
    ]
  },
  {
    key: "moment",
    short: "一瞬",
    title: "物語の一瞬を選ぶ",
    enemy: "設定だけの沼",
    time: "約6分",
    dialogue: "世界の説明より、物語が動く一秒を切り取ると絵は息を始めるよ。",
    prompt: "描くのは、何かが起こる直前・最中・直後のどの瞬間？ 場所と出来事を一文にしてみよう。",
    placeholder: "例：夜明け前の駅で、届くはずのない返事が風に乗って現れた瞬間",
    suggestions: [
      "扉を開ける直前", "再会して名前を呼ぶ瞬間", "嵐が去り光が差す直後",
      "届かないはずの手紙を見つけた瞬間", "初めて魔法が光を放った瞬間", "列車が夜空へ走り出す直前",
      "約束の場所に一人でたどり着いた直後", "眠っていた街の時計が動き出す瞬間", "敵だった相手が手を差し出した瞬間",
      "最後の灯りを次の人へ渡す直前"
    ]
  },
  {
    key: "visual",
    short: "演出",
    title: "構図・光・小物を決める",
    enemy: "棒立ちの回廊",
    time: "約7分",
    dialogue: "ここからは演出。カメラの距離、光、小さな象徴を一つずつ置いていこう。",
    prompt: "どこから見た構図？ 光はどこから？ 物語を象徴する小物を一つ入れるなら？",
    placeholder: "例：少し見下ろす全身構図、窓から青い朝の光、足元に壊れた懐中時計",
    suggestions: [
      "顔に寄る／逆光／花びら", "背中から／夕暮れ／古い鍵", "遠景／月明かり／赤い傘",
      "少し見下ろす／朝の光／懐中時計", "低い視点／稲妻／割れた剣", "真横から／窓明かり／一通の手紙",
      "俯瞰／星明かり／小さなランタン", "手元に寄る／木漏れ日／青い羽根", "広角／霧の逆光／足跡",
      "正面から／ろうそくの光／銀の指輪"
    ]
  },
  {
    key: "style",
    short: "仕上げ",
    title: "世界の手触りを決める",
    enemy: "なんとなく生成",
    time: "約7分",
    dialogue: "最後は世界の手触り。あなたが見たい色と質感を選べば、生成文が完成する。",
    prompt: "色合い・画材や質感・空気感はどうしたい？ 好きな作品の雰囲気を言葉で表してもOK。",
    placeholder: "例：くすんだ青紫と金、透明感のある水彩、夢から覚める直前の静けさ",
    suggestions: [
      "淡い水彩と朝もや", "深い青と金の映画的な光", "鉛筆線とやわらかな紙の質感",
      "黒紫と銀、星屑のきらめき", "くすんだ暖色と古い絵本の質感", "白と水色、ガラスのような透明感",
      "鮮やかなネオンと雨上がりの反射", "深い緑と琥珀、静かな森の湿度", "モノクロに赤だけを残した緊張感",
      "桃色の夕焼けとフィルム写真の粒子"
    ]
  }
];

const STORAGE_KEY = "iris-mini-quest-v3";
const initialState = { current: 0, answers: {}, complete: false };
let state = loadState();
const currentSuggestionSets = {};

const $ = (id) => document.getElementById(id);
const elements = {
  progressCount: $("progressCount"), progressFill: $("progressFill"), mapNodes: $("mapNodes"),
  dialogue: $("dialogue"), questNumber: $("questNumber"), timeEstimate: $("timeEstimate"),
  enemy: $("enemy"), questTitle: $("questTitle"), questPrompt: $("questPrompt"),
  suggestions: $("suggestions"), answerInput: $("answerInput"), inputHint: $("inputHint"),
  backButton: $("backButton"), hintButton: $("hintButton"), nextButton: $("nextButton"),
  inventory: $("inventory"), resetButton: $("resetButton"), finalPanel: $("finalPanel"),
  finalPrompt: $("finalPrompt"), copyButton: $("copyButton"), editButton: $("editButton"),
  newJourneyButton: $("newJourneyButton")
};

function loadState() {
  try {
    return { ...initialState, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
  } catch { return { ...initialState }; }
}

function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

function render() {
  const answered = Object.values(state.answers).filter(Boolean).length;
  elements.progressCount.textContent = `${answered} / ${QUESTS.length}`;
  elements.progressFill.style.width = `${answered / QUESTS.length * 100}%`;

  elements.mapNodes.innerHTML = QUESTS.map((q, index) => {
    const classes = ["map-node"];
    if (state.answers[q.key]) classes.push("complete");
    if (!state.complete && index === state.current) classes.push("active");
    return `<div class="${classes.join(" ")}"><span class="map-dot">${state.answers[q.key] ? "✓" : index + 1}</span><span>${q.short}</span></div>`;
  }).join("");

  elements.inventory.innerHTML = QUESTS.map((q) => {
    const answer = state.answers[q.key];
    return `<div class="inventory-item ${answer ? "filled" : ""}"><small>${q.short}</small><p>${answer || "まだ見つかっていません"}</p></div>`;
  }).join("");

  if (state.complete) {
    elements.finalPrompt.textContent = buildPrompt();
    elements.finalPanel.hidden = false;
    document.querySelector(".journey-grid").hidden = true;
    return;
  }

  document.querySelector(".journey-grid").hidden = false;
  elements.finalPanel.hidden = true;
  const q = QUESTS[state.current];
  elements.dialogue.textContent = q.dialogue;
  elements.questNumber.textContent = `QUEST ${state.current + 1}`;
  elements.timeEstimate.textContent = q.time;
  elements.enemy.textContent = `ENEMY：${q.enemy}`;
  elements.questTitle.textContent = q.title;
  elements.questPrompt.textContent = q.prompt;
  elements.answerInput.placeholder = q.placeholder;
  elements.answerInput.value = state.answers[q.key] || "";
  elements.inputHint.textContent = "";
  elements.backButton.disabled = state.current === 0;
  elements.nextButton.innerHTML = state.current === QUESTS.length - 1 ? "生成文を完成させる <span>✦</span>" : "これで進む <span>→</span>";
  elements.suggestions.classList.remove("visible");
  elements.suggestions.innerHTML = "";
  elements.hintButton.textContent = "迷った";
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function renderSuggestionChoices(q) {
  const previous = currentSuggestionSets[q.key] || [];
  const freshPool = q.suggestions.filter((item) => !previous.includes(item));
  const next = shuffle(freshPool).slice(0, 3);
  currentSuggestionSets[q.key] = next;
  elements.suggestions.innerHTML = next.map((s) => `<button class="suggestion" type="button">${s}</button>`).join("");
  elements.suggestions.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      elements.answerInput.value = button.textContent;
      elements.answerInput.focus();
    });
  });
}

function commitCurrent() {
  const value = elements.answerInput.value.trim();
  if (!value) {
    elements.inputHint.textContent = "一言でも大丈夫。候補を選ぶか、思いついた言葉を置いてみよう。";
    elements.answerInput.focus();
    return false;
  }
  state.answers[QUESTS[state.current].key] = value;
  saveState();
  return true;
}

function buildPrompt() {
  const a = state.answers;
  return `【描きたい一枚】\n${a.hero}。\n\n【感情と仕草】\n${a.emotion}。\n\n【物語の瞬間】\n${a.moment}。\n\n【構図・光・象徴】\n${a.visual}。\n\n【色・質感・空気感】\n${a.style}。\n\n人物の感情が伝わる自然なポーズ、物語性のある一場面、丁寧な光と奥行き。上記の意図を保ちながら、画面全体に一貫した世界観を持たせる。`;
}

elements.nextButton.addEventListener("click", () => {
  if (!commitCurrent()) return;
  if (state.current < QUESTS.length - 1) {
    state.current += 1;
    saveState();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    state.complete = true;
    saveState();
    render();
    elements.finalPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

elements.backButton.addEventListener("click", () => {
  state.answers[QUESTS[state.current].key] = elements.answerInput.value.trim();
  state.current = Math.max(0, state.current - 1);
  saveState(); render();
});

elements.hintButton.addEventListener("click", () => {
  renderSuggestionChoices(QUESTS[state.current]);
  elements.suggestions.classList.add("visible");
  elements.hintButton.textContent = "別の候補を見る";
});

elements.answerInput.addEventListener("input", () => { elements.inputHint.textContent = ""; });

elements.copyButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(buildPrompt());
  elements.copyButton.textContent = "コピーしました ✓";
  setTimeout(() => { elements.copyButton.textContent = "生成文をコピー"; }, 1800);
});

elements.editButton.addEventListener("click", () => {
  state.complete = false;
  state.current = QUESTS.length - 1;
  saveState(); render();
});

function resetJourney() {
  if (!window.confirm("保存されている答えを消して、はじめから進みますか？")) return;
  state = { ...initialState, answers: {} };
  saveState(); render(); window.scrollTo({ top: 0, behavior: "smooth" });
}

elements.resetButton.addEventListener("click", resetJourney);
elements.newJourneyButton.addEventListener("click", resetJourney);

render();
