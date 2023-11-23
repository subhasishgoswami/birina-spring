import React, { useRef } from 'react'
import { useSprings, animated } from '@react-spring/web'
import useMeasure from 'react-use-measure'
import { useDrag } from 'react-use-gesture'
import clamp from 'lodash.clamp'

import styles from '../styles.module.css'
import Gamosa from './Gamosa/Gamosa'
import Landing from './landing/Landing'
import Location from './Location/Map'
import NFT from './NFT/NFT'
import Weaver from './Weaver/Weaver'
import GamosaNFT from './GamosaNFT/GamosaNFT'
import Ending from './Ending/Ending'

function Viewpager(gamosa) {
  const index = useRef(0)
  const [ref, { width }] = useMeasure()
  const Pages = [<Landing />, <Gamosa />, <Location location= {gamosa}/>, <Weaver gamosa= {gamosa.weaver}/>, <NFT  gamosa= {gamosa}/>, <Ending/>]
  const [props, api] = useSprings(
    Pages.length,
    i => ({
      x: i * width,
      scale: width === 0 ? 0 : 1,
      display: 'block',
    }),
    [width]
  )
  const bind = useDrag(({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
    if (active && distance > width / 3) {
      index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, Pages.length - 1)
      cancel()
    }
    api.start(i => {
      if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
      const x = (i - index.current) * width + (active ? mx : 0)
      const scale = active ? 1 - distance / width / 2 : 1
      return { x, scale, display: 'block' }
    })
  })
  return (
    <div ref={ref} className={styles.wrapper}>
      {props.map(({ x, display, scale }, i) => (
        <animated.div className={styles.page} {...bind()} key={i} style={{ display, x }}>
          <animated.div style={{ scale }}>
           {Pages[i]}
          </animated.div>
        </animated.div>
      ))}
    </div>
  )
}

export default Viewpager