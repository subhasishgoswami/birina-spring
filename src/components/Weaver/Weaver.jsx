import { useEffect, useState } from 'react';
import './Weaver.scss';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Detail from '../Detail/Detail';
import { Link } from 'react-router-dom';



const Weaver = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <>
    
<Router>
    <Routes>
        <Route path="/detail" element={<Detail/>}> </Route>
    </Routes>
    <div className='weaver-container'>
    <img src="./momi-payeng-card.png" className="weaver-box" />
    <p className="weaver-send">Momi Payeng</p>
    <p className="weaver">Your Weaver</p>
    <Link to ="/detail">
    <button className='weaver-button'>Know More About Her</button>
    </Link>
    
   
    </div>
    </Router>
    </>
  );
};

export default Weaver;