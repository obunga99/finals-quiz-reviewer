(function () {
  "use strict";

  var subjects = window.QUIZ_SUBJECTS || [];
  var app = document.getElementById("app");

  var STYLES = {
    mc: { label: "Multiple Choice", blurb: "Pick the right answer from four choices." },
    id: { label: "Identification", blurb: "Type the answer yourself. Spelling is forgiving." },
    tb: { label: "Fill in the Table", blurb: "Complete the journal entries, worksheet and statements from the problem." }
  };

  var state = {
    screen: "home",
    subject: null,
    style: null,
    selectedTopics: new Set(),
    count: "all",
    queue: [],
    index: 0,
    score: 0,
    missed: [],
    answered: false,
    currentChoices: []
  };

  /* ---------- helpers ---------- */

  function el(tag, props, children) {
    var n = document.createElement(tag);
    props = props || {};
    Object.keys(props).forEach(function (k) {
      var v = props[k];
      if (v === false || v == null) return;
      if (k === "class") n.className = v;
      else if (k === "text") n.textContent = v;
      else if (k.slice(0, 2) === "on") n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? "" : v);
    });
    [].concat(children == null ? [] : children).forEach(function (c) {
      if (c != null) n.append(c);
    });
    return n;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function norm(s) {
    return String(s)
      .toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[-–—_\/,]/g, " ")
      .replace(/[^\p{L}\p{N}\s]/gu, "")
      .replace(/\b(the|a|an)\b/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function lev(a, b) {
    var m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    var prev = [], cur = [], i, j;
    for (j = 0; j <= n; j++) prev[j] = j;
    for (i = 1; i <= m; i++) {
      cur[0] = i;
      for (j = 1; j <= n; j++) {
        cur[j] = Math.min(
          prev[j] + 1,
          cur[j - 1] + 1,
          prev[j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1)
        );
      }
      var tmp = prev; prev = cur; cur = tmp;
    }
    return prev[n];
  }

  // "₱4,570.00", "4570" and "(4,570)" all become 4570; anything else becomes null
  function toNum(s) {
    var t = String(s).replace(/[₱$,\s]/g, "").replace(/^\((.*)\)$/, "$1");
    return /^-?\d+(\.\d+)?$/.test(t) ? Number(t) : null;
  }

  function isCorrect(given, item) {
    var expectedNum = toNum(item.a);
    if (expectedNum != null) {
      var givenNum = toNum(given);
      if (givenNum != null) return Math.abs(givenNum - expectedNum) < 0.005;
    }
    var g = norm(given);
    if (!g) return false;
    var candidates = [item.a].concat(item.alt || []).map(norm);
    if (candidates.indexOf(g) !== -1) return true;
    for (var i = 0; i < candidates.length; i++) {
      var c = candidates[i];
      if (/\d/.test(c)) continue; // never fuzzy-match numbers
      var tol = c.length <= 5 ? 0 : c.length <= 10 ? 1 : 2;
      if (tol && lev(g, c) <= tol) return true;
    }
    return false;
  }

  function usable(item, style) {
    if (style === "mc") return item.only !== "id" && item.d && item.d.length >= 3;
    return item.only !== "mc";
  }

  function pool(subject, style, topicSet) {
    var out = [];
    subject.topics.forEach(function (t, ti) {
      if (!topicSet.has(ti)) return;
      t.questions.forEach(function (q) {
        if (usable(q, style)) out.push({ item: q, topic: t.name });
      });
    });
    return out;
  }

  function countAll(subject) {
    return subject.topics.reduce(function (n, t) { return n + t.questions.length; }, 0);
  }

  function bestKey(subject, style) { return "reviewer-best:" + subject.id + ":" + style; }

  function getBest(subject, style) {
    try {
      var v = localStorage.getItem(bestKey(subject, style));
      return v == null ? null : Number(v);
    } catch (e) { return null; }
  }

  function saveBest(subject, style, pct) {
    try {
      var old = getBest(subject, style);
      if (old == null || pct > old) localStorage.setItem(bestKey(subject, style), String(pct));
    } catch (e) { /* storage unavailable, ignore */ }
  }

  function mount(node) {
    app.replaceChildren(node);
    window.scrollTo(0, 0);
  }

  /* ---------- screens ---------- */

  function showHome() {
    state.screen = "home";
    var wrap = el("div");
    wrap.append(
      el("header", { class: "hero" }, [
        el("h1", { text: "Exam Reviewer" }),
        el("p", { text: "Choose a subject, then choose how you want to be quizzed." })
      ])
    );

    var grid = el("div", { class: "grid" });
    subjects.forEach(function (s) {
      var meta = el("div", { class: "meta" }, [
        el("span", { class: "badge", text: s.topics.length + (s.topics.length === 1 ? " topic" : " topics") }),
        el("span", { class: "badge", text: countAll(s) + " questions" })
      ]);
      if (s.note) meta.append(el("span", { class: "badge warn", text: s.note }));
      grid.append(
        el("button", { class: "card", type: "button", onclick: function () { showSetup(s); } }, [
          el("h2", { text: s.title }),
          el("p", { class: "desc", text: s.description }),
          meta
        ])
      );
    });
    wrap.append(grid);
    mount(wrap);
  }

  function showSetup(subject) {
    if (state.subject !== subject) {
      state.subject = subject;
      state.selectedTopics = new Set(subject.topics.map(function (_, i) { return i; }));
      state.count = "all";
    }
    state.screen = "setup";

    var wrap = el("div", { class: "setup" });
    wrap.append(
      el("button", { class: "crumb", type: "button", onclick: showHome, text: "← All subjects" }),
      el("h2", { text: subject.title }),
      el("p", { class: "sub", text: "Pick a question style to start." })
    );

    var styleGrid = el("div", { class: "style-grid" });
    ["mc", "id"].forEach(function (key) {
      var available = pool(subject, key, state.selectedTopics).length;
      var shown = state.count === "all" ? available : Math.min(available, state.count);
      var best = getBest(subject, key);
      var card = el("button", {
        class: "card style-card",
        type: "button",
        disabled: available === 0,
        onclick: function () { startQuiz(key); }
      }, [
        el("h3", { text: STYLES[key].label }),
        el("p", { class: "desc", text: STYLES[key].blurb }),
        el("div", { class: "meta" }, [
          el("span", { class: "badge", text: shown + " questions" })
        ]),
        best != null ? el("p", { class: "best", text: "Best score: " + best + "%" }) : null
      ]);
      styleGrid.append(card);
    });
    if (subject.tables && subject.tables.length) {
      styleGrid.append(
        el("button", {
          class: "card style-card", type: "button",
          onclick: function () { showTables(subject); }
        }, [
          el("h3", { text: STYLES.tb.label }),
          el("p", { class: "desc", text: STYLES.tb.blurb }),
          el("div", { class: "meta" }, [
            el("span", { class: "badge", text: subject.tables.length + " tables" })
          ])
        ])
      );
    }
    wrap.append(styleGrid);

    // topics
    var topicChips = el("div", { class: "chips" });
    subject.topics.forEach(function (t, i) {
      var on = state.selectedTopics.has(i);
      topicChips.append(
        el("button", {
          class: "chip", type: "button", "aria-pressed": on ? "true" : "false", text: t.name,
          onclick: function () {
            if (on && state.selectedTopics.size === 1) return; // keep at least one
            if (on) state.selectedTopics.delete(i); else state.selectedTopics.add(i);
            showSetup(subject);
          }
        })
      );
    });
    wrap.append(el("section", { class: "options" }, [el("h3", { text: "Topics" }), topicChips]));

    // question count
    var countChips = el("div", { class: "chips" });
    [10, 20, "all"].forEach(function (c) {
      var on = state.count === c;
      countChips.append(
        el("button", {
          class: "chip", type: "button", "aria-pressed": on ? "true" : "false",
          text: c === "all" ? "All" : String(c),
          onclick: function () { state.count = c; showSetup(subject); }
        })
      );
    });
    wrap.append(el("section", { class: "options" }, [el("h3", { text: "Number of questions" }), countChips]));

    if (subject.note) wrap.append(el("p", { class: "note", text: subject.note }));
    mount(wrap);
  }

  function startQuiz(style, customQueue) {
    var list;
    if (customQueue) {
      list = shuffle(customQueue);
    } else {
      list = shuffle(pool(state.subject, style, state.selectedTopics));
      if (state.count !== "all") list = list.slice(0, state.count);
    }
    if (!list.length) return;
    state.style = style;
    state.queue = list;
    state.index = 0;
    state.score = 0;
    state.missed = [];
    showQuestion();
  }

  function showQuestion() {
    state.screen = "quiz";
    state.answered = false;
    var entry = state.queue[state.index];
    var item = entry.item;
    var total = state.queue.length;

    var wrap = el("div");
    wrap.append(
      el("div", { class: "topbar" }, [
        el("button", {
          class: "crumb", type: "button", text: "← Quit",
          onclick: function () {
            if (state.index === 0 || confirm("Quit this quiz? Your progress will be lost.")) showSetup(state.subject);
          }
        }),
        el("span", { text: "Question " + (state.index + 1) + " of " + total + " · Score " + state.score })
      ]),
      el("div", { class: "progress", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": String(total), "aria-valuenow": String(state.index) },
        [el("span", { style: "width:" + Math.round((state.index / total) * 100) + "%" })]),
      el("div", { class: "tag", text: entry.topic }),
      el("h2", { class: "question", text: item.q })
    );

    var feedback = el("div", { "aria-live": "polite" });
    var body = el("div");

    if (state.style === "mc") {
      var opts = shuffle([item.a].concat(shuffle(item.d).slice(0, 3)));
      state.currentChoices = opts;
      var choices = el("div", { class: "choices" });
      opts.forEach(function (text, i) {
        var btn = el("button", {
          class: "choice", type: "button",
          onclick: function () { answerMC(i, choices, feedback, item, entry); }
        }, [
          el("span", { class: "key", text: String(i + 1) }),
          el("span", { text: text })
        ]);
        choices.append(btn);
      });
      body.append(choices);
    } else {
      var input = el("input", {
        type: "text", autocomplete: "off", autocapitalize: "off", spellcheck: "false",
        placeholder: "Type your answer", "aria-label": "Your answer"
      });
      var checkBtn = el("button", { class: "btn primary", type: "button", text: "Check" });
      var giveUp = el("button", { class: "btn ghost", type: "button", text: "Show answer" });
      var row = el("div", { class: "answer-row" }, [input, checkBtn, giveUp]);

      checkBtn.addEventListener("click", function () { answerID(input, row, feedback, item, entry, false); });
      giveUp.addEventListener("click", function () { answerID(input, row, feedback, item, entry, true); });
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !state.answered) { e.preventDefault(); answerID(input, row, feedback, item, entry, false); }
      });
      body.append(row);
      setTimeout(function () { input.focus(); }, 0);
    }

    wrap.append(body, feedback);
    mount(wrap);
  }

  function nextButton() {
    var last = state.index === state.queue.length - 1;
    var btn = el("button", {
      class: "btn primary", type: "button", text: last ? "See results" : "Next question",
      onclick: function () {
        state.index++;
        if (state.index >= state.queue.length) showResults(); else showQuestion();
      }
    });
    setTimeout(function () { btn.focus(); }, 0);
    return btn;
  }

  function updateScoreLabel() {
    var label = document.querySelector(".topbar span");
    if (label) label.textContent = "Question " + (state.index + 1) + " of " + state.queue.length + " · Score " + state.score;
  }

  function answerMC(i, choices, feedback, item, entry) {
    if (state.answered) return;
    state.answered = true;
    var picked = state.currentChoices[i];
    var ok = picked === item.a;
    var btns = choices.querySelectorAll(".choice");
    btns.forEach(function (b, idx) {
      b.disabled = true;
      if (state.currentChoices[idx] === item.a) b.classList.add("correct");
      else if (idx === i) b.classList.add("wrong");
    });
    if (ok) state.score++;
    else state.missed.push({ entry: entry, given: picked });
    updateScoreLabel();

    feedback.append(
      el("div", { class: "feedback " + (ok ? "good" : "bad") }, [
        el("strong", { text: ok ? "Correct!" : "Not quite." }),
        ok ? null : el("span", { class: "ans", text: "Answer: " + item.a })
      ]),
      el("div", { class: "actions" }, [nextButton()])
    );
  }

  function answerID(input, row, feedback, item, entry, gaveUp) {
    if (state.answered) return;
    var given = input.value.trim();
    if (!gaveUp && !given) { input.focus(); return; }
    state.answered = true;
    input.disabled = true;
    row.querySelectorAll("button").forEach(function (b) { b.disabled = true; });

    var ok = !gaveUp && isCorrect(given, item);
    var record = null;
    if (ok) state.score++;
    else {
      record = { entry: entry, given: gaveUp ? "(showed answer)" : given };
      state.missed.push(record);
    }
    updateScoreLabel();

    var box = el("div", { class: "feedback " + (ok ? "good" : "bad") }, [
      el("strong", { text: ok ? "Correct!" : gaveUp ? "Here is the answer." : "Not quite." }),
      ok ? (norm(given) !== norm(item.a) ? el("span", { class: "ans", text: "Full answer: " + item.a }) : null)
         : el("span", { class: "ans", text: "Answer: " + item.a })
    ]);

    if (!ok && !gaveUp) {
      box.append(el("div", { class: "override" }, [
        el("button", {
          class: "btn ghost", type: "button", text: "I was right, mark it correct",
          onclick: function (e) {
            state.score++;
            state.missed.splice(state.missed.indexOf(record), 1);
            updateScoreLabel();
            box.className = "feedback good";
            box.querySelector("strong").textContent = "Marked correct.";
            e.currentTarget.remove();
          }
        })
      ]));
    }

    feedback.append(box, el("div", { class: "actions" }, [nextButton()]));
  }

  function showResults() {
    state.screen = "results";
    var total = state.queue.length;
    var pct = Math.round((state.score / total) * 100);
    var fresh = state.queue.length === pool(state.subject, state.style, state.selectedTopics).length ||
                state.count !== "all";
    if (fresh) saveBest(state.subject, state.style, pct);

    var msg = pct === 100 ? "Perfect score!" :
              pct >= 80 ? "Great work. Almost there." :
              pct >= 60 ? "Solid. Review the misses below." :
              "Keep reviewing. You will get there.";

    var wrap = el("div");
    wrap.append(
      el("div", { class: "card score-card" }, [
        el("div", { class: "score-big", text: state.score + " / " + total }),
        el("p", { text: pct + "% · " + STYLES[state.style].label + " · " + state.subject.title }),
        el("p", { text: msg })
      ])
    );

    var actions = el("div", { class: "actions" });
    if (state.missed.length) {
      actions.append(el("button", {
        class: "btn primary", type: "button", text: "Retry missed (" + state.missed.length + ")",
        onclick: function () { startQuiz(state.style, state.missed.map(function (m) { return m.entry; })); }
      }));
    }
    actions.append(
      el("button", { class: "btn" + (state.missed.length ? "" : " primary"), type: "button", text: "Try again", onclick: function () { startQuiz(state.style); } }),
      el("button", { class: "btn", type: "button", text: "Change style", onclick: function () { showSetup(state.subject); } }),
      el("button", { class: "btn ghost", type: "button", text: "All subjects", onclick: showHome })
    );
    wrap.append(actions);

    if (state.missed.length) {
      var review = el("section", { class: "review" }, [el("h3", { text: "Review your misses" })]);
      state.missed.forEach(function (m) {
        review.append(el("div", { class: "card miss" }, [
          el("p", { class: "q", text: m.entry.item.q }),
          el("p", { class: "yours", text: "Your answer: " + m.given }),
          el("p", { class: "right", text: "Correct answer: " + m.entry.item.a })
        ]));
      });
      wrap.append(review);
    }
    mount(wrap);
  }

  /* ---------- fill-in-the-table mode ---------- */

  function fmtMoney(n) {
    return Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function isBlankExpected(cell) { return cell.n === "" || cell.n === 0; }

  function cellOk(cell, val) {
    var v = String(val == null ? "" : val).trim();
    if (cell.sel != null) return v === cell.sel;
    if (isBlankExpected(cell)) return v === "" || v === "-" || toNum(v) === 0;
    var n = toNum(v);
    return n != null && Math.abs(n - cell.n) < 0.005;
  }

  function tbFor(subject) {
    if (!state.tb || state.tb.subject !== subject) {
      state.tb = { subject: subject, active: 0, values: {}, checked: {}, revealed: {}, summary: {}, problemOpen: false };
    }
    return state.tb;
  }

  function showTables(subject, activeIdx) {
    state.screen = "tables";
    state.style = "tb";
    var tb = tbFor(subject);
    if (activeIdx != null) tb.active = activeIdx;
    var table = subject.tables[tb.active];

    var wrap = el("div", { class: "tables" });
    wrap.append(
      el("button", { class: "crumb", type: "button", text: "← Back", onclick: function () { showSetup(subject); } }),
      el("h2", { class: "tbl-title", text: subject.title + ": Fill in the Table" })
    );

    // the problem statement
    if (subject.problem) {
      var p = subject.problem;
      var details = el("details", { class: "problem" }, [
        el("summary", { text: "Show the problem (trial balance and adjustments)" }),
        el("p", { class: "ptitle", text: p.title }),
        el("div", { class: "table-wrap" }, [
          el("table", { class: "ft static" }, [
            el("thead", {}, [el("tr", {}, ["Account", "Debit", "Credit"].map(function (h, i) {
              return el("th", { class: i ? "num" : "", scope: "col", text: h });
            }))]),
            el("tbody", {}, p.tb.map(function (r, ri) {
              return el("tr", { class: ri === p.tb.length - 1 ? "total" : "" }, r.map(function (c, i) {
                return el("td", { class: i ? "num" : "", text: c });
              }));
            }))
          ])
        ]),
        el("p", { class: "pdata-h", text: "Data for the year-end adjustments:" }),
        el("ul", { class: "pdata" }, p.data.map(function (d) { return el("li", { text: d }); }))
      ]);
      if (tb.problemOpen) details.setAttribute("open", "");
      details.addEventListener("toggle", function () { tb.problemOpen = details.open; });
      wrap.append(details);
    }

    // tabs
    var tabs = el("div", { class: "chips tabs", role: "group", "aria-label": "Tables" });
    subject.tables.forEach(function (t, i) {
      tabs.append(el("button", {
        class: "chip", type: "button", "aria-pressed": i === tb.active ? "true" : "false",
        text: t.title.replace(/^\d+\.\s*/, i + 1 + ". ").split(":")[0].split("(")[0].trim(),
        onclick: function () { showTables(subject, i); }
      }));
    });
    wrap.append(tabs);

    wrap.append(renderTable(subject, table, tb));
    mount(wrap);

    // on narrow screens a table can be wider than the card: tell the student to swipe
    var tw = wrap.querySelector(".tbl-card .table-wrap");
    var hint = wrap.querySelector(".scroll-hint");
    if (tw && hint && tw.scrollWidth > tw.clientWidth + 2) hint.hidden = false;
  }

  function renderTable(subject, table, tb) {
    var values = tb.values[table.id] = tb.values[table.id] || {};
    var checked = !!tb.checked[table.id];
    var revealed = !!tb.revealed[table.id];

    var card = el("section", { class: "card tbl-card" });
    card.append(el("h3", { text: table.title }), el("p", { class: "desc", text: table.intro || "" }));

    var thead = el("thead", {}, [el("tr", {}, table.columns.map(function (h, i) {
      return el("th", { class: i && h !== "Account" ? "num" : "", scope: "col", text: h });
    }))]);

    var tbody = el("tbody");
    var inputs = []; // { cell, key, node }

    table.rows.forEach(function (row, ri) {
      if (row.header) {
        tbody.append(el("tr", { class: "sec" }, [el("th", { colspan: String(table.columns.length), scope: "colgroup", text: row.header })]));
        return;
      }
      var tr = el("tr", { class: row.cls || "" });
      row.cells.forEach(function (cell, ci) {
        var key = ri + "-" + ci;
        if (typeof cell === "string") {
          tr.append(el(ci === 0 ? "th" : "td", { class: ci ? "num" : "", scope: ci === 0 ? "row" : false, text: cell }));
          return;
        }
        var td = el("td", { class: cell.sel != null ? "acct" : "num" });
        var node;
        if (cell.sel != null) {
          node = el("select", { "aria-label": "Account for row " + (ri + 1) }, [el("option", { value: "", text: "Choose account…" })]
            .concat(subject.accounts.map(function (a) { return el("option", { value: a, text: a }); })));
          node.value = revealed ? cell.sel : (values[key] || "");
        } else {
          node = el("input", {
            type: "text", inputmode: "decimal", autocomplete: "off", spellcheck: "false",
            "aria-label": table.columns[ci] + ", " + (row.cells[0] || "row " + (ri + 1))
          });
          node.value = revealed ? (isBlankExpected(cell) ? "" : fmtMoney(cell.n)) : (values[key] || "");
        }
        if (revealed) node.disabled = true;
        node.addEventListener("input", function () { values[key] = node.value; });
        node.addEventListener("change", function () { values[key] = node.value; });
        td.append(node);

        if (checked && !revealed) {
          var ok = cellOk(cell, values[key]);
          node.classList.add(ok ? "ok" : "bad");
          if (!ok) {
            var shown = cell.sel != null ? cell.sel : (isBlankExpected(cell) ? "leave blank" : fmtMoney(cell.n));
            td.append(el("span", { class: "exp", text: "→ " + shown }));
          }
        }
        inputs.push({ cell: cell, key: key });
        tr.append(td);
      });
      tbody.append(tr);
    });

    var tableEl = el("table", { class: "ft" + (table.wide ? " wide" : "") }, [thead, tbody]);
    card.append(
      el("div", { class: "table-wrap" }, [tableEl]),
      el("p", { class: "scroll-hint", hidden: true, text: "Swipe sideways to see all the columns →" })
    );

    var summary = el("p", { class: "tbl-summary", "aria-live": "polite" });
    if (revealed) summary.textContent = "Answers shown. Press Reset to try again.";
    else if (checked) {
      var total = 0, right = 0, stray = 0;
      inputs.forEach(function (c) {
        var ok = cellOk(c.cell, values[c.key]);
        if (isBlankExpected(c.cell)) { if (!ok) stray++; return; }
        total++; if (ok) right++;
      });
      summary.textContent = right + " of " + total + " correct" + (stray ? " (" + stray + " cell" + (stray === 1 ? "" : "s") + " should be blank)" : "") +
        (right === total && !stray ? ". Perfect!" : ". Wrong cells show the answer.");
      summary.className = "tbl-summary " + (right === total && !stray ? "good" : "bad");
    }

    var actions = el("div", { class: "actions" }, [
      el("button", {
        class: "btn primary", type: "button", text: "Check answers", disabled: revealed,
        onclick: function () { tb.checked[table.id] = true; showTables(subject); }
      }),
      el("button", {
        class: "btn", type: "button", text: "Show answers", disabled: revealed,
        onclick: function () { tb.revealed[table.id] = true; showTables(subject); }
      }),
      el("button", {
        class: "btn ghost", type: "button", text: "Reset",
        onclick: function () { delete tb.values[table.id]; delete tb.checked[table.id]; delete tb.revealed[table.id]; showTables(subject); }
      })
    ]);

    var nav = el("div", { class: "actions" });
    var idx = subject.tables.indexOf(table);
    if (idx > 0) nav.append(el("button", { class: "btn ghost", type: "button", text: "← Previous table", onclick: function () { showTables(subject, idx - 1); } }));
    if (idx < subject.tables.length - 1) nav.append(el("button", { class: "btn ghost", type: "button", text: "Next table →", onclick: function () { showTables(subject, idx + 1); } }));

    card.append(actions, summary, nav);
    return card;
  }

  /* number keys 1-4 pick a multiple choice answer */
  document.addEventListener("keydown", function (e) {
    if (state.screen !== "quiz" || state.style !== "mc" || state.answered) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var n = parseInt(e.key, 10);
    if (n >= 1 && n <= 4) {
      var btns = app.querySelectorAll(".choice");
      if (btns[n - 1]) btns[n - 1].click();
    }
  });

  if (!subjects.length) {
    mount(el("p", { class: "empty", text: "No subjects found. Check that the files in the data folder are loaded in index.html." }));
  } else {
    showHome();
  }
})();
