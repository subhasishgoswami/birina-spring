import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Iframe from 'react-iframe';
import L from 'leaflet';
import './Map.scss'; // Import the CSS file
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import gamosaIcon from './gamosa.png';


const MapComponent = ({ latitude, longitude }) => {
  const customIcon = new L.Icon({
    iconUrl: gamosaIcon, // Path to your custom marker image
    iconSize: [40, 40], // Size of the custom icon
    iconAnchor: [16, 32], // Anchor point of the icon which corresponds to marker's location
    popupAnchor: [0, 40], // Point from which the popup should open relative to the iconAnchor
  });

  useEffect(() => {}, [latitude, longitude]);

  return (
    <div className='location'>
    <p className="mapLocation">Your Gamosa Came From</p>
    <p className="mapLocationNFT">Merapani, Golaghat</p>
    <MapContainer
        center={[26.514326750000002, 93.96587135]} // Coordinates for Golaghat, Assam
        zoom={13}
        style={{ width: '70%', height: '290px', borderRadius: '15px', marginTop: '10px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[26.514326750000002, 93.96587135]} icon={customIcon}/>
      </MapContainer>
  </div>
  )
};

MapComponent.propTypes = {
    latitude: PropTypes.string.isRequired, // Define the prop type and mark it as required
    longitude: PropTypes.string.isRequired, // Define the prop type and mark it as required
  };

  const AnimatedMapComponent = () => {
    const [animate, setAnimate] = useState(false);
  
    useEffect(() => {
      // Trigger animation after component mounts
      setAnimate(true);
    }, []);
  
    return (

      <div>
        <MapComponent latitude="26.5239" longitude="93.9623" />
      </div>
    );
  };
  
  export default AnimatedMapComponent;