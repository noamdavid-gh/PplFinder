import React, {useState, useEffect} from "react";
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import {MapStyles, MapTitle} from "./style";

const libraries = ["places"];
const mapContainerStyle = {
    width: '100vw',
    height: 'calc(100vh - 50px)'
}
const center = {
    lat: 32.0703654,
    lng: 34.7947291
}

const options = {
    styles: MapStyles,
    disableDefaultUI: true,
    zoomControl: true,
}

function Map() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem("users");
        if(data) {
            setUsers(JSON.parse(data));
        }
    }, []);
    

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
      });
    
      if(loadError) return "Error loading maps";
      if(!isLoaded) return "Loading Maps";
    
      return <div>
          <MapTitle>
            <h1 class="map-title">PplFinder <span role="img" aria-label="people">👥</span></h1>
          </MapTitle>
          <GoogleMap mapContainerStyle={mapContainerStyle} zoom={2.7} center={center} options={options}>
              {users.map((user, index) => (
                <Marker 
                    key={index} 
                    position={{lat: parseInt(user.location.coordinates.latitude), lng: parseInt(user.location.coordinates.longitude)}}
                    onClick={() => {
                        setSelectedUser(user);
                    }}
                    icon={{
                        url: user.picture.thumbnail,
                        scaledSize: new window.google.maps.Size(50,50),
                    }}
                />
              ))}

              {selectedUser && (
                <InfoWindow
                    position={{lat: parseInt(selectedUser.location.coordinates.latitude), lng: parseInt(selectedUser.location.coordinates.longitude)}}
                    onCloseClick={() => {
                        setSelectedUser(null);
                    }}
                >
                    <div style={{color: 'black'}}>
                        <h2>{`${selectedUser.name.title} ${selectedUser.name.first} ${selectedUser.name.last}`}</h2>
                        <p>{`${selectedUser.location.coordinates.latitude}, ${selectedUser.location.coordinates.longitude}`}</p>
                        <p>{`${selectedUser.location.street.number} ${selectedUser.location.street.name}`}</p>
                        <p>{`${selectedUser.location.city} ${selectedUser.location.country}`}</p>
                    </div>
                </InfoWindow>
              )}
          </GoogleMap>
      </div>
}


export default Map;