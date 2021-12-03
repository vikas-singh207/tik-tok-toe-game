import React ,{useState}from 'react';
import './modal.css';

function ResultPopup(prop){
 
  return(
    <>
      { prop.show && 
        <div className="modal">
          <div className="overlay"></div>
          <div className="popup">
            <div className={`${prop.height ? prop.height:''} ${prop.width ? prop.width:''} popup__content`}>
              <div className="header">
                <span className="popup__title">{prop.title}</span>
                <span className="popup__close" onClick={prop.closeModal}>X</span>
              </div>
              <div className="body">{prop.message}</div>
              <div className="footer">
                {/* {prop.footerButton && 
                (

                )} */}
              </div>
            </div>
          </div>
        </div>
      }
      </>
  )
}

export default ResultPopup;