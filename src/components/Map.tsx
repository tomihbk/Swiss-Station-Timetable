import L from "leaflet";
import { useEffect } from "react";

interface MapPropType {
  height?: number;
  width?: number;
  position: L.LatLngExpression;
  stationName: string;
}

const Map: React.FC<MapPropType> = ({
  height,
  position,
  stationName,
}: MapPropType): React.ReactElement => {
  const Jawg_Streets = L.tileLayer(
    "https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token={accessToken}",
    {
      attribution:
        '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 0,
      maxZoom: 22,
      accessToken:
        "Xk3OXas5HH0aTyfgFcv5DGpny7rnhZDRN87fbWdAE61VCb6Ht5tqBAy4xrHkKECy",
    }
  );

  // Define the styles that are to be passed to the map instance:
  const mapStyles = {
    overflow: "hidden",
    height: height || "30vh",
    borderRadius: "2em",
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
  };

  useEffect(() => {
    const map = L.map("map", {
      center: position || [46.94883, 7.43913],
      zoom: 15,
      zoomControl: false,
      layers: [Jawg_Streets],
    });
    const marker = L.marker(position || [46.94883, 7.43913]).addTo(map);
    marker.bindPopup(`<b>${stationName.split("|")[0]}</b>`);
  }, []);

  return (
    <div>
      <div id="map" className="w-full" style={mapStyles}>
        <div
          className="absolute bottom-5 md:bottom-3 left-5 font-display text-4xl md:text-6xl font-bold text-black"
          style={{ zIndex: 500 }}
        >
          {stationName}
        </div>
      </div>
    </div>
  );
};

export default Map;
