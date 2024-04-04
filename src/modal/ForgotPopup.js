import { IonButton, IonInput, IonModal, IonText } from '@ionic/react'
import React from 'react'

const ForgotPopup = (props) => {
   return (
      <>
         <IonModal isOpen={props.isOpen} onDidDismiss={() => props.setIsOpen(false)} className='ForgotModal'>
            <div className="loginContainer">
               <IonText color="dark" className="title">Reset Password</IonText>

               <div className="loginForm">
                  <IonInput label="Default input" placeholder="Email Address"></IonInput>
                  <div className="btnGroup">
                     <IonButton>Send Password</IonButton>
                  </div>
               </div>
            </div>
         </IonModal>
      </>
   )
}

export default ForgotPopup