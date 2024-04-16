import React, { useEffect, useState } from 'react'
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
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  useIonLoading,
} from "@ionic/react";
import styles from "./Home.module.css";
import "./Home.css";
import { star, add, bookmarkOutline, chevronForwardCircleSharp } from "ionicons/icons";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import '@ionic/react/css/ionic-swiper.css';
import Header from "../components/Header";
import axios from 'axios';
import { useLogoContext } from '../contexts/LogoContext';
import { useAuth } from '../contexts/CartContext';

const Home = () => {
  const [presentLoading] = useIonLoading();
  const { addToCart } = useAuth();
  const { headerImage } = useLogoContext();
  const [product, setproduct] = useState([]);
  const [productTrending, setproductTrending] = useState([]);

  useEffect(() => {
    const ExclusiveData = async () => {
      try {
        const response = await axios.get('http://20.207.207.62/api/getExclusiveProducts/5/0');
        // console.log("ExclusiveData", response.data.data);
        // console.log("response",response)
        setproduct(response?.data?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    ExclusiveData();
  }, []);


  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response1 = await axios.get('http://20.207.207.62/api/getTrendingProducts/5/0');
        // console.log(response1.data.data);
        const TrendingApidata = response1?.data?.data;
        setproductTrending(TrendingApidata);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTrending();
  }, []);

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
        <Swiper>
          <SwiperSlide>
            <img
              src={headerImage.home_banner}
              alt="Images"
              className="Banners"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src={headerImage.home_banner}
              alt="Images"
              className="Banners"
            />
          </SwiperSlide>
        </Swiper>


        <IonGrid className="ion-no-padding manage-product">
          <IonHeader className='TitleHead'>
            <IonTitle>
              Exclusive Product Stores
            </IonTitle>
            <IonButton fill="clear"
              className='IconBtn' size="small"
              routerLink="/exclusive-products">

              <IonIcon color="dark" size="large" icon={chevronForwardCircleSharp} />
            </IonButton>

          </IonHeader>

          <Swiper slidesPerView={2}>


            {product && product.map((item, i) => (
              <SwiperSlide key={i}>
                <IonCard className="ProductCard">
                  <IonCol size="6">
                    <IonCard className={styles.productCard}>
                      <IonCardHeader className="ProductThumb" >
                        <div>
                          <div className="SmartKitchen">
                            <div className="counter">

                              <img src="/assets/img/Mysmart.png" alt="Images" className="icon-img" />
                            </div>
                            {item?.foodtype === "vegetarian" ? (
                              <img src="/assets/img/veg-icon.svg" alt="Images" className="icon-img" />
                            ) : (
                              <img
                                src="/assets/img/non-veg-icon.svg"
                                alt="Images"
                                className="icon-img"
                              />
                            )}
                            <span>{item.imk_num}</span>

                          </div>
                          <div className="BookMark">
                            <IonIcon
                              color="primary"
                              size="small"
                              icon={bookmarkOutline}
                            />
                          </div>
                        </div>
                      </IonCardHeader>

                      <img src={item.images} alt="product" />
                      <IonCardContent className={styles.productCardContent}>
                        <h4>{item.productName}</h4>
                      </IonCardContent>
                      <IonCardContent className="ProductDetails">
                        <IonText className="ProductTitle"></IonText>
                        <IonText className="ProductBrandname">
                          {/* <span>{item.brand_name}</span> */}
                        </IonText>
                        <div className="PriceRating">
                          <div>
                            <IonText color="dark" className="CurrentPrice">
                              ₹{item?.product_variant[0]?.offer_price}
                            </IonText>
                            <div className="OfferInfo">
                              <IonText color="dark" className="OldPrice">
                                {item?.product_variant[0]?.main_price}
                              </IonText>

                              <IonChip className="offerBedge">
                                {(((item.product_variant[0].main_price
                                  - item.product_variant[0].offer_price)
                                  / item.product_variant[0].main_price) * 100)
                                  .toFixed()} %OFF
                              </IonChip>
                            </div>
                          </div>
                          <IonChip className="RateDesign">
                            <span>{item.star_rating}</span>
                            <IonIcon color="light" size="small" icon={star} />
                          </IonChip>
                        </div>
                        <IonButton className="AddToCartBtn"
                          size="default" shape="round"
                          fill="outline"
                          onClick={() => handleAdd(item)}>
                          <div className="addText">
                            Add
                            <IonIcon slot="end" size="small" icon={add} />
                          </div>
                        </IonButton>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonCard>
              </SwiperSlide>
            ))}
          </Swiper>
          <IonRow className="ion-padding">
            <IonCol size="12" className="flex ion-justify-content-center">
              <IonButton size="default"
                fill="outline"
                routerLink="/exclusive-products">
                View More
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid className="ion-no-padding manage-product">
          <IonHeader className='TitleHead'>
            <IonTitle>See What’s Trending</IonTitle>
            <IonButton fill="clear"
              className='IconBtn'
              size="small"
              routerLink="/trending-products">
              <IonIcon color="dark" size="large" icon={chevronForwardCircleSharp} />
            </IonButton>
          </IonHeader>

          <Swiper slidesPerView={2} className={styles.swipertab} >
            {productTrending && productTrending?.map((item, i) => (
              <SwiperSlide key={item}>
                <IonCard className="ProductCard">
                  <IonCol size="5" key={{ i }}>
                    <IonCard className={styles.productCard}>
                      <IonCardHeader className="ProductThumb">
                        <div className="SmartKitchen">
                          <div className="counter">
                            <img src="/assets/img/Mysmart.png" alt="Images" className="icon-img" />
                          </div>
                          {item?.foodtype === "vegetarian" ? (
                            <img src="/assets/img/veg-icon.svg"
                              alt="Images"
                              className="icon-img"
                            />
                          ) : (
                            <img
                              src="/assets/img/non-veg-icon.svg"
                              alt="Images"
                              className="icon-img"
                            />
                          )}
                          <span>{item.imk_num}</span>
                        </div>

                        <div className="BookMark">
                          <IonIcon
                            color="primary"
                            size="small"
                            icon={bookmarkOutline}
                          />
                        </div>
                      </IonCardHeader>

                      <img src={item.images} alt="product" />
                      <IonCardContent className={styles.productCardContent}>
                        <p>{item.productName}</p>
                      </IonCardContent>
                      <IonCardContent className="ProductDetails">
                        <IonText className="ProductTitle"></IonText>
                        <IonText className="ProductBrandname">
                          {/* <span>{item.brand_name}</span> */}
                        </IonText>
                        <div className="PriceRating">
                          <div className="PriceText">
                            <IonText color="dark" className="CurrentPrice">
                              ₹{item.product_variant[0].offer_price}
                            </IonText>
                            <div className="OfferInfo">
                              <IonText color="dark" className="OldPrice">
                                {item.product_variant[0].main_price}
                              </IonText>
                              <IonChip className="offerBedge">
                                {(((item.product_variant[0].main_price -
                                  item.product_variant[0].offer_price) /
                                  item.product_variant[0].main_price) * 100)
                                  .toFixed()} %OFF
                              </IonChip>
                            </div>
                          </div>
                          <div className="PriceRating">
                            <IonChip className="RateDesign">
                              <span>{item.star_rating}</span>
                              <IonIcon color="light" size="small" icon={star} />
                            </IonChip>
                          </div>
                        </div>
                        <IonButton className="AddToCartBtn"
                          size="default"
                          shape="round"
                          fill="outline"
                          onClick={() => handleAdd(item)}>
                          <div className="addText">
                            Add
                            <IonIcon slot="end" size="small" icon={add} />
                          </div>
                        </IonButton>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonCard>
              </SwiperSlide>
            ))}
          </Swiper>
          <IonRow className="ion-padding">
            <IonCol size="12" className="flex ion-justify-content-center">
              <IonButton
                size="default"
                fill="outline"
                routerLink="/trending-products"
              >
                View More
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage >
  );
};

export default Home;
