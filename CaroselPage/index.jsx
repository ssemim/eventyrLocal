

import React, { useState } from "react"; // eslint-disable-line no-unused-vars
import Navbar from '../../layout/Navbar/index.jsx';
import './index.css';
import { useNavigate } from 'react-router-dom';


import menu1 from '../../assets/img/menu/menu1.png'
import menu2 from '../../assets/img/menu/menu2.png'
import menu3 from '../../assets/img/menu/menu3.png'
import menu4 from '../../assets/img/menu/menu4.jpg'
import menu5 from '../../assets/img/menu/menu5.png'
import menu6 from '../../assets/img/menu/menu6.png'

const CaroselPage = () => {

  const navigate = useNavigate();

  const worldmap = () => {
    navigate('/worldmap');
  };

  const guide = () => {
    navigate('/guideA');
  };


  const uniform = () => {
    navigate('/uniform');
  };

  const weekly = () => {
    navigate('/weeklyMission');
  };


  const shop = () => {
    navigate('/shop');
  };

  const mypage = () => {
    navigate('/mypage');
  };



  return (

<div>

<div className="bg-animation">
					<div id='stars'></div>
					<div id='stars2'></div>
					<div id='stars3'></div>
					<div id='stars4'></div>

      </div>
      
<Navbar/>


  <div className="card-grid px-32 mt-12 mb-12 pt-20 text-center font-RIDIB z-10 relative">

<a className="card" onClick={worldmap}>
    <div className="card__background" style={{backgroundImage:`url(${menu1})`}} ></div>
      <div className="card__content">
        <p className="card__category"><br/><br/>ProSoteria</p>
        <h3 className="card__heading"><br/><br/> 세계관 </h3>
        
      </div>
    </a>
    

  
    <a className="card" onClick={guide}>
      <div className="card__background" style={{backgroundImage:`url(${menu2})`}}></div>
      <div className="card__content">
        <p className="card__category"><br/><br/>ProSoteria</p>
        <h3 className="card__heading"><br/><br/>가이드</h3>
        
      </div>
    </a>




    <a className="card" onClick={uniform}>
      <div className="card__background" style={{backgroundImage:`url(${menu3})`}}></div>
      <div className="card__content">
        <p className="card__category"><br/><br/>ProSoteria</p>
        <h3 className="card__heading"><br/><br/> 지정복</h3>
        
      </div>
    </a>



 
    <a className="card" onClick={weekly}>
      <div className="card__background" style={{backgroundImage:`url(${menu4})`}}></div>
      <div className="card__content">
        <p className="card__category"><br/><br/>ProSoteria</p>
        <h3 className="card__heading"><br/><br/> 주간미션 </h3>
        
      </div>
    </a>



    <a className="card" onClick={shop}>
      <div className="card__background" style={{backgroundImage:`url(${menu5})`}}></div>
      <div className="card__content">
        <p className="card__category"><br/><br/>ProSoteria</p>
        <h3 className="card__heading"><br/><br/> 상점 </h3>
        
      </div>
    </a>

    <a className="card" onClick={mypage}>
      <div className="card__background" style={{backgroundImage:`url(${menu6})`}}></div>
      <div className="card__content">
        <p className="card__category"><br/><br/>ProSoteria</p>
        <h3 className="card__heading"><br/><br/> 캐릭터 </h3> 
        
      </div>
    </a>



  </div>

</div>
 
  );
}

export default CaroselPage