import React from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

const ViewMap = () => {
    return (
        <>
            <p className="text-5xl my-8 text-center font-bold">All parking lots</p>
            <div style={{height: 'auto'}}>
                <MapContainer style={{
                    height: '100vh',
                    width: '100wh',
                    overflow: 'hidden'
                }} center={[41.3275, 19.8187]} zoom={14} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[41.3275, 19.8187]}>
                        <Popup>
                            test
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </>
    )
}

export default ViewMap;