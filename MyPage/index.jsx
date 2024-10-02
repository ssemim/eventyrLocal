/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */

import './index.css';
import React, { useEffect }  from 'react'; 

import { useState } from 'react'; // eslint-disable-line no-unused-vars
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/img/notice/navylogo.png'
import storyBack from '../../assets/img/notice/storyBack.jpg'
import storyBack4 from '../../assets/img/notice/storybg4.png'
import academyLogo from '../../assets/img/notice/AcademyLogo.png'
import usedWell from '../../assets/img/notice/usedItem.png'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import data from './ItemData.js';
import badgedata from './BadgeData.js';

import {
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
} from "tw-elements-react";


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
import axios from 'axios';

import BeatLoader from "react-spinners/BeatLoader";


function MyPage(){ //마이 페이지 본 페이지 함수

  let [itemData] = useState(data); //아이템 함수 출력
  let [badgeData] = useState(badgedata); //아이템 함수 출력
  
  const [auth, setAuth] = useState(false); //인증 관리용 스테이트 
  const [message, setMessage] =useState('') // 오류 메시지 저장용

  const [name, setName] =useState('') // 캐릭터 이름 
  const [position, setPosition] =useState('') //포지션 
  const [oc_img, setOc_img] =useState('') // 이미지 세팅
  const [heart, setHeart] =useState('') // 스텟 세팅
  const [stat, setStat] =useState('') // 스텟 세팅
  const [rank, setRank] =useState('')  //랭크 세팅 
  const [point, setPoint] =useState(0) // 보유 포인트 세팅

const[badgeList,setBadgeList]=useState('') // 보유 뱃지 세팅
const[friends,setFriends]=useState('')//텍관 목록 세팅

const[inventory,setInventory]=useState([])//인벤토리 세팅
const[usedinventory,setUsedInventory]=useState([])// 사용내역 인벤토리 세팅

  const [secretCount, setSecretCount] =useState('') // 보유 기밀 수 세팅
  const [music, setMusic] =useState('') // 플레이 리스트

  const [showModalXL, setShowModalXL] = useState(false); //아이템 사용내역 보여주는 모달
  const [showModal, setShowModal] = useState(false); //아이템 개별 사용 보여주는 모달

  const [usingItem, setUsingItem] = useState({
    originNum:'', //고유번호
    productName:'',//아이템이름
    whendidyouB:'',//구매한 시간
    howmanyleft:0//고유번호 재고
  }); //아이템 사용 할 때 클릭한 아이템 정보 받아오는 배열 

  const [loading, setLoading]= useState(false) // 로딩창
  const [miniloading, setMiniLoading]= useState(false) // 미니로딩창
  const [buyImg,setBuyImg]=useState(usedWell); //사용완료도장!



  axios.defaults.withCredentials = true;

  useEffect(()=>{ //로딩 세팅 함수
    setLoading(true)
    axios.get('http://localhost:8081/mypage')
    .then(res => {
      if(res.data.Status === "Success"){
        setAuth(true)
        setLoading(false)
        setName(res.data.name) //캐릭터 이름
        setPosition(res.data.position) // 포지션
        setOc_img(res.data.oc_img) // 이미지 
        setHeart(res.data.heart) // 최대체력
        setStat(res.data.stat) // 전투력
        setRank(res.data.rank) // 랭크
        setPoint(res.data.point) // 보유 포인트
        setBadgeList(res.data.badgeList) //보유 뱃지
        setFriends(res.data.friends)//텍관 목록 
        setSecretCount(res.data.secretCount) // 기밀 개수
        setMusic(res.data.music) // 플레이리스트
        setInventory(res.data.inventory)// 인벤토리 불러오기
        setUsedInventory(res.data.usedInventory) // 사용한 인벤토리 불러오기

      } else{
        setAuth(false)
        setLoading(false)
        setMessage(res.data.Error)
       
      }
    })
    .then(err => console.log(err));
    axios.get('/')
    .then(res =>{})
  },[])




  const handleDelete = () => { //로그아웃용 함수 
    axios.get('http://localhost:8081/logout')
    .then(res => {
    // eslint-disable-next-line no-restricted-globals
    location.reload(true);
    }).catch(err => console.log(err));
      
  }

var loadyourbadge = badgeList.split(',') //뱃지 로딩용 (문자열 =>,로)
var yourbadge = loadyourbadge.map(Number); //배열을 숫자로
var loadyourfriend = friends.split(',') // 텍관 목록을 , 단위로 줄바꿈

const useYourItem = (event) => { // 아이템 사용 함수 
  
  event.preventDefault();
    const deleteOne = usingItem.howmanyleft-1;
    setUsingItem({ ...usingItem, howmanyleft: deleteOne });
    
    if(deleteOne>=0){
    setMiniLoading(true)
    axios.post('http://localhost:8081/mypage', usingItem)
    .then(res => {
      if(res.data.Status === "Success"){
        setMiniLoading(false)
     

        location.reload();
      } else{
        setMiniLoading(false)
        alert("DB ERROR / QNA를 통해 문의해 주세요") }
    })
    .catch(err => console.log(err));
}else{
  alert("이미 사용한 아이템 입니다!");
  setUsingItem({ ...usingItem, howmanyleft: 0})
}
}

  function BGM(){ //브금용 함수 시작 
    const { playerDetails, actions } = useYoutube({
      id: music,
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
        <div className="video-title text-lg">{playerDetails.title}<br/></div>
    
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
  
  
  function Inven(props) {
    const { item,itemData } = props; // props로부터 item을 추출합니다.
  
    return (
      <div className="w-24 h-24 cursor-pointer text-center font-RIDIB" onClick={() => {
        setUsingItem({
          ...usingItem,
          originNum: item.inventory_id,
          productName: item.product_name,
          whendidyouB: item.inventory_date,
          howmanyleft: item.count
        });
        if (item.count > 0) {
          setShowModal(true);
        }
      }}>

        
        <>
          {['right'].map((placement) => (
            <OverlayTrigger
              key={placement}
              placement={placement}
              overlay={
                <Tooltip id={`tooltip-${placement}`}>
                  <strong className='text-sm font-LightR'>{item.product_name}</strong>
                  <br />
                  <br />
                  <p className='text-sm font-RIDIB'>{itemData.text}</p>
                  <br />
                  <p className='text-xs font-SGUV'> 구매 고유 넘버 : {item.inventory_id} </p>
                  <p className='text-xs font-SGUV'> 구매 일자 : {item.inventory_date} </p>
                  {item.count > 0 ? (
                    <p className='text-xs font-SGUV'> 고유 번호 재고 : {item.count} </p>
                  ) : (
                    <p className='text-sm font-SGUV'> 사용 완료</p>
                  )}
                </Tooltip>
              }
            >{item.count > 0 ? ( // 사용 가능 이미지
              <img src={itemData.imageurl} width="100%" alt='로드 오류' />
            ) : ( //사용 완료 이미지
              <img src={itemData.imageurl2} width="100%" alt='로드 오류' />
            )}
              
            </OverlayTrigger>
          ))}
        </>
      </div>
    );
  } //인벤토리 구축 함수 

  function Badge(props){

     
    return(
      
      <div className="w-24 h-24  cursor-pointer text-center font-RIDIB">
        <>
      {['right'].map((placement) => (
        <OverlayTrigger
          key={placement}
          placement={placement}
          overlay={
            <Tooltip id={`tooltip-${placement}`}>
             <strong className='font-RIDIB'>{props.itemData.text}</strong>.
            </Tooltip>
          }
        >
           <img src={props.itemData.imageurl} width="100%"  alt='로드 오류'></img>
           
        </OverlayTrigger>
      ))}
  
    </>
    </div>
    
    )
  } // 뱃지목록 구축 함수



    return(
    
    <div className="w-12/12 min-h-screen bg-center bg-no-repeat bg-cover"  style={{ backgroundImage: `url(${storyBack})`}}>
<Link to="/notice"> <div className="absolute top-0 left-2.5 h-40 w-40 z-10 ml-8 mt-4"><img className='logoClick' src={logo} alt='이미지 로드 오류'></img></div> </Link>

<BeatLoader className="items-center absolute top-[50%] left-[47%]" color={'#00908f'} loading={loading} size={40}/>
{
 auth ?

  <div>

    <div className="absolute top-10 right-24 h-24 w-96 z-10 ml-8 mt-4 font-SANHA"><BGM/></div>
    <div className='m-auto w-11/12 pt-40 h-5/6'>

    <span className='font-LightB text-6xl mt-2 ml-2 mb-2'>  {name} </span> 

    <div className="grid grid-rows-1 grid-flow-col gap-4 my-16 font-LightR text-2xl font-semibold" id="information">

  <span> 포지션 :: {position} </span>
  <br/>
 
  <span> 전투력 :: {stat} </span>
  <br/>

  <span> 랭크 ::  {rank}</span>
  <br/>

  <span> 최대 체력 ::  {heart} </span>
  <br/>

  <span> 보유 포인트 :: {point} </span>
  <br/>

  <span> 보유 기밀수 :: {secretCount} </span>
  <br/>
  </div>

  <UsedItem/>

  <UsingItem/>

</div>

<div className='itemWrapper flex px-16 font-SANHA text-2xl' id="invenwraper">


<div className=" w-1/3  text-black text-center px-2">
  
  <p className="mb-4 text-3xl"> &nbsp; &nbsp; 인벤토리  &nbsp;  
  <button className='text-lg hover:text-lightBlue hover:font-extrabold' onClick={()=>{setShowModalXL(true)}}>사용내역</button> </p>

  <div className="grid grid-cols-4 gap-2 m-auto border-2 p-8 h-96 overflow-auto bg-white bg-opacity-25 " id="inven">
   {
    inventory.map(item=>{
          return(
            <div>
            <Inven itemData={itemData[item.product_id]} item={item}></Inven>
            </div>
          )
        })
       } 
        </div>

        
</div>

<div className=" w-1/3  text-black text-center px-2">

<p className="mb-4 text-3xl"> 새쉬 </p>
  
  
<div className="grid grid-cols-4 gap-2 m-auto border-2 p-8 h-96 overflow-auto bg-white bg-opacity-25 " id="inven">
   {

    badgeData.map((a,i)=>{
      for(var b=0; b<yourbadge.length; b++){
        if(badgeData[i].id === yourbadge[b]){
          return(
            <Badge itemData={badgeData[i]} i={i}></Badge>
          )
        }
      }
      
          
        })
       

       } 



        </div>

   

        
</div>

<div className="w-1/3 text-black text-center px-2">   
<p className="mb-4 text-3xl"> 관계 목록 </p>
<div className="m-auto border-2 py-10 h-96 overflow-auto bg-white bg-opacity-25" id="inven">{


loadyourfriend.map((a,i)=>{

    return(<div className='py-1 text-left pl-16'> ⚝ {loadyourfriend[i]}</div>)
})

}</div>
  
  </div>
  

</div>

<div className='loginBt absolute h-[100px] w-[200px] right-2 p-6 my-6 px-12'>
  <button type='submit' className='text-black hover:text-3xl hover:text-white border-black font-LightB text-2xl' onClick={handleDelete}>
     로그아웃 
    </button>
  
  </div>


  </div>


  :

  <div className='wraper p-44 text-center'>
         
  <span className='relative font-LightB text-6xl mt-2 mb-4 text-backGroundTeal'> 로그인 후 사용 가능한 페이지 입니다. </span>
<img className="mt-16 mx-auto" src={academyLogo} alt='logo' width="25%" />

    <Link to="/login"><button className=' bg-backGroundTeal absolute right-28 mt-16 font-LightB text-4xl p-4 rounded-2xl text-white hover:bg-pBlue'> 로그인 </button></Link>
  </div>


}

</div>

)

function UsedItem(){


          
  return(
   <div>   {/* <!--Extra large modal-->*/}
   <TEModal show={showModalXL} setShow={setShowModalXL}>
       <TEModalDialog size="xl">
         <TEModalContent className="bg-cover bg-no-repeat bg-center  text-3xl  px-20 pt-4"  style={{ backgroundImage: `url(${storyBack4})`}}>
         <div className="absolute top-0 right-10"></div>

           <TEModalHeader style={{borderBottomWidth:0}} className='flex'>
             {/* <!--Modal title--> */}

             <p className='font-LightR font-extrabold'> 아이템 사용 내역 / {name} </p>
            

             {/* <!--Close button--> */}
             <button
               type="button"
               className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none font-extrabold"
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
          
          
           <div className='flex flex-row text-center font-LightB py-4 h-[450px] overflow-auto '>

           <table className="table-fixed border-1 border-primary-900 border-solid pb-2 ">
              <thead>
                <tr className='text-bNavy pb-2 text-xl font-SANHA'> 
                  <th className='p-3 border-1 border-primary-900'>⚝</th>
                  <th className='p-3 border-1 border-primary-900'>아이템 이름 </th>
                  <th className='p-3 border-1 border-primary-900'>구매 일자</th>
                  <th className='p-3 border-1 border-primary-900'>사용 일자</th>
                  <th className='p-3 border-1 border-primary-900'>구매 고유번호</th>
                </tr>
              </thead>
              <tbody className='border-1 border-primary-900 border-solid text-lg'>
            
              


                {

usedinventory.map(item=>{
  return(
    <tr className='p-3 border-1 border-primary-900 border-solid font-RIDIB text-center'>
<td className='text-center p-3 border-1 border-primary-900 font-extrabold'> ⚝ </td>
<td className='text-center p-3 border-1 border-primary-900'> {item.product_name}  </td>
<td className='text-center p-3 border-1 border-primary-900'> {item.inventory_date} </td>
<td className='text-center p-3 border-1 border-primary-900'> {item.inventory_used_data}</td>
<td className='text-center p-3 border-1 border-primary-900'> {item.inventory_id} </td>
</tr>

)
})

}
             
              
              </tbody>
           </table>

           </div>

           </TEModalBody>
         </TEModalContent>
       </TEModalDialog>
     </TEModal>
</div>

  )
}

function UsingItem(){

          
  return(
   <div>   {/* <!--Extra large modal-->*/}
   <TEModal show={showModal} setShow={setShowModal}>
       <TEModalDialog size="lg">
         <TEModalContent className="bg-cover bg-no-repeat bg-center font-SANHA text-3xl  px-20 pt-4"  style={{ backgroundImage: `url(${storyBack4})`}}>
         <div className="absolute top-0 right-10"></div>

           <TEModalHeader style={{borderBottomWidth:0}} className='flex'>
             {/* <!--Modal title--> */}

              아이템 고유번호 :  {usingItem.originNum} 
             
             {/* <!--Close button--> */}
             <button
               type="button"
               className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none font-extrabold"
               onClick={() => setShowModal(false)}
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
           <TEModalBody className='text-xl'> 
       {usingItem.howmanyleft===0 ? (
           <img className='absolute top-[20px]  left-[12%]' src={buyImg}></img>)
           :(<></>)
}
           <BeatLoader className="items-center absolute top-[40%] left-[47%]" color={'#5A68C4'} loading={miniloading} size={20}/>
            <p> {usingItem.productName} </p>
            <p> 아이템 구매일자 :  {usingItem.whendidyouB}</p>
            <p> 고유 번호 재고  :  {usingItem.howmanyleft}</p>
            <br/><br/>

           <p className='text-sm'>아이템 사용시 인벤토리 내에서 아이템이 비활성화 되며, 사용 기록의 경우 상단 사용내역 버튼을 눌러 확인하실 수 있습니다.</p> 
           <br/>
  
           <p className='text-lg font-bold'>아이템을 사용 하시겠습니까?</p>
           <br/>
           {usingItem.howmanyleft !==0 ? (
            <div className='text-center'>
            <button onClick={useYourItem} className='text-xl font-extrabold hover:text-primary-600'>네</button> &nbsp; <button className='text-xl text-danger-700 font-extrabold hover:text-danger-600'onClick={() => setShowModal(false)}>아니오</button>
             </div>
           ):(<></>)}

           </TEModalBody>
         </TEModalContent>
       </TEModalDialog>
     </TEModal>
</div>

  )
}



}



export default MyPage;