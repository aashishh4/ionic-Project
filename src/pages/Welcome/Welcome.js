import React from 'react'
import { IonContent, IonPage } from '@ionic/react'
import styles from "./Welcome.module.css";

const Welcome = () => {
  return (
    <IonPage id="welcome-page" className={styles.welcomePage}>
      <IonContent fullscreen>
        <div className={styles.splashContainer}>
          <img
            src="/assets/img/MainLogo.png"
            alt="Images"
            className={styles.logo}
          />
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Welcome
