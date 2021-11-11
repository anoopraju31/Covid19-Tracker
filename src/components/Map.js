import './Map.css'
import { MapContainer as LeafletMap, TileLayer, useMap } from "react-leaflet"
import { showDataOnMap } from "./util"

function ChangeMap({ center, zoom }) {
    const map = useMap()
    map.setView(center, zoom)
    return null
}
  
function Map({countries, casesType, center }) {
    return (
        <div className="map ">
        <LeafletMap 
            center={center} 
            zoom={4} 
            minZoom={2}
            maxZoom={15}
            attributionControl={true}
            zoomControl={false}
            doubleClickZoom={true}
            scrollWheelZoom={true}
            dragging={true}
            animate={true}
            easeLinearity={0.35}
        >
            <ChangeMap center={[center[1], center[0]]} zoom={1.5} />
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {showDataOnMap(countries, casesType)
            }
        </LeafletMap>
        </div>
    );
}

export default Map;
