import { useEffect, useState } from 'react';
import './Gamosa.scss'; // Import the CSS file

const Landing = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (

    <div className='gamosa-container'>
    <p className="gamosa-h1">In Your Hands You Have</p>
    <p className="gamosa-h2">PHOOLAM GAMOSA</p>
    <p className="gamosa-assamese">ফুলাম গামোচা</p>
    
    </div>
  );
};

export default Landing;
