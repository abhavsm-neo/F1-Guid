import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600;700;900&family=Orbitron:wght@400;700;900&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

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

  .hero-inner {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* HEADER */
  .hero {
    background: linear-gradient(135deg, #0a0a0f 0%, #1a0505 50%, #0a0a0f 100%);
    border-bottom: 2px solid #e10600;
    padding: 40px 20px 30px;
    text-align: center;
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  .hero::before {
    content: 'F1';
    position: absolute;
    font-family: 'Orbitron', sans-serif;
    font-size: 300px;
    font-weight: 900;
    color: rgba(225,6,0,0.04);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    white-space: nowrap;
  }
  .hero-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(28px, 6vw, 56px);
    font-weight: 900;
    color: #fff;
    letter-spacing: 4px;
    text-transform: uppercase;
  }
  .hero-title span { color: #e10600; }
  .hero-sub {
    font-size: 14px;
    color: #888;
    letter-spacing: 6px;
    text-transform: uppercase;
    margin-top: 8px;
  }

  /* NAV */
  .nav {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 16px 20px;
    background: #0d0d15;
    border-bottom: 1px solid #1e1e2e;
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
    justify-content: center;
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
    padding: 8px 16px;
    background: transparent;
    border: 1px solid #2a2a3a;
    color: #888;
    font-family: 'Exo 2', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    border-radius: 2px;
  }
  .nav-btn:hover { border-color: #e10600; color: #fff; }
  .nav-btn.active {
    background: #e10600;
    border-color: #e10600;
    color: #fff;
  }

  /* MAIN */
  .main {
    padding: 40px 20px;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  }

  /* SECTION HEADER */
  .section-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(20px, 4vw, 32px);
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
    margin-bottom: 32px;
  }

  /* CARDS */
  .card {
    background: #0d0d15;
    border: 1px solid #1e1e2e;
    border-radius: 4px;
    padding: 24px;
    transition: border-color 0.2s;
  }
  .card:hover { border-color: #e10600; }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
  }

  /* HOW IT WORKS */
  .how-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
    margin-bottom: 32px;
  }
  .how-card {
    background: #0d0d15;
    border: 1px solid #1e1e2e;
    border-left: 3px solid #e10600;
    padding: 20px;
    border-radius: 2px;
  }
  .how-card h3 {
    font-family: 'Orbitron', sans-serif;
    font-size: 13px;
    color: #e10600;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .how-card p { font-size: 14px; color: #aaa; line-height: 1.7; }

  /* POINTS TABLE */
  .points-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }
  .points-table th {
    background: #e10600;
    color: #fff;
    padding: 10px 16px;
    text-align: left;
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  .points-table td {
    padding: 10px 16px;
    border-bottom: 1px solid #1e1e2e;
    color: #ccc;
  }
  .points-table tr:nth-child(even) td { background: #0d0d15; }
  .points-table tr:hover td { background: #15151f; }
  .pos-badge {
    display: inline-block;
    width: 28px;
    height: 28px;
    background: #1a1a2a;
    border: 1px solid #2a2a3a;
    border-radius: 50%;
    text-align: center;
    line-height: 28px;
    font-weight: 700;
    color: #fff;
    font-size: 12px;
  }
  .pos-badge.p1 { background: #e10600; border-color: #e10600; }
  .pos-badge.p2 { background: #c0c0c0; border-color: #c0c0c0; color: #000; }
  .pos-badge.p3 { background: #cd7f32; border-color: #cd7f32; }

  /* DRIVER CARDS */
  .driver-card {
    background: #0d0d15;
    border: 1px solid #1e1e2e;
    border-radius: 4px;
    overflow: hidden;
    transition: transform 0.2s, border-color 0.2s;
    cursor: pointer;
  }
  .driver-card:hover { transform: translateY(-4px); border-color: #e10600; }
  .driver-header {
    padding: 16px 20px 12px;
    display: flex;
    align-items: center;
    gap: 14px;
    border-bottom: 1px solid #1e1e2e;
  }
  .driver-number {
    font-family: 'Orbitron', sans-serif;
    font-size: 32px;
    font-weight: 900;
    color: #e10600;
    min-width: 50px;
    line-height: 1;
  }
  .driver-name {
    font-family: 'Orbitron', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .driver-country { font-size: 12px; color: #666; margin-top: 3px; }
  .driver-team-badge {
    margin-left: auto;
    padding: 4px 10px;
    border-radius: 2px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .driver-body { padding: 16px 20px; }
  .driver-stat-row {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }
  .driver-stat {
    text-align: center;
    background: #12121c;
    border: 1px solid #1e1e2e;
    padding: 8px 12px;
    border-radius: 2px;
    flex: 1;
    min-width: 60px;
  }
  .driver-stat-val {
    font-family: 'Orbitron', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #e10600;
  }
  .driver-stat-lbl { font-size: 9px; color: #555; letter-spacing: 1px; text-transform: uppercase; margin-top: 2px; }
  .driver-desc { font-size: 13px; color: #999; line-height: 1.6; margin-bottom: 10px; }
  .driver-media { font-size: 12px; color: #666; font-style: italic; border-left: 2px solid #e10600; padding-left: 10px; margin-top: 8px; }

  .rating-bar-wrap { margin: 6px 0; }
  .rating-label { display: flex; justify-content: space-between; font-size: 11px; color: #666; margin-bottom: 3px; }
  .rating-bar { height: 4px; background: #1e1e2e; border-radius: 2px; overflow: hidden; }
  .rating-fill { height: 100%; background: linear-gradient(90deg, #e10600, #ff6060); border-radius: 2px; transition: width 0.5s; }

  /* TEAM CARDS */
  .team-card {
    background: #0d0d15;
    border: 1px solid #1e1e2e;
    border-radius: 4px;
    overflow: hidden;
    transition: transform 0.2s, border-color 0.2s;
  }
  .team-card:hover { transform: translateY(-4px); }
  .team-header {
    padding: 20px;
    border-bottom: 1px solid #1e1e2e;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .team-color-block {
    width: 6px;
    height: 60px;
    border-radius: 3px;
    flex-shrink: 0;
  }
  .team-name {
    font-family: 'Orbitron', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .team-base { font-size: 12px; color: #666; margin-top: 4px; }
  .team-body { padding: 16px 20px; }
  .team-detail { font-size: 13px; color: #999; line-height: 1.7; }
  .team-row { display: flex; gap: 8px; margin-bottom: 8px; flex-wrap: wrap; }
  .team-pill {
    background: #12121c;
    border: 1px solid #1e1e2e;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 11px;
    color: #aaa;
  }
  .team-pill strong { color: #e10600; }

  /* HISTORY TIMELINE */
  .timeline { position: relative; padding-left: 30px; }
  .timeline::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #e10600, transparent);
  }
  .timeline-item { position: relative; margin-bottom: 28px; }
  .timeline-dot {
    position: absolute;
    left: -24px;
    top: 4px;
    width: 10px;
    height: 10px;
    background: #e10600;
    border-radius: 50%;
    border: 2px solid #0a0a0f;
  }
  .timeline-year {
    font-family: 'Orbitron', sans-serif;
    font-size: 13px;
    color: #e10600;
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 6px;
  }
  .timeline-content { font-size: 13px; color: #999; line-height: 1.7; }
  .timeline-change {
    background: #0d0d15;
    border: 1px solid #1e1e2e;
    border-left: 3px solid #e10600;
    padding: 12px 16px;
    margin-top: 8px;
    border-radius: 2px;
    font-size: 12px;
    color: #aaa;
  }
  .change-tag {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 2px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-right: 6px;
    margin-bottom: 4px;
  }
  .tag-in { background: rgba(0,200,100,0.15); color: #00c864; border: 1px solid rgba(0,200,100,0.3); }
  .tag-out { background: rgba(225,6,0,0.15); color: #e10600; border: 1px solid rgba(225,6,0,0.3); }
  .tag-reason { background: rgba(255,200,0,0.1); color: #ffc800; border: 1px solid rgba(255,200,0,0.2); }

  /* SEARCH */
  .search-wrap { margin-bottom: 24px; position: relative; }
  .search-input {
    width: 100%;
    background: #0d0d15;
    border: 1px solid #2a2a3a;
    border-radius: 2px;
    padding: 12px 16px 12px 40px;
    color: #fff;
    font-family: 'Exo 2', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
  }
  .search-input:focus { border-color: #e10600; }
  .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #555; font-size: 14px; }

  /* FILTER PILLS */
  .filter-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
  .filter-pill {
    padding: 6px 14px;
    background: transparent;
    border: 1px solid #2a2a3a;
    border-radius: 20px;
    color: #666;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Exo 2', sans-serif;
  }
  .filter-pill:hover { border-color: #e10600; color: #fff; }
  .filter-pill.active { background: #e10600; border-color: #e10600; color: #fff; }

  /* EXPAND */
  .expand-btn {
    background: transparent;
    border: 1px solid #2a2a3a;
    color: #666;
    padding: 6px 12px;
    font-size: 11px;
    cursor: pointer;
    font-family: 'Exo 2', sans-serif;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-top: 10px;
    transition: all 0.2s;
  }
  .expand-btn:hover { border-color: #e10600; color: #e10600; }

  /* CHAMPIONSHIP TABLE */
  .champ-table { width: 100%; border-collapse: collapse; }
  .champ-table th { background: #12121c; color: #e10600; padding: 10px 14px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; text-align: left; font-family: 'Orbitron', sans-serif; }
  .champ-table td { padding: 10px 14px; border-bottom: 1px solid #1a1a2a; font-size: 13px; color: #bbb; }
  .champ-table tr:hover td { background: #0d0d15; }
  .gold { color: #ffd700; font-weight: 700; }
  .silver { color: #c0c0c0; }

  @media (max-width: 600px) {
    .card-grid { grid-template-columns: 1fr; }
    .how-grid { grid-template-columns: 1fr; }
    .driver-stat { min-width: 50px; }
  }
`;

// ─── DATA ──────────────────────────────────────────────────────────────────────

const TEAMS = [
  {
    id: "redbull",
    name: "Red Bull Racing",
    base: "Milton Keynes, UK",
    color: "#3671C6",
    engine: "Honda RBPT",
    tp: "Christian Horner",
    founded: 2005,
    championships: "6 Constructors (2010,11,12,13,22,23)",
    drivers2024: ["Max Verstappen", "Sergio Perez"],
    desc: "The most dominant team of the turbo-hybrid era from 2022–2023. Built around Max Verstappen, they won back-to-back-to-back-to-back constructors titles (2022–2023 dominant sweep). Christian Horner is controversial but effective. Engine supplied by Honda (badged RBPT). Known for cutting-edge aerodynamics, especially the underfloor.",
    engineNote: "Honda RBPT – Honda returned to F1 as engine supplier in 2019. They provide the power unit for Red Bull and their sister team RB (formerly AlphaTauri). Among the most powerful units on the grid.",
  },
  {
    id: "mercedes",
    name: "Mercedes-AMG Petronas",
    base: "Brackley, UK",
    color: "#27F4D2",
    engine: "Mercedes",
    tp: "Toto Wolff",
    founded: 2010,
    championships: "8 Constructors (2014–2021)",
    drivers2024: ["Lewis Hamilton", "George Russell"],
    desc: "The most successful team in the turbo-hybrid era overall — 8 consecutive constructors' championships 2014–2021. Toto Wolff is one of the most respected team principals. Struggled since 2022 rule changes but remain a top outfit. Hamilton left for Ferrari in 2025.",
    engineNote: "Mercedes PU106 – Mercedes built one of the most dominant power units in F1 history, dominating 2014–2021. Still competitive but Red Bull and Ferrari closed the gap post-2022.",
  },
  {
    id: "ferrari",
    name: "Scuderia Ferrari",
    base: "Maranello, Italy",
    color: "#E8002D",
    engine: "Ferrari",
    tp: "Frédéric Vasseur",
    founded: 1950,
    championships: "16 Constructors (last: 2008)",
    drivers2024: ["Charles Leclerc", "Carlos Sainz (→ Hamilton 2025)"],
    desc: "The most iconic team in F1 history. Known for passionate fans (Tifosi) and spectacular failure at crucial moments. Fred Vasseur replaced Mattia Binotto in 2023. Strong car in 2022 but strategy errors cost them the title. Always a story.",
    engineNote: "Ferrari power unit – Ferrari supplies their own engines and also provides them to Haas and Sauber/Alfa Romeo. Underwent major development post-2022 to become more competitive.",
  },
  {
    id: "mclaren",
    name: "McLaren F1 Team",
    base: "Woking, UK",
    color: "#FF8000",
    engine: "Mercedes",
    tp: "Andrea Stella",
    founded: 1966,
    championships: "8 Constructors (last: 1998)",
    drivers2024: ["Lando Norris", "Oscar Piastri"],
    desc: "Historic team undergoing a stunning revival. After years of struggle, McLaren rebuilt under new leadership. Became the best of the rest in 2023, then genuine front-runners in 2024. Norris and Piastri are an electric young pairing. Use Mercedes engines.",
    engineNote: "Mercedes-supplied – McLaren switched to Mercedes engines in 2021 after a failed Renault partnership. This was a major turning point in their recovery.",
  },
  {
    id: "astonmartin",
    name: "Aston Martin Aramco",
    base: "Silverstone, UK",
    color: "#229971",
    engine: "Mercedes",
    tp: "Mike Krack",
    founded: 2021,
    championships: "0",
    drivers2024: ["Fernando Alonso", "Lance Stroll"],
    desc: "Rebranded from Racing Point/Force India in 2021. Lawrence Stroll (Lance's father) owns the team and brought in Fernando Alonso in 2023, leading to a fantastic start to the season. Ambition is clear — new factory, huge investment. Results dropped in 2024.",
    engineNote: "Mercedes-supplied – One of three customer Mercedes teams alongside McLaren and Williams.",
  },
  {
    id: "alpine",
    name: "BWT Alpine F1 Team",
    base: "Enstone, UK / Viry-Châtillon, FR",
    color: "#0093CC",
    engine: "Renault (Alpine)",
    tp: "Oliver Oakes (2024)",
    founded: 2021,
    championships: "0 (as Alpine)",
    drivers2024: ["Esteban Ocon", "Pierre Gasly"],
    desc: "The Renault works team rebranded as Alpine in 2021. Historically competitive but struggled post-2022. Multiple team principal changes signal instability. Uses their own Renault power unit — the only French works team.",
    engineNote: "Renault/Alpine power unit – The sole works Renault engine on the grid. Has historically been behind Mercedes and Ferrari in raw power. Alpine supplies only their own team.",
  },
  {
    id: "williams",
    name: "Williams Racing",
    base: "Grove, UK",
    color: "#64C4FF",
    engine: "Mercedes",
    tp: "James Vowles",
    founded: 1977,
    championships: "9 Constructors (last: 1997)",
    drivers2024: ["Alexander Albon", "Logan Sargeant (→ Franco Colapinto mid-2024)"],
    desc: "Once the most successful British team, Williams fell on hard times after the Sir Frank Williams era. Sold to Dorilton Capital in 2020. New TP James Vowles (ex-Mercedes) brought fresh hope from 2023. Albon a fan favourite and strong performer in a weaker car.",
    engineNote: "Mercedes-supplied – Williams has used Mercedes engines since 2014.",
  },
  {
    id: "haas",
    name: "MoneyGram Haas F1 Team",
    base: "Kannapolis, USA / Banbury, UK",
    color: "#B6BABD",
    engine: "Ferrari",
    tp: "Ayao Komatsu (2024)",
    founded: 2016,
    championships: "0",
    drivers2024: ["Kevin Magnussen", "Nico Hülkenberg"],
    desc: "The only American team in F1. A customer Ferrari team that relies heavily on Ferrari's chassis technology. Guenther Steiner (of Netflix fame) was replaced by Ayao Komatsu in 2024. Known for boom-or-bust seasons. Hülkenberg leaving for Sauber/Audi 2025.",
    engineNote: "Ferrari-supplied – Haas is a full Ferrari customer, using their power unit and many Ferrari components. This gives them a competitive baseline but limits their ability to differentiate.",
  },
  {
    id: "rb",
    name: "Visa Cash App RB (VCARB)",
    base: "Faenza, Italy",
    color: "#6692FF",
    engine: "Honda RBPT",
    tp: "Laurent Mekies",
    founded: 2006,
    championships: "0",
    drivers2024: ["Yuki Tsunoda", "Daniel Ricciardo / Liam Lawson"],
    desc: "Red Bull's junior team, known through the years as Toro Rosso and AlphaTauri. Acts as a feeder club for the main Red Bull team. Rebranded to RB/VCARB in 2024. Ricciardo returned here hoping to recapture form but was replaced by Liam Lawson mid-season.",
    engineNote: "Honda RBPT – Shares the same engine package as Red Bull Racing.",
  },
  {
    id: "sauber",
    name: "Stake F1 Team Kick Sauber (→ Audi 2026)",
    base: "Hinwil, Switzerland",
    color: "#52E252",
    engine: "Ferrari",
    tp: "Alessandro Alunni Bravi",
    founded: 1993,
    championships: "0",
    drivers2024: ["Valtteri Bottas", "Zhou Guanyu"],
    desc: "The Swiss privateer team formerly known as Alfa Romeo. Has been through many rebrandings. Will become the Audi factory team from 2026 — a massive deal. Currently rebuilding under new identity. Bottas and Zhou replaced by Nico Hülkenberg and a new lineup for 2025.",
    engineNote: "Ferrari-supplied (until 2025) → Audi from 2026. Audi is building their own F1 power unit for the 2026 regulation change, which Sauber will be the first to use.",
  },
];

const DRIVERS = [
  {
    id: "max",
    number: 1,
    name: "Max Verstappen",
    country: "🇳🇱 Netherlands",
    team: "Red Bull Racing",
    teamColor: "#3671C6",
    seasons: "2015–present",
    championships: 4,
    wins: "60+",
    poles: "40+",
    skill: 99,
    racecraft: 99,
    consistency: 97,
    media: 75,
    desc: "The best driver on the grid right now, arguably ever. Four-time world champion (2021–2024). Brutally fast on any circuit, incredible racecraft, terrifying in wheel-to-wheel battles. Notoriously blunt in interviews — doesn't play the media game, which some love, some don't.",
    mediaNote: "Polarising — his directness and dominance either bore you or impress you. Not interested in fashion or social media. The purist's champion.",
  },
  {
    id: "hamilton",
    number: 44,
    name: "Lewis Hamilton",
    country: "🇬🇧 United Kingdom",
    team: "Ferrari (from 2025)",
    teamColor: "#E8002D",
    seasons: "2007–present",
    championships: 7,
    wins: "103",
    poles: "104",
    skill: 97,
    racecraft: 96,
    consistency: 95,
    media: 99,
    desc: "The most decorated driver in F1 history. 7 world championships, 103 wins. Joined Ferrari in 2025 in a bombshell move. A cultural icon beyond motorsport — fashion, music, social activism. His battle with Verstappen in 2021 was one of the greatest seasons ever.",
    mediaNote: "Media royalty. Huge personality, social causes, fashion mogul. The face of F1 globally for a decade.",
  },
  {
    id: "leclerc",
    number: 16,
    name: "Charles Leclerc",
    country: "🇲🇨 Monaco",
    team: "Ferrari",
    teamColor: "#E8002D",
    seasons: "2018–present",
    championships: 0,
    wins: "8",
    poles: "24+",
    skill: 95,
    racecraft: 90,
    consistency: 86,
    media: 90,
    desc: "Ferrari's great hope. Blindingly fast in qualifying — possibly the best single lap on the grid. But the team's strategic failures have cost him dearly. Had a heartbreaking 2022 where a championship chance slipped away. Charming, likeable, huge personality.",
    mediaNote: "Massively popular. Genuine, funny, plays piano, engages with fans. One of F1's most marketable drivers.",
  },
  {
    id: "norris",
    number: 4,
    name: "Lando Norris",
    country: "🇬🇧 United Kingdom",
    team: "McLaren",
    teamColor: "#FF8000",
    seasons: "2019–present",
    championships: 0,
    wins: "4+",
    poles: "8+",
    skill: 92,
    racecraft: 91,
    consistency: 89,
    media: 97,
    desc: "The fan favourite of the new generation. Hilarious, self-deprecating, huge Twitch/gaming personality. Took time to turn raw speed into results — by 2024 he was a genuine title contender but couldn't match Verstappen. His time is coming.",
    mediaNote: "Social media king. Gaming streams, memes, genuine friendships with other drivers. Young fans adore him.",
  },
  {
    id: "russell",
    number: 63,
    name: "George Russell",
    country: "🇬🇧 United Kingdom",
    team: "Mercedes",
    teamColor: "#27F4D2",
    seasons: "2019–present",
    championships: 0,
    wins: "3+",
    poles: "5+",
    skill: 91,
    racecraft: 88,
    consistency: 92,
    media: 82,
    desc: "Known as 'Mr. Saturday' for his qualifying excellence. Replaced Hamilton at Mercedes in 2022. Seen as the future of the team. Technically precise, polished in media. Had a stunning debut 2022 season.",
    mediaNote: "Professional, diplomatic. Sometimes seen as too corporate but deeply respected. Director of the GPDA (drivers' association).",
  },
  {
    id: "alonso",
    number: 14,
    name: "Fernando Alonso",
    country: "🇪🇸 Spain",
    team: "Aston Martin",
    teamColor: "#229971",
    seasons: "2001–2018, 2021–present",
    championships: 2,
    wins: "32",
    poles: "22",
    skill: 95,
    racecraft: 97,
    consistency: 93,
    media: 85,
    desc: "Living legend. Two-time champion (2005–06). At 43, still fighting top teams in lesser machinery. Joined Aston Martin in 2023 and immediately challenged for podiums. Absolutely refuses to slow down. Known for sly, strategic racing and his famously spicy radio messages.",
    mediaNote: "'El Plan.' The internet loves his enigmatic personality and 'still I rise' energy. Active on social media for his age.",
  },
  {
    id: "sainz",
    number: 55,
    name: "Carlos Sainz",
    country: "🇪🇸 Spain",
    team: "Williams (from 2025)",
    teamColor: "#64C4FF",
    seasons: "2015–present",
    championships: 0,
    wins: "4+",
    poles: "6+",
    skill: 90,
    racecraft: 89,
    consistency: 93,
    media: 86,
    desc: "Smooth, consistent, underrated. Was Ferrari's most reliable scorer in 2023. Shockingly dropped by Ferrari in favour of Hamilton despite a brilliant season (including a win). Joined Williams for 2025 to lead their revival.",
    mediaNote: "Cool, likeable. Popular in Spain and across Europe. Handle @carlossainz on Insta — very active.",
  },
  {
    id: "perez",
    number: 11,
    name: "Sergio Perez",
    country: "🇲🇽 Mexico",
    team: "Red Bull Racing",
    teamColor: "#3671C6",
    seasons: "2011–2024",
    championships: 0,
    wins: "13",
    poles: "3",
    skill: 84,
    racecraft: 85,
    consistency: 78,
    media: 80,
    desc: "Beloved in Mexico — national hero. At his best can challenge at the very front. But his pace gap to Verstappen grew in 2024, leading to his exit at end of season. Known as 'Minister of Defence' for protecting teammates. Released by Red Bull after 2024.",
    mediaNote: "Passionate fanbase, especially in Mexico. The Interlagos and other Checo chants are iconic.",
  },
  {
    id: "piastri",
    number: 81,
    name: "Oscar Piastri",
    country: "🇦🇺 Australia",
    team: "McLaren",
    teamColor: "#FF8000",
    seasons: "2023–present",
    championships: 0,
    wins: "2+",
    poles: "3+",
    skill: 91,
    racecraft: 89,
    consistency: 90,
    media: 72,
    desc: "One of the most impressive rookies in recent memory. Calm, mature, devastatingly quick. Came through the Alpine junior program but controversially chose McLaren — a legal saga ensued. Won races in just his second season. His quiet confidence is extraordinary.",
    mediaNote: "Understated, dry humour. Lets his driving do the talking. The anti-Norris in personality but they're a great team.",
  },
  {
    id: "albon",
    number: 23,
    name: "Alexander Albon",
    country: "🇹🇭 Thailand",
    team: "Williams",
    teamColor: "#64C4FF",
    seasons: "2019–2020, 2022–present",
    championships: 0,
    wins: "0",
    poles: "0",
    skill: 86,
    racecraft: 85,
    consistency: 87,
    media: 83,
    desc: "Hugely popular and widely respected for extracting maximum results from a midfield/backmarker car. Was dropped by Red Bull in 2021, spent a year in DTM, then came back to Williams and rebuilt his career brilliantly. Thailand loves him.",
    mediaNote: "Genuine, funny, great content creator. Huge Southeast Asian fanbase. Married to F2 driver Lily He.",
  },
  {
    id: "gasly",
    number: 10,
    name: "Pierre Gasly",
    country: "🇫🇷 France",
    team: "Alpine",
    teamColor: "#0093CC",
    seasons: "2017–present",
    championships: 0,
    wins: "1",
    poles: "1",
    skill: 85,
    racecraft: 83,
    consistency: 84,
    media: 80,
    desc: "Emotional driver who's had a rollercoaster career. Was promoted to Red Bull, demoted, then won a stunning race at Monza 2020 with AlphaTauri. Moved to Alpine in 2023. Has shown he can deliver big results in right conditions.",
    mediaNote: "Expressive, emotional, loved by French fans. His Monza win celebration is one of F1's most emotional moments.",
  },
  {
    id: "hulkenberg",
    number: 27,
    name: "Nico Hülkenberg",
    country: "🇩🇪 Germany",
    team: "Haas (→ Audi/Sauber 2025)",
    teamColor: "#B6BABD",
    seasons: "2010–2019, 2023–present",
    championships: 0,
    wins: "0",
    poles: "1",
    skill: 86,
    racecraft: 85,
    consistency: 87,
    media: 75,
    desc: "Nicknamed 'The Hulk'. Remarkable story — was out of F1 for 3 years, came back as a substitute, drove brilliantly enough to earn a full-time seat again. Known for never having stood on the podium (a curious record). Joins Audi/Sauber in 2025.",
    mediaNote: "Dry German wit. Respected by peers. The comeback story resonated strongly.",
  },
  {
    id: "tsunoda",
    number: 22,
    name: "Yuki Tsunoda",
    country: "🇯🇵 Japan",
    team: "RB (VCARB)",
    teamColor: "#6692FF",
    seasons: "2021–present",
    championships: 0,
    wins: "0",
    poles: "0",
    skill: 84,
    racecraft: 83,
    consistency: 80,
    media: 82,
    desc: "Known for hilariously intense radio messages. Quick when it comes together. Has matured a lot since his fiery debut year. Japan's only current F1 driver. Was overlooked for the Red Bull promotion in 2025 over Lawson — controversial decision.",
    mediaNote: "Viral radio moments. Japanese fans adore him. YouTube clips of his on-board shouting are legendary.",
  },
  {
    id: "bottas",
    number: 77,
    name: "Valtteri Bottas",
    country: "🇫🇮 Finland",
    team: "Sauber (→ departed 2025)",
    teamColor: "#52E252",
    seasons: "2013–2024",
    championships: 0,
    wins: "10",
    poles: "20",
    skill: 85,
    racecraft: 83,
    consistency: 85,
    media: 78,
    desc: "Was Hamilton's Mercedes teammate 2017–2021, often fighting for the championship before falling away. Known for his very Finnish, self-deprecating humour. Joined Alfa/Sauber in 2022. Often joked about being a 'support character' to Hamilton.",
    mediaNote: "Famous for witty and blunt social media posts. 'To whom it may concern' type of guy. Beloved by fans for authenticity.",
  },
  {
    id: "ocon",
    number: 31,
    name: "Esteban Ocon",
    country: "🇫🇷 France",
    team: "Haas (from 2025, left Alpine)",
    teamColor: "#B6BABD",
    seasons: "2016–present",
    championships: 0,
    wins: "1",
    poles: "0",
    skill: 83,
    racecraft: 80,
    consistency: 83,
    media: 72,
    desc: "Won a chaotic Hungarian GP in 2021. A solid, consistent midfield operator but hasn't shown the extraordinary pace to break into the top tier. Left Alpine after 2024 for Haas. Known for a legendary feud with Alonso during their time as teammates.",
    mediaNote: "Relatively low media profile. The Alonso feud era was entertaining for F1 fans.",
  },
  {
    id: "magnussen",
    number: 20,
    name: "Kevin Magnussen",
    country: "🇩🇰 Denmark",
    team: "Haas",
    teamColor: "#B6BABD",
    seasons: "2014, 2017–present",
    championships: 0,
    wins: "0",
    poles: "1",
    skill: 82,
    racecraft: 84,
    consistency: 79,
    media: 74,
    desc: "The gravel-voiced warrior. Known for being one of the most aggressive drivers on the grid — loves a battle. Famous for telling Alonso to 'suck his balls' in his first race back. Got a stunning pole in Brazil 2022. No nonsense whatsoever.",
    mediaNote: "Cult following for his fearless, don't-care attitude. Drive to Survive fans love him.",
  },
];

const DRIVER_HISTORY = [
  {
    year: "2018–2019",
    title: "The Vettel vs Hamilton Era",
    context: "Ferrari vs Mercedes battle. Vettel led 2018 before cracking under pressure. Key changes in this period.",
    changes: [
      { team: "Red Bull", out: "Daniel Ricciardo", in: "Pierre Gasly", tag: "tag-reason", reason: "Ricciardo shocked everyone by leaving Red Bull for Renault in a massive money deal. He wanted a change of scenery and feared Verstappen's dominance." },
      { team: "Williams", out: "Felipe Massa (retired)", in: "Sergey Sirotkin", tag: "tag-reason", reason: "Williams in decline, bringing in pay-drivers as budget collapsed." },
      { team: "Red Bull (2019)", out: "Pierre Gasly", in: "Alex Albon (mid-season)", tag: "tag-reason", reason: "Gasly catastrophically underperformed next to Verstappen. Demoted mid-season, replaced by Albon. One of F1's most brutal swaps." },
    ]
  },
  {
    year: "2020",
    title: "Dominance & Disruption",
    context: "COVID-shortened season. Hamilton won his record-equalling 7th title. Ricciardo announced he'd join McLaren.",
    changes: [
      { team: "Red Bull", out: "Alex Albon (end of season)", in: "Sergio Perez 2021", tag: "tag-reason", reason: "Albon couldn't close the gap to Verstappen. Red Bull felt they needed a more experienced #2. Albon was devastated but came back stronger at Williams." },
      { team: "Renault/Alpine", out: "Nico Hülkenberg (as sub)", in: "Esteban Ocon", tag: "tag-reason", reason: "Renault signed Alonso for 2021, with Ocon as teammate. Big reset for the team." },
    ]
  },
  {
    year: "2021",
    title: "The Greatest Season Ever?",
    context: "Verstappen vs Hamilton went to the final lap of the final race. Controversial ending in Abu Dhabi. Bottas left Mercedes for Alfa Romeo.",
    changes: [
      { team: "Mercedes", out: "Valtteri Bottas", in: "George Russell (2022)", tag: "tag-reason", reason: "After 5 seasons as Hamilton's wingman, Mercedes felt it was time. Russell had proven himself at Williams. Bottas was moved to Alfa Romeo — a dignified exit for a loyal servant." },
      { team: "McLaren", out: "Carlos Sainz", in: "Daniel Ricciardo", tag: "tag-reason", reason: "Sainz went to Ferrari (replacing Vettel!). Ricciardo joined McLaren hoping to revive his career. It didn't work — pace never came." },
    ]
  },
  {
    year: "2022",
    title: "New Era, New Rules",
    context: "Biggest regulation change in decades (ground effect cars). Red Bull and Ferrari surged. Mercedes struggled badly. Alonso returned from his Indy/Le Mans sabbatical.",
    changes: [
      { team: "Ferrari", out: "Sebastian Vettel (retired)", in: "Carlos Sainz (already signed)", tag: "tag-reason", reason: "Vettel retired — citing environmental concerns and wanting time with family. A 4x champion bowing out gracefully." },
      { team: "Alpine", out: "Esteban Ocon (kept)", in: "Fernando Alonso (joined)", tag: "tag-reason", reason: "Alonso returned to Renault/Alpine — the team he won both titles with — looking for one more shot. A fairytale reunion, though it ended when Aston Martin came calling." },
      { team: "McLaren", out: "Daniel Ricciardo", in: "Oscar Piastri (2023)", tag: "tag-reason", reason: "Ricciardo left McLaren after failing to match Norris's pace. The car swap that Ricciardo hoped would reignite him didn't work. Oscar Piastri controversially broke his Alpine contract to join McLaren — a legal saga ensued." },
    ]
  },
  {
    year: "2023",
    title: "The Verstappen Steamroller",
    context: "Red Bull won 21 of 22 races. Verstappen broke almost every record. Alonso stunned at Aston Martin early in the season. F1's biggest off-season shake-up loomed.",
    changes: [
      { team: "Aston Martin", out: "Sebastian Vettel (2022 exit)", in: "Fernando Alonso", tag: "tag-reason", reason: "Alonso left Alpine after they had given away his seat too hastily to Piastri. Aston Martin swooped — brilliant move. Alonso immediately got 8 podiums." },
      { team: "AlphaTauri/RB", out: "Pierre Gasly", in: "Nyck de Vries (briefly) → Ricciardo", tag: "tag-reason", reason: "De Vries had a nightmare debut season and was dropped after just 10 races. Ricciardo came back hoping to force his way back to Red Bull. Couldn't match Tsunoda." },
    ]
  },
  {
    year: "2024",
    title: "The Shockwaves",
    context: "Verstappen won his 4th title but was pushed harder. McLaren emerged as genuine rivals. Then the off-season sent shockwaves through F1.",
    changes: [
      { team: "RB/VCARB", out: "Daniel Ricciardo", in: "Liam Lawson (mid-season)", tag: "tag-reason", reason: "Ricciardo couldn't match Tsunoda. After years of trying to get back to the top, Red Bull finally moved on. Hugely emotional for a fan favourite." },
      { team: "Ferrari", out: "Carlos Sainz", in: "Lewis Hamilton (2025)", tag: "tag-reason", reason: "THE biggest transfer in F1 history. Ferrari announced Hamilton for 2025 — despite Sainz having a brilliant 2024 season. Sainz was understandably devastated. Hamilton seeking the 8th championship with Ferrari." },
      { team: "Red Bull", out: "Sergio Perez", in: "TBA 2025", tag: "tag-reason", reason: "Perez released at end of 2024 after pace dipped too far behind Verstappen. A respectful farewell to a driver who gave Red Bull crucial points in title fights." },
      { team: "Sauber", out: "Bottas & Zhou", in: "Hülkenberg + Bortoleto (2025)", tag: "tag-reason", reason: "Full reset as the team prepares to become Audi's works entry from 2026. New era, new drivers." },
    ]
  },
];

const CHAMPIONSHIP_HISTORY = [
  { year: 2018, driver: "Lewis Hamilton 🇬🇧", team: "Mercedes", team2: "Mercedes" },
  { year: 2019, driver: "Lewis Hamilton 🇬🇧", team: "Mercedes", team2: "Mercedes" },
  { year: 2020, driver: "Lewis Hamilton 🇬🇧", team: "Mercedes", team2: "Mercedes" },
  { year: 2021, driver: "Max Verstappen 🇳🇱", team: "Red Bull Racing", team2: "Mercedes" },
  { year: 2022, driver: "Max Verstappen 🇳🇱", team: "Red Bull Racing", team2: "Red Bull Racing" },
  { year: 2023, driver: "Max Verstappen 🇳🇱", team: "Red Bull Racing", team2: "Red Bull Racing" },
  { year: 2024, driver: "Max Verstappen 🇳🇱", team: "Red Bull Racing", team2: "McLaren" },
];

const POINTS_DATA = [
  { pos: 1, points: 25, bonus: "+1 for fastest lap (if in top 10)" },
  { pos: 2, points: 18, bonus: "" },
  { pos: 3, points: 15, bonus: "" },
  { pos: 4, points: 12, bonus: "" },
  { pos: 5, points: 10, bonus: "" },
  { pos: 6, points: 8, bonus: "" },
  { pos: 7, points: 6, bonus: "" },
  { pos: 8, points: 4, bonus: "" },
  { pos: 9, points: 2, bonus: "" },
  { pos: 10, points: 1, bonus: "" },
];

// ─── COMPONENTS ────────────────────────────────────────────────────────────────

function RatingBar({ label, value }) {
  return (
    <div className="rating-bar-wrap">
      <div className="rating-label">
        <span>{label}</span>
        <span style={{ color: "#e10600" }}>{value}/100</span>
      </div>
      <div className="rating-bar">
        <div className="rating-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function DriverCard({ driver }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="driver-card">
      <div className="driver-header">
        <div className="driver-number">{driver.number}</div>
        <div>
          <div className="driver-name">{driver.name}</div>
          <div className="driver-country">{driver.country}</div>
        </div>
        <div className="driver-team-badge" style={{ background: driver.teamColor + "22", color: driver.teamColor, border: `1px solid ${driver.teamColor}44` }}>
          {driver.team.split(" ").slice(0, 2).join(" ")}
        </div>
      </div>
      <div className="driver-body">
        <div className="driver-stat-row">
          <div className="driver-stat">
            <div className="driver-stat-val">⭐ {driver.championships}</div>
            <div className="driver-stat-lbl">Titles</div>
          </div>
          <div className="driver-stat">
            <div className="driver-stat-val">{driver.wins}</div>
            <div className="driver-stat-lbl">Wins</div>
          </div>
          <div className="driver-stat">
            <div className="driver-stat-val">{driver.poles}</div>
            <div className="driver-stat-lbl">Poles</div>
          </div>
        </div>
        <p className="driver-desc">{driver.desc}</p>
        {expanded && (
          <>
            <RatingBar label="Raw Speed" value={driver.skill} />
            <RatingBar label="Racecraft" value={driver.racecraft} />
            <RatingBar label="Consistency" value={driver.consistency} />
            <RatingBar label="Media Appeal" value={driver.media} />
            <div className="driver-media">🎙️ {driver.mediaNote}</div>
            <div style={{ fontSize: 12, color: "#555", marginTop: 8 }}>Active: {driver.seasons}</div>
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
        <div>
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
        <p className="team-detail" style={{ marginTop: 10 }}>{team.desc}</p>
        {expanded && (
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 12, color: "#e10600", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6, fontFamily: "Orbitron" }}>Engine Notes</div>
            <p className="team-detail">{team.engineNote}</p>
            <div style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
              <strong style={{ color: "#aaa" }}>2024 Drivers:</strong> {team.drivers2024.join(" · ")}
            </div>
          </div>
        )}
        <button className="expand-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? "▲ Less" : "▼ Engine & Drivers"}
        </button>
      </div>
    </div>
  );
}

// ─── SECTIONS ──────────────────────────────────────────────────────────────────

function HowItWorks() {
  return (
    <div>
      <div className="section-title">How <span>F1</span> Works</div>
      <div className="section-line" />
      <div className="how-grid">
        {[
          { title: "What is F1?", text: "Formula 1 is the pinnacle of motorsport — the fastest, most technologically advanced racing series on Earth. 10 teams, 20 drivers, ~24 races a year across the globe. Each team builds their own car around a common set of technical regulations." },
          { title: "The Race Weekend", text: "Thursday: Media day. Friday: Two practice sessions (FP1 & FP2). Saturday: FP3 then Qualifying (Q1→Q2→Q3). Sunday: The Race. Sprint weekends replace some practice with a mini-race Saturday." },
          { title: "Qualifying", text: "Three knockout rounds. Q1 eliminates the 5 slowest. Q2 eliminates 5 more. Q3 (the top 10) fights for pole position. Single flying laps, intense pressure. Pole gives a big track position advantage." },
          { title: "The Race", text: "Typically 305km (190 miles). Cars must use at least 2 different tyre compounds. Strategy — when to pit, which tyres — is often as important as raw speed. Safety cars, rain, crashes all shake things up." },
          { title: "Tyres", text: "Pirelli supply all teams. Soft (red) = fastest but least durable. Medium (yellow). Hard (white) = slowest but lasts longest. Intermediate (green) and Full Wet (blue) for rain. Tyre choice is central to race strategy." },
          { title: "DRS", text: "Drag Reduction System. An opening in the rear wing that reduces drag on straights. Only usable in designated zones when within 1 second of the car ahead. Creates overtaking opportunities. Controversial but keeps racing exciting." },
          { title: "Constructors vs Drivers", text: "Two championships run simultaneously. The Drivers' Championship rewards the fastest driver. The Constructors' Championship rewards the team — both drivers' points combined. Winning both is the ultimate achievement." },
          { title: "Safety Car & Red Flag", text: "Virtual Safety Car (VSC) slows all cars electronically. Safety Car (SC) groups the pack behind a pace car. Red Flag stops the race entirely (restart from pit lane or grid). All are drama triggers." },
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
        <div>
          <table className="points-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Points</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {POINTS_DATA.map(row => (
                <tr key={row.pos}>
                  <td>
                    <span className={`pos-badge${row.pos === 1 ? " p1" : row.pos === 2 ? " p2" : row.pos === 3 ? " p3" : ""}`}>
                      {row.pos}
                    </span>
                  </td>
                  <td style={{ fontFamily: "Orbitron", fontWeight: 700, color: row.pos <= 3 ? "#e10600" : "#ccc" }}>{row.points}</td>
                  <td style={{ fontSize: 12, color: "#555" }}>{row.bonus || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="card" style={{ marginTop: 16 }}>
            <div style={{ fontSize: 13, color: "#999", lineHeight: 1.7 }}>
              <strong style={{ color: "#e10600" }}>Sprint races</strong> award half points (8 down to 1 for top 8). Sprint Qualifying determines the Sprint grid separately from the main race grid.
            </div>
          </div>
        </div>
        <div>
          <div className="section-title" style={{ fontSize: 18, marginBottom: 8 }}>Championship <span>History</span></div>
          <div className="section-line" />
          <table className="champ-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Driver Champion</th>
                <th>Constructors'</th>
              </tr>
            </thead>
            <tbody>
              {CHAMPIONSHIP_HISTORY.map(row => (
                <tr key={row.year}>
                  <td style={{ fontFamily: "Orbitron", fontWeight: 700, color: "#e10600" }}>{row.year}</td>
                  <td className={row.driver.includes("Verstappen") ? "gold" : "silver"}>{row.driver}</td>
                  <td style={{ fontSize: 12, color: "#888" }}>{row.team2}</td>
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
  const teams = ["All", ...Array.from(new Set(DRIVERS.map(d => d.team.split(" ")[0])))];
  const filtered = DRIVERS.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.team.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || d.team.includes(filter);
    return matchSearch && matchFilter;
  });
  return (
    <div>
      <div className="section-title">Current <span>Drivers</span></div>
      <div className="section-line" />
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input className="search-input" placeholder="Search drivers or teams..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="filter-row">
        {["All", "Red Bull", "Mercedes", "Ferrari", "McLaren", "Aston", "Alpine", "Williams", "Haas", "RB", "Sauber"].map(f => (
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
  const [search, setSearch] = useState("");
  const filtered = TEAMS.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.engine.toLowerCase().includes(search.toLowerCase()) ||
    t.tp.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <div className="section-title">The <span>Teams</span></div>
      <div className="section-line" />
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input className="search-input" placeholder="Search teams, engine, team principal..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="card-grid">
        {filtered.map(t => <TeamCard key={t.id} team={t} />)}
      </div>
    </div>
  );
}

function HistorySection() {
  return (
    <div>
      <div className="section-title">Driver <span>Changes</span> 2018–2024</div>
      <div className="section-line" />
      <div style={{ marginBottom: 16, fontSize: 14, color: "#666", lineHeight: 1.7 }}>
        F1 seats are precious — there are only 20 on the grid. Drivers are dropped, promoted, replaced and shuffled constantly. Here's a chronological look at the most significant moves since 2018 and why they happened.
      </div>
      <div className="timeline">
        {DRIVER_HISTORY.map(era => (
          <div className="timeline-item" key={era.year}>
            <div className="timeline-dot" />
            <div className="timeline-year">{era.year}</div>
            <div className="timeline-content">
              <strong style={{ color: "#fff", fontSize: 15 }}>{era.title}</strong>
              <p style={{ marginTop: 6 }}>{era.context}</p>
              <div style={{ marginTop: 12 }}>
                {era.changes.map((change, i) => (
                  <div className="timeline-change" key={i}>
                    <div style={{ marginBottom: 6, fontWeight: 700, color: "#fff", fontSize: 13 }}>{change.team}</div>
                    <span className="change-tag tag-out">OUT: {change.out}</span>
                    <span className="change-tag tag-in">IN: {change.in}</span>
                    <br />
                    <span className="change-tag tag-reason">WHY</span>
                    <span style={{ fontSize: 12, color: "#999" }}>{change.reason}</span>
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

const SECTIONS = [
  { id: "how", label: "🏁 How It Works" },
  { id: "points", label: "📊 Points" },
  { id: "drivers", label: "🏎️ Drivers" },
  { id: "teams", label: "🔧 Teams" },
  { id: "history", label: "📅 Driver Changes" },
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
            <div className="hero-sub">The Complete Beginner's Guide · 2018 – 2025</div>
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
          </main>
        </div>
      </div>
    </>
  );
}