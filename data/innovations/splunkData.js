export default {
  id: "splunk",
  active: true,
  innovationName: "SPLUNK: Analýza datových toků skladu akl",
  perex:
    "Softwarový nástroj, který monitoruje automatické sklady AKL v závodech Mladá Boleslav a Kvasiny.",
  motivation: [
    "Nutnost vyšší spolehlivosti AKL na základě využití dat technologie",
    "Potřeba vyšší přehlednosti IT architektury a chodu technologie"
  ],
  slideshow: ["1.jpg", "16.mp4", "2.jpg", "3.jpg"],
  about: [
    {
      text:
        "Systém umožňující vizualizaci technologických postupů dle modelu auta a pracoviště, na kterém se pracovník nachází. Po načtení čárového kódu pomocí ProGlove u daného dílu, se vyvolá požadovaný technologický postup, jenž je on-line zobrazován na monitoru u daného pracoviště. Systém nahrazuje papírovou formu návodek a umožňuje systémovou archivaci všech operací."
    }
  ],
  benefits: [
    "Monitoring systému v reálném čase",
    "Analýzy historických událostí",
    "Upozornění na blížící se poruchy",
    "Předcházení výpadků díky strojovému učení tzv. machine learning"
  ],
  authors: [
    { id: "tomasKubica", isGarant: true },
    { id: "lukasPatkan", isGarant: false },
    { id: "milosBzonek", isGarant: false }
  ]
};
