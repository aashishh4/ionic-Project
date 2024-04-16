import React, { useContext, useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  useIonLoading,
} from "@ionic/react";
import styles from "./Home.module.css";
import "./Home.css";
import {
  star,
  add,
  bookmarkOutline,
} from "ionicons/icons";
import "swiper/swiper-bundle.css";
import "@ionic/react/css/ionic-swiper.css";
import Header from "../components/Header";
import axios from "axios";
import { useAuth } from "../contexts/CartContext";

const ViewExclusiveProduct = () => {
  const [presentLoading] = useIonLoading();

  const { addToCart }=useAuth();
  const [ExclusiveProductdata, setExclusiveProductdata] = useState([])


  useEffect(() => {
    const ExclusiveApiData = async () => {
      try {  
        const response = await axios.get("http://20.207.207.62/api/getAllExclusiveProducts");
        // console.log("response", response.data.data)
        setExclusiveProductdata(response?.data?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    }
    ExclusiveApiData();
  }, [])

  function handleAdd(data) {
    presentLoading({
      message: "Adding to cart...",
      translucent: true,
      duration: 1000 
    }).then(() => {
      addToCart(data);
    });
  }

  return (
    <IonPage id="home-page" className={styles.homePage}>
      <Header />

      <IonContent fullscreen>
        <IonGrid className="ion-no-padding">
          <IonHeader className="TitleHead bottom-shadow">
            <IonButton className="backBtn" fill="clear" routerLink="/home">
              <i class="material-icons dark">west</i>
            </IonButton>
            <IonTitle  color="dark">Exclusive Product Stores</IonTitle>
          </IonHeader>
          <IonGrid className="ion-no-padding">
            <IonHeader className="TitleHead">
              <IonTitle>Exclusive Product Stores</IonTitle>
              
            </IonHeader>
            <IonRow>
              {ExclusiveProductdata?.map((item, i) => (

                <IonCol size="6" key={i}>
                  <IonCard className="ProductCard">
                    <IonCardHeader className="ProductThumb">
                      <div className="SmartKitchen">
                        <div className="counter">
                          <img
                            src="/assets/img/Mysmart.png"
                            alt="Images"
                            className="icon-img"
                          />
                          <span>{item?.imk_num}</span>
                        </div>
                        <img
                          src="/assets/img/veg-icon.svg"
                          alt="Images"
                          className="icon-img"
                        />

                      </div>

                      <div className="BookMark">
                        <IonIcon
                          color="primary"
                          size="small"
                          icon={bookmarkOutline}
                        />
                      </div>
                    </IonCardHeader>


                    <img src={item?.images} alt="product" />
                    <IonCardContent className="ProductDetails">
                      {item?.productName}
                      <IonText className="ProductTitle"></IonText>
                      <div className="PriceRating">


                        <IonText color="dark" className="CurrentPrice">
                          ₹
                          {item?.product_variant[0]?.offer_price}
                        </IonText>
                        <div className="OfferInfo">

                        </div>


                        <IonChip className="RateDesign">
                          <span>{item?.star_rating}</span>
                          <IonIcon color="light" size="small" icon={star} />
                        </IonChip>
                      </div>


                      <IonText color="dark" className="OldPrice">
                        {item?.product_variant[0]?.main_price}
                        <IonChip className="offerBedge">
                          {(((item?.product_variant[0]?.main_price -
                            item?.product_variant[0]?.offer_price) /
                            item?.product_variant[0]?.main_price) *
                            100).toFixed()}% OFF
                        </IonChip>
                      </IonText>
                      <IonButton
                        className="AddToCartBtn"
                        size="default"
                        shape="round"
                        fill="outline"
                      >
                        <div className="addText " onClick={()=>handleAdd(item)}>
                          Add
                          <IonIcon slot="end" size="small" icon={add} />
                        </div>
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ViewExclusiveProduct;
