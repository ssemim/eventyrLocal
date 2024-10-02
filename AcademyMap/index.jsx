import { useState } from 'react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import AcademyMapData from './AcademyMapData';
import './index.css';

import academyMap from '../../assets/img/notice/AcademyMap.png'


function Academy(){

  const navigate = useNavigate();
const goToMain = () => {
  navigate("/notice");
}


    let [Area, AreaChange] = useState(0);

    return (


    <div className='AcademyMap'><img src={academyMap} width="100%" alt='academyMap'/>

    <div className="MainBuilding" onClick={() =>(AreaChange(0))}><MapPopUp/></div>
    <div className="AmilgueForest" onClick={() =>(AreaChange(1))}><MapPopUp/></div>
    <div className="LineGarden" onClick={() =>(AreaChange(2))}><MapPopUp/></div>
    <div className="Flaze" onClick={() =>(AreaChange(3))}><MapPopUp/></div>
    <div className="Enslo" onClick={() =>(AreaChange(4))}><MapPopUp/></div>
    <div className="Fountain" onClick={() =>(AreaChange(5))}><MapPopUp/></div>
    <div className="Vintre" onClick={() =>(AreaChange(6))}><MapPopUp2/></div>
    <div className="Thiophe" onClick={() =>(AreaChange(7))}><MapPopUp/></div>
    <div className="Dormitory" onClick={() =>(AreaChange(8))}><MapPopUp2/></div>
    <div className="Libary" onClick={() =>(AreaChange(9))}><MapPopUp2/></div>
    <div className="WaterFall" onClick={() =>(AreaChange(10))}><MapPopUp/></div>
    <div className="NForest" onClick={() =>(AreaChange(11))}><MapPopUp2/></div>
    <div className="Lighthouse" onClick={() =>(AreaChange(12))}><MapPopUp/></div>
    <div className="Shore" onClick={() =>(AreaChange(13))}><MapPopUp/></div>
    <div className="PrayerRoom" onClick={() =>(AreaChange(14))}><MapPopUp/></div>
    <div className="MiddleSquare" onClick={() =>(AreaChange(15))}><MapPopUp/></div>
    <div className="RadixWall" onClick={() =>(AreaChange(16))}><MapPopUp2/></div>
    <div className="Cafeteria" onClick={() =>(AreaChange(17))}><MapPopUp/></div>
    <div className="Trail" onClick={() =>(AreaChange(18))}><MapPopUp2/></div>
    <div className="Bridge" onClick={() =>(AreaChange(19))}><MapPopUp/></div>
    <div className='GoToMain' onClick={()=>(goToMain())}></div>
               
    </div>
 
    );

    function MapPopUp() {

    
        return (
          <>
         
            <OverlayTrigger
                trigger="click"
                key={'right'}
                placement={'right'}
                overlay={
                  <Popover id={`popover-positioned-${'right'}`} className='bg-white'>
                    <div className='AcademyPopHeader'><Popover.Header as="h2"><strong>{AcademyMapData[Area].title}</strong></Popover.Header></div>
                    <Popover.Body >
                    <div className='AcademyPopUP'><h4>{AcademyMapData[Area].content}</h4> </div>
                    </Popover.Body>
                  </Popover>
                }
              >
                <div className='ClickButton'></div>
              </OverlayTrigger>
            
          </>
        );
      }


      function MapPopUp2() {

    
        return (
          <>
            <OverlayTrigger
                trigger="click"
                key={'left'}
                placement={'left'}
                overlay={
                  <Popover id={`popover-positioned-${'left'}`} className='bg-white'>
                   <div className='AcademyPopHeader'><Popover.Header as="h2"><strong>{AcademyMapData[Area].title}</strong></Popover.Header></div>
                    <Popover.Body>
                    <div className='AcademyPopUP'>  <h4>{AcademyMapData[Area].content}</h4> </div>
                    </Popover.Body>
                  </Popover>
                }
              >
                <div className='ClickButton'></div>
              </OverlayTrigger>
          </>
        );
      }
    
    
}

export default Academy;