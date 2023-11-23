import React, { useRef, useState, useEffect } from 'react'
import { useSprings, animated } from '@react-spring/web'
import useMeasure from 'react-use-measure'
import { useDrag } from 'react-use-gesture'
import clamp from 'lodash.clamp'
import styles from './styles.module.css'

import Viewpager from './components/Viewpager'
import Detail from './components/Detail/Detail';
import { RiMenu3Fill } from 'react-icons/ri'
import { BrowserRouter as Router, Route,Routes, useParams } from 'react-router-dom';
import { result } from 'lodash-es'
import axios from 'axios';

export default function App() {
  return (
    <Router>
      <div style={{ height: '100%' }}>
        <Routes>
          <Route path="/:gamosa" element={<MyComponent />} />
        </Routes>
      </div>
    </Router>
  );
}


function MyComponent() {
  const [loading, setLoading] = useState(true);
  const [gamosaParams, setGamosaParams] = useState(null);
  const { gamosa } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://script.google.com/macros/s/AKfycbw5C6PBwE35lBWKCyKQALGzLIAk6q-zas9RiRJ3FC9hS80ajwQTrqWQ7Z69tNMLfVbv8Q/exec?gamosa=${gamosa}`);
        console.log('API response:', response.data);
        if (response.data.error == "Gamosa not found") {
          setGamosaParams(null);
        } else {
          setGamosaParams(response.data);
        }
      } catch (error) {
        setGamosaParams(null);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gamosa]);

  return (
    <div style={{ height: '100%' }}>
      <div className={styles.container}>
        {loading ? (
          'Loading...'
        ) : (
          gamosaParams ? (
            <Viewpager
              gamosa={gamosa}
              nftAsset={gamosaParams.NFT}
              weaver={gamosaParams.weaver}
              location={gamosaParams.location}
              locationLatitudeLongitude={{ latitude: gamosaParams.latitude, longitude: gamosaParams.longitude }}
            />
          ) : (

            <div>Gamosa Not Minted</div>
          )
        )}
      </div>
    </div>
  );
}