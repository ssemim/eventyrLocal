import React from "react";  // eslint-disable-line no-unused-vars
import './App.css'
import { Route,Routes } from 'react-router-dom'


import { Outlet } from 'react-router-dom' // 가상 돔 

import LandingPage from './pages/LandingPage' //랜딩페이지
import LoginPage from './pages/LoginPage' // 로그인 페이지
import RegisterPage from './pages/RegisterPage'//회원가입 페이지 
// import Navbar from './layout/Navbar/Sections/NavItem' // 상단 메뉴


import StoryCarousel from "./pages/StoryNotice"; // 세계관 페이지 
import MapPage from './pages/MapPage' // 대륙지도
import Dialog from './pages/WeeklyMission' // 주간미션
import SAGONGSAPage from "./pages/404Page"; //404 페이지0
import Chessboard from "./pages/ChessBoard"; //전술전 가이드
import Academy from "./pages/AcademyMap"; //아카데미 지도
import CaroselPage from "./pages/CaroselPage";
import ShopPage from "./pages/ItemShop"; // 샤샤 상점
import NoticeCarousel from "./pages/ClothesNotice"; // 교복 공지
import GuidePage from "./pages/GuideNotice"; // 교복 공지
import MyPage from "./pages/MyPage";
import EntireBookPage from "./pages/BookLibrary";


function Layout(){
 
return(
  
<div className='flex flex-col justify-between h-100vh bg-backGroundBlack'>
 
  <div className='flex flex-col  justify-between h-100vh bg-gradient-to-t from-backGroundGradientGray to-transparent'>
<main>
  <Outlet/>
</main>
</div>
</div>
);

}


function clickEffect(e){
  var d=document.createElement("div");
  d.className="clickEffect";
  d.style.top=e.clientY+"px";d.style.left=e.clientX+"px";
  document.body.appendChild(d);
  d.addEventListener('animationend',function(){d.parentElement.removeChild(d);}.bind(this));
  }
  document.addEventListener('click',clickEffect);



function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<LandingPage/>} />

        <Route path="/notice" element={<CaroselPage/>} />
        <Route path="/story" element={<StoryCarousel/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/worldmap" element={<MapPage/>} />
        <Route path="/weeklyMission" element={<Dialog/>} />
        <Route path="/academyMap" element={<Academy/>} />
        <Route path="/uniform" element={<NoticeCarousel/>} />
        <Route path="/guideB" element={<Chessboard/>} />
        <Route path="/guideA" element={<GuidePage/>} />
        <Route path="/YourStory" element={<EntireBookPage/>} />
        <Route path="/shop" element={<ShopPage/>}/>
  
        <Route path="/*" element={<SAGONGSAPage/>} />
        <Route path="/mypage" element={<MyPage/>} />

      </Route>
    </Routes>
   
  )
}

export default App
