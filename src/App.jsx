import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600;700;900&family=Orbitron:wght@400;700;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root {
    width: 100%;
    min-height: 100vh;
    background: #0a0a0f;
    color: #e8e8f0;
    font-family: 'Exo 2', sans-serif;
  }

  .f1-app {
    width: 100%;
    min-height: 100vh;
    background: #0a0a0f;
    position: relative;
    overflow-x: hidden;
  }

  .grid-bg {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,30,30,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,30,30,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 0;
  }

  .content { position: relative; z-index: 1; width: 100%; }

  .hero {
    background: linear-gradient(135deg, #0a0a0f 0%, #1a0505 50%, #0a0a0f 100%);
    border-bottom: 2px solid #e10600;
    padding: clamp(24px, 5vw, 40px) 20px clamp(20px, 4vw, 30px);
    text-align: center;
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  .hero::before {
    content: 'F1';
    position: absolute;
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(100px, 28vw, 300px);
    font-weight: 900;
    color: rgba(225,6,0,0.04);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    white-space: nowrap;
  }
  .hero-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(20px, 6vw, 56px);
    font-weight: 900;
    color: #fff;
    letter-spacing: clamp(2px, 1vw, 4px);
    text-transform: uppercase;
    position: relative; z-index: 1;
  }
  .hero-title span { color: #e10600; }
  .hero-sub {
    font-size: clamp(9px, 2.2vw, 14px);
    color: #888;
    letter-spacing: clamp(2px, 1vw, 6px);
    text-transform: uppercase;
    margin-top: 8px;
    position: relative; z-index: 1;
  }

  .nav {
    display: flex;
    justify-content: center;
    padding: 10px 8px;
    background: #0d0d15;
    border-bottom: 1px solid #1e1e2e;
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
  }
  .nav-inner {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    justify-content: center;
    max-width: 1200px;
    width: 100%;
  }
  .nav-btn {
    padding: clamp(5px, 1.5vw, 8px) clamp(8px, 2vw, 14px);
    background: transparent;
    border: 1px solid #2a2a3a;
    color: #888;
    font-family: 'Exo 2', sans-serif;
    font-size: clamp(9px, 2vw, 12px);
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    border-radius: 2px;
    white-space: nowrap;
  }
  .nav-btn:hover { border-color: #e10600; color: #fff; }
  .nav-btn.active { background: #e10600; border-color: #e10600; color: #fff; }

  .main {
    padding: clamp(16px, 4vw, 40px) clamp(12px, 4vw, 20px);
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  }

  .section-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(16px, 4vw, 32px);
    font-weight: 900;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 8px;
  }
  .section-title span { color: #e10600; }
  .section-line {
    height: 2px;
    background: linear-gradient(90deg, #e10600, transparent);
    margin-bottom: 24px;
  }

  .year-toggle { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
  .year-btn {
    padding: 8px 18px;
    background: transparent;
    border: 1px solid #2a2a3a;
    color: #666;
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.2s;
    border-radius: 2px;
  }
  .year-btn:hover { border-color: #e10600; color: #fff; }
  .year-btn.active { background: #e10600; border-color: #e10600; color: #fff; }
  .new-badge {
    display: inline-block;
    padding: 2px 6px;
    background: rgba(0,220,120,0.15);
    border: 1px solid rgba(0,220,120,0.4);
    color: #00dc78;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1px;
    border-radius: 2px;
    margin-left: 6px;
    vertical-align: middle;
    text-transform: uppercase;
  }

  .card {
    background: #0d0d15;
    border: 1px solid #1e1e2e;
    border-radius: 4px;
    padding: 18px;
    transition: border-color 0.2s;
  }
  .card:hover { border-color: #e10600; }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 290px), 1fr));
    gap: 14px;
  }

  .how-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
    gap: 14px;
    margin-bottom: 24px;
  }
  .how-card {
    background: #0d0d15;
    border: 1px solid #1e1e2e;
    border-left: 3px solid #e10600;
    padding: 16px;
    border-radius: 2px;
  }
  .how-card h3 {
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    color: #e10600;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .how-card p { font-size: 13px; color: #aaa; line-height: 1.7; }

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
  .points-table td { padding: 8px 12px; border-bottom: 1px solid #1e1e2e; color: #ccc; }
  .points-table tr:nth-child(even) td { background: #0d0d15; }
  .points-table tr:hover td { background: #15151f; }
  .pos-badge {
    display: inline-flex; align-items: center; justify-content: center;
    width: 26px; height: 26px;
    background: #1a1a2a; border: 1px solid #2a2a3a;
    border-radius: 50%; font-weight: 700; color: #fff; font-size: 11px;
  }
  .pos-badge.p1 { background: #e10600; border-color: #e10600; }
  .pos-badge.p2 { background: #c0c0c0; border-color: #c0c0c0; color: #000; }
  .pos-badge.p3 { background: #cd7f32; border-color: #cd7f32; }

  .driver-card {
    background: #0d0d15;
    border: 1px solid #1e1e2e;
    border-radius: 4px;
    overflow: hidden;
    transition: transform 0.2s, border-color 0.2s;
  }
  .driver-card:hover { transform: translateY(-3px); border-color: #e10600; }
  .driver-header {
    padding: 12px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #1e1e2e;
  }
  .driver-number {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(20px, 4vw, 30px);
    font-weight: 900;
    color: #e10600;
    min-width: 40px;
    line-height: 1;
    flex-shrink: 0;
  }
  .driver-info { flex: 1; min-width: 0; }
  .driver-name {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(10px, 2.2vw, 13px);
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .driver-country { font-size: 11px; color: #666; margin-top: 2px; }
  .driver-team-badge {
    flex-shrink: 0;
    padding: 3px 7px;
    border-radius: 2px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .driver-body { padding: 12px 14px; }
  .driver-stat-row { display: flex; gap: 6px; margin-bottom: 10px; }
  .driver-stat {
    text-align: center;
    background: #12121c;
    border: 1px solid #1e1e2e;
    padding: 6px 8px;
    border-radius: 2px;
    flex: 1;
  }
  .driver-stat-val {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(13px, 2.5vw, 17px);
    font-weight: 700;
    color: #e10600;
  }
  .driver-stat-lbl { font-size: 9px; color: #555; letter-spacing: 1px; text-transform: uppercase; margin-top: 2px; }
  .driver-desc { font-size: 12px; color: #999; line-height: 1.65; margin-bottom: 8px; }
  .driver-media { font-size: 12px; color: #666; font-style: italic; border-left: 2px solid #e10600; padding-left: 10px; margin-top: 8px; }

  .rating-bar-wrap { margin: 5px 0; }
  .rating-label { display: flex; justify-content: space-between; font-size: 10px; color: #666; margin-bottom: 3px; }
  .rating-bar { height: 3px; background: #1e1e2e; border-radius: 2px; overflow: hidden; }
  .rating-fill { height: 100%; background: linear-gradient(90deg, #e10600, #ff6060); border-radius: 2px; }

  .team-card {
    background: #0d0d15;
    border: 1px solid #1e1e2e;
    border-radius: 4px;
    overflow: hidden;
    transition: transform 0.2s, border-color 0.2s;
  }
  .team-card:hover { transform: translateY(-3px); }
  .team-header {
    padding: 14px 16px;
    border-bottom: 1px solid #1e1e2e;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .team-color-block { width: 5px; height: 48px; border-radius: 3px; flex-shrink: 0; }
  .team-name {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(10px, 2.2vw, 14px);
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .team-base { font-size: 11px; color: #666; margin-top: 3px; }
  .team-body { padding: 12px 16px; }
  .team-detail { font-size: 12px; color: #999; line-height: 1.7; }
  .team-row { display: flex; gap: 5px; margin-bottom: 6px; flex-wrap: wrap; }
  .team-pill {
    background: #12121c;
    border: 1px solid #1e1e2e;
    padding: 3px 9px;
    border-radius: 20px;
    font-size: 11px;
    color: #aaa;
  }
  .team-pill strong { color: #e10600; }

  .search-wrap { margin-bottom: 14px; position: relative; }
  .search-input {
    width: 100%;
    background: #0d0d15;
    border: 1px solid #2a2a3a;
    border-radius: 2px;
    padding: 10px 14px 10px 36px;
    color: #fff;
    font-family: 'Exo 2', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
  }
  .search-input:focus { border-color: #e10600; }
  .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #555; font-size: 13px; }

  .filter-row { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 16px; }
  .filter-pill {
    padding: 4px 10px;
    background: transparent;
    border: 1px solid #2a2a3a;
    border-radius: 20px;
    color: #666;
    font-size: 10px;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Exo 2', sans-serif;
  }
  .filter-pill:hover { border-color: #e10600; color: #fff; }
  .filter-pill.active { background: #e10600; border-color: #e10600; color: #fff; }

  .expand-btn {
    background: transparent;
    border: 1px solid #2a2a3a;
    color: #666;
    padding: 5px 10px;
    font-size: 10px;
    cursor: pointer;
    font-family: 'Exo 2', sans-serif;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-top: 10px;
    transition: all 0.2s;
    border-radius: 2px;
  }
  .expand-btn:hover { border-color: #e10600; color: #e10600; }

  .champ-table { width: 100%; border-collapse: collapse; }
  .champ-table th { background: #12121c; color: #e10600; padding: 8px 10px; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; text-align: left; font-family: 'Orbitron', sans-serif; }
  .champ-table td { padding: 8px 10px; border-bottom: 1px solid #1a1a2a; font-size: 12px; color: #bbb; }
  .champ-table tr:hover td { background: #0d0d15; }
  .gold { color: #ffd700; font-weight: 700; }
  .silver { color: #c0c0c0; }

  .timeline { position: relative; padding-left: 26px; }
  .timeline::before {
    content: ''; position: absolute;
    left: 8px; top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #e10600, transparent);
  }
  .timeline-item { position: relative; margin-bottom: 26px; }
  .timeline-dot {
    position: absolute; left: -21px; top: 4px;
    width: 9px; height: 9px;
    background: #e10600; border-radius: 50%;
    border: 2px solid #0a0a0f;
  }
  .timeline-year { font-family: 'Orbitron', sans-serif; font-size: 12px; color: #e10600; font-weight: 700; letter-spacing: 2px; margin-bottom: 5px; }
  .timeline-content { font-size: 13px; color: #999; line-height: 1.7; }
  .timeline-change {
    background: #0d0d15; border: 1px solid #1e1e2e;
    border-left: 3px solid #e10600;
    padding: 10px 12px; margin-top: 8px;
    border-radius: 2px; font-size: 12px; color: #aaa;
  }
  .change-tag {
    display: inline-block; padding: 2px 6px; border-radius: 2px;
    font-size: 9px; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; margin-right: 4px; margin-bottom: 4px;
  }
  .tag-in { background: rgba(0,200,100,0.15); color: #00c864; border: 1px solid rgba(0,200,100,0.3); }
  .tag-out { background: rgba(225,6,0,0.15); color: #e10600; border: 1px solid rgba(225,6,0,0.3); }
  .tag-reason { background: rgba(255,200,0,0.1); color: #ffc800; border: 1px solid rgba(255,200,0,0.2); }

  @media (max-width: 600px) {
    .points-wrap { grid-template-columns: 1fr; }
    .card-grid { grid-template-columns: 1fr; }
    .how-grid { grid-template-columns: 1fr; }
    .driver-header { gap: 8px; }
    .driver-stat-row { gap: 4px; }
    .filter-pill { font-size: 9px; padding: 3px 8px; }
    .nav-btn { padding: 5px 8px; font-size: 9px; letter-spacing: 0; }
    .year-btn { padding: 6px 12px; font-size: 10px; }
    .main { padding: 14px 10px; }
    .hero { padding: 22px 12px 18px; }
    .timeline { padding-left: 18px; }
    .timeline::before { left: 5px; }
    .timeline-dot { left: -15px; }
    .champ-table th, .champ-table td { padding: 6px 8px; font-size: 10px; }
    .section-title { letter-spacing: 1px; }
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
  { id: "redbull", name: "Oracle Red Bull Racing", base: "Milton Keynes, UK", color: "#3671C6", engine: "Ford RBPT (NEW)", tp: "Christian Horner", founded: 2005, championships: "6 Constructors", drivers: ["Max Verstappen", "Liam Lawson"], desc: "Red Bull parts ways with Honda and moves to a Ford partnership for 2026. The RBPT unit carries Ford branding. Verstappen stays on his mega contract. Lawson gets year two to prove himself at the highest level.", engineNote: "Ford RBPT — Red Bull Powertrains builds the unit in-house with Ford as commercial partner. 2026 has entirely new engine regs (550kw, ~50% electrical power)." },
  { id: "mercedes", name: "Mercedes-AMG Petronas", base: "Brackley, UK", color: "#27F4D2", engine: "Mercedes (new regs)", tp: "Toto Wolff", founded: 2010, championships: "8 Constructors (2014–2021)", drivers: ["George Russell", "Kimi Antonelli"], desc: "Mercedes dominated the last major regulation change in 2014. Wolff is hoping history repeats in 2026. Russell and the rapidly-developing Antonelli carry their hopes into a new era.", engineNote: "Mercedes 2026 PU — Completely redesigned. ~50% electric power requirement. Mercedes expected to be very strong." },
  { id: "ferrari", name: "Scuderia Ferrari", base: "Maranello, Italy", color: "#E8002D", engine: "Ferrari (new regs)", tp: "Frédéric Vasseur", founded: 1950, championships: "16 Constructors (last: 2008)", drivers: ["Charles Leclerc", "Lewis Hamilton"], desc: "Hamilton and Leclerc continue into the new era. Ferrari's Maranello factory has invested massively in the 2026 power unit. The dream: Hamilton finally wins his 8th title in red.", engineNote: "Ferrari 2026 PU — Redesigned from ground up. Also supplied to Haas. Sauber switches to Audi." },
  { id: "mclaren", name: "McLaren F1 Team", base: "Woking, UK", color: "#FF8000", engine: "Mercedes (new regs)", tp: "Andrea Stella", founded: 1966, championships: "8 Constructors (last: 1998)", drivers: ["Lando Norris", "Oscar Piastri"], desc: "McLaren enter 2026 as title favourites. Their chassis expertise plus Mercedes' expected strong 2026 unit makes them dangerous. Norris and Piastri continue — the best young pairing in F1.", engineNote: "Mercedes-supplied 2026 unit." },
  { id: "astonmartin", name: "Aston Martin Aramco", base: "Silverstone, UK", color: "#229971", engine: "Honda (works)", tp: "Andy Cowell", founded: 2021, championships: "0", drivers: ["Fernando Alonso", "Lance Stroll"], desc: "A huge twist — Aston Martin signed a works deal with Honda for 2026 after Mercedes ended their supply agreement. Andy Cowell (ex-Mercedes HPP) now runs a Honda-powered team. Alonso's last shot at glory with a works engine.", engineNote: "Honda works PU — Honda ended their Red Bull partnership and signed with Aston Martin as their exclusive works team from 2026. A major coup." },
  { id: "alpine", name: "Alpine F1 Team", base: "Enstone, UK", color: "#0093CC", engine: "Mercedes (new regs)", tp: "Oliver Oakes", founded: 2021, championships: "0", drivers: ["Pierre Gasly", "Jack Doohan"], desc: "Alpine ditches their own Renault engine and becomes a Mercedes customer — effectively admitting the Renault unit wasn't good enough. A huge strategic shift for the French manufacturer.", engineNote: "Switches to Mercedes power in 2026 — the biggest change in the team's history." },
  { id: "williams", name: "Williams Racing", base: "Grove, UK", color: "#64C4FF", engine: "Mercedes (new regs)", tp: "James Vowles", founded: 1977, championships: "9 Constructors (last: 1997)", drivers: ["Alexander Albon", "Carlos Sainz"], desc: "The regulation reset gives Williams a clean slate. If Mercedes hit the ground running in 2026, Williams could genuinely challenge the top teams. Vowles' rebuild enters its most exciting chapter yet.", engineNote: "Mercedes-supplied — continuing relationship into new regulations." },
  { id: "haas", name: "MoneyGram Haas F1 Team", base: "Kannapolis, USA", color: "#B6BABD", engine: "Ferrari (new regs)", tp: "Ayao Komatsu", founded: 2016, championships: "0", drivers: ["Esteban Ocon", "Oliver Bearman"], desc: "Continue as Ferrari customers into 2026. Bearman is Ferrari-backed — keeping the pipeline intact. New regulations give everyone a chance to surprise.", engineNote: "Ferrari-supplied 2026 unit." },
  { id: "rb", name: "Racing Bulls (VCARB)", base: "Faenza, Italy", color: "#6692FF", engine: "Ford RBPT (NEW)", tp: "Laurent Mekies", founded: 2006, championships: "0", drivers: ["Yuki Tsunoda", "Isack Hadjar"], desc: "Switches to the Ford RBPT unit alongside Red Bull. If the new engine is strong, Tsunoda and Hadjar could make serious noise in the midfield.", engineNote: "Ford RBPT — same new unit as Red Bull Racing." },
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
  { id: "lawson", number: 30, name: "Liam Lawson", country: "🇳🇿 New Zealand", team: "Red Bull Racing", teamColor: "#3671C6", championships: 0, wins: "0", poles: "0", skill: 85, racecraft: 84, consistency: 83, media: 70, desc: "The surprise Red Bull promotion over Tsunoda. Brave, combative, impressive as a stand-in. Now faces the hardest test in motorsport: being Verstappen's teammate.", mediaNote: "Calm, grounded. New Zealand fans very proud. Still building his profile.", seasons: "2024–present" },
  { id: "tsunoda", number: 22, name: "Yuki Tsunoda", country: "🇯🇵 Japan", team: "RB / VCARB", teamColor: "#6692FF", championships: 0, wins: "0", poles: "0", skill: 84, racecraft: 83, consistency: 81, media: 82, desc: "Controversially overlooked for the Red Bull promotion in favour of Lawson. Stays at RB as clear team leader. Has matured enormously. The radio explosions still make great content though.", mediaNote: "Viral radio moments, loved in Japan, strong internet following.", seasons: "2021–present" },
  { id: "gasly", number: 10, name: "Pierre Gasly", country: "🇫🇷 France", team: "Alpine", teamColor: "#0093CC", championships: 0, wins: "1", poles: "1", skill: 85, racecraft: 83, consistency: 84, media: 80, desc: "Senior head at Alpine through their engine transition. His Monza 2020 win remains one of the most emotional moments in recent F1 memory. A rollercoaster career that keeps delivering.", mediaNote: "Popular in France. His Monza 2020 celebration is legendary.", seasons: "2017–present" },
  { id: "ocon", number: 31, name: "Esteban Ocon", country: "🇫🇷 France", team: "Haas", teamColor: "#B6BABD", championships: 0, wins: "1", poles: "0", skill: 83, racecraft: 80, consistency: 83, media: 72, desc: "Left Alpine for Haas. Fresh environment might unlock him. Solid operator who perhaps never found the perfect team. His 2021 Hungarian win showed what he can do.", mediaNote: "Lower media profile. The Alonso feud era was very entertaining for fans.", seasons: "2016–present" },
  { id: "bearman", number: 87, name: "Oliver Bearman", country: "🇬🇧 United Kingdom", team: "Haas", teamColor: "#B6BABD", championships: 0, wins: "0", poles: "0", skill: 83, racecraft: 81, consistency: 80, media: 78, desc: "British teenager who stunned F1 with P7 on debut at Ferrari in 2024 as a last-minute stand-in. Ferrari-backed. Gets his full seat aged 19. One of the most hyped young talents in years.", mediaNote: "British media darling. Remarkably calm under pressure. Ferrari's future?", seasons: "2025–present" },
  { id: "doohan", number: 7, name: "Jack Doohan", country: "🇦🇺 Australia", team: "Alpine", teamColor: "#0093CC", championships: 0, wins: "0", poles: "0", skill: 80, racecraft: 79, consistency: 79, media: 68, desc: "Son of motorcycle legend Mick Doohan. Alpine's 2025 rookie. Tough debut environment — a team changing engine suppliers and restructuring. Has the pedigree but it'll be a baptism of fire.", mediaNote: "Famous surname. Australia is watching. Quiet media presence so far.", seasons: "2025–present" },
  { id: "hadjar", number: 6, name: "Isack Hadjar", country: "🇫🇷 France", team: "RB / VCARB", teamColor: "#6692FF", championships: 0, wins: "0", poles: "0", skill: 81, racecraft: 80, consistency: 79, media: 65, desc: "French-Algerian Red Bull junior who dominated Formula 2. Joins Tsunoda at RB for his debut. Red Bull see him as a long-term investment — aggressive and quick.", mediaNote: "Big in France and Algeria. Still establishing his F1 personality.", seasons: "2025–present" },
  { id: "bortoleto", number: 5, name: "Gabriel Bortoleto", country: "🇧🇷 Brazil", team: "Sauber / Audi", teamColor: "#52E252", championships: 0, wins: "0", poles: "0", skill: 82, racecraft: 81, consistency: 80, media: 74, desc: "Won F3 and F2 in consecutive seasons — a rare achievement. Brazil's first full-time F1 driver in years. Joins Sauber as they transform into Audi. McLaren junior released to make his debut.", mediaNote: "Brazil is excited. Carries the weight of a nation. Fresh, likeable personality.", seasons: "2025–present" },
  { id: "hulkenberg", number: 27, name: "Nico Hülkenberg", country: "🇩🇪 Germany", team: "Sauber / Audi", teamColor: "#52E252", championships: 0, wins: "0", poles: "1", skill: 86, racecraft: 85, consistency: 87, media: 75, desc: "Out of F1 for 3 years, came back as a substitute, earned a full seat, now leads the team becoming Audi. The most important role of his career. One of the cleanest racers on the grid.", mediaNote: "Dry German wit. Respected everywhere. The Audi chapter is his biggest yet.", seasons: "2010–2019, 2023–present" },
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
      <div className="rating-bar"><div className="rating-fill" style={{ width: `${value}%` }} /></div>
    </div>
  );
}

function DriverCard({ driver }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="driver-card">
      <div className="driver-header">
        <div className="driver-number">{driver.number}</div>
        <div className="driver-info">
          <div className="driver-name">{driver.name}</div>
          <div className="driver-country">{driver.country}</div>
        </div>
        <div className="driver-team-badge" style={{ background: driver.teamColor + "22", color: driver.teamColor, border: `1px solid ${driver.teamColor}44` }}>
          {driver.team.split(" ").slice(0, 2).join(" ")}
        </div>
      </div>
      <div className="driver-body">
        <div className="driver-stat-row">
          <div className="driver-stat"><div className="driver-stat-val">⭐{driver.championships}</div><div className="driver-stat-lbl">Titles</div></div>
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
            <div style={{ fontSize: 10, color: "#555", marginTop: 8 }}>Active: {driver.seasons}</div>
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
  return (
    <div className="team-card" style={{ borderTop: `3px solid ${team.color}` }}>
      <div className="team-header">
        <div className="team-color-block" style={{ background: team.color }} />
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
            <span key={d} className="team-pill" style={{ background: team.color + "18", borderColor: team.color + "44", color: "#ddd" }}>🏎 {d}</span>
          ))}
        </div>
        <p className="team-detail" style={{ marginTop: 10 }}>{team.desc}</p>
        {expanded && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 10, color: "#e10600", letterSpacing: 2, textTransform: "uppercase", marginBottom: 5, fontFamily: "Orbitron" }}>Engine Notes</div>
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
                  <td style={{ fontSize: 10, color: "#555" }}>{row.pos === 1 ? "+1 fastest lap" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="card" style={{ marginTop: 12 }}>
            <p style={{ fontSize: 12, color: "#999", lineHeight: 1.7 }}>
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
                  <td style={{ fontSize: 10, color: "#888" }}>{row.team2}</td>
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
  const filtered = DRIVERS_2025.filter(d => {
    const q = search.toLowerCase();
    const matchSearch = d.name.toLowerCase().includes(q) || d.team.toLowerCase().includes(q);
    const matchFilter = filter === "All" || d.team.toLowerCase().includes(filter.toLowerCase());
    return matchSearch && matchFilter;
  });
  return (
    <div>
      <div className="section-title">2025 <span>Drivers</span></div>
      <div className="section-line" />
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input className="search-input" placeholder="Search drivers or teams..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="filter-row">
        {["All","Red Bull","Mercedes","Ferrari","McLaren","Aston","Alpine","Williams","Haas","RB","Sauber","Cadillac"].map(f => (
          <button key={f} className={`filter-pill${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="card-grid">
        {filtered.map(d => <DriverCard key={d.id} driver={d} />)}
      </div>
      {filtered.length === 0 && <div style={{ color: "#555", textAlign: "center", padding: 40 }}>No drivers found</div>}
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
          <p style={{ fontSize: 12, color: "#aaa", lineHeight: 1.7 }}>
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
      <div className="section-title">Driver <span>Changes</span> 2018–2025</div>
      <div className="section-line" />
      <p style={{ marginBottom: 16, fontSize: 13, color: "#666", lineHeight: 1.7 }}>
        F1 has only 20 seats. Drivers are dropped, promoted, and shuffled constantly. Here's every major move from 2018 to 2025 — and the real reason behind each one.
      </p>
      <div className="timeline">
        {DRIVER_HISTORY.map(era => (
          <div className="timeline-item" key={era.year}>
            <div className="timeline-dot" />
            <div className="timeline-year">{era.year}</div>
            <div className="timeline-content">
              <strong style={{ color: "#fff", fontSize: 14 }}>{era.title}</strong>
              <p style={{ marginTop: 6 }}>{era.context}</p>
              <div style={{ marginTop: 10 }}>
                {era.changes.map((c, i) => (
                  <div className="timeline-change" key={i}>
                    <div style={{ marginBottom: 5, fontWeight: 700, color: "#fff", fontSize: 12 }}>{c.team}</div>
                    <span className="change-tag tag-out">OUT: {c.out}</span>
                    <span className="change-tag tag-in">IN: {c.in}</span>
                    <br />
                    <span className="change-tag tag-reason">WHY</span>
                    <span style={{ fontSize: 12, color: "#999" }}>{c.reason}</span>
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

function ResultsSection() {
  const raceResults = [
    { pos: 1, driver: "George Russell", team: "Mercedes", teamColor: "#27F4D2", points: 25, gap: "Winner", note: "Pole to flag. One-stop strategy worked perfectly." },
    { pos: 2, driver: "Kimi Antonelli", team: "Mercedes", teamColor: "#27F4D2", points: 18, gap: "+8.4s", note: "Stunning debut podium at 18 years old." },
    { pos: 3, driver: "Charles Leclerc", team: "Ferrari", teamColor: "#E8002D", points: 15, gap: "+18.2s", note: "Led early laps after brilliant start but Ferrari's strategy cost them." },
    { pos: 4, driver: "Lewis Hamilton", team: "Ferrari", teamColor: "#E8002D", points: 12, gap: "+35.7s", note: "Solid debut in red but Mercedes had the pace edge." },
    { pos: 5, driver: "Lando Norris", team: "McLaren", teamColor: "#FF8000", points: 10, gap: "+71.1s", note: "35+ seconds behind Hamilton — McLaren struggled with the new regs." },
    { pos: 6, driver: "Max Verstappen", team: "Red Bull", teamColor: "#3671C6", points: 8, gap: "+78.5s", note: "Sensational drive from P20 (crashed in Q1) to 6th. Vintage Verstappen." },
    { pos: 7, driver: "Oliver Bearman", team: "Haas", teamColor: "#B6BABD", points: 6, gap: "+90.2s", note: "Impressive points on debut as a full-time driver." },
    { pos: 8, driver: "Arvid Lindblad", team: "Racing Bulls", teamColor: "#6692FF", points: 4, gap: "+95.8s", note: "Stellar F1 debut for the 18-year-old rookie." },
    { pos: 9, driver: "Gabriel Bortoleto", team: "Audi", teamColor: "#BB0A21", points: 2, gap: "+102.3s", note: "Points on debut for Audi — a historic moment for the brand." },
    { pos: 10, driver: "Pierre Gasly", team: "Alpine", teamColor: "#0093CC", points: 1, gap: "+108.9s", note: "Lone point for Alpine in a difficult weekend." },
  ];

  const dnf = [
    { driver: "Oscar Piastri", team: "McLaren", reason: "DNF — Crashed McLaren on sighting lap before race start. Did not start." },
    { driver: "Nico Hülkenberg", team: "Audi", reason: "DNS — Technical issue. Did not start." },
    { driver: "Valtteri Bottas", team: "Cadillac", reason: "DNF — Retired during race. Cadillac's difficult debut." },
    { driver: "Isack Hadjar", team: "Red Bull", reason: "DNF — Retired, triggering the VSC that changed the race strategy." },
    { driver: "Fernando Alonso", team: "Aston Martin", reason: "DNF — Retired. Honda power unit issues on debut." },
    { driver: "Lance Stroll", team: "Aston Martin", reason: "NC — Not classified despite rejoining race." },
  ];

  return (
    <div>
      <div className="section-title">2026 <span>Results</span></div>
      <div className="section-line" />

      <div className="card" style={{ marginBottom: 20, borderLeft: "3px solid #e10600" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
          <div style={{ fontFamily: "Orbitron", fontSize: 11, color: "#e10600", letterSpacing: 2, textTransform: "uppercase" }}>Round 1</div>
          <div style={{ fontFamily: "Orbitron", fontSize: 14, fontWeight: 700, color: "#fff" }}>🇦🇺 Australian Grand Prix</div>
          <div style={{ marginLeft: "auto", fontSize: 11, color: "#555" }}>Melbourne · 8 Mar 2026</div>
        </div>
        <p style={{ fontSize: 12, color: "#aaa", lineHeight: 1.7 }}>
          The first race of the new F1 era. Mercedes dominated from the front — Russell took pole by nearly 8 tenths, then won the race using a brave one-stop strategy. Ferrari led early laps but their decision not to pit under two Virtual Safety Cars proved costly. Verstappen drove from last to 6th after crashing in qualifying. Piastri didn't even start — crashing his McLaren on the sighting lap.
        </p>
      </div>

      <div style={{ overflowX: "auto", marginBottom: 24 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
          <thead>
            <tr>
              <th style={{ background: "#e10600", color: "#fff", padding: "9px 12px", textAlign: "left", fontFamily: "Orbitron", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Pos</th>
              <th style={{ background: "#e10600", color: "#fff", padding: "9px 12px", textAlign: "left", fontFamily: "Orbitron", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Driver</th>
              <th style={{ background: "#e10600", color: "#fff", padding: "9px 12px", textAlign: "left", fontFamily: "Orbitron", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Team</th>
              <th style={{ background: "#e10600", color: "#fff", padding: "9px 12px", textAlign: "left", fontFamily: "Orbitron", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Pts</th>
              <th style={{ background: "#e10600", color: "#fff", padding: "9px 12px", textAlign: "left", fontFamily: "Orbitron", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Gap</th>
            </tr>
          </thead>
          <tbody>
            {raceResults.map(row => (
              <tr key={row.pos} style={{ borderBottom: "1px solid #1e1e2e" }}>
                <td style={{ padding: "10px 12px" }}>
                  <span className={`pos-badge${row.pos === 1 ? " p1" : row.pos === 2 ? " p2" : row.pos === 3 ? " p3" : ""}`}>{row.pos}</span>
                </td>
                <td style={{ padding: "10px 12px" }}>
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: 13 }}>{row.driver}</div>
                  <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{row.note}</div>
                </td>
                <td style={{ padding: "10px 12px" }}>
                  <span style={{ background: row.teamColor + "22", color: row.teamColor, border: `1px solid ${row.teamColor}44`, padding: "3px 8px", borderRadius: 2, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap" }}>{row.team}</span>
                </td>
                <td style={{ padding: "10px 12px", fontFamily: "Orbitron", fontWeight: 700, color: row.pos <= 3 ? "#e10600" : "#aaa", fontSize: 13 }}>{row.points}</td>
                <td style={{ padding: "10px 12px", fontSize: 12, color: "#555" }}>{row.gap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-title" style={{ fontSize: "clamp(13px,3vw,18px)", marginBottom: 8 }}>Did Not <span>Finish / Start</span></div>
      <div className="section-line" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: 10, marginBottom: 32 }}>
        {dnf.map(d => (
          <div key={d.driver} style={{ background: "#0d0d15", border: "1px solid #1e1e2e", borderLeft: "3px solid #333", padding: "12px 14px", borderRadius: 2 }}>
            <div style={{ fontWeight: 700, color: "#fff", fontSize: 13, marginBottom: 4 }}>{d.driver}</div>
            <div style={{ fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{d.team}</div>
            <div style={{ fontSize: 12, color: "#777" }}>{d.reason}</div>
          </div>
        ))}
      </div>

      <div className="section-title" style={{ fontSize: "clamp(13px,3vw,18px)", marginBottom: 8 }}>Drivers' <span>Standings</span></div>
      <div className="section-line" />
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 360 }}>
          <thead>
            <tr>
              <th style={{ background: "#12121c", color: "#e10600", padding: "8px 12px", fontFamily: "Orbitron", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", textAlign: "left" }}>Pos</th>
              <th style={{ background: "#12121c", color: "#e10600", padding: "8px 12px", fontFamily: "Orbitron", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", textAlign: "left" }}>Driver</th>
              <th style={{ background: "#12121c", color: "#e10600", padding: "8px 12px", fontFamily: "Orbitron", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", textAlign: "left" }}>Pts</th>
            </tr>
          </thead>
          <tbody>
            {raceResults.map(row => (
              <tr key={row.pos} style={{ borderBottom: "1px solid #1a1a2a" }}>
                <td style={{ padding: "8px 12px" }}><span className={`pos-badge${row.pos === 1 ? " p1" : row.pos === 2 ? " p2" : row.pos === 3 ? " p3" : ""}`}>{row.pos}</span></td>
                <td style={{ padding: "8px 12px", fontSize: 13, color: row.pos <= 3 ? "#fff" : "#bbb", fontWeight: row.pos <= 3 ? 700 : 400 }}>{row.driver}</td>
                <td style={{ padding: "8px 12px", fontFamily: "Orbitron", fontWeight: 700, fontSize: 13, color: row.pos <= 3 ? "#e10600" : "#aaa" }}>{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 16, fontSize: 11, color: "#444", textAlign: "center" }}>After Round 1 of 24 · Next: 🇨🇳 Chinese GP — 15 Mar 2026</div>
    </div>
  );
}

const SECTIONS = [
  { id: "how", label: "🏁 How It Works" },
  { id: "points", label: "📊 Points" },
  { id: "drivers", label: "🏎️ Drivers" },
  { id: "teams", label: "🔧 Teams" },
  { id: "history", label: "📅 Changes" },
  { id: "results", label: "🏆 2026 Results" },
];

export default function F1Guide() {
  const [active, setActive] = useState("how");
  return (
    <>
      <style>{styles}</style>
      <div className="f1-app">
        <div className="grid-bg" />
        <div className="content">
          <div className="hero">
            <div className="hero-title">FORMULA <span>1</span></div>
            <div className="hero-sub">The Complete Beginner's Guide · 2018 – 2026</div>
          </div>
          <nav className="nav">
            <div className="nav-inner">
              {SECTIONS.map(s => (
                <button key={s.id} className={`nav-btn${active === s.id ? " active" : ""}`} onClick={() => setActive(s.id)}>
                  {s.label}
                </button>
              ))}
            </div>
          </nav>
          <main className="main">
            {active === "how" && <HowItWorks />}
            {active === "points" && <PointsSystem />}
            {active === "drivers" && <DriversSection />}
            {active === "teams" && <TeamsSection />}
            {active === "history" && <HistorySection />}
            {active === "results" && <ResultsSection />}
          </main>
        </div>
      </div>
    </>
  );
}