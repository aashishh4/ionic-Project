
import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCheckbox,
  IonFabButton,
  IonIcon,
  IonInput,
  IonLabel,
  IonModal,
  IonText,
} from "@ionic/react";
import { close } from "ionicons/icons";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import OtpInput from 'react-otp-input';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth1 } from "../contexts/AuthContext";

const OTPPopup = (props) => {
  const history = useHistory();
  const [otp, setOtp] = useState('');
  const [OTPbutton, setOTPButton] = useState(true);
  const [varifystatebutton, setvarifyStateButton] = useState(false)
  const [showotpBox, setshowotpBox] = useState(false);
  const [resentOtpState, setresendOtpState] = useState(false)
  const { login } = useAuth1();


  const initialValues = {
    number: ""
  };

  const validationSchema =
    Yup.object({
      number: Yup.string()
        .matches(/^[6-9]\d{9}$/, {
          message: "Please enter valid number.",
          excludeEmptyString: false,
        })
        .required("Phone number is required"),
    });

  const otpFunction = async (values) => {
    try {
      setshowotpBox(true)
      const formdata = new FormData();
      formdata.append("mobile", values.number)
      const response = await axios.post("http://20.207.207.62/api/send-otp", formdata)
      console.log("otpFunction", response);
      setOtp(response?.data?.data)
    } catch (error) {
      console.log(error)
    }
    setOTPButton(false)
    setvarifyStateButton(true)
  }
  function handleOtp(otp) {
    const number = otp.replace(/\D/g, "");
    setOtp(number);
  }


  const varifyFunction = async (values) => {
    try {
      const formdata = new FormData();
      formdata.append("otp", otp);
      formdata.append("mobile", values.number);
      const response = await axios.post("http://20.207.207.62/api/verify-otp", formdata);

      console.log("varifyFunction", response)
      // console.log(response.data.status)
      if (response.data.status === true) {

        login(response?.data?.user_data)

        setTimeout(() => {
          props.setIsOpen(false);
          history.push("/home");
        }, 2000)

      }

    } catch (error) {
      setresendOtpState(true)
      console.log(error);
    }
  };

  const reSendOTP = async (values) => {
    try {
      let formdata = new FormData();
      formdata.append("mobile", values.number);
      const response = await axios.post("http://20.207.207.62/api/resend-otp", formdata);
      console.log("reSendOTP", response)
      if (response.data.status === true) {
        setOtp(response?.data?.data)
        setresendOtpState(false)


      }
    } catch (e) {
      console.log(e);
    }
  };




  return (
    <>
      <IonModal isOpen={props.isOpen} className="loginModal">
        <div className="loginContainer">
          <IonFabButton
            className="closeButton"
            onClick={() => props.setIsOpen(false)}
          >
            <IonIcon icon={close}></IonIcon>
          </IonFabButton>
          <IonText color="dark" className="title">
            Verify your mobile number to signup
          </IonText>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { action1 }) => {
              if (OTPbutton && !varifystatebutton) {
                otpFunction(values);
              }
              if (varifystatebutton) {
                varifyFunction(values)
              }

              action1(false)
            }}
          >
            {({ isSubmitting, values, handleChange, isValid }) => (
              <Form>
                <div className="contactNumber-inputGroup">
                  <IonText color="dark">+91</IonText>
                  <Field
                    label="Number"
                    labelPlacement="floating"
                    fill="outline"
                    placeholder="Enter your mobile number"
                    name="number"
                    as={IonInput}
                    onchange={handleChange}
                  />
                  <ErrorMessage
                    className="error-text"
                    name="number"
                    component={IonText}
                  />
                </div>

                <div className="OTPGroup">
                  <div className="OTPInput">
                    {showotpBox && (
                      <OtpInput
                        value={otp}
                        onChange={handleOtp}
                        numInputs={4}
                        renderSeparator={<span>&nbsp;&nbsp;&nbsp;</span>}
                        renderInput={(props) => <input type='number' {...props} />}
                      />
                    )}

                  </div>
                  <div className="btnGroup">
                    <IonButton
                      className="yallow-btn"
                      type="submit"
                      onClick={() => setOTPButton(true)}
                      disabled={varifystatebutton}
                    >
                      Send OTP
                    </IonButton>

                    <IonButton
                      type="submit"
                      onClick={() => setvarifyStateButton(true)}
                      disabled={!varifystatebutton}

                    >
                      Verify
                    </IonButton>
                  </div>
                  <IonText color="dark" className="resendCode">
                    Didn't receive the code?{" "}
                    <IonButton
                      fill="clear"
                      onClick={() => reSendOTP(values)}

                      disabled={!resentOtpState} 
                    >
                      Resend
                    </IonButton>
                  </IonText>
                </div>
              </Form>
            )}
          </Formik>
          <div className="orDivider">
            <span>OR</span>
          </div>

          <div className="SignupGroup">
            <IonText color="dark">Signup with</IonText>
            <div className="SignupSocials">
              <IonButton fill="clear">
                <img src="/assets/img/facebook-icon.png" alt="Images" />
              </IonButton>
              <IonButton fill="clear">
                <img src="/assets/img/google-icon.png" alt="Images" />
              </IonButton>
              <IonButton fill="clear">
                <img src="/assets/img/apple-icon.png" alt="Images" />
              </IonButton>
            </div>
          </div>

          <div className="TermsGroup">
            <div className="checkGroup">
              <IonCheckbox labelPlacement="end"></IonCheckbox>
              <IonText color="dark">
                I hereby accept the <IonText>Terms and Conditions</IonText>of
                GotoChe
              </IonText>
            </div>
            <div className="checkGroup">
              <IonCheckbox labelPlacement="end"></IonCheckbox>
              <IonText color="dark">
                I hereby accept the <IonText>Privacy Policy</IonText>of GotoChe
              </IonText>
            </div>
          </div>
        </div>
      </IonModal>
    </>
  );
};

export default OTPPopup;
