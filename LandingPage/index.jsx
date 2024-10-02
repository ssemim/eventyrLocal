import React, { useState } from "react"; // eslint-disable-line no-unused-vars
import './index.css';
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
<div className="text-white font-RIDIB font-extrabold text-3xl justify-center text-center h-screen overflow-hidden">

<div className="bg-animation">
					<div id='stars'></div>
					<div id='stars2'></div>
					<div id='stars3'></div>
					<div id='stars4'></div>

      </div>
  
<span className="logo"><Link to="/notice" ><img className="flex flex-col justiyfy-center max-w-[750px] m-auto z-50" id="logo" src="/PROSOTERIA.svg" width="100%"  alt="logo" /></Link></span>


  <p className="text-sm"  id="introText">본 사이트는 1920 x 1080의 PC 버전에 최적화 되어 있으며, 일부 기능은 모바일에서 지원하지 않습니다. <br/> 최초 로드시 시간이 다소 지연 될 수 있습니다. </p>
  

  
  </div>

  



      
    </div>
  );
}

export default LandingPage