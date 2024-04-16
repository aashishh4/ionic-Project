import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  useIonLoading,
} from "@ionic/react";
import Header from "../../components/Header";
import axios from "axios";

const MainCategory = () => {
  const [productData, setProductData] = useState([]);
  const [present, dismiss] = useIonLoading();

  // console.log("CategoriesList",productData)


  useEffect(() => {
    const CategoriesList = async () => {
      try {
        present();
        const response = await axios.get("http://20.207.207.62/api/category-list");
        // console.log("CategoriesList", response.data.data)
       setProductData(response.data.data)
       dismiss();
      } catch (error) {
        console.error('Error fetching data:', error);
        dismiss();
      }

    }
    CategoriesList();
  }, [])

  return (
    <>
      <IonPage id="home-page">
        <Header />

        <IonContent fullscreen>
          <IonHeader className="TitleHead">
            <IonTitle className="ion-no-padding">
              Explore By Categories
            </IonTitle>
          </IonHeader>

          <IonGrid className="ion-no-padding ion-padding-horizontal ion-padding-bottom">
            <IonRow>
              {productData?.map((item, i) => (
                <IonCol size="6" key={i}>
                  <IonCard
                    className="CategoryCard"
                    routerLink={`/category/${item.slug}`
                  }
                  >
                    <div className="CategoryThumb">
                      <img src={item?.images} alt="category cover" />
                    </div>
                    <IonText className="CategoryTitle">{item.category_name}</IonText>
                  </IonCard>
                </IonCol>               
              ))}
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default MainCategory;
