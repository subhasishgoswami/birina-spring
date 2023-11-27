import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Iframe from 'react-iframe';
import L from 'leaflet';
import './Map.scss'; // Import the CSS file
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import gamosaIcon from './gamosa.png';


const MapComponent = ({ latitude, longitude, location }) => {
  const customIcon = new L.Icon({
    iconUrl: gamosaIcon, // Path to your custom marker image
    iconSize: [40, 40], // Size of the custom icon
    iconAnchor: [16, 32], // Anchor point of the icon which corresponds to marker's location
    popupAnchor: [0, 40], // Point from which the popup should open relative to the iconAnchor
  });

  useEffect(() => {}, [latitude, longitude, location]);

  return (
    <div className='location'>
    <p className="mapLocation">Your Gamosa Came From</p>
    <p className="mapLocationNFT">{location}</p>
    <MapContainer
        center={[latitude, longitude]}
        zoom={10}
        style={{ width: '70%', height: '290px', borderRadius: '15px', marginTop: '10px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]} icon={customIcon}/>
      </MapContainer>
  </div>
  )
};

  const AnimatedMapComponent = (gamosaLocation) => {
    const [animate, setAnimate] = useState(false);
  
    useEffect(() => {
      // Trigger animation after component mounts
      setAnimate(true);
    }, []);
    
    return (

      <div>
        <MapComponent latitude= {gamosaLocation.location.locationLatitudeLongitude.latitude}  longitude= {gamosaLocation.location.locationLatitudeLongitude.longitude} location= {gamosaLocation.location.location} />
      </div>
    );
  };
  
  export default AnimatedMapComponent;