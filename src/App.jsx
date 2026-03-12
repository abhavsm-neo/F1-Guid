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

  /* ══════════════════════════════════════════════
     UI/UX IMPROVEMENTS
  ══════════════════════════════════════════════ */

  /* ── Consistent type scale ── */
  :root {
    --fs-xs: 10px;
    --fs-sm: 12px;
    --fs-md: 13px;
    --fs-lg: 15px;
    --fs-xl: 18px;
    --space-xs: 6px;
    --space-sm: 12px;
    --space-md: 20px;
    --space-lg: 32px;
  }

  /* ── Better light mode ── */
  .light-mode body,
  .light-mode .f1-app { background: #f4f4f8; }
  .light-mode .hero {
    background: linear-gradient(135deg, #f4f4f8 0%, #f0e8e8 50%, #f4f4f8 100%);
  }
  .light-mode .nav {
    box-shadow: 0 1px 0 rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06);
  }
  .light-mode .driver-card,
  .light-mode .team-card,
  .light-mode .circuit-card,
  .light-mode .card,
  .light-mode .how-card,
  .light-mode .glossary-card,
  .light-mode .rule-card,
  .light-mode .record-card,
  .light-mode .news-card,
  .light-mode .h2h-card {
    background: rgba(255,255,255,0.9);
    box-shadow: 0 2px 12px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,1) inset;
  }
  .light-mode .driver-stat { background: #f0f0f8; }
  .light-mode .countdown-num {
    background: rgba(225,6,0,0.04);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  /* ── Button press/active states ── */
  .year-btn:active,
  .nav-btn:active,
  .filter-pill:active,
  .expand-btn:active,
  .quiz-option:active,
  .share-btn:active { transform: scale(0.97) !important; }
  .year-btn.active:hover { filter: brightness(1.1); }

  /* ── Section header with bookmark ── */
  .section-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 8px;
  }
  .section-intro {
    font-size: var(--fs-md);
    color: var(--text3);
    line-height: 1.75;
    margin-bottom: var(--space-md);
    max-width: 680px;
    border-left: 2px solid rgba(225,6,0,0.2);
    padding-left: 14px;
  }

  /* ── Featured next-race card ── */
  .featured-race-card {
    background: linear-gradient(135deg, rgba(225,6,0,0.08) 0%, var(--card-bg) 60%);
    border: 1px solid rgba(225,6,0,0.25);
    border-radius: 14px;
    padding: 20px 24px;
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    backdrop-filter: blur(14px);
    box-shadow: 0 4px 24px rgba(225,6,0,0.08), var(--shadow);
    position: relative;
    overflow: hidden;
  }
  .featured-race-card::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 180px; height: 180px;
    background: radial-gradient(circle, rgba(225,6,0,0.1), transparent 70%);
    pointer-events: none;
  }
  .featured-race-flag { font-size: 44px; line-height: 1; flex-shrink: 0; }
  .featured-race-info { flex: 1; min-width: 160px; }
  .featured-race-label {
    font-size: 9px; font-family: 'Orbitron', sans-serif;
    color: #e10600; letter-spacing: 3px; text-transform: uppercase;
    margin-bottom: 4px; opacity: 0.8;
  }
  .featured-race-name {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(14px, 3vw, 20px);
    font-weight: 900; color: var(--text);
    text-transform: uppercase; letter-spacing: 1px;
    text-shadow: 0 0 20px rgba(255,255,255,0.05);
  }
  .featured-race-sub {
    font-size: 12px; color: var(--text3); margin-top: 4px;
  }
  .featured-race-countdown {
    display: flex; gap: 10px; flex-shrink: 0;
  }
  .featured-tile {
    text-align: center;
    background: rgba(0,0,0,0.2);
    border: 1px solid rgba(225,6,0,0.2);
    border-radius: 8px;
    padding: 8px 12px;
    min-width: 52px;
    backdrop-filter: blur(8px);
  }
  .light-mode .featured-tile { background: rgba(255,255,255,0.6); }
  .featured-tile-num {
    font-family: 'Orbitron', sans-serif;
    font-size: 20px; font-weight: 900; color: var(--text); line-height: 1;
  }
  .featured-tile-label {
    font-size: 8px; color: var(--text4);
    text-transform: uppercase; letter-spacing: 1px;
    font-family: 'Orbitron', sans-serif; margin-top: 3px;
  }

  /* ── Bottom mobile nav ── */
  .mobile-nav {
    display: none;
    position: fixed;
    bottom: 0; left: 0; right: 0;
    background: rgba(10,10,18,0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid var(--border);
    z-index: 200;
    padding: 0 0 env(safe-area-inset-bottom, 0);
    box-shadow: 0 -4px 24px rgba(0,0,0,0.4);
  }
  .light-mode .mobile-nav { background: rgba(248,248,255,0.97); }
  .mobile-nav-inner {
    display: flex;
    justify-content: space-around;
    align-items: stretch;
  }
  .mobile-nav-btn {
    display: flex; flex-direction: column; align-items: center;
    gap: 3px; padding: 10px 6px;
    flex: 1; background: none; border: none;
    cursor: pointer; transition: all 0.2s;
    position: relative;
  }
  .mobile-nav-btn.active::after {
    content: ''; position: absolute; top: 0; left: 20%; right: 20%;
    height: 2px; background: #e10600;
    border-radius: 0 0 2px 2px;
    box-shadow: 0 0 6px rgba(225,6,0,0.5);
  }
  .mobile-nav-icon { font-size: 18px; }
  .mobile-nav-label {
    font-size: 9px; font-family: 'Exo 2', sans-serif;
    color: var(--text3); letter-spacing: 0.5px; text-align: center;
    white-space: nowrap;
  }
  .mobile-nav-btn.active .mobile-nav-label { color: #e10600; }
  .mobile-nav-more-sheet {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
    display: flex; align-items: flex-end;
    animation: sectionIn 0.25s both;
  }
  .mobile-nav-sheet-inner {
    background: var(--bg2);
    border-top: 2px solid #e10600;
    border-radius: 16px 16px 0 0;
    padding: 20px 16px calc(20px + env(safe-area-inset-bottom, 0));
    width: 100%;
    max-height: 80vh; overflow-y: auto;
  }
  .mobile-sheet-item {
    display: flex; align-items: center; gap: 14px;
    padding: 12px 14px; border-radius: 8px;
    cursor: pointer; transition: all 0.15s;
    background: none; border: none; width: 100%; text-align: left;
    margin-bottom: 4px;
  }
  .mobile-sheet-item:hover, .mobile-sheet-item:active { background: rgba(225,6,0,0.06); }
  .mobile-sheet-item.active { background: rgba(225,6,0,0.1); }
  @media (max-width: 640px) {
    .mobile-nav { display: block; }
    .nav { display: none; }
    .global-search-bar { display: none; }
    .main { padding: 14px 12px 80px; }
    .hero { padding: 20px 14px 16px; }
    .countdown-tiles { gap: 6px; }
    .countdown-num {
      font-size: 20px;
      min-width: 44px;
      padding: 6px 8px;
    }
    .card-grid { grid-template-columns: 1fr; }
    .driver-stat-row { gap: 4px; }
    .featured-race-card { padding: 16px; gap: 14px; }
    .featured-race-flag { font-size: 32px; }
    .featured-tile-num { font-size: 16px; }
    .compare-select-row { grid-template-columns: 1fr; }
    .tracker-chart { padding: 12px 8px; }
    .points-wrap { grid-template-columns: 1fr; }
  }

  /* ── Skeleton loaders ── */
  .skeleton-card {
    background: var(--card-bg);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    padding: 18px;
    box-shadow: var(--shadow);
  }
  .skel { border-radius: 4px; }
  .skel-title { height: 14px; width: 60%; margin-bottom: 10px; }
  .skel-line { height: 10px; margin-bottom: 7px; }
  .skel-line.w-80 { width: 80%; }
  .skel-line.w-60 { width: 60%; }
  .skel-line.w-40 { width: 40%; }
  .skel-img { height: 140px; width: 100%; margin-bottom: 12px; border-radius: 8px; }

  /* ── Empty state ── */
  .empty-state {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; padding: 60px 20px; text-align: center;
    color: var(--text4);
  }
  .empty-state-icon { font-size: 48px; margin-bottom: 14px; opacity: 0.5; }
  .empty-state-title {
    font-family: 'Orbitron', sans-serif; font-size: 12px;
    letter-spacing: 2px; color: var(--text3); margin-bottom: 6px;
  }
  .empty-state-sub { font-size: 12px; color: var(--text4); max-width: 240px; line-height: 1.6; }

  /* ── Expand btn — more visible ── */
  .expand-btn {
    display: flex; align-items: center; gap: 6px;
    background: transparent;
    border: 1px solid var(--border2);
    color: var(--text3);
    padding: 7px 14px;
    font-size: 11px;
    cursor: pointer;
    font-family: 'Exo 2', sans-serif;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-top: 12px;
    transition: all 0.2s;
    border-radius: 20px;
    width: 100%;
    justify-content: center;
  }
  .expand-btn:hover { border-color: #e10600; color: #e10600; box-shadow: 0 0 10px rgba(225,6,0,0.12); background: rgba(225,6,0,0.04); }
  .expand-btn-arrow { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1); }
  .expand-btn-arrow.open { transform: rotate(180deg); }

  /* ── Breadcrumb ── */
  .breadcrumb {
    display: flex; align-items: center; gap: 6px;
    font-size: 10px; color: var(--text4);
    font-family: 'Orbitron', sans-serif; letter-spacing: 1px;
    margin-bottom: 16px;
    text-transform: uppercase;
  }
  .breadcrumb-sep { color: var(--text4); opacity: 0.5; }
  .breadcrumb-current { color: #e10600; }

  /* ── Pulse animation (for live indicator) ── */
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  /* ── Toast notification ── */
  .toast {
    position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%) translateY(0);
    background: var(--bg2); border: 1px solid var(--glass-border);
    border-left: 3px solid #e10600;
    border-radius: 10px; padding: 10px 18px;
    font-size: 13px; color: var(--text);
    box-shadow: 0 8px 30px rgba(0,0,0,0.5);
    z-index: 999; white-space: nowrap;
    backdrop-filter: blur(16px);
    animation: toastIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
    pointer-events: none;
  }
  @keyframes toastIn {
    from { opacity: 0; transform: translateX(-50%) translateY(16px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }

  /* ── Richer search results ── */
  .search-result-item {
    display: flex; align-items: center; gap: 12px;
    width: 100%; padding: 10px 14px;
    background: none; border: none; cursor: pointer;
    text-align: left; border-bottom: 1px solid var(--border);
    transition: all 0.15s;
  }
  .search-result-item:hover { background: rgba(225,6,0,0.05); padding-left: 18px; }
  .search-result-item:last-child { border-bottom: none; }
  .search-result-icon { font-size: 18px; flex-shrink: 0; width: 32px; text-align: center; }
  .search-result-body { flex: 1; min-width: 0; }
  .search-result-title { font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 1px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .search-result-meta { font-size: 10px; color: var(--text3); letter-spacing: 0.5px; }
  .search-result-type {
    font-size: 9px; padding: 2px 8px; border-radius: 20px;
    background: rgba(225,6,0,0.08); color: #e10600;
    font-family: 'Orbitron', sans-serif; letter-spacing: 1px;
    text-transform: uppercase; flex-shrink: 0;
    border: 1px solid rgba(225,6,0,0.15);
  }

  /* ── Light mode improvements ── */
  .light-mode .skeleton { background: linear-gradient(90deg, #e8e8f0 25%, #f0f0f8 50%, #e8e8f0 75%); background-size: 200% 100%; }
  .light-mode .onboarding-modal { background: #fff; }
  .light-mode .mobile-nav-sheet-inner { background: #fff; }
  .light-mode .search-result-item:hover { background: rgba(225,6,0,0.04); }

  .onboarding-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.85);
    display: flex; align-items: center; justify-content: center;
    padding: 20px; backdrop-filter: blur(6px);
    animation: sectionIn 0.4s both;
  }
  .onboarding-modal {
    background: var(--bg2); border: 1px solid rgba(225,6,0,0.3);
    border-radius: 16px; padding: 36px 32px; max-width: 520px; width: 100%;
    box-shadow: 0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(225,6,0,0.1);
    position: relative;
  }
  .onboarding-option {
    width: 100%; padding: 16px 18px; margin-bottom: 10px;
    background: var(--card-bg); border: 1px solid var(--glass-border);
    border-radius: 10px; cursor: pointer; text-align: left;
    transition: all 0.25s; backdrop-filter: blur(8px);
    display: flex; align-items: center; gap: 14px;
  }
  .onboarding-option:hover { border-color: rgba(225,6,0,0.4); transform: translateX(4px); box-shadow: var(--shadow-hover); }

  /* ── Bookmarks ── */
  .bookmark-btn {
    background: none; border: none; cursor: pointer;
    font-size: 16px; transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
    padding: 2px; line-height: 1;
  }
  .bookmark-btn:hover { transform: scale(1.3); }
  .bookmarks-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px,1fr)); gap: 10px; }
  .bookmark-card {
    background: var(--card-bg); border: 1px solid var(--glass-border);
    border-radius: 10px; padding: 14px; cursor: pointer;
    transition: all 0.25s; backdrop-filter: blur(8px);
    display: flex; align-items: center; gap: 10px;
  }
  .bookmark-card:hover { border-color: rgba(225,6,0,0.4); transform: translateY(-2px); }

  /* ── Driver Compare / Radar ── */
  .compare-select-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
  .compare-driver-select {
    background: var(--card-bg); border: 1px solid var(--glass-border);
    border-radius: 8px; color: var(--text); font-family: 'Exo 2', sans-serif;
    font-size: 13px; padding: 10px 12px; width: 100%; outline: none;
    cursor: pointer; transition: border-color 0.2s;
  }
  .compare-driver-select:focus { border-color: rgba(225,6,0,0.4); }
  .radar-wrap { display: flex; justify-content: center; margin: 20px 0; }
  .compare-stat-row { display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; align-items: center; margin-bottom: 10px; }
  .compare-bar-left { height: 8px; border-radius: 4px; margin-left: auto; transition: width 0.6s cubic-bezier(0.22,1,0.36,1); }
  .compare-bar-right { height: 8px; border-radius: 4px; margin-right: auto; transition: width 0.6s cubic-bezier(0.22,1,0.36,1); }
  .compare-stat-label { font-family: 'Orbitron', sans-serif; font-size: 9px; color: var(--text3); letter-spacing: 1px; text-align: center; }

  /* ── Championship Tracker ── */
  .tracker-year-tabs { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
  .tracker-legend { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; }
  .tracker-legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text2); }
  .tracker-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .tracker-chart { background: var(--card-bg); border: 1px solid var(--glass-border); border-radius: 12px; padding: 20px; backdrop-filter: blur(12px); overflow-x: auto; }
  .drama-badge {
    display: inline-block; padding: 3px 10px; border-radius: 20px;
    background: rgba(225,6,0,0.12); border: 1px solid rgba(225,6,0,0.3);
    font-size: 9px; color: #e10600; font-family: 'Orbitron', sans-serif;
    letter-spacing: 1px; text-transform: uppercase; margin-left: 8px;
    box-shadow: 0 0 8px rgba(225,6,0,0.15);
  }

  /* ── Team Quiz ── */
  .team-quiz-result {
    text-align: center; padding: 32px 20px;
    background: var(--card-bg); border-radius: 16px;
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(14px); box-shadow: var(--shadow);
  }
  .team-result-name {
    font-family: 'Orbitron', sans-serif; font-size: 24px; font-weight: 900;
    letter-spacing: 2px; text-transform: uppercase; margin: 12px 0 8px;
  }

  /* ── Tyre Strategy ── */
  .tyre-legend { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
  .tyre-dot { width: 12px; height: 12px; border-radius: 50%; }
  .strategy-row { margin-bottom: 20px; }
  .strategy-label { font-size: 11px; color: var(--text3); margin-bottom: 6px; font-family: 'Orbitron', sans-serif; letter-spacing: 1px; }
  .strategy-track { height: 32px; background: var(--bg3); border-radius: 6px; overflow: hidden; display: flex; position: relative; border: 1px solid var(--glass-border); }
  .strategy-seg {
    height: 100%; display: flex; align-items: center; justify-content: center;
    font-size: 9px; font-family: 'Orbitron', sans-serif; color: #000;
    font-weight: 700; letter-spacing: 1px; position: relative;
    transition: filter 0.2s; cursor: default;
    border-right: 2px solid rgba(0,0,0,0.3);
  }
  .strategy-seg:last-child { border-right: none; }
  .strategy-seg:hover { filter: brightness(1.15); }
  .pit-marker { position: absolute; top: 0; bottom: 0; width: 2px; background: rgba(255,255,255,0.6); z-index: 1; }

  /* ── H2H Section ── */
  .h2h-card {
    background: var(--card-bg); border: 1px solid var(--glass-border);
    border-radius: 12px; padding: 20px; margin-bottom: 14px;
    backdrop-filter: blur(12px); box-shadow: var(--shadow); transition: all 0.25s;
  }
  .h2h-card:hover { box-shadow: var(--shadow-hover); transform: translateY(-2px); }
  .h2h-bar-wrap { height: 8px; background: var(--bg3); border-radius: 4px; overflow: hidden; margin: 8px 0; display: flex; }
  .h2h-bar-left { height: 100%; border-radius: 4px 0 0 4px; transition: width 0.8s cubic-bezier(0.22,1,0.36,1); }
  .h2h-bar-right { height: 100%; border-radius: 0 4px 4px 0; transition: width 0.8s cubic-bezier(0.22,1,0.36,1); }

  /* ── Share Card ── */
  .share-btn {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 20px; background: linear-gradient(135deg, #e10600, #ff4020);
    border: none; color: #fff; font-family: 'Orbitron', sans-serif;
    font-size: 11px; letter-spacing: 2px; cursor: pointer;
    border-radius: 8px; transition: all 0.25s; margin-top: 14px;
    box-shadow: 0 4px 20px rgba(225,6,0,0.3);
  }
  .share-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(225,6,0,0.4); }

  /* ── Skeleton loader ── */
  @keyframes shimmer {
    from { background-position: -200% 0; }
    to { background-position: 200% 0; }
  }
  .skeleton {
    background: linear-gradient(90deg, var(--bg3) 25%, var(--bg2) 50%, var(--bg3) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 6px;
  }

  @media (max-width: 600px) {
    .points-wrap { grid-template-columns: 1fr; }
    .filter-pill { font-size: 9px; padding: 4px 9px; }
    .compare-select-row { grid-template-columns: 1fr; }
    .tracker-year-tabs { gap: 6px; }
  }

  /* ── Homepage ── */
  .home-hero {
    background: linear-gradient(135deg, rgba(225,6,0,0.06) 0%, transparent 50%);
    border: 1px solid rgba(225,6,0,0.12);
    border-radius: 16px; padding: 32px 28px; margin-bottom: 28px;
    position: relative; overflow: hidden;
    backdrop-filter: blur(14px);
  }
  .home-hero::after {
    content: 'F1'; position: absolute; right: -20px; top: -30px;
    font-size: 140px; font-family: 'Orbitron', sans-serif; font-weight: 900;
    color: rgba(225,6,0,0.04); pointer-events: none; line-height: 1;
    letter-spacing: -8px;
  }
  .home-quick-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 10px; margin-bottom: 28px;
  }
  .home-quick-card {
    background: var(--card-bg); border: 1px solid var(--glass-border);
    border-radius: 12px; padding: 16px 14px; cursor: pointer;
    transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
    backdrop-filter: blur(10px);
    display: flex; flex-direction: column; gap: 6px;
  }
  .home-quick-card:hover { transform: translateY(-3px); border-color: rgba(225,6,0,0.3); box-shadow: var(--shadow-hover); }
  .home-quick-card:active { transform: scale(0.98); }
  .home-quick-icon { font-size: 22px; }
  .home-quick-label { font-family: 'Orbitron', sans-serif; font-size: 10px; color: var(--text); font-weight: 700; letter-spacing: 1px; }
  .home-quick-sub { font-size: 10px; color: var(--text4); line-height: 1.4; }
  .home-section-title {
    font-family: 'Orbitron', sans-serif; font-size: 10px;
    color: #e10600; letter-spacing: 3px; text-transform: uppercase;
    margin-bottom: 12px; margin-top: 4px;
    display: flex; align-items: center; gap: 8px;
  }
  .home-section-title::after {
    content: ''; flex: 1; height: 1px;
    background: linear-gradient(to right, rgba(225,6,0,0.2), transparent);
  }
  .power-rank-row {
    display: flex; align-items: center; gap: 14px;
    padding: 12px 16px; margin-bottom: 6px;
    background: var(--card-bg); border: 1px solid var(--glass-border);
    border-radius: 10px; cursor: pointer;
    transition: all 0.2s; backdrop-filter: blur(8px);
  }
  .power-rank-row:hover { transform: translateX(4px); box-shadow: var(--shadow-hover); }
  .power-rank-num {
    font-family: 'Orbitron', sans-serif; font-size: 18px;
    font-weight: 900; color: var(--text4); min-width: 28px;
  }
  .power-rank-bar {
    height: 4px; border-radius: 2px; flex: 1;
    background: var(--bg3); overflow: hidden;
  }
  .power-rank-fill {
    height: 100%; border-radius: 2px;
    transition: width 0.8s cubic-bezier(0.22,1,0.36,1);
  }
  .changelog-item {
    display: flex; gap: 12px; padding: 10px 0;
    border-bottom: 1px solid var(--border);
  }
  .changelog-item:last-child { border-bottom: none; }
  .changelog-dot {
    width: 8px; height: 8px; border-radius: 50%;
    flex-shrink: 0; margin-top: 5px;
  }
  @media (max-width: 600px) {
    .home-quick-grid { grid-template-columns: repeat(2, 1fr); }
    .home-hero { padding: 20px 16px; }
    .home-hero::after { font-size: 80px; }
  }

  /* ── Circuit map image ── */
  .circuit-map-img {
    width: 100%; height: 140px; object-fit: contain;
    border-radius: 8px; background: var(--bg3);
    margin-bottom: 10px; display: block;
    filter: var(--circuit-img-filter, none);
    transition: filter 0.2s;
  }
  .circuit-card:hover .circuit-map-img { filter: var(--circuit-img-filter-hover, brightness(1.05)); }
  .circuit-map-fallback {
    width: 100%; height: 100px;
    display: flex; align-items: center; justify-content: center;
    background: var(--bg3); border-radius: 8px;
    font-size: 36px; margin-bottom: 10px;
    border: 1px solid var(--border);
  }
  .light-mode { --circuit-img-filter: none; --circuit-img-filter-hover: brightness(0.95); }

  /* ── Season preview ── */
  .preview-team-card {
    background: var(--card-bg); border: 1px solid var(--glass-border);
    border-radius: 14px; padding: 20px; margin-bottom: 12px;
    backdrop-filter: blur(12px); box-shadow: var(--shadow);
    transition: all 0.25s; position: relative; overflow: hidden;
  }
  .preview-team-card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0;
    width: 4px; border-radius: 14px 0 0 14px;
  }
  .preview-team-card:hover { box-shadow: var(--shadow-hover); transform: translateX(3px); }
  .preview-race-card {
    background: var(--card-bg); border: 1px solid var(--glass-border);
    border-radius: 12px; padding: 16px 18px; margin-bottom: 8px;
    backdrop-filter: blur(10px); cursor: pointer; transition: all 0.2s;
  }
  .preview-race-card:hover { border-color: rgba(225,6,0,0.25); box-shadow: var(--shadow); }
  .rookie-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 12px; margin-top: 4px;
  }
  .rookie-card {
    background: var(--card-bg); border: 1px solid var(--glass-border);
    border-radius: 12px; padding: 16px; backdrop-filter: blur(10px);
    transition: all 0.2s; box-shadow: var(--shadow);
  }
  .rookie-card:hover { box-shadow: var(--shadow-hover); transform: translateY(-2px); }
  .prediction-badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: 20px;
    font-size: 9px; font-family: 'Orbitron', sans-serif;
    letter-spacing: 1px; text-transform: uppercase;
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

// ─── REUSABLE UI HELPERS ─────────────────────────────────────────────────────

function SectionHeader({ title, accent, group, intro, icon }) {
  return (
    <div>
      <div className="breadcrumb">
        <span>{group}</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">{icon} {title.replace(/<[^>]+>/g, '')} {accent}</span>
      </div>
      <div className="section-title">{title} <span>{accent}</span></div>
      <div className="section-line" />
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  );
}

function SkeletonCards({ count = 6, hasImage = false }) {
  return (
    <div className="card-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card" style={{ animationDelay: `${i * 0.05}s` }}>
          {hasImage && <div className="skeleton skel skel-img" />}
          <div className="skeleton skel skel-title" />
          <div className="skeleton skel skel-line w-80" />
          <div className="skeleton skel skel-line w-60" />
          <div className="skeleton skel skel-line w-40" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ icon = "🔍", title = "NOTHING FOUND", sub = "Try a different search or filter." }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <div className="empty-state-title">{title}</div>
      <div className="empty-state-sub">{sub}</div>
    </div>
  );
}

function FeaturedRaceCard() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const nextRace = RACE_CALENDAR_2026.find(r => new Date(r.date) > new Date()) || RACE_CALENDAR_2026[RACE_CALENDAR_2026.length - 1];

  useEffect(() => {
    function tick() {
      const diff = new Date(nextRace.date) - new Date();
      if (diff <= 0) { setTimeLeft({ d:0, h:0, m:0, s:0 }); return; }
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

  const pad = n => String(n).padStart(2, "0");
  const raceDate = new Date(nextRace.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long" });

  return (
    <div className="featured-race-card">
      <div className="featured-race-flag">{nextRace.flag}</div>
      <div className="featured-race-info">
        <div className="featured-race-label">Round {nextRace.round} · Next Race</div>
        <div className="featured-race-name">{nextRace.name}</div>
        <div className="featured-race-sub">{nextRace.circuit} · {raceDate}</div>
      </div>
      <div className="featured-race-countdown">
        {[["d","Days"], ["h","Hrs"], ["m","Min"], ["s","Sec"]].map(([k, l]) => (
          <div key={k} className="featured-tile">
            <div className="featured-tile-num">{pad(timeLeft[k])}</div>
            <div className="featured-tile-label">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
        <p className="driver-desc" style={{ display: expanded ? undefined : "-webkit-box", WebkitLineClamp: expanded ? undefined : 3, WebkitBoxOrient: "vertical", overflow: expanded ? undefined : "hidden" }}>{driver.desc}</p>
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
          <span className={`expand-btn-arrow${expanded ? " open" : ""}`}>▼</span>
          {expanded ? "Show Less" : "Ratings & Media"}
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
          <span className={`expand-btn-arrow${expanded ? " open" : ""}`}>▼</span>
          {expanded ? "Show Less" : "Engine Details"}
        </button>
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <div>
      <SectionHeader title="How" accent="F1 Works" group="Learn the Basics" icon="🏁"
        intro="New to Formula 1? Start here. This covers everything that happens across a race weekend — from practice to the podium — plus the rules, tyres, and tactics that make every race unpredictable." />
      <FeaturedRaceCard />

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
      <SectionHeader title="Points" accent="System" group="Learn the Basics" icon="📊"
        intro="Points are awarded to the top 10 finishers in every race. The driver and constructor with the most points at the end of the season win the championship." />
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
      <SectionHeader title="2026" accent="Drivers" group="2026 Season" icon="🏎️"
        intro="All 22 drivers on the 2026 grid — their career stats, ratings, and the story behind each one. Tap any card to reveal detailed ratings and media profile." />
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
      {filtered.length === 0 && <EmptyState icon="🏎️" title="NO DRIVERS FOUND" sub={`No drivers match "${search || filter}" — try clearing your search or filter.`} />}
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
      <SectionHeader title="The" accent="Teams" group="2026 Season" icon="🔧"
        intro="All 11 constructors — their engines, drivers, team principals, and what the 2026 regulation reset means for each one." />
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
      <SectionHeader title={`${YEAR}`} accent="Results" group="Race & Stats" icon="🏆"
        intro="Live race results, driver championship standings and constructor standings — powered by the OpenF1 API." />
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "rgba(0,220,120,0.08)", border: "1px solid rgba(0,220,120,0.25)", borderRadius: 20 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: loading ? "#666" : "#00dc78", boxShadow: loading ? "none" : "0 0 6px #00dc78" }} />
          <span style={{ fontSize: 10, color: "#00dc78", fontFamily: "Orbitron", letterSpacing: 1 }}>LIVE · OpenF1 API</span>
        </div>
        {lastUpdated && <span style={{ fontSize: 10, color: "var(--text4)" }}>Updated {lastUpdated.toLocaleTimeString()}</span>}
        <button onClick={loadAll} style={{ marginLeft: "auto", padding: "6px 14px", background: "transparent", border: "1px solid var(--border2)", color: "var(--text3)", fontFamily: "Orbitron", fontSize: 9, letterSpacing: 2, cursor: "pointer", borderRadius: 20, transition: "all 0.2s" }}
          onMouseEnter={e => { e.target.style.borderColor="#e10600"; e.target.style.color="var(--text)"; }}
          onMouseLeave={e => { e.target.style.borderColor=""; e.target.style.color=""; }}>
          ↻ Refresh
        </button>
      </div>

      {loading && (
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            {[1,2,3,4].map(i => <div key={i} className="skeleton skel" style={{ height: 36, width: 100, borderRadius: 6 }} />)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[1,2].map(i => (
              <div key={i} className="skeleton-card">
                <div className="skeleton skel skel-title" />
                {[1,2,3,4,5].map(j => <div key={j} className="skeleton skel skel-line w-80" style={{ marginBottom: 8 }} />)}
              </div>
            ))}
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="card" style={{ borderLeft: "3px solid #e10600", padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>📡</div>
          <div style={{ fontFamily: "Orbitron", fontSize: 11, color: "#e10600", letterSpacing: 2, marginBottom: 8 }}>DATA UNAVAILABLE</div>
          <p style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.7, marginBottom: 14 }}>{error}. The OpenF1 API may be temporarily down, or the {YEAR} season data may not yet be available.</p>
          <button onClick={loadAll} style={{ padding: "8px 18px", background: "#e10600", border: "none", color: "#fff", fontFamily: "Orbitron", fontSize: 9, letterSpacing: 2, cursor: "pointer", borderRadius: 20 }}>RETRY</button>
        </div>
      )}

      {!loading && !error && sessions.length === 0 && (
        <EmptyState icon="🏆" title={`NO RACES YET IN ${YEAR}`} sub="Race data will appear here once the season begins." />
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
      <SectionHeader title="F1" accent="Glossary" group="Learn the Basics" icon="📖"
        intro="Every piece of jargon you'll hear during a race weekend — explained clearly. Tap any term to expand the full definition." />
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
                <span style={{ color: "var(--text3)", marginLeft: 8, fontSize: 10, transition: "transform 0.2s", display: "inline-block", transform: expanded[g.term] ? "rotate(180deg)" : "none" }}>▼</span>
              </span>
            </div>
            {expanded[g.term] && <div className="glossary-def">{g.def}</div>}
            {!expanded[g.term] && <div className="glossary-def" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{g.def}</div>}
          </div>
        ))}
      </div>
      {filtered.length === 0 && <EmptyState icon="📖" title="NO TERMS FOUND" sub={`Nothing matches "${search}" — try a different search.`} />}
    </div>
  );
}

// ─── RULES SECTION ────────────────────────────────────────────────────────────
function RulesSection() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <SectionHeader title="Explain" accent="The Rules" group="Learn the Basics" icon="📋"
        intro="F1's rulebook is enormous. Here are the most confusing rules explained the way a knowledgeable friend would — with real examples from actual races." />
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
  { round: 1,  flag: "🇦🇺", name: "Australian GP",       circuit: "Albert Park",              mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Albert_Park_circuit_map.svg/320px-Albert_Park_circuit_map.svg.png", date: "2026-03-08T05:00:00Z",  laps: 58, length: "5.278 km", lapRecord: "1:20.235 (Bottas, 2023)",          drs: 3, tags: ["Street-adjacent","Fast","Overtaking"],          desc: "The season opener in Melbourne. A fast, flowing street-adjacent circuit that rewards car balance. The Albert Park lake provides a stunning backdrop." },
  { round: 2,  flag: "🇨🇳", name: "Chinese GP",           circuit: "Shanghai",                 mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Shanghai_circuit_map.svg/320px-Shanghai_circuit_map.svg.png", date: "2026-03-15T07:00:00Z",  laps: 56, length: "5.451 km", lapRecord: "1:32.238 (M.Schumacher, 2004)",    drs: 2, tags: ["High-deg","Technical","Sprint"],                  desc: "Shanghai's long back straight enables DRS battles. Tyres take a heavy hit through the sweeping final sector. A Sprint weekend." },
  { round: 3,  flag: "🇯🇵", name: "Japanese GP",          circuit: "Suzuka",                   mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Suzuka_circuit_map.svg/320px-Suzuka_circuit_map.svg.png", date: "2026-03-29T05:00:00Z",  laps: 53, length: "5.807 km", lapRecord: "1:30.983 (Verstappen, 2023)",      drs: 2, tags: ["Driver Favourite","Figure-8","High Speed"],       desc: "One of the most beloved circuits in the world. Suzuka's figure-of-eight layout and legendary corners like 130R and the Esses make it a true driver's circuit." },
  { round: 4,  flag: "🇧🇭", name: "Bahrain GP",           circuit: "Bahrain International",    mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Bahrain_International_Circuit_map.svg/320px-Bahrain_International_Circuit_map.svg.png", date: "2026-04-12T15:00:00Z",  laps: 57, length: "5.412 km", lapRecord: "1:31.447 (De La Rosa, 2005)",      drs: 3, tags: ["Night Race","High Deg","Dusty"],                  desc: "Run under floodlights, Bahrain is famous for heavy tyre degradation and sandy, abrasive asphalt. Sector 2's flowing middle section rewards mechanical grip." },
  { round: 5,  flag: "🇸🇦", name: "Saudi Arabian GP",     circuit: "Jeddah Corniche",          mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Jeddah_Corniche_Circuit_map.svg/320px-Jeddah_Corniche_Circuit_map.svg.png", date: "2026-04-19T17:00:00Z",  laps: 50, length: "6.174 km", lapRecord: "1:30.734 (Verstappen, 2021)",      drs: 3, tags: ["Fastest Street","Night Race","Walls"],             desc: "The fastest street circuit on the calendar. Walls are millimetres away at 300+ km/h. Safety cars are virtually guaranteed. Terrifying and spectacular in equal measure." },
  { round: 6,  flag: "🇺🇸", name: "Miami GP",             circuit: "Miami International",      mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Miami_International_Autodrome_track_map.svg/320px-Miami_International_Autodrome_track_map.svg.png", date: "2026-05-03T19:00:00Z",  laps: 57, length: "5.412 km", lapRecord: "1:29.708 (Verstappen, 2023)",      drs: 3, tags: ["Street","Spectacle","Sprint"],                   desc: "F1's glamorous American showcase. Built around the Hard Rock Stadium. The fake marina is iconic. A Sprint weekend." },
  { round: 7,  flag: "🇨🇦", name: "Canadian GP",          circuit: "Gilles Villeneuve",        mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Circuit_Gilles_Villeneuve_track_map.svg/320px-Circuit_Gilles_Villeneuve_track_map.svg.png", date: "2026-05-24T18:00:00Z",  laps: 70, length: "4.361 km", lapRecord: "1:13.078 (Bottas, 2019)",          drs: 3, tags: ["Wall of Champions","Braking","Sprint"],            desc: "The legendary Wall of Champions has claimed countless cars. Heavy braking zones and long straights create genuine overtaking. A Sprint weekend." },
  { round: 8,  flag: "🇲🇨", name: "Monaco GP",            circuit: "Circuit de Monaco",        mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Circuit_de_Monaco.svg/320px-Circuit_de_Monaco.svg.png", date: "2026-06-07T13:00:00Z",  laps: 78, length: "3.337 km", lapRecord: "1:12.909 (Leclerc, 2024)",         drs: 1, tags: ["Iconic","No Overtaking","Prestige"],               desc: "The jewel of the F1 calendar. Impossibly narrow streets, yachts in the harbour, zero overtaking. Monaco is about qualifying — P1 Saturday usually means P1 Sunday." },
  { round: 9,  flag: "🇪🇸", name: "Barcelona-Catalunya GP",circuit: "Circuit de Barcelona-Catalunya", mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Circuit_de_Barcelona-Catalunya_track_map.svg/320px-Circuit_de_Barcelona-Catalunya_track_map.svg.png", date: "2026-06-14T13:00:00Z", laps: 66, length: "4.657 km", lapRecord: "1:16.330 (Verstappen, 2023)", drs: 2, tags: ["Benchmark","High Deg","Testing Venue"],           desc: "Teams know this circuit better than any other — F1's main winter testing venue. A true benchmark for car performance. The Spanish GP name moves to Madrid in 2026." },
  { round: 10, flag: "🇦🇹", name: "Austrian GP",          circuit: "Red Bull Ring",            mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Red_Bull_Ring_track_map.svg/320px-Red_Bull_Ring_track_map.svg.png", date: "2026-06-28T13:00:00Z",  laps: 71, length: "4.318 km", lapRecord: "1:05.619 (Leclerc, 2020)",         drs: 3, tags: ["Short Lap","High Speed","Spectacle"],             desc: "One of F1's shortest laps but packed with high-speed corners. Tifosi and Orange Army fans make the grandstands a cauldron." },
  { round: 11, flag: "🇬🇧", name: "British GP",           circuit: "Silverstone",              mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Silverstone_circuit_map.svg/320px-Silverstone_circuit_map.svg.png", date: "2026-07-05T14:00:00Z",  laps: 52, length: "5.891 km", lapRecord: "1:27.097 (Hamilton, 2020)",        drs: 2, tags: ["High Speed","Home Race","Sprint"],                desc: "Home of British motorsport. Maggotts-Becketts-Chapel is arguably the most spectacular sequence in F1. A Sprint weekend." },
  { round: 12, flag: "🇧🇪", name: "Belgian GP",           circuit: "Spa-Francorchamps",        mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Spa-Francorchamps_circuit.svg/320px-Spa-Francorchamps_circuit.svg.png", date: "2026-07-19T13:00:00Z",  laps: 44, length: "7.004 km", lapRecord: "1:46.286 (Bottas, 2018)",          drs: 2, tags: ["Longest Circuit","Eau Rouge","Weather"],           desc: "The greatest circuit in the world according to many drivers. Eau Rouge/Raidillon is breathtaking. Weather can change lap by lap — dry, wet, and back again." },
  { round: 13, flag: "🇭🇺", name: "Hungarian GP",         circuit: "Hungaroring",              mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Hungaroring_track_map.svg/320px-Hungaroring_track_map.svg.png", date: "2026-07-26T13:00:00Z",  laps: 70, length: "4.381 km", lapRecord: "1:16.627 (Hamilton, 2020)",        drs: 2, tags: ["Monaco of non-streets","Hot","Tactical"],          desc: "Often called the Monaco of non-street circuits for its lack of overtaking. Extremely hot and physically demanding. Strategy and qualifying are everything." },
  { round: 14, flag: "🇳🇱", name: "Dutch GP",             circuit: "Zandvoort",                mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Zandvoort_circuit_2021.svg/320px-Zandvoort_circuit_2021.svg.png", date: "2026-08-23T13:00:00Z",  laps: 72, length: "4.259 km", lapRecord: "1:11.097 (Verstappen, 2023)",      drs: 2, tags: ["Banked Corners","Orange Army","Sprint"],            desc: "The final Dutch GP on the calendar — Zandvoort drops off after 2026. Unique banked corners. A Sprint weekend. The Orange Army goes all out for one last home race." },
  { round: 15, flag: "🇮🇹", name: "Italian GP",           circuit: "Monza",                    mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Monza_track_map.svg/320px-Monza_track_map.svg.png", date: "2026-09-06T13:00:00Z",  laps: 53, length: "5.793 km", lapRecord: "1:21.046 (Barrichello, 2004)",     drs: 3, tags: ["Temple of Speed","Slipstream","Tifosi"],           desc: "The Temple of Speed. Monza is all about raw horsepower and slipstreaming battles. The Tifosi are some of sport's most passionate fans. Engine manufacturers' playground." },
  { round: 16, flag: "🇪🇸", name: "Spanish GP",           circuit: "Madrid Street Circuit",    mapUrl: "", date: "2026-09-13T13:00:00Z",  laps: 0,  length: "TBC",       lapRecord: "N/A — debut race",                drs: 0, tags: ["NEW VENUE","Street","Madrid Debut"],                 desc: "Madrid makes its F1 debut in 2026. The Spanish GP moves from Barcelona to a brand new street circuit built around the IFEMA convention centre in the Spanish capital." },
  { round: 17, flag: "🇦🇿", name: "Azerbaijan GP",        circuit: "Baku City Circuit",        mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Baku_City_Circuit_track_map.svg/320px-Baku_City_Circuit_track_map.svg.png", date: "2026-09-26T11:00:00Z",  laps: 51, length: "6.003 km", lapRecord: "1:43.009 (Leclerc, 2019)",         drs: 2, tags: ["Street","Chaos","Saturday Race"],                  desc: "Baku is F1's chaos capital — and in 2026 it's a Saturday race. The longest straight on the calendar leads into an incredibly tight castle section. Drama guaranteed." },
  { round: 18, flag: "🇸🇬", name: "Singapore GP",         circuit: "Marina Bay",               mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Marina_Bay_Street_Circuit_Track_Map.svg/320px-Marina_Bay_Street_Circuit_Track_Map.svg.png", date: "2026-10-11T12:00:00Z",  laps: 62, length: "4.940 km", lapRecord: "1:35.867 (Russell, 2023)",         drs: 3, tags: ["Night Race","Street","Sprint"],                    desc: "The original night race. Stifling humidity and heat make it the most physically demanding event of the year. A Sprint weekend." },
  { round: 19, flag: "🇺🇸", name: "US GP",                circuit: "Circuit of the Americas",  mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Circuit_of_the_Americas_track_map.svg/320px-Circuit_of_the_Americas_track_map.svg.png", date: "2026-10-25T19:00:00Z",  laps: 56, length: "5.513 km", lapRecord: "1:36.169 (Hamilton, 2019)",        drs: 2, tags: ["Undulation","Turn 1","Fan Favourite"],              desc: "COTA's dramatic uphill Turn 1 is one of the most iconic starts in F1. Huge elevation changes throughout the lap. Austin fans bring serious American energy." },
  { round: 20, flag: "🇲🇽", name: "Mexican GP",           circuit: "Hermanos Rodríguez",       mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Hermanos_Rodriguez_track_map.svg/320px-Hermanos_Rodriguez_track_map.svg.png", date: "2026-11-01T20:00:00Z",  laps: 71, length: "4.304 km", lapRecord: "1:17.774 (Bottas, 2021)",          drs: 3, tags: ["High Altitude","Low Downforce","Party"],            desc: "High altitude (2,240m) means thin air — engine power is reduced, and downforce behaves differently. Mexico City fans are the most passionate on the calendar." },
  { round: 21, flag: "🇧🇷", name: "Brazilian GP",         circuit: "Interlagos",               mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Interlagos_circuit.svg/320px-Interlagos_circuit.svg.png", date: "2026-11-08T17:00:00Z",  laps: 71, length: "4.309 km", lapRecord: "1:10.540 (Barrichello, 2004)",     drs: 2, tags: ["Sprint","Anticlockwise","Dramatic"],              desc: "Interlagos runs anticlockwise. The atmosphere is electric — Brazilian fans are legendary. The circuit has produced some of the greatest moments in F1 history." },
  { round: 22, flag: "🇺🇸", name: "Las Vegas GP",         circuit: "Las Vegas Strip",          mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Las_Vegas_Street_Circuit_track_map.svg/320px-Las_Vegas_Street_Circuit_track_map.svg.png", date: "2026-11-21T06:00:00Z",  laps: 50, length: "6.201 km", lapRecord: "1:35.490 (Leclerc, 2023)",         drs: 2, tags: ["Night Race","Saturday Race","Spectacle"],           desc: "F1 on the Strip — a Saturday night race. The longest night race on the calendar through the neon heart of Las Vegas. Bitterly cold conditions create tyre drama." },
  { round: 23, flag: "🇶🇦", name: "Qatar GP",             circuit: "Lusail",                   mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Losail_International_Circuit_track_map.svg/320px-Losail_International_Circuit_track_map.svg.png", date: "2026-11-29T15:00:00Z",  laps: 57, length: "5.380 km", lapRecord: "1:24.319 (Russell, 2023)",         drs: 2, tags: ["Sprint","High Speed","Night"],                    desc: "Lusail is a flowing, high-speed circuit under lights. Heavy tyre degradation and physically demanding corners. A Sprint weekend." },
  { round: 24, flag: "🇦🇪", name: "Abu Dhabi GP",         circuit: "Yas Marina",               mapUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Yas_Marina_Circuit_layout.svg/320px-Yas_Marina_Circuit_layout.svg.png", date: "2026-12-06T13:00:00Z",  laps: 58, length: "5.281 km", lapRecord: "1:26.103 (Leclerc, 2023)",         drs: 3, tags: ["Season Finale","Twilight","Championships"],        desc: "The season finale. Yas Marina runs from sunset into night — stunning visually. Championships are won and lost here, and it's where the paddock says goodbye for another year." },
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
  const downloadShareCard = useShareCard(picks, nextRace);

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
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "rgba(225,6,0,0.08)", border: "1px solid rgba(225,6,0,0.2)", borderRadius: 20, marginBottom: 20 }}>
        <span style={{ fontSize: 14 }}>{nextRace.flag}</span>
        <span style={{ fontFamily: "Orbitron", fontSize: 11, color: "#e10600", letterSpacing: 1 }}>NEXT RACE: {nextRace.name} · Round {nextRace.round}</span>
      </div>
      <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.7, marginBottom: 20 }}>Pick your predicted top 10 finishers in order. Tap a driver to add them — tap a slot to remove. Then share your grid as a shareable image!</p>

      {submitted ? (
        <div>
          <div className="card" style={{ textAlign: "center", padding: "32px 20px", marginBottom: 20, borderColor: "#00dc78" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🏁</div>
            <div style={{ fontFamily: "Orbitron", fontSize: 14, color: "#00dc78", letterSpacing: 2, marginBottom: 8 }}>PREDICTION LOCKED IN!</div>
            <p style={{ fontSize: 12, color: "var(--text3)", marginBottom: 16 }}>Come back after the race to see how you did.</p>
            <button className="share-btn" onClick={downloadShareCard} style={{ margin: "0 auto" }}>
              📸 DOWNLOAD SHARE CARD
            </button>
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
          <button onClick={reset} style={{ padding: "8px 20px", background: "transparent", border: "1px solid var(--border2)", color: "var(--text2)", fontFamily: "Orbitron", fontSize: 10, letterSpacing: 2, cursor: "pointer", borderRadius: 6 }}>RESET</button>
        </div>
      ) : (
        <div className="predictor-grid">
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
              <button onClick={() => setSubmitted(true)} style={{ marginTop: 12, width: "100%", padding: "12px", background: "linear-gradient(135deg, #e10600, #ff4020)", border: "none", color: "#fff", fontFamily: "Orbitron", fontSize: 11, letterSpacing: 2, cursor: "pointer", borderRadius: 8, boxShadow: "0 4px 20px rgba(225,6,0,0.3)" }}>
                LOCK IN PREDICTION 🏁
              </button>
            )}
          </div>
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
      <SectionHeader title="F1" accent="News" group="Race & Stats" icon="📰"
        intro="The latest F1 headlines pulled live from Motorsport.com. Updated automatically." />
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "rgba(0,220,120,0.08)", border: "1px solid rgba(0,220,120,0.25)", borderRadius: 20 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00dc78", boxShadow: "0 0 6px #00dc78", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 10, color: "#00dc78", fontFamily: "Orbitron", letterSpacing: 1 }}>LIVE · Motorsport.com</span>
        </div>
      </div>
      {loading && (
        <div className="news-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton skel skel-img" />
              <div className="skeleton skel skel-title" />
              <div className="skeleton skel skel-line w-80" />
              <div className="skeleton skel skel-line w-40" />
            </div>
          ))}
        </div>
      )}
      {error && (
        <div className="card" style={{ borderColor: "#e10600", padding: 28, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>📡</div>
          <div style={{ fontFamily: "Orbitron", fontSize: 11, color: "#e10600", letterSpacing: 2, marginBottom: 6 }}>CONNECTION ERROR</div>
          <p style={{ color: "var(--text3)", fontSize: 13 }}>{error}</p>
        </div>
      )}
      {!loading && !error && news.length === 0 && <EmptyState icon="📰" title="NO NEWS FOUND" sub="Could not load articles. Check back later." />}
      {!loading && !error && news.length > 0 && (
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
  // Drivers — full name, team, bio keywords
  ...DRIVERS_2025.map(d => ({
    type: "Driver", title: d.name, sub: `${d.team} · ${d.championships ? d.championships + "× Champion · " : ""}${d.wins} wins`,
    section: "drivers", icon: "🏎️", color: d.teamColor, extra: `#${d.number}`
  })),
  // Glossary — full definition searchable
  ...GLOSSARY.map(g => ({
    type: "Term", title: g.term, sub: g.def.slice(0, 80) + "…",
    section: "glossary", icon: "📖", color: g.catColor || "#e10600",
    keywords: g.def.toLowerCase()
  })),
  // Circuits — name, circuit, description, tags all searchable
  ...RACE_CALENDAR_2026.map(r => ({
    type: "Circuit", title: r.name, sub: `${r.circuit} · Round ${r.round} · ${r.length}`,
    section: "circuits", icon: "🗺️", color: "#00dc78", extra: r.flag,
    keywords: (r.desc + " " + r.tags.join(" ")).toLowerCase()
  })),
  // Rules — title and plain text searchable
  ...F1_RULES.map(rule => ({
    type: "Rule", title: rule.title, sub: rule.plain.slice(0, 80) + "…",
    section: "rules", icon: rule.icon, color: "#FFD700",
    keywords: (rule.plain + " " + rule.example).toLowerCase()
  })),
  // Teams
  ...TEAMS_2026.map(t => ({
    type: "Team", title: t.name, sub: `${t.engine} · ${t.drivers.join(" & ")}`,
    section: "teams", icon: "🔧", color: t.color,
    keywords: (t.desc + " " + t.engineNote).toLowerCase()
  })),
  // Sections
  { type: "Section", title: "How F1 Works", sub: "Race weekends, qualifying, tyres & strategy", section: "how", icon: "🏁", color: "#e10600" },
  { type: "Section", title: "Points System", sub: "How points are scored & championships decided", section: "points", icon: "📊", color: "#e10600" },
  { type: "Section", title: "Driver Compare", sub: "Radar chart — pick any two drivers head-to-head", section: "drivercompare", icon: "🆚", color: "#FF8000" },
  { type: "Section", title: "Championship Tracker", sub: "Round-by-round WDC battle 2021–2024", section: "championship", icon: "📈", color: "#3671C6" },
  { type: "Section", title: "Tyre Strategy", sub: "Pit stop strategies from iconic races visualised", section: "tyrestrategy", icon: "🏎", color: "#FFD700" },
  { type: "Section", title: "Which Team Are You?", sub: "8 personality questions to find your F1 team", section: "teamquiz", icon: "🎯", color: "#229971" },
  { type: "Section", title: "Teammate H2H", sub: "2024 qualifying & race head-to-head records", section: "h2h", icon: "⚔️", color: "#9966FF" },
  { type: "Section", title: "Race Predictor", sub: "Build & share your predicted top 10 grid", section: "predictor", icon: "🔮", color: "#e10600" },
  { type: "Section", title: "F1 Quiz", sub: "15 questions to test your knowledge", section: "quiz", icon: "🧠", color: "#27F4D2" },
  { type: "Section", title: "Live Results", sub: "Race results, driver & constructor standings", section: "results", icon: "🏆", color: "#FFD700" },
  { type: "Section", title: "All-Time Records", sub: "Most wins, poles, titles & fastest laps in history", section: "records", icon: "🎖️", color: "#cd7f32" },
  { type: "Section", title: "2026 Season Preview", sub: "Power rankings, race previews & rookie spotlights", section: "preview", icon: "🔭", color: "#e10600" },
  { type: "Section", title: "F1 News", sub: "Latest headlines from Motorsport.com", section: "news", icon: "📰", color: "#00dc78" },
  { type: "Section", title: "Driver Changes", sub: "Every major move 2018–2026 explained", section: "history", icon: "📅", color: "#606080" },
  { type: "Section", title: "Car Compare 2025 vs 2026", sub: "Technical regulation changes side by side", section: "compare", icon: "⚡", color: "#e10600" },
];

// Deep search — also match keywords field
function searchIndex(query) {
  const q = query.toLowerCase();
  return SEARCH_INDEX.filter(item =>
    item.title.toLowerCase().includes(q) ||
    (item.sub || "").toLowerCase().includes(q) ||
    (item.keywords || "").includes(q)
  ).slice(0, 8);
}

const TYPE_COLORS = {
  Driver: "#e10600", Term: "#9966FF", Circuit: "#00dc78", Section: "#606080"
};

function GlobalSearch({ onNavigate }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(-1);
  const ref = useRef();
  const inputRef = useRef();

  useEffect(() => {
    function handle(e) { if (!ref.current?.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const results = query.length > 1 ? searchIndex(query) : [];

  function handleKey(e) {
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setFocused(f => Math.min(f + 1, results.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setFocused(f => Math.max(f - 1, 0)); }
    if (e.key === "Enter" && focused >= 0 && results[focused]) {
      onNavigate(results[focused].section); setQuery(""); setOpen(false); setFocused(-1);
    }
    if (e.key === "Escape") { setOpen(false); setFocused(-1); }
  }

  // Highlight matched text
  function highlight(text, q) {
    if (!q || q.length < 2) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return <>{text.slice(0, idx)}<mark style={{ background: "rgba(225,6,0,0.25)", color: "var(--text)", borderRadius: 2, padding: "0 1px" }}>{text.slice(idx, idx + q.length)}</mark>{text.slice(idx + q.length)}</>;
  }

  return (
    <div ref={ref} style={{ position: "relative", width: "100%", maxWidth: 480 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10, padding: "9px 14px",
        background: "var(--card-bg)", border: `1px solid ${open ? "rgba(225,6,0,0.4)" : "var(--glass-border)"}`,
        borderRadius: 10, transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: open ? "0 0 0 3px rgba(225,6,0,0.08)" : "var(--shadow)",
        backdropFilter: "blur(12px)",
      }}>
        <span style={{ fontSize: 14, color: "var(--text3)", flexShrink: 0 }}>🔍</span>
        <input ref={inputRef}
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); setFocused(-1); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKey}
          placeholder="Search drivers, circuits, features..."
          style={{ flex: 1, background: "none", border: "none", outline: "none", color: "var(--text)", fontSize: 13, fontFamily: "Exo 2, sans-serif" }}
        />
        {query && (
          <button onClick={() => { setQuery(""); setOpen(false); inputRef.current?.focus(); }}
            style={{ background: "none", border: "none", color: "var(--text4)", cursor: "pointer", fontSize: 13, lineHeight: 1, padding: "2px 4px", borderRadius: 4, transition: "color 0.15s" }}
            onMouseEnter={e => e.target.style.color = "var(--text)"}
            onMouseLeave={e => e.target.style.color = "var(--text4)"}>✕</button>
        )}
        {!query && <span style={{ fontSize: 10, color: "var(--text4)", fontFamily: "Orbitron", letterSpacing: 1, flexShrink: 0 }}>⌘K</span>}
      </div>

      {open && query.length > 1 && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
          background: "rgba(10,10,20,0.95)", backdropFilter: "blur(24px)",
          border: "1px solid var(--glass-border)", borderTop: "2px solid #e10600",
          borderRadius: "0 0 12px 12px", zIndex: 500,
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          overflow: "hidden",
        }}>
          {results.length > 0 ? (
            <>
              {results.map((r, i) => (
                <button key={i}
                  onClick={() => { onNavigate(r.section); setQuery(""); setOpen(false); setFocused(-1); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 12, width: "100%",
                    padding: "11px 16px", background: focused === i ? "rgba(225,6,0,0.08)" : "none",
                    border: "none", borderBottom: "1px solid var(--border)", cursor: "pointer",
                    textAlign: "left", transition: "background 0.1s",
                  }}
                  onMouseEnter={() => setFocused(i)}
                  onMouseLeave={() => setFocused(-1)}>
                  {/* Icon with team/type colour background */}
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                    background: `${r.color || "#e10600"}18`,
                    border: `1px solid ${r.color || "#e10600"}33`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16,
                  }}>
                    {r.extra || r.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>
                      {highlight(r.title, query)}
                    </div>
                    <div style={{ fontSize: 10, color: "var(--text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {r.sub}
                    </div>
                  </div>
                  {/* Type badge */}
                  <div style={{
                    fontSize: 8, fontFamily: "Orbitron", letterSpacing: 1,
                    padding: "2px 7px", borderRadius: 20, flexShrink: 0,
                    background: `${TYPE_COLORS[r.type] || "#606080"}18`,
                    color: TYPE_COLORS[r.type] || "#606080",
                    border: `1px solid ${TYPE_COLORS[r.type] || "#606080"}33`,
                    textTransform: "uppercase",
                  }}>{r.type}</div>
                </button>
              ))}
              <div style={{ padding: "8px 16px", fontSize: 10, color: "var(--text4)", fontFamily: "Orbitron", letterSpacing: 1 }}>
                {results.length} RESULT{results.length !== 1 ? "S" : ""} · ↑↓ NAVIGATE · ↵ SELECT
              </div>
            </>
          ) : (
            <div style={{ padding: "24px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🔎</div>
              <div style={{ fontFamily: "Orbitron", fontSize: 10, color: "var(--text3)", letterSpacing: 2 }}>NO RESULTS FOR "{query.toUpperCase()}"</div>
              <div style={{ fontSize: 11, color: "var(--text4)", marginTop: 4 }}>Try a driver name, circuit, or F1 term</div>
            </div>
          )}
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
              {/* Styled circuit placeholder — consistent across all platforms */}
              <div style={{
                width: "100%", height: 110, borderRadius: 8, marginBottom: 10,
                background: `linear-gradient(135deg, var(--bg3) 0%, var(--bg2) 100%)`,
                border: "1px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0 18px", overflow: "hidden", position: "relative",
              }}>
                {/* Circuit round watermark */}
                <div style={{ position: "absolute", right: -8, top: -12, fontFamily: "Orbitron", fontSize: 72, fontWeight: 900, color: "rgba(225,6,0,0.06)", lineHeight: 1, pointerEvents: "none" }}>
                  {c.round}
                </div>
                {/* Left: round + name */}
                <div>
                  <div style={{ fontFamily: "Orbitron", fontSize: 9, color: "#e10600", letterSpacing: 3, marginBottom: 4 }}>ROUND {c.round}</div>
                  <div style={{ fontFamily: "Orbitron", fontSize: 16, fontWeight: 900, color: "var(--text)", lineHeight: 1.2, maxWidth: 160 }}>{c.circuit.toUpperCase()}</div>
                </div>
                {/* Right: DRS + length pill */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                  <div style={{ background: "rgba(225,6,0,0.12)", border: "1px solid rgba(225,6,0,0.25)", borderRadius: 20, padding: "3px 10px", fontSize: 9, fontFamily: "Orbitron", color: "#e10600", letterSpacing: 1 }}>
                    DRS ×{c.drs}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "Orbitron" }}>{c.length}</div>
                </div>
              </div>
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

// ─── CHAMPIONSHIP BATTLE DATA ────────────────────────────────────────────────
const CHAMPIONSHIP_SEASONS = {
  2021: {
    title: "The Greatest Season Ever?",
    drama: "Decided on final lap, final race",
    note: "Verstappen & Hamilton were tied going into Abu Dhabi. A controversial late safety car restart handed Verstappen the title on the last lap.",
    drivers: [
      { name: "Verstappen", short: "VER", color: "#3671C6", team: "Red Bull" },
      { name: "Hamilton", short: "HAM", color: "#27F4D2", team: "Mercedes" },
      { name: "Bottas", short: "BOT", color: "#00A6B4", team: "Mercedes" },
      { name: "Pérez", short: "PER", color: "#2060C0", team: "Red Bull" },
    ],
    rounds: [
      { label: "R1", points: [18, 25, 15, 0] },
      { label: "R5", points: [105, 94, 67, 40] },
      { label: "R10", points: [156, 177, 108, 90] },
      { label: "R15", points: [226, 221, 133, 120] },
      { label: "R18", points: [293, 287, 155, 149] },
      { label: "R21", points: [369, 369, 192, 183] },
      { label: "Final", points: [395, 387, 226, 190] },
    ],
  },
  2022: {
    title: "Ground Effect Revolution",
    drama: "Leclerc led, then Red Bull took over",
    note: "Ferrari started brilliantly but reliability failures gifted Verstappen the title. He won 15 of 22 races and broke the single-season wins record.",
    drivers: [
      { name: "Verstappen", short: "VER", color: "#3671C6", team: "Red Bull" },
      { name: "Leclerc", short: "LEC", color: "#E8002D", team: "Ferrari" },
      { name: "Pérez", short: "PER", color: "#2060C0", team: "Red Bull" },
      { name: "Russell", short: "RUS", color: "#27F4D2", team: "Mercedes" },
    ],
    rounds: [
      { label: "R1", points: [0, 26, 0, 4] },
      { label: "R5", points: [59, 104, 54, 28] },
      { label: "R10", points: [175, 138, 129, 84] },
      { label: "R14", points: [258, 178, 173, 111] },
      { label: "R18", points: [341, 235, 222, 158] },
      { label: "Final", points: [454, 308, 305, 275] },
    ],
  },
  2023: {
    title: "Verstappen Steamroller",
    drama: "Record 19 wins in a single season",
    note: "Red Bull won 21 of 22 races. Verstappen was in a class of his own — he even took pole and won at tracks Red Bull historically struggled at.",
    drivers: [
      { name: "Verstappen", short: "VER", color: "#3671C6", team: "Red Bull" },
      { name: "Pérez", short: "PER", color: "#2060C0", team: "Red Bull" },
      { name: "Alonso", short: "ALO", color: "#229971", team: "Aston Martin" },
      { name: "Hamilton", short: "HAM", color: "#27F4D2", team: "Mercedes" },
    ],
    rounds: [
      { label: "R1", points: [25, 16, 15, 18] },
      { label: "R5", points: [119, 84, 75, 44] },
      { label: "R10", points: [229, 150, 131, 111] },
      { label: "R15", points: [331, 189, 174, 158] },
      { label: "R20", points: [514, 240, 206, 194] },
      { label: "Final", points: [575, 285, 234, 234] },
    ],
  },
  2024: {
    title: "McLaren vs Red Bull",
    drama: "Norris pushed Verstappen to the limit",
    note: "Verstappen took his 4th title despite McLaren running the fastest car in the second half of the season. Norris cut a 119-point deficit to just 47 at one stage.",
    drivers: [
      { name: "Verstappen", short: "VER", color: "#3671C6", team: "Red Bull" },
      { name: "Norris", short: "NOR", color: "#FF8000", team: "McLaren" },
      { name: "Leclerc", short: "LEC", color: "#E8002D", team: "Ferrari" },
      { name: "Piastri", short: "PIA", color: "#FF6600", team: "McLaren" },
    ],
    rounds: [
      { label: "R1", points: [25, 2, 15, 8] },
      { label: "R5", points: [136, 62, 56, 39] },
      { label: "R10", points: [194, 131, 113, 81] },
      { label: "R15", points: [303, 241, 217, 179] },
      { label: "R20", points: [362, 331, 272, 222] },
      { label: "Final", points: [437, 374, 356, 292] },
    ],
  },
};

// ─── H2H TEAMMATE DATA ────────────────────────────────────────────────────────
const H2H_DATA_2024 = [
  { team: "Red Bull", color: "#3671C6", d1: "Verstappen", d2: "Pérez", qualiD1: 19, qualiD2: 5, raceD1: 20, raceD2: 4, note: "Verstappen dominated every metric." },
  { team: "Ferrari", color: "#E8002D", d1: "Leclerc", d2: "Sainz", qualiD1: 16, qualiD2: 8, raceD1: 13, raceD2: 11, note: "Sainz was closer in races than qualifying." },
  { team: "McLaren", color: "#FF8000", d1: "Norris", d2: "Piastri", qualiD1: 13, qualiD2: 11, raceD1: 12, raceD2: 12, note: "Remarkably even — the best team pairing of 2024." },
  { team: "Mercedes", color: "#27F4D2", d1: "Hamilton", d2: "Russell", qualiD1: 9, qualiD2: 15, raceD1: 9, raceD2: 15, note: "Russell outperformed Hamilton in his final Mercedes season." },
  { team: "Aston Martin", color: "#229971", d1: "Alonso", d2: "Stroll", qualiD1: 19, qualiD2: 5, raceD1: 17, raceD2: 7, note: "Alonso comprehensively outpaced his teammate." },
  { team: "Alpine", color: "#0093CC", d1: "Gasly", d2: "Ocon", qualiD1: 12, qualiD2: 12, raceD1: 11, raceD2: 13, note: "Closest qualifying battle of any team in 2024." },
  { team: "Williams", color: "#64C4FF", d1: "Albon", d2: "Sargeant/Colapinto", qualiD1: 20, qualiD2: 4, raceD1: 19, raceD2: 5, note: "Albon dominated — another case for 'team's best driver'." },
  { team: "Haas", color: "#B6BABD", d1: "Hülkenberg", d2: "Magnussen", qualiD1: 17, qualiD2: 7, raceD1: 15, raceD2: 9, note: "Hülkenberg's best season in years." },
];

// ─── TYRE STRATEGY DATA ───────────────────────────────────────────────────────
const TYRE_STRATEGIES = [
  {
    race: "2023 Bahrain GP", laps: 57,
    desc: "Classic two-stopper on a circuit that's hard on tyres. Medium-Hard-Hard was the dominant strategy.",
    compounds: { S: { color: "#e10600", label: "SOFT" }, M: { color: "#FFD700", label: "MEDIUM" }, H: { color: "#f0f0f0", label: "HARD" }, I: { color: "#4CAF50", label: "INTER" } },
    strategies: [
      { driver: "Verstappen (P1)", stints: [{ c:"M", laps:14 }, { c:"H", laps:22 }, { c:"H", laps:21 }] },
      { driver: "Pérez (P2)", stints: [{ c:"M", laps:16 }, { c:"H", laps:19 }, { c:"H", laps:22 }] },
      { driver: "Alonso (P3)", stints: [{ c:"M", laps:13 }, { c:"H", laps:24 }, { c:"H", laps:20 }] },
      { driver: "Sainz (P4)", stints: [{ c:"M", laps:13 }, { c:"H", laps:20 }, { c:"H", laps:24 }] },
    ],
  },
  {
    race: "2021 Abu Dhabi GP", laps: 58,
    desc: "The race that decided the championship on the final lap. Verstappen switched to Softs late — Hamilton stayed out. The late safety car changed everything.",
    compounds: { S: { color: "#e10600", label: "SOFT" }, M: { color: "#FFD700", label: "MEDIUM" }, H: { color: "#f0f0f0", label: "HARD" } },
    strategies: [
      { driver: "Verstappen (P1)", stints: [{ c:"M", laps:14 }, { c:"H", laps:26 }, { c:"S", laps:18 }] },
      { driver: "Hamilton (P2)", stints: [{ c:"M", laps:14 }, { c:"H", laps:44 }] },
      { driver: "Leclerc (P3)", stints: [{ c:"H", laps:25 }, { c:"M", laps:33 }] },
      { driver: "Sainz (P5)", stints: [{ c:"M", laps:14 }, { c:"H", laps:27 }, { c:"S", laps:17 }] },
    ],
  },
  {
    race: "2022 Monaco GP", laps: 78,
    desc: "Monaco almost always produces a one-stop race — overtaking is nearly impossible so track position is everything. Tyre choice at the start defines your race.",
    compounds: { S: { color: "#e10600", label: "SOFT" }, M: { color: "#FFD700", label: "MEDIUM" }, H: { color: "#f0f0f0", label: "HARD" }, I: { color: "#4CAF50", label: "INTER" }, W: { color: "#3399ff", label: "WET" } },
    strategies: [
      { driver: "Pérez (P1)", stints: [{ c:"I", laps:8 }, { c:"M", laps:40 }, { c:"H", laps:30 }] },
      { driver: "Alonso (P2)", stints: [{ c:"I", laps:8 }, { c:"M", laps:42 }, { c:"H", laps:28 }] },
      { driver: "Leclerc (DNS)", stints: [{ c:"I", laps:1 }] },
      { driver: "Sainz (P3)", stints: [{ c:"I", laps:8 }, { c:"M", laps:39 }, { c:"H", laps:31 }] },
    ],
  },
  {
    race: "2024 British GP", laps: 52,
    desc: "Silverstone's weather unpredictability made this a strategic masterclass. Teams juggled between inters and slicks as the track dried.",
    compounds: { S: { color: "#e10600", label: "SOFT" }, M: { color: "#FFD700", label: "MEDIUM" }, H: { color: "#f0f0f0", label: "HARD" }, I: { color: "#4CAF50", label: "INTER" } },
    strategies: [
      { driver: "Hamilton (P1)", stints: [{ c:"I", laps:5 }, { c:"M", laps:15 }, { c:"H", laps:12 }, { c:"S", laps:20 }] },
      { driver: "Verstappen (P5)", stints: [{ c:"I", laps:6 }, { c:"H", laps:18 }, { c:"M", laps:28 }] },
      { driver: "Norris (P2)", stints: [{ c:"I", laps:5 }, { c:"M", laps:17 }, { c:"S", laps:30 }] },
      { driver: "Piastri (P3)", stints: [{ c:"I", laps:5 }, { c:"M", laps:16 }, { c:"H", laps:31 }] },
    ],
  },
];

// ─── TEAM PERSONALITY QUIZ DATA ──────────────────────────────────────────────
const TEAM_QUIZ_QUESTIONS = [
  {
    q: "It's Saturday night before a big event. You're:",
    options: [
      { text: "Asleep by 10pm. Preparation is everything.", scores: { redbull: 2, mercedes: 3, ferrari: 0, mclaren: 1 } },
      { text: "Out at a rooftop bar. Life's too short.", scores: { ferrari: 3, alpine: 2, haas: 1, williams: 1 } },
      { text: "Watching rival footage and taking notes.", scores: { mercedes: 2, mclaren: 3, rb: 2, aston: 1 } },
      { text: "Still working. Sleep is for the off-season.", scores: { redbull: 3, ferrari: 1, audi: 2, cadillac: 1 } },
    ],
  },
  {
    q: "When things go wrong, your instinct is to:",
    options: [
      { text: "Stay calm. Panic costs you more time than the problem.", scores: { mercedes: 3, mclaren: 2, aston: 2, williams: 1 } },
      { text: "Find someone to blame immediately.", scores: { ferrari: 3, redbull: 1, haas: 1, alpine: 1 } },
      { text: "Double down — you'll outwork the problem.", scores: { redbull: 3, rb: 2, cadillac: 2, audi: 1 } },
      { text: "Go back to first principles and innovate.", scores: { mclaren: 3, mercedes: 2, audi: 3, williams: 2 } },
    ],
  },
  {
    q: "Your leadership style is:",
    options: [
      { text: "Brilliant but demanding — excellence or nothing.", scores: { redbull: 3, ferrari: 2, mercedes: 1, mclaren: 1 } },
      { text: "Collaborative. Everyone's voice matters.", scores: { williams: 3, mclaren: 2, aston: 2, rb: 1 } },
      { text: "Charismatic. You lead through personality.", scores: { ferrari: 3, alpine: 2, cadillac: 2, haas: 1 } },
      { text: "Data-driven. Feelings are a distraction.", scores: { mercedes: 3, redbull: 2, rb: 2, audi: 2 } },
    ],
  },
  {
    q: "In competition, you most want to:",
    options: [
      { text: "Win every single thing. Second is the first loser.", scores: { redbull: 3, ferrari: 2, mercedes: 2, mclaren: 1 } },
      { text: "Surprise everyone with an unexpected result.", scores: { williams: 3, haas: 3, rb: 2, cadillac: 2 } },
      { text: "Build something sustainable for the long term.", scores: { mercedes: 3, mclaren: 3, aston: 2, audi: 2 } },
      { text: "Put on a show — the spectacle matters.", scores: { ferrari: 3, alpine: 2, cadillac: 1, williams: 1 } },
    ],
  },
  {
    q: "Your relationship with tradition is:",
    options: [
      { text: "Tradition is everything. History defines you.", scores: { ferrari: 3, williams: 2, mercedes: 1, mclaren: 1 } },
      { text: "Respect it, but you're building your own legacy.", scores: { redbull: 2, mclaren: 3, aston: 2, rb: 2 } },
      { text: "Burn it down. New eras need new thinking.", scores: { audi: 3, cadillac: 3, alpine: 2, haas: 1 } },
      { text: "What tradition? You're only focused on next weekend.", scores: { haas: 3, rb: 2, redbull: 1, cadillac: 1 } },
    ],
  },
  {
    q: "How do you handle the media?",
    options: [
      { text: "Every word is measured and strategic.", scores: { mercedes: 3, mclaren: 2, audi: 2, aston: 1 } },
      { text: "Passionately. You wear your heart on your sleeve.", scores: { ferrari: 3, alpine: 2, haas: 1, williams: 1 } },
      { text: "Directly. You say exactly what you think.", scores: { redbull: 3, rb: 2, haas: 2, cadillac: 2 } },
      { text: "You're building a brand, not just answering questions.", scores: { cadillac: 3, williams: 2, alpine: 2, aston: 2 } },
    ],
  },
  {
    q: "Your preferred car is:",
    options: [
      { text: "A German precision machine. Engineered to perfection.", scores: { mercedes: 3, audi: 3, aston: 1, rb: 1 } },
      { text: "A beautiful Italian masterpiece — even if unreliable.", scores: { ferrari: 3, alpine: 1, mclaren: 1, haas: 1 } },
      { text: "An understated British supercar. No fuss, just fast.", scores: { mclaren: 3, williams: 3, aston: 2, redbull: 1 } },
      { text: "An American muscle car. Loud, proud, here to prove something.", scores: { cadillac: 3, haas: 2, redbull: 1, rb: 1 } },
    ],
  },
  {
    q: "On your day off, you're:",
    options: [
      { text: "At the simulator. You don't really take days off.", scores: { redbull: 3, mercedes: 2, ferrari: 1, rb: 2 } },
      { text: "Hiking, cycling, or doing something active outdoors.", scores: { mclaren: 2, williams: 2, alpine: 3, aston: 2 } },
      { text: "At a glamorous event — seen and noticed.", scores: { ferrari: 3, cadillac: 2, alpine: 1, haas: 1 } },
      { text: "Quietly at home. Fame isn't really your thing.", scores: { audi: 3, rb: 2, williams: 2, haas: 2 } },
    ],
  },
];

const TEAM_QUIZ_RESULTS = {
  redbull: { name: "Oracle Red Bull Racing", emoji: "🔵", color: "#3671C6", desc: "You're a winner. Period. You expect excellence from yourself and everyone around you, you work obsessively hard, and second place makes you physically uncomfortable. You've probably already thought about tomorrow's schedule. Verstappen would approve." },
  mercedes: { name: "Mercedes-AMG Petronas", emoji: "🩵", color: "#27F4D2", desc: "Strategic, disciplined, and always thinking three moves ahead. You built something dominant through engineering genius and systematic thinking. You handle pressure like a professional and never let emotions override logic. Hamilton's kind of person." },
  ferrari: { name: "Scuderia Ferrari", emoji: "🔴", color: "#E8002D", desc: "Passionate, dramatic, and deeply tied to history. You feel everything intensely, you want to put on a show, and you'd rather lose brilliantly than win boringly. The Tifosi would love you — even if you occasionally forget to put the tyres on." },
  mclaren: { name: "McLaren F1 Team", emoji: "🧡", color: "#FF8000", desc: "Methodical, innovative, and quietly building something special. You learn from every mistake, you surround yourself with great people, and your patience eventually pays off. The comeback story. Norris and Piastri's team all the way." },
  astonmartin: { name: "Aston Martin Aramco", emoji: "💚", color: "#229971", desc: "Ambitious and refined. You have huge dreams, the resources to back them up, and a flair for doing things in style. You're playing the long game — and you've got Fernando Alonso on side, which means you're definitely not giving up." },
  alpine: { name: "Alpine F1 Team", emoji: "💙", color: "#0093CC", desc: "Creative, passionate, and a little chaotic — but lovably so. You approach problems differently, you're not afraid to change direction, and you believe deeply in the underdog story. Also: you definitely have strong opinions about cheese." },
  williams: { name: "Williams Racing", emoji: "🩵", color: "#64C4FF", desc: "A genuine soul with a great story to tell. You've been through tough times but you never lost your identity, and you're building back with real purpose. You don't need to shout about it — your results will do the talking." },
  haas: { name: "MoneyGram Haas F1 Team", emoji: "⚪", color: "#B6BABD", desc: "Pragmatic, direct, and quietly competitive. You don't have the biggest budget or the fanciest factory, but you maximise what you've got. You speak your mind, you don't do politics, and you occasionally produce a massive upset result." },
  rb: { name: "Racing Bulls", emoji: "💙", color: "#6692FF", desc: "You're the next generation energy. Young, hungry, and not intimidated by anyone. You love developing talent, you move fast, and you don't mind being overlooked — because you're about to prove everyone wrong." },
  audi: { name: "Audi F1 Team", emoji: "🔴", color: "#BB0A21", desc: "You're here to build something historic from the ground up. You've got the resources, the engineering mindset, and the patience for a long project. The first year might be bumpy, but you're thinking decade-long. German engineering, F1 scale." },
  cadillac: { name: "Cadillac F1 Team", emoji: "🇺🇸", color: "#CC0000", desc: "The American dream. You're bold, you back yourself against the establishment, and you're not afraid to be the newcomer in a room full of history. Everyone said it couldn't be done. You're proving them wrong, one lap at a time." },
};

// ─── DRIVER COMPARE SECTION ──────────────────────────────────────────────────
function RadarChart({ d1, d2, color1, color2 }) {
  const axes = [
    { label: "Speed", key: "skill" },
    { label: "Racecraft", key: "racecraft" },
    { label: "Consistency", key: "consistency" },
    { label: "Media", key: "media" },
  ];
  const cx = 130, cy = 130, r = 95;
  const n = axes.length;
  const toXY = (val, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const ratio = val / 100;
    return { x: cx + r * ratio * Math.cos(angle), y: cy + r * ratio * Math.sin(angle) };
  };
  const labelXY = (i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return { x: cx + (r + 22) * Math.cos(angle), y: cy + (r + 22) * Math.sin(angle) };
  };
  const polygon = (driver) => axes.map((a, i) => {
    const pt = toXY(driver[a.key], i);
    return `${pt.x},${pt.y}`;
  }).join(" ");

  return (
    <svg width="260" height="260" style={{ overflow: "visible" }}>
      {/* Grid rings */}
      {[0.25, 0.5, 0.75, 1].map(frac => (
        <polygon key={frac}
          points={axes.map((_, i) => { const p = toXY(100 * frac, i); return `${p.x},${p.y}`; }).join(" ")}
          fill="none" stroke="var(--border)" strokeWidth="1" />
      ))}
      {/* Axes */}
      {axes.map((_, i) => {
        const p = toXY(100, i);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--border)" strokeWidth="1" />;
      })}
      {/* D2 polygon */}
      {d2 && <polygon points={polygon(d2)} fill={color2 + "30"} stroke={color2} strokeWidth="2" strokeLinejoin="round" />}
      {/* D1 polygon */}
      {d1 && <polygon points={polygon(d1)} fill={color1 + "30"} stroke={color1} strokeWidth="2.5" strokeLinejoin="round" />}
      {/* Axis labels */}
      {axes.map((a, i) => {
        const lp = labelXY(i);
        return (
          <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: 10, fontFamily: "Orbitron, sans-serif", fill: "var(--text3)", letterSpacing: 1 }}>
            {a.label.toUpperCase()}
          </text>
        );
      })}
    </svg>
  );
}

function DriverCompareSection() {
  const allDrivers = [...(window.__DRIVERS_2025__ || [])];
  const [id1, setId1] = useState("max");
  const [id2, setId2] = useState("norris");
  // pull from global DRIVERS_2025 via window, fallback to hardcoded IDs
  const DRIVERS = window.__DRIVERS_2025__ || [];
  const d1 = DRIVERS.find(d => d.id === id1) || DRIVERS[0];
  const d2 = DRIVERS.find(d => d.id === id2) || DRIVERS[1];

  const axes = [
    { label: "Raw Speed", key: "skill" },
    { label: "Racecraft", key: "racecraft" },
    { label: "Consistency", key: "consistency" },
    { label: "Media Appeal", key: "media" },
  ];

  return (
    <div>
      <div className="section-title">Driver <span>Compare</span></div>
      <div className="section-line" />
      <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.7, marginBottom: 20 }}>
        Pick any two drivers to compare their ratings head-to-head on the radar chart.
      </p>

      <div className="compare-select-row">
        {[{ id: id1, setId: setId1, which: 1 }, { id: id2, setId: setId2, which: 2 }].map(({ id, setId, which }) => {
          const d = DRIVERS.find(dr => dr.id === id) || DRIVERS[0];
          return (
            <div key={which}>
              <div style={{ fontSize: 9, color: "#e10600", fontFamily: "Orbitron", letterSpacing: 2, marginBottom: 6 }}>DRIVER {which}</div>
              <select className="compare-driver-select" value={id} onChange={e => setId(e.target.value)}>
                {DRIVERS.map(dr => <option key={dr.id} value={dr.id}>{dr.name} — {dr.team}</option>)}
              </select>
              {d && (
                <div style={{ marginTop: 10, background: "var(--card-bg)", border: `1px solid ${d.teamColor}44`, borderRadius: 8, padding: "12px 14px", backdropFilter: "blur(8px)" }}>
                  <div style={{ fontFamily: "Orbitron", fontSize: 12, color: d.teamColor, fontWeight: 900 }}>#{d.number} {d.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{d.country} · {d.team}</div>
                  <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                    {[["⭐", d.championships, "Titles"], [d.wins, null, "Wins"], [d.poles, null, "Poles"]].map(([v, v2, l]) => (
                      <div key={l} style={{ textAlign: "center" }}>
                        <div style={{ fontFamily: "Orbitron", fontSize: 14, fontWeight: 900, color: d.teamColor }}>{v2 !== null ? `${v}${v2}` : v}</div>
                        <div style={{ fontSize: 9, color: "var(--text4)", letterSpacing: 1 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {d1 && d2 && (
        <>
          {/* Radar */}
          <div className="card" style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 14 }}>
              <span style={{ fontSize: 12, color: d1.teamColor, fontWeight: 700 }}>● {d1.name}</span>
              <span style={{ fontSize: 12, color: d2.teamColor, fontWeight: 700 }}>● {d2.name}</span>
            </div>
            <div className="radar-wrap">
              <RadarChart d1={d1} d2={d2} color1={d1.teamColor} color2={d2.teamColor} />
            </div>
          </div>

          {/* Bar comparison */}
          <div className="card">
            <div style={{ fontFamily: "Orbitron", fontSize: 10, color: "#e10600", letterSpacing: 2, marginBottom: 14 }}>STAT BREAKDOWN</div>
            {axes.map(({ label, key }) => {
              const total = d1[key] + d2[key];
              const pct1 = (d1[key] / total * 100).toFixed(0);
              const pct2 = (d2[key] / total * 100).toFixed(0);
              return (
                <div key={key} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: d1.teamColor }}>{d1[key]}</span>
                    <span style={{ fontSize: 10, color: "var(--text3)", fontFamily: "Orbitron", letterSpacing: 1 }}>{label.toUpperCase()}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: d2.teamColor }}>{d2[key]}</span>
                  </div>
                  <div style={{ height: 8, background: "var(--bg3)", borderRadius: 4, overflow: "hidden", display: "flex" }}>
                    <div style={{ width: `${pct1}%`, background: d1.teamColor, boxShadow: `0 0 6px ${d1.teamColor}80`, transition: "width 0.7s" }} />
                    <div style={{ width: `${pct2}%`, background: d2.teamColor, boxShadow: `0 0 6px ${d2.teamColor}80`, transition: "width 0.7s" }} />
                  </div>
                </div>
              );
            })}
            {/* Overall winner */}
            {(() => {
              const t1 = d1.skill + d1.racecraft + d1.consistency + d1.media;
              const t2 = d2.skill + d2.racecraft + d2.consistency + d2.media;
              const winner = t1 > t2 ? d1 : t2 > t1 ? d2 : null;
              return (
                <div style={{ marginTop: 14, padding: "12px 16px", background: winner ? `${winner.teamColor}12` : "var(--bg3)", border: `1px solid ${winner ? winner.teamColor + "44" : "var(--border)"}`, borderRadius: 8, textAlign: "center" }}>
                  {winner ? (
                    <>
                      <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "Orbitron", letterSpacing: 2, marginBottom: 4 }}>OVERALL EDGE</div>
                      <div style={{ fontSize: 14, fontWeight: 900, color: winner.teamColor, fontFamily: "Orbitron" }}>{winner.name} +{Math.abs(t1 - t2)} pts</div>
                    </>
                  ) : (
                    <div style={{ fontSize: 12, color: "var(--text3)" }}>Perfect tie — these two are identical on paper.</div>
                  )}
                </div>
              );
            })()}
          </div>
        </>
      )}
    </div>
  );
}

// ─── CHAMPIONSHIP TRACKER ────────────────────────────────────────────────────
function ChampionshipTrackerSection() {
  const [year, setYear] = useState(2024);
  const season = CHAMPIONSHIP_SEASONS[year];

  const maxPts = Math.max(...season.rounds.flatMap(r => r.points));
  const svgW = 560, svgH = 280, padL = 46, padR = 20, padT = 20, padB = 30;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;
  const rounds = season.rounds;
  const nRounds = rounds.length;

  const ptToX = i => padL + (i / (nRounds - 1)) * chartW;
  const ptToY = v => padT + chartH - (v / (maxPts * 1.05)) * chartH;

  return (
    <div>
      <div className="section-title">Championship <span>Battle</span></div>
      <div className="section-line" />
      <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.7, marginBottom: 16 }}>
        See how the World Drivers' Championship unfolded round by round. Select a season to relive the battle.
      </p>

      <div className="tracker-year-tabs">
        {[2021, 2022, 2023, 2024].map(y => (
          <button key={y} className={`year-btn${year === y ? " active" : ""}`} onClick={() => setYear(y)}>{y}</button>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          <span style={{ fontFamily: "Orbitron", fontSize: 13, fontWeight: 900, color: "var(--text)" }}>{year}: {season.title}</span>
          <span className="drama-badge">{season.drama}</span>
        </div>
        <p style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.7 }}>{season.note}</p>
      </div>

      <div className="tracker-legend">
        {season.drivers.map(d => (
          <div key={d.short} className="tracker-legend-item">
            <div className="tracker-dot" style={{ background: d.color, boxShadow: `0 0 6px ${d.color}` }} />
            <span>{d.name}</span>
            <span style={{ fontSize: 10, color: "var(--text4)" }}>({d.team})</span>
          </div>
        ))}
      </div>

      <div className="tracker-chart">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", maxWidth: svgW }}>
          {/* Horizontal grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map(frac => {
            const y = ptToY(maxPts * 1.05 * frac);
            const val = Math.round(maxPts * 1.05 * frac);
            return (
              <g key={frac}>
                <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="var(--border)" strokeWidth="1" strokeDasharray="4,4" />
                <text x={padL - 6} y={y} textAnchor="end" dominantBaseline="middle" style={{ fontSize: 9, fill: "var(--text4)", fontFamily: "Orbitron" }}>{val}</text>
              </g>
            );
          })}
          {/* Round labels */}
          {rounds.map((r, i) => (
            <text key={i} x={ptToX(i)} y={svgH - 8} textAnchor="middle" style={{ fontSize: 9, fill: "var(--text4)", fontFamily: "Orbitron" }}>{r.label}</text>
          ))}
          {/* Lines per driver */}
          {season.drivers.map((d, di) => {
            const pts = rounds.map(r => ({ x: ptToX(rounds.indexOf(r)), y: ptToY(r.points[di]) }));
            const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
            return (
              <g key={d.short}>
                <path d={pathD} fill="none" stroke={d.color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"
                  style={{ filter: `drop-shadow(0 0 4px ${d.color})` }} />
                {pts.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="4" fill={d.color} stroke="var(--bg2)" strokeWidth="2" />
                ))}
                {/* Final point label */}
                <text x={pts[pts.length - 1].x + 6} y={pts[pts.length - 1].y + 1} dominantBaseline="middle"
                  style={{ fontSize: 10, fontWeight: 700, fill: d.color, fontFamily: "Orbitron" }}>{d.short}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Season summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10, marginTop: 16 }}>
        {season.drivers.map((d, di) => (
          <div key={d.short} className="card" style={{ textAlign: "center", borderTop: `2px solid ${d.color}`, padding: "12px 8px" }}>
            <div style={{ fontFamily: "Orbitron", fontSize: 10, color: d.color, fontWeight: 700, marginBottom: 4 }}>{d.name}</div>
            <div style={{ fontFamily: "Orbitron", fontSize: 20, fontWeight: 900, color: "var(--text)" }}>{season.rounds[season.rounds.length - 1].points[di]}</div>
            <div style={{ fontSize: 9, color: "var(--text4)", letterSpacing: 1 }}>POINTS</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TEAM QUIZ SECTION ───────────────────────────────────────────────────────
function TeamQuizSection() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({});
  const [result, setResult] = useState(null);

  function answer(scoreMap) {
    const newScores = { ...scores };
    Object.entries(scoreMap).forEach(([team, pts]) => {
      newScores[team] = (newScores[team] || 0) + pts;
    });
    setScores(newScores);
    if (step + 1 >= TEAM_QUIZ_QUESTIONS.length) {
      const winner = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0];
      setResult(winner);
    } else {
      setStep(s => s + 1);
    }
  }

  function reset() { setStep(0); setScores({}); setResult(null); }

  const q = TEAM_QUIZ_QUESTIONS[step];

  return (
    <div>
      <div className="section-title">Which <span>Team</span> Are You?</div>
      <div className="section-line" />
      {result ? (
        <div>
          <div className="team-quiz-result" style={{ borderColor: TEAM_QUIZ_RESULTS[result]?.color + "44" }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🏎️</div>
            <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "Orbitron", letterSpacing: 3, marginBottom: 8 }}>YOU ARE...</div>
            <div className="team-result-name" style={{ color: TEAM_QUIZ_RESULTS[result]?.color, textShadow: `0 0 20px ${TEAM_QUIZ_RESULTS[result]?.color}60` }}>
              {TEAM_QUIZ_RESULTS[result]?.name || result}
            </div>
            <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.8, maxWidth: 480, margin: "12px auto 20px" }}>
              {TEAM_QUIZ_RESULTS[result]?.desc}
            </p>
            <button className="expand-btn" onClick={reset} style={{ padding: "10px 24px", fontSize: 11, letterSpacing: 2, fontFamily: "Orbitron" }}>
              🔄 RETAKE QUIZ
            </button>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 600 }}>
          <div style={{ marginBottom: 16 }}>
            <div className="quiz-progress"><div className="quiz-progress-fill" style={{ width: `${(step / TEAM_QUIZ_QUESTIONS.length) * 100}%` }} /></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--text4)", fontFamily: "Orbitron", letterSpacing: 1 }}>
              <span>QUESTION {step + 1} / {TEAM_QUIZ_QUESTIONS.length}</span>
              <span>{Math.round((step / TEAM_QUIZ_QUESTIONS.length) * 100)}% COMPLETE</span>
            </div>
          </div>
          <div className="card" style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", lineHeight: 1.5 }}>{q.q}</p>
          </div>
          {q.options.map((opt, i) => (
            <button key={i} className="quiz-option" onClick={() => answer(opt.scores)}>
              <span style={{ fontFamily: "Orbitron", fontSize: 10, color: "#e10600", minWidth: 20 }}>{String.fromCharCode(65 + i)}</span>
              {opt.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── TYRE STRATEGY SECTION ───────────────────────────────────────────────────
function TyreStrategySection() {
  const [raceIdx, setRaceIdx] = useState(0);
  const [hovered, setHovered] = useState(null);
  const race = TYRE_STRATEGIES[raceIdx];

  return (
    <div>
      <div className="section-title">Tyre <span>Strategy</span></div>
      <div className="section-line" />
      <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.7, marginBottom: 20 }}>
        Tyre strategy is one of the most complex parts of F1. Teams choose when to pit and which compounds to use to gain time over rivals. Each horizontal bar shows a driver's stint — the length represents laps on that tyre.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {TYRE_STRATEGIES.map((r, i) => (
          <button key={i} className={`year-btn${raceIdx === i ? " active" : ""}`} onClick={() => setRaceIdx(i)} style={{ fontSize: 10 }}>
            {r.race}
          </button>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "Orbitron", fontSize: 13, fontWeight: 900, color: "var(--text)", marginBottom: 6 }}>{race.race}</div>
        <p style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.7 }}>{race.desc}</p>
      </div>

      {/* Tyre legend */}
      <div className="tyre-legend">
        {Object.entries(race.compounds).map(([key, val]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text2)" }}>
            <div className="tyre-dot" style={{ background: val.color, border: key === "H" ? "1px solid #aaa" : "none" }} />
            {val.label}
          </div>
        ))}
      </div>

      {/* Lap numbers header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ width: 140, fontSize: 9, color: "var(--text4)", fontFamily: "Orbitron", letterSpacing: 1, textAlign: "right" }}>DRIVER</div>
        <div style={{ flex: 1, position: "relative", height: 14 }}>
          {[0, 0.25, 0.5, 0.75, 1].map(f => (
            <div key={f} style={{ position: "absolute", left: `${f * 100}%`, fontSize: 9, color: "var(--text4)", fontFamily: "Orbitron", transform: "translateX(-50%)" }}>
              {Math.round(f * race.laps)}
            </div>
          ))}
        </div>
      </div>

      {race.strategies.map((strat, si) => (
        <div key={si} className="strategy-row">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 140, fontSize: 11, color: "var(--text2)", textAlign: "right", flexShrink: 0, paddingRight: 8 }}>{strat.driver}</div>
            <div className="strategy-track" style={{ flex: 1 }}>
              {strat.stints.map((stint, stintIdx) => {
                const comp = race.compounds[stint.c];
                const pct = (stint.laps / race.laps) * 100;
                const isHovered = hovered === `${si}-${stintIdx}`;
                return (
                  <div key={stintIdx} className="strategy-seg"
                    style={{ width: `${pct}%`, background: comp.color, minWidth: 24, color: comp.color === "#f0f0f0" ? "#333" : "#000", boxShadow: isHovered ? `0 0 12px ${comp.color}` : "none" }}
                    onMouseEnter={() => setHovered(`${si}-${stintIdx}`)}
                    onMouseLeave={() => setHovered(null)}
                    title={`${comp.label} — ${stint.laps} laps`}>
                    {stint.laps >= 8 ? stint.c : ""}
                    {isHovered && (
                      <div style={{ position: "absolute", bottom: "110%", left: "50%", transform: "translateX(-50%)", background: "var(--bg2)", border: `1px solid ${comp.color}`, borderRadius: 4, padding: "4px 8px", zIndex: 10, whiteSpace: "nowrap", fontSize: 10, color: "var(--text)" }}>
                        {comp.label} · {stint.laps} laps
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}

      <div className="card" style={{ marginTop: 20 }}>
        <div style={{ fontFamily: "Orbitron", fontSize: 10, color: "#e10600", letterSpacing: 2, marginBottom: 10 }}>KEY CONCEPTS</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {[
            ["Undercut", "Pitting before your rival to gain track position with fresh tyres"],
            ["Overcut", "Staying out longer on old tyres while rivals pit, then pitting yourself"],
            ["Tyre Cliff", "When a tyre suddenly loses grip rapidly after extended use"],
            ["Free Stop", "Pitting under a safety car without losing track position vs rivals"],
          ].map(([term, def]) => (
            <div key={term} style={{ borderLeft: "2px solid #e10600", paddingLeft: 10 }}>
              <div style={{ fontFamily: "Orbitron", fontSize: 10, color: "#e10600", marginBottom: 3 }}>{term}</div>
              <div style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.6 }}>{def}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── H2H TEAMMATE SECTION ────────────────────────────────────────────────────
function HeadToHeadSection() {
  const [metric, setMetric] = useState("quali");

  return (
    <div>
      <div className="section-title">Teammate <span>H2H</span></div>
      <div className="section-line" />
      <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.7, marginBottom: 20 }}>
        Your teammate is your most controlled benchmark in F1 — same car, same conditions. These are the 2024 qualifying and race head-to-head records across all teams.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[["quali", "Qualifying"], ["race", "Race Results"]].map(([k, l]) => (
          <button key={k} className={`year-btn${metric === k ? " active" : ""}`} onClick={() => setMetric(k)}>{l}</button>
        ))}
      </div>

      {H2H_DATA_2024.map((row, i) => {
        const d1Count = metric === "quali" ? row.qualiD1 : row.raceD1;
        const d2Count = metric === "quali" ? row.qualiD2 : row.raceD2;
        const total = d1Count + d2Count;
        const p1 = (d1Count / total * 100).toFixed(0);
        const p2 = (d2Count / total * 100).toFixed(0);
        const winner = d1Count > d2Count ? row.d1 : d2Count > d1Count ? row.d2 : null;

        return (
          <div key={i} className="h2h-card" style={{ borderTop: `2px solid ${row.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontFamily: "Orbitron", fontSize: 10, color: row.color, letterSpacing: 1, textShadow: `0 0 8px ${row.color}60` }}>{row.team}</div>
              {winner && (
                <div style={{ fontSize: 10, color: "var(--text3)" }}>
                  <span style={{ color: row.color, fontWeight: 700 }}>{winner}</span> leads {metric === "quali" ? "qualifying" : "races"} {Math.max(d1Count, d2Count)}–{Math.min(d1Count, d2Count)}
                </div>
              )}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, marginBottom: 6 }}>
              {[{ name: row.d1, count: d1Count, pct: p1 }, { name: row.d2, count: d2Count, pct: p2 }].map((driver, di) => (
                <div key={di} style={{ fontSize: 13, fontWeight: 700, color: di === 0 ? row.color : "var(--text2)", textAlign: di === 0 ? "left" : "right" }}>
                  {driver.name} <span style={{ fontFamily: "Orbitron", fontSize: 16, color: "var(--text)" }}>{driver.count}</span>
                </div>
              ))}
            </div>
            <div className="h2h-bar-wrap">
              <div className="h2h-bar-left" style={{ width: `${p1}%`, background: row.color, boxShadow: `0 0 6px ${row.color}80` }} />
              <div className="h2h-bar-right" style={{ width: `${p2}%`, background: "var(--border2)" }} />
            </div>
            <div style={{ fontSize: 11, color: "var(--text4)", marginTop: 6, fontStyle: "italic" }}>{row.note}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── ONBOARDING MODAL ────────────────────────────────────────────────────────
function OnboardingModal({ onClose, onSelect }) {
  return (
    <div className="onboarding-overlay" onClick={onClose}>
      <div className="onboarding-modal" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", color: "var(--text3)", fontSize: 20, cursor: "pointer" }}>✕</button>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontFamily: "Orbitron", fontSize: 22, fontWeight: 900, color: "var(--text)", letterSpacing: 2 }}>WELCOME TO <span style={{ color: "#e10600" }}>F1</span></div>
          <p style={{ fontSize: 13, color: "var(--text3)", marginTop: 8, lineHeight: 1.6 }}>Where would you like to start? We'll take you straight there.</p>
        </div>
        {[
          { icon: "🏁", title: "I'm completely new", sub: "Start with the basics — what F1 is and how a race weekend works", section: "how" },
          { icon: "📺", title: "I watch sometimes", sub: "Know the basics, want to understand the strategy and politics", section: "glossary" },
          { icon: "🏆", title: "I know the game", sub: "I want the deep data — driver stats, team breakdowns, live results", section: "drivers" },
        ].map(opt => (
          <button key={opt.section} className="onboarding-option" onClick={() => { onSelect(opt.section); onClose(); }}>
            <span style={{ fontSize: 28 }}>{opt.icon}</span>
            <div>
              <div style={{ fontFamily: "Orbitron", fontSize: 12, fontWeight: 700, color: "var(--text)", marginBottom: 3 }}>{opt.title}</div>
              <div style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.5 }}>{opt.sub}</div>
            </div>
          </button>
        ))}
        <button onClick={onClose} style={{ width: "100%", marginTop: 6, padding: "10px", background: "transparent", border: "1px solid var(--border2)", color: "var(--text4)", fontFamily: "Orbitron", fontSize: 9, letterSpacing: 2, cursor: "pointer", borderRadius: 6 }}>
          BROWSE ON MY OWN
        </button>
      </div>
    </div>
  );
}

// ─── BOOKMARKS SECTION ───────────────────────────────────────────────────────
function BookmarksSection({ bookmarks, onNavigate, onRemove }) {
  const allSections = [
    { id: "how", icon: "🏁", label: "How It Works" }, { id: "points", icon: "📊", label: "Points System" },
    { id: "drivers", icon: "🏎️", label: "Drivers" }, { id: "teams", icon: "🔧", label: "Teams" },
    { id: "history", icon: "📅", label: "Driver Changes" }, { id: "circuits", icon: "🗺️", label: "Circuits" },
    { id: "results", icon: "🏆", label: "Live Results" }, { id: "glossary", icon: "📖", label: "Glossary" },
    { id: "rules", icon: "📋", label: "Rules" }, { id: "compare", icon: "⚡", label: "Car Compare" },
    { id: "records", icon: "🎖️", label: "Records" }, { id: "quiz", icon: "🧠", label: "F1 Quiz" },
    { id: "predictor", icon: "🔮", label: "Race Predictor" }, { id: "news", icon: "📰", label: "F1 News" },
    { id: "drivercompare", icon: "🆚", label: "Driver Compare" }, { id: "championship", icon: "📈", label: "Championship Tracker" },
    { id: "teamquiz", icon: "🎯", label: "Team Quiz" }, { id: "tyrestrategy", icon: "🏎", label: "Tyre Strategy" },
    { id: "h2h", icon: "⚔️", label: "H2H Stats" },
  ];

  return (
    <div>
      <div className="section-title">My <span>Bookmarks</span></div>
      <div className="section-line" />
      {bookmarks.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "48px 20px" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔖</div>
          <div style={{ fontFamily: "Orbitron", fontSize: 12, color: "var(--text3)", letterSpacing: 2 }}>NO BOOKMARKS YET</div>
          <p style={{ fontSize: 12, color: "var(--text4)", marginTop: 8 }}>Click the 🔖 button on any section header to save it here.</p>
        </div>
      ) : (
        <div className="bookmarks-grid">
          {bookmarks.map(id => {
            const s = allSections.find(s => s.id === id);
            if (!s) return null;
            return (
              <div key={id} className="bookmark-card" onClick={() => onNavigate(id)}>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>{s.label}</div>
                </div>
                <button className="bookmark-btn" onClick={e => { e.stopPropagation(); onRemove(id); }}
                  style={{ color: "#e10600", fontSize: 14 }}>✕</button>
              </div>
            );
          })}
        </div>
      )}
      <div style={{ marginTop: 28 }}>
        <div style={{ fontFamily: "Orbitron", fontSize: 10, color: "#e10600", letterSpacing: 2, marginBottom: 14 }}>ALL SECTIONS</div>
        <div className="bookmarks-grid">
          {allSections.map(s => {
            const isBookmarked = bookmarks.includes(s.id);
            return (
              <div key={s.id} className="bookmark-card" onClick={() => onNavigate(s.id)}>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text)" }}>{s.label}</div>
                </div>
                <button className="bookmark-btn" onClick={e => { e.stopPropagation(); isBookmarked ? onRemove(s.id) : null; }}
                  style={{ color: isBookmarked ? "#FFD700" : "var(--text4)" }}>
                  {isBookmarked ? "★" : "☆"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── SHARE CARD (canvas-based predictor export) ───────────────────────────────
function useShareCard(picks, race) {
  function downloadShareCard() {
    const canvas = document.createElement("canvas");
    canvas.width = 600; canvas.height = 640;
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#0a0a12";
    ctx.fillRect(0, 0, 600, 640);

    // Red top bar
    ctx.fillStyle = "#e10600";
    ctx.fillRect(0, 0, 600, 5);

    // Grid lines
    ctx.strokeStyle = "rgba(225,6,0,0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x < 600; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 640); ctx.stroke(); }
    for (let y = 0; y < 640; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(600, y); ctx.stroke(); }

    // Header
    ctx.fillStyle = "#e10600";
    ctx.font = "bold 13px monospace";
    ctx.fillText("MY RACE PREDICTION", 24, 42);
    ctx.fillStyle = "#f0f0fa";
    ctx.font = "bold 22px monospace";
    ctx.fillText(`${race?.flag || "🏁"} ${race?.name || "F1 Race"}`, 24, 72);
    ctx.fillStyle = "#606080";
    ctx.font = "11px monospace";
    ctx.fillText(`Round ${race?.round || "—"} · Built with f1guide.vercel.app`, 24, 92);

    // Divider
    ctx.strokeStyle = "rgba(225,6,0,0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(24, 104); ctx.lineTo(576, 104); ctx.stroke();

    // Picks
    picks.forEach((d, i) => {
      const y = 120 + i * 50;
      const posColors = ["#e10600", "#c0c0c0", "#cd7f32"];
      const posColor = posColors[i] || "#404060";

      // Row background
      ctx.fillStyle = "rgba(255,255,255,0.02)";
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(20, y - 14, 560, 40, 6) : ctx.rect(20, y - 14, 560, 40);
      ctx.fill();

      // Position
      ctx.fillStyle = posColor;
      ctx.font = "bold 11px monospace";
      ctx.fillText(`P${i + 1}`, 30, y + 8);

      // Team color strip
      ctx.fillStyle = d.color || "#e10600";
      ctx.fillRect(60, y - 14, 3, 40);

      // Driver number
      ctx.fillStyle = d.color || "#e10600";
      ctx.font = "bold 16px monospace";
      ctx.fillText(d.short || "---", 72, y + 8);

      // Driver name
      ctx.fillStyle = "#f0f0fa";
      ctx.font = "bold 13px monospace";
      ctx.fillText(d.name, 120, y + 8);

      // Team
      ctx.fillStyle = "#606080";
      ctx.font = "10px monospace";
      ctx.fillText(d.team || "", 400, y + 8);
    });

    // Footer
    ctx.fillStyle = "rgba(225,6,0,0.4)";
    ctx.fillRect(0, 615, 600, 1);
    ctx.fillStyle = "#404060";
    ctx.font = "10px monospace";
    ctx.fillText("f1guide.vercel.app · The Complete F1 Beginner's Guide", 24, 632);

    const link = document.createElement("a");
    link.download = `F1_Prediction_${race?.name?.replace(/\s/g, "_") || "Race"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }
  return downloadShareCard;
}

// ─── 2026 SEASON PREVIEW DATA ────────────────────────────────────────────────
const POWER_RANKINGS_2026 = [
  { pos: 1, team: "McLaren", color: "#FF8000", drivers: "Norris / Piastri", power: 96, verdict: "Title favourites. Best driver pairing on the grid, Mercedes power expected to be strong, and they're coming off the back of 2024's fastest car. Norris is the man to beat.", tag: "🏆 FAVOURITES" },
  { pos: 2, team: "Mercedes", color: "#27F4D2", drivers: "Russell / Antonelli", power: 91, verdict: "Own-engine team — huge advantage if their 2026 unit fires. Russell leads with maturity, Antonelli is raw but thrillingly fast. Could dominate if they nail the new regs.", tag: "⚡ DARK HORSE" },
  { pos: 3, team: "Ferrari", color: "#E8002D", drivers: "Hamilton / Leclerc", power: 90, verdict: "Hamilton's final chapter. Ferrari's Maranello PU lab worked for years on 2026. Leclerc's raw speed plus Hamilton's championship brain makes them a massive threat.", tag: "🔥 CONTENDERS" },
  { pos: 4, team: "Red Bull", color: "#3671C6", drivers: "Verstappen / Hadjar", power: 88, verdict: "Verstappen makes any car a title threat. Question marks over the new Ford RBPT unit in its debut year. Hadjar is exciting but unproven. VER will drag them into fights they shouldn't win.", tag: "💪 CONTENDERS" },
  { pos: 5, team: "Aston Martin", color: "#229971", drivers: "Alonso / Stroll", power: 82, verdict: "The wild card. Honda works PU is a massive coup — Honda nearly won the title in 2021. If the engine is strong and the chassis follows, Alonso at 44 could have one last shot at glory.", tag: "🎲 WILDCARD" },
  { pos: 6, team: "Williams", color: "#64C4FF", drivers: "Sainz / Albon", power: 74, verdict: "Best midfield lineup. Mercedes customer with a reborn chassis programme. Sainz is too good for midfield forever. Watch for big upsets at the right circuits.", tag: "📈 ON THE RISE" },
  { pos: 7, team: "Alpine", color: "#0093CC", drivers: "Gasly / Colapinto", power: 70, verdict: "Now on Mercedes power — a massive upgrade from Renault. New PU takes time to optimise but ceiling is much higher. Colapinto is a fan favourite from his Williams cameo in 2024.", tag: "🔄 REBUILDING" },
  { pos: 8, team: "Haas", color: "#B6BABD", drivers: "Ocon / Bearman", power: 66, verdict: "Ferrari customer keeps them relevant. Bearman is a future star, Ocon is solid. They'll punch above their weight when Ferrari's PU advantage kicks in.", tag: "🎯 SOLID MID" },
  { pos: 9, team: "Audi F1", color: "#BB0A21", drivers: "Hülkenberg / Bortoleto", power: 60, verdict: "The most fascinating wildcard in years. A brand new manufacturer with zero F1 engine experience. Could be surprisingly competitive or genuinely off the pace — nobody knows. Bortoleto is electrifying.", tag: "❓ UNKNOWN" },
  { pos: 10, team: "Racing Bulls", color: "#6692FF", drivers: "Lawson / Lindblad", power: 58, verdict: "Ford RBPT customer inherits Red Bull's tech but usually a step behind. Lawson rebuilding after his RB demotion. Lindblad is the youngest on the grid — thrilling potential.", tag: "🌱 REBUILDING" },
  { pos: 11, team: "Cadillac", color: "#CC0000", drivers: "Bottas / Pérez", power: 44, verdict: "Rookie team with veteran drivers — perfect symmetry. Ferrari customer engine gives them a competitive baseline. Realistic target: finish races, stay inside 107%, and shock everyone once. That's Year 1.", tag: "🇺🇸 NEW ENTRANT" },
];

const RACE_PREVIEWS_2026 = [
  { round: 1, flag: "🇦🇺", name: "Australian GP", circuit: "Albert Park", date: "Mar 8", pick: "Norris", pickColor: "#FF8000", prediction: "McLaren won 3 of the last 4 Australian GPs. Norris loves flowing circuits. Verstappen will hunt him down but lacks the race pace to overtake.", rating: "⭐⭐⭐⭐", watchFor: "First glimpse of 2026 power unit pecking order" },
  { round: 2, flag: "🇨🇳", name: "Chinese GP", circuit: "Shanghai", date: "Mar 15", pick: "Russell", pickColor: "#27F4D2", prediction: "If Mercedes nail the new PU, Shanghai is exactly where they'll announce themselves. Long straights, engine-sensitive. Russell's clean racecraft suits a high-tyre-deg opener.", rating: "⭐⭐⭐⭐⭐", watchFor: "Mercedes home PU advantage on debut" },
  { round: 3, flag: "🇯🇵", name: "Japanese GP", circuit: "Suzuka", date: "Mar 29", pick: "Verstappen", pickColor: "#3671C6", prediction: "Verstappen has won 3 of the last 3 at Suzuka. His feel for high-speed corners is unmatched. Even if Red Bull are a step back, this is his track. Practically guaranteed.", rating: "⭐⭐⭐⭐⭐", watchFor: "Can any 2026 car match the Red Bull at Suzuka?" },
  { round: 8, flag: "🇲🇨", name: "Monaco GP", circuit: "Monte Carlo", date: "Jun 7", pick: "Leclerc", pickColor: "#E8002D", prediction: "Leclerc dominated Monaco qualifying in 2024 and 2022. His local circuit mastery is unreal. Hamilton is hunting his first Monaco win — the one gap in his record. Ferrari infight incoming.", rating: "⭐⭐⭐⭐⭐", watchFor: "Hamilton's one missing trophy. Leclerc defending his home turf." },
  { round: 12, flag: "🇧🇪", name: "Belgian GP", circuit: "Spa-Francorchamps", date: "Jul 19", pick: "Alonso", pickColor: "#229971", prediction: "If the Honda PU is as strong as hoped, Spa's Kemmel Straight is where it shows up. Alonso won here in 2013 in what many call the greatest single wet-weather drive of the modern era.", rating: "⭐⭐⭐⭐⭐", watchFor: "Honda vs Mercedes vs Ferrari power — the engine war verdict" },
  { round: 17, flag: "🇦🇿", name: "Azerbaijan GP", circuit: "Baku", date: "Sep 26", pick: "Safety Car", pickColor: "#ffc800", prediction: "Baku produces carnage every single year. The longest straight + tightest walls + battle-hungry midfield = guaranteed drama. Winner could be anyone. Cadillac's best shot at a shock result.", rating: "⭐⭐⭐⭐⭐", watchFor: "Pure anarchy. Cadillac's debut upset potential." },
];

const ROOKIES_2026 = [
  { name: "Isack Hadjar", flag: "🇫🇷🇩🇿", team: "Red Bull Racing", color: "#3671C6", number: 6, age: 20, background: "French-Algerian. Red Bull junior. Won F2 2024. Promoted to Red Bull after impressing at Racing Bulls in 2025. The seat Tsunoda was controversially overlooked for.", potential: 95, watchFor: "Being Verstappen's teammate is the hardest job in F1. How close can he get?" },
  { name: "Arvid Lindblad", flag: "🇬🇧🇸🇪", team: "Racing Bulls", color: "#6692FF", number: 8, age: 18, background: "British-Swedish. Red Bull junior. Youngest on the 2026 grid. Won Formula 3 at 17. Skipped most of F2 — Red Bull believe he's ready now. Born in 2007.", potential: 90, watchFor: "The youngest driver since Max Verstappen in 2015. Raw talent vs steep learning curve." },
  { name: "Gabriel Bortoleto", flag: "🇧🇷", team: "Audi F1", color: "#BB0A21", number: 5, age: 21, background: "Brazilian. McLaren junior before Audi. Won F2 and F3 consecutively. Compelling personality. Stepping into the hardest team situation on the grid — brand new manufacturer.", potential: 88, watchFor: "How does he handle a brand new car, brand new manufacturer, and massive expectations?" },
  { name: "Oliver Bearman", flag: "🇬🇧", team: "Haas", color: "#B6BABD", number: 87, age: 20, background: "British. Ferrari junior. Scored points on two F1 substitute appearances in 2024. Full debut in 2025 with Haas. Now in his second season — the step where you find out if someone is truly quick.", potential: 85, watchFor: "His second year is the real test. First impressions were stellar." },
  { name: "Franco Colapinto", flag: "🇦🇷", team: "Alpine", color: "#0093CC", number: 43, age: 22, background: "Argentine. Burst onto the scene in 8 races at Williams in 2024 after Sargeant dropped. Argentina went wild. Alpine signed him for 2026 after Doohan was dropped mid-2025.", potential: 83, watchFor: "Wild card. Proved himself in 8 races. Now gets a full season to show it wasn't a fluke." },
];

// ─── HOMEPAGE SECTION ────────────────────────────────────────────────────────
function HomeSection({ onNavigate }) {
  const nextRace = RACE_CALENDAR_2026.find(r => new Date(r.date) > new Date()) || RACE_CALENDAR_2026[RACE_CALENDAR_2026.length - 1];
  const upcomingRaces = RACE_CALENDAR_2026.filter(r => new Date(r.date) > new Date()).slice(0, 3);

  const QUICK_LINKS = [
    { id: "drivers",      icon: "🏎️", label: "Drivers",           sub: "All 22 on the 2026 grid" },
    { id: "circuits",     icon: "🗺️", label: "Circuits",          sub: "24 races, maps & times" },
    { id: "results",      icon: "🏆", label: "Live Results",       sub: "Powered by OpenF1 API" },
    { id: "preview",      icon: "🔭", label: "Season Preview",     sub: "Power rankings & picks" },
    { id: "drivercompare",icon: "🆚", label: "Driver Compare",     sub: "Head-to-head radar chart" },
    { id: "championship", icon: "📈", label: "Battle Tracker",     sub: "WDC drama round by round" },
    { id: "teamquiz",     icon: "🎯", label: "Which team are you?",sub: "Find your F1 personality" },
    { id: "tyrestrategy", icon: "🏎",  label: "Tyre Strategy",      sub: "Iconic pit stop visualised" },
    { id: "news",         icon: "📰", label: "F1 News",            sub: "Live from Motorsport.com" },
    { id: "quiz",         icon: "🧠", label: "F1 Quiz",            sub: "Test your knowledge" },
    { id: "glossary",     icon: "📖", label: "Glossary",           sub: "Every term explained" },
    { id: "h2h",          icon: "⚔️", label: "Teammate H2H",       sub: "2024 qualifying battles" },
  ];

  const CHANGELOG = [
    { color: "#e10600", text: "2026 Season Preview added — power rankings, race picks & rookie spotlights" },
    { color: "#FF8000", text: "Circuit maps now show Wikimedia circuit layouts on every card" },
    { color: "#27F4D2", text: "Search now covers glossary definitions, rules text & circuit descriptions" },
    { color: "#00dc78", text: "Driver Compare radar chart, Championship Tracker & Team Quiz added" },
    { color: "#9966FF", text: "Mobile bottom tab bar, bookmarks, onboarding flow & share card added" },
  ];

  return (
    <div>
      {/* Welcome hero */}
      <div className="home-hero">
        <div style={{ fontFamily: "Orbitron", fontSize: 10, color: "#e10600", letterSpacing: 4, marginBottom: 8, textTransform: "uppercase" }}>Welcome to</div>
        <div style={{ fontFamily: "Orbitron", fontSize: "clamp(22px, 5vw, 36px)", fontWeight: 900, color: "var(--text)", lineHeight: 1.1, marginBottom: 8 }}>
          The F1 <span style={{ color: "#e10600", textShadow: "0 0 30px rgba(225,6,0,0.4)" }}>Beginner's</span> Guide
        </div>
        <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.75, maxWidth: 520, marginBottom: 20 }}>
          Everything you need to understand Formula 1 — from your first race weekend to tyre strategy, driver politics, and the full 2026 season. Start anywhere, go deep everywhere.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={() => onNavigate("how")} style={{ padding: "10px 20px", background: "#e10600", border: "none", color: "#fff", fontFamily: "Orbitron", fontSize: 10, letterSpacing: 2, cursor: "pointer", borderRadius: 8, boxShadow: "0 4px 20px rgba(225,6,0,0.35)", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = ""}>
            START HERE →
          </button>
          <button onClick={() => onNavigate("preview")} style={{ padding: "10px 20px", background: "transparent", border: "1px solid var(--border2)", color: "var(--text2)", fontFamily: "Orbitron", fontSize: 10, letterSpacing: 2, cursor: "pointer", borderRadius: 8, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="#e10600"; e.currentTarget.style.color="#e10600"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=""; e.currentTarget.style.color=""; }}>
            2026 SEASON →
          </button>
        </div>
      </div>

      {/* Next race */}
      {nextRace && (
        <div style={{ marginBottom: 28 }}>
          <div className="home-section-title">NEXT RACE</div>
          <div className="featured-race-card" style={{ cursor: "pointer" }} onClick={() => onNavigate("circuits")}>
            <div className="featured-race-flag">{nextRace.flag}</div>
            <div className="featured-race-info">
              <div className="featured-race-label">Round {nextRace.round} · {nextRace.circuit}</div>
              <div className="featured-race-name">{nextRace.name}</div>
              <div className="featured-race-sub">{new Date(nextRace.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</div>
              {upcomingRaces.length > 1 && (
                <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {upcomingRaces.slice(1, 3).map(r => (
                    <span key={r.round} style={{ fontSize: 10, color: "var(--text4)", background: "var(--bg3)", padding: "2px 8px", borderRadius: 20 }}>
                      {r.flag} R{r.round} · {new Date(r.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick access grid */}
      <div className="home-section-title">EXPLORE</div>
      <div className="home-quick-grid">
        {QUICK_LINKS.map(q => (
          <div key={q.id} className="home-quick-card" onClick={() => onNavigate(q.id)}>
            <div className="home-quick-icon">{q.icon}</div>
            <div className="home-quick-label">{q.label}</div>
            <div className="home-quick-sub">{q.sub}</div>
          </div>
        ))}
      </div>

      {/* Power rankings teaser */}
      <div style={{ marginBottom: 28 }}>
        <div className="home-section-title">2026 POWER RANKINGS</div>
        {POWER_RANKINGS_2026.slice(0, 5).map(r => (
          <div key={r.team} className="power-rank-row" onClick={() => onNavigate("preview")}>
            <div className="power-rank-num" style={{ color: r.pos <= 3 ? r.color : "var(--text4)" }}>
              {r.pos <= 3 ? ["🥇","🥈","🥉"][r.pos - 1] : r.pos}
            </div>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: r.color, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{r.team}</div>
              <div style={{ fontSize: 10, color: "var(--text4)" }}>{r.drivers}</div>
            </div>
            <div className="power-rank-bar" style={{ maxWidth: 120 }}>
              <div className="power-rank-fill" style={{ width: `${r.power}%`, background: r.color, boxShadow: `0 0 6px ${r.color}60` }} />
            </div>
            <div style={{ fontSize: 11, fontFamily: "Orbitron", color: r.color, minWidth: 28, textAlign: "right" }}>{r.power}</div>
          </div>
        ))}
        <button onClick={() => onNavigate("preview")} style={{ width: "100%", marginTop: 8, padding: "9px", background: "transparent", border: "1px solid var(--border2)", color: "var(--text3)", fontFamily: "Orbitron", fontSize: 9, letterSpacing: 2, cursor: "pointer", borderRadius: 8, transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor="#e10600"; e.currentTarget.style.color="#e10600"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor=""; e.currentTarget.style.color=""; }}>
          VIEW ALL 11 TEAMS →
        </button>
      </div>

      {/* What's new */}
      <div style={{ marginBottom: 16 }}>
        <div className="home-section-title">WHAT'S NEW</div>
        <div className="card" style={{ padding: "14px 18px" }}>
          {CHANGELOG.map((item, i) => (
            <div key={i} className="changelog-item">
              <div className="changelog-dot" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}60` }} />
              <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6 }}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 2026 SEASON PREVIEW SECTION ─────────────────────────────────────────────
function SeasonPreviewSection({ onNavigate }) {
  const [tab, setTab] = useState("power");

  return (
    <div>
      <div className="section-title">2026 <span>Season Preview</span></div>
      <div className="section-line" />
      <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.75, marginBottom: 20 }}>
        The 2026 season is the biggest regulation reset in F1 history. New power units, new aerodynamics, a new team, and the most competitive driver market in years. Here's the full picture.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {[["power","⚡ Power Rankings"], ["races","🏁 Race Picks"], ["rookies","🌱 Rookies to Watch"]].map(([k, l]) => (
          <button key={k} className={`year-btn${tab === k ? " active" : ""}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === "power" && (
        <div>
          <div className="card" style={{ marginBottom: 20, borderLeft: "3px solid #e10600" }}>
            <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.75 }}>
              <strong style={{ color: "#e10600" }}>Rankings methodology:</strong> Based on 2024/2025 chassis performance, expected 2026 power unit competitiveness, driver lineup quality, and regulation change adaptability. The new PU rules create enormous uncertainty — these rankings reflect best estimates before testing.
            </p>
          </div>
          {POWER_RANKINGS_2026.map(r => (
            <div key={r.team} className="preview-team-card" style={{ borderLeftColor: r.color, paddingLeft: 22 }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: r.color, borderRadius: "14px 0 0 14px", boxShadow: `0 0 10px ${r.color}60` }} />
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>
                <div style={{ fontFamily: "Orbitron", fontSize: 28, fontWeight: 900, color: r.color, minWidth: 36, lineHeight: 1 }}>
                  {r.pos <= 3 ? ["🥇","🥈","🥉"][r.pos - 1] : `P${r.pos}`}
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                    <span style={{ fontFamily: "Orbitron", fontSize: 14, fontWeight: 900, color: "var(--text)" }}>{r.team}</span>
                    <span className="prediction-badge" style={{ background: r.color + "18", color: r.color, border: `1px solid ${r.color}30` }}>{r.tag}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 8 }}>
                    {r.drivers}
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.75 }}>{r.verdict}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
                    <div style={{ flex: 1, height: 6, background: "var(--bg3)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${r.power}%`, background: `linear-gradient(to right, ${r.color}80, ${r.color})`, borderRadius: 3, transition: "width 0.8s", boxShadow: `0 0 8px ${r.color}60` }} />
                    </div>
                    <span style={{ fontFamily: "Orbitron", fontSize: 12, color: r.color, fontWeight: 700 }}>{r.power}/100</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "races" && (
        <div>
          <div className="card" style={{ marginBottom: 20, borderLeft: "3px solid #e10600" }}>
            <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.75 }}>
              <strong style={{ color: "#e10600" }}>Disclaimer:</strong> These are analyst-style picks, not predictions. F1 is inherently unpredictable — the fun is seeing how wrong (or right) these calls turn out to be. Updated after each race.
            </p>
          </div>
          {RACE_PREVIEWS_2026.map(r => (
            <div key={r.round} className="preview-race-card">
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <span style={{ fontSize: 28 }}>{r.flag}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "Orbitron", fontSize: 12, fontWeight: 900, color: "var(--text)" }}>{r.name}</div>
                  <div style={{ fontSize: 10, color: "var(--text3)" }}>R{r.round} · {r.circuit} · {r.date}</div>
                </div>
                <div style={{ fontSize: 10, color: "var(--text4)" }}>{r.rating}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 9, color: "var(--text4)", fontFamily: "Orbitron", letterSpacing: 1 }}>OUR PICK:</span>
                <span style={{ fontFamily: "Orbitron", fontSize: 11, fontWeight: 900, color: r.pickColor, textShadow: `0 0 10px ${r.pickColor}60` }}>{r.pick}</span>
              </div>
              <p style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.75, marginBottom: 8 }}>{r.prediction}</p>
              <div style={{ fontSize: 10, color: "#00dc78", background: "rgba(0,220,120,0.08)", border: "1px solid rgba(0,220,120,0.2)", borderRadius: 6, padding: "4px 10px", display: "inline-block" }}>
                👀 {r.watchFor}
              </div>
            </div>
          ))}
          <div className="card" style={{ marginTop: 16, textAlign: "center", padding: 20 }}>
            <div style={{ fontFamily: "Orbitron", fontSize: 10, color: "var(--text3)", letterSpacing: 2 }}>MORE RACE PREVIEWS</div>
            <p style={{ fontSize: 12, color: "var(--text4)", marginTop: 6 }}>Full-season previews will update as the 2026 calendar progresses.</p>
          </div>
        </div>
      )}

      {tab === "rookies" && (
        <div>
          <div className="card" style={{ marginBottom: 20, borderLeft: "3px solid #00dc78" }}>
            <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.75 }}>
              <strong style={{ color: "#00dc78" }}>5 rookies or near-rookies</strong> on the 2026 grid — the highest number in a decade. All of them have genuine speed. Several of them might be future world champions.
            </p>
          </div>
          <div className="rookie-grid">
            {ROOKIES_2026.map(r => (
              <div key={r.name} className="rookie-card" style={{ borderTop: `2px solid ${r.color}` }}>
                <div style={{ display: "flex", align: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 18 }}>{r.flag}</span>
                  <span style={{ fontFamily: "Orbitron", fontSize: 20, fontWeight: 900, color: r.color + "40" }}>#{r.number}</span>
                </div>
                <div style={{ fontFamily: "Orbitron", fontSize: 13, fontWeight: 900, color: "var(--text)", marginBottom: 2 }}>{r.name}</div>
                <div style={{ fontSize: 10, color: r.color, marginBottom: 8, fontFamily: "Orbitron", letterSpacing: 1 }}>{r.team} · Age {r.age}</div>
                <p style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.7, marginBottom: 10 }}>{r.background}</p>
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 8 }}>
                  <div style={{ fontSize: 9, color: "var(--text4)", fontFamily: "Orbitron", letterSpacing: 1, marginBottom: 4 }}>CEILING</div>
                  <div style={{ height: 6, background: "var(--bg3)", borderRadius: 3, overflow: "hidden", marginBottom: 6 }}>
                    <div style={{ height: "100%", width: `${r.potential}%`, background: r.color, boxShadow: `0 0 6px ${r.color}60`, borderRadius: 3 }} />
                  </div>
                  <div style={{ fontSize: 10, color: "#00dc78", lineHeight: 1.5 }}>👀 {r.watchFor}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const NAV_GROUPS = [
  {
    label: "Learn the Basics",
    sections: [
      { id: "how",          icon: "🏁", label: "How It Works",     desc: "Race weekends, qualifying, tyres & strategy" },
      { id: "points",       icon: "📊", label: "Points System",    desc: "How points are scored and championships decided" },
      { id: "rules",        icon: "📋", label: "Rules Explained",  desc: "Plain-English breakdowns of F1's confusing rules" },
      { id: "glossary",     icon: "📖", label: "Glossary",         desc: "Every F1 term defined — undercut, VSC, DRS & more" },
      { id: "tyrestrategy", icon: "🏎", label: "Tyre Strategy",    desc: "Interactive pit stop strategies from iconic races" },
      { id: "quiz",         icon: "🧠", label: "F1 Quiz",          desc: "Test your knowledge with 15 questions" },
      { id: "teamquiz",     icon: "🎯", label: "Which Team Are You?", desc: "8 personality questions to find your F1 team" },
    ]
  },
  {
    label: "2026 Season",
    sections: [
      { id: "preview",      icon: "🔭", label: "Season Preview",   desc: "Power rankings, race picks & rookie spotlights" },
      { id: "drivers",      icon: "🏎️", label: "Drivers",          desc: "All 22 drivers with ratings, stats & profiles" },
      { id: "teams",        icon: "🔧", label: "Teams",             desc: "All 11 constructors across 2025 & 2026" },
      { id: "history",      icon: "📅", label: "Driver Changes",    desc: "Every major move 2018–2026 and the reason why" },
      { id: "compare",      icon: "⚡", label: "Car Compare",       desc: "2025 vs 2026 regulations side by side" },
      { id: "drivercompare",icon: "🆚", label: "Driver Compare",    desc: "Pick two drivers — radar chart & stat breakdown" },
      { id: "predictor",    icon: "🔮", label: "Race Predictor",    desc: "Predict the top 10 & share your grid as an image" },
    ]
  },
  {
    label: "Race & Stats",
    sections: [
      { id: "circuits",     icon: "🗺️", label: "Circuit Guide",    desc: "All 24 circuits with maps, session times & calendar" },
      { id: "results",      icon: "🏆", label: "Live Results",      desc: "Race results, driver & constructor standings" },
      { id: "championship", icon: "📈", label: "Championship Tracker", desc: "Round-by-round WDC battle for 2021–2024" },
      { id: "h2h",          icon: "⚔️", label: "Teammate H2H",      desc: "2024 qualifying & race head-to-head records" },
      { id: "records",      icon: "🎖️", label: "All-Time Records",  desc: "Most wins, poles, titles & fastest laps in history" },
      { id: "news",         icon: "📰", label: "F1 News",           desc: "Latest headlines from Motorsport.com" },
    ]
  },
];

const SECTIONS = NAV_GROUPS.flatMap(g => g.sections);

// ─── MOBILE BOTTOM NAV ───────────────────────────────────────────────────────
const MOBILE_QUICK_TABS = [
  { id: "home",      icon: "🏠", label: "Home" },
  { id: "drivers",   icon: "🏎️", label: "Drivers" },
  { id: "circuits",  icon: "🗺️", label: "Circuits" },
  { id: "preview",   icon: "🔭", label: "Preview" },
  { id: "__more__",  icon: "☰",  label: "More" },
];

function MobileNav({ active, onSelect }) {
  const [showSheet, setShowSheet] = useState(false);
  const [sheetSearch, setSheetSearch] = useState("");

  const ALL_MOBILE_SECTIONS = NAV_GROUPS.flatMap(g =>
    g.sections.map(s => ({ ...s, group: g.label }))
  ).concat([{ id: "bookmarks", icon: "🔖", label: "Bookmarks", group: "Me" }]);

  const filtered = sheetSearch
    ? ALL_MOBILE_SECTIONS.filter(s =>
        s.label.toLowerCase().includes(sheetSearch.toLowerCase()) ||
        (s.desc || "").toLowerCase().includes(sheetSearch.toLowerCase())
      )
    : ALL_MOBILE_SECTIONS;

  const grouped = filtered.reduce((acc, s) => {
    if (!acc[s.group]) acc[s.group] = [];
    acc[s.group].push(s);
    return acc;
  }, {});

  function go(id) { onSelect(id); setShowSheet(false); setSheetSearch(""); }

  return (
    <>
      <div className="mobile-nav">
        <div className="mobile-nav-inner">
          {MOBILE_QUICK_TABS.map(tab => {
            const isMore = tab.id === "__more__";
            const isActive = !isMore && active === tab.id;
            return (
              <button key={tab.id} className={`mobile-nav-btn${isActive ? " active" : ""}`}
                onClick={() => isMore ? setShowSheet(s => !s) : go(tab.id)}>
                <span className="mobile-nav-icon">{tab.icon}</span>
                <span className="mobile-nav-label" style={{ color: isMore && showSheet ? "#e10600" : undefined }}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {showSheet && (
        <div className="mobile-nav-more-sheet" onClick={() => setShowSheet(false)}>
          <div className="mobile-nav-sheet-inner" onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: "var(--border2)", borderRadius: 2, margin: "0 auto 16px" }} />
            <div style={{ fontFamily: "Orbitron", fontSize: 11, color: "#e10600", letterSpacing: 2, marginBottom: 12 }}>ALL SECTIONS</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg3)", borderRadius: 8, padding: "8px 12px", marginBottom: 14, border: "1px solid var(--border)" }}>
              <span style={{ fontSize: 13, opacity: 0.5 }}>🔍</span>
              <input value={sheetSearch} onChange={e => setSheetSearch(e.target.value)}
                placeholder="Search sections…"
                style={{ background: "none", border: "none", outline: "none", fontSize: 13, color: "var(--text)", flex: 1, fontFamily: "'Exo 2', sans-serif" }} />
            </div>
            {Object.entries(grouped).map(([group, sections]) => (
              <div key={group} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 9, color: "var(--text4)", fontFamily: "Orbitron", letterSpacing: 2, marginBottom: 6, paddingLeft: 14 }}>{group.toUpperCase()}</div>
                {sections.map(s => (
                  <button key={s.id} className={`mobile-sheet-item${active === s.id ? " active" : ""}`} onClick={() => go(s.id)}>
                    <span style={{ fontSize: 20 }}>{s.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: active === s.id ? "#e10600" : "var(--text)" }}>{s.label}</div>
                      {s.desc && <div style={{ fontSize: 10, color: "var(--text4)", marginTop: 1, lineHeight: 1.4 }}>{s.desc}</div>}
                    </div>
                    {active === s.id && <span style={{ color: "#e10600", fontSize: 14 }}>●</span>}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ─── TOAST HOOK ──────────────────────────────────────────────────────────────
function useToast() {
  const [toast, setToast] = useState(null);
  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }
  return [toast, showToast];
}

export default function F1Guide() {
  const [active, setActive] = useState("home");
  const [openGroup, setOpenGroup] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem("f1guide_visited"));
  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem("f1guide_bookmarks") || "[]"); } catch { return []; }
  });

  // Expose DRIVERS_2025 globally for DriverCompareSection
  useEffect(() => { window.__DRIVERS_2025__ = DRIVERS_2025; }, []);

  // Persist bookmarks
  useEffect(() => { localStorage.setItem("f1guide_bookmarks", JSON.stringify(bookmarks)); }, [bookmarks]);

  const [toastMsg, showToast] = useToast();

  function toggleBookmark(id) {
    setBookmarks(bms => {
      const isAdding = !bms.includes(id);
      showToast(isAdding ? "⭐ Bookmarked!" : "Removed bookmark");
      return isAdding ? [...bms, id] : bms.filter(b => b !== id);
    });
  }

  useEffect(() => {
    function handleClick(e) {
      if (!e.target.closest(".nav-group")) setOpenGroup(null);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  function toggleGroup(label) { setOpenGroup(g => g === label ? null : label); }
  function selectSection(id) {
    setActive(id);
    setOpenGroup(null);
    window.scrollTo(0, 0);
    localStorage.setItem("f1guide_visited", "1");
  }

  function handleOnboardingClose() {
    setShowOnboarding(false);
    localStorage.setItem("f1guide_visited", "1");
  }

  return (
    <>
      <style>{styles}</style>
      <div className={`f1-app${darkMode ? "" : " light-mode"}`}>
        <div className="grid-bg" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {showOnboarding && <OnboardingModal onClose={handleOnboardingClose} onSelect={id => { selectSection(id); handleOnboardingClose(); }} />}
        {toastMsg && <div className="toast">{toastMsg}</div>}

        <div className="content">
          <div className="hero">
            <div className="hero-title">FORMULA <span>1</span></div>
            <div className="hero-sub">The Complete Beginner's Guide · 2018 – 2026</div>
            <RaceCountdown />
          </div>
          <nav className="nav">
            <div className="nav-inner">
              {/* Home shortcut */}
              <button className={`nav-dropdown-item${active === "home" ? " active" : ""}`}
                onClick={() => selectSection("home")}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "none", background: active === "home" ? "rgba(225,6,0,0.08)" : "transparent", cursor: "pointer", color: active === "home" ? "#e10600" : "var(--text2)", fontFamily: "Exo 2, sans-serif", fontSize: 13, fontWeight: active === "home" ? 700 : 500, transition: "all 0.2s" }}>
                🏠 Home
              </button>
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
              {/* Bookmarks button */}
              <button className="theme-toggle" onClick={() => selectSection("bookmarks")} title="My Bookmarks" style={{ fontSize: 16 }}>
                🔖
              </button>
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
              {/* Bookmark button in section header */}
              {active !== "bookmarks" && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: -8 }}>
                  <button className="bookmark-btn" onClick={() => toggleBookmark(active)}
                    title={bookmarks.includes(active) ? "Remove bookmark" : "Bookmark this section"}
                    style={{ fontSize: 18, color: bookmarks.includes(active) ? "#FFD700" : "var(--text4)" }}>
                    {bookmarks.includes(active) ? "★" : "☆"}
                  </button>
                </div>
              )}
              {active === "home"         && <HomeSection onNavigate={selectSection} />}
              {active === "how"          && <HowItWorks />}
              {active === "points"       && <PointsSystem />}
              {active === "drivers"      && <DriversSection />}
              {active === "teams"        && <TeamsSection />}
              {active === "history"      && <HistorySection />}
              {active === "circuits"     && <CircuitsSection />}
              {active === "results"      && <ResultsSection />}
              {active === "glossary"     && <GlossarySection />}
              {active === "rules"        && <RulesSection />}
              {active === "compare"      && <CarCompareSection />}
              {active === "records"      && <RecordsSection />}
              {active === "quiz"         && <QuizSection />}
              {active === "predictor"    && <RacePredictorSection />}
              {active === "news"         && <NewsSection />}
              {active === "drivercompare"&& <DriverCompareSection />}
              {active === "championship" && <ChampionshipTrackerSection />}
              {active === "teamquiz"     && <TeamQuizSection />}
              {active === "tyrestrategy" && <TyreStrategySection />}
              {active === "h2h"          && <HeadToHeadSection />}
              {active === "preview"      && <SeasonPreviewSection onNavigate={selectSection} />}
              {active === "bookmarks"    && <BookmarksSection bookmarks={bookmarks} onNavigate={selectSection} onRemove={id => toggleBookmark(id)} />}
            </div>
          </main>
          <MobileNav active={active} onSelect={selectSection} />
        </div>
      </div>
    </>
  );
}