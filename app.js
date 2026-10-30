// ==================== 八维逐项分析文案（文艺版） ====================
const DIM_ANALYSIS = {
  mou: { hi: '深于布局，是你骨子里的天赋。别人看见的是眼前的事，你看见的是背后的局——每一步落子，都连着后头的十步。', mid: '你不算机关算尽，却自有章法。关键处你会停下来，把利弊摊开摆好，再从容落子。', lo: '你不爱算计，也不屑于算计。直来直往是你处世的方式，坦荡替你省下了所有伪装的心力。' },
  ren: { hi: '你的心里始终给旁人留着位置。看见别人的难处时，你总会先递出手——这分柔软，是你最贵重的底色。', mid: '你的善良温和而有分寸。你愿意体谅，却不再滥用体谅；你学会了把温柔，先留一份给自己。', lo: '你把诚实看得比讨好更重。你不惯于虚与委蛇，但对认定的少数人，你的暖从来不打折扣。' },
  po: { hi: '你身上有一种说干就干的决绝。机会擦身而过的瞬间，别人还在权衡，你已经动了身。', mid: '你的果敢是分层的：小事你当机立断，大事你先看清牌桌，再不慌不忙地下注。', lo: '你不是不敢，只是不肯莽撞。你信奉慢半拍的稳当——少踩的每一个坑，都是你的胜利。' },
  chuang: { hi: '你的头脑里总有些别人没有的线路。同一道题递到你手上，你还回去的，往往是三种解法。', mid: '你的新意务实而精准。你不求惊天动地，只善于在旧框架里，凿出那道刚刚好的出口。', lo: '你更信得过被时间验证过的路径。守成于你不是保守，是一种深思熟虑后的笃定。' },
  jian: { hi: '你的武器从不是爆发，而是不熄火。别人冲刺一个季度，你能安静地走完十年。', mid: '你的坚韧是柔韧的。该寸步不让时你不让，该喘息时你也懂得放过自己。', lo: '你不惯于死磕。此路不通便换一条，你深知活着、绕过去，本身就是一种赢法。' },
  gan: { hi: '你自带磁场。你在的地方，话有人听，事有人跟——这分号召力，是学不来的天赋。', mid: '你的感染力在熟识的人中间最好用。不必一呼百应，但只要你在场，人心就定了一半。', lo: '你安静，不惯表演。你影响世界的方式不是言辞，而是一件一件做出来的事。' },
  feng: { hi: '你对美有一种近乎本能的敏感。世人眼里寻常的一道光、一寸影，你都愿意郑重对待。', mid: '你有自己的品味标尺。不求以美为业，但你的生活里，总有几样不肯将就的东西。', lo: '你是朴素的实用派。在你看来，好用胜过好看——而这份朴素，本身就是一种审美。' },
  dan: { hi: '关键时刻，你永远是先说"我来"的那一个。把责任扛过头顶，再想办法走过去。', mid: '你的担当有分寸。份内的事你绝不含糊，但你也学会了，不做无谓的背锅侠。', lo: '你更愿做并肩者而非扛旗者。把合适的事托付给合适的人，在你看来也是一种负责。' },
};

// 优势面（人格底色·最高维度）
const DIM_LOUD = {
  mou: '你天生比别人多看三步。这让你在混沌里显得清醒，也让你习惯了做那个先看清、再动身的谋士。',
  ren: '你的温柔是一种力量。它不喧哗，却在所有紧绷的时刻，替身边的人撑出一块能喘气的软地。',
  po: '你的果决是稀缺品。当所有人围着一扇门犹豫，你常常已经推门进去，把路踩了出来。',
  chuang: '你脑中的世界总比现实多一层。这层想象力让你不安分，也让你拥有把"不可能"拆开重装的野心。',
  jian: '你的耐力是最深的底气。世事起落在你这里都只是过程，你认定的事，时间会替你作证。',
  gan: '你有一种聚拢人心的光。人们未必记得你说了什么，却总记得在你身边时，自己变得多想赢。',
  feng: '你把日子过成了审美。这让你在功利的世界里显得"没用"，也让你拥有旁人拿不走的丰盈。',
  dan: '你的脊梁比多数人硬。风雨来时你不闪躲，久而久之，"有你在"三个字成了别人的安全感。',
};

// 阴影面（人格底色·最低维度）
const DIM_SHADOW = {
  mou: '你不擅算计，也不屑于此。这让你干净，却也常在事后才看清：有些局，早在开局之前就写好了剧本。',
  ren: '你把太多感受收在心里。别人未必知道，你冷硬的壳下面，其实也藏着一句没说出口的"我懂你"。',
  po: '你太习惯"再等等看"。多数时候这是稳，可有些门只开一次——错过了，就要多绕很远的路。',
  chuang: '你偏爱确定的答案。这让你可靠，却也让你偶尔错过那些，只有"离谱的人"才配看见的风景。',
  jian: '你熄火得比想象中快。不是你不行，是你习惯了在半途对自己网开一面——而终点，往往只多一步。',
  gan: '你不惯表达，也不惯被注视。你的好常常要等别人发现，而世界偏偏是先听见，才看见。',
  feng: '你把"有用"排在"喜欢"前面太久了。日子不是只能算账的，给美留一块地方，你会活得更宽。',
  dan: '你习惯把责任往外挪半步。其实你并不缺能力，缺的只是那种"天塌了先砸我"的表态。',
};

// 为什么适合（最高维度 → 行业解释）
const DIM_CAREER = {
  mou: '策略、规划、竞争分析类的工作天然适合你——它们奖励多看三步的人，而你恰好看得见。',
  ren: '教育、服务、团队协作类岗位会放大你的价值：你的体谅，是最难被替代的软实力。',
  po: '快节奏、强竞争的赛道适合你：攻坚、拓展、开荒型业务，你的果断在那种地方是硬通货。',
  chuang: '创意、产品、研究类工作是你的主场：它们付钱买的，正是你脑中那些"多余的"线路。',
  jian: '长周期、深积累的领域配得上你：研究、技术、专业深耕，时间越久，你越值钱。',
  gan: '管理、市场、传播类岗位适合你：你只需要开口，人心自然会向你这边倾斜。',
  feng: '设计、内容、品牌，一切"以美为业"的领域适合你：你的品味，别人练十年也未必追得上。',
  dan: '核心骨干、危机处理、需要压舱石的位置适合你：组织最信得过的，正是你这种人。',
};

// 需要避开的领域（最低维度）
const DIM_AVOID = {
  mou: '少接纯粹拼情报与算计的局。你赢不了暗棋，但你可以选一张打明牌的桌子。',
  ren: '慎入只看数字、不看人的环境。你的价值在那样的地方，会被系统性地低估。',
  po: '避开需要闪电决策的战场——或者给它配一个敢拍板的搭档。慢不是错，但要选对赛道。',
  chuang: '别去吃纯粹的"创意饭"。执行与守成才是你的粮仓，硬凹灵感只会消耗你。',
  jian: '慎选十年磨一剑的长线苦役。分段、有反馈的短周期目标，才养得住你的节奏。',
  gan: '避开靠表演与鼓动的台前角色。幕后与实绩，才是你尊严的来源。',
  feng: '别把自己长期泡在粗糙将就的环境里。美感被反复磨损，你的心会先于身体枯萎。',
  dan: '慎做无监督的一号位。先在有人托底的位置练出扛事的底气，再谈独当一面。',
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
  const lowDim = [...radar].sort((a, b) => a.pct - b.pct)[0];

  // 八维逐项分析
  const dimRows = radar.map(d => {
    const tier = d.pct >= 75 ? 'hi' : d.pct >= 50 ? 'mid' : 'lo';
    return { ...d, tier, text: DIM_ANALYSIS[d.key][tier] };
  });

  return { profile, radar, figure: best, affinity, topDims, lowDim, dimRows };
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
        <div class="fig-eval-label" style="margin-top:14px">你的亮面</div>
        <p class="fig-eval">${DIM_LOUD[r.topDims[0].key]}</p>
        <div class="fig-eval-label" style="margin-top:14px">你的暗面</div>
        <p class="fig-eval">${DIM_SHADOW[r.lowDim.key]}</p>
        <p class="para small" style="margin-top:12px">亮面与暗面，取自你八维光谱中最强与最弱的一格。性格没有高下，只有是否被自己看见。</p>
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
        <div class="kv-line" style="margin-bottom:10px"><span class="kl">适合的方向</span></div>
        <div class="job-wrap">${f.jobs.map(j => `<span class="job">${j}</span>`).join('')}</div>
        <div class="sec3-label" style="margin-top:14px">为什么适合你</div>
        <p class="career-text" style="margin-top:6px;padding-top:0;border-top:none">${f.career}</p>
        <p class="career-text">${DIM_CAREER[r.topDims[0].key]}</p>
        <div class="sec3-label warn" style="margin-top:14px">需要避开的领域</div>
        <p class="career-text" style="margin-top:6px;padding-top:0;border-top:none;color:#9a5a3a">${DIM_AVOID[r.lowDim.key]}</p>
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
