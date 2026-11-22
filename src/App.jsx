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
  { id: 1, commonName: "Monarch", scientificName: "Danaus plexippus", image: danausPlexippus, status: "Self-introduced", hostPlant: "Milkweeds: swan plant (*Gomphocarpus* spp.), tropical milkweed (*Asclepias curassavica*)", distribution: "North Island and South Island (south to about Otago) of New Zealand, norhtern South America through to southern Canada, parts of the Pacific Islands, Australia, Portugal, Phillipines, Morocco" },
  { id: 2, commonName: "Common tussock", scientificName: "Argyrophenga antipodum", image: argyrophengaAntipodum, status: "Endemic", hostPlant: "Various NZ native grasses and tussocks", distribution: "East coast of the South Island, New Zealand" },
  { id: 3, commonName: "Harris's tussock", scientificName: "Argyrophenga harrisi", image: argyrophengaHarrisi, status: "Endemic", hostPlant: "Snow tussocks (*Chionochloa* spp.)", distribution: "Northern parts of the South Island, New Zealand" },
  { id: 4, commonName: "Janita's tussock", scientificName: "Argyrophenga janitae", image: argyrophengaJanitae, status: "Endemic", hostPlant: "Snow tussocks (*Chionochloa* spp.)", distribution: "Eastern parts of the South Island, New Zealand" },
  { id: 5, commonName: "Forest ringlet", scientificName: "Dodonidia helmsii", image: dodonidiaHelmsii, status: "Endemic", hostPlant: "Cutty grass (*Gahnia* spp.) and Snow tussocks (*Chionochloa* spp.).", distribution: "North and South Islands, New Zealand " },
  { id: 6, commonName: "Butler's ringlet", scientificName: "Erebiola butleri", image: erebiolaButleri, status: "Endemic", hostPlant: "Uncertain, probably Snow tussocks (*Chionochloa* spp.).", distribution: "Western mountains of the South Island, New Zealand Buller Gorge to Lake Wakatipu" },
  { id: 7, commonName: "Long-tailed blue", scientificName: "Lampides boeticus", image: lampidesBoeticus, status: "Native", hostPlant: "Legumes: broad beans, brooms, gorse, lupins, peas, sweet peas, tree lucerne, rattlepods", distribution: "New Zealand, Australia, Europe, Africa, South and Southeast Asia, Hawaiian Islands, Maldives" },
  { id: 8, commonName: "Honshu white admiral", scientificName: "Limenitis glorifica", image: limenitisGlorifica, status: "Biocontrol release", hostPlant: "Japanese honeysuckle (*Lonicera japonica*)", distribution: "Released at sites around NZ by regional councils, first in the Karangahake Gorge (2014)" },
  { id: 9, commonName: "Boulder copper", scientificName: "Lycaena boldenarum", image: lycaenaBoldenarum, status: "Endemic", hostPlant: "*Muehlenbeckia axillaris*, *M. ephedroides*, *Rumex flexuosus*", distribution: "Sea level to 2000 m" },
  { id: 10, commonName: "Glade copper", scientificName: "Lycaena feredayi", image: lycaenaFeredayi, status: "Endemic", hostPlant: "*Muehlenbeckia* spp., especially *M. australis* and *M. complexa*", distribution: "North Island" },
  { id: 11, commonName: "Rauparaha's copper", scientificName: "Lycaena rauparaha", image: lycaenaRauparaha, status: "Endemic", hostPlant: "*Muehlenbeckia* spp., especially *M. australis* and *M. complexa* (pōhuehue)", distribution: "Coastal Northland, Bay of Plenty and northern South Island" },
  { id: 12, commonName: "Common copper", scientificName: "Lycaena salustius", image: lycaenaSalustius, status: "Endemic", hostPlant: "*Muehlenbeckia* spp., especially *M. australis* and *M. complexa* (pōhuehue)", distribution: "Throughout NZ" },
  { id: 13, commonName: "Black mountain ringlet", scientificName: "Percnodaimon merula", image: percnodaimonMerula, status: "Endemic", hostPlant: "*Poa colensoi* growing among rocks", distribution: "800–2500 m" },
  { id: 14, commonName: "Cabbage white", scientificName: "Pieris rapae", image: pierisRapae, status: "Introduced", hostPlant: "Brassicas: broccoli, Brussels sprouts, cabbage, cauliflower, kale, turnip", distribution: "Widespread" },
  { id: 15, commonName: "Red admiral", scientificName: "Vanessa gonerilla", image: vanessaGonerilla, status: "Endemic", hostPlant: "Ongaonga (*Urtica ferox*), *U. incisa*, *U. urens*, *Parietaria* spp.", distribution: null },
  { id: 17, commonName: "Yellow admiral", scientificName: "Vanessa itea", image: vanessaItea, status: "Native", hostPlant: "Nettles (*Urtica incisa*, *U. urens*), *Parietaria* spp.", distribution: "Up to about 1000 m" },
  { id: 18, commonName: "Common blue", scientificName: "Zizina otis", image: zizinaOtis, status: "Native", hostPlant: "Clovers (*Trifolium* spp.), *Lotus* spp., *Medicago* spp.", distribution: "Up to 1000 m" },
  { id: 19, commonName: "Southern blue", scientificName: "Zizina oxleyi", image: zizinaOxleyi, status: "Endemic", hostPlant: "Low-growing native brooms (*Carmichaelia* spp.) and other low-growing Fabaceae", distribution: "Eastern side of the South Island" },
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
