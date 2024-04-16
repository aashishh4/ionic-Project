import React, { useEffect } from 'react'
import { IonButton, IonContent, IonPage, IonText } from '@ionic/react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const OrderFail = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonContent>
        <div className='OrderConfirm'>
          <img src="/assets/img/fail.png" alt="Images" />
          <IonText className='Title'>Oops!</IonText>
          <IonText className='subTitle'>Your order is failed</IonText>
          <IonText className='description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</IonText>
          <IonButton onClick={() => history.push('/home')} size="default" expand="block">Done</IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default OrderFail;
