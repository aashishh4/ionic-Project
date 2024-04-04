/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  IonButton,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemSliding,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonList,
  IonModal,
  IonToolbar,
  IonButtons
} from "@ionic/react";
import { add, home } from "ionicons/icons";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import styles from "./CartProducts.module.css";
import { useAuth } from "../../contexts/CartContext";
import LoginPopup from "../../modal/LoginPopup";
import OTPPopup from "../../modal/OTPPopup";
import AddressPopup from "../../modal/AddressPopup";
import { useAuth1 } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { closeCircleOutline } from "ionicons/icons";
import axios from "axios";


const CartProducts = () => {
  const history = useHistory();
  const { isAuthenticated } = useAuth1();
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenOtp, setIsOpenOtp] = useState(false)
  const { cartItems, removeFromCart, updateQuantity } = useAuth();
  const [isOpenChange, setIsOpenChange] = useState(false)
  const [userAddressData, setUserAddressData] = useState([]);
  const [currentUserAddressData, setCurrentUserAddressData] = useState([])
  // console.log('userAddressData', userAddressData)
  // console.log('currentUserAddressData', currentUserAddressData);
  // console.log("cartItems",cartItems)
  const [isOpen, setIsOpen] = useState(false);

  const handleIncrement = (product) => {
    updateQuantity(product, 1);
    updateLocalStorage();
  };

  const handleDecrement = (product) => {
    updateQuantity(product, -1);
    updateLocalStorage();
  };

  const handleRemove = (product) => {
    removeFromCart(product);
    updateLocalStorage();
    // console.log('productId',product)
  };
  const updateLocalStorage = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };
  // const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.product_variant[0].offer_price * item.quantity), 0);
  const DiscountPrice = cartItems.reduce((acc, item) => acc + (item.product_variant[0].main_price * item.quantity), 0);

  function handleCheckout() {
    history.push("/add-payment");
  }

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const response = await axios.get('http://20.207.207.62/api/get-user-address-list');
        // console.log("user-address-list", response);
        setUserAddressData(response?.data?.data);
        setCurrentUserAddressData(response?.data?.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserAddress();
  }, []);

  return (
    <IonPage id="cart-page">
      <Header />

      <IonContent fullscreen>
        <IonHeader className="TitleHead bottom-shadow">
          <IonButton className="IconBtn" fill="clear" routerLink="/main-category">
            <i class="material-icons dark">west</i>
          </IonButton>
          <IonTitle color="dark">Review Cart</IonTitle>
        </IonHeader>

        <IonGrid className="ion-no-padding">
          <IonRow className="bottom-shadow">
            <IonCol size="12">
              <IonList className="ion-padding-top OrderList">
                {cartItems &&
                  cartItems?.map((list, i) => (
                    <IonItemSliding className={styles.ItemSlide}>
                      <IonItem key={i}>
                        <IonLabel>
                          <div className={styles.productDetails}>
                            <div className={styles.productThumb}>
                              <img src={list.images || "/assets/img/product-img.png"} alt="Images"
                              />
                            </div>

                            <div className={styles.productInfo}>
                              <IonText
                                color="dark"
                                className={styles.productTitle}
                              >
                                {list.productName}
                              </IonText>
                              <IonText color="dark" className={styles.productCate}>
                                {list.brand_name}
                              </IonText>
                              <IonText color="dark" className={styles.productQty}>
                                {/* {list?.product_variant[0]?.qty} */}
                              </IonText>

                            </div>
                          </div>
                          <div>
                            <IonButton onClick={() => handleDecrement(list.product_id)}>-</IonButton>
                            <span>{list.quantity}</span>
                            <IonButton onClick={() => handleIncrement(list.product_id)}>+</IonButton>
                          </div>
                          <div>
                            <IonButton onClick={() => handleRemove(list.product_id)}>Remove</IonButton>
                          </div>

                          <div className={styles.priceInfo}>
                            <IonText color="dark" className={styles.currentPrice}>
                              ₹{list?.product_variant[0]?.offer_price * list.quantity}
                            </IonText>
                            <IonText color="dark" className={styles.oldPrice}>
                              ₹{list?.product_variant[0]?.main_price * list.quantity}
                            </IonText>
                          </div>
                        </IonLabel>
                      </IonItem>
                    </IonItemSliding>
                  )
                  )}
              </IonList>
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding bottom-shadow">
            <IonCol size="12">
              <IonTitle color="dark" className="ion-no-padding">
                Apply Coupon
              </IonTitle>
              <IonText color="success">
                Save more with coupons available for you
              </IonText>
            </IonCol>
            <IonCol size="12" className="ion-padding-top">
              <div className="CouponGroup">
                <IonInput
                  className="CouponInput"
                  placeholder="Enter Coupon Code"
                ></IonInput>
                <IonButton className="ApplyBtn" fill="clear">
                  Apply
                </IonButton>
              </div>
            </IonCol>
          </IonRow>

          <IonRow className="BgColor ion-padding bottom-shadow">
            <IonCol size="12">
              <IonText>
                Your Total Savings <span>$94.00</span>
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding">
            <IonCol size="12">
              <IonTitle color="dark" className="ion-no-padding">
                <strong>Bill Details</strong>
              </IonTitle>
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding-horizontal ion-padding-bottom ion-justify-content-between">
            <IonCol size="5">
              <IonText>Subtotal</IonText>
            </IonCol>
            <IonCol size="3" className="ion-text-right" >
              <IonText>{totalPrice}</IonText>
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding-horizontal ion-padding-bottom ion-justify-content-between">
            <IonCol size="5">
              <IonText>Delivery Fee</IonText>
            </IonCol>
            <IonCol size="3" className="ion-text-right">
              <IonText>Free</IonText>
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding-horizontal ion-padding-bottom ion-justify-content-between">
            <IonCol size="5">
              <IonText>Discount</IonText>
            </IonCol>
            <div className={styles.oldPrice}>
              <IonCol size="3" className="ion-text-right">
                <IonText>{DiscountPrice}</IonText>
              </IonCol>
            </div>
          </IonRow>

          <div className="Divider"></div>
          <IonRow className="ion-padding-horizontal ion-padding ion-justify-content-between bottom-shadow">
            <IonCol size="5">
              <IonText className="ToPay">
                <strong>To Pay</strong>
              </IonText>
            </IonCol>
            <IonCol size="3" className="ion-text-right">
              <IonText>
                <strong>{totalPrice}</strong>
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding bottom-shadow">
            <IonCol size="12">
              <IonTitle color="dark" className="ion-no-padding">
                <strong>Cancellation Policy</strong>
              </IonTitle>
              <IonText className="PolicyText">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding bottom-shadow padd-80">
            <IonCol size="12">
              <div className="AddressBlock">
                <div className="IconHome">
                  <IonIcon color="primary" size="large" icon={home} />
                </div>
                {currentUserAddressData && (
                  <div className="Address">
                    <IonTitle color="dark" className="ion-no-padding">
                      Delivering to{""}
                      <strong>{currentUserAddressData?.type}</strong>
                    </IonTitle>
                    <IonText className="AddressText">
                      {currentUserAddressData?.address}
                      {currentUserAddressData?.cityname}
                      {currentUserAddressData?.statename}
                    </IonText>
                  </div>
                )}

                <div className="AddressChangeBtn">
                  <IonButton
                    fill="clear"
                    expand="block"
                    onClick={() => setIsOpenChange(true)}
                  >
                    CHANGE
                  </IonButton>
                </div>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div className="BootomViewCart ion-padding">
          <div className={styles.priceInfo}>
            <div className="addButn">
              <div className="OfferInfo FlexCols">
                <div className="FlexPro">
                  <IonText color="dark">0</IonText>
                  <IonChip className="offerBedge">0 Saved</IonChip>
                </div>
              </div>
              <IonButton
                // routerLink="/add-payment"
                className="AddToCart"
                size="default"
                shape="round"
                fill="solid"
                color="warning"
                // onClick={() => setIsOpenLogin(true)}
                onClick={() => {
                  isAuthenticated ? handleCheckout() : setIsOpenLogin(true);
                }}
              >
                <div className="flex ion-justify-content-between ion-align-items-center w-full">
                  Place Order
                </div>
              </IonButton>
            </div>
          </div>
        </div>


        {/* pages End   */}

        <IonModal isOpen={isOpenChange} size="small" className="myModel">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Address</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpenChange(false)}>
                  <IonIcon
                    color="dark"
                    size="large"
                    icon={closeCircleOutline}
                  />
                </IonButton>  
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          {userAddressData &&
            userAddressData?.map((data, index) => (
              <div className="AddressBlock" key={index}>
                <div className="IconHome">
                  <IonIcon color="primary" size="large" icon={home} />
                </div>
                <div className="Address">
                  <IonTitle color="dark" className="ion-no-padding">
                    Delivering to <strong>{data?.type}</strong>
                  </IonTitle>
                  <IonText className="AddressText">
                    {data.address} {data.cityname} {data.statename}
                  </IonText>
                </div>
                <div className="AddressChangeBtn">
                  <IonButton
                    fill="clear"
                    expand="block"
                    onClick={() => setCurrentUserAddressData(data)}
                  >
                    Select
                  </IonButton>
                </div>
              </div>
            ))}
          <IonContent className="ion-padding">
            <IonItem className="ion-margin-vertical" lines="none">
              <IonButton
                className="AddToCartBtn"
                size="small"
                shape="round"
                fill="outline"
                expand="block"
                onClick={() => setIsOpen(true)}
              >
                <div className="addText">
                  Add Address
                  <IonIcon slot="end" size="small" icon={add} />
                </div>
              </IonButton>
            </IonItem>
          </IonContent> 

        </IonModal>
        < AddressPopup isOpen={isOpen} setIsOpen={setIsOpen} />
      </IonContent>

      <LoginPopup
        isOpen={isOpenLogin}
        setIsOpen={setIsOpenLogin}
        isOtpOpen={isOpenOtp}
        setIsOtpOpen={setIsOpenOtp}
      />
      <OTPPopup isOpen={isOpenOtp} setIsOpen={setIsOpenOtp} />
    </IonPage>
  );
};

export default CartProducts;
