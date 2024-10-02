/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import './index.css';

import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import { Flipper, Flipped } from 'react-flip-toolkit'


import { GiDaggers } from "react-icons/gi";
import { GiDaggerRose } from "react-icons/gi";
import { GiDreamCatcher } from "react-icons/gi";

import storyBack from '../../assets/img/notice/storyBack.jpg'
import storyBack2 from '../../assets/img/notice/storybg2.png'

import { Link } from 'react-router-dom'
import logo from '../../assets/img/notice/navylogo.png'

import tanker from '../../assets/img/notice/T(1).png'
import dealer from '../../assets/img/notice/D.png'
import supporter from '../../assets/img/notice/S.png'

import tempHale from '../../assets/img/notice/4042.png'

function GuidePage(){

    
const Square = ({ toggleFullScreen }) => (
    <Flipped flipId="square">
      <div className="py-40 px-36 cursor-pointer font-LightB" onClick={toggleFullScreen}>
      <GiDreamCatcher size={150}/>
      <br/>
     포지션
     </div>
    </Flipped>
  )
  


    const FullScreenSquare = ({ toggleFullScreen }) => (
        <Flipped flipId="square">
          <div className="full-screen-square bg-no-repeat bg-cover bg-center" onClick={toggleFullScreen}  style={{ backgroundImage: `url(${storyBack2})`}}>

          <br/>
           <br/>

           <span className='font-LightB text-4xl'>포지션 안내</span>

           <br/>
           <br/>

           <div className="grid grid-cols-3 gap-2">
  <div className='px-10'>
    <img src={tanker} alt='error' width='100%'></img>
  <p className='text-xl'> [ 알리운드 / 탱커 ] <br/> 지키고 수호하는 능력 <br/><br/>  </p> <p className='text-sm'> 공격을 유도하여 막아내고 반격하는 것에 특화된 능력을 가지는 자. </p>
  <p className='text-sm'> 단체 전투시 별도의 구분 없이 단일 포지션으로 진행됩니다.</p>
  </div>
  <div  className='px-10'>
  <img src={dealer} alt='error' width='100%'></img>
  <p className='text-xl'> [ 네비기아 / 딜러 ] <br/> 피해를 입히기에 가장 용이한 능력 <br/> <br/> </p> <p className='text-sm'>상처 입히고 죽이는 것에 특화된 능력을 가지는 자.</p>
  <p className='text-sm'> 단체 전투시 근거리 / 원거리로 구분되며, <br/> 해당 사항은 자유롭게 선택이 가능합니다. </p>
  </div>
  <div  className='px-10'>
  <img src={supporter} alt='error' width='100%'></img>
  <p className='text-xl'> [ 오브린 / 서포터 ] <br/> 공방에 국한되지 않은 능력 <br/><br/>  </p> <p className='text-sm'> 공방보다 더욱 넓은 방향에서 발현해 <br/> 다양하고 예측할 수 없는 양상을 보이는 능력을 가지는 자.</p>
  <p className='text-sm'> 단체 전투시 힐러 / 버퍼로 구분되며, 해당 사항은 자유롭게 선택이 가능합니다. </p>
  </div>
</div>


           <p className='text-lg'> <br/> <br/> 포지션별 특성은 단체 전투 및 단체 조사 시에만 적용되며, 개인 전투 및 조사에서는 적용되지 않습니다.</p>
          </div>
        </Flipped>
      )
      

    const [fullScreen, setFullScreen] = useState(false)
    const toggleFullScreen = () => setFullScreen(prevState => !prevState)


//2번 버튼


    const Square1 = ({ toggleFullScreen1 }) => (
      <Flipped flipId="square">
        <div className="py-40 px-36 cursor-pointer font-LightB" onClick={toggleFullScreen1}>
        <GiDaggerRose size={150}/>
        <br/>
      개인전투
        </div>
      </Flipped>
    )
    
  
  
      const FullScreenSquare1 = ({ toggleFullScreen1 }) => (
          <Flipped flipId="square">
                 <div className="full-screen-square bg-no-repeat bg-cover bg-center" onClick={toggleFullScreen1}  style={{ backgroundImage: `url(${storyBack2})`}}>
  
                 <br/>
                 <br/>
         
                 <span className='font-LightB text-4xl'> 개인 전투 시스템 안내 </span>

          <img className="Hale temp" src={tempHale} alt='로드 오류'></img>

합격 발표 이후 공개 됩니다.

  
            </div>
          </Flipped>
        )
        
  
      const [fullScreen1, setFullScreen1] = useState(false)
      const toggleFullScreen1 = () => setFullScreen1(prevState => !prevState)


      //3번 버튼


    const Square2 = ({ toggleFullScreen2 }) => (
      <Flipped flipId="square">
       <div className="py-40 px-36 cursor-pointer font-LightB" onClick={toggleFullScreen2}>
       <GiDaggers size={150}/>
       <br/>
     단체 전투
        </div>
      </Flipped>
    )
    
  
  
      const FullScreenSquare2 = ({ toggleFullScreen2 }) => (
          <Flipped flipId="square">
                 <div className="full-screen-square bg-no-repeat bg-cover bg-center" onClick={toggleFullScreen2}  style={{ backgroundImage: `url(${storyBack2})`}}>
  
                 <br/>
  
        
                 <span className='font-LightB text-4xl'>  단체 전투 시스템 안내 </span>
  
          <img className="Hale temp" src={tempHale} alt='로드 오류'></img>

          합격 발표 이후 공개 됩니다.

            </div>
          </Flipped>
        )
        
  
      const [fullScreen2, setFullScreen2] = useState(false)
      const toggleFullScreen2 = () => setFullScreen2(prevState => !prevState)

    return(
    
    <div className=" w-12/12 flex flex-col justiyfy-center bg-no-repeat bg-cover m-auto"  style={{ backgroundImage: `url(${storyBack})`}}>
        
        <Link to="/notice"> <div className="absolute top-0 left-2.5 h-40 w-40 z-10 ml-8 mt-4"><img className='logoClick' src={logo} alt='이미지 로드 오류'></img></div> </Link>
   
   <div className="grid grid-cols-3 place-self-center gap-16 min-h-screen m-auto text-4xl font-RIDIB text-center py-40">

<div>
      <Flipper flipKey={fullScreen} >
        {fullScreen ? (
          <FullScreenSquare toggleFullScreen={toggleFullScreen} />
        ) : (
          <Square toggleFullScreen={toggleFullScreen} />
        )}
      </Flipper>
      </div>

      <div>

      <Flipper flipKey={fullScreen1}>
        {fullScreen1 ? (
          <FullScreenSquare1 toggleFullScreen1={toggleFullScreen1} />
        ) : (
          <Square1 toggleFullScreen1={toggleFullScreen1} />
        )}
      </Flipper>

</div>
    
<div>
      <Flipper flipKey={fullScreen2}>
        {fullScreen2 ? (
          <FullScreenSquare2 toggleFullScreen2={toggleFullScreen2} />
        ) : (
          <Square2 toggleFullScreen2={toggleFullScreen2} />
        )}
      </Flipper>


      </div>


</div>
<p className='text-sm sticky bottom-0 text-center font-RIDIB'>포지션 로고 및 아카데미 로고는 (@ONyoo100)님께서 수고해 주셨습니다.</p>
</div>
    
    
    ); 
      }

      export default GuidePage