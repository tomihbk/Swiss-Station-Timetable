import SuggestedStation from "./SuggestedStation";

const stationsList = [
  {
    stationName: "Lausanne",
    imageUrl:
      "https://cdn.img.sbb.ch/content/dam/internet/sharedimages/objekte/Bahnhof-Lausanne.jpg",
    },
     {
    stationName: "Basel",
    imageUrl:
      "https://cdn.img.sbb.ch/content/dam/internet/sharedimages/objekte/Bahnhof_BaselSBB.jpg",
    },
      {
    stationName: "Fribourg",
    imageUrl:
      "https://cdn.img.sbb.ch/content/dam/internet/sharedimages/objekte/Bahnhof-Fribourg.jpg",
  }, {
    stationName: "Zürich",
    imageUrl:
      "https://cdn.img.sbb.ch/content/dam/internet/sharedimages/objekte/Zuerich-HB.jpg",
  },
];

const SuggestedStationsList = (): React.ReactElement => {
    return <div className="flex flex-wrap justify-center opacity-100 dark:opacity-90">
        {stationsList.map((station, index) => <SuggestedStation key={ index} title={station.stationName} imageUrl={station.imageUrl} onClick={()=>alert(station.stationName)}/>)}
  </div>;
};

export default SuggestedStationsList;
