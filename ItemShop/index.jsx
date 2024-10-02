/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */

import React, { useEffect }  from 'react'; 
import { useState } from 'react'; // eslint-disable-line no-unused-vars
import './index.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import data from './ItemData.js';
import Navbar from '../../layout/Navbar/index.jsx';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import BeatLoader from "react-spinners/BeatLoader";


import { addCount,addItem,minusCount,deleteItem,deleteAllItem} from "../../store"
import { useSelector,useDispatch } from "react-redux"

import {
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
} from "tw-elements-react";

import storyBack from '../../assets/img/notice/storybg3.png'
import shopshelves from '../../assets/img/itemshop/store.png'
import minipaper from '../../assets/img/itemshop/recipt.png'
import randomBox from '../../assets/img/itemshop/Pbox.gif'
import flyingS1 from '../../assets/img/notice/flyingS.png'
import flyingS2 from '../../assets/img/notice/flyingS2.png'
import flyingS3 from '../../assets/img/notice/flyingS3.png'
import flyingS4 from '../../assets/img/notice/flyingS4.png'
//

const randombox = () => {
  window.location.replace('http://eventyr.dothome.co.kr/');
  return null;
};


function ShopPage(){

  let state = useSelector((state)=>{return state})
  let dispatch = useDispatch();

  const [ssImg, setssImg] = useState(flyingS1)

  const [auth, setAuth] = useState(false); //인증 관리용 스테이트 
  const [message, setMessage] = useState('') // 오류 메시지 저장용

  const [name, setName] = useState('') // 캐릭터 이름 
  const [point, setPoint] = useState(0) // 보유 포인트 세팅

  var resultPrice = state.cart.reduce(function(tot, arr) { 
    // return the sum with previous value
    return Number(tot + arr.price*arr.count);
  
    // set initial value as 0
  },0);

  const [showModalXL, setShowModalXL] = useState(false); //모달 존니큰거 
  const [loading, setLoading]= useState(false) // 로딩창
  const [values, setValues] = useState({ //구매한거 정보
    itemCart:[],
    changedPoint : 0,
})
const [disableButton, setDisableButton]= useState(false) // 로딩창
  
  axios.defaults.withCredentials = true;

  useEffect(()=>{
    axios.get('http://localhost:8081/shop')
    .then(res => {
      if(res.data.Status === "Success"){
        setAuth(true)
        setName(res.data.name)
        setPoint(res.data.point)

      } else{
        setAuth(false)
        setMessage(res.data.Error)
       
      }
    })
    .then(err => console.log(err));
    axios.get('/')
    .then(res =>{})
  },[])



 const [itemData] = useState(data);
 const navigate = useNavigate();

 const handlePurchase =(event)=>{


  if(point>=resultPrice){
    setDisableButton(true);
    if(values.changedPoint!==""){
    setLoading(true)
    axios.post('http://localhost:8081/shop', values)
    .then(res => {
      if(res.data.Status === "SuccessGood"){
        setLoading(false)
        setssImg(flyingS3)
        setTimeout(function(){setShowModalXL(false)},1500)// 모달창 닫기
        setTimeout(function(){setValues({...values, changedPoint: 0, itemCart: []})},1500)//밸류값 초기화
        setTimeout(function(){dispatch(deleteAllItem())},1500) // 장바구니 비우기
        setTimeout(function(){setssImg(flyingS1)},1500) //이미지 바꾸기
        setTimeout(function(){setDisableButton(false)},1500); //버튼 잠금 풀어주기
        setTimeout(function(){location.reload()},1600);

    
      } else{
        alert("DB ERROR / QNA를 통해 문의해 주세요")
        setDisableButton(false);
      }
    })
    .catch(err => console.log(err));
  }else{
    alert("포인트 연산 중 오류 발생, QnA에 문의해 주세요")
    setDisableButton(false);
  }
}else{
  alert("소지한 솔드가 부족합니다!")
  setShowModalXL(false)
}

  
}

    return (
      
        <div className='m-auto '>
          <Navbar/>
          <span onClick={randombox} className='font-LightR text-4xl absolute right-12 cursor-pointer flex text-white'> 
            <img src={randomBox} className='w-12' alt='랜덤박스'></img>
            랜덤박스
          </span>
          
<div className='flex flex-row pt-24 px-10 m-auto'>

<BuySome/>
        <div className='flex flex-row flex-wrap min-w-[1000px] min-h-screen pr-10 pl-20 pt-36 pb-20 mb-4 bg-center bg-cover bg-no-repeat gap-6' style={{ backgroundImage: `url(${shopshelves})`}}>
      

{
    itemData.map((a,i)=>{
          return(
            <Card itemData={itemData[i]} i={i}></Card>
          )
        })
       }


        </div>
        <div className='min-w-[600px] min-h-[1000px] my-6 ml-28 text-white font-RIDIB text-2xl text-center justify-center bg-cover bg-no-repeat  flex' style={{ backgroundImage: `url(${minipaper})`}}>
          
          { auth ?
          
          <div className='py-2'>
          <p className='text-black font-SANHA text-5xl font-medium mt-32 mb-8'> {name} </p> 
          <p  className='text-backGroundTeal font-SANHA text-2xl'> 보유 솔드 ::  {point} </p>



     
          <button className=' font-SANHA text-lg text-backGroundTeal mt-2 hover:text-pBlue' onClick={()=>{dispatch(deleteAllItem())}}>
            장바구니 비우기</button>
            <div className='w-[440px] h-[480px] mt-12 mx-2 pt-4 pb-4 border-y-bNavy border-opacity-50 border-y-2 overflow-auto text-black font-SANHA'>
              
              <Cart/>

              </div>

              <div className='mt-3 text-black font-SANHA '>합계 :: {resultPrice} 솔드</div>

            <div>
              <button className='font-SANHA text-2xl text-backGroundTeal mt-8 hover:text-3xl' 
              onClick={()=>{   Number(point)
                 var newpoint = point - resultPrice;
                 setValues({...values, changedPoint: newpoint, itemCart: [state.cart]}),
                 setShowModalXL(true)}} >구매하기</button>

         
              </div>

           

                </div>  

          :
          <div>
           <p className='text-backGroundTeal font-SANHA text-4xl font-bold mt-40 mb-8'> 로그인 후 구매가 가능합니다.</p>
           <br/>
          <Link to="/login"><button className='font-SGUV text-2xl text-backGroundTeal hover:text-lightBlue'>로그인</button></Link>
          </div>
          
        }

          </div>
        </div>
        </div>
     
    );


    function Card(props){
      let dispatch = useDispatch();
        return(
          
          <div className="w-40 h-36  cursor-pointer text-center font-RIDIB" onClick={()=>{dispatch(addItem({id : props.itemData.id, name : props.itemData.itemName, count : 1, price: props.itemData.price}))}}>
            <>
          {['right'].map((placement) => (
            <OverlayTrigger
              key={placement}
              placement={placement}
              overlay={
                <Tooltip id={`tooltip-${placement}`}>
                 <strong className='font-RIDIB'>{props.itemData.text}.<br/><br/></strong>
                 <strong className='font-SANHA'> # {props.itemData.price} 솔드</strong>
                </Tooltip>
              }
            >
               <img src={props.itemData.imageurl} width="100%"  alt='로드 오류'></img>
               
            </OverlayTrigger>
          ))}
          <span className='text-white [text-shadow:_1px_1px_0_rgb(0_0_0_/_80%)]'>{props.itemData.itemName}</span>
        </>
        </div>
        
        )
      }

      

 
      function Cart(){
     
            return(
           
                <div className='flex flex-col'>
              <table className="table-fixed ">
              <thead>
                <tr className='text-bNavy pb-2 text-xl'> 
                  <th className='pb-3'>#</th>
                  <th className='pb-3'>아이템 이름 </th>
                  <th className='pb-3'>수량 </th>
                  <th className='pb-3'>&nbsp;가격 </th>
                  <th className='pb-3'>&nbsp;&nbsp;삭제하기 </th>
                </tr>
              </thead>
              <tbody className='text-lg'>{
                state.cart.map((a,i)=>{     

                       
        return (
        
    
        <tr key={i}>
    
          <td className='text-left pb-1'>{state.cart[i].id+1}</td>
    
          <td className='text-left pb-1'>{state.cart[i].name}&nbsp;&nbsp;</td>
    
          <td>
            
         <button className='text-2xl font-extrabold pb-1' onClick={()=>{dispatch(minusCount(state.cart[i].id))}}>-</button>
         
         &nbsp; {state.cart[i].count} &nbsp;
         
         <button className='text-2xl font-bold pb-1' onClick={()=>{dispatch(addCount(state.cart[i].id))}}>+&nbsp;&nbsp;</button>
    
          </td>
    
          <td className='text-center pb-1'> &nbsp;{state.cart[i].price*state.cart[i].count}</td>
    
          <button onClick={(e) => { dispatch(deleteItem(i))}}>X</button>
    
        </tr>
        
    
        )
        
                })
             
             }
            
              </tbody>
            </table>
            </div>
        )
    
        }


        function BuySome(){
          
          return(
           <div>   {/* <!--Extra large modal-->*/}
             
           <TEModal show={showModalXL} setShow={setShowModalXL}>
               <TEModalDialog size="lg">
                 <TEModalContent className="bg-cover bg-no-repeat bg-center"  style={{ backgroundImage: `url(${storyBack})`}}>
                 <div className="absolute top-0 right-10"></div>
       
                   <TEModalHeader style={{borderBottomWidth:0}} className='flex-row-reverse'>
                     {/* <!--Modal title--> */}

       
                     {/* <!--Close button--> */}
                     <button
                       type="button"
                       className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none font-extrabold"
                       onClick={() => {setShowModalXL(false)}}
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
                   
                   <img className="Hale temp left-8 absolute w-48 h-48" src={ssImg} alt='로드 오류'></img>
                  
                   <div className='flex-col text-center font-SANHA'>
                   <h2 className='text-4xl'> 최종 구매 항목</h2>
                   <br/>
                   <br/>
                   <BeatLoader className="flex justify-center items-center" color={'#d142f5'} loading={loading} size={20}/>
                   {

                state.cart.map((a,i)=>{     

                       
        return (
        
          <div className='flex justify-between px-52'>
          <div className='text-2xl py-1 float-left'>  # {state.cart[i].name} :: </div>
          <div className='text-2xl py-1 revert'> {state.cart[i].count} 개 </div>
          </div>
    
        )
                })
             
             }
             <div className='py-2'>------------------------------</div>
             <div className='py-1 text-2xl'>총 {resultPrice} 솔드</div>
      
 
<h3 className='text-lg font-DUNGGUNMO italic py-2' >이게 맞냐는 것이야?</h3>
<div className='pb-10'>

 <button className='text-2xl font-extrabold hover:text-primary-600'onClick={()=>{
  
if(state.cart.length>0){
handlePurchase();
}
else{
  setssImg(flyingS4)
  setTimeout( function() {setShowModalXL(false)}, 1000),
  setTimeout( function() {setssImg(flyingS1)},1500)
}
  
 }} disabled={disableButton}>네</button> 

 &nbsp; &nbsp;
 <button className='text-2xl text-danger-700 font-extrabold hover:text-danger-600' 
 onClick={()=>{setssImg(flyingS2), 
 setTimeout(function() {setShowModalXL(false)}, 1000), 
 setTimeout(function() {setssImg(flyingS1)},1500)}} disabled={disableButton}>아니오</button>    
 </div>

 </div>    
 <p className='text-sm font-RIDIB text-center text-danger-500'>아이템 구매 후 로그아웃 한 다음 다시 로그인 해 주시면 빠른 변동사항 확인이 가능합니다.</p>     
                   
                   </TEModalBody>
                 </TEModalContent>
               </TEModalDialog>
             </TEModal>
       
       
       
       
       </div>
          )
}



}






export default ShopPage