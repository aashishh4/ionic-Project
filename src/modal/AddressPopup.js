import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { closeCircleOutline } from "ionicons/icons";
import axios from "axios";

const AddressPopup = (props) => {
  const { isOpen, setIsOpen, fetchUserAddress } = props;
  const [present] = useIonToast();
  const [cityListData, setCityListData] = useState([]);
  const [stateListtData, setStateListtData] = useState([]);

  const validationSchema = Yup.object().shape({
    address: Yup.string().required("Address is required"),
    // address2: Yup.string(),
    state: Yup.string().required("State is required"),
    postalCode: Yup.number().required("Postal code is required"),
    city: Yup.string().required("City is required"),
    type: Yup.string().required("Type is required"),
  });

  const initialValues = {
    address: "",
    address2: "",
    state: "",
    postalCode: "",
    city: "",
    type: "",
  };

  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    try {
      const response = await axios.post("http://20.207.207.62/api/post-city-list", {
        state_id: stateId,
      });
      setCityListData(response?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };

  const stateList = async () => {
    try {
      const response = await axios .get("http://20.207.207.62/api/get-state-list");
      setStateListtData(response?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    stateList();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const obj = {
        user_id: 3996,
        address: values.address,
        address2: values.address2,
        city_id: values.city,
        state_id: values.state,
        postal_code: values.postalCode,
        type: values?.type,
      };
      console.log("obj",obj)

      const response = await axios.post("http://20.207.207.62/api/post-user-address", obj);
      if (response?.status === 200) {
        presentToast("Top", response?.data?.message);
        fetchUserAddress();
      } else {
      }
    } catch (err) {
      console.error(err);
    }
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
      <IonModal isOpen={isOpen} size="small" className="myModel">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit new address</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>
                <IonIcon color="dark" size="large" icon={closeCircleOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="InputGroupList">
                  <div className="InputItem">
                    <IonInput
                      type="text"
                      label="Address"
                      placeholder="Address"
                      name="address"
                      onIonChange={(e) =>
                        setFieldValue("address", e.target.value)
                      }
                    />
                    <ErrorMessage
                      color="danger"
                      name="address"
                      component="div"
                      className="error-message error-text"
                    />
                  </div>

                  <div className="InputItem">
                    <IonInput
                      type="text"
                      label="Address-2"
                      placeholder="Address-2"
                      name="address2"
                      onIonChange={(e) =>
                        setFieldValue("address2", e.target.value)
                      }
                    ></IonInput>
                    <ErrorMessage
                      name="address2"
                      component="div"
                      className="error-message error-text"
                    />
                  </div>

                  <div className="InputItem">
                    <IonSelect
                      label="Select Your State"
                      placeholder="Select Your State"
                      name="state"
                      onIonChange={(e) => {
                        handleStateChange(e);
                        setFieldValue("state", e.target.value);
                      }}
                    >
                      {stateListtData &&
                        stateListtData?.map((stateName, index) => (
                          <IonSelectOption value={stateName.id} key={index}>
                            {stateName.state_name}
                          </IonSelectOption>
                        ))}
                    </IonSelect>
                    <ErrorMessage
                      color="danger"
                      name="state"
                      component="div"
                      className="error-message error-text"
                    />
                  </div>

                  <div className="InputItem">
                    <IonSelect
                      label="Select Your City"
                      placeholder="Select Your City"
                      name="city"
                      onIonChange={(e) => setFieldValue("city", e.target.value)}
                    >
                      {cityListData &&
                        cityListData?.map((cityName, index) => (
                          <IonSelectOption value={cityName.id}>
                            {cityName.city_name}
                          </IonSelectOption>
                        ))}
                    </IonSelect>
                    <ErrorMessage
                      color="danger"
                      name="city"
                      component="div"
                      className="error-message error-text"
                    />
                  </div>

                  <div className="InputItem">
                    <IonInput
                      type="number"
                      label="postal_code"
                      name="postalCode"
                      placeholder="Select Your PIN Code"
                      onIonChange={(e) =>
                        setFieldValue("postalCode", e.target.value)
                      }
                    ></IonInput>
                    <ErrorMessage
                      color="danger"
                      name="postalCode"
                      component="div"
                      className="error-message error-text"
                    />
                  </div>

                  <div className="InputItem">
                    <IonSelect
                      label="Address Type"
                      placeholder="Address Type"
                      name="type"
                      onIonChange={(e) => setFieldValue("type", e.target.value)}
                    >
                      <IonSelectOption value="home">Home</IonSelectOption>
                      <IonSelectOption value="office">Office</IonSelectOption>
                    </IonSelect>
                    <ErrorMessage
                      color="danger"
                      name="type"
                      component="div"
                      className="error-message error-text"
                    />
                  </div>

                  <div className="InputItem">
                    <IonButton type="submit" size="small" expand="full">
                      Submit
                    </IonButton>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </IonContent>
      </IonModal>
    </>
  );
};

export default AddressPopup;
