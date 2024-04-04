import {
  IonButton,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCard from "../../components/ProductCard";
import styles from "./CategoryProducts.module.css";
import Header from "../../components/Header";
import { useHistory } from "react-router-dom";
import axios from "axios";

const CategoryProducts = () => {
  const [subCategoryselect, setsubCategorySelect] = useState("");
  const [subCategoryData, setsubCategoryData] = useState([]);
  const [CategoriesData, setCategoryData] = useState({});
  const [allProduct, setAllProduct] = useState([])
  const history = useHistory();
  const { slug } = useParams();
  // console.log(' slug', slug);
  // console.log(' subCategorySelect', subCategoryselect);
  // console.log(' subCategoryData', subCategoryData);



  useEffect(() => {
    const CategoriesList = async () => {
      try {
        const response = await axios.get(`http://20.207.207.62/api/subcategorylist/${slug}`)
        // console.log("CategoryProducts", response)
        if (response?.data?.data?.sucate_pro) {
          setsubCategorySelect(response.data.data.sucate_pro[0].slug)
        }
        setCategoryData(response.data.data.categorylist)
        setsubCategoryData(response.data.data.sucate_pro)
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    CategoriesList();
  }, [slug]);


  useEffect(() => {
    const getAllCategoriesList = async () => {
      // setAllProduct([])
      try {
        const response = await axios.get(`http://20.207.207.62/api/getSubcatProduct/${subCategoryselect}/10/0`)
        // console.log("getAllCategoryProducts", response)
        setAllProduct(response?.data?.subcatprod)
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getAllCategoriesList();
  }, [subCategoryselect]);


  return (
    <IonPage id="category-page" className={styles.categoryPage}>
      <Header />

      <IonContent fullscreen>
        <IonHeader className="TitleHead bottom-shadow">
          <IonButton
            className="IconBtn"
            fill="clear"
            onClick={() => history.push(`/main-category`)}
          >
            <i class="material-icons dark">west</i>
          </IonButton>
          <div className="CategoryInfoTitle">
            <div className="subCate-thumb">
              <img src={CategoriesData?.images} alt="category cover" className="MainProductThumb" />
            </div>

            <div className="subCate-details">
              <IonTitle>{CategoriesData?.category_name}</IonTitle>
              <span>item</span>
            </div>
          </div>
        </IonHeader>

        <IonSegment className="subCateTab"
          value={slug}
          scrollable={true}
        >
          {subCategoryData?.map((item, i) => (
            <IonSegmentButton className={item.slug === subCategoryselect ? "segment-button-checked" : ""}
              value={item.slug}
              key={i}
              onClick={(e) => { setsubCategorySelect(item.slug) }}
            >
              <div className="subCategoryCard">
                <div className="subCategoryThumb">
                  <img src={item.images}
                    alt="category cover"
                    className="MainProductThumb"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/img/img-placeholder.jpg";
                    }}
                  />
                </div>
                <IonText className="subCategoryTitle">{item.sub_category_name}</IonText>
              </div>
            </IonSegmentButton>
          ))}

        </IonSegment>

        <IonGrid className="ion-no-padding">
          <IonRow>
            {allProduct &&
              allProduct?.map((item, i) => {
                return (
                  <ProductCard
                    item={item}
                    key={`category_product_${i}`}
                  />
                )
              })}

          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CategoryProducts;

//solve it at the time 