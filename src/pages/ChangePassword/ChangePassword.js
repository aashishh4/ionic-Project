import { IonCol, IonContent, IonGrid, IonPage, IonInput, IonRow, IonHeader, IonButton,IonTitle } from "@ionic/react";
import Header from "../../components/Header";
const ChangePassword = () => {
   return (
      <>
         <IonPage>
            <Header />
            <IonContent>
               <IonHeader className="TitleHead bottom-shadow">
                  <IonButton className="backBtn" fill="clear" routerLink="/profile">
                     <i class="material-icons dark">west</i>
                  </IonButton>
                  <IonTitle color="dark">Change Password</IonTitle>
               </IonHeader>
               <IonGrid className="ion-padding-horizontal">
                  <IonRow className=" Change-Password">
                     <h1 className="ion-padding-bottom">RESET PASSWORD</h1>
                     <div className="PswdloginForm">
                        <div className="Chng-input">
                           <IonInput label="Default input" placeholder="E-Mail Address" fill="outline"></IonInput>
                           <IonInput label="Password input" type="password" fill="outline" placeholder="Password"></IonInput>
                           <IonInput label="Password input" type="password" fill="outline" placeholder="Confirm Password"></IonInput>
                           <div className="reset-btn">
                              <IonButton size="small">Reset Password</IonButton>
                           </div>
                        </div>
                     </div>
                  </IonRow>
               </IonGrid>
            </IonContent>
         </IonPage>


      </>
   )
}
export default ChangePassword;