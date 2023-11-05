import { useEffect, useState } from 'react';
import './Factory.scss'; // Import the CSS file

const Factory = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimate(true);
  }, []);

  return (
    <div className= {`has-animation-factory animation-rtl ${animate ? 'animate-in' : ''}`} data-delay="10">
      <div className='image-container' data-delay="10">
        {/* Your image here */}
      </div>
      <div className='text-container-factory' data-delay="10">
      <p className="factoryText">Merapani Self Help Group Made Your&nbsp;<span className='landingGamosa-birina'>Gamosa</span></p>
        <p className="factoryText-paragraph">Group of self reliant women weavers crafting the culture and pride of Assam in middle of Tea Gardens.</p>
        <button className="red-button">Learn More</button>
      </div>
    </div>
  );
};

export default Factory;
