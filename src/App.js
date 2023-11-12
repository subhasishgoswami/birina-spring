import React, { useRef, useState } from 'react'
import { useSprings, animated } from '@react-spring/web'
import useMeasure from 'react-use-measure'
import { useDrag } from 'react-use-gesture'
import clamp from 'lodash.clamp'
import styles from './styles.module.css'

import Viewpager from './components/Viewpager'
import Detail from './components/Detail/Detail';
import { RiMenu3Fill } from 'react-icons/ri'
import { BrowserRouter as Router, Route,Routes, useParams } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function App() {
  return (
    <Router>
      <div style={{ height: '100%' }}>
        <Routes>
          <Route path="/:gamosa" element={<MyComponent />} />
          <Route path="/detail" element={<Detail/>}> </Route>
        </Routes>
      </div>
    </Router>
  );
}

function MyComponent() {
  const { gamosa } = useParams();

  const nftAsset = nft(gamosa);

  if(nftAsset == null){
    return(
      <div>
        <h1>404</h1>
      </div>
    )
  }

  return (
    <div style={{ height: '100%' }}>
      <div className={styles.container}>{status === 'loading' && data ? 'Loading' : <Viewpager gamosa = {gamosa} nftAsset = {nftAsset}/>}</div>
    </div>
  )
}


function nft(gamosa){
  switch(gamosa){
    case "101":
      return 478285079;
    case "102":
      return 478285177;
    case "103":
      return 478285263;
    case "104":
      return 478285380;
    case "105":
      return 478285431;
    default:
      return null;
  }
}