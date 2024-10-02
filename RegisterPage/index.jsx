/* eslint-disable no-unused-vars */
import React, { useState } from 'react'  // eslint-disable-line no-unused-vars
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './index.css'
import Validation from './SignUpValidation'

import BeatLoader from "react-spinners/BeatLoader";


function RegisterPage(){

  const [values, setValues] = useState({
    id: '',
    password:'',
    name : '',
    entercode:'',

})

const [errors,setErrors] = useState({})
const [loading, setLoading]= useState(false) // 로딩창


const navigate = useNavigate();


const handleSubmit =(event) =>{
event.preventDefault();
setErrors(Validation(values));
if(errors.id === "" && errors.password === "" && errors.name === ""){
  setLoading(true)
    axios.post('http://localhost:8081/register',values)
    .then(res => {
      if(values.entercode === "9791140520053"){
      if(res.data.Status === "Success"){
        setLoading(false)
        alert("회원 가입 완료, 로그인 페이지로 이동합니다.")
        navigate('/login')
      } else{
        setLoading(false)
        alert("똑같은 ID를 사용하는 유저가 있습니다. 다른 ID를 설정해 주세요.")
      }
    }else{
      setLoading(false)
      alert("가입 코드가 일치하지 않습니다.")
    }}
  
  )
    .then(err => console.log(err));
}
}


  return (


    <div className='grid place-items-center h-screen mb-48'>
      <div className="bg-animation">
          <div id='stars'></div>
          <div id='stars2'></div>
          <div id='stars3'></div>
          <div id='stars4'></div>

          <section className='smogVD' style={{'opacity':0.5}}>
<video autoPlay loop src="https://video.wixstatic.com/video/d47472_58cce06729c54ccb935886c4b3647274/1080p/mp4/file.mp4" muted ></video>
</section>
    </div>
      
    
    <div className="LogIncontainer" width="80%" height="100%">

   

    <section className='flex flex-col justiyfy-center mt-20 mb-20 max-w-[450px] m-auto font-RIDI border-borderGray drop-shadow-md'>
    <Link to='/'><img className="flex flex-col justiyfy-center mt-10 mb-10 max-w-[450px] font-SGUV drop-shadow-md  m-auto"  src="/PROSOTERIA.svg" width="100%"  alt="logo" /></Link>
      <div className='p-6 bg-gradient-to-tr backGroundBlack to-transparent rounded-md shadow-sm mt-6 mb-6 font-SGUV border-borderGray border-solid '>
        <h1 className='text-3xl font-semibold text-center text-white'>
         회원가입
        </h1>
        <BeatLoader className="absolute top-[50%] left-[44%]" color={'#00908f'} loading={loading} size={40}/>
        <form className='mt-8' action="" onSubmit={handleSubmit}>

          <div className='mb-2'>
            <label htmlFor='id'
            className='text-sm font-semibold text-alertTextG'>ID</label>
            <input 
              type='text'
              name='id'
              placeholder='아이디'
             
           
    onChange={e =>setValues({...values, id: e.target.value})}
  className='w-full px-4 py-2 mt-2 bg-opacity-10 bg-white/10  border rounded-md  text-white '/>
 {errors.id && <span className='font-RIDIB text-white'>{errors.id}</span>}
             
          </div>

          <div className='mb-2'>
            <label htmlFor='name'
            className='text-sm font-semibold text-alertTextG'>Name</label>
            <input 
              type='text'
              name='name'
              placeholder='캐릭터 이름'
             
              onChange={e =>setValues({...values, name: e.target.value})}
              className='w-full px-4 py-2 mt-2 bg-opacity-10 bg-white/10  border rounded-md  text-white '/>
              {errors.name && <span className='font-RIDIB text-white'>{errors.name}</span>}
             
          </div>


          <div className='mb-2'>
            <label htmlFor='password'
            className='text-sm font-semibold  text-alertTextG'>Password</label>
            <input 
              type='password'
              name="password"
              placeholder='비밀번호'
              onChange={e =>setValues({...values, password: e.target.value})}
              className='w-full px-4 py-2 mt-2 bg-opacity-10 bg-white/10  border rounded-md  text-white'   />
              {errors.password && <span className='font-RIDIB text-white'>{errors.password}</span>}
        
           
          </div>

          <div className='mb-2'>
            <label htmlFor='password'
            className='text-sm font-semibold  text-alertTextG'>Code</label>
            <input 
              type='password'
              name="entercode"
              placeholder='가입코드'
              onChange={e =>setValues({...values, entercode: e.target.value})}
              className='w-full px-4 py-2 mt-2 bg-opacity-10 bg-white/10  border rounded-md  text-white'   />
        
           
          </div>


          <div className='mt-6  bg-backGroundBlack'>
         <button type='submit' className='loginBt w-full text-white px-4 py-2 rounded-md hover:bg-pBlueButton'>
          회원가입 </button>
  
  </div>




        </form>

        <p className='mt-12 text-xs font-light text-center text-idAlertText'>
  아이디가 있다면? &ensp; &ensp;
  <a href='/login'
  className='font-medium hover:underline text-idAlertText2'>
      로그인</a>
</p>

      </div>
    </section>


</div>
</div>
  )
}

export default RegisterPage;