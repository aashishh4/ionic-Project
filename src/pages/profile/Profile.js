import {
    IonSegment,
    IonSegmentButton,
    IonCol,
    IonGrid,
    IonPage,
    IonContent,
    IonRow,
    IonText,
    IonLabel,
    IonButton,
    IonHeader,
    IonTitle,
  } from "@ionic/react";
  import Header from "../../components/Header";
  import { useEffect, useState } from "react";
import axios from "axios";
  
  const Profile = () => {
  
   
    const [userProfileData, setUserProfileData] = useState({});
    const [selectTab,setSelectTab]=useState("parsonal")
    // console.log("selectTab",selectTab)
    
  
    const userProfile = async () => {
      try {
        const response = await axios .get("http://20.207.207.62/api/user-dashboard")
        setUserProfileData(response?.data?.user_dashboard?.user_form_data);
        // console.log(' response', response)
      } catch (e) {
        console.log(e);
      }
    };
  
    useEffect(() => {
      userProfile();
    }, []);

   const handleTab =(event)=>{
    setSelectTab(event.detail.value)
   }
    return (
      <IonPage>
        <Header />
        <IonContent className="profilepage">
          <IonHeader className="TitleHead">
            <IonButton className="backBtn" fill="clear" routerLink="/home">
              <i class="material-icons dark">west</i>
            </IonButton>
            <IonTitle color="dark">My Profile</IonTitle>
          </IonHeader>
  
          <IonGrid class="ion-no-padding">
            <IonRow className="profile-top-bg"></IonRow>
            <IonRow className="profile-content ion-margin-horizontal">
              <div className="profileImg">
                <img
                  src={userProfileData?.avatar}
                  alt="Images"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "/assets/img/img-placeholder.jpg";
                  }}
                ></img>
              </div>
              <IonLabel>
                <h1>
                  {userProfileData?.first_name} {userProfileData?.last_name}
                </h1>
               
              </IonLabel>
            </IonRow>
            <IonRow className="Profile-bio ion-margin-top ion-margin-horizontal">
              <IonCol>
                <div className="profileBioText">
                  <IonText>joinered:
                    {userProfileData &&
                      userProfileData?.created_at?.split(" ")[0]}   <IonText></IonText>

                  </IonText><br/>
                </div>
              </IonCol>
              <IonCol>
                <div className="profileBioText">
                  <IonText>Points:{userProfileData?.total_points}</IonText><br/>
                  
                </div>
              </IonCol>
              
                <IonCol>
                <IonText>mob:{userProfileData.mobile}</IonText>
                </IonCol>
               
                <IonCol>
                <div>
                  <IonText>state:{userProfileData.state_name}</IonText>
                </div>
                </IonCol>
            </IonRow>
          </IonGrid>
          
          <IonGrid className="ion-no-padding">
            <IonRow className="Profile-tab ion-margin">
              <IonCol size="12">
              <IonSegment
              value={selectTab}
              onIonChange={handleTab}
              className="personalTab"
              >
                <IonSegmentButton value="parsonal">
                  <IonLabel>PARSONAL</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="savedcontent">
                  <IonLabel>SAVEDCONTENT</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="leaderboard">
                  <IonLabel>LEADERBOARD</IonLabel>
                </IonSegmentButton>
              </IonSegment>
  
                {selectTab === "parsonal" && (
                  <IonGrid>
                    <IonRow className="">
                      <IonCol size="4">
                        <IonButton
                          fill="clear"
                          routerLink="/dashboard"
                          className="CardBtn"
                        >
                          <div className="DashBoardImg">
                          
                            <IonText>Dashboard</IonText>
                          </div>
                        </IonButton>
                      </IonCol>
  
                      <IonCol size="4">
                        <IonButton
                          fill="clear"
                          routerLink="/my-recipe"
                          className="CardBtn"
                        >
                          <div className="DashBoardImg">
                            
                            <IonText>My Recipes</IonText>
                          </div>
                        </IonButton>
                      </IonCol>
  
  
                      <IonCol size="4">
                        <IonButton fill="clear" className="CardBtn" routerLink="/edit-profile">
                          <div className="DashBoardImg">
                           
                            <IonText>Profile Settings</IonText>
                          </div>
                        </IonButton>
                      </IonCol>
  
                      <IonCol size="4">
                        <IonButton fill="clear" className="CardBtn" routerLink="/change-password">
                          <div className="DashBoardImg">
                           
                            <IonText>Change Password</IonText>
                          </div>
                        </IonButton>
                      </IonCol>

                      <IonCol size="4">
                        <IonButton fill="clear" className="CardBtn" routerLink="/add-product">
                          <div className="DashBoardImg">
                            
                            <IonText>Add Product</IonText>
                          </div>
                        </IonButton>
                      </IonCol> 
                    </IonRow>
                  </IonGrid>
                )}
                {selectTab === "savedcontent" && <div className="ion-padding">Coming Soon....</div>}
                {selectTab === "leaderboard" && <div className="ion-padding">Coming Soon.....</div>}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Profile;
  