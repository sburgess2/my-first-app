import './App.css'
import * as d3 from "d3";
import { useState } from "react";
import Card from "./Card"
import StatusPill from "./StatusPill";
import danausPlexippus from "./assets/danaus-plexippus.png";
import argyrophengaAntipodum from "./assets/argyrophenga-antipodum.png";
import argyrophengaJanitae from "./assets/argyrophenga-janitae.png";
import argyrophengaHarrisi from "./assets/argyrophenga-harrisi.png";
import dodonidiaHelmsii from "./assets/dodonidia-helmsii.png";
import erebiolaButleri from "./assets/erebiola-butleri.png";
import lampidesBoeticus from "./assets/lampides-boeticus.png";
import limenitisGlorifica from "./assets/limenitis-glorifica.png";
import lycaenaBoldenarum from "./assets/lycaena-boldenarum.png";
import lycaenaFeredayi from "./assets/lycaena-feredayi.png";
import lycaenaRauparaha from "./assets/lycaena-rauparaha.png";
import lycaenaSalustius from "./assets/lycaena-salustius.png";
import percnodaimonMerula from "./assets/percnodaimon-merula.png";
import pierisRapae from "./assets/pieris-rapae.png";
import vanessaGonerilla from "./assets/vanessa-gonerilla.png";
import vanessaItea from "./assets/vanessa-itea.png";
import zizinaOtis from "./assets/zizina-otis.png";
import zizinaOxleyi from "./assets/zizina-oxleyi.png";

const butterflies = [
  { id: 1, commonName: "Monarch", scientificName: "Danaus plexippus", image: danausPlexippus, status: "Self-introduced", hostPlant: "Swan plant (*Gomphocarpus* spp.), tropical milkweed (*Asclepias curassavica*)", distribution: "New Zealand (North Island, South Island to Otago); Americas; Australia; Pacific Islands" },
  { id: 2, commonName: "Common tussock", scientificName: "Argyrophenga antipodum", image: argyrophengaAntipodum, status: "Endemic", hostPlant: "Grasses (*Poa*, *Festuca* and *Agropyron* spp.)", distribution: "New Zealand (east coast of South Island)" },
  { id: 3, commonName: "Harris's tussock", scientificName: "Argyrophenga harrisi", image: argyrophengaHarrisi, status: "Endemic", hostPlant: "Snow tussock (*Chionochloa* spp.)", distribution: "New Zealand (northern South Island)" },
  { id: 4, commonName: "Janita's tussock", scientificName: "Argyrophenga janitae", image: argyrophengaJanitae, status: "Endemic", hostPlant: "Snow tussock (*Chionochloa* spp.)", distribution: "New Zealand (eastern South Island)" },
  { id: 5, commonName: "Forest ringlet", scientificName: "Dodonidia helmsii", image: dodonidiaHelmsii, status: "Endemic", hostPlant: "Cutty grass (*Gahnia* spp.), snow tussock (*Chionochloa* spp.)", distribution: "New Zealand (North Island, South Island)" },
  { id: 6, commonName: "Butler's ringlet", scientificName: "Erebiola butleri", image: erebiolaButleri, status: "Endemic", hostPlant: "Uncertain, probably snow tussock (*Chionochloa* spp.)", distribution: "New Zealand (subalpine South Island)" },
  { id: 7, commonName: "Long-tailed blue", scientificName: "Lampides boeticus", image: lampidesBoeticus, status: "Self-introduced", hostPlant: "Gorse (*Ulex europaeus*), broom (*Cytisus scoparius*), tree lucerne (*Cytisus proliferus*), other legumes (Fabaceae)", distribution: "New Zealand; Australia; Europe; Africa; South and Southeast Asia; Hawaii; Maldives" },
  { id: 8, commonName: "Honshu white admiral", scientificName: "Limenitis glorifica", image: limenitisGlorifica, status: "Biocontrol release", hostPlant: "Japanese honeysuckle (*Lonicera japonica*)", distribution: "New Zealand (Waikato, Bay of Plenty); Japan (native range)" },
  { id: 9, commonName: "Boulder copper", scientificName: "Lycaena boldenarum", image: lycaenaBoldenarum, status: "Endemic", hostPlant: "Creeping pōhuehue (*Muehlenbeckia axillaris*), leafless pōhuehue (*Muehlenbeckia ephedroides*), New Zealand dock (*Rumex flexuosus*)", distribution: "New Zealand (South Island, Wairarapa, Central Plateau, Hawke's Bay)" },
  { id: 10, commonName: "Glade copper", scientificName: "Lycaena feredayi", image: lycaenaFeredayi, status: "Endemic", hostPlant: "Large-leaved pōhuehue (*Muehlenbeckia australis*), pōhuehue (*Muehlenbeckia complexa*), other *Muehlenbeckia* spp.", distribution: "New Zealand (Wellington, South Island)" },
  { id: 11, commonName: "Rauparaha's copper", scientificName: "Lycaena rauparaha", image: lycaenaRauparaha, status: "Endemic", hostPlant: "Pōhuehue (*Muehlenbeckia complexa*), large-leaved pōhuehue (*Muehlenbeckia australis*)", distribution: "New Zealand (northern and western coasts of North Island, northern coast of South Island)" },
  { id: 12, commonName: "Common copper", scientificName: "Lycaena salustius", image: lycaenaSalustius, status: "Endemic", hostPlant: "Pōhuehue (*Muehlenbeckia complexa*), large-leaved pōhuehue (*Muehlenbeckia australis*)", distribution: "New Zealand (throughout)" },
  { id: 13, commonName: "Black mountain ringlet", scientificName: "Percnodaimon merula", image: percnodaimonMerula, status: "Endemic", hostPlant: "Blue tussock (*Poa colensoi*)", distribution: "New Zealand (eastern and northern mountains of South Island, 800–2500 m)" },
  { id: 14, commonName: "Cabbage white", scientificName: "Pieris rapae", image: pierisRapae, status: "Introduced", hostPlant: "Broccoli, brussels sprout, cabbage, cauliflower, kale (*Brassica oleracea*), turnip (*Brassica rapa*)", distribution: "New Zealand; widespread worldwide" },
  { id: 15, commonName: "Red admiral", scientificName: "Vanessa gonerilla", image: vanessaGonerilla, status: "Endemic", hostPlant: "Ongaonga (*Urtica ferox*), other nettles (*Urtica* spp.)", distribution: "New Zealand (throughout)" },
  { id: 17, commonName: "Yellow admiral", scientificName: "Vanessa itea", image: vanessaItea, status: "Native", hostPlant: "Scrub nettle (*Urtica incisa*), small nettle (*Urtica urens*)", distribution: "New Zealand (throughout)" },
  { id: 18, commonName: "Common grass blue", scientificName: "Zizina otis labradus", image: zizinaOtis, status: "Native", hostPlant: "Clover (*Trifolium* spp.), bird's-foot trefoil (*Lotus* spp.), medick (*Medicago* spp.)", distribution: "New Zealand (North Island, northern South Island); Australia" },
  { id: 19, commonName: "Southern blue", scientificName: "Zizina oxleyi", image: zizinaOxleyi, status: "Endemic", hostPlant: "Native broom (*Carmichaelia* spp.), clover (*Trifolium* spp.)", distribution: "New Zealand (eastern South Island)" },
];

const getGenus = (butterfly) => butterfly.scientificName.split(" ")[0];
const italicise = (text) =>
  text.split("*").map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part));
const h1Style = {
  margin: "32px 0 16px",
  fontSize: 36,
  fontWeight: 700,
  letterSpacing: "-0.5px",
  color: "#231d19",
  textAlign: "left",
  fontFamily: "sans-serif",
};
const h2Style = { margin: "0 0 8px", fontSize: 20, fontWeight: "bold" };
const h3Style = { margin: "0 0 8px", fontSize: 20, fontWeight: "normal", fontStyle: "italic", color: "#77716b" };
const h4Style = { margin: "12px 0 4px", fontSize: 15, fontWeight: "bold", color: "#7a6a5a" };
const textStyle = { margin: 0, fontSize: 16, color: "#3d3d3d" };
const sourceStyle = { margin: "24px 0 16px", fontSize: 13, color: "#77716b", fontFamily: "sans-serif", textAlign: "left" };

function App() {
   const [genus, setGenus] = useState("");
  const [species, setSpecies] = useState("");

  const genera = [...new Set(butterflies.map(getGenus))].sort();
  const speciesOptions = butterflies.filter((b) => getGenus(b) === genus);

  const filtered = butterflies.filter(
    (b) =>
      (genus === "" || getGenus(b) === genus) &&
      (species === "" || b.scientificName === species)
  );
  return (
    <div>
      <h1>New Zealand Butterflies</h1>
     <div style={{ display: "flex", gap: 16, margin: "16px 0" }}>
    <label>
        Genus{" "}
        <select
          value={genus}
          onChange={(e) => {
            setGenus(e.target.value);
            setSpecies("");
          }}
        >
          <option value="">All</option>
          {genera.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </label>

      <label>
        Species{" "}
        <select
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          disabled={genus === ""}
        >
          <option value="">All</option>
          {speciesOptions.map((b) => (
            <option key={b.id} value={b.scientificName}>
              {b.scientificName} ({b.commonName})
            </option>
          ))}
        </select>
      </label>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, fontFamily: "sans-serif"}}>
      {filtered.map((butterfly) => (
      <Card key={butterfly.id}>
        <img
          src={butterfly.image}
          alt={butterfly.commonName}
          style={{ width: "100%", height: 120, objectFit: "contain", margin: "0 0 8px" }}
        />
          <h2 style={h2Style}>{butterfly.commonName}</h2>
          <h3 style={h3Style}>{butterfly.scientificName}</h3>
          <StatusPill status={butterfly.status}/>
          <h4 style={h4Style}>Host Plant</h4>
          <p style={textStyle}>{butterfly.hostPlant ? italicise(butterfly.hostPlant) : "Unknown"}</p>
          <h4 style={h4Style}>Distribution</h4>
          <p style={textStyle}>{butterfly.distribution ?? "Unknown"}</p>
      </Card>
))}
    </div>
    <p style={sourceStyle}>Data source: iNaturalist, nzButterfly.info, Moths and Butterflies of New Zealand Trust</p>
    </div>
  );
}

export default App
