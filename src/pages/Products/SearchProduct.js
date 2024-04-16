import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
  useIonLoading,
} from "@ionic/react";
import Header from "../../components/Header";
import { bookmarkOutline, star, searchOutline } from "ionicons/icons";
import { add } from "lodash";
import debounce from "lodash/debounce";
import axios from "axios";
import { useAuth } from "../../contexts/CartContext";

const SearchProduct = () => {
  const [presentLoading] = useIonLoading();
  const [present, dismiss] = useIonLoading();

  const { addToCart } = useAuth();
  const [query, setQuery] = useState("");
  console.log('query',query);
  const [searchData, setSearchData] = useState([]);
  // console.log("searchData",searchData)
 
  const handleSubmit = async () => {
    if (!query) {
      return; 
    }
    present()
    const formdata = new FormData();
    formdata.append("keyword", query);
    formdata.append("limit", 50);
    formdata.append("pageno", 0);
    const response = await axios.post(
      "http://20.207.207.62/api/product-search-suggestion?keyword=Magic&limit=all&pageno=0",
      formdata
    )
    dismiss()
    .catch((e) => console.log(e));
    // console.log("response",response)
    setSearchData(response?.data?.subcatprod);
  };

  const debouncedHandleSubmit = debounce(handleSubmit);

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
    <IonPage>
      <Header />
      <IonContent>
        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol size="12" className="ion-padding">
              <div className="SerchBox">
                <IonSearchbar
                  className="searchBar"
                  value={query}
                  onIonChange={(e) => setQuery(e.detail.value)}
                />
                <IonButton
                  className="IconBtn SerchBtn"
                  fill="clear"
                  onClick={debouncedHandleSubmit}
                >
                <IonIcon color="primary" size="small" icon={searchOutline} />
                </IonButton>
              </div>
            </IonCol>
          </IonRow>

          <IonGrid className="ion-no-padding">
            <IonRow>
              {searchData?.map((item, index) => (
                <IonCol size="6" key={index}>
                  <IonCard
                    className="ProductCard"
                  >
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
                      </div>

                      <IonButton
                        fill="clear"
                        className="blank-btn"
                        routerLink={`/product-details/${item?.product_id}`}
                      >
                      <img
                        src={item?.images}
                        alt="category cover"
                        className="MainProductThumb"
                        onError={(e) => {
                          e.target.onerror = null; // Remove the event handler to prevent an infinite loop
                          e.target.src = "/assets/img/img-placeholder.jpg"; // Placeholder image URL
                        }}
                      />
                      </IonButton>
                      <img
                        src={item?.images}
                        alt="category cover"
                        className="MainProductThumb"
                        onError={(e) => {
                          e.target.onerror = null; // Remove the event handler to prevent an infinite loop
                          e.target.src = "/assets/img/img-placeholder.jpg"; // Placeholder image URL
                        }}/>
                      <div className="BookMark">
                        <IonIcon
                          color="primary"
                          size="small"
                          icon={bookmarkOutline}
                        />
                      </div>
                    </IonCardHeader>

                    <IonCardContent className="ProductDetails">
                      <IonText className="ProductTitle">
                        {item?.productName}
                      </IonText>
                      <div className="PriceRating">
                        <IonText color="dark" className="CurrentPrice">
                          ₹{" "}
                          {item &&
                            item.product_variant &&
                            item.product_variant[0] &&
                            item?.product_variant[0]
                              ?.offer_price}
                        </IonText>
                        <IonChip className="RateDesign">
                          <span>{item?.star_rating}</span>
                          <IonIcon color="light" size="small" icon={star} />
                        </IonChip>
                      </div>

                      <div className="OfferInfo">
                        <IonText color="dark" className="OldPrice">
                          {item &&
                            item.product_variant &&
                            item.product_variant[0] &&
                            item?.product_variant[0]
                              ?.main_price}
                        </IonText>
                        <IonChip className="offerBedge">
                          {item &&
                            item.product_variant &&
                            item.product_variant[0] &&
                            (
                              ((item?.product_variant[0]
                                ?.main_price -
                                item?.product_variant[0]
                                  ?.offer_price) /
                                item?.product_variant[0]
                                  ?.main_price) *
                              100
                            ).toFixed(0)}
                          % OFF
                        </IonChip>
                      </div>

                      <IonButton
                        className="AddToCartBtn"
                        size="default"
                        shape="round"
                        fill="outline"
                        // onClick={() => openModal(item && item)}
                      >
                        <div className="addText" onClick={()=>handleAdd(item)}>
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
export default SearchProduct;
