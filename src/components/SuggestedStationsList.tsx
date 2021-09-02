import SuggestedStation from "./SuggestedStation";

const stationsList = [
  {
    stationName: "Bern",
    imageUrl:
      "https://cdn.img.sbb.ch/content/dam/internet/sharedimages/objekte/Bahnhof_Bern.jpg?q=45"
  },
    {
    stationName: "Basel",
    imageUrl:
      "https://cdn.img.sbb.ch/content/dam/internet/sharedimages/objekte/Bahnhof_BaselSBB.jpg?q=45"
  },
      {
    stationName: "Geneva",
    imageUrl:
      "https://cdn.img.sbb.ch/content/dam/internet/sharedimages/objekte/Bahnhof-Genf.jpg?q=45"
  },
  {
    stationName: "Lausanne",
    imageUrl:
      "https://cdn.img.sbb.ch/content/dam/internet/sharedimages/objekte/Bahnhof-Lausanne.jpg?q=45"
  },
 {
    stationName: "Zürich",
    imageUrl:
      "https://cdn.img.sbb.ch/content/dam/internet/sharedimages/objekte/Zuerich-HB.jpg?q=45"
  }, 
];

const SuggestedStationsList = (): React.ReactElement => {
    return <div className="relative flex flex-wrap justify-center opacity-100 z-10 dark:opacity-90">
        {stationsList.map((station, index) => <SuggestedStation key={ index} title={station.stationName} imageUrl={station.imageUrl} onClick={()=>alert(station.stationName)}/>)}
  </div>;
};

export default SuggestedStationsList;
