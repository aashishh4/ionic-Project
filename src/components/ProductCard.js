import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonChip,
    IonCol,
    IonIcon,
    IonText,
    useIonLoading,
  } from "@ionic/react";
  import { add, star } from "ionicons/icons";
  import { useAuth } from "../contexts/CartContext";
  import { useState } from "react";
  
  const ProductCard = (props) => {
    const [isbutton ,setIsbutton]=useState(true)
    const [presentLoading] = useIonLoading();

    const {addToCart}=useAuth()
    const { item, i } = props;
    // console.log("props", props); 
    // console.log("isbutton",isbutton)
 
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
      <IonCol size="6">
        <IonCard className="ProductCard" key={`category_product_list_${i}`}>
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
              onClick={()=>setIsbutton(false)} 
  
              fill="clear"
              className="blank-btn"
              routerLink={`/product-details/${item?.product_id}`}
            >
              <img
                src={item?.images}
                alt="category cover"
                className="MainProductThumb category"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/img/img-placeholder.jpg";
                }} 
              />            
            </IonButton>
          </IonCardHeader>
         
  
          <IonCardContent className="ProductDetails">
            <IonText className="ProductTitle">{item?.productName}</IonText>
            <div className="PriceRating">
              <div className="PriceText">
                <IonText color="dark" className="CurrentPrice">
                  {item &&
                    item?.product_variant &&
                    item?.product_variant[0] &&
                    item?.product_variant[0]?.offer_price}
                </IonText>
                <div className="OfferInfo">
                  <IonText color="dark" className="OldPrice">
                    {item &&
                      item?.product_variant &&
                      item?.product_variant[0] &&
                      item?.product_variant[0]?.main_price}
                  </IonText>
                  <IonChip className="offerBedge">
                    {item &&
                      item.product_variant && 
                      item.product_variant[0] &&
                      (
                        ((item?.product_variant[0]?.main_price -
                          item?.product_variant[0]?.offer_price) /
                          item?.product_variant[0]?.main_price) *
                        100
                      ).toFixed(0)}
                    % OFF
                  </IonChip>
                </div>
              </div>
  
              <IonChip className="RateDesign">
                <span>{item?.total_rating}</span>
                <IonIcon color="light" size="small" icon={star} />
              </IonChip>
            </div>
            {item?.status && isbutton ? (
              <IonButton
                className="AddToCartBtn"
                size="default"
                shape="round"
                fill="outline"
                onClick={() => handleAdd(item)}
              >
                <div className="addText">
                  Add
                  <IonIcon slot="end" size="small" icon={add} />
                </div>
              </IonButton>
              
            ) : (
              <IonButton
                onClick={() => {
                  // setNotifyData(product);
                  // setIsNotifyMe(true);
                }}
                className="AddToCartBtn"
                size="default"
                shape="round"
                fill="outline"
              >
                <div className="addText">Notify Me</div>
              </IonButton>
            )}
          </IonCardContent>
        </IonCard>
      </IonCol>
    );
  };
  
  export default ProductCard;
  