import React, { useRef, useState } from 'react'
import { useSprings, animated } from '@react-spring/web'
import useMeasure from 'react-use-measure'
import { useDrag } from 'react-use-gesture'
import clamp from 'lodash.clamp'
import styles from './styles.module.css'

import Viewpager from './components/Viewpager'
import { RiMenu3Fill } from 'react-icons/ri'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function App() {
  return (
    <div style={{ height: '100%' }}>
      <div className={styles.container}>{status === 'loading' && data ? 'Loading' : <Viewpager news={[{}, {}]} />}</div>
    </div>
  )
}
