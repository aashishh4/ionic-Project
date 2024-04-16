import React from 'react';
import { IonButton, IonContent, IonPage, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useAuth } from '../../contexts/CartContext';

const OrderConfirm = () => {
  const history = useHistory();
  const { clearCart } = useAuth();


  const clearLocalStorage = () => {
    clearCart();
    history.push('/home');

  };
  
  return (
    <IonPage>
      <IonContent>
        <div className='OrderConfirm'>
          <img src='assets/img/order-confirmed.webp' alt='image' />
          <IonText className='Title'>Thank You!</IonText>
          {/* <IonText className='subTitle'><h1>Your order is confirmed</h1></IonText> */}
          <IonButton onClick={() => clearLocalStorage()} size="default" expand="block">Done</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default OrderConfirm;
