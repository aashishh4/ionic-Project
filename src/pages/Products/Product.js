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
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  useIonLoading,
} from "@ionic/react";
import {
  closeCircle,
  star,
  bookmarkOutline,
  starOutline,
  heartSharp,
  helpCircle,
} from "ionicons/icons";

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCard from "../../components/ProductCard";
import styles from "./Product.module.css";
import Header from "../../components/Header";
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "@ionic/react/css/ionic-swiper.css";
import axios from "axios";
import { useAuth } from "../../contexts/CartContext";

const Product = () => {
  const { addToCart } = useAuth()
  const { id } = useParams();
  const [productdetails, setProductdetails] = useState({});
  const [AllProduct, setAllProduct] = useState({});
  const [selectedTab, setSelectedTab] = useState("details");
  const history = useHistory();
  const [presentLoading] = useIonLoading();

  // console.log("selectedTab", selectedTab)
  // console.log("AllProduct", AllProduct)
  // console.log("productdetails", productdetails);
  // console.log("id", id)

  const ProductDetail = async () => {
    try {
      const response = await axios.get(`http://20.207.207.62/api/productdetails_json/${id}`);
      // console.log("response",response)
      setProductdetails(response?.data?.data?.product_details);
      setAllProduct(response)

    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    ProductDetail();
  }, [id])


  const handleTabChange = (event) => {
    setSelectedTab(event.detail.value);
  };

  function renderRatingStars(rating) {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(<IonIcon key={i} icon={star} color="warning" />);
    }
    for (let i = rating + 1; i <= 5; i++) {
      stars.push(<IonIcon key={i} icon={starOutline} />);
    }
    return stars;
  };

  const goBack = () => {
    history.goBack();
  };
  
  const handleAdd = () => {
    if (productdetails.product_variant_result && productdetails.product_variant_result.length > 0) {
      const obj = {
        product_id: productdetails.id,
        quantity: 1,


        productName: productdetails.slug,
        images: productdetails.images,
        brand_name: productdetails.brand_name,

        product_variant: [{
          main_price: productdetails.product_variant_result[0]?.main_price,
          offer_price: productdetails.product_variant_result[0]?.offer_price,
        },{
          main_price: productdetails.product_variant_result[0]?.main_price,
          offer_price: productdetails.product_variant_result[0]?.offer_price,
        }]

      };
      presentLoading({
        message: "Adding to cart...",
        translucent: true,
        duration: 1000 
      }).then(() => {
        addToCart(obj);
      });
     
    } else {
      console.error("Product variant result is undefined or empty.");
    }
  };




  return (

    <div>
      <IonPage id="productDetails-page">
        <Header />
        <IonContent fullscreen>
          <IonHeader className="TitleHead bottom-shadow">
            <IonButton
              className="IconBtn"
              fill="clear"
              onClick={goBack}
            >
              <i class="material-icons dark">west</i>
            </IonButton>
            <IonTitle color="dark">
              {productdetails &&
                productdetails?.productName}
            </IonTitle>
          </IonHeader>
          <IonGrid className="ion-no-padding ion-padding-bottom">
            <IonRow>
              <IonCol size="12">
                <IonCard className={styles.ProductCard}>
                  <IonCardHeader>
                    <div className={styles.ThumbIconsBlock}>
                      <div className={styles.productCardActions}>
                        <IonButton fill="clear" className="IconBtn">
                          <div className="counter">
                            <img
                              src="/assets/img/Mysmart.png"
                              alt="Images"
                              className="icon-img"
                            />
                            <span>{productdetails && productdetails?.imk_num}</span>
                          </div>
                        </IonButton>
                      </div>
                      <div className={styles.productCardActions}>
                        <IonButton fill="clear" className="IconBtn">
                          <img
                            src={productdetails?.foodType === "non-vegetarian" ?
                              "/assets/img/img-placeholder.jpg" : "/assets/img/veg-icon.png"
                            }
                            alt="Images"
                            className={styles.chefhat}
                          />
                        </IonButton>
                        <IonButton fill="clear" className="IconBtn">
                          <IonIcon
                            size="large"
                            color="danger"
                            icon={bookmarkOutline}
                          />
                        </IonButton>
                      </div>
                    </div>
                    <Swiper
                      className={styles.ThumbSlide}
                      modules={[Pagination]}
                      pagination={{ clickable: true }}
                    >
                      <SwiperSlide>
                        <img
                          src={productdetails && productdetails?.images}
                          alt="product pic"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assets/img/img-placeholder.jpg";
                          }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={productdetails && productdetails?.images}
                          alt="product pic"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assets/img/img-placeholder.jpg";
                          }}

                        />
                      </SwiperSlide>
                    </Swiper>
                    <IonCardContent className={styles.ProductInfo}>
                      <span className={styles.cateName}>
                        {productdetails && productdetails?.brand_name}
                      </span>
                      <div className={styles.pTitle}>
                        <IonText color="dark">
                          {productdetails && productdetails?.productName}
                        </IonText>
                        <IonChip className={styles.RateDesignInner}>
                          {productdetails && productdetails?.total_rating}
                          <IonIcon color="light" size="small" icon={star} />
                        </IonChip>
                      </div>
                      <span className="productName">
                        {/* {productdetails && productdetails?.slug} */}
                      </span>
                      <div className={styles.priceInfo}>
                        {productdetails &&
                          productdetails?.product_variant_result &&
                          productdetails?.product_variant_result[0] &&
                          productdetails?.product_variant_result[0].offer_price}
                        <div className="addButn">
                          <div className="OfferInfo">
                            <IonText color="dark" className="OldPrice">
                              {productdetails &&
                                productdetails?.product_variant_result &&
                                productdetails?.product_variant_result[0] &&
                                productdetails?.product_variant_result[0].main_price}
                            </IonText>
                            <IonChip className="offerBedge">
                              {productdetails &&
                                productdetails.product_variant_result &&
                                productdetails.product_variant_result[0] &&
                                (
                                  ((productdetails?.product_variant_result[0]?.main_price -
                                    productdetails?.product_variant_result[0]?.offer_price) /
                                    productdetails?.product_variant_result[0]?.main_price) *
                                  100
                                ).toFixed(0)}
                              % OFF
                            </IonChip>
                          </div>
                          <IonButton
                            className="AddToCart"
                            size="default"
                            shape="round"
                            fill="outline"
                            color="warning"
                          >
                            <div className="flex ion-justify-content-between ion-align-items-center w-full"
                              onClick={() => handleAdd()}>
                              AddDD
                            </div>
                          </IonButton>
                        </div>
                      </div>
                    </IonCardContent>
                  </IonCardHeader>
                </IonCard>

                <div className="btnGroup ion-padding">
                  <IonButton
                    size="default"
                    expand="block"
                    fill="outline"
                    className={styles.chefbutton}
                  >
                    <img
                      className="mr-05"
                      src="/assets/img/Mysmart.png"
                      alt="Images"
                    />
                    MySmartKitchen
                  </IonButton>
                  <IonButton
                    size="default"
                    expand="block"
                    fill="outline"
                    className={styles.chefbutton}
                  >
                    <IonIcon slot="start" icon={bookmarkOutline} size="small" />
                    Wishlist
                  </IonButton>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>

          <IonGrid className="ion-no-padding">
            <IonRow>
              <IonCol size="12">
                <IonSegment
                  value={selectedTab}
                  onIonChange={handleTabChange}
                  className="FillSegment"
                >
                  <IonSegmentButton value="details">
                    <IonLabel>Details</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="nutrition">
                    <IonLabel>Nutrition</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="reviews">
                    <IonLabel>Reviews</IonLabel>
                  </IonSegmentButton>
                </IonSegment>

                {selectedTab === "details" && (
                  <IonGrid className="ion-no-padding ion-padding-vertical">
                    <IonRow className={styles.TabContentCard}>
                      <IonCol size="12">
                        <IonHeader className="TitleHead">
                          <IonTitle>Ratings</IonTitle>
                        </IonHeader>
                      </IonCol>

                      <IonCol
                        size="6"
                        className="ion-no-padding ion-padding-horizontal ion-padding-bottom"
                      >
                        <IonText color="dark" className={styles.ratingTitle}>
                          Money Rating
                        </IonText>
                        <IonCol className="ratingStar">
                          {renderRatingStars(
                            AllProduct?.data?.product_rating?.money_rating
                          )}
                        </IonCol>
                      </IonCol>

                      <IonCol
                        size="6"
                        className="ion-no-padding ion-padding-horizontal ion-padding-bottom"
                      >
                        <IonText color="dark" className={styles.ratingTitle}>
                          Overall Rating
                        </IonText>
                        <IonCol className="ratingStar">
                          {renderRatingStars(
                            AllProduct?.data?.product_rating?.overall_rating
                          )}
                        </IonCol>
                      </IonCol>

                      <IonCol
                        size="6"
                        className="ion-no-padding ion-padding-horizontal ion-padding-bottom"
                      >
                        <IonText color="dark" className={styles.ratingTitle}>
                          Packaging Rating
                        </IonText>
                        <IonCol className="ratingStar">
                          {renderRatingStars(
                            AllProduct?.data?.product_rating?.packaging_rating
                          )}
                        </IonCol>
                      </IonCol>

                      <IonCol
                        size="6"
                        className="ion-no-padding ion-padding-horizontal ion-padding-bottom"
                      >
                        <IonText color="dark" className={styles.ratingTitle}>
                          Texture Rating
                        </IonText>
                        <IonCol className="ratingStar">
                          {renderRatingStars(
                            AllProduct?.data?.product_rating?.texture_rating
                          )}
                        </IonCol>
                      </IonCol>
                    </IonRow>

                    <IonRow className={styles.TabContentCard}>
                      <IonCol size="12">
                        <IonHeader className="TitleHead">
                          <IonTitle>More Information</IonTitle>
                        </IonHeader>
                      </IonCol>

                      <IonCol
                        size="12"
                        className="ion-padding-horizontal ion-padding-bottom"
                      >
                        <div className={styles.moreInfo}>
                          <IonText color="dark">Shelf Life :</IonText>
                          <IonText color="dark">
                            {
                              AllProduct?.data?.data?.product_details
                                ?.shelf_life
                            }
                          </IonText>
                        </div>
                        <div className={styles.moreInfo}>
                          <IonText color="dark">FSSAI Number :</IonText>
                          <IonText color="dark">
                            {AllProduct &&
                              AllProduct.data &&
                              AllProduct.data.data &&
                              AllProduct.data.data.product_details &&
                              AllProduct?.data?.data?.product_details?.fssai_number
                            }
                          </IonText>
                        </div>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                )}
                {selectedTab === "nutrition" && (
                  <IonGrid className="ion-no-padding ion-padding-vertical">
                    <IonRow className={styles.TabContentCard}>
                      <IonCol size="12">
                        <IonHeader className="TitleHead">
                          <IonTitle>Nutrition Grid</IonTitle>
                        </IonHeader>
                      </IonCol>

                      <IonCol size="12" className={styles.nutritionListBlock}>
                        <div className={styles.listIngredients}>
                          <IonText color="dark">Serving Size</IonText>
                          <IonText color="dark">

                          </IonText>
                        </div>
                        <div className={styles.listIngredients}>
                          <IonText color="dark">Added Sugar</IonText>
                          <IonText color="dark">

                          </IonText>
                        </div>
                        <div className={styles.listIngredients}>
                          <IonText color="dark">calcium</IonText>
                          <IonText color="dark"></IonText>
                        </div>
                        <div className={styles.listIngredients}>
                          <IonText color="dark">Calories</IonText>
                          <IonText color="dark"></IonText>
                        </div>
                        <div className={styles.listIngredients}>
                          <IonText color="dark">Carbohydrates</IonText>
                          <IonText color="dark">

                          </IonText>
                        </div>
                        <div className={styles.listIngredients}>
                          <IonText color="dark">Iron</IonText>
                          <IonText color="dark"></IonText>
                        </div>
                        <div className={styles.listIngredients}>
                          <IonText color="dark">Natural Sugar</IonText>
                          <IonText color="dark">

                          </IonText>
                        </div>
                        <div className={styles.listIngredients}>
                          <IonText color="dark">Phosphorus</IonText>
                          <IonText color="dark">

                          </IonText>
                        </div>
                        <div className={styles.listIngredients}>
                          <IonText color="dark">Potassium</IonText>
                          <IonText color="dark"></IonText>
                        </div>
                        <div className={styles.listIngredients}>
                          <IonText color="dark">Protein</IonText>
                          <IonText color="dark"></IonText>
                        </div>
                        <div className={styles.listIngredients}>
                          <IonText color="dark">Sodium</IonText>
                          <IonText color="dark"></IonText>
                        </div>
                        <div className={styles.listIngredients}>
                          <IonText color="dark">Total Fat</IonText>
                          <IonText color="dark"></IonText>
                        </div>
                      </IonCol>
                    </IonRow>

                    <IonRow className={styles.TabContentCard}>
                      <IonCol size="12">
                        <IonHeader className="TitleHead">
                          <IonTitle>Nutrition Notes</IonTitle>
                        </IonHeader>
                      </IonCol>

                      <IonCol size="12" className={styles.nutritionListBlock}>
                        <div className={styles.listIngredients}>
                          <IonText color="dark"></IonText>
                        </div>
                      </IonCol>
                    </IonRow>

                    <IonRow className={styles.TabContentCard}>
                      <IonCol size="12">
                        <IonHeader className="TitleHead">
                          <IonTitle>List of Ingredients</IonTitle>
                          <IonText>
                            Tap On Ingredients to know more and mark your
                            prefences
                          </IonText>
                        </IonHeader>
                      </IonCol>
                      <IonCol size="12" className={styles.nutritionListBlock}>
                        <IonText color="dark">

                        </IonText>
                        <IonIcon
                          icon={helpCircle}
                          size="large"
                          color="warning"
                        />
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                )}
                {selectedTab === "reviews" && (
                  <IonGrid className="ion-padding">
                    <IonRow className="ion-margin-bottom">
                      <IonCol
                        size="12"
                        className="flex ion-justify-content-center ion-align-items-center"
                      >
                        <IonButton color="medium">
                          <IonIcon slot="start" />
                          Write a Review
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                )}
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonGrid className="ion-no-padding ion-padding-bottom">
            <IonHeader className="TitleHead">
              <IonTitle color="dark">Similar Product</IonTitle>
            </IonHeader>
            <IonRow>
              {AllProduct &&
                AllProduct?.data &&
                AllProduct?.data?.data &&
                AllProduct?.data?.data?.likeproduct?.map((item, i) => {
                  return (
                    <ProductCard
                      key={`similar_product_${i}`}
                      item={item}
                      i={i}
                      isFavourite={false}
                    />
                  );
                })}
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default Product;
