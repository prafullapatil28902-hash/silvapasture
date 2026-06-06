import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const pub = join(here, "..", "public");

async function dataUri(rel, mime = "image/webp") {
  const buf = await readFile(join(pub, rel));
  return `data:${mime};base64,${buf.toString("base64")}`;
}

const img = {
  product: await dataUri("product-hero.webp"),
  poster: await dataUri("poster.webp"),
  lifestyle: await dataUri("lifestyle.webp"),
  ourStory: await dataUri("journal/our-story.webp"),
  bilona: await dataUri("journal/bilona.webp"),
  calf: await dataUri("journal/calf.webp"),
  forest: await dataUri("journal/forest-graze.webp"),
  fullMoon: await dataUri("journal/full-moon.webp"),
};

const journalCards = [
  { tag: "Our Story", title: "Not just ghee. An ecosystem in a jar.", read: "8 min", src: img.ourStory, feature: true },
  { tag: "The Craft", title: "The patience the bilona demands", read: "6 min", src: img.bilona },
  { tag: "Indigenous Cattle", title: "The calf-first philosophy", read: "5 min", src: img.calf },
  { tag: "Forest Restoration", title: "Why forest grazing changes everything", read: "7 min", src: img.forest },
  { tag: "Slow Living", title: "Churned by the rhythm of the full moon", read: "4 min", src: img.fullMoon },
];

const ecosystem = [
  ["Forest", "Protected canopy and undergrowth — the source of every nutrient that follows."],
  ["Grassland", "Wild, unsprayed pasture where over forty native grasses and herbs grow."],
  ["Indigenous Cows", "Native, free-grazing breeds that thrive on the land rather than against it."],
  ["Villages", "Tribal families who steward the herd and hold the knowledge of the craft."],
  ["Bilona Craft", "Hand-churned, bidirectional bilona — slow, unhurried, never mechanised."],
  ["Ghee", "What remains when the whole ecosystem is kept intact. The artefact."],
];

const journey = [
  ["Forest", "It begins where the canopy meets the light."],
  ["Cow", "A native herd grazes the wild pasture, unhurried."],
  ["Milk", "Drawn at dawn, only what the calf can spare."],
  ["Curd", "Set overnight with the previous day's culture."],
  ["Butter", "Churned by hand until the butter gathers."],
  ["Bilona", "The wooden churn turns both ways. Never rushed."],
  ["Ghee", "What remains when nothing was ever forced."],
];

const impact = [
  [1240, "Acres of forest preserved", "Protected canopy, never cleared"],
  [86, "Tribal families supported", "Stewards, not suppliers"],
  [312, "Indigenous cows protected", "Native breeds, free-grazing"],
  [47, "Native species returning", "Biodiversity index, rising"],
];

const ecoNodes = ecosystem
  .map(
    (n, i) => `
      <button class="eco-node" data-i="${i}" aria-label="${n[0]}">
        <span class="dot">${i + 1}</span>
        <span class="lbl">${n[0]}</span>
      </button>`
  )
  .join("");

const ecoDescs = ecosystem
  .map((n, i) => `<p class="eco-desc${i === 0 ? " on" : ""}" data-i="${i}">${n[1]}</p>`)
  .join("");

const journeyStages = journey
  .map(
    (s, i) => `
      <div class="stage reveal">
        <span class="stage-num">${String(i + 1).padStart(2, "0")} / 0${journey.length}</span>
        <h3>${s[0]}</h3>
        <p>${s[1]}</p>
      </div>`
  )
  .join("");

const impactCards = impact
  .map(
    (m) => `
      <div class="impact-card reveal">
        <span class="count" data-to="${m[0]}">0</span>
        <p class="impact-label">${m[1]}</p>
        <p class="impact-sub">${m[2]}</p>
      </div>`
  )
  .join("");

const journalGrid = journalCards
  .map(
    (p) => `
      <a class="jcard reveal${p.feature ? " feature" : ""}" href="#">
        <div class="jcard-img" style="background-image:url('${p.src}')">
          <span class="jtag">${p.tag}</span>
        </div>
        <div class="jcard-foot">
          <h3>${p.title}</h3>
          <span class="jread">${p.read}</span>
        </div>
      </a>`
  )
  .join("");

const benefits = [
  ["Limited Yield", "A guaranteed allocation from each season's small, finite production."],
  ["Early Access", "First reservation rights before any jar is offered publicly."],
  ["Private Releases", "Rare single-village and single-season ghee, members only."],
  ["Impact Reports", "A private annual account of the forest, herd and families you sustain."],
]
  .map(
    (b, i) => `
      <div class="benefit reveal">
        <span class="bnum">0${i + 1}</span>
        <h3>${b[0]}</h3>
        <p>${b[1]}</p>
      </div>`
  )
  .join("");

// Real, scannable QR (forest on transparent) for batch SP-0042
const batchQrSvg = await readFile(join(pub, "qr", "batch-SP-0042.svg"), "utf8");

const herdCards = [
  { name: "Kamadhenu", meta: "Gir · Athgarh", tagline: "The matriarch of the north meadow.", src: img.ourStory },
  { name: "Surabhi", meta: "Sahiwal · Koraput", tagline: "Churned by the rhythm of the full moon.", src: img.fullMoon },
  { name: "Nandini", meta: "Tharparkar · Athgarh", tagline: "The gentle keeper of the banyan grove.", src: img.calf },
]
  .map(
    (c) => `
      <div class="jcard reveal">
        <div class="jcard-img" style="aspect-ratio:4/3;background-image:url('${c.src}')"><span class="jtag">${c.meta}</span></div>
        <div style="padding-top:18px">
          <h3 style="font-family:'Cormorant Garamond',serif;font-size:1.6rem;color:var(--ivory)">${c.name}</h3>
          <p style="font-family:'Cormorant Garamond',serif;font-style:italic;color:rgba(247,242,232,.65);margin-top:4px">${c.tagline}</p>
        </div>
      </div>`
  )
  .join("");

const arrivalLayers = [
  ["01", "The Outer Case", "A matte, forest-dark box, foil-stamped with the floral seal."],
  ["02", "Forest-Paper Wrap", "Seed-embedded paper you can plant — it returns to the forest."],
  ["03", "The Wax Seal", "An antique-gold wax seal, broken only once, by you."],
  ["04", "The Jar", "The matte jar, cradled in a bed of natural fibre."],
]
  .map(
    (l) => `
      <div class="benefit reveal">
        <span class="bnum">${l[0]}</span>
        <h3>${l[1]}</h3>
        <p>${l[2]}</p>
      </div>`
  )
  .join("");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Silvapasture — Preserved, not produced</title>
<meta name="description" content="Luxury born from living ecosystems. Bilona ghee that preserves a disappearing world of forests, indigenous cows and tribal villages." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
<style>
  :root{--forest:#0F2B20;--forest-deep:#0A1D15;--ivory:#F7F2E8;--ivory-dim:#EDE6D6;--gold:#C5A46D;--gold-bright:#E2C485;--charcoal:#1A1A1A;--obsidian:#0B0B09;--silk:cubic-bezier(.16,1,.3,1);}
  *{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased;}
  html{scroll-behavior:smooth;}
  body{font-family:'Inter',system-ui,sans-serif;color:var(--charcoal);background:var(--ivory);overflow-x:hidden;line-height:1.6;}
  .serif{font-family:'Cormorant Garamond',Georgia,serif;font-weight:400;}
  ::selection{background:var(--gold);color:var(--forest);}
  a{color:inherit;text-decoration:none;}
  .wrap{max-width:1200px;margin:0 auto;padding:0 24px;}
  .eyebrow{font-size:.72rem;text-transform:uppercase;letter-spacing:.22em;font-weight:600;color:var(--gold);display:inline-flex;align-items:center;gap:12px;}
  .eyebrow::before{content:"";width:32px;height:1px;background:rgba(197,164,109,.6);}
  .eyebrow.center{justify-content:center;}
  section{position:relative;}
  .pad{padding:clamp(80px,12vw,180px) 0;}

  /* reveal */
  .reveal{opacity:0;transform:translateY(40px);transition:opacity 1s var(--silk),transform 1s var(--silk);}
  .reveal.in{opacity:1;transform:none;}

  /* nav */
  header{position:fixed;top:0;left:0;right:0;z-index:50;transition:all .6s var(--silk);}
  header.solid{background:rgba(247,242,232,.92);backdrop-filter:blur(10px);border-bottom:1px solid rgba(26,26,26,.08);}
  nav{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;max-width:1200px;margin:0 auto;}
  .brand{font-family:'Cormorant Garamond',serif;letter-spacing:.3em;font-size:1.1rem;color:var(--ivory);transition:color .6s;}
  header.solid .brand{color:var(--forest);}
  .navlinks{display:flex;gap:34px;list-style:none;font-size:.72rem;text-transform:uppercase;letter-spacing:.18em;color:rgba(247,242,232,.85);}
  header.solid .navlinks{color:rgba(26,26,26,.8);}
  .navlinks a:hover{color:var(--gold);}
  @media(max-width:860px){.navlinks{display:none;}}

  /* hero */
  .hero{height:100vh;min-height:640px;display:flex;align-items:center;justify-content:center;text-align:center;color:var(--ivory);overflow:hidden;background:var(--obsidian);}
  .hero-bg{position:absolute;inset:0;background:radial-gradient(120% 80% at 70% 10%,rgba(197,164,109,.22),transparent 55%),radial-gradient(140% 120% at 20% 100%,#0a1d15 0%,#0f2b20 45%,#143a2b 100%);animation:drift 26s ease-in-out infinite;}
  .hero-mist{position:absolute;inset:-20%;background:radial-gradient(60% 40% at 30% 70%,rgba(247,242,232,.14),transparent 60%),radial-gradient(50% 35% at 75% 80%,rgba(247,242,232,.1),transparent 60%);filter:blur(22px);animation:drift 34s ease-in-out infinite reverse;}
  .hero-trees{position:absolute;bottom:0;left:0;right:0;height:42%;}
  @keyframes drift{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(-3%,1%,0)}}
  .hero-inner{position:relative;z-index:2;padding:0 24px;max-width:1000px;}
  .hero h1{font-size:clamp(2.6rem,7vw,6.6rem);font-weight:300;line-height:1.02;margin-top:28px;text-shadow:0 2px 30px rgba(0,0,0,.5);}
  .hero h1 em{font-style:italic;color:var(--gold-bright);}
  .hero-lines{margin-top:36px;display:flex;flex-wrap:wrap;gap:4px 12px;justify-content:center;font-size:1.1rem;color:rgba(247,242,232,.85);}
  .hero-lines span{font-family:'Cormorant Garamond',serif;font-style:italic;}
  .hero-tag{font-family:'Cormorant Garamond',serif;margin-top:10px;font-size:1.25rem;color:rgba(247,242,232,.9);}
  .cta-row{margin-top:44px;display:flex;gap:18px;justify-content:center;flex-wrap:wrap;}
  .btn{display:inline-block;padding:16px 32px;font-size:.78rem;text-transform:uppercase;letter-spacing:.18em;transition:all .5s var(--silk);}
  .btn-ghost{border:1px solid rgba(197,164,109,.5);color:var(--ivory);}
  .btn-ghost:hover{border-color:var(--gold);background:rgba(197,164,109,.12);}
  .btn-solid{background:var(--ivory);color:var(--forest);}
  .btn-solid:hover{background:var(--gold);}
  .btn-text{color:rgba(247,242,232,.85);}
  .btn-text:hover{color:var(--ivory);}
  .scrollcue{position:absolute;bottom:30px;left:50%;transform:translateX(-50%);z-index:2;color:rgba(247,242,232,.6);font-size:.62rem;letter-spacing:.3em;text-transform:uppercase;}
  .scrollcue span{display:block;width:1px;height:40px;background:rgba(247,242,232,.4);margin:12px auto 0;}

  /* disappearing */
  .split{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
  @media(max-width:860px){.split{grid-template-columns:1fr;gap:40px;}}
  .split-media{aspect-ratio:4/5;background:linear-gradient(to bottom,#1e4d36,#0f2b20);position:relative;overflow:hidden;}
  .split-media .lbl{position:absolute;bottom:24px;left:24px;font-size:.7rem;text-transform:uppercase;letter-spacing:.2em;color:rgba(247,242,232,.75);}
  h2.big{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(2rem,4vw,3.4rem);line-height:1.15;color:var(--forest);}
  .lead{margin-top:28px;font-size:1.1rem;color:rgba(26,26,26,.75);max-width:60ch;}
  blockquote.pull{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.5rem;color:var(--forest);border-left:1px solid var(--gold);padding-left:24px;margin-top:40px;line-height:1.4;}

  /* ecosystem (dark) */
  .dark{background:var(--forest);color:var(--ivory);}
  .obsidian{background:var(--obsidian);color:var(--ivory);}
  .center{text-align:center;}
  .eco-row{display:flex;justify-content:space-between;gap:12px;margin-top:70px;position:relative;flex-wrap:wrap;}
  .eco-row::before{content:"";position:absolute;top:19px;left:5%;right:5%;height:1px;background:rgba(197,164,109,.4);}
  @media(max-width:760px){.eco-row::before{display:none;}.eco-row{justify-content:center;}}
  .eco-node{background:none;border:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:14px;flex:1;min-width:90px;}
  .eco-node .dot{width:40px;height:40px;border-radius:50%;border:1px solid rgba(197,164,109,.5);display:grid;place-items:center;color:var(--gold);font-size:.8rem;background:var(--forest);transition:all .5s var(--silk);position:relative;z-index:1;}
  .eco-node .lbl{font-family:'Cormorant Garamond',serif;font-size:1.1rem;color:rgba(247,242,232,.8);transition:color .5s;}
  .eco-node.on .dot,.eco-node:hover .dot{background:var(--gold);color:var(--forest);border-color:var(--gold);}
  .eco-node.on .lbl{color:var(--gold);}
  .eco-descs{margin-top:60px;min-height:90px;text-align:center;}
  .eco-desc{display:none;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.5rem;color:rgba(247,242,232,.9);max-width:620px;margin:0 auto;}
  .eco-desc.on{display:block;}

  /* journey */
  .journey-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:2px;margin-top:60px;background:rgba(247,242,232,.08);}
  .stage{background:var(--forest-deep);padding:48px 28px;}
  .stage-num{font-size:.7rem;letter-spacing:.3em;color:rgba(247,242,232,.5);text-transform:uppercase;}
  .stage h3{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:2.4rem;margin:14px 0 12px;color:var(--gold-bright);}
  .stage p{font-family:'Cormorant Garamond',serif;font-style:italic;color:rgba(247,242,232,.8);}

  /* quote band */
  .quote-band{min-height:70vh;display:flex;align-items:center;justify-content:center;text-align:center;color:var(--ivory);position:relative;overflow:hidden;}
  .quote-band .bg{position:absolute;inset:0;background-size:cover;background-position:center;transform:scale(1.05);}
  .quote-band .ov{position:absolute;inset:0;background:rgba(11,11,9,.62);}
  .quote-band blockquote{position:relative;z-index:2;max-width:880px;padding:0 24px;font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;font-size:clamp(1.8rem,4.5vw,3.6rem);line-height:1.15;}
  .quote-band cite{display:block;margin-top:28px;font-style:normal;font-family:'Inter';font-size:.7rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);}

  /* impact */
  .impact-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1px;margin-top:70px;background:rgba(26,26,26,.1);border:1px solid rgba(26,26,26,.1);}
  .impact-card{background:var(--ivory);padding:40px 32px;}
  .count{font-family:'Cormorant Garamond',serif;font-size:4.5rem;font-weight:300;color:var(--gold);line-height:1;}
  .impact-label{font-family:'Cormorant Garamond',serif;font-size:1.3rem;color:var(--forest);margin-top:32px;}
  .impact-sub{font-size:.85rem;color:rgba(26,26,26,.55);margin-top:6px;}

  /* product */
  .product-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
  @media(max-width:860px){.product-grid{grid-template-columns:1fr;gap:40px;}}
  .product-img{aspect-ratio:5/4;background-size:cover;background-position:center;border-radius:2px;box-shadow:0 40px 120px -30px rgba(0,0,0,.9);outline:1px solid rgba(197,164,109,.2);animation:floaty 5s ease-in-out infinite;}
  @keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  .product h2{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(2.4rem,5vw,4.2rem);line-height:1.05;margin-top:24px;}
  .product h2 em{font-style:italic;color:var(--gold-bright);}
  .feat{margin-top:30px;display:grid;grid-template-columns:1fr 1fr;gap:10px 24px;list-style:none;font-size:.9rem;color:rgba(247,242,232,.72);}
  .feat li::before{content:"";display:inline-block;width:5px;height:5px;border-radius:50%;background:var(--gold);margin-right:10px;vertical-align:middle;}
  .price-row{margin-top:40px;display:flex;gap:40px;align-items:flex-end;flex-wrap:wrap;}
  .price{font-family:'Cormorant Garamond',serif;font-size:2.4rem;color:var(--gold-bright);}
  .muted{color:rgba(247,242,232,.55);font-size:.85rem;}

  /* traceability */
  .trace-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
  @media(max-width:860px){.trace-grid{grid-template-columns:1fr;gap:40px;}}
  dl.prov{border-top:1px solid rgba(26,26,26,.1);margin-top:36px;}
  dl.prov div{display:flex;justify-content:space-between;padding:16px 0;border-bottom:1px solid rgba(26,26,26,.1);}
  dl.prov dt{font-size:.72rem;text-transform:uppercase;letter-spacing:.18em;color:rgba(26,26,26,.5);}
  dl.prov dd{font-family:'Cormorant Garamond',serif;font-size:1.1rem;color:var(--forest);}
  .qr-card{aspect-ratio:1;max-width:380px;margin:0 auto;border:1px solid rgba(26,26,26,.1);background:var(--ivory);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px;box-shadow:0 10px 40px -20px rgba(0,0,0,.3);}
  .qr{display:grid;grid-template-columns:repeat(13,1fr);gap:3px;width:190px;}
  .qr span{aspect-ratio:1;}
  .qr-card h4{font-family:'Cormorant Garamond',serif;font-size:1.3rem;color:var(--forest);margin-top:28px;}
  .qr-card small{font-size:.7rem;text-transform:uppercase;letter-spacing:.2em;color:rgba(26,26,26,.5);margin-top:6px;}

  /* founders */
  .founders-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
  @media(max-width:860px){.founders-grid{grid-template-columns:1fr;gap:40px;}}
  .poster{aspect-ratio:2/3;max-width:430px;margin:0 auto;width:100%;background-size:cover;background-position:center;border-radius:2px;box-shadow:0 40px 120px -30px rgba(0,0,0,.9);outline:1px solid rgba(197,164,109,.2);}
  .benefits{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(247,242,232,.1);border:1px solid rgba(247,242,232,.1);margin-top:36px;}
  @media(max-width:520px){.benefits{grid-template-columns:1fr;}.feat{grid-template-columns:1fr;}}
  .benefit{background:var(--obsidian);padding:28px;}
  .bnum{font-family:'Cormorant Garamond',serif;font-size:1.6rem;color:var(--gold-bright);}
  .benefit h3{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:1.15rem;margin:10px 0 8px;}
  .benefit p{font-size:.85rem;color:rgba(247,242,232,.6);}

  /* journal */
  .jgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:60px;}
  @media(max-width:860px){.jgrid{grid-template-columns:1fr 1fr;}}
  @media(max-width:560px){.jgrid{grid-template-columns:1fr;}}
  .jcard.feature{grid-column:span 2;}
  @media(max-width:560px){.jcard.feature{grid-column:span 1;}}
  .jcard-img{aspect-ratio:3/4;background-size:cover;background-position:center;position:relative;overflow:hidden;}
  .jcard.feature .jcard-img{aspect-ratio:16/11;}
  .jcard-img::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(11,11,9,.55),transparent 60%);}
  .jtag{position:absolute;top:18px;left:18px;z-index:2;background:rgba(11,11,9,.45);backdrop-filter:blur(4px);padding:5px 12px;border-radius:99px;font-size:.6rem;text-transform:uppercase;letter-spacing:.2em;color:var(--ivory);}
  .jcard-foot{display:flex;justify-content:space-between;align-items:baseline;gap:16px;margin-top:18px;}
  .jcard-foot h3{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:1.45rem;color:var(--forest);transition:color .4s;}
  .jcard:hover .jcard-foot h3{color:var(--gold);}
  .jcard:hover .jcard-img{transform:scale(1.01);}
  .jread{font-size:.75rem;color:rgba(26,26,26,.45);white-space:nowrap;}

  /* footer */
  footer{background:var(--forest-deep);color:var(--ivory);padding:clamp(70px,10vw,120px) 0 40px;}
  .fgrid{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:50px;}
  @media(max-width:760px){.fgrid{grid-template-columns:1fr 1fr;gap:36px;}}
  footer .brand2{font-family:'Cormorant Garamond',serif;font-size:1.6rem;letter-spacing:.22em;}
  footer p.desc{margin-top:22px;font-size:.9rem;color:rgba(247,242,232,.6);max-width:42ch;}
  footer ul{list-style:none;margin-top:24px;}
  footer li{margin-bottom:12px;font-size:.88rem;color:rgba(247,242,232,.7);}
  footer li:hover{color:var(--gold);}
  .fbar{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:70px;padding-top:30px;border-top:1px solid rgba(247,242,232,.1);font-size:.75rem;color:rgba(247,242,232,.4);}
  .grain{position:absolute;inset:0;pointer-events:none;opacity:.05;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
  @media(prefers-reduced-motion:reduce){*{animation:none!important;}.reveal{opacity:1;transform:none;}}
</style>
</head>
<body>
<header id="hdr">
  <nav>
    <a href="#top" class="brand">SILVAPASTURE</a>
    <ul class="navlinks">
      <li><a href="#ecosystem">Ecosystem</a></li>
      <li><a href="#herd">The Herd</a></li>
      <li><a href="#journey">Journey</a></li>
      <li><a href="#impact">Impact</a></li>
      <li><a href="#product">The Ghee</a></li>
      <li><a href="#journal">Journal</a></li>
    </ul>
  </nav>
</header>

<section class="hero" id="top">
  <div class="hero-bg"></div>
  <div class="hero-mist"></div>
  <svg class="hero-trees" viewBox="0 0 1440 400" preserveAspectRatio="none"><g fill="#0a1d15" opacity="0.9">${Array.from({ length: 22 })
    .map((_, i) => {
      const x = i * 70 + (i % 3) * 10;
      const h = 180 + ((i * 53) % 160);
      return `<polygon points="${x},400 ${x + 30},${400 - h} ${x + 60},400"/>`;
    })
    .join("")}</g></svg>
  <div class="grain"></div>
  <div class="hero-inner">
    <span class="eyebrow center">Silvapasture · A Forest in Every Spoonful</span>
    <h1>Luxury Born From<br/><em>Living Ecosystems</em></h1>
    <div class="hero-lines"><span>A forest.</span><span>A village.</span><span>A herd.</span><span>A tradition.</span></div>
    <p class="hero-tag">Preserved, not produced.</p>
    <div class="cta-row">
      <a href="#ecosystem" class="btn btn-ghost">Explore the Ecosystem</a>
      <a href="#product" class="btn btn-text">Reserve Your Jar →</a>
    </div>
  </div>
  <div class="scrollcue">Scroll<span></span></div>
</section>

<section class="pad"><div class="wrap split">
  <div class="split-media reveal"><div class="grain"></div><span class="lbl">Once — a living forest</span></div>
  <div>
    <span class="eyebrow reveal">The Disappearing World</span>
    <h2 class="big reveal" style="margin-top:24px;">We optimised food.<br/>We forgot the world<br/>it came from.</h2>
    <p class="lead reveal">In a single generation, modern agriculture learned to produce more of everything — and quietly erased the forests, the native herds and the human hands that once made it whole. Yield rose. The world behind the food thinned to nothing.</p>
    <p class="lead reveal">Silvapasture exists for what was lost in that exchange. We do not farm an ingredient. We keep a whole ecosystem alive — and let it give what it has always given.</p>
    <blockquote class="pull reveal">“When nothing is forced, purity does not need to be created — it simply remains.”</blockquote>
  </div>
</div></section>

<section class="dark pad" id="ecosystem">
  <div class="grain"></div>
  <div class="wrap center">
    <span class="eyebrow center reveal">The Living Ecosystem</span>
    <h2 class="big reveal" style="color:var(--ivory);margin:24px auto 0;max-width:760px;">Nothing here stands alone. Each part keeps the next one alive.</h2>
    <div class="eco-row">${ecoNodes}</div>
    <div class="eco-descs">${ecoDescs}</div>
  </div>
</section>

<section class="obsidian pad" id="journey">
  <div class="grain"></div>
  <div class="wrap">
    <span class="eyebrow reveal">The Journey of One Jar</span>
    <h2 class="big reveal" style="color:var(--ivory);margin-top:24px;max-width:680px;">From forest to jar, by the slow hand of tradition.</h2>
    <div class="journey-grid">${journeyStages}</div>
  </div>
</section>

<section class="quote-band">
  <div class="bg" style="background-image:url('${img.lifestyle}')"></div>
  <div class="ov"></div>
  <blockquote>“A forest in every spoonful.”<cite>The Silvapasture Philosophy</cite></blockquote>
</section>

<section class="pad" id="impact"><div class="wrap">
  <span class="eyebrow reveal">Impact &amp; Preservation</span>
  <h2 class="big reveal" style="margin-top:24px;max-width:60ch;">The numbers we are proudest of have nothing to do with sales.</h2>
  <div class="impact-grid">${impactCards}</div>
</div></section>

<section class="dark pad" id="herd">
  <div class="grain"></div>
  <div class="wrap">
    <span class="eyebrow reveal">Cow Adoption · The Herd</span>
    <h2 class="big reveal" style="color:var(--ivory);margin-top:24px;max-width:60ch;">Every jar has a name behind it.</h2>
    <p class="lead reveal" style="color:rgba(247,242,232,.7);">You do not buy a product. You adopt an indigenous cow — and receive her forest, her village and her yield. Follow her grazing, her health and her batches, season after season.</p>
    <div class="jgrid" style="margin-top:48px;">${herdCards}</div>
  </div>
</section>

<section class="obsidian pad product" id="product">
  <div class="grain"></div>
  <div class="wrap product-grid">
    <div class="product-img reveal" style="background-image:url('${img.product}')"></div>
    <div>
      <span class="eyebrow reveal">The Ghee</span>
      <h2 class="reveal">A single artefact,<br/><em>drawn from the whole.</em></h2>
      <p class="lead reveal" style="color:rgba(247,242,232,.75);">Herbal-rich, forest-grazing, indigenous-cow ghee — hand-churned by the bilona method and slow-cooked to perfection. We do not increase yield. We protect the conditions that make it possible, and bottle only what the land freely gives.</p>
      <ul class="feat reveal">
        <li>Forest-grazed indigenous cows</li><li>No additives, no preservatives</li>
        <li>Bilona churned</li><li>Natural nourishment</li><li>Slow cooked to perfection</li>
      </ul>
      <div class="price-row reveal">
        <div><span class="muted" style="text-transform:uppercase;letter-spacing:.2em;">Per jar · 250 ml</span><div class="price">₹ 4,800</div></div>
        <div class="muted">Limited annual yield<br/><span style="color:var(--gold)">214 jars remaining this season</span></div>
      </div>
      <div class="cta-row reveal" style="justify-content:flex-start;margin-top:36px;">
        <a href="#" class="btn btn-solid">Reserve Your Jar</a>
        <a href="#founders" class="btn btn-text">Enter the Founders Circle →</a>
      </div>
    </div>
  </div>
</section>

<section class="obsidian pad" id="arrival">
  <div class="grain"></div>
  <div class="wrap">
    <span class="eyebrow reveal">The Arrival</span>
    <h2 class="big reveal" style="color:var(--ivory);margin-top:24px;">Unhurried, even in arrival.</h2>
    <p class="lead reveal" style="color:rgba(247,242,232,.7);">The jar arrives as a quiet ceremony. Layer by layer, the forest unfolds in your hands — designed to be opened slowly, and gifted without a word.</p>
    <div class="reveal" style="position:relative;margin-top:40px;aspect-ratio:16/9;border:1px solid rgba(197,164,109,.18);border-radius:3px;overflow:hidden;background-image:url('${img.product}');background-size:cover;background-position:center;box-shadow:0 50px 140px -40px rgba(0,0,0,.9)">
      <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(11,11,9,.55),transparent 60%)"></div>
      <span style="position:absolute;bottom:20px;left:24px;font-size:.65rem;letter-spacing:.25em;text-transform:uppercase;color:rgba(247,242,232,.75)">The Arrival · a film</span>
    </div>
    <div class="benefits" style="margin-top:40px;border-color:rgba(247,242,232,.1)">${arrivalLayers}</div>
  </div>
</section>

<section class="pad" style="background:var(--ivory-dim);"><div class="wrap trace-grid">
  <div>
    <span class="eyebrow reveal">Traceability</span>
    <h2 class="big reveal" style="margin-top:24px;">Every jar tells the truth of its origin.</h2>
    <p class="lead reveal">Scan the seal and the whole story opens — the exact forest, the family, the herd, the day. Transparency is the modern equivalent of a maker's hallmark.</p>
    <dl class="prov reveal">
      <div><dt>Batch Number</dt><dd>SP-0042</dd></div>
      <div><dt>From Cow</dt><dd>Kamadhenu · Gir</dd></div>
      <div><dt>Village</dt><dd>Athgarh, Eastern Ghats</dd></div>
      <div><dt>Production Date</dt><dd>April 2026</dd></div>
      <div><dt>Bilona Batch</dt><dd>BIL-Apr-07</dd></div>
      <div><dt>Ecosystem Impact</dt><dd>0.3 acres preserved</dd></div>
    </dl>
  </div>
  <div class="qr-card reveal">
    <div style="width:190px;height:190px">${batchQrSvg.replace("<svg", '<svg style="width:100%;height:100%"')}</div>
    <h4>Scan to trace</h4>
    <small>silvapasture.in/trace/SP-0042</small>
  </div>
</div></section>

<section class="obsidian pad" id="founders">
  <div class="grain"></div>
  <div class="wrap founders-grid">
    <div class="poster reveal" style="background-image:url('${img.poster}')"></div>
    <div>
      <span class="eyebrow reveal">By Invitation</span>
      <h2 class="reveal" style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(2.4rem,5vw,4rem);line-height:1.05;margin-top:24px;">The Founders Circle</h2>
      <p class="lead reveal" style="color:rgba(247,242,232,.78);font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.25rem;">A small, quiet membership for those who wish to keep a whole ecosystem alive — and be the first to receive what it gives.</p>
      <div class="benefits">${benefits}</div>
      <div class="cta-row reveal" style="justify-content:flex-start;margin-top:36px;"><a href="#" class="btn btn-ghost">Request an Invitation</a></div>
    </div>
  </div>
</section>

<section class="pad" id="journal"><div class="wrap">
  <span class="eyebrow reveal">The Journal</span>
  <h2 class="big reveal" style="margin-top:24px;">Field notes from a disappearing world.</h2>
  <div class="jgrid">${journalGrid}</div>
</div></section>

<footer>
  <div class="wrap">
    <div class="fgrid">
      <div>
        <span class="brand2">SILVAPASTURE</span>
        <p class="desc">A conservation house preserving forests, indigenous herds and the bilona tradition. The ghee is the artefact. The ecosystem is the work.</p>
      </div>
      <div><span class="eyebrow">Discover</span><ul><li>Ecosystem</li><li>The Journey</li><li>Impact</li><li>Journal</li></ul></div>
      <div><span class="eyebrow">The House</span><ul><li>The Ghee</li><li>Traceability</li><li>Founders Circle</li><li>Concierge</li></ul></div>
      <div><span class="eyebrow">Connect</span><ul><li>Newsletter</li><li>Instagram</li><li>Stories</li><li>Contact</li></ul></div>
    </div>
    <div class="fbar"><span>© ${new Date().getFullYear()} Silvapasture. Preserved, not produced.</span><span>A Forest in Every Spoonful</span></div>
  </div>
</footer>

<script>
  (function(){
    var hdr=document.getElementById('hdr');
    function onScroll(){ if(window.scrollY>window.innerHeight*0.8){hdr.classList.add('solid');}else{hdr.classList.remove('solid');} }
    window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); if(e.target.classList.contains('count-host')){} io.unobserve(e.target);} });
    },{threshold:0.2});
    document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

    // counters
    var counters=document.querySelectorAll('.count');
    var cio=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        var el=e.target, to=parseInt(el.getAttribute('data-to'),10), start=null, dur=2000;
        function step(ts){ if(!start)start=ts; var p=Math.min((ts-start)/dur,1); var eased=1-Math.pow(1-p,3); el.textContent=Math.round(eased*to).toLocaleString(); if(p<1)requestAnimationFrame(step); }
        requestAnimationFrame(step); cio.unobserve(el);
      });
    },{threshold:0.4});
    counters.forEach(function(el){cio.observe(el);});

    // ecosystem interactivity
    var nodes=document.querySelectorAll('.eco-node'), descs=document.querySelectorAll('.eco-desc');
    nodes.forEach(function(n){
      function activate(){ var i=n.getAttribute('data-i'); nodes.forEach(function(x){x.classList.remove('on');}); n.classList.add('on'); descs.forEach(function(d){ d.classList.toggle('on', d.getAttribute('data-i')===i); }); }
      n.addEventListener('mouseenter',activate); n.addEventListener('click',activate);
    });
  })();
</script>
</body>
</html>`;

const outProject = join(here, "..", "silvapasture-standalone.html");
await writeFile(outProject, html, "utf8");
const sizeMB = (Buffer.byteLength(html, "utf8") / 1024 / 1024).toFixed(2);
console.log("Wrote " + outProject + " (" + sizeMB + " MB)");
