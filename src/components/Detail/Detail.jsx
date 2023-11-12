import { useEffect, useState } from 'react';
import './Detail.scss'; // Import the CSS file
import { FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Detail = ({ closeModal }) => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const goBack = () => {
    closeModal(); // Close the modal instead of navigating back
  };

  return (
    <div className={`modal`}>
      <div className="modal-content">
        <img src="/Weaver1.jpeg" alt="Weaver1" className="WeaverImage" />
        <p className="detail-birina">Momi Payeng</p>
        <div>
        <p className='detail-birina-black'>Weaver, Merapani</p>
        </div>
        <p className='detail-birina-gamosa'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque consequatur totam nulla fuga laborum numquam
          dolorum non mollitia ea laboriosam a asperiores, temporibus provident accusantium voluptate, vitae sed tempore
          corporis quibusdam. Alias eveniet fugiat, dolorem adipisci incidunt modi ipsum sint, veritatis fugit quisquam
          deleniti sunt dolorum!
        </p>
        <button className="weaver-details-button" onClick={goBack}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Detail;
