import { useState, useEffect, useCallback, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600;700;900&family=Orbitron:wght@400;700;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #060608;
    --bg2: #0a0a12;
    --bg3: #0f0f1a;
    --border: rgba(255,255,255,0.07);
    --border2: rgba(255,255,255,0.12);
    --text: #f0f0fa;
    --text2: #b0b0c8;
    --text3: #606080;
    --text4: #404060;
    --accent: #e10600;
    --card-bg: rgba(14,14,24,0.8);
    --glass: rgba(255,255,255,0.04);
    --glass-border: rgba(255,255,255,0.08);
    --glow: rgba(225,6,0,0.15);
    --glow-strong: rgba(225,6,0,0.3);
    --shadow: 0 8px 32px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.04) inset;
    --shadow-hover: 0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(225,6,0,0.08);
  }
  .light-mode {
    --bg: #eeeef5;
    --bg2: #f8f8ff;
    --bg3: #e4e4ef;
    --border: rgba(0,0,0,0.08);
    --border2: rgba(0,0,0,0.14);
    --text: #08081a;
    --text2: #2a2a40;
    --text3: #505068;
    --text4: #808098;
    --card-bg: rgba(255,255,255,0.75);
    --glass: rgba(255,255,255,0.5);
    --glass-border: rgba(0,0,0,0.06);
    --glow: rgba(225,6,0,0.08);
    --glow-strong: rgba(225,6,0,0.15);
    --shadow: 0 8px 32px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.8) inset;
    --shadow-hover: 0 20px 60px rgba(0,0,0,0.18), 0 0 30px rgba(225,6,0,0.06);
  }

  html, body, #root {
    width: 100%;
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    font-family: 'Exo 2', sans-serif;
    transition: background 0.4s, color 0.4s;
  }

  .f1-app {
    width: 100%;
    min-height: 100vh;
    background: var(--bg);
    position: relative;
    overflow-x: hidden;
    transition: background 0.4s;
  }

  /* ── Animated background ── */
  .grid-bg {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(225,6,0,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(225,6,0,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 0;
  }
  .orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
    animation: orbFloat 12s ease-in-out infinite;
    opacity: 0.5;
  }
  .orb-1 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(225,6,0,0.12), transparent 70%); top: -200px; left: -100px; animation-delay: 0s; }
  .orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(100,0,200,0.06), transparent 70%); top: 30%; right: -100px; animation-delay: -4s; }
  .orb-3 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(225,6,0,0.07), transparent 70%); bottom: -100px; left: 30%; animation-delay: -8s; }
  .light-mode .orb-1 { opacity: 0.25; }
  .light-mode .orb-2 { opacity: 0.15; }
  .light-mode .orb-3 { opacity: 0.2; }
  @keyframes orbFloat {
    0%, 100% { transform: translateY(0px) scale(1); }
    33% { transform: translateY(-30px) scale(1.05); }
    66% { transform: translateY(20px) scale(0.97); }
  }

  .content { position: relative; z-index: 1; width: 100%; }

  /* ── Hero ── */
  .hero {
    background: linear-gradient(135deg, var(--bg) 0%, rgba(40,3,3,0.9) 50%, var(--bg) 100%);
    border-bottom: 1px solid rgba(225,6,0,0.3);
    padding: clamp(28px, 6vw, 56px) 20px clamp(24px, 5vw, 40px);
    text-align: center;
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  .hero::before {
    content: 'F1';
    position: absolute;
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(120px, 32vw, 380px);
    font-weight: 900;
    color: transparent;
    -webkit-text-stroke: 1px rgba(225,6,0,0.06);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    white-space: nowrap;
    letter-spacing: -10px;
  }
  /* Speed lines */
  .hero::after {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      90deg,
      transparent,
      transparent 120px,
      rgba(225,6,0,0.015) 120px,
      rgba(225,6,0,0.015) 121px
    );
    pointer-events: none;
    animation: speedSweep 8s linear infinite;
  }
  @keyframes speedSweep {
    from { transform: translateX(-120px); }
    to { transform: translateX(0px); }
  }
  .hero-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(22px, 6vw, 60px);
    font-weight: 900;
    color: var(--text);
    letter-spacing: clamp(3px, 1.2vw, 6px);
    text-transform: uppercase;
    position: relative; z-index: 1;
    text-shadow: 0 0 40px rgba(255,255,255,0.05);
  }
  .hero-title span {
    color: #e10600;
    text-shadow: 0 0 30px rgba(225,6,0,0.5), 0 0 60px rgba(225,6,0,0.2);
  }
  .hero-sub {
    font-size: clamp(9px, 2.2vw, 13px);
    color: var(--text3);
    letter-spacing: clamp(3px, 1.2vw, 8px);
    text-transform: uppercase;
    margin-top: 10px;
    position: relative; z-index: 1;
  }

  /* ── Countdown ── */
  .countdown-wrap {
    position: relative; z-index: 1;
    margin-top: 22px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .countdown-label {
    font-size: clamp(8px, 1.8vw, 10px);
    color: var(--text4);
    letter-spacing: clamp(3px, 1.2vw, 6px);
    text-transform: uppercase;
    font-family: 'Orbitron', sans-serif;
  }
  .countdown-race {
    font-size: clamp(10px, 2.5vw, 14px);
    color: #e10600;
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    letter-spacing: 2px;
    text-shadow: 0 0 20px rgba(225,6,0,0.4);
  }
  .countdown-tiles {
    display: flex;
    gap: clamp(8px, 2vw, 14px);
    margin-top: 6px;
  }
  .countdown-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .countdown-num {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(22px, 5vw, 40px);
    font-weight: 900;
    color: var(--text);
    background: rgba(225,6,0,0.06);
    border: 1px solid rgba(225,6,0,0.25);
    border-radius: 6px;
    padding: clamp(8px, 2vw, 12px) clamp(12px, 3vw, 22px);
    min-width: clamp(50px, 11vw, 80px);
    text-align: center;
    line-height: 1;
    box-shadow: 0 0 20px rgba(225,6,0,0.08), inset 0 1px 0 rgba(255,255,255,0.06);
    backdrop-filter: blur(8px);
    transition: box-shadow 0.3s;
  }
  .countdown-num:hover { box-shadow: 0 0 30px rgba(225,6,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08); }
  .countdown-unit {
    font-size: clamp(7px, 1.5vw, 9px);
    color: var(--text4);
    letter-spacing: 2px;
    text-transform: uppercase;
    font-family: 'Orbitron', sans-serif;
  }

  /* ── Circuits ── */
  .circuit-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
    gap: 16px;
  }
  .circuit-card {
    background: var(--card-bg);
    border: 1px solid var(--glass-border);
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: pointer;
    box-shadow: var(--shadow);
    backdrop-filter: blur(12px);
  }
  .circuit-card:hover {
    border-color: rgba(225,6,0,0.4);
    transform: translateY(-5px) scale(1.01);
    box-shadow: var(--shadow-hover);
  }
  .circuit-card-header {
    padding: 14px 16px 10px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
  .circuit-flag { font-size: 28px; line-height: 1; }
  .circuit-name {
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: var(--text);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 3px;
  }
  .circuit-country { font-size: 11px; color: var(--text3); }
  .circuit-round {
    margin-left: auto;
    font-family: 'Orbitron', sans-serif;
    font-size: 9px;
    color: #e10600;
    letter-spacing: 1px;
    white-space: nowrap;
    text-shadow: 0 0 10px rgba(225,6,0,0.3);
  }
  .circuit-body { padding: 12px 16px 14px; }
  .circuit-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 10px;
  }
  .circuit-stat-item { display: flex; flex-direction: column; gap: 2px; }
  .circuit-stat-lbl { font-size: 9px; color: var(--text4); text-transform: uppercase; letter-spacing: 1px; font-family: 'Orbitron', sans-serif; }
  .circuit-stat-val { font-size: 12px; color: var(--text2); font-weight: 600; }
  .circuit-desc { font-size: 12px; color: var(--text3); line-height: 1.7; margin-top: 8px; }
  .circuit-tag {
    display: inline-block;
    margin: 3px 3px 0 0;
    padding: 2px 8px;
    background: rgba(225,6,0,0.07);
    border: 1px solid rgba(225,6,0,0.2);
    border-radius: 20px;
    font-size: 9px;
    color: #e10600;
    letter-spacing: 1px;
    font-family: 'Orbitron', sans-serif;
    text-transform: uppercase;
  }

  /* ── Nav ── */
  .nav {
    display: flex;
    justify-content: center;
    padding: 0 8px;
    background: rgba(10,10,18,0.75);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  }
  .light-mode .nav {
    background: rgba(248,248,255,0.8);
    box-shadow: 0 4px 24px rgba(0,0,0,0.1);
  }
  .nav-inner {
    display: flex;
    justify-content: center;
    max-width: 1200px;
    width: 100%;
    align-items: stretch;
  }
  .nav-group {
    position: relative;
    flex: 1;
  }
  .nav-group-label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 14px 10px;
    font-family: 'Exo 2', sans-serif;
    font-size: clamp(10px, 2.5vw, 13px);
    font-weight: 600;
    color: var(--text2);
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: color 0.2s;
    white-space: nowrap;
    user-select: none;
    border-bottom: 2px solid transparent;
    width: 100%;
  }
  .nav-group-label:hover { color: var(--text); }
  .nav-group.open .nav-group-label,
  .nav-group:hover .nav-group-label,
  .nav-group.has-active .nav-group-label {
    color: var(--text);
    border-bottom-color: #e10600;
    text-shadow: 0 0 20px rgba(225,6,0,0.3);
  }
  .nav-chevron {
    font-size: 8px;
    color: var(--text4);
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    flex-shrink: 0;
  }
  .nav-group.open .nav-chevron,
  .nav-group:hover .nav-chevron { transform: rotate(180deg); color: #e10600; }
  .nav-dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-8px);
    background: rgba(10,10,18,0.92);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid var(--glass-border);
    border-top: 2px solid #e10600;
    border-radius: 0 0 10px 10px;
    padding: 8px;
    min-width: 250px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(225,6,0,0.1);
    z-index: 200;
  }
  .light-mode .nav-dropdown { background: rgba(248,248,255,0.95); }
  .nav-group.open .nav-dropdown,
  .nav-group:hover .nav-dropdown {
    opacity: 1;
    pointer-events: all;
    transform: translateX(-50%) translateY(0);
  }
  .nav-group:first-child .nav-dropdown { left: 0; transform: translateX(0) translateY(-8px); }
  .nav-group:first-child.open .nav-dropdown,
  .nav-group:first-child:hover .nav-dropdown { transform: translateX(0) translateY(0); }
  .nav-group:last-child .nav-dropdown { left: auto; right: 0; transform: translateX(0) translateY(-8px); }
  .nav-group:last-child.open .nav-dropdown,
  .nav-group:last-child:hover .nav-dropdown { transform: translateX(0) translateY(0); }

  .nav-dropdown-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
  }
  .nav-dropdown-item:hover { background: rgba(225,6,0,0.06); transform: translateX(3px); }
  .nav-dropdown-item.active { background: rgba(225,6,0,0.1); border-left: 2px solid #e10600; padding-left: 10px; }
  .nav-dropdown-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
  .nav-dropdown-title {
    font-family: 'Exo 2', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 2px;
  }
  .nav-dropdown-item.active .nav-dropdown-title { color: #e10600; }
  .nav-dropdown-desc { font-size: 11px; color: var(--text3); line-height: 1.4; }
  .nav-btn {
    padding: clamp(5px, 1.5vw, 8px) clamp(8px, 2vw, 14px);
    background: transparent;
    border: 1px solid var(--border2);
    color: var(--text3);
    font-family: 'Exo 2', sans-serif;
    font-size: clamp(9px, 2vw, 12px);
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    border-radius: 4px;
    white-space: nowrap;
  }
  .nav-btn:hover { border-color: #e10600; color: var(--text); box-shadow: 0 0 10px rgba(225,6,0,0.15); }
  .nav-btn.active { background: #e10600; border-color: #e10600; color: #fff; box-shadow: 0 0 20px rgba(225,6,0,0.3); }
  .theme-toggle {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 18px;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    flex-shrink: 0;
  }
  .theme-toggle:hover { transform: scale(1.3) rotate(15deg); }

  /* ── Global search bar ── */
  .global-search-bar {
    padding: 10px clamp(12px,4vw,20px);
    background: rgba(10,10,18,0.6);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: center;
  }
  .light-mode .global-search-bar { background: rgba(248,248,255,0.7); }

  .main {
    padding: clamp(16px, 4vw, 40px) clamp(12px, 4vw, 20px);
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  }

  /* ── Section entrance animation ── */
  @keyframes sectionIn {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .section-enter {
    animation: sectionIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  /* ── Staggered card animation ── */
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(20px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  .card-grid > *, .circuit-grid > *, .records-grid > *, .news-grid > * {
    animation: cardIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  .card-grid > *:nth-child(1), .circuit-grid > *:nth-child(1), .records-grid > *:nth-child(1), .news-grid > *:nth-child(1) { animation-delay: 0.05s; }
  .card-grid > *:nth-child(2), .circuit-grid > *:nth-child(2), .records-grid > *:nth-child(2), .news-grid > *:nth-child(2) { animation-delay: 0.10s; }
  .card-grid > *:nth-child(3), .circuit-grid > *:nth-child(3), .records-grid > *:nth-child(3), .news-grid > *:nth-child(3) { animation-delay: 0.15s; }
  .card-grid > *:nth-child(4), .circuit-grid > *:nth-child(4), .records-grid > *:nth-child(4), .news-grid > *:nth-child(4) { animation-delay: 0.20s; }
  .card-grid > *:nth-child(n+5), .circuit-grid > *:nth-child(n+5), .records-grid > *:nth-child(n+5), .news-grid > *:nth-child(n+5) { animation-delay: 0.25s; }

  .section-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(16px, 4vw, 32px);
    font-weight: 900;
    color: var(--text);
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 8px;
  }
  .section-title span {
    color: #e10600;
    text-shadow: 0 0 20px rgba(225,6,0,0.3);
  }
  .section-line {
    height: 2px;
    background: linear-gradient(90deg, #e10600, rgba(225,6,0,0.3), transparent);
    margin-bottom: 24px;
    box-shadow: 0 0 10px rgba(225,6,0,0.2);
  }

  .year-toggle { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
  .year-btn {
    padding: 8px 20px;
    background: transparent;
    border: 1px solid var(--border2);
    color: var(--text3);
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.25s;
    border-radius: 6px;
  }
  .year-btn:hover { border-color: #e10600; color: var(--text); box-shadow: 0 0 12px rgba(225,6,0,0.15); }
  .year-btn.active { background: #e10600; border-color: #e10600; color: #fff; box-shadow: 0 0 20px rgba(225,6,0,0.35); }
  .new-badge {
    display: inline-block;
    padding: 2px 7px;
    background: rgba(0,220,120,0.12);
    border: 1px solid rgba(0,220,120,0.35);
    color: #00dc78;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1px;
    border-radius: 20px;
    margin-left: 6px;
    vertical-align: middle;
    text-transform: uppercase;
    box-shadow: 0 0 8px rgba(0,220,120,0.15);
  }

  /* ── Glass card ── */
  .card {
    background: var(--card-bg);
    border: 1px solid var(--glass-border);
    border-radius: 10px;
    padding: 18px;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: var(--shadow);
    backdrop-filter: blur(12px);
  }
  .card:hover { border-color: rgba(225,6,0,0.3); box-shadow: var(--shadow-hover); transform: translateY(-2px); }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 290px), 1fr));
    gap: 16px;
  }

  .how-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
    gap: 14px;
    margin-bottom: 24px;
  }
  .how-card {
    background: var(--card-bg);
    border: 1px solid var(--glass-border);
    border-left: 3px solid #e10600;
    padding: 18px;
    border-radius: 8px;
    box-shadow: var(--shadow);
    backdrop-filter: blur(12px);
    transition: all 0.3s;
  }
  .how-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-hover); border-left-color: #ff3020; }
  .how-card h3 {
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    color: #e10600;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 8px;
    text-shadow: 0 0 10px rgba(225,6,0,0.25);
  }
  .how-card p { font-size: 13px; color: var(--text2); line-height: 1.7; }

  /* ── Quiz ── */
  .quiz-option {
    width: 100%; text-align: left; padding: 13px 16px;
    background: var(--card-bg); border: 1px solid var(--glass-border);
    color: var(--text); font-family: 'Exo 2', sans-serif; font-size: 13px;
    cursor: pointer; border-radius: 8px; transition: all 0.2s; margin-bottom: 8px;
    display: flex; align-items: center; gap: 10px;
    backdrop-filter: blur(8px); box-shadow: var(--shadow);
  }
  .quiz-option:hover:not(:disabled) { border-color: rgba(225,6,0,0.4); background: rgba(225,6,0,0.04); transform: translateX(4px); }
  .quiz-option.correct { background: rgba(0,220,120,0.08); border-color: #00dc78; color: #00dc78; box-shadow: 0 0 20px rgba(0,220,120,0.1); }
  .quiz-option.wrong { background: rgba(225,6,0,0.08); border-color: #e10600; color: #e10600; box-shadow: 0 0 20px rgba(225,6,0,0.1); }
  .quiz-option:disabled { cursor: default; }
  .quiz-progress { height: 3px; background: var(--border); border-radius: 2px; margin-bottom: 24px; overflow: hidden; }
  .quiz-progress-fill { height: 100%; background: linear-gradient(90deg, #e10600, #ff6040); border-radius: 2px; transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1); box-shadow: 0 0 8px rgba(225,6,0,0.4); }

  /* ── Predictor ── */
  .predictor-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  @media (max-width: 600px) { .predictor-grid { grid-template-columns: 1fr; } }
  .predictor-driver-btn {
    display: flex; align-items: center; gap: 10px; width: 100%;
    padding: 9px 12px; background: var(--card-bg); border: 1px solid var(--glass-border);
    color: var(--text); font-family: 'Exo 2', sans-serif; font-size: 12px;
    cursor: pointer; border-radius: 6px; transition: all 0.2s; text-align: left;
    backdrop-filter: blur(8px);
  }
  .predictor-driver-btn:hover:not(:disabled) { border-color: rgba(225,6,0,0.35); transform: translateX(3px); }
  .predictor-driver-btn.selected { opacity: 0.35; cursor: not-allowed; }
  .predictor-slot {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 12px; background: var(--card-bg); border: 1px solid var(--glass-border);
    border-radius: 6px; margin-bottom: 6px; min-height: 42px;
    backdrop-filter: blur(8px); transition: all 0.2s;
  }
  .predictor-slot:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
  .predictor-slot-num { font-family: 'Orbitron', sans-serif; font-size: 10px; color: #e10600; font-weight: 700; min-width: 20px; text-shadow: 0 0 8px rgba(225,6,0,0.3); }

  /* ── News ── */
  .news-card {
    background: var(--card-bg); border: 1px solid var(--glass-border);
    border-radius: 10px; padding: 16px; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: pointer; text-decoration: none; display: block;
    backdrop-filter: blur(12px); box-shadow: var(--shadow);
  }
  .news-card:hover { border-color: rgba(225,6,0,0.35); transform: translateY(-4px); box-shadow: var(--shadow-hover); }
  .news-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%,340px),1fr)); gap: 16px; }
  .news-source { font-family: 'Orbitron', sans-serif; font-size: 9px; color: #e10600; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px; text-shadow: 0 0 8px rgba(225,6,0,0.25); }
  .news-title { font-size: 14px; font-weight: 700; color: var(--text); line-height: 1.4; margin-bottom: 8px; }
  .news-date { font-size: 11px; color: var(--text3); }
  .news-img { width: 100%; height: 160px; object-fit: cover; border-radius: 6px; margin-bottom: 12px; background: var(--bg3); }

  /* ── Session Times ── */
  .session-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%,180px),1fr)); gap: 10px; margin-bottom: 20px; }
  .session-card {
    background: var(--card-bg); border: 1px solid var(--glass-border);
    border-radius: 8px; padding: 14px; text-align: center;
    backdrop-filter: blur(10px); box-shadow: var(--shadow);
    transition: all 0.25s;
  }
  .session-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-hover); }
  .session-type { font-family: 'Orbitron', sans-serif; font-size: 9px; color: #e10600; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px; }
  .session-time { font-family: 'Orbitron', sans-serif; font-size: 16px; font-weight: 700; color: var(--text); }
  .session-date { font-size: 11px; color: var(--text3); margin-top: 4px; }

  /* ── Points Graph ── */
  .graph-wrap { overflow-x: auto; margin-bottom: 24px; }
  .graph-bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .graph-bar-name { font-size: 12px; color: var(--text2); min-width: 130px; text-align: right; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .graph-bar-track { flex: 1; height: 22px; background: var(--bg3); border-radius: 4px; overflow: hidden; position: relative; min-width: 0; }
  .graph-bar-fill { height: 100%; border-radius: 4px; transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1); display: flex; align-items: center; justify-content: flex-end; padding-right: 8px; box-shadow: 0 0 8px currentColor; }
  .graph-bar-val { font-family: 'Orbitron', sans-serif; font-size: 9px; font-weight: 700; color: #fff; white-space: nowrap; }

  /* ── Pos badges ── */
  .points-table td { padding: 8px 12px; border-bottom: 1px solid var(--border); color: var(--text2); }
  .points-table tr:nth-child(even) td { background: var(--card-bg); }
  .points-table tr:hover td { background: var(--bg3); }
  .pos-badge {
    display: inline-flex; align-items: center; justify-content: center;
    width: 28px; height: 28px;
    background: var(--bg3); border: 1px solid var(--border2);
    border-radius: 50%; font-weight: 700; color: var(--text); font-size: 11px;
    transition: all 0.2s;
  }
  .pos-badge.p1 { background: #e10600; border-color: #e10600; color: #fff; box-shadow: 0 0 12px rgba(225,6,0,0.4); }
  .pos-badge.p2 { background: #c0c0c0; border-color: #c0c0c0; color: #000; }
  .pos-badge.p3 { background: #cd7f32; border-color: #cd7f32; color: #fff; }

  /* ── Driver card ── */
  .driver-card {
    background: var(--card-bg);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: var(--shadow);
    backdrop-filter: blur(14px);
    transform-style: preserve-3d;
    will-change: transform;
  }
  .driver-card:hover {
    border-color: rgba(225,6,0,0.35);
    box-shadow: var(--shadow-hover);
  }
  .driver-header {
    padding: 14px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid var(--border);
    background: linear-gradient(135deg, rgba(225,6,0,0.04), transparent);
  }
  .driver-number {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(22px, 4vw, 32px);
    font-weight: 900;
    color: #e10600;
    min-width: 42px;
    line-height: 1;
    flex-shrink: 0;
    text-shadow: 0 0 20px rgba(225,6,0,0.4);
  }
  .driver-info { flex: 1; min-width: 0; }
  .driver-name {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(10px, 2.2vw, 13px);
    font-weight: 700;
    color: var(--text);
    text-transform: uppercase;
    letter-spacing: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .driver-country { font-size: 11px; color: var(--text3); margin-top: 2px; }
  .driver-team-badge {
    flex-shrink: 0;
    padding: 4px 8px;
    border-radius: 20px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .driver-body { padding: 14px; }
  .driver-stat-row { display: flex; gap: 8px; margin-bottom: 12px; }
  .driver-stat {
    text-align: center;
    background: var(--bg3);
    border: 1px solid var(--border);
    padding: 8px 6px;
    border-radius: 8px;
    flex: 1;
    transition: all 0.2s;
  }
  .driver-stat:hover { border-color: rgba(225,6,0,0.3); background: rgba(225,6,0,0.04); }
  .driver-stat-val {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(13px, 2.5vw, 18px);
    font-weight: 700;
    color: #e10600;
    text-shadow: 0 0 12px rgba(225,6,0,0.3);
  }
  .driver-stat-lbl { font-size: 9px; color: var(--text3); letter-spacing: 1px; text-transform: uppercase; margin-top: 2px; }
  .driver-desc { font-size: 12px; color: var(--text2); line-height: 1.7; margin-bottom: 10px; }
  .driver-media { font-size: 12px; color: var(--text3); font-style: italic; border-left: 2px solid #e10600; padding-left: 10px; margin-top: 8px; box-shadow: -2px 0 8px rgba(225,6,0,0.1); }

  /* ── Animated rating bars ── */
  .rating-bar-wrap { margin: 6px 0; }
  .rating-label { display: flex; justify-content: space-between; font-size: 10px; color: var(--text3); margin-bottom: 4px; }
  .rating-bar { height: 4px; background: var(--border); border-radius: 4px; overflow: hidden; }
  @keyframes barSlide {
    from { width: 0; }
    to { width: var(--bar-w); }
  }
  .rating-fill {
    height: 100%;
    border-radius: 4px;
    background: linear-gradient(90deg, #e10600, #ff6040);
    box-shadow: 0 0 8px rgba(225,6,0,0.4);
    width: var(--bar-w);
    animation: barSlide 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  /* ── Team card ── */
  .team-card {
    background: var(--card-bg);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: var(--shadow);
    backdrop-filter: blur(14px);
  }
  .team-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-hover); }
  .team-header {
    padding: 16px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 12px;
    background: linear-gradient(135deg, rgba(255,255,255,0.02), transparent);
  }
  .team-color-block { width: 5px; height: 52px; border-radius: 4px; flex-shrink: 0; box-shadow: 0 0 12px currentColor; }
  .team-name {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(10px, 2.2vw, 14px);
    font-weight: 700;
    color: var(--text);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .team-base { font-size: 11px; color: var(--text3); margin-top: 3px; }
  .team-body { padding: 14px; }

  /* ── How-grid etc ── */
  .points-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: start;
  }
  .points-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .points-table th {
    background: #e10600; color: #fff;
    padding: 9px 12px; text-align: left;
    font-family: 'Orbitron', sans-serif;
    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  }
  .points-table td { padding: 8px 12px; border-bottom: 1px solid var(--border); color: var(--text2); }
  .points-table tr:nth-child(even) td { background: var(--card-bg); }
  .points-table tr:hover td { background: var(--bg3); }

  .search-wrap { margin-bottom: 14px; position: relative; }
  .search-input {
    width: 100%;
    background: var(--card-bg);
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    padding: 11px 14px 11px 38px;
    color: var(--text);
    font-family: 'Exo 2', sans-serif;
    font-size: 14px;
    outline: none;
    transition: all 0.25s;
    backdrop-filter: blur(8px);
    box-shadow: var(--shadow);
  }
  .search-input:focus { border-color: rgba(225,6,0,0.4); box-shadow: 0 0 0 3px rgba(225,6,0,0.08), var(--shadow); }
  .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text3); font-size: 13px; }

  .filter-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
  .filter-pill {
    padding: 5px 12px;
    background: var(--card-bg);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    color: var(--text3);
    font-size: 10px;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Exo 2', sans-serif;
    backdrop-filter: blur(8px);
  }
  .filter-pill:hover { border-color: rgba(225,6,0,0.4); color: var(--text); transform: translateY(-1px); }
  .filter-pill.active { background: #e10600; border-color: #e10600; color: #fff; box-shadow: 0 0 16px rgba(225,6,0,0.35); }

  .expand-btn {
    background: transparent;
    border: 1px solid var(--border2);
    color: var(--text3);
    padding: 6px 12px;
    font-size: 10px;
    cursor: pointer;
    font-family: 'Exo 2', sans-serif;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-top: 10px;
    transition: all 0.2s;
    border-radius: 20px;
  }
  .expand-btn:hover { border-color: #e10600; color: #e10600; box-shadow: 0 0 10px rgba(225,6,0,0.15); }

  .champ-table { width: 100%; border-collapse: collapse; }
  .champ-table th { background: var(--bg3); color: #e10600; padding: 8px 10px; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; text-align: left; font-family: 'Orbitron', sans-serif; }
  .champ-table td { padding: 8px 10px; border-bottom: 1px solid var(--border); font-size: 12px; color: var(--text2); }
  .champ-table tr:hover td { background: var(--card-bg); }
  .gold { color: #ffd700; font-weight: 700; text-shadow: 0 0 8px rgba(255,215,0,0.3); }
  .silver { color: #c0c0c0; }

  .timeline { position: relative; padding-left: 26px; }
  .timeline::before {
    content: ''; position: absolute;
    left: 8px; top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #e10600, transparent);
    box-shadow: 0 0 6px rgba(225,6,0,0.3);
  }
  .timeline-item { position: relative; margin-bottom: 28px; }
  .timeline-dot {
    position: absolute; left: -21px; top: 4px;
    width: 10px; height: 10px;
    background: #e10600; border-radius: 50%;
    border: 2px solid var(--bg);
    box-shadow: 0 0 8px rgba(225,6,0,0.5);
  }
  .timeline-year { font-family: 'Orbitron', sans-serif; font-size: 12px; color: #e10600; font-weight: 700; letter-spacing: 2px; margin-bottom: 5px; text-shadow: 0 0 10px rgba(225,6,0,0.3); }
  .timeline-content { font-size: 13px; color: var(--text2); line-height: 1.7; }
  .timeline-change {
    background: var(--card-bg); border: 1px solid var(--glass-border);
    border-left: 3px solid #e10600;
    padding: 12px 14px; margin-top: 8px;
    border-radius: 0 8px 8px 0; font-size: 12px; color: var(--text2);
    backdrop-filter: blur(8px); box-shadow: var(--shadow);
    transition: all 0.2s;
  }
  .timeline-change:hover { transform: translateX(4px); box-shadow: var(--shadow-hover); }
  .change-tag {
    display: inline-block; padding: 2px 8px; border-radius: 20px;
    font-size: 9px; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; margin-right: 4px; margin-bottom: 4px;
  }
  .tag-in { background: rgba(0,200,100,0.12); color: #00c864; border: 1px solid rgba(0,200,100,0.25); }
  .tag-out { background: rgba(225,6,0,0.12); color: #e10600; border: 1px solid rgba(225,6,0,0.25); }
  .tag-reason { background: rgba(255,200,0,0.08); color: #ffc800; border: 1px solid rgba(255,200,0,0.18); }

  .glossary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
    gap: 10px;
  }
  .glossary-card {
    background: var(--card-bg);
    border: 1px solid var(--glass-border);
    border-left: 3px solid #e10600;
    border-radius: 8px;
    padding: 14px 16px;
    cursor: pointer;
    transition: all 0.25s;
    backdrop-filter: blur(10px);
    box-shadow: var(--shadow);
  }
  .glossary-card:hover { background: rgba(225,6,0,0.04); border-color: rgba(225,6,0,0.35); transform: translateX(4px); box-shadow: var(--shadow-hover); }
  .glossary-term {
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: #e10600;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-shadow: 0 0 8px rgba(225,6,0,0.2);
  }
  .glossary-def { font-size: 12px; color: var(--text3); line-height: 1.7; }
  .glossary-cat {
    display: inline-block;
    padding: 1px 8px;
    border-radius: 20px;
    font-size: 8px;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-family: 'Orbitron', sans-serif;
    margin-left: 6px;
  }

  .rule-card {
    background: var(--card-bg);
    border: 1px solid var(--glass-border);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 10px;
    transition: all 0.25s;
    backdrop-filter: blur(12px);
    box-shadow: var(--shadow);
  }
  .rule-card:hover { border-color: rgba(225,6,0,0.25); box-shadow: var(--shadow-hover); }
  .rule-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 18px;
    cursor: pointer;
    user-select: none;
  }
  .rule-icon { font-size: 20px; flex-shrink: 0; }
  .rule-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: var(--text);
    letter-spacing: 1px;
    text-transform: uppercase;
    flex: 1;
  }
  .rule-chevron { color: var(--text3); font-size: 12px; transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }
  .rule-chevron.open { transform: rotate(180deg); color: #e10600; }
  .rule-body { padding: 0 18px 16px; border-top: 1px solid var(--border); }
  .rule-plain { font-size: 13px; color: var(--text2); line-height: 1.8; margin-top: 12px; }
  .rule-example {
    margin-top: 10px;
    padding: 12px 14px;
    background: rgba(225,6,0,0.04);
    border-left: 3px solid #e10600;
    font-size: 12px;
    color: var(--text3);
    line-height: 1.7;
    border-radius: 0 6px 6px 0;
    box-shadow: -3px 0 10px rgba(225,6,0,0.1);
  }

  .compare-table { width: 100%; border-collapse: collapse; }
  .compare-table th {
    padding: 10px 14px;
    font-family: 'Orbitron', sans-serif;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-align: left;
  }
  .compare-table td { padding: 12px 14px; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text2); vertical-align: top; }
  .compare-table tr:hover td { background: rgba(225,6,0,0.02); }
  .compare-aspect { font-weight: 700; color: var(--text3); font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-family: 'Orbitron', sans-serif; }
  .compare-winner { color: #00dc78; font-weight: 700; text-shadow: 0 0 8px rgba(0,220,120,0.3); }
  .compare-badge {
    display: inline-block; padding: 2px 8px; border-radius: 20px;
    font-size: 9px; font-weight: 700; letter-spacing: 1px; font-family: 'Orbitron', sans-serif;
    text-transform: uppercase; margin-bottom: 3px;
  }

  .records-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
    gap: 16px;
  }
  .record-card {
    background: var(--card-bg);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--shadow);
    backdrop-filter: blur(12px);
    transition: all 0.3s;
  }
  .record-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); border-color: rgba(225,6,0,0.25); }
  .record-header {
    background: linear-gradient(135deg, var(--bg3), var(--card-bg));
    padding: 14px 16px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .record-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: var(--text);
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .record-icon { font-size: 22px; }
  .record-body { padding: 12px 16px; }
  .record-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid var(--border);
    transition: all 0.15s;
  }
  .record-row:last-child { border-bottom: none; }
  .record-row:hover { padding-left: 4px; }
  .record-rank { font-size: 16px; min-width: 26px; }
  .record-driver-name { font-size: 13px; font-weight: 600; color: var(--text); }
  .record-value { font-family: 'Orbitron', sans-serif; font-size: 13px; font-weight: 700; color: #e10600; margin-left: auto; text-shadow: 0 0 8px rgba(225,6,0,0.25); }

  .team-row { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 4px; }
  .team-pill {
    padding: 3px 8px;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 20px;
    font-size: 11px;
    color: var(--text2);
  }
  .team-detail { font-size: 12px; color: var(--text3); line-height: 1.7; }

  @media (max-width: 600px) {
    .points-wrap { grid-template-columns: 1fr; }
    .filter-pill { font-size: 9px; padding: 4px 9px; }
  }
`;

const TEAMS_2025 = [
  { id: "redbull", name: "Oracle Red Bull Racing", base: "Milton Keynes, UK", color: "#3671C6", engine: "Honda RBPT", tp: "Christian Horner", founded: 2005, championships: "6 Constructors", drivers: ["Max Verstappen", "Liam Lawson"], desc: "Still the benchmark, built around Verstappen. Lawson replaces Perez for 2025 after Checo's poor end to 2024. The Horner controversies continue but results keep coming. Honda RBPT remains one of the best power units on the grid.", engineNote: "Honda RBPT – Honda's works-level unit built exclusively for Red Bull. Returned in 2019 and together they've dominated since 2022." },
  { id: "mercedes", name: "Mercedes-AMG Petronas", base: "Brackley, UK", color: "#27F4D2", engine: "Mercedes", tp: "Toto Wolff", founded: 2010, championships: "8 Constructors (2014–2021)", drivers: ["George Russell", "Kimi Antonelli"], desc: "The post-Hamilton era begins. 18-year-old Andrea Kimi Antonelli steps up from F2 — one of the youngest Mercedes debutants ever. Russell leads. Wolff is rebuilding for a new generation and the 2026 regulations.", engineNote: "Mercedes PU — Supplies McLaren, Williams and Aston Martin as customer teams. Expected to be strong for 2026." },
  { id: "ferrari", name: "Scuderia Ferrari", base: "Maranello, Italy", color: "#E8002D", engine: "Ferrari", tp: "Frédéric Vasseur", founded: 1950, championships: "16 Constructors (last: 2008)", drivers: ["Charles Leclerc", "Lewis Hamilton"], desc: "THE story of 2025. Hamilton joins Ferrari — the most iconic pairing in years. Leclerc is the established lead but Hamilton demands equal treatment. Vasseur has to manage two world champions. The Tifosi are electric.", engineNote: "Ferrari power unit — Works engine. Also supplied to Haas. Sauber drops Ferrari for Audi from 2026." },
  { id: "mclaren", name: "McLaren F1 Team", base: "Woking, UK", color: "#FF8000", engine: "Mercedes", tp: "Andrea Stella", founded: 1966, championships: "8 Constructors (last: 1998)", drivers: ["Lando Norris", "Oscar Piastri"], desc: "The hungriest team on the grid. Norris pushed Verstappen hard in 2024, Piastri won races too. McLaren enter 2025 as genuine title favourites. Stella is quietly one of the best team principals in the paddock.", engineNote: "Mercedes-supplied — Switched from Renault in 2021. This switch coincided directly with their resurgence to the front." },
  { id: "astonmartin", name: "Aston Martin Aramco", base: "Silverstone, UK", color: "#229971", engine: "Mercedes", tp: "Andy Cowell", founded: 2021, championships: "0", drivers: ["Fernando Alonso", "Lance Stroll"], desc: "Mike Krack replaced by Andy Cowell (ex-Mercedes HPP engine boss) — a massive appointment. Alonso stays, still hunting at 43. 2023 pace hasn't fully returned but the ambition with their new factory is enormous.", engineNote: "Mercedes-supplied customer team." },
  { id: "alpine", name: "BWT Alpine F1 Team", base: "Enstone, UK", color: "#0093CC", engine: "Renault (Alpine)", tp: "Oliver Oakes", founded: 2021, championships: "0", drivers: ["Pierre Gasly", "Jack Doohan"], desc: "Ocon exits, Australian rookie Jack Doohan joins. Alpine are in deep transition — the Renault engine is the weakest on the grid and switching to Mercedes from 2026. Gasly is the experienced anchor in a rebuild year.", engineNote: "Renault/Alpine — Sole works Renault unit. Consistently least powerful engine on the grid. Switching to Mercedes for 2026." },
  { id: "williams", name: "Williams Racing", base: "Grove, UK", color: "#64C4FF", engine: "Mercedes", tp: "James Vowles", founded: 1977, championships: "9 Constructors (last: 1997)", drivers: ["Alexander Albon", "Carlos Sainz"], desc: "Massive signing — Sainz joins Albon after being dropped by Ferrari. One of the most experienced midfield pairings on the grid. Vowles is doing an excellent rebuild. If the car takes a step forward, Williams could be surprise packages.", engineNote: "Mercedes-supplied — using Mercedes engines since 2014." },
  { id: "haas", name: "MoneyGram Haas F1 Team", base: "Kannapolis, USA", color: "#B6BABD", engine: "Ferrari", tp: "Ayao Komatsu", founded: 2016, championships: "0", drivers: ["Esteban Ocon", "Oliver Bearman"], desc: "Ocon arrives from Alpine. British teen Oliver Bearman gets his full-time seat after stunning stand-in appearances in 2024. Young, punchy lineup. Komatsu continuing the rebuild after Steiner's departure.", engineNote: "Ferrari-supplied — Full customer of Ferrari's power unit and many technical components." },
  { id: "rb", name: "Visa Cash App RB (VCARB)", base: "Faenza, Italy", color: "#6692FF", engine: "Honda RBPT", tp: "Laurent Mekies", founded: 2006, championships: "0", drivers: ["Yuki Tsunoda", "Isack Hadjar"], desc: "Ricciardo is out, Lawson promoted to Red Bull. French-Algerian rookie Isack Hadjar joins Tsunoda. Red Bull's traditional proving ground. Tsunoda finally gets recognition as the clear team leader after being overlooked for the senior seat.", engineNote: "Honda RBPT — Same power unit as Red Bull Racing." },
  { id: "sauber", name: "Stake F1 Kick Sauber", base: "Hinwil, Switzerland", color: "#52E252", engine: "Ferrari", tp: "Mattia Binotto", founded: 1993, championships: "0", drivers: ["Nico Hülkenberg", "Gabriel Bortoleto"], desc: "Full reset. Bottas and Zhou out. Hülkenberg leads alongside Brazilian rookie Bortoleto. Critically, ex-Ferrari TP Mattia Binotto takes over to prepare for the Audi era from 2026. A team in serious transformation.", engineNote: "Ferrari-supplied (final year 2025) — Switching to Audi's brand new F1 power unit in 2026." },
];

const TEAMS_2026 = [
  { id: "redbull", name: "Oracle Red Bull Racing", base: "Milton Keynes, UK", color: "#3671C6", engine: "Ford RBPT (NEW)", tp: "Laurent Mekies", founded: 2005, championships: "6 Constructors", drivers: ["Max Verstappen", "Isack Hadjar"], desc: "Red Bull parts ways with Honda and moves to a Ford partnership for 2026. The RBPT unit carries Ford branding. Verstappen stays on his mega contract. Hadjar earns his promotion after impressing at Racing Bulls — the seat Tsunoda was overlooked for.", engineNote: "Ford RBPT — Red Bull Powertrains builds the unit in-house with Ford as commercial partner. 2026 has entirely new engine regs (550kw, ~50% electrical power)." },
  { id: "mercedes", name: "Mercedes-AMG Petronas", base: "Brackley, UK", color: "#27F4D2", engine: "Mercedes (new regs)", tp: "Toto Wolff", founded: 2010, championships: "8 Constructors (2014–2021)", drivers: ["George Russell", "Kimi Antonelli"], desc: "Mercedes dominated the last major regulation change in 2014. Wolff is hoping history repeats in 2026. Russell and the rapidly-developing Antonelli carry their hopes into a new era.", engineNote: "Mercedes 2026 PU — Completely redesigned. ~50% electric power requirement. Mercedes expected to be very strong." },
  { id: "ferrari", name: "Scuderia Ferrari", base: "Maranello, Italy", color: "#E8002D", engine: "Ferrari (new regs)", tp: "Frédéric Vasseur", founded: 1950, championships: "16 Constructors (last: 2008)", drivers: ["Charles Leclerc", "Lewis Hamilton"], desc: "Hamilton and Leclerc continue into the new era. Ferrari's Maranello factory has invested massively in the 2026 power unit. The dream: Hamilton finally wins his 8th title in red.", engineNote: "Ferrari 2026 PU — Redesigned from ground up. Also supplied to Haas. Sauber switches to Audi." },
  { id: "mclaren", name: "McLaren F1 Team", base: "Woking, UK", color: "#FF8000", engine: "Mercedes (new regs)", tp: "Andrea Stella", founded: 1966, championships: "8 Constructors (last: 1998)", drivers: ["Lando Norris", "Oscar Piastri"], desc: "McLaren enter 2026 as title favourites. Their chassis expertise plus Mercedes' expected strong 2026 unit makes them dangerous. Norris and Piastri continue — the best young pairing in F1.", engineNote: "Mercedes-supplied 2026 unit." },
  { id: "astonmartin", name: "Aston Martin Aramco", base: "Silverstone, UK", color: "#229971", engine: "Honda (works)", tp: "Andy Cowell", founded: 2021, championships: "0", drivers: ["Fernando Alonso", "Lance Stroll"], desc: "A huge twist — Aston Martin signed a works deal with Honda for 2026 after Mercedes ended their supply agreement. Andy Cowell (ex-Mercedes HPP) now runs a Honda-powered team. Alonso's last shot at glory with a works engine.", engineNote: "Honda works PU — Honda ended their Red Bull partnership and signed with Aston Martin as their exclusive works team from 2026. A major coup." },
  { id: "alpine", name: "Alpine F1 Team", base: "Enstone, UK", color: "#0093CC", engine: "Mercedes (new regs)", tp: "Oliver Oakes", founded: 2021, championships: "0", drivers: ["Pierre Gasly", "Franco Colapinto"], desc: "Alpine ditches their own Renault engine and becomes a Mercedes customer — effectively admitting the Renault unit wasn't good enough. Doohan was dropped mid-2025; Colapinto, who impressed at Williams in 2024, takes the seat. A huge strategic shift for the French manufacturer.", engineNote: "Switches to Mercedes power in 2026 — the biggest change in the team's history." },
  { id: "williams", name: "Williams Racing", base: "Grove, UK", color: "#64C4FF", engine: "Mercedes (new regs)", tp: "James Vowles", founded: 1977, championships: "9 Constructors (last: 1997)", drivers: ["Alexander Albon", "Carlos Sainz"], desc: "The regulation reset gives Williams a clean slate. If Mercedes hit the ground running in 2026, Williams could genuinely challenge the top teams. Vowles' rebuild enters its most exciting chapter yet.", engineNote: "Mercedes-supplied — continuing relationship into new regulations." },
  { id: "haas", name: "MoneyGram Haas F1 Team", base: "Kannapolis, USA", color: "#B6BABD", engine: "Ferrari (new regs)", tp: "Ayao Komatsu", founded: 2016, championships: "0", drivers: ["Esteban Ocon", "Oliver Bearman"], desc: "Continue as Ferrari customers into 2026. Bearman is Ferrari-backed — keeping the pipeline intact. New regulations give everyone a chance to surprise.", engineNote: "Ferrari-supplied 2026 unit." },
  { id: "rb", name: "Racing Bulls (VCARB)", base: "Faenza, Italy", color: "#6692FF", engine: "Ford RBPT (NEW)", tp: "Alan Permane", founded: 2006, championships: "0", drivers: ["Liam Lawson", "Arvid Lindblad"], desc: "Switches to the Ford RBPT unit alongside Red Bull. Lawson returns to Racing Bulls after his difficult stint at Red Bull, and leads the team alongside 18-year-old rookie Arvid Lindblad. Mekies' promotion to Red Bull brings Alan Permane in as new TP.", engineNote: "Ford RBPT — same new unit as Red Bull Racing." },
  { id: "audi", name: "Audi F1 Team (née Sauber)", base: "Hinwil, Switzerland", color: "#BB0A21", engine: "Audi (works, BRAND NEW)", tp: "Mattia Binotto", founded: 1993, championships: "0", drivers: ["Nico Hülkenberg", "Gabriel Bortoleto"], desc: "THE story of 2026. Audi officially becomes an F1 constructor — the first new works manufacturer in over a decade. The Sauber team is rebranded as Audi F1. Binotto leads. Expectations managed but excitement enormous.", engineNote: "Audi works PU — built from scratch for 2026 regulations. Audi have huge resources but zero F1 engine experience. Unknown quantity, enormous potential." },
  { id: "cadillac", name: "Cadillac F1 Team", base: "Fishers, Indiana, USA / Silverstone, UK", color: "#CC0000", engine: "Ferrari (→ GM/Cadillac 2029)", tp: "Graeme Lowdon", founded: 2026, championships: "0", drivers: ["Valtteri Bottas", "Sergio Perez"], desc: "The American dream arrives. F1's 11th team — the first brand new constructor since Haas in 2016. Backed by General Motors and TWG Motorsports. Both drivers sat out 2025: Bottas after leaving Sauber, Perez after Red Bull. Combined experience of 500+ grands prix. Realistic goal for 2026 is simply reliability and staying inside the 107% rule. Zhou Guanyu is reserve driver, Colton Herta is test driver while racing in F2.", engineNote: "Ferrari-supplied until 2029, when GM begins manufacturing their own F1 power unit in Charlotte, North Carolina. Cadillac will then become a full works manufacturer — a huge long-term commitment from General Motors." },
];

const DRIVERS_2025 = [
  { id: "max", number: 1, name: "Max Verstappen", country: "🇳🇱 Netherlands", team: "Red Bull Racing", teamColor: "#3671C6", championships: 4, wins: "62+", poles: "42+", skill: 99, racecraft: 99, consistency: 97, media: 75, desc: "Four-time world champion. The benchmark of the current era. Even with McLaren pushing hard in 2024, Verstappen willed Red Bull to a fourth title. Blunt, no-nonsense, not interested in the celebrity side of F1.", mediaNote: "Polarising — dominant and direct. Purists' champion. Not a social media personality.", seasons: "2015–present" },
  { id: "hamilton", number: 44, name: "Lewis Hamilton", country: "🇬🇧 United Kingdom", team: "Ferrari", teamColor: "#E8002D", championships: 7, wins: "103", poles: "104", skill: 97, racecraft: 96, consistency: 95, media: 99, desc: "Most decorated driver in history joins Ferrari in 2025. Seeking an unprecedented 8th championship. Cultural icon beyond sport — fashion, music, activism. His presence electrifies Ferrari and the whole paddock.", mediaNote: "Global superstar. Fashion, music, activism. The most recognisable face in motorsport.", seasons: "2007–present" },
  { id: "leclerc", number: 16, name: "Charles Leclerc", country: "🇲🇨 Monaco", team: "Ferrari", teamColor: "#E8002D", championships: 0, wins: "8", poles: "24+", skill: 95, racecraft: 90, consistency: 86, media: 90, desc: "Ferrari's established lead driver now shares the spotlight with Hamilton. The fascinating intra-team dynamic will define 2025. Blindingly fast in qualifying — possibly the best single lap on the grid.", mediaNote: "Hugely popular — genuine, funny, plays piano, very fan-connected.", seasons: "2018–present" },
  { id: "norris", number: 4, name: "Lando Norris", country: "🇬🇧 United Kingdom", team: "McLaren", teamColor: "#FF8000", championships: 0, wins: "6+", poles: "8+", skill: 93, racecraft: 92, consistency: 90, media: 97, desc: "McLaren's title hope. Pushed Verstappen to the limit in 2024 and enters 2025 as a genuine favourite. Hilarious off-track, devastating on it. The most beloved driver by the new generation of fans.", mediaNote: "Social media king. Gaming streams, memes, every young fan's favourite.", seasons: "2019–present" },
  { id: "piastri", number: 81, name: "Oscar Piastri", country: "🇦🇺 Australia", team: "McLaren", teamColor: "#FF8000", championships: 0, wins: "4+", poles: "4+", skill: 92, racecraft: 90, consistency: 91, media: 73, desc: "Quiet, cold, devastatingly fast. Won grand prix in just his second season. The most mature young driver since Verstappen. McLaren have two legitimate title threats — a dream situation.", mediaNote: "Understated dry humour. Lets the driving do the talking.", seasons: "2023–present" },
  { id: "russell", number: 63, name: "George Russell", country: "🇬🇧 United Kingdom", team: "Mercedes", teamColor: "#27F4D2", championships: 0, wins: "3+", poles: "5+", skill: 91, racecraft: 88, consistency: 92, media: 82, desc: "'Mr Saturday' for his qualifying brilliance. Now leads Mercedes in the post-Hamilton era. Polished, professional, GPDA director. 2025 is his real chance to step out of Hamilton's shadow permanently.", mediaNote: "Professional, diplomatic. Deeply respected across the paddock.", seasons: "2019–present" },
  { id: "antonelli", number: 12, name: "Kimi Antonelli", country: "🇮🇹 Italy", team: "Mercedes", teamColor: "#27F4D2", championships: 0, wins: "0", poles: "0", skill: 84, racecraft: 82, consistency: 80, media: 78, desc: "18-year-old Italian prodigy. Mercedes' chosen one. Crashed on his FP1 debut in 2024 but the speed is undeniable. Carries enormous expectations as a potential next Schumacher for Italian fans.", mediaNote: "Huge hype in Italy. Very young but handles pressure with maturity.", seasons: "2025–present" },
  { id: "alonso", number: 14, name: "Fernando Alonso", country: "🇪🇸 Spain", team: "Aston Martin", teamColor: "#229971", championships: 2, wins: "32", poles: "22", skill: 94, racecraft: 97, consistency: 92, media: 85, desc: "Still here at 43. Refuses to retire. Aston Martin hasn't matched 2023 pace but Alonso extracts the maximum every single weekend. A legend who is physically still one of the best on the grid.", mediaNote: "'El Plan.' Enigmatic social presence. The internet loves his longevity.", seasons: "2001–2018, 2021–present" },
  { id: "sainz", number: 55, name: "Carlos Sainz", country: "🇪🇸 Spain", team: "Williams", teamColor: "#64C4FF", championships: 0, wins: "4+", poles: "6+", skill: 90, racecraft: 89, consistency: 93, media: 86, desc: "Dropped by Ferrari despite a brilliant 2024 — one of the most shocking decisions in recent memory. Joined Williams to lead their revival. Too good to be in the midfield for long.", mediaNote: "Cool, popular. Motivated and hungry to prove Ferrari made a mistake.", seasons: "2015–present" },
  { id: "albon", number: 23, name: "Alexander Albon", country: "🇹🇭 Thailand", team: "Williams", teamColor: "#64C4FF", championships: 0, wins: "0", poles: "0", skill: 86, racecraft: 85, consistency: 87, media: 83, desc: "Maximises every result in a slower car. With Sainz alongside, Williams could be genuine points scorers. A comeback story everyone in the paddock respects.", mediaNote: "Genuine, great content creator. Huge Southeast Asian fanbase.", seasons: "2019–2020, 2022–present" },
  { id: "lawson", number: 30, name: "Liam Lawson", country: "🇳🇿 New Zealand", team: "Racing Bulls", teamColor: "#6692FF", championships: 0, wins: "0", poles: "0", skill: 85, racecraft: 84, consistency: 83, media: 70, desc: "A whirlwind 2025 — promoted to Red Bull but demoted after just 2 races. Returned to Racing Bulls alongside Hadjar for the rest of the year. For 2026 he stays at Racing Bulls as team leader alongside rookie Lindblad — a chance to rebuild and prove himself.", mediaNote: "Calm, grounded. New Zealand fans very proud. Still building his profile.", seasons: "2024–present" },
  { id: "tsunoda", number: 22, name: "Yuki Tsunoda", country: "🇯🇵 Japan", team: "dropped (2026)", teamColor: "#555566", championships: 0, wins: "0", poles: "0", skill: 84, racecraft: 83, consistency: 81, media: 82, desc: "Finally got his Red Bull call-up mid-2025 after Lawson was demoted, but couldn't hold onto the seat. Hadjar earned the promotion for 2026, leaving Tsunoda without a drive after five years in the Red Bull system. An emotional end to a long chapter.", mediaNote: "Viral radio moments, loved in Japan, strong internet following.", seasons: "2021–2025" },
  { id: "gasly", number: 10, name: "Pierre Gasly", country: "🇫🇷 France", team: "Alpine", teamColor: "#0093CC", championships: 0, wins: "1", poles: "1", skill: 85, racecraft: 83, consistency: 84, media: 80, desc: "Senior head at Alpine through their engine transition. His Monza 2020 win remains one of the most emotional moments in recent F1 memory. A rollercoaster career that keeps delivering.", mediaNote: "Popular in France. His Monza 2020 celebration is legendary.", seasons: "2017–present" },
  { id: "ocon", number: 31, name: "Esteban Ocon", country: "🇫🇷 France", team: "Haas", teamColor: "#B6BABD", championships: 0, wins: "1", poles: "0", skill: 83, racecraft: 80, consistency: 83, media: 72, desc: "Left Alpine for Haas. Fresh environment might unlock him. Solid operator who perhaps never found the perfect team. His 2021 Hungarian win showed what he can do.", mediaNote: "Lower media profile. The Alonso feud era was very entertaining for fans.", seasons: "2016–present" },
  { id: "bearman", number: 87, name: "Oliver Bearman", country: "🇬🇧 United Kingdom", team: "Haas", teamColor: "#B6BABD", championships: 0, wins: "0", poles: "0", skill: 83, racecraft: 81, consistency: 80, media: 78, desc: "British teenager who stunned F1 with P7 on debut at Ferrari in 2024 as a last-minute stand-in. Ferrari-backed. Gets his full seat aged 19. One of the most hyped young talents in years.", mediaNote: "British media darling. Remarkably calm under pressure. Ferrari's future?", seasons: "2025–present" },
  { id: "doohan", number: 7, name: "Jack Doohan", country: "🇦🇺 Australia", team: "dropped (2026)", teamColor: "#555566", championships: 0, wins: "0", poles: "0", skill: 80, racecraft: 79, consistency: 79, media: 68, desc: "Son of motorcycle legend Mick Doohan. Dropped by Alpine mid-2025 after a difficult debut season — Colapinto took his seat. Has the pedigree but the opportunity came too soon in a team in deep transition.", mediaNote: "Famous surname. Australia is watching. Likely to return in future if a seat opens.", seasons: "2025" },
  { id: "hadjar", number: 6, name: "Isack Hadjar", country: "🇫🇷 France", team: "Red Bull Racing", teamColor: "#3671C6", championships: 0, wins: "0", poles: "0", skill: 82, racecraft: 81, consistency: 80, media: 67, desc: "Earned his Red Bull promotion after a strong debut season at Racing Bulls in 2025. The French-Algerian talent becomes Verstappen's new teammate — the most scrutinised seat in F1.", mediaNote: "Big in France and Algeria. Still establishing his F1 personality.", seasons: "2025–present" },
  { id: "lindblad", number: 8, name: "Arvid Lindblad", country: "🇬🇧 United Kingdom", team: "Racing Bulls", teamColor: "#6692FF", championships: 0, wins: "0", poles: "0", skill: 80, racecraft: 79, consistency: 78, media: 65, desc: "18-year-old British-Swedish Red Bull junior making his F1 debut after Hadjar's promotion to the senior team. Dominated the junior categories and is widely regarded as one of the most exciting young talents in the pipeline.", mediaNote: "Quietly confident. Growing profile in the UK and Sweden. One to watch.", seasons: "2026–present" },
  { id: "bortoleto", number: 5, name: "Gabriel Bortoleto", country: "🇧🇷 Brazil", team: "Audi F1", teamColor: "#BB0A21", championships: 0, wins: "0", poles: "0", skill: 82, racecraft: 81, consistency: 80, media: 74, desc: "Won F3 and F2 in consecutive seasons — a rare achievement. Brazil's first full-time F1 driver in years. Joins Sauber as they transform into Audi. McLaren junior released to make his debut.", mediaNote: "Brazil is excited. Carries the weight of a nation. Fresh, likeable personality.", seasons: "2025–present" },
  { id: "hulkenberg", number: 27, name: "Nico Hülkenberg", country: "🇩🇪 Germany", team: "Audi F1", teamColor: "#BB0A21", championships: 0, wins: "0", poles: "1", skill: 86, racecraft: 85, consistency: 87, media: 75, desc: "Out of F1 for 3 years, came back as a substitute, earned a full seat, now leads the team becoming Audi. The most important role of his career. One of the cleanest racers on the grid.", mediaNote: "Dry German wit. Respected everywhere. The Audi chapter is his biggest yet.", seasons: "2010–2019, 2023–present" },
  { id: "stroll", number: 18, name: "Lance Stroll", country: "🇨🇦 Canada", team: "Aston Martin", teamColor: "#229971", championships: 0, wins: "0", poles: "1", skill: 78, racecraft: 76, consistency: 78, media: 65, desc: "Son of team owner Lawrence Stroll, which guarantees his seat. More capable than his pay-driver tag suggests — 3 podiums and a pole. Often outpaced by teammates but capable in the wet.", mediaNote: "Criticism follows him because of his father's ownership. Occasionally brilliant, frequently below his teammate.", seasons: "2017–present" },
  { id: "bottas_cadillac", number: 77, name: "Valtteri Bottas", country: "🇫🇮 Finland", team: "Cadillac (2026)", teamColor: "#CC0000", championships: 0, wins: "10", poles: "20", skill: 85, racecraft: 83, consistency: 85, media: 78, desc: "Sat out 2025 as Mercedes reserve after leaving Sauber. Returns to the grid with brand new team Cadillac for 2026. Brings 500+ race starts and invaluable experience to help build a team from scratch. Delighted to be racing again.", mediaNote: "Famous for witty, blunt social media. 'To whom it may concern' energy. Beloved for authenticity.", seasons: "2013–2024, 2026–present" },
  { id: "perez_cadillac", number: 11, name: "Sergio Perez", country: "🇲🇽 Mexico", team: "Cadillac (2026)", teamColor: "#CC0000", championships: 0, wins: "13", poles: "3", skill: 84, racecraft: 85, consistency: 78, media: 80, desc: "Released by Red Bull after 2024, sat out 2025, now returns with Cadillac. The 'Minister of Defence' brings 280+ race starts to a new team that desperately needs his experience. Mexico will be watching closely.", mediaNote: "National hero in Mexico. The Interlagos Checo chants are legendary. Huge Latin American fanbase.", seasons: "2011–2024, 2026–present" },
];

const DRIVER_HISTORY = [
  { year: "2018–2019", title: "The Vettel vs Hamilton Era", context: "Ferrari vs Mercedes battle. Vettel led 2018 before cracking under pressure.", changes: [
    { team: "Red Bull", out: "Daniel Ricciardo", in: "Pierre Gasly", reason: "Ricciardo shocked everyone by leaving for Renault — a massive pay deal and desire for change after years in Verstappen's shadow." },
    { team: "Red Bull (mid-2019)", out: "Pierre Gasly", in: "Alex Albon", reason: "Gasly catastrophically underperformed next to Verstappen. Demoted mid-season — one of F1's most brutal and sudden swaps." },
  ]},
  { year: "2020", title: "Hamilton's Record 7th Title", context: "COVID-shortened season. Hamilton equalled Schumacher's record. Red Bull began planning life after Albon.", changes: [
    { team: "Red Bull (end of season)", out: "Alex Albon", in: "Sergio Perez (2021)", reason: "Albon couldn't close the gap to Verstappen. Red Bull needed a race-winning #2. Albon rebuilt brilliantly at Williams." },
  ]},
  { year: "2021", title: "The Greatest Season Ever?", context: "Verstappen vs Hamilton went to the final lap of the final race. Controversial safety car call decided the title by one point.", changes: [
    { team: "Mercedes", out: "Valtteri Bottas", in: "George Russell (2022)", reason: "After 5 loyal seasons as Hamilton's wingman, Mercedes promoted Russell. Bottas moved to Alfa Romeo with dignity." },
    { team: "McLaren", out: "Carlos Sainz", in: "Daniel Ricciardo", reason: "Sainz went to Ferrari. Ricciardo came to McLaren hoping for a revival — the pace never came." },
  ]},
  { year: "2022", title: "New Era — Ground Effect Rules", context: "Biggest regulation change in decades. Red Bull and Ferrari surged. Mercedes was suddenly off the pace.", changes: [
    { team: "Ferrari", out: "Sebastian Vettel (retired)", in: "Carlos Sainz", reason: "Vettel retired citing environmental concerns and family time. A 4x champion bowing out gracefully." },
    { team: "Alpine", out: "Esteban Ocon (kept)", in: "Fernando Alonso", reason: "Alonso returned to the team he won both titles with. Aston Martin then lured him away for 2023." },
  ]},
  { year: "2023", title: "Verstappen Steamroller", context: "Red Bull won 21 of 22 races. Every record fell. McLaren emerged as the best of the rest by year's end.", changes: [
    { team: "Aston Martin", out: "(new signing)", in: "Fernando Alonso", reason: "Alonso left Alpine after they mishandled contract talks. Aston Martin swooped — he repaid them with 8 podiums." },
    { team: "AlphaTauri", out: "Nyck de Vries", in: "Daniel Ricciardo (mid-season)", reason: "De Vries was a disaster — dropped after 10 races. Ricciardo returned but couldn't match Tsunoda's pace." },
  ]},
  { year: "2024", title: "The Bombshells Drop", context: "McLaren pushed Verstappen to the limit. Then the off-season announcements sent shockwaves through the whole sport.", changes: [
    { team: "Ferrari", out: "Carlos Sainz", in: "Lewis Hamilton (2025)", reason: "THE biggest transfer in F1 history. Ferrari signed Hamilton despite Sainz having a brilliant season. Sainz was devastated." },
    { team: "Red Bull", out: "Sergio Perez", in: "Liam Lawson (2025)", reason: "Perez released after pace fell too far behind Verstappen. Controversial call to promote Lawson over Tsunoda." },
    { team: "Mercedes", out: "Lewis Hamilton", in: "Kimi Antonelli (2025)", reason: "After Hamilton's shock Ferrari move, Mercedes turned to 18-year-old Italian prodigy Antonelli. Enormous faith in the next generation." },
    { team: "Williams", out: "Logan Sargeant", in: "Franco Colapinto (mid-2024) → Carlos Sainz (2025)", reason: "Sargeant dropped mid-season. Colapinto impressed. Then Sainz chose Williams for 2025 — a transformative signing." },
  ]},
  { year: "2025", title: "New Faces, Pre-Audi Era", context: "Four rookies on the grid. Hamilton in red. Audi looming for 2026. The biggest driver shuffle in years.", changes: [
    { team: "Sauber", out: "Bottas & Zhou", in: "Hülkenberg & Bortoleto", reason: "Full reset as Sauber prepares to become Audi. Binotto brought in as TP to lead the transformation." },
    { team: "Haas", out: "Kevin Magnussen", in: "Oliver Bearman", reason: "Magnussen let go after years of solid service. Bearman, 19, earned his seat through stunning substitute performances in 2024." },
    { team: "Alpine", out: "Esteban Ocon", in: "Jack Doohan", reason: "Ocon moved to Haas. Doohan steps up from the Alpine junior programme for his debut year." },
    { team: "RB / VCARB", out: "Ricciardo / Lawson (promoted)", in: "Isack Hadjar", reason: "Lawson promoted to Red Bull. Hadjar, Red Bull's top junior, fills the seat alongside Tsunoda." },
  ]},
  { year: "2026", title: "The New Era — A Brand New Grid", context: "The biggest regulation reset in F1 history brings sweeping changes to the driver market too. Two entirely new teams join the grid, a legendary champion switches teams again, and several long-serving drivers lose their seats. F1 has 22 seats for the first time ever.", changes: [
    { team: "Cadillac F1 (NEW)", out: "N/A — brand new team", in: "Valtteri Bottas & Sergio Perez", reason: "F1's 11th team makes its debut. Both Bottas and Perez sat out 2025 after losing their seats. Cadillac signed them for their combined 530+ race starts of experience — exactly what a new team needs." },
    { team: "Audi F1 (née Sauber)", out: "Hülkenberg & Bortoleto (retained)", in: "Hülkenberg & Bortoleto (same drivers)", reason: "No change — Audi decided continuity was more valuable than disruption in their first year as a works constructor. The team simply rebrands from Sauber to Audi." },
    { team: "Alpine", out: "Jack Doohan", in: "Franco Colapinto", reason: "Doohan was dropped mid-2025 after struggling for results. Colapinto, who impressed as a Williams stand-in in 2024, takes the seat. A brutal but unsurprising call from Alpine." },
    { team: "Red Bull Racing", out: "Liam Lawson", in: "Isack Hadjar", reason: "Lawson was dropped after failing to match Verstappen's pace in 2025. Hadjar, who impressed at Racing Bulls alongside Tsunoda, earns the promotion — the seat Tsunoda was controversially overlooked for in 2024." },
    { team: "Aston Martin", out: "Lance Stroll & Fernando Alonso", in: "Lance Stroll & Fernando Alonso (retained)", reason: "Alonso, now 44, keeps racing — defying all expectations once again. Stroll stays by virtue of his father owning the team. Aston Martin continues with Honda power units into the 2026 era." },
    { team: "Racing Bulls", out: "Isack Hadjar (promoted) & Yuki Tsunoda (dropped)", in: "Liam Lawson & Arvid Lindblad", reason: "Hadjar's promotion to Red Bull and Tsunoda's exit from the Red Bull system clears both seats. Lawson returns to Racing Bulls as the experienced head alongside 18-year-old rookie Arvid Lindblad. Alan Permane takes over as TP after Mekies' promotion to Red Bull." },
    { team: "Haas", out: "Esteban Ocon", in: "Esteban Ocon & Oliver Bearman (retained)", reason: "No change to the Haas lineup. Ocon and Bearman continue into the new regulations. A stable environment heading into the 2026 reset." },
    { team: "Williams", out: "Alexander Albon & Carlos Sainz (retained)", in: "Alexander Albon & Carlos Sainz (retained)", reason: "Both drivers stay. Sainz remains at Williams to continue their rebuild into the new era. Albon, whose contract was extended, is a key part of the team's long-term culture." },
  ]},
];

const CHAMPIONSHIP_HISTORY = [
  { year: 2018, driver: "Lewis Hamilton 🇬🇧", team2: "Mercedes" },
  { year: 2019, driver: "Lewis Hamilton 🇬🇧", team2: "Mercedes" },
  { year: 2020, driver: "Lewis Hamilton 🇬🇧", team2: "Mercedes" },
  { year: 2021, driver: "Max Verstappen 🇳🇱", team2: "Mercedes" },
  { year: 2022, driver: "Max Verstappen 🇳🇱", team2: "Red Bull Racing" },
  { year: 2023, driver: "Max Verstappen 🇳🇱", team2: "Red Bull Racing" },
  { year: 2024, driver: "Max Verstappen 🇳🇱", team2: "McLaren" },
];

const POINTS_DATA = [
  { pos: 1, points: 25 }, { pos: 2, points: 18 }, { pos: 3, points: 15 },
  { pos: 4, points: 12 }, { pos: 5, points: 10 }, { pos: 6, points: 8 },
  { pos: 7, points: 6 },  { pos: 8, points: 4 },  { pos: 9, points: 2 },
  { pos: 10, points: 1 },
];

function RatingBar({ label, value }) {
  return (
    <div className="rating-bar-wrap">
      <div className="rating-label"><span>{label}</span><span style={{ color: "#e10600" }}>{value}/100</span></div>
      <div className="rating-bar">
        <div className="rating-fill" style={{ "--bar-w": `${value}%`, width: `${value}%` }} />
      </div>
    </div>
  );
}

function DriverCard({ driver }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    card.style.boxShadow = `0 20px 60px rgba(0,0,0,0.8), ${rotY * -1}px ${rotX}px 30px rgba(225,6,0,0.1)`;
  };
  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
    card.style.boxShadow = "";
  };

  return (
    <div className="driver-card" ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="driver-header" style={{ borderBottom: `1px solid ${driver.teamColor}22` }}>
        <div className="driver-number" style={{ color: driver.teamColor, textShadow: `0 0 20px ${driver.teamColor}66` }}>{driver.number}</div>
        <div className="driver-info">
          <div className="driver-name">{driver.name}</div>
          <div className="driver-country">{driver.country}</div>
        </div>
        <div className="driver-team-badge" style={{ background: driver.teamColor + "22", color: driver.teamColor, border: `1px solid ${driver.teamColor}55` }}>
          {driver.team.split(" ").slice(0, 2).join(" ")}
        </div>
      </div>
      <div className="driver-body">
        <div className="driver-stat-row">
          <div className="driver-stat"><div className="driver-stat-val" style={{ color: driver.teamColor, textShadow: `0 0 10px ${driver.teamColor}55` }}>⭐{driver.championships}</div><div className="driver-stat-lbl">Titles</div></div>
          <div className="driver-stat"><div className="driver-stat-val">{driver.wins}</div><div className="driver-stat-lbl">Wins</div></div>
          <div className="driver-stat"><div className="driver-stat-val">{driver.poles}</div><div className="driver-stat-lbl">Poles</div></div>
        </div>
        <p className="driver-desc">{driver.desc}</p>
        {expanded && (
          <>
            <RatingBar label="Raw Speed" value={driver.skill} />
            <RatingBar label="Racecraft" value={driver.racecraft} />
            <RatingBar label="Consistency" value={driver.consistency} />
            <RatingBar label="Media Appeal" value={driver.media} />
            <div className="driver-media">🎙️ {driver.mediaNote}</div>
            <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 8 }}>Active: {driver.seasons}</div>
          </>
        )}
        <button className="expand-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? "▲ Less" : "▼ Ratings & Media"}
        </button>
      </div>
    </div>
  );
}

function TeamCard({ team }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -5;
    const rotY = ((x - cx) / cx) * 5;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    card.style.boxShadow = `0 20px 60px rgba(0,0,0,0.8), 0 0 30px ${team.color}20`;
  };
  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "";
    card.style.boxShadow = "";
  };

  return (
    <div className="team-card" ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ borderTop: `2px solid ${team.color}`, boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 0 0 ${team.color}` }}>
      <div className="team-header" style={{ background: `linear-gradient(135deg, ${team.color}08, transparent)` }}>
        <div className="team-color-block" style={{ background: team.color, boxShadow: `0 0 16px ${team.color}80` }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="team-name">{team.name}</div>
          <div className="team-base">📍 {team.base}</div>
        </div>
      </div>
      <div className="team-body">
        <div className="team-row">
          <span className="team-pill">🔧 <strong>Engine:</strong> {team.engine}</span>
          <span className="team-pill">👔 <strong>TP:</strong> {team.tp}</span>
        </div>
        <div className="team-row">
          <span className="team-pill">🏆 {team.championships}</span>
          <span className="team-pill">Est. {team.founded}</span>
        </div>
        <div className="team-row" style={{ marginTop: 4 }}>
          {team.drivers.map(d => (
            <span key={d} className="team-pill" style={{ background: team.color + "18", borderColor: team.color + "44", color: "var(--text2)" }}>🏎 {d}</span>
          ))}
        </div>
        <p className="team-detail" style={{ marginTop: 10 }}>{team.desc}</p>
        {expanded && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 10, color: team.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 5, fontFamily: "Orbitron", textShadow: `0 0 8px ${team.color}60` }}>Engine Notes</div>
            <p className="team-detail">{team.engineNote}</p>
          </div>
        )}
        <button className="expand-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? "▲ Less" : "▼ Engine Details"}
        </button>
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <div>
      <div className="section-title">How <span>F1</span> Works</div>
      <div className="section-line" />
      <div className="how-grid">
        {[
          { title: "What is F1?", text: "Formula 1 is the pinnacle of motorsport — the fastest, most technologically advanced racing series on Earth. 10 teams, 20 drivers, ~24 races a year across the globe. Each team builds their own car around a common set of rules." },
          { title: "The Race Weekend", text: "Thursday: Media day. Friday: Two practice sessions (FP1 & FP2). Saturday: FP3 then Qualifying (Q1→Q2→Q3). Sunday: The Race. Sprint weekends add a mini-race on Saturday." },
          { title: "Qualifying", text: "Three knockout rounds. Q1 eliminates the 5 slowest. Q2 eliminates 5 more. Q3 (top 10) fights for pole position — the front of the grid. Single flying laps under enormous pressure." },
          { title: "The Race", text: "Typically 305km (190 miles). Cars must use at least 2 different tyre compounds. Strategy — when to pit, which tyres — is often as important as outright speed." },
          { title: "Tyres", text: "Pirelli supply all teams. Soft (red) = fastest but least durable. Medium (yellow). Hard (white) = lasts longest. Intermediate (green) and Full Wet (blue) for rain. Tyre strategy can completely change a race outcome." },
          { title: "DRS", text: "Drag Reduction System — opens the rear wing on straights for extra speed. Only usable within 1 second of the car ahead in designated zones. Being removed in 2026 in favour of active aerodynamics." },
          { title: "Two Championships", text: "The Drivers' Championship rewards the fastest individual. The Constructors' Championship rewards the team (both drivers' points combined). Teams fight for both simultaneously all season." },
          { title: "Safety Car & Red Flag", text: "Virtual Safety Car (VSC) slows everyone. Full Safety Car bunches the pack. Red Flag stops the race entirely. All three create drama and can completely flip race outcomes." },
          { title: "2026 New Rules", text: "The biggest regulation reset since 2014. New power units with ~50% electric power. Active aerodynamics replaces DRS. Audi joins as a works manufacturer. Red Bull switches to Ford. A brand new chapter." },
        ].map(item => (
          <div className="how-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PointsSystem() {
  return (
    <div>
      <div className="section-title">Points <span>System</span></div>
      <div className="section-line" />
      <div className="points-wrap">
        <div>
          <table className="points-table">
            <thead><tr><th>Position</th><th>Points</th><th>Note</th></tr></thead>
            <tbody>
              {POINTS_DATA.map(row => (
                <tr key={row.pos}>
                  <td><span className={`pos-badge${row.pos === 1 ? " p1" : row.pos === 2 ? " p2" : row.pos === 3 ? " p3" : ""}`}>{row.pos}</span></td>
                  <td style={{ fontFamily: "Orbitron", fontWeight: 700, color: row.pos <= 3 ? "#e10600" : "#ccc" }}>{row.points}</td>
                  <td style={{ fontSize: 10, color: "var(--text3)" }}>{row.pos === 1 ? "+1 fastest lap" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="card" style={{ marginTop: 12 }}>
            <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.7 }}>
              <strong style={{ color: "#e10600" }}>Sprint races</strong> award half points — 8 down to 1 for the top 8 finishers. Sprint Qualifying sets the sprint grid separately from the main race.
            </p>
          </div>
        </div>
        <div>
          <div className="section-title" style={{ fontSize: "clamp(13px,3vw,18px)", marginBottom: 8 }}>Championship <span>Winners</span></div>
          <div className="section-line" />
          <table className="champ-table">
            <thead><tr><th>Year</th><th>Driver</th><th>Constructors'</th></tr></thead>
            <tbody>
              {CHAMPIONSHIP_HISTORY.map(row => (
                <tr key={row.year}>
                  <td style={{ fontFamily: "Orbitron", fontWeight: 700, color: "#e10600", fontSize: 11 }}>{row.year}</td>
                  <td className={row.driver.includes("Verstappen") ? "gold" : "silver"}>{row.driver}</td>
                  <td style={{ fontSize: 10, color: "var(--text2)" }}>{row.team2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DriversSection() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showDropped, setShowDropped] = useState(false);
  const allDrivers = DRIVERS_2025;
  const active = allDrivers.filter(d => !d.team.toLowerCase().includes("dropped"));
  const dropped = allDrivers.filter(d => d.team.toLowerCase().includes("dropped"));
  const source = showDropped ? dropped : active;
  const filtered = source.filter(d => {
    const q = search.toLowerCase();
    const matchSearch = d.name.toLowerCase().includes(q) || d.team.toLowerCase().includes(q);
    const matchFilter = filter === "All" || d.team.toLowerCase().includes(filter.toLowerCase());
    return matchSearch && matchFilter;
  });
  return (
    <div>
      <div className="section-title">2026 <span>Drivers</span></div>
      <div className="section-line" />
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button className={`year-btn${!showDropped ? " active" : ""}`} onClick={() => setShowDropped(false)}>🏎️ Active ({active.length})</button>
        <button className={`year-btn${showDropped ? " active" : ""}`} onClick={() => setShowDropped(true)}>💀 No 2026 Seat ({dropped.length})</button>
      </div>
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input className="search-input" placeholder="Search drivers or teams..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="filter-row">
        {["All","Red Bull","Mercedes","Ferrari","McLaren","Aston","Alpine","Williams","Haas","Racing Bulls","Audi F1","Cadillac"].map(f => (
          <button key={f} className={`filter-pill${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="card-grid">
        {filtered.map(d => <DriverCard key={d.id} driver={d} />)}
      </div>
      {filtered.length === 0 && <div style={{ color: "var(--text4)", textAlign: "center", padding: 40 }}>No drivers found</div>}
    </div>
  );
}

function TeamsSection() {
  const [year, setYear] = useState("2025");
  const [search, setSearch] = useState("");
  const source = year === "2026" ? TEAMS_2026 : TEAMS_2025;
  const filtered = source.filter(t => {
    const q = search.toLowerCase();
    return t.name.toLowerCase().includes(q) || t.engine.toLowerCase().includes(q) ||
      t.tp.toLowerCase().includes(q) || t.drivers.some(d => d.toLowerCase().includes(q));
  });
  return (
    <div>
      <div className="section-title">The <span>Teams</span></div>
      <div className="section-line" />
      <div className="year-toggle">
        <button className={`year-btn${year === "2025" ? " active" : ""}`} onClick={() => setYear("2025")}>2025 Season</button>
        <button className={`year-btn${year === "2026" ? " active" : ""}`} onClick={() => setYear("2026")}>
          2026 Season <span className="new-badge">NEW</span>
        </button>
      </div>
      {year === "2026" && (
        <div className="card" style={{ marginBottom: 18, borderLeft: "3px solid #e10600" }}>
          <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.7 }}>
            <strong style={{ color: "#e10600" }}>2026 is a complete reset.</strong> New power unit rules require ~50% electric power. Red Bull switches from Honda to Ford. Alpine drops Renault for Mercedes. Sauber becomes the Audi works team — the first new manufacturer in F1 in over a decade.
          </p>
        </div>
      )}
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input className="search-input" placeholder="Search teams, engine, TP or driver..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="card-grid">
        {filtered.map(t => <TeamCard key={t.id + year} team={t} />)}
      </div>
    </div>
  );
}

function HistorySection() {
  return (
    <div>
      <div className="section-title">Driver <span>Changes</span> 2018–2026</div>
      <div className="section-line" />
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "rgba(0,220,120,0.08)", border: "1px solid rgba(0,220,120,0.25)", borderRadius: 2, marginBottom: 12 }}>
        <span style={{ fontSize: 10, color: "#00dc78", fontFamily: "Orbitron", letterSpacing: 1 }}>NEW FOR 2026 — F1 now has 22 seats with the arrival of Cadillac</span>
      </div>
      <p style={{ marginBottom: 16, fontSize: 13, color: "var(--text3)", lineHeight: 1.7 }}>
        F1 has only 20 seats (22 from 2026). Drivers are dropped, promoted, and shuffled constantly. Here's every major move from 2018 to 2026 — and the real reason behind each one.
      </p>
      <div className="timeline">
        {DRIVER_HISTORY.map(era => (
          <div className="timeline-item" key={era.year}>
            <div className="timeline-dot" />
            <div className="timeline-year">{era.year}</div>
            <div className="timeline-content">
              <strong style={{ color: "var(--text)", fontSize: 14 }}>{era.title}</strong>
              <p style={{ marginTop: 6 }}>{era.context}</p>
              <div style={{ marginTop: 10 }}>
                {era.changes.map((c, i) => (
                  <div className="timeline-change" key={i}>
                    <div style={{ marginBottom: 5, fontWeight: 700, color: "var(--text)", fontSize: 12 }}>{c.team}</div>
                    <span className="change-tag tag-out">OUT: {c.out}</span>
                    <span className="change-tag tag-in">IN: {c.in}</span>
                    <br />
                    <span className="change-tag tag-reason">WHY</span>
                    <span style={{ fontSize: 12, color: "var(--text2)" }}>{c.reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Team colour map ────────────────────────────────────────────────────────
const TEAM_COLORS = {
  mercedes: "#27F4D2", ferrari: "#E8002D", "red bull racing": "#3671C6",
  mclaren: "#FF8000", "aston martin": "#229971", alpine: "#0093CC",
  williams: "#64C4FF", haas: "#B6BABD", "rb": "#6692FF",
  "racing bulls": "#6692FF", kick: "#52E252", sauber: "#52E252",
  "cadillac": "#CC0000", "audi": "#BB0A21",
};
function teamColor(name = "") {
  const k = name.toLowerCase();
  for (const [key, val] of Object.entries(TEAM_COLORS)) { if (k.includes(key)) return val; }
  return "#888";
}

const POINTS_MAP = [25,18,15,12,10,8,6,4,2,1];

// Country flags for circuits
const CIRCUIT_FLAGS = {
  "albert park": "🇦🇺", "shanghai": "🇨🇳", "bahrain": "🇧🇭", "jeddah": "🇸🇦",
  "miami": "🇺🇸", "imola": "🇮🇹", "monaco": "🇲🇨", "barcelona": "🇪🇸",
  "montreal": "🇨🇦", "spielberg": "🇦🇹", "silverstone": "🇬🇧", "budapest": "🇭🇺",
  "spa": "🇧🇪", "zandvoort": "🇳🇱", "monza": "🇮🇹", "baku": "🇦🇿",
  "singapore": "🇸🇬", "suzuka": "🇯🇵", "austin": "🇺🇸", "mexico": "🇲🇽",
  "são paulo": "🇧🇷", "las vegas": "🇺🇸", "lusail": "🇶🇦", "yas marina": "🇦🇪",
};
function circuitFlag(name = "") {
  const k = name.toLowerCase();
  for (const [key, val] of Object.entries(CIRCUIT_FLAGS)) { if (k.includes(key)) return val; }
  return "🏁";
}

function formatGap(ms) {
  if (!ms || ms === 0) return "Winner";
  const s = Math.abs(ms / 1000);
  if (s < 60) return `+${s.toFixed(3)}s`;
  const m = Math.floor(s / 60);
  return `+${m}:${(s % 60).toFixed(3).padStart(6,"0")}`;
}

function ResultsSection() {
  const [sessions, setSessions] = useState([]);        // all race sessions this year
  const [selectedIdx, setSelectedIdx] = useState(0);  // which race is selected
  const [results, setResults] = useState([]);          // race results for selected session
  const [standings, setStandings] = useState([]);      // accumulated standings
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const YEAR = new Date().getFullYear();

  // Step 1: fetch all race sessions for current year
  async function fetchSessions() {
    const res = await fetch(
      `/api/openf1/sessions?session_type=Race&year=${YEAR}`
    );
    if (!res.ok) throw new Error("Failed to fetch sessions");
    const data = await res.json();
    // sort by date ascending
    return data.sort((a, b) => new Date(a.date_start) - new Date(b.date_start));
  }

  // Step 2: fetch race positions for a session
  async function fetchRaceResults(sessionKey) {
    const [posRes, driversRes, lapsRes] = await Promise.all([
      fetch(`/api/openf1/position?session_key=${sessionKey}`),
      fetch(`/api/openf1/drivers?session_key=${sessionKey}`),
      fetch(`/api/openf1/laps?session_key=${sessionKey}&is_pit_out_lap=false`),
    ]);
    const [positions, drivers, laps] = await Promise.all([
      posRes.json(), driversRes.json(), lapsRes.json()
    ]);

    // Get last known position per driver
    const latestPos = {};
    for (const p of positions) {
      if (!latestPos[p.driver_number] || p.date > latestPos[p.driver_number].date) {
        latestPos[p.driver_number] = p;
      }
    }

    // Map driver number → driver info
    const driverMap = {};
    for (const d of drivers) driverMap[d.driver_number] = d;

    // Get final lap for each driver to compute gap
    const finalLap = {};
    for (const l of laps) {
      if (!finalLap[l.driver_number] || l.lap_number > finalLap[l.driver_number].lap_number) {
        finalLap[l.driver_number] = l;
      }
    }

    // Winner's max lap
    const winnerNum = Object.entries(latestPos).find(([,p]) => p.position === 1)?.[0];
    const winnerLaps = winnerNum ? (finalLap[winnerNum]?.lap_number || 0) : 0;

    const rows = Object.values(latestPos)
      .sort((a, b) => a.position - b.position)
      .map(p => {
        const d = driverMap[p.driver_number] || {};
        const driverLaps = finalLap[p.driver_number]?.lap_number || 0;
        const dnf = winnerLaps > 0 && driverLaps < winnerLaps - 1;
        return {
          pos: p.position,
          driverNumber: p.driver_number,
          name: d.full_name || `Driver #${p.driver_number}`,
          shortName: d.name_acronym || "",
          team: d.team_name || "Unknown",
          teamColour: d.team_colour ? `#${d.team_colour}` : teamColor(d.team_name),
          points: p.position <= 10 && !dnf ? POINTS_MAP[p.position - 1] : 0,
          dnf,
          laps: driverLaps,
          winnerLaps,
        };
      });

    return rows;
  }

  // Build cumulative championship standings from all completed races
  async function buildStandings(allSessions) {
    const pts = {}; // driverName → {pts, team, teamColour}
    for (const s of allSessions) {
      try {
        const rows = await fetchRaceResults(s.session_key);
        for (const r of rows) {
          if (!pts[r.name]) pts[r.name] = { pts: 0, team: r.team, teamColour: r.teamColour };
          pts[r.name].pts += r.points;
        }
      } catch { /* skip failed sessions */ }
    }
    return Object.entries(pts)
      .map(([name, v]) => ({ name, ...v }))
      .sort((a, b) => b.pts - a.pts)
      .map((d, i) => ({ ...d, pos: i + 1 }));
  }

  async function loadAll() {
    setLoading(true);
    setError(null);
    try {
      const allSessions = await fetchSessions();
      if (!allSessions.length) { setSessions([]); setLoading(false); return; }
      setSessions(allSessions);

      // Default to latest completed race
      const now = new Date();
      const completed = allSessions.filter(s => new Date(s.date_end) < now);
      const defaultIdx = completed.length > 0 ? completed.length - 1 : 0;
      setSelectedIdx(defaultIdx);

      // Load results for default race + full standings in parallel
      const [raceRows, allStandings] = await Promise.all([
        fetchRaceResults(allSessions[defaultIdx].session_key),
        buildStandings(completed),
      ]);
      setResults(raceRows);
      setStandings(allStandings);
      setLastUpdated(new Date());
    } catch (e) {
      setError(e.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  async function switchRace(idx) {
    setSelectedIdx(idx);
    setResults([]);
    try {
      const rows = await fetchRaceResults(sessions[idx].session_key);
      setResults(rows);
    } catch { setResults([]); }
  }

  // Load on mount
  useEffect(() => { loadAll(); }, []);

  const selectedSession = sessions[selectedIdx];
  const finishers = results.filter(r => !r.dnf);
  const dnfs = results.filter(r => r.dnf);

  const thStyle = { background: "#e10600", color: "var(--text)", padding: "9px 12px", textAlign: "left", fontFamily: "Orbitron", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" };
  const thStyleDark = { background: "var(--bg3)", color: "#e10600", padding: "8px 12px", fontFamily: "Orbitron", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", textAlign: "left" };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
        <div className="section-title" style={{ marginBottom: 0 }}>{YEAR} <span>Results</span></div>
        <button onClick={loadAll} style={{ marginLeft: "auto", padding: "6px 14px", background: "transparent", border: "1px solid #333", color: "var(--text3)", fontFamily: "Orbitron", fontSize: 9, letterSpacing: 2, cursor: "pointer", borderRadius: 2, textTransform: "uppercase", transition: "all 0.2s" }}
          onMouseEnter={e => { e.target.style.borderColor="#e10600"; e.target.style.color="#fff"; }}
          onMouseLeave={e => { e.target.style.borderColor="#333"; e.target.style.color="#666"; }}>
          ↻ Refresh
        </button>
      </div>
      <div className="section-line" />

      {/* Data source badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "rgba(0,220,120,0.08)", border: "1px solid rgba(0,220,120,0.25)", borderRadius: 2 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: loading ? "#666" : "#00dc78", boxShadow: loading ? "none" : "0 0 6px #00dc78" }} />
          <span style={{ fontSize: 10, color: "#00dc78", fontFamily: "Orbitron", letterSpacing: 1 }}>LIVE · OpenF1 API</span>
        </div>
        {lastUpdated && (
          <span style={{ fontSize: 10, color: "var(--text4)" }}>Updated {lastUpdated.toLocaleTimeString()}</span>
        )}
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontFamily: "Orbitron", fontSize: 11, color: "#e10600", letterSpacing: 3, marginBottom: 16 }}>LOADING RACE DATA...</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#e10600", animation: `pulse 1.2s ${i*0.2}s infinite`, opacity: 0.8 }} />
            ))}
          </div>
          <style>{`@keyframes pulse { 0%,100%{transform:scale(1);opacity:0.4} 50%{transform:scale(1.4);opacity:1} }`}</style>
        </div>
      )}

      {error && !loading && (
        <div style={{ background: "var(--card-bg)", border: "1px solid #2a0000", borderLeft: "3px solid #e10600", padding: 20, borderRadius: 2, marginBottom: 20 }}>
          <div style={{ fontFamily: "Orbitron", fontSize: 11, color: "#e10600", letterSpacing: 2, marginBottom: 8 }}>DATA UNAVAILABLE</div>
          <p style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.7 }}>{error}. The OpenF1 API may be temporarily down, or the {YEAR} season data may not yet be available.</p>
          <button onClick={loadAll} style={{ marginTop: 12, padding: "7px 16px", background: "#e10600", border: "none", color: "var(--text)", fontFamily: "Orbitron", fontSize: 9, letterSpacing: 2, cursor: "pointer", borderRadius: 2 }}>RETRY</button>
        </div>
      )}

      {!loading && !error && sessions.length === 0 && (
        <div className="card" style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontFamily: "Orbitron", fontSize: 11, color: "var(--text3)", letterSpacing: 2 }}>NO RACES YET IN {YEAR}</div>
        </div>
      )}

      {!loading && sessions.length > 0 && (
        <>
          {/* Race selector */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "Orbitron", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Select Race</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {sessions.map((s, i) => {
                const isPast = new Date(s.date_end) < new Date();
                return (
                  <button key={s.session_key}
                    onClick={() => switchRace(i)}
                    style={{
                      padding: "5px 10px", borderRadius: 2, cursor: "pointer", fontFamily: "Orbitron",
                      fontSize: 9, letterSpacing: 1, textTransform: "uppercase", transition: "all 0.2s",
                      background: selectedIdx === i ? "#e10600" : "transparent",
                      border: `1px solid ${selectedIdx === i ? "#e10600" : isPast ? "var(--border2)" : "var(--border)"}`,
                      color: selectedIdx === i ? "#fff" : isPast ? "#888" : "#333",
                    }}>
                    R{i + 1} {circuitFlag(s.circuit_short_name)} {s.circuit_short_name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected race header */}
          {selectedSession && (
            <div className="card" style={{ marginBottom: 20, borderLeft: "3px solid #e10600" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <div style={{ fontFamily: "Orbitron", fontSize: 11, color: "#e10600", letterSpacing: 2, textTransform: "uppercase" }}>
                  Round {selectedIdx + 1}
                </div>
                <div style={{ fontFamily: "Orbitron", fontSize: 14, fontWeight: 700, color: "var(--text)" }}>
                  {circuitFlag(selectedSession.circuit_short_name)} {selectedSession.meeting_name || selectedSession.circuit_short_name}
                </div>
                <div style={{ marginLeft: "auto", fontSize: 11, color: "var(--text3)" }}>
                  {selectedSession.country_name} · {new Date(selectedSession.date_start).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </div>
              </div>
            </div>
          )}

          {/* Results table */}
          {results.length > 0 ? (
            <>
              <div style={{ overflowX: "auto", marginBottom: 24 }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Pos</th>
                      <th style={thStyle}>Driver</th>
                      <th style={thStyle}>Team</th>
                      <th style={thStyle}>Pts</th>
                      <th style={thStyle}>Laps</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finishers.map(row => (
                      <tr key={row.driverNumber} style={{ borderBottom: "1px solid var(--border)" }}>
                        <td style={{ padding: "10px 12px" }}>
                          <span className={`pos-badge${row.pos === 1 ? " p1" : row.pos === 2 ? " p2" : row.pos === 3 ? " p3" : ""}`}>{row.pos}</span>
                        </td>
                        <td style={{ padding: "10px 12px" }}>
                          <div style={{ fontWeight: 700, color: "var(--text)", fontSize: 13 }}>{row.name}</div>
                          <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 1, fontFamily: "Orbitron" }}>{row.shortName}</div>
                        </td>
                        <td style={{ padding: "10px 12px" }}>
                          <span style={{ background: row.teamColour + "22", color: row.teamColour, border: `1px solid ${row.teamColour}44`, padding: "3px 8px", borderRadius: 2, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap" }}>
                            {row.team}
                          </span>
                        </td>
                        <td style={{ padding: "10px 12px", fontFamily: "Orbitron", fontWeight: 700, color: row.pos <= 3 ? "#e10600" : "#aaa", fontSize: 13 }}>
                          {row.points || "—"}
                        </td>
                        <td style={{ padding: "10px 12px", fontSize: 12, color: "var(--text3)" }}>{row.laps}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {dnfs.length > 0 && (
                <>
                  <div className="section-title" style={{ fontSize: "clamp(13px,3vw,18px)", marginBottom: 8 }}>Did Not <span>Finish</span></div>
                  <div className="section-line" />
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,260px),1fr))", gap: 10, marginBottom: 32 }}>
                    {dnfs.map(d => (
                      <div key={d.driverNumber} style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderLeft: "3px solid #333", padding: "12px 14px", borderRadius: 2 }}>
                        <div style={{ fontWeight: 700, color: "var(--text)", fontSize: 13, marginBottom: 4 }}>{d.name}</div>
                        <div style={{ fontSize: 10, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{d.team}</div>
                        <div style={{ fontSize: 11, color: "var(--text3)" }}>DNF · {d.laps} of {d.winnerLaps} laps</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            !loading && (
              <div className="card" style={{ textAlign: "center", padding: 32, marginBottom: 24 }}>
                <div style={{ fontFamily: "Orbitron", fontSize: 10, color: "var(--text3)", letterSpacing: 2 }}>
                  {new Date(selectedSession?.date_start) > new Date() ? "RACE NOT YET RUN" : "LOADING RESULTS..."}
                </div>
              </div>
            )
          )}

          {/* Championship standings */}
          {standings.length > 0 && (
            <>
              <div className="section-title" style={{ fontSize: "clamp(13px,3vw,18px)", marginBottom: 8 }}>Drivers' <span>Championship</span></div>
              <div className="section-line" />
              <PointsGraph standings={standings} />
              <div style={{ overflowX: "auto", marginBottom: 24 }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 360 }}>
                  <thead>
                    <tr>
                      <th style={thStyleDark}>Pos</th>
                      <th style={thStyleDark}>Driver</th>
                      <th style={thStyleDark}>Team</th>
                      <th style={thStyleDark}>Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.slice(0, 20).map(row => (
                      <tr key={row.name} style={{ borderBottom: "1px solid var(--border)" }}>
                        <td style={{ padding: "8px 12px" }}>
                          <span className={`pos-badge${row.pos === 1 ? " p1" : row.pos === 2 ? " p2" : row.pos === 3 ? " p3" : ""}`}>{row.pos}</span>
                        </td>
                        <td style={{ padding: "8px 12px", fontSize: 13, color: row.pos <= 3 ? "#fff" : "#bbb", fontWeight: row.pos <= 3 ? 700 : 400 }}>{row.name}</td>
                        <td style={{ padding: "8px 12px" }}>
                          <span style={{ background: row.teamColour + "22", color: row.teamColour, border: `1px solid ${row.teamColour}44`, padding: "2px 7px", borderRadius: 2, fontSize: 10, fontWeight: 700 }}>
                            {row.team}
                          </span>
                        </td>
                        <td style={{ padding: "8px 12px", fontFamily: "Orbitron", fontWeight: 700, fontSize: 13, color: row.pos <= 3 ? "#e10600" : "#aaa" }}>{row.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Constructor Standings */}
              {(() => {
                const constructors = buildConstructorStandings(standings);
                return constructors.length > 0 ? (
                  <>
                    <div className="section-title" style={{ fontSize: "clamp(13px,3vw,18px)", marginBottom: 8 }}>Constructors' <span>Championship</span></div>
                    <div className="section-line" />
                    <div style={{ overflowX: "auto", marginBottom: 8 }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 300 }}>
                        <thead>
                          <tr>
                            <th style={thStyleDark}>Pos</th>
                            <th style={thStyleDark}>Constructor</th>
                            <th style={thStyleDark}>Pts</th>
                          </tr>
                        </thead>
                        <tbody>
                          {constructors.map(row => (
                            <tr key={row.team} style={{ borderBottom: "1px solid var(--border)" }}>
                              <td style={{ padding: "8px 12px" }}>
                                <span className={`pos-badge${row.pos === 1 ? " p1" : row.pos === 2 ? " p2" : row.pos === 3 ? " p3" : ""}`}>{row.pos}</span>
                              </td>
                              <td style={{ padding: "8px 12px" }}>
                                <span style={{ background: row.colour + "22", color: row.colour, border: `1px solid ${row.colour}44`, padding: "2px 10px", borderRadius: 2, fontSize: 11, fontWeight: 700 }}>{row.team}</span>
                              </td>
                              <td style={{ padding: "8px 12px", fontFamily: "Orbitron", fontWeight: 700, fontSize: 13, color: row.pos <= 3 ? "#e10600" : "#aaa" }}>{row.pts}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : null;
              })()}

              <div style={{ fontSize: 10, color: "var(--text4)", textAlign: "center", marginBottom: 4 }}>
                After {sessions.filter(s => new Date(s.date_end) < new Date()).length} of {sessions.length} rounds · Data via OpenF1
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

// ─── GLOSSARY DATA ───────────────────────────────────────────────────────────
const GLOSSARY = [
  { term: "Undercut", cat: "Strategy", catColor: "#3671C6", def: "Pitting before your rival to fit fresh tyres, hoping the extra pace on new rubber lets you emerge ahead of them after they pit. One of F1's most common tactical weapons." },
  { term: "Overcut", cat: "Strategy", catColor: "#3671C6", def: "The opposite of an undercut — staying out longer than a rival on old tyres, hoping track position and their slower in-lap gives you the advantage when you finally pit." },
  { term: "VSC", cat: "Safety", catColor: "#ffc800", def: "Virtual Safety Car. All drivers must slow to a mandated speed. Used for minor incidents. Unlike a full Safety Car, the gaps between cars are frozen — making it less race-changing but still strategically important." },
  { term: "Safety Car", cat: "Safety", catColor: "#ffc800", def: "A physical car deployed on track after serious incidents. All cars bunch up behind it, gaps are erased, and the pit lane becomes a strategic battleground as teams time their stops." },
  { term: "Parc Fermé", cat: "Regulations", catColor: "#e10600", def: "French for 'closed park.' After qualifying, cars are placed in parc fermé where only limited work is allowed. Teams cannot make major setup changes. The car you qualify with is essentially the car you race." },
  { term: "DRS", cat: "Tech", catColor: "#00dc78", def: "Drag Reduction System. Drivers within 1 second of the car ahead can open a flap in the rear wing on designated straights, reducing drag and adding ~10-15 km/h. Being replaced by active aero in 2026." },
  { term: "Tyre Compound", cat: "Tyres", catColor: "#FF8000", def: "The type of Pirelli tyre. Soft (red) = fastest but wears quickest. Medium (yellow) = balanced. Hard (white) = lasts longest but slowest. Teams must use at least two different compounds per race." },
  { term: "Degradation", cat: "Tyres", catColor: "#FF8000", def: "How quickly a tyre's performance drops as it wears. High-deg circuits destroy tyres faster, forcing more pit stops and creating strategic variety. Low-deg races tend to be processional." },
  { term: "Graining", cat: "Tyres", catColor: "#FF8000", def: "A tyre condition where thin strips of rubber peel off and stick back to the surface, causing heavy vibration and slower lap times. Often temporary — drivers sometimes 'cure' it by pushing harder." },
  { term: "Pole Position", cat: "Qualifying", catColor: "#c0c0c0", def: "Starting first on the grid, earned by setting the fastest lap in Q3. Pole is hugely valuable — starting first, especially at narrow circuits like Monaco, often guarantees victory." },
  { term: "Q1 / Q2 / Q3", cat: "Qualifying", catColor: "#c0c0c0", def: "The three rounds of qualifying. Q1: all 20 drivers, slowest 5 eliminated. Q2: 15 drivers, slowest 5 eliminated. Q3: the top 10 fight for pole position on a single flying lap each." },
  { term: "Lap Delta", cat: "Racing", catColor: "#888", def: "The time difference between a driver's current lap and a reference lap (their best, or the VSC target). Displayed on timing screens as + (slower) or − (faster) than the benchmark." },
  { term: "Outlap", cat: "Strategy", catColor: "#3671C6", def: "The lap a driver does immediately after leaving the pits on cold tyres. Drivers heat their tyres carefully on an outlap before going fast. A slow outlap loses track position; too aggressive wrecks the tyres." },
  { term: "Purple / Green / Yellow Sector", cat: "Timing", catColor: "#888", def: "Sector colours on timing screens. Purple = fastest anyone has gone in that sector this session. Green = faster than your own previous best. Yellow = slower than your best." },
  { term: "ERS / MGU-K / MGU-H", cat: "Tech", catColor: "#00dc78", def: "Energy Recovery Systems. MGU-K harvests kinetic energy under braking (like KERS). MGU-H harvests heat from the turbo. Combined they produce up to 160bhp of extra power, deployable by drivers." },
  { term: "Fuel Load", cat: "Strategy", catColor: "#3671C6", def: "How much fuel a car carries at the start. More fuel = heavier car = slower, but you can run longer. Starting heavy means you're quicker at the end when the fuel burns off. Teams calculate the exact minimum fuel needed." },
  { term: "Pit Stop Window", cat: "Strategy", catColor: "#3671C6", def: "The range of laps within which a team plans to make their pit stop. Going too early or late hurts — teams watch tyre life, track position and rivals to find the optimal moment." },
  { term: "Formation Lap", cat: "Racing", catColor: "#888", def: "The warm-up lap before the race where drivers weave to heat their tyres and brakes. Drivers then form up on the grid in qualifying order before the race starts." },
  { term: "Podium", cat: "Racing", catColor: "#888", def: "The top three finishers in a race — 1st, 2nd and 3rd. The podium ceremony with national anthems and champagne is one of F1's iconic traditions." },
  { term: "Fastest Lap", cat: "Racing", catColor: "#888", def: "The quickest single lap set by any driver during the race. Awards 1 bonus championship point — but only if you finish in the top 10. Often attempted on the final lap on fresh soft tyres." },
  { term: "DNF", cat: "Racing", catColor: "#e10600", def: "Did Not Finish. A retirement from the race due to mechanical failure, accident or driver error. DNFs can be season-defining — a single retirement at the wrong moment can cost a championship." },
  { term: "Backmarker / Lapped Car", cat: "Racing", catColor: "#888", def: "A car that has been lapped (passed) by the race leader. Blue flags are waved to instruct backmarkers to let faster cars through. Failure to respond to blue flags results in penalties." },
  { term: "Blue Flag", cat: "Flags", catColor: "#3671C6", def: "Waved to tell a driver they are about to be lapped and must let the faster car through. Ignoring three blue flags earns a time penalty." },
  { term: "Red Flag", cat: "Flags", catColor: "#e10600", def: "Race stopped. Usually due to a serious accident or unsafe conditions. Cars return to the pit lane. The race restarts from a standing or rolling start, sometimes with a reduced number of laps." },
  { term: "SC Delta", cat: "Safety", catColor: "#ffc800", def: "Under a Virtual Safety Car, drivers must not exceed a target lap time (the VSC delta). Going faster results in a penalty. Teams watch the delta carefully to pit at the optimal moment during the VSC period." },
  { term: "Tow", cat: "Racing", catColor: "#888", def: "The aerodynamic slipstream effect of following closely behind another car. Reduces drag and increases top speed on straights. Used tactically in qualifying — teams sometimes sacrifice their own lap to give a teammate a tow." },
  { term: "Floor", cat: "Tech", catColor: "#00dc78", def: "The underside of the car, which generates the majority of downforce through ground effect in the current regulations. The floor is one of the most sensitive and complex parts of a modern F1 car." },
  { term: "Porpoising", cat: "Tech", catColor: "#00dc78", def: "A bouncing phenomenon experienced by ground-effect cars. When the floor generates too much downforce and stalls aerodynamically, the car bounces violently — a major issue in 2022 when the current regs were introduced." },
  { term: "Budget Cap", cat: "Regulations", catColor: "#e10600", def: "Introduced in 2021, limits each team's annual spending (currently ~$135M). Designed to stop big teams spending their way to dominance. Applies to most operational costs but excludes driver salaries and marketing." },
  { term: "Constructors' Championship", cat: "Championship", catColor: "#cd7f32", def: "The team prize — awarded to the team (constructor) whose two drivers score the most combined points. Arguably more valuable than the drivers' title as it determines prize money and prestige." },
];

const GLOSSARY_CATS = ["All", "Strategy", "Safety", "Regulations", "Tech", "Tyres", "Qualifying", "Racing", "Flags", "Championship", "Timing"];

// ─── RULES DATA ───────────────────────────────────────────────────────────────
const F1_RULES = [
  {
    icon: "🏎️", title: "The 107% Rule",
    plain: "In Q1, every driver must set a lap time within 107% of the fastest time. If they don't, they're not allowed to start the race — unless the stewards make an exception (e.g. a mechanical problem prevented a proper lap).",
    example: "Example: If the fastest Q1 lap is 1:30.000, every driver must go faster than 1:36.300. Anyone slower doesn't start Sunday."
  },
  {
    icon: "🔄", title: "The Two-Compound Rule",
    plain: "Every driver must use at least two different tyre compounds during a dry race (e.g. Soft + Medium). If the race starts behind the Safety Car, or there is a red flag, this rule may be waived depending on circumstances.",
    example: "Example: If you start on Mediums, you must pit at some point and switch to either Softs or Hards — you cannot run Mediums all race."
  },
  {
    icon: "🚫", title: "Track Limits",
    plain: "Drivers must keep at least two wheels inside the white lines that define the track. Going all four wheels outside — even if it's faster — results in that lap time being deleted. In races, repeat violations earn time penalties.",
    example: "Example: Verstappen had his fastest lap deleted at Silverstone 2024 for running wide at Turn 9 with all four wheels outside the white lines."
  },
  {
    icon: "⚖️", title: "Parc Fermé Rules",
    plain: "After Q1 begins, teams can only make limited changes to the car until the race ends. No setup changes allowed — only fixing genuine damage or safety issues. This means the car you qualify in is the car you race in.",
    example: "Example: If it's dry in qualifying but wet race day, teams cannot change their suspension setup. They must race with a dry-weather setup in the wet."
  },
  {
    icon: "🔋", title: "Power Unit Allocation",
    plain: "Each driver gets a limited number of power unit components per season. In 2026, drivers get 4 internal combustion engines, 4 MGU-Ks and other components. Exceeding the allocation triggers automatic grid penalties (5 or 10 places back, or a pit lane start).",
    example: "Example: Verstappen used his 5th ICE at Monza 2023, earning an automatic 10-place grid penalty."
  },
  {
    icon: "🏁", title: "Sprint Weekends",
    plain: "Around 6 races per year use a Sprint format. There is no FP2 or FP3 — instead, Sprint Qualifying sets the grid for a mini race (roughly 1/3 of grand prix distance). Sprint results award half-points (8 down to 1) separately from the main race.",
    example: "Example: At the Bahrain Sprint, Verstappen winning earns 8 points. He then qualifies normally on Saturday evening for Sunday's full grand prix."
  },
  {
    icon: "🔵", title: "Blue Flag Rules",
    plain: "When a driver is about to be lapped by a car more than one lap ahead, marshals wave blue flags. The slower driver must let the faster car past within three flag signals. Ignoring blue flags earns a 5-second time penalty.",
    example: "Example: If the race leader is about to lap Bottas, blue flags appear. Bottas must move aside at the next corner or DRS zone."
  },
  {
    icon: "⏱️", title: "Time Penalties",
    plain: "Stewards issue time penalties (5s, 10s) for infringements like unsafe releases, ignoring blue flags, or causing collisions. The time is added to your final race time. A drive-through or stop-go penalty must be served physically in the pits.",
    example: "Example: Hamilton gets a 5-second penalty for forcing a rival off track. If he finishes 3 seconds ahead of the car behind, that car is promoted above him."
  },
  {
    icon: "🌧️", title: "Wet Weather Rules",
    plain: "In wet conditions, only Intermediates or Full Wet tyres can be used (slick tyres are too dangerous). The race director decides when conditions are safe to run slicks again. A Safety Car start may be used if it's too wet to race at full speed.",
    example: "Example: At Spa 2021, the race was started behind the Safety Car due to heavy rain, completed only 2 laps, and counted as a half-points race."
  },
  {
    icon: "🏆", title: "The Concorde Agreement",
    plain: "The commercial contract between F1, the FIA and all teams that governs how prize money is split, how teams vote on rule changes, and the overall structure of the sport. Teams must sign it to compete. Its details are kept confidential.",
    example: "Example: When Andretti tried to enter F1 in 2024, existing teams had influence over the process partly because of commercial rights protections in the Concorde Agreement."
  },
];

// ─── CAR COMPARISON DATA ─────────────────────────────────────────────────────
const CAR_COMPARE = [
  { aspect: "Power Unit", icon: "⚡", col2025: "1.6L V6 Turbo Hybrid\n~1,000 bhp total\n~80% ICE / ~20% electric", col2026: "1.6L V6 Turbo Hybrid\n~1,200 bhp total\n~50% ICE / ~50% electric", winner: 2026, note: "Massive increase in electrical power — completely changes engine architecture." },
  { aspect: "ERS Output", icon: "🔋", col2025: "MGU-K: 120 kW\nMGU-H: yes\n~160 bhp electric boost", col2026: "MGU-K: 350 kW\nMGU-H: removed\n~470 bhp electric boost", winner: 2026, note: "The MGU-H (complex, expensive) is removed. MGU-K power nearly triples." },
  { aspect: "Aerodynamics", icon: "💨", col2025: "Fixed wings\nDRS opens rear wing\nGround effect floor", col2026: "Active aero — moveable front & rear wings\nNo DRS\nGround effect retained", winner: 2026, note: "DRS is gone. Cars automatically adjust their aerodynamics for straight-line speed." },
  { aspect: "Weight", icon: "⚖️", col2025: "~798 kg minimum\nHeavier due to complex MGU-H", col2026: "~720 kg target\n~80 kg lighter than 2025", winner: 2026, note: "Removing MGU-H and simplifying components brings weight down significantly." },
  { aspect: "Fuel Type", icon: "⛽", col2025: "E10 fuel (10% bio)\n~110 kg per race", col2026: "E20 fuel (20% bio) minimum\nLess fuel needed due to electrification", winner: 2026, note: "More sustainable fuel — part of F1's path to carbon neutrality by 2030." },
  { aspect: "Overtaking", icon: "🏁", col2025: "DRS-dependent on straights\nDirty air still an issue", col2026: "Active aero replaces DRS\nDesigned for closer racing without artificial aids", winner: 2026, note: "Goal is to make overtaking feel more natural and less dependent on DRS highway passes." },
  { aspect: "Cost", icon: "💰", col2025: "PU development frozen\nStabilised costs", col2026: "Brand new PU from scratch\nHuge development costs for new entrants like Audi, Ford/Red Bull", winner: 2025, note: "2026 is extremely expensive for engine manufacturers — a major investment cycle." },
  { aspect: "Tyre Size", icon: "🔴", col2025: "18-inch Pirelli\n(introduced 2022)", col2026: "18-inch Pirelli retained\nSimilar compound range expected", winner: null, note: "No change to tyre specification — continuity across the regulation shift." },
  { aspect: "New Manufacturers", icon: "🏭", col2025: "Mercedes, Ferrari, Renault, Honda, Audi (prep)", col2026: "Mercedes, Ferrari, Audi (works), Ford RBPT, Mercedes (Alpine)\nRenault exit", winner: 2026, note: "Audi enters as a full works constructor. Ford returns to F1. Renault exits as PU supplier." },
  { aspect: "Max Speed", icon: "🚀", col2025: "~360 km/h top speed\nMonza, Baku, Las Vegas", col2026: "Expected ~355–365 km/h\nMore electric torque, less drag with active aero", winner: null, note: "Top speeds likely similar — extra electric power balanced by different aero philosophy." },
];

// ─── ALL-TIME RECORDS DATA ────────────────────────────────────────────────────
const ALL_TIME_RECORDS = [
  {
    icon: "🏆", title: "Most Race Wins",
    rows: [
      { rank: 1, name: "Lewis Hamilton 🇬🇧", value: "103", note: "2007–present" },
      { rank: 2, name: "Michael Schumacher 🇩🇪", value: "91", note: "1991–2012" },
      { rank: 3, name: "Max Verstappen 🇳🇱", value: "62+", note: "2015–present" },
      { rank: 4, name: "Sebastian Vettel 🇩🇪", value: "53", note: "2007–2022" },
      { rank: 5, name: "Alain Prost 🇫🇷", value: "51", note: "1980–1993" },
    ]
  },
  {
    icon: "⭐", title: "Most Championships",
    rows: [
      { rank: 1, name: "Lewis Hamilton 🇬🇧", value: "7", note: "2008, 2014–2015, 2017–2020" },
      { rank: 1, name: "Michael Schumacher 🇩🇪", value: "7", note: "1994–1995, 2000–2004" },
      { rank: 3, name: "Max Verstappen 🇳🇱", value: "4", note: "2021–2024" },
      { rank: 3, name: "Alain Prost 🇫🇷", value: "4", note: "1985–1986, 1989, 1993" },
      { rank: 3, name: "Ayrton Senna 🇧🇷", value: "3", note: "1988, 1990–1991" },
    ]
  },
  {
    icon: "🎯", title: "Most Pole Positions",
    rows: [
      { rank: 1, name: "Lewis Hamilton 🇬🇧", value: "104", note: "2007–present" },
      { rank: 2, name: "Michael Schumacher 🇩🇪", value: "68", note: "1991–2012" },
      { rank: 3, name: "Ayrton Senna 🇧🇷", value: "65", note: "1984–1994" },
      { rank: 4, name: "Sebastian Vettel 🇩🇪", value: "57", note: "2007–2022" },
      { rank: 5, name: "Max Verstappen 🇳🇱", value: "42+", note: "2015–present" },
    ]
  },
  {
    icon: "⚡", title: "Most Fastest Laps",
    rows: [
      { rank: 1, name: "Michael Schumacher 🇩🇪", value: "77", note: "1991–2012" },
      { rank: 2, name: "Lewis Hamilton 🇬🇧", value: "67", note: "2007–present" },
      { rank: 3, name: "Kimi Räikkönen 🇫🇮", value: "46", note: "2001–2021" },
      { rank: 4, name: "Alain Prost 🇫🇷", value: "41", note: "1980–1993" },
      { rank: 5, name: "Max Verstappen 🇳🇱", value: "33+", note: "2015–present" },
    ]
  },
  {
    icon: "🏁", title: "Most Race Starts",
    rows: [
      { rank: 1, name: "Fernando Alonso 🇪🇸", value: "400+", note: "2001–present" },
      { rank: 2, name: "Lewis Hamilton 🇬🇧", value: "350+", note: "2007–present" },
      { rank: 3, name: "Kimi Räikkönen 🇫🇮", value: "349", note: "2001–2021" },
      { rank: 4, name: "Rubens Barrichello 🇧🇷", value: "326", note: "1993–2011" },
      { rank: 5, name: "Michael Schumacher 🇩🇪", value: "308", note: "1991–2012" },
    ]
  },
  {
    icon: "🏅", title: "Most Podiums",
    rows: [
      { rank: 1, name: "Lewis Hamilton 🇬🇧", value: "201", note: "2007–present" },
      { rank: 2, name: "Michael Schumacher 🇩🇪", value: "155", note: "1991–2012" },
      { rank: 3, name: "Sebastian Vettel 🇩🇪", value: "122", note: "2007–2022" },
      { rank: 4, name: "Max Verstappen 🇳🇱", value: "112+", note: "2015–present" },
      { rank: 5, name: "Alain Prost 🇫🇷", value: "106", note: "1980–1993" },
    ]
  },
];

// ─── GLOSSARY SECTION ─────────────────────────────────────────────────────────
function GlossarySection() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [expanded, setExpanded] = useState({});

  const filtered = GLOSSARY.filter(g => {
    const q = search.toLowerCase();
    const matchSearch = g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q);
    const matchCat = cat === "All" || g.cat === cat;
    return matchSearch && matchCat;
  });

  return (
    <div>
      <div className="section-title">F1 <span>Glossary</span></div>
      <div className="section-line" />
      <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.7, marginBottom: 16 }}>
        Every term you'll hear during a race weekend — explained in plain English. Tap any card to expand.
      </p>
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input className="search-input" placeholder="Search terms..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="filter-row">
        {GLOSSARY_CATS.map(c => (
          <button key={c} className={`filter-pill${cat === c ? " active" : ""}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      <div className="glossary-grid">
        {filtered.map(g => (
          <div key={g.term} className="glossary-card" onClick={() => setExpanded(e => ({ ...e, [g.term]: !e[g.term] }))}>
            <div className="glossary-term">
              <span>{g.term}</span>
              <span>
                <span className="glossary-cat" style={{ background: g.catColor + "22", color: g.catColor, border: `1px solid ${g.catColor}44` }}>{g.cat}</span>
                <span style={{ color: "var(--text3)", marginLeft: 8, fontSize: 10 }}>{expanded[g.term] ? "▲" : "▼"}</span>
              </span>
            </div>
            {expanded[g.term] && <div className="glossary-def">{g.def}</div>}
            {!expanded[g.term] && <div className="glossary-def" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{g.def}</div>}
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div style={{ color: "var(--text3)", textAlign: "center", padding: 40 }}>No terms found</div>}
    </div>
  );
}

// ─── RULES SECTION ────────────────────────────────────────────────────────────
function RulesSection() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <div className="section-title">Explain <span>The Rules</span></div>
      <div className="section-line" />
      <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.7, marginBottom: 20 }}>
        F1's rulebook is enormous. Here are the most confusing rules explained the way a friend would explain them — with real examples.
      </p>
      {F1_RULES.map((rule, i) => (
        <div key={i} className="rule-card">
          <div className="rule-header" onClick={() => setOpen(open === i ? null : i)}>
            <span className="rule-icon">{rule.icon}</span>
            <span className="rule-title">{rule.title}</span>
            <span className={`rule-chevron${open === i ? " open" : ""}`}>▼</span>
          </div>
          {open === i && (
            <div className="rule-body">
              <p className="rule-plain">{rule.plain}</p>
              <div className="rule-example">📌 {rule.example}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── CAR COMPARISON SECTION ───────────────────────────────────────────────────
function CarCompareSection() {
  return (
    <div>
      <div className="section-title">2025 vs <span>2026 Cars</span></div>
      <div className="section-line" />
      <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.7, marginBottom: 20 }}>
        2026 is the biggest regulation reset since 2014. Here's exactly what's changed between the two eras, side by side.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table className="compare-table" style={{ minWidth: 600 }}>
          <thead>
            <tr>
              <th style={{ background: "var(--card-bg)", color: "var(--text3)", width: 120 }}>Aspect</th>
              <th style={{ background: "var(--bg3)", color: "var(--text2)", width: "38%" }}>2025 Car</th>
              <th style={{ background: "#1a0505", color: "#e10600", width: "38%" }}>2026 Car</th>
            </tr>
          </thead>
          <tbody>
            {CAR_COMPARE.map(row => (
              <tr key={row.aspect}>
                <td>
                  <div style={{ fontSize: 16, marginBottom: 3 }}>{row.icon}</div>
                  <div className="compare-aspect">{row.aspect}</div>
                </td>
                <td style={{ borderLeft: "1px solid var(--border)", background: row.winner === 2025 ? "rgba(0,220,120,0.04)" : "transparent" }}>
                  {row.winner === 2025 && <span className="compare-badge" style={{ background: "rgba(0,220,120,0.15)", color: "#00dc78", border: "1px solid rgba(0,220,120,0.3)" }}>BETTER</span>}
                  <div style={{ whiteSpace: "pre-line", color: "var(--text2)", fontSize: 12, lineHeight: 1.7 }}>{row.col2025}</div>
                </td>
                <td style={{ borderLeft: "1px solid var(--border)", background: row.winner === 2026 ? "rgba(225,6,0,0.04)" : "transparent" }}>
                  {row.winner === 2026 && <span className="compare-badge" style={{ background: "rgba(225,6,0,0.12)", color: "#e10600", border: "1px solid rgba(225,6,0,0.3)" }}>NEW ERA</span>}
                  <div style={{ whiteSpace: "pre-line", color: row.winner === 2026 ? "#fff" : "#aaa", fontSize: 12, lineHeight: 1.7 }}>{row.col2026}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card" style={{ marginTop: 20, borderLeft: "3px solid #e10600" }}>
        <div style={{ fontFamily: "Orbitron", fontSize: 10, color: "#e10600", letterSpacing: 2, marginBottom: 8 }}>THE BIG PICTURE</div>
        <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.8 }}>
          The 2026 regulations represent the most ambitious overhaul in F1 history. The shift to 50/50 electric/combustion power, the removal of DRS, active aerodynamics, and the arrival of Audi and Ford all happen simultaneously. Every team starts from scratch. History shows that regulation resets create new winners — 2026 could change everything.
        </p>
      </div>
    </div>
  );
}

// ─── RECORDS SECTION ──────────────────────────────────────────────────────────
function RecordsSection() {
  return (
    <div>
      <div className="section-title">All-Time <span>Records</span></div>
      <div className="section-line" />
      <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.7, marginBottom: 20 }}>
        F1 spans 75+ years and hundreds of drivers. Here are the records that define greatness.
      </p>
      <div className="records-grid">
        {ALL_TIME_RECORDS.map(cat => (
          <div key={cat.title} className="record-card">
            <div className="record-header">
              <span className="record-icon">{cat.icon}</span>
              <span className="record-title">{cat.title}</span>
            </div>
            <div className="record-body">
              {cat.rows.map((row, i) => (
                <div key={i} className="record-row">
                  <span className="record-rank" style={{ color: row.rank === 1 ? "#ffd700" : row.rank === 2 ? "#c0c0c0" : row.rank === 3 ? "#cd7f32" : "#444" }}>
                    {row.rank === 1 ? "🥇" : row.rank === 2 ? "🥈" : row.rank === 3 ? "🥉" : `#${row.rank}`}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="record-driver-name">{row.name}</div>
                    <div style={{ fontSize: 10, color: "var(--text4)", marginTop: 1 }}>{row.note}</div>
                  </div>
                  <span className="record-value">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, padding: 14, background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 2, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--text4)" }}>Records current as of 2026 season start · Active drivers' stats marked with +</div>
      </div>
    </div>
  );
}

// ─── 2026 Race Calendar ──────────────────────────────────────────────────────
const RACE_CALENDAR_2026 = [
  { round: 1,  flag: "🇦🇺", name: "Australian GP",       circuit: "Albert Park",              date: "2026-03-08T05:00:00Z",  laps: 58, length: "5.278 km", lapRecord: "1:20.235 (Bottas, 2023)",          drs: 3, tags: ["Street-adjacent","Fast","Overtaking"],          desc: "The season opener in Melbourne. A fast, flowing street-adjacent circuit that rewards car balance. The Albert Park lake provides a stunning backdrop." },
  { round: 2,  flag: "🇨🇳", name: "Chinese GP",           circuit: "Shanghai",                 date: "2026-03-15T07:00:00Z",  laps: 56, length: "5.451 km", lapRecord: "1:32.238 (M.Schumacher, 2004)",    drs: 2, tags: ["High-deg","Technical","Sprint"],                  desc: "Shanghai's long back straight enables DRS battles. Tyres take a heavy hit through the sweeping final sector. A Sprint weekend." },
  { round: 3,  flag: "🇯🇵", name: "Japanese GP",          circuit: "Suzuka",                   date: "2026-03-29T05:00:00Z",  laps: 53, length: "5.807 km", lapRecord: "1:30.983 (Verstappen, 2023)",      drs: 2, tags: ["Driver Favourite","Figure-8","High Speed"],       desc: "One of the most beloved circuits in the world. Suzuka's figure-of-eight layout and legendary corners like 130R and the Esses make it a true driver's circuit." },
  { round: 4,  flag: "🇧🇭", name: "Bahrain GP",           circuit: "Bahrain International",    date: "2026-04-12T15:00:00Z",  laps: 57, length: "5.412 km", lapRecord: "1:31.447 (De La Rosa, 2005)",      drs: 3, tags: ["Night Race","High Deg","Dusty"],                  desc: "Run under floodlights, Bahrain is famous for heavy tyre degradation and sandy, abrasive asphalt. Sector 2's flowing middle section rewards mechanical grip." },
  { round: 5,  flag: "🇸🇦", name: "Saudi Arabian GP",     circuit: "Jeddah Corniche",          date: "2026-04-19T17:00:00Z",  laps: 50, length: "6.174 km", lapRecord: "1:30.734 (Verstappen, 2021)",      drs: 3, tags: ["Fastest Street","Night Race","Walls"],             desc: "The fastest street circuit on the calendar. Walls are millimetres away at 300+ km/h. Safety cars are virtually guaranteed. Terrifying and spectacular in equal measure." },
  { round: 6,  flag: "🇺🇸", name: "Miami GP",             circuit: "Miami International",      date: "2026-05-03T19:00:00Z",  laps: 57, length: "5.412 km", lapRecord: "1:29.708 (Verstappen, 2023)",      drs: 3, tags: ["Street","Spectacle","Sprint"],                   desc: "F1's glamorous American showcase. Built around the Hard Rock Stadium. The fake marina is iconic. A Sprint weekend." },
  { round: 7,  flag: "🇨🇦", name: "Canadian GP",          circuit: "Gilles Villeneuve",        date: "2026-05-24T18:00:00Z",  laps: 70, length: "4.361 km", lapRecord: "1:13.078 (Bottas, 2019)",          drs: 3, tags: ["Wall of Champions","Braking","Sprint"],            desc: "The legendary Wall of Champions has claimed countless cars. Heavy braking zones and long straights create genuine overtaking. A Sprint weekend." },
  { round: 8,  flag: "🇲🇨", name: "Monaco GP",            circuit: "Circuit de Monaco",        date: "2026-06-07T13:00:00Z",  laps: 78, length: "3.337 km", lapRecord: "1:12.909 (Leclerc, 2024)",         drs: 1, tags: ["Iconic","No Overtaking","Prestige"],               desc: "The jewel of the F1 calendar. Impossibly narrow streets, yachts in the harbour, zero overtaking. Monaco is about qualifying — P1 Saturday usually means P1 Sunday." },
  { round: 9,  flag: "🇪🇸", name: "Barcelona-Catalunya GP",circuit: "Circuit de Barcelona-Catalunya", date: "2026-06-14T13:00:00Z", laps: 66, length: "4.657 km", lapRecord: "1:16.330 (Verstappen, 2023)", drs: 2, tags: ["Benchmark","High Deg","Testing Venue"],           desc: "Teams know this circuit better than any other — F1's main winter testing venue. A true benchmark for car performance. The Spanish GP name moves to Madrid in 2026." },
  { round: 10, flag: "🇦🇹", name: "Austrian GP",          circuit: "Red Bull Ring",            date: "2026-06-28T13:00:00Z",  laps: 71, length: "4.318 km", lapRecord: "1:05.619 (Leclerc, 2020)",         drs: 3, tags: ["Short Lap","High Speed","Spectacle"],             desc: "One of F1's shortest laps but packed with high-speed corners. Tifosi and Orange Army fans make the grandstands a cauldron." },
  { round: 11, flag: "🇬🇧", name: "British GP",           circuit: "Silverstone",              date: "2026-07-05T14:00:00Z",  laps: 52, length: "5.891 km", lapRecord: "1:27.097 (Hamilton, 2020)",        drs: 2, tags: ["High Speed","Home Race","Sprint"],                desc: "Home of British motorsport. Maggotts-Becketts-Chapel is arguably the most spectacular sequence in F1. A Sprint weekend." },
  { round: 12, flag: "🇧🇪", name: "Belgian GP",           circuit: "Spa-Francorchamps",        date: "2026-07-19T13:00:00Z",  laps: 44, length: "7.004 km", lapRecord: "1:46.286 (Bottas, 2018)",          drs: 2, tags: ["Longest Circuit","Eau Rouge","Weather"],           desc: "The greatest circuit in the world according to many drivers. Eau Rouge/Raidillon is breathtaking. Weather can change lap by lap — dry, wet, and back again." },
  { round: 13, flag: "🇭🇺", name: "Hungarian GP",         circuit: "Hungaroring",              date: "2026-07-26T13:00:00Z",  laps: 70, length: "4.381 km", lapRecord: "1:16.627 (Hamilton, 2020)",        drs: 2, tags: ["Monaco of non-streets","Hot","Tactical"],          desc: "Often called the Monaco of non-street circuits for its lack of overtaking. Extremely hot and physically demanding. Strategy and qualifying are everything." },
  { round: 14, flag: "🇳🇱", name: "Dutch GP",             circuit: "Zandvoort",                date: "2026-08-23T13:00:00Z",  laps: 72, length: "4.259 km", lapRecord: "1:11.097 (Verstappen, 2023)",      drs: 2, tags: ["Banked Corners","Orange Army","Sprint"],            desc: "The final Dutch GP on the calendar — Zandvoort drops off after 2026. Unique banked corners. A Sprint weekend. The Orange Army goes all out for one last home race." },
  { round: 15, flag: "🇮🇹", name: "Italian GP",           circuit: "Monza",                    date: "2026-09-06T13:00:00Z",  laps: 53, length: "5.793 km", lapRecord: "1:21.046 (Barrichello, 2004)",     drs: 3, tags: ["Temple of Speed","Slipstream","Tifosi"],           desc: "The Temple of Speed. Monza is all about raw horsepower and slipstreaming battles. The Tifosi are some of sport's most passionate fans. Engine manufacturers' playground." },
  { round: 16, flag: "🇪🇸", name: "Spanish GP",           circuit: "Madrid Street Circuit",    date: "2026-09-13T13:00:00Z",  laps: 0,  length: "TBC",       lapRecord: "N/A — debut race",                drs: 0, tags: ["NEW VENUE","Street","Madrid Debut"],                 desc: "Madrid makes its F1 debut in 2026. The Spanish GP moves from Barcelona to a brand new street circuit built around the IFEMA convention centre in the Spanish capital." },
  { round: 17, flag: "🇦🇿", name: "Azerbaijan GP",        circuit: "Baku City Circuit",        date: "2026-09-26T11:00:00Z",  laps: 51, length: "6.003 km", lapRecord: "1:43.009 (Leclerc, 2019)",         drs: 2, tags: ["Street","Chaos","Saturday Race"],                  desc: "Baku is F1's chaos capital — and in 2026 it's a Saturday race. The longest straight on the calendar leads into an incredibly tight castle section. Drama guaranteed." },
  { round: 18, flag: "🇸🇬", name: "Singapore GP",         circuit: "Marina Bay",               date: "2026-10-11T12:00:00Z",  laps: 62, length: "4.940 km", lapRecord: "1:35.867 (Russell, 2023)",         drs: 3, tags: ["Night Race","Street","Sprint"],                    desc: "The original night race. Stifling humidity and heat make it the most physically demanding event of the year. A Sprint weekend." },
  { round: 19, flag: "🇺🇸", name: "US GP",                circuit: "Circuit of the Americas",  date: "2026-10-25T19:00:00Z",  laps: 56, length: "5.513 km", lapRecord: "1:36.169 (Hamilton, 2019)",        drs: 2, tags: ["Undulation","Turn 1","Fan Favourite"],              desc: "COTA's dramatic uphill Turn 1 is one of the most iconic starts in F1. Huge elevation changes throughout the lap. Austin fans bring serious American energy." },
  { round: 20, flag: "🇲🇽", name: "Mexican GP",           circuit: "Hermanos Rodríguez",       date: "2026-11-01T20:00:00Z",  laps: 71, length: "4.304 km", lapRecord: "1:17.774 (Bottas, 2021)",          drs: 3, tags: ["High Altitude","Low Downforce","Party"],            desc: "High altitude (2,240m) means thin air — engine power is reduced, and downforce behaves differently. Mexico City fans are the most passionate on the calendar." },
  { round: 21, flag: "🇧🇷", name: "Brazilian GP",         circuit: "Interlagos",               date: "2026-11-08T17:00:00Z",  laps: 71, length: "4.309 km", lapRecord: "1:10.540 (Barrichello, 2004)",     drs: 2, tags: ["Sprint","Anticlockwise","Dramatic"],              desc: "Interlagos runs anticlockwise. The atmosphere is electric — Brazilian fans are legendary. The circuit has produced some of the greatest moments in F1 history." },
  { round: 22, flag: "🇺🇸", name: "Las Vegas GP",         circuit: "Las Vegas Strip",          date: "2026-11-21T06:00:00Z",  laps: 50, length: "6.201 km", lapRecord: "1:35.490 (Leclerc, 2023)",         drs: 2, tags: ["Night Race","Saturday Race","Spectacle"],           desc: "F1 on the Strip — a Saturday night race. The longest night race on the calendar through the neon heart of Las Vegas. Bitterly cold conditions create tyre drama." },
  { round: 23, flag: "🇶🇦", name: "Qatar GP",             circuit: "Lusail",                   date: "2026-11-29T15:00:00Z",  laps: 57, length: "5.380 km", lapRecord: "1:24.319 (Russell, 2023)",         drs: 2, tags: ["Sprint","High Speed","Night"],                    desc: "Lusail is a flowing, high-speed circuit under lights. Heavy tyre degradation and physically demanding corners. A Sprint weekend." },
  { round: 24, flag: "🇦🇪", name: "Abu Dhabi GP",         circuit: "Yas Marina",               date: "2026-12-06T13:00:00Z",  laps: 58, length: "5.281 km", lapRecord: "1:26.103 (Leclerc, 2023)",         drs: 3, tags: ["Season Finale","Twilight","Championships"],        desc: "The season finale. Yas Marina runs from sunset into night — stunning visually. Championships are won and lost here, and it's where the paddock says goodbye for another year." },
];

// ─── QUIZ DATA ────────────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  { q: "How many points does the race winner receive?", options: ["10", "25", "18", "30"], answer: 1, exp: "The winner gets 25 points. The system was introduced in 2010, replacing the old 10-point maximum." },
  { q: "What does DRS stand for?", options: ["Drag Reduction System", "Dynamic Racing Speed", "Direct Response Steering", "Dual Rotation System"], answer: 0, exp: "Drag Reduction System — a moveable rear wing flap that reduces aerodynamic drag on straights, giving a speed boost of ~10-15 km/h." },
  { q: "Which circuit is known as the 'Temple of Speed'?", options: ["Silverstone", "Spa-Francorchamps", "Monza", "Suzuka"], answer: 2, exp: "Monza in Italy earns the title thanks to its long straights, high average speeds, and passionate Tifosi crowd." },
  { q: "How many constructors' championships has Red Bull won?", options: ["3", "4", "5", "6"], answer: 3, exp: "Red Bull won 6 constructors' titles: 2010, 2011, 2012, 2013, 2022, and 2023." },
  { q: "What is the minimum number of tyre compounds a driver must use in a race?", options: ["1", "2", "3", "4"], answer: 1, exp: "Drivers must use at least two different compounds during a dry race — typically a mix of soft, medium, or hard tyres." },
  { q: "Which driver holds the record for most F1 race wins?", options: ["Michael Schumacher", "Ayrton Senna", "Max Verstappen", "Lewis Hamilton"], answer: 3, exp: "Lewis Hamilton holds the record with 103 wins, ahead of Michael Schumacher's 91." },
  { q: "What does VSC stand for?", options: ["Variable Speed Circuit", "Virtual Safety Car", "Vehicle Speed Control", "Visibility Safety Check"], answer: 1, exp: "Virtual Safety Car — introduced in 2015. All drivers must slow to a delta time. Unlike a real Safety Car, gaps between cars are frozen." },
  { q: "How many teams competed in the 2026 F1 season?", options: ["9", "10", "11", "12"], answer: 2, exp: "11 teams raced in 2026 — the 10 existing constructors plus Cadillac, who joined as F1's first new team since Haas in 2016." },
  { q: "What is 'parc fermé'?", options: ["A French race circuit", "The area where cars are impounded after qualifying", "The pit lane entry zone", "The drivers' briefing room"], answer: 1, exp: "Parc fermé means 'closed park' in French. After qualifying, cars are sealed — teams cannot make significant changes before the race." },
  { q: "What new power unit rule arrives in 2026?", options: ["All-electric engines", "50/50 split between electric and combustion power", "Hydrogen fuel cells", "Elimination of turbochargers"], answer: 1, exp: "2026 introduces a power unit with roughly equal split between the combustion engine and the Motor Generator Unit-Heat (MGU-H removed), delivering approximately 50% of power electrically." },
  { q: "What is the 'undercut' strategy?", options: ["Driving under the safety car line", "Pitting before your rival to gain track position with fresh tyres", "Cutting chicanes to gain time", "Using soft tyres at the start"], answer: 1, exp: "The undercut means pitting before your rival. Fresh tyres give you a pace advantage, so when they pit, you can emerge ahead of them." },
  { q: "Which country hosts the Monaco Grand Prix?", options: ["France", "Italy", "Monaco", "Switzerland"], answer: 2, exp: "Monaco is an independent city-state on the French Riviera. The Monaco GP is the most glamorous and prestigious race on the calendar." },
  { q: "What does 'DNF' mean in F1?", options: ["Did Not Finish", "Did Not Fuel", "Driver Not Fast", "Denied No Fault"], answer: 0, exp: "DNF stands for Did Not Finish — awarded when a driver retires from the race due to mechanical failure, accident, or other issues." },
  { q: "How many laps is the Monaco Grand Prix?", options: ["56", "63", "78", "70"], answer: 2, exp: "Monaco runs 78 laps of its 3.337 km circuit — one of the shortest on the calendar but requiring enormous concentration." },
  { q: "Which team did Lewis Hamilton join for the 2025 season?", options: ["Mercedes", "Red Bull", "Ferrari", "McLaren"], answer: 2, exp: "Hamilton made his long-anticipated move to Ferrari for 2025, partnering Charles Leclerc in arguably the most anticipated driver pairing in F1 history." },
];

function QuizSection() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  const q = QUIZ_QUESTIONS[current];

  function pick(idx) {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === q.answer;
    if (correct) setScore(s => s + 1);
    setAnswers(a => [...a, { correct, selected: idx }]);
  }

  function next() {
    if (current + 1 >= QUIZ_QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  }

  function restart() {
    setCurrent(0); setSelected(null); setScore(0); setFinished(false); setAnswers([]);
  }

  const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
  const grade = pct >= 90 ? "🏆 F1 Expert" : pct >= 70 ? "🥈 Solid Fan" : pct >= 50 ? "🥉 Getting There" : "📚 Keep Learning";

  if (finished) return (
    <div>
      <div className="section-title">F1 <span>Quiz</span></div>
      <div className="section-line" />
      <div className="card" style={{ textAlign: "center", padding: "40px 20px", marginBottom: 24 }}>
        <div style={{ fontFamily: "Orbitron", fontSize: 40, marginBottom: 12 }}>{grade.split(" ")[0]}</div>
        <div style={{ fontFamily: "Orbitron", fontSize: 18, fontWeight: 900, color: "#e10600", marginBottom: 8 }}>{grade.split(" ").slice(1).join(" ")}</div>
        <div style={{ fontSize: 32, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{score} / {QUIZ_QUESTIONS.length}</div>
        <div style={{ fontSize: 14, color: "var(--text3)", marginBottom: 24 }}>{pct}% correct</div>
        <button onClick={restart} style={{ padding: "10px 28px", background: "#e10600", border: "none", color: "var(--text)", fontFamily: "Orbitron", fontSize: 11, letterSpacing: 2, cursor: "pointer", borderRadius: 2 }}>TRY AGAIN</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,280px),1fr))", gap: 10 }}>
        {QUIZ_QUESTIONS.map((q, i) => (
          <div key={i} style={{ background: "var(--card-bg)", border: `1px solid ${answers[i]?.correct ? "rgba(0,220,120,0.3)" : "rgba(225,6,0,0.3)"}`, borderRadius: 4, padding: 12 }}>
            <div style={{ fontSize: 11, color: answers[i]?.correct ? "#00dc78" : "#e10600", fontFamily: "Orbitron", letterSpacing: 1, marginBottom: 6 }}>{answers[i]?.correct ? "✓ CORRECT" : "✗ WRONG"}</div>
            <div style={{ fontSize: 12, color: "var(--text)", marginBottom: 6 }}>{q.q}</div>
            {!answers[i]?.correct && <div style={{ fontSize: 11, color: "#00dc78" }}>✓ {q.options[q.answer]}</div>}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="section-title">F1 <span>Quiz</span></div>
      <div className="section-line" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: "var(--text3)" }}>Question {current + 1} of {QUIZ_QUESTIONS.length}</span>
        <span style={{ fontFamily: "Orbitron", fontSize: 11, color: "#e10600" }}>{score} pts</span>
      </div>
      <div className="quiz-progress"><div className="quiz-progress-fill" style={{ width: `${((current) / QUIZ_QUESTIONS.length) * 100}%` }} /></div>
      <div className="card" style={{ marginBottom: 20, padding: "24px 20px" }}>
        <div style={{ fontFamily: "Orbitron", fontSize: 9, color: "#e10600", letterSpacing: 2, marginBottom: 12 }}>QUESTION {current + 1}</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", lineHeight: 1.5, marginBottom: 24 }}>{q.q}</div>
        {q.options.map((opt, i) => (
          <button key={i} disabled={selected !== null} onClick={() => pick(i)}
            className={`quiz-option${selected !== null ? (i === q.answer ? " correct" : i === selected ? " wrong" : "") : ""}`}>
            <span style={{ fontFamily: "Orbitron", fontSize: 10, minWidth: 20, color: "inherit" }}>{String.fromCharCode(65 + i)}</span>
            {opt}
          </button>
        ))}
        {selected !== null && (
          <div style={{ marginTop: 16, padding: "12px 14px", background: "rgba(225,6,0,0.04)", border: "1px solid rgba(225,6,0,0.15)", borderRadius: 4 }}>
            <div style={{ fontSize: 11, color: "#e10600", fontFamily: "Orbitron", letterSpacing: 1, marginBottom: 6 }}>EXPLANATION</div>
            <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.7 }}>{q.exp}</p>
            <button onClick={next} style={{ marginTop: 12, padding: "8px 20px", background: "#e10600", border: "none", color: "var(--text)", fontFamily: "Orbitron", fontSize: 10, letterSpacing: 2, cursor: "pointer", borderRadius: 2 }}>
              {current + 1 >= QUIZ_QUESTIONS.length ? "SEE RESULTS" : "NEXT →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── RACE PREDICTOR ───────────────────────────────────────────────────────────
const ACTIVE_DRIVERS_2026 = [
  { name: "Max Verstappen", team: "Red Bull", color: "#3671C6", short: "VER" },
  { name: "Isack Hadjar", team: "Red Bull", color: "#3671C6", short: "HAD" },
  { name: "Lewis Hamilton", team: "Ferrari", color: "#E8002D", short: "HAM" },
  { name: "Charles Leclerc", team: "Ferrari", color: "#E8002D", short: "LEC" },
  { name: "Lando Norris", team: "McLaren", color: "#FF8000", short: "NOR" },
  { name: "Oscar Piastri", team: "McLaren", color: "#FF8000", short: "PIA" },
  { name: "George Russell", team: "Mercedes", color: "#27F4D2", short: "RUS" },
  { name: "Kimi Antonelli", team: "Mercedes", color: "#27F4D2", short: "ANT" },
  { name: "Fernando Alonso", team: "Aston Martin", color: "#229971", short: "ALO" },
  { name: "Lance Stroll", team: "Aston Martin", color: "#229971", short: "STR" },
  { name: "Pierre Gasly", team: "Alpine", color: "#0093CC", short: "GAS" },
  { name: "Franco Colapinto", team: "Alpine", color: "#0093CC", short: "COL" },
  { name: "Esteban Ocon", team: "Haas", color: "#B6BABD", short: "OCO" },
  { name: "Oliver Bearman", team: "Haas", color: "#B6BABD", short: "BEA" },
  { name: "Carlos Sainz", team: "Williams", color: "#64C4FF", short: "SAI" },
  { name: "Alexander Albon", team: "Williams", color: "#64C4FF", short: "ALB" },
  { name: "Liam Lawson", team: "Racing Bulls", color: "#6692FF", short: "LAW" },
  { name: "Arvid Lindblad", team: "Racing Bulls", color: "#6692FF", short: "LIN" },
  { name: "Nico Hülkenberg", team: "Audi", color: "#BB0A21", short: "HUL" },
  { name: "Gabriel Bortoleto", team: "Audi", color: "#BB0A21", short: "BOR" },
  { name: "Valtteri Bottas", team: "Cadillac", color: "#CC0000", short: "BOT" },
  { name: "Sergio Perez", team: "Cadillac", color: "#CC0000", short: "PER" },
];

function RacePredictorSection() {
  const [picks, setPicks] = useState(Array(10).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const nextRace = RACE_CALENDAR_2026.find(r => new Date(r.date) > new Date()) || RACE_CALENDAR_2026[RACE_CALENDAR_2026.length - 1];
  const selectedIds = picks.filter(Boolean).map(d => d.name);

  function pick(driver) {
    if (selectedIds.includes(driver.name)) return;
    const firstEmpty = picks.findIndex(p => p === null);
    if (firstEmpty === -1) return;
    const newPicks = [...picks];
    newPicks[firstEmpty] = driver;
    setPicks(newPicks);
  }

  function removeSlot(i) {
    const newPicks = [...picks];
    newPicks[i] = null;
    // compact — shift remaining picks up
    const compacted = newPicks.filter(Boolean);
    while (compacted.length < 10) compacted.push(null);
    setPicks(compacted);
  }

  function reset() { setPicks(Array(10).fill(null)); setSubmitted(false); }

  const complete = picks.every(Boolean);

  return (
    <div>
      <div className="section-title">Race <span>Predictor</span></div>
      <div className="section-line" />
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", background: "rgba(225,6,0,0.08)", border: "1px solid rgba(225,6,0,0.2)", borderRadius: 2, marginBottom: 20 }}>
        <span style={{ fontSize: 14 }}>{nextRace.flag}</span>
        <span style={{ fontFamily: "Orbitron", fontSize: 11, color: "#e10600", letterSpacing: 1 }}>NEXT RACE: {nextRace.name} · Round {nextRace.round}</span>
      </div>
      <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.7, marginBottom: 20 }}>Pick your predicted top 10 finishers in order. Tap a driver to add them to your prediction — tap a slot to remove.</p>

      {submitted ? (
        <div>
          <div className="card" style={{ textAlign: "center", padding: "32px 20px", marginBottom: 20, borderColor: "#00dc78" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🏁</div>
            <div style={{ fontFamily: "Orbitron", fontSize: 14, color: "#00dc78", letterSpacing: 2, marginBottom: 8 }}>PREDICTION LOCKED IN!</div>
            <p style={{ fontSize: 12, color: "var(--text3)" }}>Come back after the race to see how you did.</p>
          </div>
          <div style={{ marginBottom: 20 }}>
            {picks.map((d, i) => (
              <div key={i} className="predictor-slot" style={{ borderLeft: `3px solid ${d.color}` }}>
                <span className="predictor-slot-num">P{i + 1}</span>
                <span style={{ fontSize: 12, color: d.color, fontWeight: 700, fontFamily: "Orbitron" }}>{d.short}</span>
                <span style={{ fontSize: 13, color: "var(--text)" }}>{d.name}</span>
                <span style={{ fontSize: 10, color: "var(--text3)", marginLeft: "auto" }}>{d.team}</span>
              </div>
            ))}
          </div>
          <button onClick={reset} style={{ padding: "8px 20px", background: "transparent", border: "1px solid var(--border2)", color: "var(--text2)", fontFamily: "Orbitron", fontSize: 10, letterSpacing: 2, cursor: "pointer", borderRadius: 2 }}>RESET</button>
        </div>
      ) : (
        <div className="predictor-grid">
          {/* Left: pick slots */}
          <div>
            <div style={{ fontFamily: "Orbitron", fontSize: 9, color: "#e10600", letterSpacing: 2, marginBottom: 12 }}>YOUR TOP 10</div>
            {picks.map((d, i) => (
              <div key={i} className="predictor-slot" style={{ borderLeft: `3px solid ${d ? d.color : "var(--border)"}`, cursor: d ? "pointer" : "default" }} onClick={() => d && removeSlot(i)}>
                <span className="predictor-slot-num">P{i + 1}</span>
                {d ? (
                  <>
                    <span style={{ fontSize: 11, color: d.color, fontWeight: 700, fontFamily: "Orbitron" }}>{d.short}</span>
                    <span style={{ fontSize: 12, color: "var(--text)" }}>{d.name}</span>
                    <span style={{ fontSize: 10, color: "var(--text3)", marginLeft: "auto" }}>✕</span>
                  </>
                ) : (
                  <span style={{ fontSize: 11, color: "var(--text4)" }}>— tap a driver —</span>
                )}
              </div>
            ))}
            {complete && (
              <button onClick={() => setSubmitted(true)} style={{ marginTop: 12, width: "100%", padding: "10px", background: "#e10600", border: "none", color: "var(--text)", fontFamily: "Orbitron", fontSize: 11, letterSpacing: 2, cursor: "pointer", borderRadius: 2 }}>
                LOCK IN PREDICTION 🏁
              </button>
            )}
          </div>

          {/* Right: driver list */}
          <div>
            <div style={{ fontFamily: "Orbitron", fontSize: 9, color: "#e10600", letterSpacing: 2, marginBottom: 12 }}>SELECT DRIVERS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 440, overflowY: "auto" }}>
              {ACTIVE_DRIVERS_2026.map(d => {
                const isSelected = selectedIds.includes(d.name);
                return (
                  <button key={d.name} className={`predictor-driver-btn${isSelected ? " selected" : ""}`} onClick={() => pick(d)} disabled={isSelected} style={{ borderLeft: `3px solid ${d.color}` }}>
                    <span style={{ fontFamily: "Orbitron", fontSize: 10, color: d.color, minWidth: 28 }}>{d.short}</span>
                    <span style={{ flex: 1 }}>{d.name}</span>
                    <span style={{ fontSize: 10, color: "var(--text3)" }}>{d.team}</span>
                    {isSelected && <span style={{ fontSize: 10, color: "#00dc78" }}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── NEWS SECTION ─────────────────────────────────────────────────────────────
function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/news")
      .then(r => r.json())
      .then(data => { setNews(data.items || []); setLoading(false); })
      .catch(() => { setError("Could not load news — please try again later."); setLoading(false); });
  }, []);

  function timeAgo(dateStr) {
    const diff = (Date.now() - new Date(dateStr)) / 1000;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  return (
    <div>
      <div className="section-title">F1 <span>News</span></div>
      <div className="section-line" />
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "rgba(0,220,120,0.08)", border: "1px solid rgba(0,220,120,0.25)", borderRadius: 2 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00dc78", boxShadow: "0 0 6px #00dc78" }} />
          <span style={{ fontSize: 10, color: "#00dc78", fontFamily: "Orbitron", letterSpacing: 1 }}>LIVE · Motorsport.com</span>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontFamily: "Orbitron", fontSize: 11, color: "#e10600", letterSpacing: 3 }}>LOADING NEWS...</div>
        </div>
      )}
      {error && <div className="card" style={{ borderColor: "#e10600", padding: 20 }}><p style={{ color: "var(--text3)" }}>{error}</p></div>}
      {!loading && !error && (
        <div className="news-grid">
          {news.map((item, i) => (
            <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="news-card" style={{ textDecoration: "none" }}>
              {item.image && <img src={item.image} alt="" className="news-img" onError={e => e.target.style.display = "none"} />}
              <div className="news-source">Motorsport.com</div>
              <div className="news-title">{item.title}</div>
              <div className="news-date">{timeAgo(item.pubDate)}</div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SESSION TIMES SECTION ────────────────────────────────────────────────────
function SessionTimesSection() {
  const now = new Date();
  const nextRace = RACE_CALENDAR_2026.find(r => new Date(r.date) > now);
  if (!nextRace) return null;

  const raceDate = new Date(nextRace.date);
  // Build session schedule relative to race date
  const isSprint = nextRace.tags?.includes("Sprint");
  const sessions = isSprint ? [
    { label: "FP1", offset: -2 * 86400000 - 3 * 3600000 },
    { label: "Sprint Qualifying", offset: -2 * 86400000 },
    { label: "Sprint Race", offset: -86400000 - 3 * 3600000 },
    { label: "Qualifying", offset: -86400000 },
    { label: "Race", offset: 0 },
  ] : [
    { label: "FP1", offset: -2 * 86400000 - 5 * 3600000 },
    { label: "FP2", offset: -2 * 86400000 - 2 * 3600000 },
    { label: "FP3", offset: -86400000 - 4 * 3600000 },
    { label: "Qualifying", offset: -86400000 - 1 * 3600000 },
    { label: "Race", offset: 0 },
  ];

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const fmtTime = d => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const fmtDate = d => d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ fontFamily: "Orbitron", fontSize: 11, color: "#e10600", letterSpacing: 2 }}>NEXT RACE WEEKEND</div>
        <div style={{ fontFamily: "Orbitron", fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{nextRace.flag} {nextRace.name}</div>
        <div style={{ fontSize: 11, color: "var(--text3)", marginLeft: "auto" }}>Times in your timezone · {tz}</div>
      </div>
      <div className="session-grid">
        {sessions.map(s => {
          const d = new Date(raceDate.getTime() + s.offset);
          const isPast = d < now;
          const isNext = !isPast && sessions.findIndex(x => new Date(raceDate.getTime() + x.offset) > now) === sessions.indexOf(s);
          return (
            <div key={s.label} className="session-card" style={{ borderColor: isNext ? "#e10600" : isPast ? "var(--border)" : "var(--border)", opacity: isPast ? 0.5 : 1, position: "relative", overflow: "hidden" }}>
              {isNext && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#e10600" }} />}
              <div className="session-type">{s.label}</div>
              <div className="session-time">{fmtTime(d)}</div>
              <div className="session-date">{fmtDate(d)}</div>
              {isPast && <div style={{ fontSize: 9, color: "#00dc78", fontFamily: "Orbitron", letterSpacing: 1, marginTop: 4 }}>DONE</div>}
              {isNext && <div style={{ fontSize: 9, color: "#e10600", fontFamily: "Orbitron", letterSpacing: 1, marginTop: 4 }}>NEXT ▲</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── CONSTRUCTOR STANDINGS (derived from driver standings) ────────────────────
function buildConstructorStandings(standings) {
  const teamMap = {};
  const TEAM_COLOURS = {
    "red bull": "#3671C6", "ferrari": "#E8002D", "mclaren": "#FF8000",
    "mercedes": "#27F4D2", "aston martin": "#229971", "alpine": "#0093CC",
    "williams": "#64C4FF", "racing bulls": "#6692FF", "haas": "#B6BABD",
    "audi": "#52E252", "cadillac": "#CC0000", "sauber": "#52E252",
  };
  standings.forEach(row => {
    const key = row.team.toLowerCase();
    if (!teamMap[key]) teamMap[key] = { team: row.team, pts: 0, colour: row.teamColour || TEAM_COLOURS[key] || "#888" };
    teamMap[key].pts += row.pts;
  });
  return Object.values(teamMap).sort((a, b) => b.pts - a.pts).map((t, i) => ({ ...t, pos: i + 1 }));
}

// ─── POINTS GRAPH SECTION ─────────────────────────────────────────────────────
function PointsGraph({ standings }) {
  if (!standings || standings.length === 0) return null;
  const top10 = standings.slice(0, 10);
  const max = top10[0]?.pts || 1;

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontFamily: "Orbitron", fontSize: 11, color: "#e10600", letterSpacing: 2, marginBottom: 14 }}>POINTS DISTRIBUTION</div>
      {top10.map(row => (
        <div key={row.name} className="graph-bar-row">
          <div className="graph-bar-name" style={{ color: "var(--text2)" }}>{row.name.split(" ").slice(-1)[0]}</div>
          <div className="graph-bar-track">
            <div className="graph-bar-fill" style={{ width: `${(row.pts / max) * 100}%`, background: row.teamColour || "#e10600" }}>
              {row.pts > 0 && <span className="graph-bar-val">{row.pts}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── GLOBAL SEARCH ────────────────────────────────────────────────────────────
const SEARCH_INDEX = [
  ...ACTIVE_DRIVERS_2026.map(d => ({ type: "Driver", title: d.name, sub: d.team, section: "drivers", icon: "🏎️" })),
  ...GLOSSARY.map(g => ({ type: "Term", title: g.term, sub: g.cat, section: "glossary", icon: "📖" })),
  ...RACE_CALENDAR_2026.map(r => ({ type: "Circuit", title: r.name, sub: r.circuit, section: "circuits", icon: "🗺️" })),
];

function GlobalSearch({ onNavigate }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handle(e) { if (!ref.current?.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const results = query.length > 1
    ? SEARCH_INDEX.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.sub.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  return (
    <div ref={ref} style={{ position: "relative", width: "100%", maxWidth: 400 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 4 }}>
        <span style={{ fontSize: 14 }}>🔍</span>
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search drivers, circuits, terms..."
          style={{ flex: 1, background: "none", border: "none", outline: "none", color: "var(--text)", fontSize: 13, fontFamily: "Exo 2, sans-serif" }}
        />
        {query && <button onClick={() => { setQuery(""); setOpen(false); }} style={{ background: "none", border: "none", color: "var(--text3)", cursor: "pointer", fontSize: 14 }}>✕</button>}
      </div>
      {open && results.length > 0 && (
        <div style={{ position: "absolute", top: "110%", left: 0, right: 0, background: "var(--bg2)", border: "1px solid var(--border)", borderTop: "2px solid #e10600", borderRadius: "0 0 6px 6px", zIndex: 300, boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
          {results.map((r, i) => (
            <button key={i} onClick={() => { onNavigate(r.section); setQuery(""); setOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontSize: 16 }}>{r.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{r.title}</div>
                <div style={{ fontSize: 10, color: "var(--text3)" }}>{r.type} · {r.sub}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


// ─── Countdown Component ─────────────────────────────────────────────────────
function RaceCountdown() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [nextRace, setNextRace] = useState(null);

  useEffect(() => {
    const upcoming = RACE_CALENDAR_2026
      .filter(r => new Date(r.date) > new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    if (!upcoming.length) return;
    setNextRace(upcoming[0]);

    function tick() {
      const diff = new Date(upcoming[0].date) - new Date();
      if (diff <= 0) { setTimeLeft({ d:0,h:0,m:0,s:0 }); return; }
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!nextRace || !timeLeft) return null;
  const pad = n => String(n).padStart(2, "0");

  return (
    <div className="countdown-wrap">
      <div className="countdown-label">Next Race</div>
      <div className="countdown-race">{nextRace.flag} {nextRace.name} · Round {nextRace.round}</div>
      <div className="countdown-tiles">
        {[["d","Days"],["h","Hours"],["m","Mins"],["s","Secs"]].map(([k, label]) => (
          <div className="countdown-tile" key={k}>
            <div className="countdown-num">{pad(timeLeft[k])}</div>
            <div className="countdown-unit">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Circuits Section ────────────────────────────────────────────────────────
function CircuitsSection() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  function downloadIcs(c) {
    const start = new Date(c.date);
    const end = new Date(start.getTime() + 2 * 3600000);
    const fmt = d => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//F1Guide//EN",
      "BEGIN:VEVENT",
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:🏎️ F1 ${c.name}`,
      `DESCRIPTION:Round ${c.round} · ${c.circuit}`,
      `LOCATION:${c.circuit}`,
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `F1_${c.name.replace(/\s/g,"_")}.ics`; a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = RACE_CALENDAR_2026.filter(c => {
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.circuit.toLowerCase().includes(q) || c.tags.some(t => t.toLowerCase().includes(q));
  });

  return (
    <div>
      <div className="section-title">2026 <span>Circuit Guide</span></div>
      <div className="section-line" />
      <SessionTimesSection />
      <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.7, marginBottom: 16 }}>
        All 24 circuits on the 2026 calendar — lap records, key facts, and what makes each one unique.
      </p>

      <div className="search-wrap" style={{ marginBottom: 20 }}>
        <span className="search-icon">🔍</span>
        <input className="search-input" placeholder="Search circuit, country or tag..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Detail modal */}
      {selected && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={() => setSelected(null)}>
          <div style={{ background: "var(--bg2)", border: "1px solid #e10600", borderRadius: 6, maxWidth: 520, width: "100%", padding: 28, position: "relative" }}
            onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", color: "var(--text3)", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>✕</button>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{selected.flag}</div>
            <div style={{ fontFamily: "Orbitron", fontSize: 14, fontWeight: 900, color: "var(--text)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 2 }}>{selected.name}</div>
            <div style={{ fontSize: 11, color: "#e10600", fontFamily: "Orbitron", letterSpacing: 2, marginBottom: 16 }}>ROUND {selected.round} · {selected.circuit}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              {[
                ["Circuit Length", selected.length],
                ["Race Laps", selected.laps],
                ["Lap Record", selected.lapRecord],
                ["DRS Zones", selected.drs],
                ["Race Date", new Date(selected.date).toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" })],
              ].map(([l, v]) => (
                <div key={l}>
                  <div style={{ fontSize: 9, color: "var(--text4)", textTransform: "uppercase", letterSpacing: 1, fontFamily: "Orbitron", marginBottom: 3 }}>{l}</div>
                  <div style={{ fontSize: 13, color: "var(--text)", fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.8, marginBottom: 14 }}>{selected.desc}</p>
            <div style={{ marginBottom: 16 }}>{selected.tags.map(t => <span key={t} className="circuit-tag">{t}</span>)}</div>
            <button onClick={() => downloadIcs(selected)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", background: "rgba(0,220,120,0.1)", border: "1px solid rgba(0,220,120,0.3)", color: "#00dc78", fontFamily: "Orbitron", fontSize: 10, letterSpacing: 2, cursor: "pointer", borderRadius: 3, width: "100%", justifyContent: "center" }}>
              📅 ADD TO CALENDAR (.ICS)
            </button>
          </div>
        </div>
      )}

      <div className="circuit-grid">
        {filtered.map(c => (
          <div key={c.round} className="circuit-card" onClick={() => setSelected(c)}>
            <div className="circuit-card-header">
              <div className="circuit-flag">{c.flag}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="circuit-name">{c.name}</div>
                <div className="circuit-country">{c.circuit}</div>
              </div>
              <div className="circuit-round">R{c.round}</div>
            </div>
            <div className="circuit-body">
              <div className="circuit-stats">
                <div className="circuit-stat-item">
                  <span className="circuit-stat-lbl">Length</span>
                  <span className="circuit-stat-val">{c.length}</span>
                </div>
                <div className="circuit-stat-item">
                  <span className="circuit-stat-lbl">Laps</span>
                  <span className="circuit-stat-val">{c.laps}</span>
                </div>
                <div className="circuit-stat-item">
                  <span className="circuit-stat-lbl">DRS Zones</span>
                  <span className="circuit-stat-val">{c.drs}</span>
                </div>
                <div className="circuit-stat-item">
                  <span className="circuit-stat-lbl">Race Date</span>
                  <span className="circuit-stat-val">{new Date(c.date).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}</span>
                </div>
              </div>
              <div>{c.tags.map(t => <span key={t} className="circuit-tag">{t}</span>)}</div>
              <div className="circuit-desc" style={{ marginTop: 10, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{c.desc}</div>
              <div style={{ marginTop: 8, fontSize: 10, color: "#e10600", fontFamily: "Orbitron", letterSpacing: 1 }}>TAP FOR DETAILS →</div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div style={{ color: "var(--text4)", textAlign: "center", padding: 40 }}>No circuits found</div>}
    </div>
  );
}

const NAV_GROUPS = [
  {
    label: "Learn the Basics",
    sections: [
      { id: "how",       icon: "🏁", label: "How It Works",   desc: "Race weekends, qualifying, tyres & strategy" },
      { id: "points",    icon: "📊", label: "Points System",  desc: "How points are scored and championships decided" },
      { id: "rules",     icon: "📋", label: "Rules Explained",desc: "Plain-English breakdowns of F1's confusing rules" },
      { id: "glossary",  icon: "📖", label: "Glossary",       desc: "Every F1 term defined — undercut, VSC, DRS & more" },
      { id: "quiz",      icon: "🧠", label: "F1 Quiz",        desc: "Test your knowledge with 15 questions" },
    ]
  },
  {
    label: "2026 Season",
    sections: [
      { id: "drivers",   icon: "🏎️", label: "Drivers",        desc: "All 22 drivers with ratings, stats & profiles" },
      { id: "teams",     icon: "🔧", label: "Teams",           desc: "All 11 constructors across 2025 & 2026" },
      { id: "history",   icon: "📅", label: "Driver Changes",  desc: "Every major move 2018–2026 and the reason why" },
      { id: "compare",   icon: "⚡", label: "Car Compare",     desc: "2025 vs 2026 regulations side by side" },
      { id: "predictor", icon: "🔮", label: "Race Predictor",  desc: "Predict the top 10 for the next race" },
    ]
  },
  {
    label: "Race & Stats",
    sections: [
      { id: "circuits",  icon: "🗺️", label: "Circuit Guide",  desc: "All 24 circuits with session times & calendar" },
      { id: "results",   icon: "🏆", label: "Live Results",   desc: "Race results, driver & constructor standings" },
      { id: "records",   icon: "🎖️", label: "All-Time Records",desc: "Most wins, poles, titles & fastest laps in history" },
      { id: "news",      icon: "📰", label: "F1 News",         desc: "Latest headlines from Motorsport.com" },
    ]
  },
];

const SECTIONS = NAV_GROUPS.flatMap(g => g.sections);

export default function F1Guide() {
  const [active, setActive] = useState("how");
  const [openGroup, setOpenGroup] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    function handleClick(e) {
      if (!e.target.closest(".nav-group")) setOpenGroup(null);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  function toggleGroup(label) { setOpenGroup(g => g === label ? null : label); }
  function selectSection(id) { setActive(id); setOpenGroup(null); window.scrollTo(0, 0); }

  return (
    <>
      <style>{styles}</style>
      <div className={`f1-app${darkMode ? "" : " light-mode"}`}>
        <div className="grid-bg" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="content">
          <div className="hero">
            <div className="hero-title">FORMULA <span>1</span></div>
            <div className="hero-sub">The Complete Beginner's Guide · 2018 – 2026</div>
            <RaceCountdown />
          </div>
          <nav className="nav">
            <div className="nav-inner">
              {NAV_GROUPS.map(group => {
                const isOpen = openGroup === group.label;
                const hasActive = group.sections.some(s => s.id === active);
                return (
                  <div key={group.label} className={`nav-group${isOpen ? " open" : ""}${hasActive ? " has-active" : ""}`}>
                    <div className="nav-group-label" onClick={() => toggleGroup(group.label)}>
                      {group.label}
                      <span className="nav-chevron">▼</span>
                    </div>
                    <div className="nav-dropdown">
                      {group.sections.map(s => (
                        <button key={s.id} className={`nav-dropdown-item${active === s.id ? " active" : ""}`} onClick={() => selectSection(s.id)}>
                          <span className="nav-dropdown-icon">{s.icon}</span>
                          <span className="nav-dropdown-text">
                            <div className="nav-dropdown-title">{s.label}</div>
                            <div className="nav-dropdown-desc">{s.desc}</div>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
              <button className="theme-toggle" onClick={() => setDarkMode(d => !d)} title="Toggle light/dark mode">
                {darkMode ? "☀️" : "🌙"}
              </button>
            </div>
          </nav>

          {/* Global search bar */}
          <div className="global-search-bar">
            <GlobalSearch onNavigate={selectSection} />
          </div>

          <main className="main">
            <div key={active} className="section-enter">
              {active === "how"       && <HowItWorks />}
              {active === "points"    && <PointsSystem />}
              {active === "drivers"   && <DriversSection />}
              {active === "teams"     && <TeamsSection />}
              {active === "history"   && <HistorySection />}
              {active === "circuits"  && <CircuitsSection />}
              {active === "results"   && <ResultsSection />}
              {active === "glossary"  && <GlossarySection />}
              {active === "rules"     && <RulesSection />}
              {active === "compare"   && <CarCompareSection />}
              {active === "records"   && <RecordsSection />}
              {active === "quiz"      && <QuizSection />}
              {active === "predictor" && <RacePredictorSection />}
              {active === "news"      && <NewsSection />}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}