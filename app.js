// ==================== 状态 ====================
let answers = [];
let cur = 0;

// ==================== 视图切换 ====================
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

// ==================== 进入答题 ====================
function enterQuiz() {
  answers = new Array(QUESTIONS.length).fill(null);
  show('quiz-page');
  renderQuestion(0);
}

// ==================== 答题 ====================
function renderQuestion(i) {
  cur = i;
  const q = QUESTIONS[i];
  const total = QUESTIONS.length;
  document.getElementById('q-num').textContent = `Question ${i + 1}`;
  document.getElementById('q-total').textContent = `${total} total`;
  document.getElementById('q-bar').style.width = `${(i / total) * 100}%`;
  document.getElementById('q-text').textContent = q.text;
  const wrap = document.getElementById('q-opts');
  wrap.innerHTML = q.opts.map((o, idx) =>
    `<button class="opt" onclick="pick(${idx})"><span class="opt-tag">${'ABCD'[idx]}</span>${o.t}</button>`
  ).join('');
}

function pick(idx) {
  answers[cur] = idx;
  if (cur < QUESTIONS.length - 1) {
    renderQuestion(cur + 1);
    window.scrollTo(0, 0);
  } else {
    startLoading();
  }
}

// ==================== 加载页 ====================
function startLoading() {
  show('load-page');
  const steps = ['读取作答轨迹', '计算六维性格光谱', '比对千年人物谱系', '封装你的专属解读'];
  const bar = document.getElementById('load-bar');
  const pct = document.getElementById('load-pct');
  const list = document.getElementById('load-steps');
  list.innerHTML = steps.map((s, i) => `<div class="load-step" id="ls-${i}"><span class="ls-dot"></span>${s}</div>`).join('');
  let p = 0;
  const timer = setInterval(() => {
    p += Math.random() * 9 + 4;
    if (p >= 100) { p = 100; clearInterval(timer); setTimeout(showResult, 400); }
    bar.style.width = p + '%';
    pct.textContent = Math.floor(p) + '%';
    const stage = Math.min(3, Math.floor(p / 25));
    for (let i = 0; i < 4; i++) {
      const el = document.getElementById('ls-' + i);
      el.classList.toggle('done', i < stage || p >= 100);
      el.classList.toggle('active', i === stage && p < 100);
    }
  }, 160);
}

// ==================== 计分与匹配 ====================
function compute() {
  // 每个维度的实际得分与理论最高分
  const dimScore = {}; DIMS.forEach(d => dimScore[d.key] = 0);
  const dimMax = {}; DIMS.forEach(d => dimMax[d.key] = 0);

  QUESTIONS.forEach((q, i) => {
    // 该题对每个维度的最大可能贡献
    DIMS.forEach(d => {
      let mx = 0;
      q.opts.forEach(o => { if (o.s[d.key]) mx = Math.max(mx, o.s[d.key]); });
      dimMax[d.key] += mx;
    });
    const a = answers[i] == null ? 0 : answers[i];
    const s = q.opts[a].s;
    Object.keys(s).forEach(k => { dimScore[k] += s[k]; });
  });

  const profile = {};
  const radar = DIMS.map(d => {
    const pct = dimMax[d.key] ? Math.round((dimScore[d.key] / dimMax[d.key]) * 100) : 0;
    profile[d.key] = dimMax[d.key] ? (dimScore[d.key] / dimMax[d.key]) * 100 : 0;
    return { ...d, pct };
  });

  // 余弦相似度：比对性格「形状」而非绝对值，匹配最相像的人物
  const cosine = (u, v) => {
    let dot = 0, nu = 0, nv = 0;
    DIMS.forEach(d => { dot += u[d.key] * v[d.key]; nu += u[d.key] * u[d.key]; nv += v[d.key] * v[d.key]; });
    const den = Math.sqrt(nu) * Math.sqrt(nv);
    return den ? dot / den : 0;
  };
  let best = FIGURES[0], bestSim = -1;
  FIGURES.forEach(f => {
    const sim = cosine(profile, f.proto);
    if (sim > bestSim) { bestSim = sim; best = f; }
  });
  const affinity = Math.max(60, Math.min(99, Math.round(bestSim * 100)));

  // 前三强维度
  const topDims = [...radar].sort((a, b) => b.pct - a.pct).slice(0, 3);

  return { profile, radar, figure: best, affinity, topDims };
}

// ==================== 雷达图 ====================
function drawRadar(canvasId, radar) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  const size = 300;
  canvas.width = size * dpr; canvas.height = size * dpr;
  canvas.style.width = size + 'px'; canvas.style.height = size + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  const cx = size / 2, cy = size / 2, R = size / 2 - 52;
  const n = radar.length;

  ctx.clearRect(0, 0, size, size);
  for (let ring = 1; ring <= 4; ring++) {
    const rr = R * ring / 4;
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const ang = -Math.PI / 2 + (i % n) * (2 * Math.PI / n);
      const x = cx + rr * Math.cos(ang), y = cy + rr * Math.sin(ang);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(140,120,80,0.18)'; ctx.lineWidth = 1; ctx.stroke();
  }
  for (let i = 0; i < n; i++) {
    const ang = -Math.PI / 2 + i * (2 * Math.PI / n);
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.lineTo(cx + R * Math.cos(ang), cy + R * Math.sin(ang));
    ctx.strokeStyle = 'rgba(140,120,80,0.15)'; ctx.stroke();
  }
  ctx.beginPath();
  const pts = [];
  radar.forEach((d, i) => {
    const v = d.pct / 100;
    const ang = -Math.PI / 2 + i * (2 * Math.PI / n);
    const x = cx + R * v * Math.cos(ang), y = cy + R * v * Math.sin(ang);
    pts.push([x, y]);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = 'rgba(160,130,60,0.22)'; ctx.fill();
  ctx.strokeStyle = '#a0823c'; ctx.lineWidth = 2; ctx.stroke();
  pts.forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 3.5, 0, 7); ctx.fillStyle = '#a0823c'; ctx.fill(); });
  ctx.font = '12px "Noto Sans SC", sans-serif';
  ctx.fillStyle = '#6a6252'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  radar.forEach((d, i) => {
    const ang = -Math.PI / 2 + i * (2 * Math.PI / n);
    ctx.fillText(d.label, cx + (R + 30) * Math.cos(ang), cy + (R + 24) * Math.sin(ang));
  });
}

// 颜色加深工具（用于人物卡渐变）
function darken(hex, amt) {
  const h = hex.replace('#', '');
  const num = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  let r = (num >> 16) - amt, g = ((num >> 8) & 0xff) - amt, b = (num & 0xff) - amt;
  r = Math.max(0, r); g = Math.max(0, g); b = Math.max(0, b);
  return `rgb(${r},${g},${b})`;
}

// ==================== 结果页 ====================
function showResult() {
  const r = compute();
  const f = r.figure;
  show('result-page');

  const scroll = document.getElementById('result-scroll');
  scroll.innerHTML = `
    <!-- 1 标题 -->
    <div class="r-head fade-enter">
      <span class="r-badge">测试完成</span>
      <h1 class="r-h1">你的历史灵魂原型</h1>
    </div>

    <!-- 2 人物主卡 -->
    <div class="figure-card fade-enter" style="animation-delay:.05s">
      <div class="fig-top" style="background:linear-gradient(160deg,${f.color},${darken(f.color, 45)})">
        <div class="fig-aff">契合度 ${r.affinity}%</div>
        <div class="fig-era">${f.era}</div>
        <div class="fig-name">${f.name}</div>
        <div class="fig-full">${f.full}</div>
        <div class="fig-years">${f.years}</div>
        <div class="fig-kw-block">
          <div class="fig-kw-label">你的人生主题词</div>
          <div class="fig-kw">${f.keyword}</div>
        </div>
      </div>
      <div class="fig-bottom">
        <p class="fig-eval">${f.eval}</p>
      </div>
    </div>

    <!-- 3 性格特点 -->
    <div class="sec fade-enter" style="animation-delay:.1s">
      <div class="sec-title">性格特点</div>
      <div class="card">
        <div class="trait-wrap">${f.traits.map(t => `<span class="trait">${t}</span>`).join('')}</div>
      </div>
    </div>

    <!-- 4 性格底色 -->
    <div class="sec fade-enter" style="animation-delay:.15s">
      <div class="sec-title">性格底色</div>
      <div class="card">
        <div class="base-box">
          <div class="base-swatch" style="background:linear-gradient(160deg,${f.color},${darken(f.color, 40)})"></div>
          <div>
            <div class="base-name">${f.baseColor.name}</div>
            <div class="base-desc">${f.baseColor.desc}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 5 六维光谱 + 雷达 -->
    <div class="duo fade-enter" style="animation-delay:.2s">
      <div class="duo-card">
        <div class="card-title">六维性格光谱</div>
        <canvas id="radar-canvas"></canvas>
      </div>
      <div class="duo-card">
        <div class="card-title">你的突出维度</div>
        ${r.topDims.map((d, i) => `
          <div style="margin-bottom:16px">
            <div style="display:flex;justify-content:space-between;font-size:14px;font-weight:600;margin-bottom:6px">
              <span>${['最强', '次强', '第三'][i]} · ${d.label}</span><span style="color:#8a7448">${d.pct}%</span>
            </div>
            <div class="sp-bar" style="height:8px;background:#ece4d2;border-radius:999px;overflow:hidden">
              <div style="height:100%;width:${d.pct}%;background:linear-gradient(90deg,#a08a5a,#c0a878);border-radius:999px"></div>
            </div>
          </div>
        `).join('')}
        <p class="para small" style="margin-top:8px">六维光谱刻画了你在谋略、仁心、魄力、创见、坚韧、感召上的相对倾向，正是它与「${f.name}」的原型高度重合。</p>
      </div>
    </div>

    <!-- 6 适合工作 -->
    <div class="sec fade-enter" style="animation-delay:.25s">
      <div class="sec-title">适合什么工作</div>
      <div class="card">
        <div class="job-wrap">${f.jobs.map(j => `<span class="job">${j}</span>`).join('')}</div>
      </div>
    </div>

    <!-- 7 金句点评 -->
    <div class="sec fade-enter" style="animation-delay:.3s">
      <div class="sec-title">金句点评</div>
      <div class="golden-box">
        <div class="golden-quote">${f.quote}</div>
        <div class="golden-src">—— ${f.name}（${f.full}）</div>
        <div class="golden-list">
          ${f.golden.map(g => `<div class="golden-item">${g}</div>`).join('')}
        </div>
      </div>
    </div>

    <!-- 8 底栏 -->
    <div class="r-foot fade-enter" style="animation-delay:.35s">
      <div class="foot-score">你的灵魂原型 · <strong>${f.name}</strong> · 契合度 ${r.affinity}%</div>
      <div class="foot-btns">
        <button class="fbtn" onclick="restart()">重新测试</button>
        <button class="fbtn ghost" onclick="shareResult()">分享结果</button>
      </div>
    </div>
  `;

  window.scrollTo(0, 0);
  setTimeout(() => drawRadar('radar-canvas', r.radar), 120);
}

function restart() { show('cover-page'); }
function shareResult() {
  const txt = '我刚测了历史人物测试，来看看你的灵魂最像哪位历史人物？';
  if (navigator.share) navigator.share({ title: '历史人物测试', text: txt, url: location.href }).catch(() => {});
  else { alert('链接已复制，去分享给朋友吧！\n' + location.href); }
}
