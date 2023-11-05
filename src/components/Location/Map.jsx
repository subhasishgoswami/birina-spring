import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Iframe from 'react-iframe';
import './Map.scss'; // Import the CSS file

const MapComponent = ({ latitude, longitude }) => {

  useEffect(() => {}, [latitude, longitude]);

  return (
    <div className='location'>
    <p className="mapLocation">Your Gamosa Came From</p>
    <p className="mapLocationNFT">Merapani, Golaghat</p>
    <Iframe
      url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28561.44200473965!2d93.96587135!3d26.514326750000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37468e60f884e663%3A0xcf43f3969cfd3486!2sGolaghat%2C%20Assam!5e0!3m2!1sen!2sin!4v1699108012946!5m2!1sen!2sin"
      width="70%"
      height="350px"
      id=""
      styles={{ border: 0, borderRadius: '15px', marginTop: '10px' }}
      className=""
      display="block"
      referrerPolicy="no-referrer-when-downgrade"
      loading="lazy"
    />
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

      <div className={`has-animation-map animation-rtl ${animate ? 'animate-in' : ''}`} data-delay="10">
        <MapComponent latitude="26.5239" longitude="93.9623" />
      </div>
    );
  };
  
  export default AnimatedMapComponent;