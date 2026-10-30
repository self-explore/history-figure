// ==================== 八维逐项分析文案 ====================
const DIM_ANALYSIS = {
  mou: { hi: '你像{n}一样深于布局：别人看到的是事，你看到的是局。复杂局面里，你总能排出一条最省力的路径。', mid: '你的谋略属中上水准：不算机关算尽，但关键决策前你一定会把账算清。比{n}少一分狠，多一分稳。', lo: '你不爱算计，像{n}身边那些坦荡之人：宁走直路三千，不拐捷径一步。真诚是你的策略。' },
  ren: { hi: '你心里装着别人，这一点和{n}如出一辙：强大的人未必有力量，但一定有温度。', mid: '你的仁心温和而克制：你善良，但也会给善良划定边界，不会像{n}那样把自己燃尽。', lo: '你对自己诚实胜过对他人迎合——像{n}一样，你把责任看得比讨好重，但对亲近的人你自有柔软。' },
  po: { hi: '你的魄力是招牌：像{n}一样，别人还在开会，你已经把事办成了。犹豫这个词不在你的字典里。', mid: '你的胆量是分段释放的：小决定你果断，大决定你会像{n}那样先看清牌桌再下注。', lo: '你谨慎、不冒进，更像{n}式的谋定后动：慢半拍，但几乎不踩坑。' },
  chuang: { hi: '你的头脑里总有一些别人没有的线路，和{n}同款：给你一道题，你会还三道解法。', mid: '你的创见务实而精准：不求天马行空，但总能在既有框架里找到那个巧妙的开口。', lo: '你更相信被验证过的路径，像{n}一样守正大于出奇：稳定本身就是你交出的答卷。' },
  jian: { hi: '你最大的武器是耐力：像{n}那样，别人靠爆发，你靠不熄火。时间站在你这边。', mid: '你的坚韧是弹性的：该坚持时你寸步不让，但你也懂得休整，不像{n}那样和自己硬耗。', lo: '你不习惯死磕，更像{n}懂得借力的聪明人：此路不通就换路，活着比硬撑重要。' },
  gan: { hi: '你自带磁场，和{n}一样：你说话有人听，你做事有人跟，这是天赋型的感召力。', mid: '你的感染力在熟人圈里最好用：不必像{n}那样一呼百应，但你在场，气氛就会稳。', lo: '你安静、不表演，像{n}身边不声不响的实干派：你影响别人的方式是做出来，不是说出来。' },
  feng: { hi: '你对美有近乎本能的敏感，与{n}神魂相通：世界在你眼里，处处值得被认真对待。', mid: '你有自己的品味标尺：不必像{n}那样以美为业，但你的人生里一定有几样"不肯将就"。', lo: '你是实用主义者，像{n}一样觉得好用胜过好看：朴素本身就是一种审美。' },
  dan: { hi: '你在关键时刻永远先说"我来"，这份担当和{n}同源：你把责任看得比舒服重。', mid: '你的担当有分寸：份内的你绝不推脱，像{n}一样稳；但你也学会了不做无谓的背锅侠。', lo: '你更愿意做并肩者而非扛旗者——像{n}那样，你深知把合适的事交给合适的人，也是一种负责。' },
};

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
  const steps = ['读取作答轨迹', '计算八维性格光谱', '比对千年人物谱系', '封装你的专属解读'];
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

  // 八维逐项分析
  const dimRows = radar.map(d => {
    const tier = d.pct >= 75 ? 'hi' : d.pct >= 50 ? 'mid' : 'lo';
    return { ...d, tier, text: DIM_ANALYSIS[d.key][tier].replace('{n}', best.name) };
  });

  return { profile, radar, figure: best, affinity, topDims, dimRows };
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
        <div class="fig-eval-label">人格底色 · 与「${f.name}」的结合解读</div>
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

    <!-- 5 八维光谱 + 雷达 -->
    <div class="duo fade-enter" style="animation-delay:.2s">
      <div class="duo-card">
        <div class="card-title">八维性格光谱</div>
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
        <p class="para small" style="margin-top:8px">八维光谱刻画了你在谋略、仁心、魄力、创见、坚韧、感召、风雅、担当上的相对倾向，正是它与「${f.name}」的原型高度重合。</p>
      </div>
    </div>

    <!-- 5b 八维逐项分析 -->
    <div class="sec fade-enter" style="animation-delay:.22s">
      <div class="sec-title">八个维度 · 逐项分析</div>
      <div class="card">
        ${r.dimRows.map(d => `
          <div class="dim-row">
            <div class="dim-head">
              <span class="dim-name" style="border-color:${d.color}">${d.label}</span>
              <span class="dim-pct">${d.pct}%</span>
            </div>
            <div class="sp-bar" style="height:6px;background:#ece4d2;border-radius:999px;overflow:hidden;margin:6px 0 8px">
              <div style="height:100%;width:${d.pct}%;background:${d.color};border-radius:999px;opacity:.85"></div>
            </div>
            <p class="dim-text">${d.text}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 6 适合行业与工作 -->
    <div class="sec fade-enter" style="animation-delay:.25s">
      <div class="sec-title">适合的行业与工作</div>
      <div class="card">
        <div class="job-wrap">${f.jobs.map(j => `<span class="job">${j}</span>`).join('')}</div>
        <p class="career-text">${f.career}</p>
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
