import './index.css';
import hale from '../../assets/img/notice/404.png'
import Typed from 'typed.js';
import React  from 'react';  // eslint-disable-line no-unused-vars
import { useNavigate } from "react-router-dom";


import storyBack from '../../assets/img/notice/storyBack.jpg'


function SAGONGSAPage(){


    const navigate = useNavigate();
    const goToMain = () => {
      navigate("/");
    }
    
    
    const el = React.useRef(null);

    React.useEffect(() => {
      const typed = new Typed(el.current, {
        strings: ['<i>404</i> PAGE NOT FOUND', '잘못된 접근입니다. <br/><br/><br/><br/> 클릭하여 메인으로 ▶ '],
        typeSpeed: 50,
      });
  
      return () => {
        // Destroy Typed instance during cleanup to stop animation
        typed.destroy();
      };
    }, []);
  



    return(
    
    <div className="SAGONGSAcontainer w-12/12 min-h-screen bg-no-repeat bg-cover"  style={{ backgroundImage: `url(${storyBack})`}}>
     <span className='text-black text-8xl font-RIDIB absolute mt-48 ml-48' ref={el} />
    <img className="SpnningGONGSA" src={hale} width="20%" alt='error' onClick={()=>(goToMain())} ></img>
    
    </div>
    
    
    ); 
    
    
    
    }
    export default SAGONGSAPage;