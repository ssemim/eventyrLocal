
import React, { useState,useEffect } from 'react';  // eslint-disable-line no-unused-vars
import Typed from 'typed.js';
import { Link } from 'react-router-dom'
import next2 from '../../assets/img/notice/next2.png'
import logo from '../../assets/img/notice/navylogo.png'


import storyBack from '../../assets/img/notice/storyBack.jpg'

import './index.css'

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


function BGM(){ //브금용 함수 시작 
  const { playerDetails, actions } = useYoutube({
    id: "PLC6iDILEa4mq0mCU5l6UsXBtsNJ5cCLzl",
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
    <div className="max-w-[480px] flex flex-wrap flex-col" style={{alignItems:"end"}}>
      <div className="video-title text-lg" style={{fontWeight:"bold"}}>{playerDetails.title}<br/></div>
  
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


// function ClickToWorld(e){
//   e.preventDefault();
//   window.location.href='https://docs.google.com/document/d/11J-_mNMFeHVnU_0HXWMUmCMplaKnMRnitugUozxr1Wk/edit?usp=sharing'}
 
function StoryCarousel() {

  let [count, setCount] = useState(0)
  let [Text, setText] = useState([  // eslint-disable-line no-unused-vars
    'Ⅰ. Eventyr : 이븐디알 <br/> <br/> 아주 오래전부터 동화가 살아 인간을 사랑한 땅, 태어난 이 누구든 사랑받는 곳 프로테스가 있었다. 아름답고 평화로운 대륙, 오로지 기쁨만이 존재하는 낙원. 이곳의 유일한 국가가 동화의 나라 이븐디알이었다. 동화에게 사랑받는 프로테스인이 마수와의 오랜 전쟁 끝에 승리해 건국하였다. <br/><br/><br/> Ⅱ. 프로테스 : 동화의 축복이 내려지는 유일한 대륙 <br/> <br/> 모든 사람이 동화의 축복을 받는 땅이자 동화의 절망인 마수가 함께 살아가는 땅. 대륙 프로테스라 칭하며 언제부터 존재했는지 인간의 손으로 그 역사를 추산할 수 없을 정도로 오랜 세월 존재했다. 현재로서는 제국 이븐디알이 전역을 지배하며, 북부의 롬스타틴과 시네스토, 서부의 리드에프턴과 뮤테스, 동부의 오플로트와 헤브니센 남부의 수도 켈메스까지 총 7개 지역으로 구분한다. <br/><br/><br/> Ⅲ. 이븐디알 <br/><br/> 현재 건국 174주년이자 대륙력 174년을 맞이하고 있으며 이븐디알 건국을 기점으로 정해진 대륙력을 사용하는 프로테스의 유일 국가. <br/> 모든 인간이 동화의 축복을 받으며 마수가 날뛰던 땅 프로테스에서 마수를 몰아내는 백년 전쟁 끝에 프로테스를 되찾은 영웅 켈시온 이븐디알과 울디안 이븐디알이 건국하였다. 이븐디알의 사람들은 누구나 다섯살이 되는 해 자신을 사랑하는 동화의 꿈을 꾸며 자신을 축복하는 동화 속 존재를 알고, 자신에게 동화의 축복이 깃들었음을 배운다.',
    'Ⅳ. 피르튀엣 : <br/><br/>「피르튀엣, 쉬지 않고 불씨가 튀기는 부싯돌. 동화의 축복을 받은 이븐디알의 인간은 누구나 동화의 힘을 사용할 수 있었지만 <br/> 누구나 그토록 쉬지않고 반짝이진 못했습니다.  동화의 축복 중에서도 특히 반짝이는 것, 열렬하게 사랑받아 강렬하게 빛나는 것.  <br/>  그런 것들을 프로테스의 인간은 피르튀엣이라고 불렀습니다. 어느 누구보다 강한 능력을, 넘치는 동화의 축복을 타고난 인간을,  <br/>  이븐디알은 동화의 불씨에서 이름을 따 피르튀엣이라 칭했습니다.」 <br/> <br/>  대표적으로는 현 제국 이븐디알의 황제이자 시황제인 켈시온 이븐디알과 울디안 이븐디알이 있으며, <br/> 보편적으로는 미약하게 드러나는 것에 그치는 동화의 능력을 누구보다 강하게 사용할 잠재력을 타고난 존재를 피르튀엣이라 총칭한다. <br/> 다섯 살이 되는 해 눈동자가 피르튀엣마다 다른 이채로 타오르며, 그 후에도 능력을 한계치에 다다를 정도로 사용할 경우 독특한 빛으로 타오르는 것이 있다. 갈고닦기 전에는 보통 사람보다 못한 경우도 적지 않은 능력이지만 그 잠재력만큼은 거대하다. <br/><br/> 말하자면 이븐디알의 불씨. 능력의 결정체가 박힌 원석. <br/><br/> 피르튀엣은 능력이 크게 자라나는 15-17세 즈음 능력의 성장기를 겪으며, <br/> 이 시기에는 알 수 없는 열병에 시달리거나 악몽, 환각, 환청 등에 시달리기도 한다.  심한 경우 능력의 폭주나, 일시적인 말소 현상을 겪는다. <br/> 이를 겪지 않고 자연스럽게 성장하는 경우도 더러 있지만 보통은 1-2주 가량의 성장기 끝에 큰 폭으로 능력이 성장하며, 이 시기 피르튀엣은 다섯살이 되던 해와 같이 눈이 이채로 반짝인다. ' ,
    'Ⅴ. 아카데미 : <br/><br/>  모든 인간이 동화의 사랑을 받는 만큼 특별한 능력을 지니고 있다. 대개 사소한 이능력에 그치나 능력의 잠재력이 뛰어난 이들이 존재하는데, <br/>  이들을 ‘피르튀엣’이라고 지칭한다. 이러한 피르튀엣이 자신의 잠재력을 키우고 올바른 방향으로 성장할 수 있도록 아카데미를 설립했으니, 이를 라딕스라 부른다.  <br/> <br/><br/> <I> 「 ⋯ 동화의 축복을 받은 유일한 대륙이었음에도 이븐디알이 건국되기 전 사람들은 행복하지 않았습니다. 프로테스에는 이렇다 할 나라조차 없었습니다. <br/> 고작해야 마을과 마을 부족과 부족만이 있었습니다. 동화가 살아 숨쉬는 땅 프로테스에는 동화의 악의 또한 살아서 날뛰었기 때문에. <br/> 누군가는 그것을 인간을 사랑하지 않기로 택한 동화의 악의라고 말했습니다. 누군가는 동화가 아닌 프로테스의 그림자라고 말했습니다. <br/>  프로테스 고유의 재해라고 말하는 이들도 있었으나 공통적으로 그것이 프로테스의 재앙임에는 이의없이 고개를 끄덕였습니다. <br/><br/> 프로테스 고유의 재해, 마수. <br/> <br/>지느러미 달린 하반신과 인간의 몸으로 짐승을 닮은 육체로 연기와 모래로 손에 잡히지 않는 움직임으로 인간을 망가트리는 존재. <br/> 그들은 손쉽게 인간을 망가트렸습니다. 그러나 동화가, 더없이 인간을 사랑한 동화가 자신의 힘을 축복으로 내렸습니다. <br/>  내려진 축복은 인간으로 하여금 동화의 힘을 쓸 수 있게 했고 그 힘으로 인간들은 마수와 맞서 싸웠습니다. 싸우고 또 싸우고, 죽이고 죽임당하는 오랜 전쟁 끝에 이븐디알의 백년전쟁은 인간의 승리로 끝날 수 있었습니다. <br/><br/>  동화의 사랑과 가호와 두 영웅의 덕분에. ⋯ 」  </I>  <br/><br/> ' +"           " +'- 제국 역사서 엘라인델 중',
  
  ]);

  
  const el = React.useRef(null);


  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [Text[count]],
      typeSpeed: 15,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();

    };
  }, [count]);


  

  return (

        <div>

         

 
   
    <div className="w-12/12 min-h-screen mx-auto  font-RIDIB text-2xl bg-no-repeat bg-cover" style={{textAlign:'left', paddingLeft:"4%",paddingRight:"4%",  backgroundImage: `url(${storyBack})`}}>
   <Link to="/notice"> <div className="absolute top-0 left-2.5 h-40 w-40 z-10 ml-8 mt-4"><img className='logoClick' src={logo} alt='이미지 로드 오류'></img></div> </Link>
   <div className="absolute top-10 right-24 h-24 w-96 z-10 ml-8 mt-4"><BGM/></div>
<div className='pt-48'> <span className='text-black' ref={el} /></div>
     
      
      </div>

    <div className="absolute bottom-0 right-10 h-24 w-24 z-10">
    <img src={next2} width="50%" id='next' onClick={()=>{if(count<2){setCount(count+1)} else{setCount(0)} }}
    style={{cursor: 'pointer', marginRight:'100%'}} alt='이미지 로드 오류'/>
     </div>
  

    </div>


  );
}

export default StoryCarousel;