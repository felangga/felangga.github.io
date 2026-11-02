/* story-share.js
 * Adds a "Share to Story" button on Chirpy post pages.
 * Click: renders a 1080x1920 story card (canvas) from the post's own
 * metadata, downloads it as PNG, and copies the post URL to the clipboard
 * so it can be pasted into the Instagram link sticker.
 * No external dependencies.
 */
(function () {
  "use strict";

  var CSS =
    "#story-share-btn{position:fixed;right:1.5rem;bottom:5.5rem;z-index:1035;display:flex;align-items:center;gap:.5rem;" +
    "padding:.6rem 1.1rem;border:1px solid #495057;border-radius:2rem;background:#212529;color:#dee2e6;" +
    "font-size:.95rem;cursor:pointer;box-shadow:0 .25rem .75rem rgba(0,0,0,.35);transition:border-color .15s,color .15s}" +
    "#story-share-btn:hover{border-color:#3fb950;color:#3fb950}" +
    "#story-share-btn i{font-size:1.1rem}" +
    "#story-share-toast{position:fixed;left:50%;transform:translateX(-50%);bottom:9.5rem;z-index:1036;" +
    "background:#1a1d20;border:1px solid #495057;border-radius:.75rem;color:#dee2e6;padding:.75rem 1.25rem;" +
    "font-size:.9rem;max-width:80vw;box-shadow:0 .25rem .75rem rgba(0,0,0,.4)}";

  function init() {
    if (!document.getElementById("story-share-style")) {
      var st = document.createElement("style");
      st.id = "story-share-style";
      st.textContent = CSS;
      document.head.appendChild(st);
    }
    // Only on post pages (jekyll-seo-tag sets og:type=article for posts).
    var isPost = document.querySelector('meta[property="og:type"][content="article"]');
    if (!isPost) return;
    if (document.getElementById("story-share-btn")) return;

    var btn = document.createElement("button");
    btn.id = "story-share-btn";
    btn.type = "button";
    btn.title = "Generate an Instagram story card for this post";
    btn.innerHTML =
      '<i class="fa-brands fa-instagram"></i><span>Story</span>';
    document.body.appendChild(btn);

    btn.addEventListener("click", function () {
      try {
        var card = renderCard(readPostData());
        downloadCard(card, slugify(readPostData().title));
        copyLink(readPostData().url);
        showToast("Story card downloaded. Post link copied, paste it as the IG link sticker.");
      } catch (err) {
        showToast("Could not generate the story card: " + err.message);
      }
    });
  }

  function readPostData() {
    function meta(sel, attr) {
      var el = document.querySelector(sel);
      return el ? el.getAttribute(attr) : "";
    }
    var h1 = document.querySelector("h1");
    var title = (h1 && h1.textContent.trim()) || meta('meta[property="og:title"]', "content") || document.title;
    var site = meta('meta[property="og:site_name"]', "content") || "felangga.com";
    var canonical = document.querySelector('link[rel="canonical"]');
    var url = (canonical && canonical.href) || window.location.href;
    var timeEl = document.querySelector("time");
    var date = timeEl ? timeEl.textContent.trim() : "";
    var desc = meta('meta[name="description"]', "content") || "";
    return { title: title, site: site, url: url.replace(/^https?:\/\//, ""), date: date, desc: desc };
  }

  /* ---------- canvas card ---------- */

  var W = 1080, H = 1920;
  var BG = "#212529", INK = "#f8f9fa", MUTED = "#8b949e", SUB = "#adb5bd",
      BORDER = "#495057", GREEN = "#3fb950", PANEL = "#1a1d20";
  var SANS = '800 76px -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  var SANS_SUB = '400 44px -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  var MONO = '400 34px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
  var MONO_SM = '400 28px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

  function renderCard(d) {
    var cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var ctx = cv.getContext("2d");

    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);

    var PAD = 110, TOP = 300, BOTTOM = 280;
    var x = PAD, maxW = W - PAD * 2;
    var y = TOP;

    // kicker: green dot + SITE / NEW POST
    ctx.beginPath();
    ctx.arc(x + 10, y + 18, 10, 0, Math.PI * 2);
    ctx.fillStyle = GREEN;
    ctx.fill();
    ctx.font = MONO_SM;
    ctx.fillStyle = MUTED;
    if ("letterSpacing" in ctx) ctx.letterSpacing = "6px";
    ctx.fillText(d.site.toUpperCase() + "  /  NEW POST", x + 44, y + 28);
    if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";
    y += 70 + 70;

    // hero title
    ctx.font = SANS;
    ctx.fillStyle = INK;
    var lines = wrap(ctx, d.title, maxW);
    lines.forEach(function (ln) {
      ctx.fillText(ln, x, y);
      y += 86;
    });
    y += 40;

    // description excerpt
    if (d.desc) {
      ctx.font = SANS_SUB;
      ctx.fillStyle = SUB;
      var dlines = wrap(ctx, d.desc, maxW).slice(0, 4);
      dlines.forEach(function (ln) {
        ctx.fillText(ln, x, y);
        y += 62;
      });
      y += 40;
    }

    // url panel (terminal style)
    ctx.font = MONO;
    var urlLines = wrap(ctx, d.url, maxW - 88).slice(0, 3);
    var panelH = 80 + urlLines.length * 52 + 56;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(x, y, maxW, panelH, 20); else ctx.rect(x, y, maxW, panelH);
    ctx.fillStyle = PANEL;
    ctx.fill();
    ctx.strokeStyle = BORDER;
    ctx.lineWidth = 2;
    ctx.stroke();
    // traffic dots
    var dots = ["#ff5f57", "#febc2e", "#28c840"];
    dots.forEach(function (c, i) {
      ctx.beginPath();
      ctx.arc(x + 44, y + 44, 11, 0, Math.PI * 2);
      ctx.fillStyle = c;
      ctx.fill();
    });
    ctx.font = MONO_SM;
    ctx.fillStyle = "#6c757d";
    ctx.fillText("read the full post", x + 100, y + 52);
    ctx.font = MONO;
    ctx.fillStyle = GREEN;
    urlLines.forEach(function (ln, i) {
      ctx.fillText(ln, x + 44, y + 108 + i * 52);
    });
    y += panelH;

    // footer pinned to bottom
    ctx.font = MONO_SM;
    ctx.fillStyle = MUTED;
    var fy = H - BOTTOM;
    if (d.date) {
      ctx.fillText(d.date, x, fy);
      fy -= 56;
    }
    ctx.fillStyle = GREEN;
    ctx.font = MONO;
    ctx.fillText("link in bio", x, fy);

    return cv;
  }

  function wrap(ctx, text, maxW) {
    var words = String(text).split(/\s+/), lines = [], cur = "";
    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      // break over-long words (e.g. URLs) at character level
      while (ctx.measureText(w).width > maxW) {
        var cut = w.length;
        while (cut > 1 && ctx.measureText(w.slice(0, cut)).width > maxW) cut--;
        if (cur) { lines.push(cur); cur = ""; }
        lines.push(w.slice(0, cut));
        w = w.slice(cut);
      }
      var test = cur ? cur + " " + w : w;
      if (ctx.measureText(test).width > maxW && cur) {
        lines.push(cur);
        cur = w;
      } else {
        cur = test;
      }
    }
    if (cur) lines.push(cur);
    return lines;
  }

  /* ---------- actions ---------- */

  function downloadCard(canvas, slug) {
    canvas.toBlob(function (blob) {
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "story-" + slug + ".png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000);
    }, "image/png");
  }

  function copyLink(url) {
    var full = "https://" + url.replace(/^https?:\/\//, "");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(full).catch(function () { fallbackCopy(full); });
    } else {
      fallbackCopy(full);
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) { /* noop */ }
    ta.remove();
  }

  function slugify(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "post";
  }

  function showToast(msg) {
    var old = document.getElementById("story-share-toast");
    if (old) old.remove();
    var t = document.createElement("div");
    t.id = "story-share-toast";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 5000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
