import React, { useState } from 'react'
import { IonButton, IonFabButton, IonIcon, IonInput, IonModal, IonText, useIonToast } from '@ionic/react'
import { close } from "ionicons/icons";
import ForgotPopup from './ForgotPopup';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAuth1 } from '../contexts/AuthContext';


const LoginPopup = (props) => {
  // console.log("props", props)
  const { login } = useAuth1();
  const [present] = useIonToast();
  const [apidata, setApidata] = useState();
  const history = useHistory();
  const [isOpenFgp, setIsOpenFgp] = useState(false);


  const initialValues = {
    email: "",
    password: ""
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  function handleForm(values) {
    const object = {
      email: values.email,
      password: values.password
    };
    axios
      .post("http://20.207.207.62/api/login", object)
      .then((response) => {
        // console.log("API response:", response?.data?.user_data);
        // console.log("API response2:", response);
        if (response?.data?.user_status === true) {
          setApidata(response?.data);
          presentToast("Top", response?.data?.message_response);

          setTimeout(() => {
            props.setIsOpen(false);
            login(response?.data?.user_data)
          }, 2000)

          // history.push('/home');

        } else {
          presentToast("Top", response?.data?.message_response);
        //  props.setIsOpen(false)
        }
      })
      .catch((error) => {
        console.error("Error while logging in:", error);
        presentToast("Top", error.data.message_response);
      });

    // console.log("Form values:", values);
  }
  const presentToast = (position, message) => {
    present({
      message: message,
      duration: 1500,
      position: position,
    });
  };


  return (
    <>
      <IonModal isOpen={props.isOpen} className='loginModal'>
        <div className="loginContainer">
          <IonFabButton className="closeButton" onClick={() => props.setIsOpen(false)}>
            <IonIcon icon={close}></IonIcon>
          </IonFabButton>
          <IonText color="dark" className="title">Login Here</IonText>


          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleForm(values);
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <div className="loginForm">
                  <div className="loginInput">
                    <img src="/assets/img/user.png" alt="Images" width="20" />
                    <IonInput
                      name="email"
                      type="email"
                      label="Default input"
                      placeholder="Enter your username/email"
                      onIonChange={(e) => setFieldValue("email", e.target.value)}>
                    </IonInput>
                    <ErrorMessage
                        color="danger"
                        name="email"
                        component="div"
                        className="error-message error-text"
                      />

                    
                  </div>
                  <div className="loginInput">
                    <img src="/assets/img/password.png" alt="Images" width="20" />
                    <IonInput name="password"
                      type="text"
                      label="Default input"
                      placeholder="Enter your password"
                      onIonChange={(e) => setFieldValue("password", e.target.value)}>
                    </IonInput>
                    <ErrorMessage name="password" />
                  </div>
                  <IonText color="dark"
                    className="forgotPass"
                    onClick={() => (props.setIsOpen(false) || setIsOpenFgp(true)
                    )}>Forgot Password?
                  </IonText>

                  <div className="btnGroup">
                    <IonButton type="submit">Login</IonButton>
                  </div>
                </div>
              </Form>
            )}
          </Formik>



          <IonText color="dark" className="resendCode">Don’t have an account?
            <IonText onClick={() => {
              props.setIsOtpOpen(true);
              props.setIsOpen(false);
              setIsOpenFgp(false)
            }}
            >Signup Now
            </IonText>
          </IonText>

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

        </div>
      </IonModal>

      <ForgotPopup isOpen={isOpenFgp} setIsOpen={setIsOpenFgp} />
    </>
  )
}

export default LoginPopup;
  