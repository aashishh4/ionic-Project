import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import LoginPopup from "../modal/LoginPopup";
import OTPPopup from "../modal/OTPPopup";
import {
  basketOutline,
  bookmarkOutline,
  fastFoodOutline,
  gridOutline,
  heartOutline,
  logInOutline,
  logOutOutline,
  personOutline,
} from "ionicons/icons";

import { useLogoContext } from "../contexts/LogoContext";
import { useAuth1 } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Header = () => {
  const { logout, isAuthenticated } = useAuth1();
  const { headerImage } = useLogoContext();
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenOtp, setIsOpenOtp] = useState(false);
  const history = useHistory();


  const handleLogout = () => {
    logout();
    history.push("/");
  };

  return (
    <>
      <IonHeader id="main-content">
        <IonToolbar>
          <IonGrid className="ion-no-padding">
            <IonRow className="ion-justify-content-between ion-padding ion-align-items-center">
              <IonCol size="auto">
                <IonButton
                  fill="clear"
                  routerLink="/home"
                  className="text-button"
                >
                  <div className="LogoGroup">
                    <IonImg
                      src={headerImage?.header_logo}
                      alt="Images"
                      className="mainLogo"
                    />
                    <img
                      src="/assets/img/ScanIcon.png"
                      alt="Images"
                      className="logoTag"
                      routerLink="/home"
                    />
                  </div>
                </IonButton>
              </IonCol>

              <IonCol size="auto" className="ion-justify-content-end">
                <IonButtons className="ion-justify-content-end">
                  <IonButton className="IconBtn" routerLink="/search-product">
                    <img
                      src="/assets/img/Search.png"
                      alt="Images"
                      className="TopBarIcons"
                    />
                  </IonButton>
                  {isAuthenticated && (
                    <IonButton className="IconBtn" routerLink="/submit-recipe">
                      <img
                        src="/assets/img/edit.png"
                        alt="Images"
                        className="TopBarIcons"
                      />
                    </IonButton>
                  )}

                  <IonMenuButton>
                    <img
                      src="/assets/img/menu.png"
                      alt="Images"
                      className="TopBarIcons"
                    />
                  </IonMenuButton>
                </IonButtons>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>

      <IonMenu side="end" contentId="main-content">
        <IonHeader className="MenuHead">
          <IonToolbar className="ion-padding">
            <IonTitle className="ion-no-padding">
              <img
                src="/assets/img/MainLogo.png"
                alt="Images"
                className="MenuMainLogo"
              />
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonList>
            {isAuthenticated ? (
              <>
                <IonItem lines="none" routerLink="/profile">
                  <IonIcon
                    aria-hidden="true"
                    icon={personOutline}
                    slot="start"
                  ></IonIcon>
                  <IonLabel>Profile</IonLabel>
                </IonItem>

                <IonItem lines="none" routerLink="/home-recipe">
                  <IonIcon
                    aria-hidden="true"
                    icon={fastFoodOutline}
                    slot="start"
                  ></IonIcon>
                  <IonLabel>Recipe</IonLabel>
                </IonItem>

                <IonItem lines="none" routerLink="/main-category">
                  <IonIcon
                    aria-hidden="true"
                    icon={gridOutline}
                    slot="start"
                  ></IonIcon>
                  <IonLabel>Category</IonLabel>
                </IonItem>

                <IonItem lines="none" routerLink="/order-list">
                  <IonIcon
                    aria-hidden="true"
                    icon={basketOutline}
                    slot="start"
                    color="danger"
                  ></IonIcon>
                  <IonLabel>My orders</IonLabel>
                </IonItem>

                <IonItem lines="none" routerLink="/wish-list">
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    icon={heartOutline}
                  />
                  <IonLabel>WishList</IonLabel>
                </IonItem>

                <IonItem lines="none" routerLink="/bookmark">
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    icon={bookmarkOutline}
                  />
                  <IonLabel>BookMark</IonLabel>
                </IonItem>

                <IonItem lines="none" onClick={handleLogout}>
                  <IonIcon
                    aria-hidden="true"
                    icon={logOutOutline}
                    slot="start"
                  ></IonIcon>
                  <IonLabel>Sign out</IonLabel>
                </IonItem>
              </>
            ) : (
              <>
                <IonItem lines="none" routerLink="/home-recipe">
                  <IonIcon
                    aria-hidden="true"
                    icon={fastFoodOutline}
                    slot="start"
                  ></IonIcon>
                  <IonLabel>Recipe</IonLabel>
                </IonItem>
                <IonItem lines="none" routerLink="/main-category">
                  <IonIcon
                    aria-hidden="true"
                    icon={gridOutline}
                    slot="start"
                  ></IonIcon>
                  <IonLabel>Category</IonLabel>
                </IonItem>
                <IonMenuToggle>
                  <IonItem lines="none" onClick={() => setIsOpenLogin(true)}>
                    <IonIcon
                      aria-hidden="true"
                      icon={logInOutline}
                      slot="start"
                    ></IonIcon>
                    <IonLabel>Login</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              </>
            )}
          </IonList>
        </IonContent>
      </IonMenu>

      <LoginPopup
        isOpen={isOpenLogin}
        setIsOpen={setIsOpenLogin}
        isOtpOpen={isOpenOtp}
        setIsOtpOpen={setIsOpenOtp}
      />
      <OTPPopup isOpen={isOpenOtp} setIsOpen={setIsOpenOtp} />
    </>
  );
};

export default Header;
