import Carousel from 'react-bootstrap/Carousel';

import { Link } from 'react-router-dom'
import logo from '../../assets/img/notice/navylogo.png'

 import element1 from '../../assets/img/notice/element1.jpg'
 import element2 from '../../assets/img/notice/element2.jpg'
import high1 from '../../assets/img/notice/highschool1.png'
import high2 from '../../assets/img/notice/highschool2.png'



// function ClickToCafe(e){
//   e.preventDefault();
//   window.location.href='https://cafe.naver.com/prosoteriaprosoteria'
// }




function NoticeCarousel() {
  return(

    <div className='font-RIDIB text-2xl'>
<Link to="/notice"> <div className="absolute top-0 left-2.5 h-40 w-40 z-10 ml-8 mt-8 text-backGroundTeal"><img className='logoClick' src={logo} alt='이미지 로드 오류'></img></div> </Link>
    <Carousel data-bs-theme="dark">
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={element1}
        alt="초등부 교복"
      />
      <Carousel.Caption className='mb-8'>
        <h5>라딕스 아카데미 초등부 교복</h5>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={element2}
        alt="초등부 교복 상세"
      />
      <Carousel.Caption className='mb-8'>
        <h5>라딕스 아카데미 초등부 교복 상세</h5>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={high1}
        alt="Third slide"
      />
       <Carousel.Caption className='mb-8'>
        <h5>라딕스 아카데미 고등부 교복</h5>
      
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={high2}
        alt="Third slide"
      />
      <Carousel.Caption className='mb-8'>
        <h5>라딕스 아카데미 고등부 교복 상세</h5>
       
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>

  </div>
);
    
}

export default NoticeCarousel;