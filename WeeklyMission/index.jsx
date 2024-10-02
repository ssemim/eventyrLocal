/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState,useEffect } from 'react';  // eslint-disable-line no-unused-vars
import Typed from 'typed.js';
import next from '../../assets/img/notice/next.png';
import { Link } from 'react-router-dom'
import logo from '../../assets/img/weeklyMission/logoPink.png'

import Dbox from '../../assets/img/weeklyMission/Dialog-Box.png'


// 아래로 샤샤 얼굴 모음집 

import smile from '../../assets/img/weeklyMission/EP1Intro.png'
import angry from '../../assets/img/weeklyMission/ShashaAngry.gif'
import talking from '../../assets/img/weeklyMission/ShashaTalk.gif'
import blinking from '../../assets/img/weeklyMission/ShashaBlink.gif'

import EPOne1 from '../../assets/img/weeklyMission/EP1Intro.png'



//샤샤 모음집 끝 



function Dialog() {

  let [count, setCount] = useState(0)
  let [Text, setText] = useState([  // eslint-disable-line no-unused-vars
    '아직 준비가 덜 됐다는 것이야. \n 아무리 아카데미 학생이라지만 허락도 안받고 들어오면 혼날 줄 알란 것이야.',
    '그렇게 쳐다본다고 해서 여기 있어도 된다고 해 줄 것 같냐는 것이야? 썩 물러가라는 것이야.',
    '나가',
    '...',
    '...',
    '뭘 보냐는 것이야? 그렇게 봐도 아무것도 없다는 것이야.',
    '...',
    '...흥'
  ]);
  

  let [image, setImage] = useState([  // eslint-disable-line no-unused-vars
  talking, //1번째 문장의 얼굴 
  talking,//2번째 문장의 얼굴 
  talking, //3번째 문장의 얼굴 
  blinking, //4번째 문장의 얼굴 
  blinking, //5번째 문장의 얼굴 
  talking, //6번째 문장의 얼굴 
  blinking, //7번째 문장의 얼굴 
  blinking, //8번째 문장의 얼굴 


  ]);

  
  const el = React.useRef(null);


  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [Text[count]],
      typeSpeed: 40,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();

    };
  }, [count]);

  return (

        <div>

          

 <img className=' w-12/12 min-h-screen bg-no-repeat bg-cover' src={image[count]} width="100%"  alt='이미지 로드 오류'/>

 <Link to="/notice"> <div className="absolute top-0 left-2.5 h-40 w-40 z-10 ml-2 mt-4"><img className='logoClick' src={logo} alt='이미지 로드 오류'></img></div> </Link>

  <img className=" absolute bottom-0 w-12/12 px-10  m-auto" src={Dbox} width="100%" alt='이미지 로드 오류' />
   
   
    <div className="absolute bottom-64 left-56 w-12/12 font-DUNGGUNMO text-2xl" style={{textAlign:'left', paddingLeft:"4%",paddingRight:"4%"}}><span ref={el} /></div>

    <img className="absolute bottom-16 h-16 w-16 z-10 right-48" src={next} id='next' width="30%" onClick={()=>{if(count<7){setCount(count+1)} else{setCount(0)} }}
    style={{cursor: 'pointer'}} alt='이미지 로드 오류'/>
  

  

    </div>
   
   );
}

export default Dialog;