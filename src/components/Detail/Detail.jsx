import { useEffect, useState } from 'react';
import './Detail.scss'; // Import the CSS file
import { FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Detail = ({ closeModal, gamosa }) => {
  const [animate, setAnimate] = useState(false);
  const [weaverGamosa, setWeaver] = useState(gamosa.gamosa == 1 ? 'Momi Payeng' : gamosa.gamosa == 2 ? 'Malabika Charo Pegu' : 'Urvashi Pegu');

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
        <img src={`/weaver-gamosa-detail-${gamosa.gamosa}.png`} className="WeaverImage" />
        <p className="detail-birina">{weaverGamosa}</p>
        <div>
        <p className='detail-birina-black'>Weaver, Merapani</p>
        </div>
        <p className='detail-birina-gamosa'>
          {
            gamosa.gamosa == 1 ? "In Majuli, Assam, many locals confronted displacement due to relentless riverbank erosion. Seeking solace in Rampur, Jorhat, these resilient families, especially the women, embarked on a transformative journey. Rooted in tradition, the women turned to the age-old art of weaving Gamosas and Assamese apparels for sustenance. Despite the challenges of displacement, this traditional craft became a symbol of their unwavering spirit and adaptability. Through Gamosa weaving, the women of Rampur not only provided for their families but also preserved a cultural legacy, demonstrating the profound strength and resilience that emerges in the face of adversity. Among these skilled artisans, Momi Payeng stands out as a dedicated weaver in a particular Birina cluster in Rampur, Jorhat." : 
            gamosa.gamosa == 2 ? "Malabika Charah Pegu, a dedicated weaver, dreams to ensure a promising future for her daughter. With a deep-seated desire for self-reliance, Malabika has enrolled her young one in a private school, envisioning a path to educational and personal empowerment. In their pursuit of a sustainable future, Malabika and her family have set their sights on \"Birina Handmade\". Through this venture, they aspire to realize dreams of establishing a steady and reliable source of income in weaving. Birina represents not just a business opportunity but a beacon of hope and empowerment, fostering financial stability and educational avenues for generations to come. Malabika firmly believes that Birina will be the catalyst that will propel them towards achieving these aspirations, bringing prosperity and fulfillment to her family and the community. She heads the Birina cluster in Danichapori, Golaghat as the appointed Secretary of the cluster." :
            
            "In the tranquil hush of 4 AM, Urvashi Pegu springs into action, tackling a myriad of responsibilities that shape her bustling mornings. The day unfurls with her meticulous management of a fishery, where feeding the fish takes precedence. With equal dedication, Urvashi tends to her two pigs and two cows, ensuring their nourishment and well-being. Amidst this chores, Urvashi's focuses seamlessly on her true passion — weaving. As the first rays of dawn kiss the horizon, her skilled hands bring to life intricate flower designs onto mekhelas or gamosas. It's a labor of love that spans 5-7 days, a testament to her dedication and craftsmanship. The threads, under her expert touch, transform into exquisite mekhelas, weaving together a tapestry of tradition, livelihood, and the indomitable spirit of Urvashi Pegu. She leads the Birina cluster in Danichapori, Golaghat, Assam as the Head Weaver."
          }
        </p>
        <button className="weaver-details-button" onClick={goBack}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Detail;
