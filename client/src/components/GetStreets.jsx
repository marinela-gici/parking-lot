import React, {useEffect, useState} from 'react';
import axios from "axios";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'

const GetStreets = () => {
    const [searchLocations, setSearchLocations] = useState([]);
    const [street, setStreet] = useState("");
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");
    const [address, setAddress] = useState("");
    const [showSearchBar, setShowSearchBar] = useState(false);


    const getAddress = (e) => {
        setAddress(e.target.value);

        if (address) {
            axios
                .get(
                    `https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&type=street&filter=countrycode:al&format=json&apiKey=06af4b03d37d4af6a2c546931bda94d7`
                )
                .then((response) => {
                    console.log(response.data);
                    setSearchLocations(response.data.results);
                })
                .catch((err) => console.log(err));
        } else {
            setSearchLocations([]);
        }
    };


    return (
        <>
            <p>test</p>
            <input type="text" value={address} onInput={getAddress} onFocus={() => {
                setShowSearchBar(true);
                setAddress("");
            }}
                   onBlur={() => setShowSearchBar(false)}/>

            {showSearchBar && (
                <div
                    id="search-results"
                    className="absolute w-full dark:bg-gray-800 bg-main text-slate-800 dark:text-white"
                >
                    {searchLocations.length > 0 &&
                        searchLocations.map((searchLocation, index) => {
                            return (
                                <p key={index} onMouseDown={(e) => {
                                    e.preventDefault();
                                    setAddress(searchLocation.street)
                                    setStreet(searchLocation.street);
                                    setLat(searchLocation.lat);
                                    setLon(searchLocation.lon);
                                    setShowSearchBar(false);
                                }
                                }
                                   className="cursor-pointer dark:hover:bg-emerald-800 hover:text-white hover:bg-emerald-800 bg-slate-200 dark:bg-slate-700 w-full pl-3 py-3 rounded-md my-3">
                                    {searchLocation.street}
                                </p>
                            );
                        })}

                    {searchLocations.length === 0 && <p className="pl-3 py-3 rounded-md my-3">No results found.</p>}
                </div>
            )}

            <div style={{height: '500px'}}>
                <MapContainer style={{
                    height: '100vh',
                    width: '100wh'
                }} center={[41.3275, 19.8187]} zoom={14} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {lat && lon &&
                    <Marker position={[lat, lon]}>
                        <Popup>
                            {street && street}
                        </Popup>
                    </Marker>
                    }
                </MapContainer>
            </div>
        </>
    )
}

export default GetStreets;