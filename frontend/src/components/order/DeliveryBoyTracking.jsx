import react from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import scooter from "../../assets/scooter.png";
import home from "../../assets/home.png";

const deliveryBoyIcon = new L.Icon({
    iconUrl: scooter,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})
const customerIcon = new L.Icon({
    iconUrl: home,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})

function DeliveryBoyTracking({data}) {
    let deliveryBoyLat = data.deliveryBoyLocation.lat
    let deliveryBoyLon = data.deliveryBoyLocation.lon
    let customerLat = data.customerLocation.lat
    let customerlon = data.customerLocation.lat
    const path = [
        [deliveryBoyLat, deliveryBoyLon],
        [customerLat, customerlon]
    ]

    return(
        <div className="w-full h-[400px] bg-white shadow-xl rounded-lg p-4">
             <MapContainer
                         center={path[0]} zoom={13} scrollWheelZoom={false} className="w-full h-full rounded-lg">
                        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Polyline positions={path} color="blue" />

                        <Marker position={path[0]} icon={deliveryBoyIcon}>
                        <Popup>Delivery Boy</Popup>
                        </Marker>

                        <Marker position={path[1]} icon={customerIcon}>
                        <Popup>Customer</Popup>
                        </Marker>
            
                    </MapContainer>
        </div>
    )
}

export default DeliveryBoyTracking;