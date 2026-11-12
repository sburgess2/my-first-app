import './App.css'
import * as d3 from "d3";
import { useState } from "react";
import Card from "./Card"
import danausPlexippus from "./assets/danaus-plexippus.png";
import argyrophengaAntipodum from "./assets/argyrophenga-antipodum.png";
import argyrophengaJanitae from "./assets/argyrophenga-janitae.png";

const butterflies = [
  { id: 1, commonName: "Monarch", scientificName: "Danaus plexippus", image: danausPlexippus, status: "Self-introduced", hostPlant: "Milkweeds: swan plant (Gomphocarpus fruticosus), giant swan plant (G. physocarpus), tropical milkweed (Asclepias curassavica)", range: "Naturally as far south as 45°S" },
  { id: 2, commonName: "Common tussock", scientificName: "Argyrophenga antipodum", image: argyrophengaAntipodum, status: "Endemic", hostPlant: "Various native grasses and tussocks", range: "Grassland, east coast of the South Island, sea level to 2000 m" },
  { id: 3, commonName: "Harris's tussock", scientificName: "Argyrophenga harrisi", status: "Endemic", hostPlant: "Snow tussocks (Chionochloa spp.)", range: "Subalpine, 800–2000 m; north-west Nelson down to Lewis Pass" },
  { id: 4, commonName: "Janita's tussock", scientificName: "Argyrophenga janitae", image: argyrophengaJanitae, status: "Endemic", hostPlant: "Snow tussocks (Chionochloa spp.)", range: "Eastern side of the South Island as far south as 45°S" },
  { id: 5, commonName: "Forest ringlet", scientificName: "Dodonidia helmsii", status: "Endemic", hostPlant: "Gahnia and Chionochloa spp.", range: "Low to moderate altitude forest up to the tree-line, North and South Islands" },
  { id: 6, commonName: "Butler's ringlet", scientificName: "Erebiola butleri", status: "Endemic", hostPlant: "Not clearly known, presumably Chionochloa spp.", range: "Lower alpine meadows of the wetter western mountains, Buller Gorge to Lake Wakatipu" },
  { id: 7, commonName: "Long-tailed blue", scientificName: "Lampides boeticus", status: "Native", hostPlant: "Legumes: broad beans, brooms, gorse, lupins, peas, sweet peas, tree lucerne, rattlepods", range: "Open country" },
  { id: 8, commonName: "Honshu white admiral", scientificName: "Limenitis glorifica", status: "Biocontrol release", hostPlant: "Japanese honeysuckle (Lonicera japonica)", range: "Released at sites around NZ by regional councils, first in the Karangahake Gorge (2014)" },
  { id: 9, commonName: "Boulder copper", scientificName: "Lycaena boldenarum", status: "Endemic", hostPlant: "Muehlenbeckia axillaris, M. ephedroides, Rumex flexuosus", range: "Braided riverbeds, tussocklands and shrublands, sea level to 2000 m" },
  { id: 10, commonName: "Glade copper", scientificName: "Lycaena feredayi", status: "Endemic", hostPlant: "Muehlenbeckia spp., especially M. australis and M. complexa", range: "Forest margins and open, sheltered areas of the North Island" },
  { id: 11, commonName: "Rauparaha's copper", scientificName: "Lycaena rauparaha", status: "Endemic", hostPlant: "Muehlenbeckia spp., especially M. australis and M. complexa (pōhuehue)", range: "Coastal Northland, Bay of Plenty and northern South Island" },
  { id: 12, commonName: "Common copper", scientificName: "Lycaena salustius", status: "Endemic", hostPlant: "Muehlenbeckia spp., especially M. australis and M. complexa (pōhuehue)", range: "Throughout NZ" },
  { id: 13, commonName: "Black mountain ringlet", scientificName: "Percnodaimon merula", status: "Endemic", hostPlant: "Poa colensoi growing among rocks", range: "800–2500 m" },
  { id: 14, commonName: "Cabbage white", scientificName: "Pieris rapae", status: "Introduced", hostPlant: "Brassicas: broccoli, Brussels sprouts, cabbage, cauliflower, kale, turnip", range: "Wide-ranging, especially market gardens and urban areas" },
  { id: 15, commonName: "Red admiral", scientificName: "Vanessa gonerilla gonerilla", status: "Endemic", hostPlant: "Ongaonga (Urtica ferox), U. incisa, U. urens, Parietaria spp.", range: null },
  { id: 16, commonName: "Chatham Islands red admiral", scientificName: "Vanessa gonerilla ida", status: "Endemic", hostPlant: "Chatham Islands nettle (Urtica australis)", range: "Chatham Islands only" },
  { id: 17, commonName: "Yellow admiral", scientificName: "Vanessa itea", status: "Native", hostPlant: "Nettles (Urtica incisa, U. urens), Parietaria spp.", range: "Open country, wasteland and gardens up to about 1000 m" },
  { id: 18, commonName: "Common blue", scientificName: "Zizina otis labradus", status: "Native", hostPlant: "Clovers (Trifolium spp.), Lotus spp., Medicago spp.", range: "Open grassy areas up to 1000 m" },
  { id: 19, commonName: "Southern blue", scientificName: "Zizina oxleyi", status: "Endemic", hostPlant: "Low-growing native brooms (Carmichaelia spp.) and other low-growing Fabaceae", range: "Eastern side of the South Island" },
  { id: 20, commonName: "Lemon migrant", scientificName: "Catopsilia pomona pomona", status: "Rare migrant", hostPlant: null, range: null },
  { id: 21, commonName: "Lesser wanderer", scientificName: "Danaus petilia", status: "Rare migrant", hostPlant: null, range: null },
  { id: 22, commonName: "Blue moon", scientificName: "Hypolimnas bolina nerina", status: "Rare migrant", hostPlant: null, range: null },
  { id: 23, commonName: "Meadow argus", scientificName: "Junonia villida calybe", status: "Rare migrant", hostPlant: null, range: null },
  { id: 24, commonName: "Common evening brown", scientificName: "Melanitis leda bankia", status: "Very rare migrant", hostPlant: null, range: null },
  { id: 25, commonName: "Blue tiger", scientificName: "Tirumala hamata hamata", status: "Rare migrant", hostPlant: null, range: null },
  { id: 26, commonName: "Australian painted lady", scientificName: "Vanessa kershawi", status: "Rare migrant", hostPlant: null, range: null },
];

const getGenus = (butterfly) => butterfly.scientificName.split("")[0];
const h2Style = { margin: "0 0 8px", fontSize: 20, fontWeight: "bold" };
const h3Style = { margin: "0 0 8px", fontSize: 20, fontWeight: "normal", fontStyle: "italic" };
const h4Style = {margin: "8px 0 4px", fontSize: 20, fontWeight: "bold" };
const textStyle = { margin: 0, fontSize: 18 };

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
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, fontFamily: "sans-serif"}}>
      {butterflies.map((butterfly) => (
      <Card key={butterfly.id}>
        <h3 style={h3Style}>{butterfly.scientificName}</h3>
        <img
        src={butterfly.image}
        alt={butterfly.commonName}
        style={{ width: "100%", height: 120, objectFit: "contain", margin: "0 0 8px" }}
  />
          <h2 style={h2Style}>{butterfly.commonName}</h2>
          <h4 style={h4Style}>Status</h4>
          <p style={textStyle}>{butterfly.status}</p>
          <h4 style={h4Style}>Host Plant</h4>
          <p style={textStyle}>{butterfly.hostPlant ?? "Unknown"}</p>
          <h4 style={h4Style}>Range</h4>
          <p style={textStyle}>{butterfly.range ?? "Unknown"}</p>
      </Card>
))}
    </div>
  )
}

export default App
