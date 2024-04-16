import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonText,
  IonTitle,
  useIonToast,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import styles from "./AddPayment.module.css";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import useRazorpay from "react-razorpay";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../../contexts/CartContext";
import { useAuth1 } from "../../contexts/AuthContext";
import axios from "axios";

const AddPayment = () => {
  const { cartItems } = useAuth();
  // console.log("cartItems",cartItems)
  const { userData } = useAuth1()
  // console.log("userData1",userData)
  const [Razorpay] = useRazorpay();
  const [cartTotal, setCartTotal] = useState(0);
  // console.log("cartTotal",cartTotal)
  const [addressData, setCurrentUserAddressData] = useState({});
  // console.log("addressData",addressData)
  const [cartData, setCartData] = useState([]);
  const [formValues, setFormValues] = useState({
    firstname: "",
    email: "",
    mobile: "",
    paymentMethod: "",
    amount: "",
  });
  // console.log("formValues",formValues)
  const history = useHistory();
  const [present] = useIonToast();
  const [showSubmit, SetShowSubmit] = useState(true);
  const [orderId, setOrderId] = useState()
  const [resultId, setresultId] = useState()
  console.log("orderId",orderId);
  console.log("resultId",resultId)

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    mobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^[6-9]\d{9}$/, {
        message: "Please enter valid number.",
      }),
    paymentMethod: Yup.string().required("Please select a payment method"),

  });

  useEffect(() => {
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.product_variant[0].offer_price * item.quantity), 0);
    setCartTotal(totalPrice);
  }, [cartItems]);


  useEffect(() => {
    if (cartTotal > 0) {
      SetShowSubmit(false);
    }
  }, [cartTotal]);

  const userProfile = async () => {
    setFormValues({
      firstname: userData.first_name || "",
      email: userData.email || "",
      mobile: userData.mobile || "",
      paymentMethod: "",
      amount: cartTotal,
    });
  };

  useEffect(() => {
    userProfile();
  }, [userData]);

  const userAddress = async () => {
    try {
      const response = await axios.get("http://20.207.207.62/api/get-user-address-list");
      // console.log("userAddress", response);
      setCurrentUserAddressData(response?.data?.data[0]);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    userAddress();
  }, []);


  const profileSettingPost = async (values) => {
    // console.log("values", values)
    if (values.paymentMethod === "cod") {
      handleOrderConfirm();
      // handleOrderFail();
    } else {
      const modifiedCartItems = cartItems.map((item) => {
        const {
            prod_details,
            pro_variant_id,
            product_id,
            quantity,
            variant,
            product_variant,
            ...rest
        } = item;
    
        // Extracting and mapping product_variant_id values
        const product_variant_id = product_variant !== undefined 
            ? product_variant.map((data) => data.pro_variant_id).toString() 
            : "";
    
        // Converting other properties to strings or providing default values
        const proVariantId = product_variant_id !== undefined ? product_variant_id.toString() : "0";
        const productId = product_id !== undefined ? product_id.toString() : "";
        const itemQuantity = quantity !== undefined ? quantity.toString() : "";
        const itemVariant = variant !== undefined ? variant.toString() : "";
    
        // Returning the modified object
        return {
            pro_variant_id: proVariantId,
            product_id: productId,
            quantity: itemQuantity,
            variant: itemVariant,
           
            ...rest
        };
    });
    
    

      // console.log("modifiedCartItems", modifiedCartItems);


      try {
        const obj = {
          user_id: userData.user_id,
          firstname: values.firstname,
          email: values.email,
          address: addressData.address,
          pincode: addressData.postal_code,
          payment_type: "razorpay",
          mobile: values.mobile,
          city: addressData.cityname,
          state: addressData.statename,
          cart_data: modifiedCartItems,
        };
        console.log("obj",obj)
        const response = await axios.post("http://20.207.207.62/api/checkout",obj);
        console.log("response", response)
        if (response?.status === 200) {
          setresultId(response?.data?.result.id)
          setOrderId(response?.data?.data?.order_id)
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleOrderConfirm = () => {
    history.push("/order-confirm");
  };

  const handleOrderFail = () => {
    history.push("/order-fail");
  };


  const presentToast = (position, message) => {
    present({
      message: message,
      duration: 1500,
      position: position,
    });
  };

  return (
    <>
      <IonPage id="home-page" className={styles.homePage}>
        <IonContent fullscreen>
          <IonHeader className="TitleHead bottom-shadow">
            <IonButton className="backBtn" fill="clear" routerLink="/cart">
              <i class="material-icons dark">west</i>
            </IonButton>
            <IonTitle color="dark">Checkout</IonTitle>
          </IonHeader>
          {formValues && formValues.firstname && (
            <Formik
              initialValues={formValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                profileSettingPost(values);
              }}
            >
              {({ setFieldValue, values, errors, touched }) => (
                <Form>
                  <IonGrid className="ion-no-padding ">
                    <IonRow className="ion-padding">
                      <IonCol size="12">
                        <IonItem className="ion-no-padding">
                          <IonInput
                            label="firstname"
                            labelPlacement="floating"
                            placeholder="First name"
                            name="firstname"
                            value={values && values?.firstname}
                            onIonChange={(e) =>
                              setFieldValue("firstname", e.detail.value)
                            }
                          ></IonInput>
                          <ErrorMessage
                            color="danger"
                            name="firstname"
                            component="div"
                            className="error-message error-text"
                          />
                        </IonItem>
                      </IonCol>
                      <IonCol size="12">
                        <IonItem className="ion-no-padding">
                          <IonInput
                            label="Email"
                            labelPlacement="floating"
                            placeholder="Email"
                            name="email"
                            value={values && values?.email}
                            onIonChange={(e) =>
                              setFieldValue("email", e.detail.value)
                            }
                          ></IonInput>
                          <ErrorMessage
                            color="danger"
                            name="email"
                            component="div"
                            className="error-message error-text"
                          />
                        </IonItem>
                      </IonCol>
                      <IonCol size="12">
                        <IonItem className="ion-no-padding">
                          <IonInput
                            label="Mobile"
                            labelPlacement="floating"
                            placeholder="Mobile"
                            name="mobile"
                            value={values && values?.mobile}
                            onIonChange={(e) =>
                              setFieldValue("mobile", e.detail.value)
                            }
                          ></IonInput>
                          <ErrorMessage
                            color="danger"
                            name="mobile"
                            component="div"
                            className="error-message error-text"
                          />
                        </IonItem>
                      </IonCol>

                      <IonCol size="12">
                        <IonItem className="ion-no-padding">
                          <IonInput
                            label="Address"
                            labelPlacement="floating"
                            placeholder="Address"
                            name="address"
                            // value={values && values?.address}

                            value={`${addressData.address} ${addressData.cityname} ${addressData.statename}`}
                            disabled
                            onIonChange={(e) =>
                              setFieldValue("Address", e.detail.value)
                            }
                          ></IonInput>
                        </IonItem>
                      </IonCol>
                    </IonRow>

                    <IonRow className="ion-padding">
                      <IonCol size="12">
                        <IonItem className="ion-no-padding">
                          <div className="paymentMethode">
                            <IonText color="dark">Payment Method: </IonText>
                            <IonRadioGroup
                              onIonChange={(e) =>
                                setFieldValue("paymentMethod", e.detail.value)
                              }
                            >
                              <IonItem className="ion-no-padding" lines="none">
                                <IonLabel>Cod</IonLabel>
                                <IonRadio name="paymentMethod" value="cod" />
                              </IonItem>

                              <IonItem className="ion-no-padding" lines="none">
                                <IonLabel>Razorpay</IonLabel>
                                <IonRadio name="paymentMethod" value="razorpay" />
                              </IonItem>
                            </IonRadioGroup>
                            {errors.paymentMethod && touched.paymentMethod ? (
                              <div className="error-message error-text">
                                {errors.paymentMethod}
                              </div>
                            ) : null}
                          </div>
                        </IonItem>
                      </IonCol>
                    </IonRow>


                    <IonRow className="ion-padding-horizontal ion-padding-bottom ion-justify-content-between">
                      <IonCol size="5">
                        <IonText>Total Amount</IonText>
                      </IonCol>
                      <IonCol size="3" className="ion-text-right">
                        <IonText name="amount">{cartTotal}</IonText>
                      </IonCol>
                    </IonRow>

                    <IonRow className="ion-padding-vertical ion-padding-horizontal">
                      <IonCol size="12">
                        <IonButton
                          type="submit"
                          expand="full"
                          disabled={showSubmit}
                        >
                          Save & Checkout
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </Form>
              )}
            </Formik>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default AddPayment;
