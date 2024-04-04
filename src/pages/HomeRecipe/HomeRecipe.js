import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSlide,
  IonSlides,
  IonTitle,
} from "@ionic/react";
import React from "react";
import Header from "../../components/Header";
import {
  arrowForwardCircle,
  atCircleOutline,
  bookmarkSharp,
  flameOutline,
  timeOutline,
} from "ionicons/icons";

const HomeRecipe = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonHeader className="TitleHead FlexCol">
          <IonLabel>Hi, Deepshree</IonLabel>
          <IonTitle color="dark">What would you cook today?</IonTitle>
        </IonHeader>
        <IonRow className="ion-padding">
          <IonCol size="12">
            <IonSearchbar
              className="AddressSearch"
              placeholder="Search food"
            ></IonSearchbar>
          </IonCol>
        </IonRow>

        <IonRow className="ion-padding-horizontal">
          <IonCol>
            <IonSlides className="SlidesRecipes">
              <IonSlide>
                <img src="/assets/img/beverage.jpg" alt="" />
              </IonSlide>
              <IonSlide>
                <img src="/assets/img/dairy.png" alt="" />
              </IonSlide>
              <IonSlide>
                <img
                  src="/assets/img/frozen_snacks_adn_ready_to_eat.png"
                  alt=""
                />
              </IonSlide>
              <IonSlide>
                <img src="/assets/img/sauces_jams.jpg" alt="" />
              </IonSlide>
            </IonSlides>
          </IonCol>
        </IonRow>

        <IonRow className="ion-padding-vertical">
          <IonCol>
            <IonTitle color="dark">Popular Today</IonTitle>
          </IonCol>
        </IonRow>

        <IonRow className="ion-padding-bottom CustomGap">
          <IonCol size="6">
            <IonCard className="ProductCard">
              <div className="RecipePro">
                <img
                  src="/assets/img/1525832641-Peanut-Butter-Jelly-French-Toast-Listing.jpg"
                  alt=""
                />
                <div className="TimeingBar">
                  <div className="ReciRow">
                    <IonIcon icon={atCircleOutline}></IonIcon>
                    <IonLabel>Medium</IonLabel>
                  </div>
                  <div className="ReciRow">
                    <IonIcon icon={timeOutline}></IonIcon>
                    <IonLabel>30 min</IonLabel>
                  </div>
                </div>
              </div>
            </IonCard>
          </IonCol>
          <IonCol size="6">
            <IonCard className="ProductCard">
              <div className="RecipePro">
                <img src="/assets/img/1525870462-Listing.jpg" alt="" />
                <div className="TimeingBar">
                  <div className="ReciRow">
                    <IonIcon icon={atCircleOutline}></IonIcon>
                    <IonLabel>Medium</IonLabel>
                  </div>
                  <div className="ReciRow">
                    <IonIcon icon={timeOutline}></IonIcon>
                    <IonLabel>30 min</IonLabel>
                  </div>
                </div>
              </div>
            </IonCard>
          </IonCol>
        </IonRow>

        <IonRow className="ion-padding-vertical ion-padding-horizontal ion-align-items-center">
          <IonCol size="6">
            <IonTitle color="dark" class="ion-no-padding">
              Recent
            </IonTitle>
          </IonCol>
          <IonCol size="6" className="ion-text-right">
            <IonLabel>See All</IonLabel>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="6">
            <IonCard className="ProductCard">
              <div className="RecentProducts">
                <img
                  className="RecentUserImg"
                  src="/assets/img/1525870462-Listing.jpg"
                  alt=""
                />
                <div className="BottomBar">
                  <div className="TitelMeta">
                    <IonLabel>Chicken Caesar Salad</IonLabel>
                    <div className="RecentMeta">
                      <div className="FlameFire commenbar">
                        <IonIcon icon={flameOutline}></IonIcon>
                        <IonLabel>492 Kcal</IonLabel>
                      </div>
                      <div className="TimeMeta commenbar">
                        <IonIcon icon={timeOutline}></IonIcon>
                        <IonLabel>30 min</IonLabel>
                      </div>
                    </div>
                  </div>
                  <div className="UserClick">
                    <IonIcon icon={bookmarkSharp} color="primary"></IonIcon>
                  </div>
                </div>
              </div>
            </IonCard>
          </IonCol>
          <IonCol size="6">
            <IonCard className="ProductCard">
              <div className="RecentProducts">
                <img
                  className="RecentUserImg"
                  src="/assets/img/1525832641-Peanut-Butter-Jelly-French-Toast-Listing.jpg"
                  alt=""
                />
                <div className="BottomBar">
                  <div className="TitelMeta">
                    <IonLabel>Chicken Caesar Salad</IonLabel>
                    <div className="RecentMeta">
                      <div className="FlameFire commenbar">
                        <IonIcon icon={flameOutline}></IonIcon>
                        <IonLabel>492 Kcal</IonLabel>
                      </div>
                      <div className="TimeMeta commenbar">
                        <IonIcon icon={timeOutline}></IonIcon>
                        <IonLabel>30 min</IonLabel>
                      </div>
                    </div>
                  </div>
                  <div className="UserClick">
                    <IonIcon icon={bookmarkSharp} color="primary"></IonIcon>
                  </div>
                </div>
              </div>
            </IonCard>
          </IonCol>
        </IonRow>

        <IonRow className="ion-padding-vertical ion-padding-horizontal ion-align-items-center">
          <IonCol size="6">
            <IonTitle color="dark" class="ion-no-padding">
              My Recipes
            </IonTitle>
          </IonCol>
          <IonCol size="6" className="ion-text-right">
            <IonLabel>See All</IonLabel>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="6">
            <IonCard className="ProductCard">
              <div className="RecentProducts">
                <img
                  className="RecentUserImg"
                  src="/assets/img/1525870462-Listing.jpg"
                  alt=""
                />
                <div className="BottomBar">
                  <div className="TitelMeta">
                    <IonLabel>Chicken Caesar Salad</IonLabel>
                    <div className="RecentMeta">
                      <div className="FlameFire commenbar">
                        <IonIcon icon={flameOutline}></IonIcon>
                        <IonLabel>492 Kcal</IonLabel>
                      </div>
                      <div className="TimeMeta commenbar">
                        <IonIcon icon={timeOutline}></IonIcon>
                        <IonLabel>30 min</IonLabel>
                      </div>
                    </div>
                  </div>
                  <div className="UserClick">
                    <IonIcon
                      icon={arrowForwardCircle}
                      color="primary"
                    ></IonIcon>
                  </div>
                </div>
              </div>
            </IonCard>
          </IonCol>
          <IonCol size="6">
            <IonCard className="ProductCard">
              <div className="RecentProducts">
                <img
                  className="RecentUserImg"
                  src="/assets/img/1525832641-Peanut-Butter-Jelly-French-Toast-Listing.jpg"
                  alt=""
                />
                <div className="BottomBar">
                  <div className="TitelMeta">
                    <IonLabel>Chicken Caesar Salad</IonLabel>
                    <div className="RecentMeta">
                      <div className="FlameFire commenbar">
                        <IonIcon icon={flameOutline}></IonIcon>
                        <IonLabel>492 Kcal</IonLabel>
                      </div>
                      <div className="TimeMeta commenbar">
                        <IonIcon icon={timeOutline}></IonIcon>
                        <IonLabel>30 min</IonLabel>
                      </div>
                    </div>
                  </div>
                  <div className="UserClick">
                    <IonIcon
                      icon={arrowForwardCircle}
                      color="primary"
                    ></IonIcon>
                  </div>
                </div>
              </div>
            </IonCard>
          </IonCol>
        </IonRow>

        <IonRow className="ion-padding-vertical ion-padding-horizontal">
          <IonCol size="12">
            <IonSegment value="Salad" scrollable>
              <IonSegmentButton value="Salad">
                <IonLabel className="ion-no-margin">Salad</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="Appetizer">
                <IonLabel className="ion-no-margin">Appetizer</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="Breckfast">
                <IonLabel className="ion-no-margin">Breckfast</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="Noodle">
                <IonLabel className="ion-no-margin">Noodle</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonCol>
        </IonRow>

        <IonGrid className="ion-padding-bottom">
          <IonRow>
            <IonCol size="4" className="CustomGaps">
              <div className="RecipiPros">
                <img
                  src="/assets/img/1525832641-Peanut-Butter-Jelly-French-Toast-Listing.jpg"
                  alt=""
                />
                <div className="UserMetas">
                  <IonTitle className="ion-no-padding">Indonesian</IonTitle>
                  <IonLabel>By Adrianna curl</IonLabel>
                </div>
              </div>
            </IonCol>
            <IonCol size="4" className="CustomGaps">
              <div className="RecipiPros">
                <img
                  src="/assets/img/1525832641-Peanut-Butter-Jelly-French-Toast-Listing.jpg"
                  alt=""
                />
                <div className="UserMetas">
                  <IonTitle className="ion-no-padding">Indonesian</IonTitle>
                  <IonLabel>By Adrianna curl</IonLabel>
                </div>
              </div>
            </IonCol>
            <IonCol size="4" className="CustomGaps">
              <div className="RecipiPros">
                <img
                  src="/assets/img/1525832641-Peanut-Butter-Jelly-French-Toast-Listing.jpg"
                  alt=""
                />
                <div className="UserMetas">
                  <IonTitle className="ion-no-padding">Indonesian</IonTitle>
                  <IonLabel>By Adrianna curl</IonLabel>
                </div>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomeRecipe;
