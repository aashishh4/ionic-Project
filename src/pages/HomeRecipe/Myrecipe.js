import { IonSegment, IonSegmentButton, IonCol, IonGrid, IonPage, IonContent, IonRow, IonText, IonLabel, IonIcon, IonHeader, IonButton, IonTitle } from "@ionic/react";
import Header from "../../components/Header";

function Myrecipe(){
    return(
        <div>
            <IonPage>
            <Header/>
            <IonContent>
               <IonHeader className="TitleHead bottom-shadow">
                  <IonButton className="backBtn" fill="clear" routerLink="/profile">
                     <i class="material-icons dark">west</i>
                  </IonButton>
                  <IonTitle color="dark">My Recipe</IonTitle>
               </IonHeader>
               <h1> recipe</h1>
               </IonContent>
               </IonPage>
               
        </div>

    )
} export default Myrecipe;