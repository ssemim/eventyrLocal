import React, { useState } from "react"; // eslint-disable-line no-unused-vars
import MapData from './MapData';
import { Link } from "react-router-dom";
import logo from '../../assets/img/notice/whiteLogo.png'


import box1 from '../../assets/img/notice/box1.png'
import box2 from '../../assets/img/notice/box2.png'
import noMobile from '../../assets/img/notice/noMobile.png'

import worldmap from '../../assets/img/notice/Map.png'
import mappaper from '../../assets/img/notice/MapPaper.jpg'


import { PlayerState, useYoutube } from "react-youtube-music-player";
import {
  IoPause,
  IoPlay,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoStop,
  IoVolumeHigh,
  IoVolumeMedium,
  IoVolumeLow,
  IoVolumeMute
} from "react-icons/io5";

import {
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
} from "tw-elements-react";



import './map.css'



function Map() {

  let [Area,AreaChange] = useState(0); //지역 전환용 스테이트
  const [showModalXL, setShowModalXL] = useState(false); //모달 존니큰거 

    return (


  
      <div className='AcademyMap'><img src={worldmap} width="100%" alt='academyMap'/>
          <Link to="/notice"> <div className="absolute top-0 left-2.5 h-40 w-40 z-10 ml-2 mt-2 text-backGroundBlue"><img className='logoClick' src={logo} alt='이미지 로드 오류'></img></div> </Link>
          <div className="NoMobile"><img className="min-h-screen"  src={noMobile} alt='error' />   </div>
          <Link to="/story"><img className="max-w-72 " id='worldtext'  src={box1} alt='error' /></Link>
          <Link to="/academyMap"><img className="max-w-72" src={box2} alt='error' /></Link>
<ModalForMap/> 
    </div>




    );




function ModalForMap(){

  function BGM(){ //브금용 함수 시작 
    const { playerDetails, actions } = useYoutube({
      id: MapData[Area].BGMURL,
      type: "playlist"
    });
  
    const renderVolumeIcon = () => {
      if (playerDetails.volume === 0) {
        return <IoVolumeMute />;
      }
      if (playerDetails.volume <= 30) {
        return <IoVolumeLow />;
      }
      if (playerDetails.volume <= 60) {
        return <IoVolumeMedium />;
      }
      return <IoVolumeHigh />;
    };
  
    return (
      <div className="justiyfy-center max-w-[120px]">
        <div className="video-title" style={{fontWeight:"bold"}}>{playerDetails.title}</div>
        <div className="player-controls">
          <button onClick={actions.previousVideo} style={{backgroundColor: "transparent", border:"none"}}>
            <IoPlaySkipBack />
          </button>
          {playerDetails.state === PlayerState.PLAYING ? (
            <button className="emphasised" onClick={actions.pauseVideo} style={{backgroundColor: "transparent", border:"none"}}>
              <IoPause />
            </button>
          ) : (
            <button className="emphasised" onClick={actions.playVideo} style={{backgroundColor: "transparent", border:"none"}}>
              <IoPlay />
            </button>
          )}
          <button onClick={actions.stopVideo} style={{backgroundColor: "transparent", border:"none"}}>
            <IoStop />
          </button>
          <button onClick={actions.nextVideo} style={{backgroundColor: "transparent", border:"none"}}>
            <IoPlaySkipForward />
          </button>

        </div>
        <div className='volume-control' style={{verticalAlign:'baseline', display:'inline-flex', marginLeft:'-10%'}}>
            {renderVolumeIcon()}
            <input className='volume' 
              type="range"
              value={playerDetails.volume ?? 0}
              min={0}
              max={100}
              onChange={(event) => actions.setVolume(event.target.valueAsNumber)}
            />
         </div>
      </div>
    );
    
  } //브금용 함수 끝

return (
  <div>
<button className='MapArea0' onClick={() => (AreaChange(0),setShowModalXL(true))}></button>
<button className='MapArea1' onClick={() => (AreaChange(1),setShowModalXL(true))}></button>
<button className='MapArea2' onClick={() => (AreaChange(2),setShowModalXL(true))}></button>
<button className='MapArea3' onClick={() => (AreaChange(3),setShowModalXL(true))}></button>
<button className='MapArea4' onClick={() => (AreaChange(4),setShowModalXL(true))}></button>
<button className='MapArea5' onClick={() => (AreaChange(5),setShowModalXL(true))}></button>
<button className='MapArea6' onClick={() => (AreaChange(6),setShowModalXL(true))}></button>


    {/* <!--Extra large modal-->*/}
    <TEModal show={showModalXL} setShow={setShowModalXL}>
        <TEModalDialog size="xl">
          <TEModalContent className="bg-cover bg-no-repeat" style={{ backgroundImage: `url(${mappaper})`}}>
          <div className="absolute top-0 right-10"><img src= {MapData[Area].logoURL} alt="로고 이미지 로드 오류"/></div>

            <TEModalHeader style={{borderBottomWidth:0}}>
              {/* <!--Modal title--> */}
              <h1 className="text-4xl font-SANHA font-semibold">
              &nbsp;{MapData[Area].title}
              </h1>

              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModalXL(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody> 
            
           
              <h3 className="font-RIDIB text-2xl font-normal">&nbsp;&nbsp;&nbsp;{MapData[Area].catchphrase}</h3>
              <p className="font-RIDIB text-xl font-medium">&nbsp;&nbsp;&nbsp;&nbsp;{MapData[Area].content}</p><div className="BGM" style={{float:'inline-end',textAlign:'center', marginRight:'10%', marginTop:'-10%'}}><BGM/></div> 
              <div className='mr-80 ml-10 float-left font-RIDIB text-base'>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
       <h6 className='FormerText leading-6' style={{fontStyle:"italic"}}>{MapData[Area].text2}</h6> 
       <p className='leading-6'>{MapData[Area].text}</p> 
       <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
       <p className='leading-6'>{MapData[Area].text3}</p> 
       <p className='leading-6'>{MapData[Area].text4}</p> 
       <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
       </div>

            
            </TEModalBody>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>




</div>
)

} //모달 반환용 함수 끝

} //맵 함수 끝 

export default Map;