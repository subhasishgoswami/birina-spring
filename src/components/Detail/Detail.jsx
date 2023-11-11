import { useEffect, useState } from 'react';
import './Detail.scss'; // Import the CSS file
import { FaArrowRight } from 'react-icons/fa';

const Detail = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className={`landing animation-ltr ${animate ? 'animate-in' : ''}`} data-delay="10">
    <div className="text-container">
    <img src= "/Weaver1.jpeg" alt="Weaver1" className="WeaverImage" />
      <p className="landing-container">Momi Payeng</p>
      <p className='landing-birina'>Weaver, Merapani</p>
      <p className='landing-swipe'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque consequatur totam nulla fuga laborum numquam dolorum non mollitia ea laboriosam a asperiores, temporibus provident accusantium voluptate, vitae sed tempore corporis quibusdam. Alias eveniet fugiat, dolorem adipisci incidunt modi ipsum sint, veritatis fugit quisquam deleniti sunt dolorum! </p>
      <FaArrowRight />
    </div>
    </div>
  );
};

export default Detail;