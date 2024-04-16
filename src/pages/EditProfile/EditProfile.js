import {
  IonCol,
  IonGrid,
  IonPage,
  IonContent,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonAccordionGroup,
  IonDatetime,
  IonAccordion,
  IonTextarea,
  IonText,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonRadioGroup,
  IonRadio,
  IonPopover,
  IonHeader,
  IonTitle,
  IonModal,
  useIonLoading,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const EditProfile = () => {
  const [present, dismiss] = useIonLoading();

  const [userProfileData, setUserProfileData] = useState({});
  // console.log('userProfileData',userProfileData)
  const [showModal, setShowModal] = useState(false);
  const [cityListData, setCityListData] = useState([]);
  // console.log("cityListDAta", cityListData)
  const [stateListtData, setStateListtData] = useState([]);
  const [formValues, setFormValues] = useState({
    avatar: "",
    name: "",
    lastName: "",
    email: "",
    number: "",
    dob: "",
    city: "",
    stateId: "",
    gender: "",
  });
  // console.log("formValues", formValues)
  const [stateName, setStateName] = useState("");
  // console.log('stateName', stateName)
  const [updateProfile,setupdateProfile]=useState({});
  // console.log("updateProfile",updateProfile)

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    avatar: Yup.string().required("Profile picture is required"),
    lastName: Yup.string().required("Last Name is required"),
    // email: Yup.number().required("Email is required"),
    number: Yup.string() 
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        "Enter valid contact number"
      )
      .required("Phone number is a required"),
    dob: Yup.string().required("DOB is required"),
    city: Yup.string().required("City is required"),
    gender:Yup.string().required("gender is required"),
  });

  const userProfile = async () => {
    
    try {
     
      const response = await axios.get(` http://20.207.207.62/api/user-dashboard`);
      // console.log(" userProfile", response)
      setUserProfileData(response?.data?.user_dashboard?.user_form_data);
      setFormValues({
        avatar: response?.data?.user_dashboard?.user_form_data?.avatar || "",
        name: response?.data?.user_dashboard?.user_form_data?.first_name || "",
        lastName: response?.data?.user_dashboard?.user_form_data?.last_name || "",
        email: response?.data?.user_dashboard?.user_form_data?.email || "",
        number: response?.data?.user_dashboard?.user_form_data?.mobile || "",
        dob: response?.data?.user_dashboard?.user_form_data?.dob || "",
        city: response?.data?.user_dashboard?.user_form_data?.city || "",
        stateName: response?.data?.user_dashboard?.user_form_data?.state_name || "",
        gender: response?.data?.user_dashboard?.user_form_data?.gender || "",
      });
    } catch (e) {
      console.log(e);
      
    }
  };

  useEffect(() => {
    userProfile();
  }, []);

  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    try {
      const response = await axios.post(" http://20.207.207.62/api/post-city-list", {
        state_id: stateId,
      });
      // console.log('handleStateChange', response)
      setCityListData(response?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };

  const stateList = async () => {
    try {
      const response = await axios.get("http://20.207.207.62/api/get-state-list");
      setStateListtData(response?.data?.data);
      // console.log('stateList', response)
      if (userProfileData.state_name) {
        response?.data?.data?.filter((val, i) => {
          if (val.state_name === userProfileData.state_name) {
            setStateName(val.state_name);
           
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    stateList();
  }, [userProfileData]);

  const profileSave = async (values) => {
    present()
    try {
      const formdata = new FormData();
      formdata.append("firstName", values.name);
      formdata.append("lastName", values.lastName);
      formdata.append("mobile", values.number);
      formdata.append("avatar", values.avatar);
      formdata.append("dob", values.dob);
      formdata.append("city", values.city);
      formdata.append('gender',values.gender);
      // console.log("formdata",values) 
      const response = await axios.post("http://20.207.207.62/api/user-update-personal-info", formdata);
      // console.log('profileSave', response);
      setupdateProfile(response?.data?.user_data)
      dismiss()

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <IonPage>
        {/* <Header /> */}
        <IonContent>
          <IonHeader className="TitleHead bottom-shadow">
            <IonButton className="backBtn" fill="clear" routerLink="/profile">
              <i class="material-icons dark">west</i>
            </IonButton>
            <IonTitle color="dark">Edit Profile</IonTitle>
          </IonHeader>
          {formValues && formValues.name && (
            <Formik
              initialValues={formValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                profileSave(values);
              }}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form>
                  <IonGrid>
                    <IonRow>
                      <IonCol className="ion-padding-top">
                        <div className="EditprofileImg">
                          <img
                            src={values?.avatar}
                            alt=""
                            className="MainProductThumb"
                            onError={(e) => {
                              e.target.onerror = null; // Remove the event handler to prevent an infinite loop
                              e.target.src = "./assets/img/img-person.jpg"; // Placeholder image URL
                            }}
                          />
                          <ErrorMessage
                            color="danger"
                            name="image"
                            component="div"
                            className="error-message error-text"
                          />
                          <div className="image-upload">
                            <label htmlFor="file-input" className="EditProfile">
                              <img src="./assets/img/edit.png" alt="" />
                            </label>
                            <input
                              id="file-input"
                              type="file"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  setFieldValue("avatar", file);
                                }
                              }}
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>
                      </IonCol>
                    </IonRow>
                  </IonGrid>

                  <IonGrid>
                    <IonRow>
                      <IonCol className="ion-padding-horizontal edit-profile-box">
                        <div className="Edit-input">
                          <IonItem>
                            <IonLabel position="floating">Your Name</IonLabel>
                            <IonInput
                              className="ion-margin-vertical"
                              name="name"
                              type="text"
                              placeholder="Enter your Name"
                              value={values && values?.name}
                              onIonChange={(e) =>
                                setFieldValue("name", e.detail.value)
                              }
                            ></IonInput>
                            <ErrorMessage
                              color="danger"
                              name="name"
                              component="div"
                              className="error-message error-text"
                            />
                          </IonItem>
                          <IonItem>
                            <IonLabel position="floating">
                              Your Last Name
                            </IonLabel>
                            <IonInput
                              className="ion-margin-vertical"
                              name="lastName"
                              type="text"
                              label="Default input"
                              placeholder="Enter your Last Name"
                              value={values.lastName}
                              onIonChange={(e) =>
                                setFieldValue("lastName", e.detail.value)
                              }
                            ></IonInput>
                            <ErrorMessage
                              color="danger"
                              name="lastName"
                              component="div"
                              className="error-message error-text"
                            />
                          </IonItem>
                          <IonItem>
                            <IonLabel position="floating">
                              Your Email ID
                            </IonLabel>
                            <IonInput
                              className="ion-margin-vertical"
                              name="email"
                              type="email"
                              label="Default input"
                              placeholder="Enter your Email"
                              value={values.email}
                              // disabled
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
                          <IonItem>
                            <IonLabel position="floating">Your Number</IonLabel>
                            <IonInput
                              className="ion-margin-vertical"
                              name="number"
                              type="number"
                              label="Default input"
                              placeholder="Enter your Phone Number"
                              value={values.number}
                              // disabled
                              onIonChange={(e) =>
                                setFieldValue("number", e.detail.value)
                              }
                            ></IonInput>
                            <ErrorMessage
                              color="danger"
                              name="number"
                              component="div"
                              className="error-message error-text"
                            />
                          </IonItem>
                          <IonItem>
                            <IonLabel position="floating">Your DOB</IonLabel>
                            <IonInput
                              className="ion-margin-vertical"
                              name="dob"
                              type="text"
                              label="Default input"
                              placeholder="Enter your DOB"
                              value={values.dob}
                              onIonChange={(e) => setFieldValue("dob", e.detail.value)}
                              onClick={() => setShowModal(true)}
                            ></IonInput>

                            <ErrorMessage
                              color="danger"
                              name="dob"
                              component="div"
                              className="error-message error-text"
                            />  
                          </IonItem>

                          <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                            <IonDatetime
                              displayFormat="MMM DD, YYYY"
                              placeholder="Select Date"
                              onIonChange={(e) => {
                                setFieldValue("dob", e.detail.value);
                                setShowModal(false);
                              }}
                            ></IonDatetime>
                          </IonModal>


                          <IonItem>
                            <IonSelect
                              label="Select Your State"
                              placeholder="Select Your State"
                              name="stateId"
                              onIonChange={(e) => {
                                handleStateChange(e);
                                setFieldValue("stateId", e.target.value);
                              }}
                            >
                              <IonSelectOption value={stateName}>
                                {stateName}
                              </IonSelectOption>
                              {stateListtData &&
                                stateListtData?.map((stateName1, index) => (
                                  <IonSelectOption
                                    value={stateName1.id}
                                    key={index}
                                  >
                                    {stateName1.state_name}
                                  </IonSelectOption>
                                ))}
                            </IonSelect>
                            <ErrorMessage
                              color="danger"
                              name="state"
                              component="div"
                              className="error-message error-text"
                            />
                          </IonItem>

                          <IonItem>
                            <IonLabel position="floating">
                              Select Your City
                            </IonLabel>
                            <IonSelect
                              label="Please Select"
                              fill="solid"
                              value={values.city}
                              onIonChange={(e) =>
                                setFieldValue("city", e.detail.value)
                              }
                            >
                              <IonSelectOption value={values.city}>
                                {values.city}
                              </IonSelectOption>
                              {cityListData &&
                                cityListData?.map((cityName, index) => (
                                  <IonSelectOption value={cityName.city_name}>
                                    {cityName.city_name}
                                  </IonSelectOption>
                                ))}
                            </IonSelect>
                          </IonItem>
                          <IonItem>
                            <IonLabel position="floating">Select Your gender</IonLabel>
                            <IonSelect
                              label="Please Select"
                              fill="solid"
                              value={values.gender}
                              onIonChange={(e) => setFieldValue("gender", e.detail.value)}
                            >
                              {/* Option for Male */}
                              <IonSelectOption value="male">Male</IonSelectOption>

                              {/* Option for Female */}
                              <IonSelectOption value="female">Female</IonSelectOption>
                            </IonSelect>
                          </IonItem>


                        </div>
                        {/* <IonAccordionGroup className="ion-padding-top Pofile-Accordian">
                          <IonAccordion value="first">
                            <IonItem slot="header">
                              <IonText>Add more details</IonText>
                            </IonItem>
                            <div slot="content">
                              <div className="ion-padding-bottom Radio-box">
                                <IonRadioGroup value="strawberries">
                                  <h5>
                                    Please select an option suitable to you
                                  </h5>
                                  <div className="RadioBtn">
                                    <div className="RadioField">
                                      <IonRadio value="Hook"></IonRadio>
                                      <IonLabel>Hook Cook</IonLabel>
                                    </div>
                                    <div className="RadioField">
                                      <IonRadio value="Aspiring"></IonRadio>
                                      <IonLabel>Aspiring Chef</IonLabel>
                                    </div>
                                    <div className="RadioField">
                                      <IonRadio value="Health">Health</IonRadio>
                                      <IonLabel>Health Buff</IonLabel>
                                    </div>
                                    <div className="RadioField">
                                      <IonRadio value="Professional">
                                        Professional
                                      </IonRadio>
                                      <IonLabel>Professional Chef</IonLabel>
                                    </div>
                                    <div className="RadioField">
                                      <IonRadio value="Food">Food</IonRadio>
                                      <IonLabel>Food Enthusiast</IonLabel>
                                    </div>
                                  </div>
                                </IonRadioGroup>
                              </div>
                              <div className="ion-padding-bottom Radio-box">
                                <IonRadioGroup value="strawberries">
                                  <h5>
                                    How many times in a week do you cook for
                                    yourself?
                                  </h5>
                                  <div className="RadioBtn">
                                    <div className="RadioField">
                                      <IonRadio value="Times">Times</IonRadio>
                                      <IonLabel>1-3 Times</IonLabel>
                                    </div>
                                    <div className="RadioField">
                                      <IonRadio value="3-7">3-7</IonRadio>
                                      <IonLabel>3-7 Times</IonLabel>
                                    </div>
                                    <div className="RadioField">
                                      <IonRadio value="More">More</IonRadio>
                                      <IonLabel>More than 7 Times</IonLabel>
                                    </div>
                                    <div className="RadioField">
                                      <IonRadio value="NA">NA</IonRadio>
                                      <IonLabel>NA</IonLabel>
                                    </div>
                                  </div>
                                </IonRadioGroup>
                              </div>
                              <div className="ion-padding-bottom Radio-box">
                                <IonRadioGroup value="strawberries">
                                  <h5>
                                    How many times in a month do you go for food
                                    and grocery shopping?
                                  </h5>
                                  <div className="RadioBtn">
                                    <div className="RadioField">
                                      <IonRadio value="Once">Once</IonRadio>
                                      <IonLabel>Once a Month</IonLabel>
                                    </div>
                                    <div className="RadioField">
                                      <IonRadio value="Month">Month</IonRadio>
                                      <IonLabel>
                                        4 to 5 Times a Month Times
                                      </IonLabel>
                                    </div>
                                    <div className="RadioField">
                                      <IonRadio value="than">than</IonRadio>
                                      <IonLabel>
                                        {" "}
                                        More than 5 times a Month
                                      </IonLabel>
                                    </div>
                                  </div>
                                </IonRadioGroup>
                              </div>
                              <div className="ion-padding-bottom">
                                <div className="textAreaField">
                                  <h5>Brief About Myself</h5>
                                  <IonTextarea
                                    label="Outline textarea"
                                    placeholder="I am food of cooking and love cooking so i am think this will help me a lot"
                                  ></IonTextarea>
                                </div>
                              </div>
                            </div>
                          </IonAccordion>
                        </IonAccordionGroup> */}

                        <div className="UpdateBtn">
                          <IonButton expand="full" type="submit">
                            Update
                          </IonButton>
                        </div>
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
export default EditProfile;
