import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonLabel, } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { setupIonicReact } from "@ionic/react";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import CategoryProducts from "./pages/Products/CategoryProducts";
import Product from "./pages/Products/Product";
import FavouriteProducts from "./pages/Products/FavouriteProducts";
import CartProducts from "./pages/Products/CartProducts";
import Welcome from './pages/Welcome/Welcome';
import './theme/global.css'
import { SplashScreen } from '@capacitor/splash-screen';
import AddPayment from "./pages/Payment/AddPayment";
import MainCategory from "./pages/Products/MainCategory";
import HomeRecipe from "./pages/HomeRecipe/HomeRecipe";
import Profile from "./pages/profile/Profile";
import OrderList from "./pages/myorder/OrderList";
import WishList from "./pages/wishList/WishList";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import EditProfile from "./pages/EditProfile/EditProfile";
import ViewExclusiveProduct from "./pages/ViewExclusiveProducts";
import ViewTrendingProduct from "./pages/ViewTrendingProduct";
import ProductCard from "./components/ProductCard";
import SearchProduct from "./pages/Products/SearchProduct";
import PrivateRoute from "./contexts/PrivateRoute";
import { useAuth } from "./contexts/CartContext";
 import Dashboard from './pages/profile/Dashboard'
import Addproduct from "./pages/profile/Addproduct";
import Myrecipe from "./pages/HomeRecipe/Myrecipe";


await SplashScreen.hide();


await SplashScreen.show({
  showDuration: 2000,
  autoHide: true,
});

setupIonicReact({});

const App = () => {
  const{cartItems}=useAuth();

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);


  return (

      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/welcome" exact>
              <Welcome />
            </Route>
          </IonRouterOutlet>
          {window.location.pathname !== "/welcome" &&

            <IonTabs>
              
              <IonRouterOutlet>
                  <PrivateRoute path="/add-payment" component={AddPayment} />                              
                  <PrivateRoute path="/profile" component={Profile} />  
                  <PrivateRoute path="/order-list" component={OrderList} />
                  <PrivateRoute path="/wish-list" component={WishList} />
                  <PrivateRoute path="/change-password" component={ChangePassword} />
                  <PrivateRoute path="/edit-profile" component={EditProfile} /> 
                  <PrivateRoute path="/dashboard" component={Dashboard}/>
                  <PrivateRoute path="/my-recipe" component={Myrecipe}/>
                  <PrivateRoute path='/add-product' component={Addproduct}/>
                                                
                  <Route path="/" exact={true}>
                    <Redirect to="/home" />
                  </Route>

                  <Route path="/home" exact={true}>
                    <Home />
                  </Route>

                  <Route path="/cart" exact>
                    <CartProducts />
                  </Route>

                  <Route path="/category/:slug" exact>
                    <CategoryProducts />
                  </Route>

                  <Route path="/product-details/:id" exact>
                    <Product />
                  </Route>

                  <Route path="/main-category" exact>
                    <MainCategory />
                  </Route>

                  
                  <Route path="/home-recipe" exact>
                    <HomeRecipe />
                  </Route>

                 

                  <Route path="/exclusive-products" exact>
                    <ViewExclusiveProduct />
                  </Route>

                  <Route path="/trending-products" exact>
                    <ViewTrendingProduct />
                  </Route>

                  <Route path="/category-detail/:slug/:name" exact>
                    <ProductCard />
                  </Route>

                  <Route path="/search-product" exact>
                    <SearchProduct />
                  </Route>
                </IonRouterOutlet>


              <IonTabBar slot="bottom" className="FooterTab">
                <IonTabButton tab="home" href="/home">
                  <img src="/assets/img/Home.png" alt="Images" className="TabIcon" />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>

                <IonTabButton tab="radio" href="/main-category">
                  <img src="/assets/img/Mysmart.png" alt="Images" className="TabIcon" />
                  <IonLabel>Category</IonLabel>
                </IonTabButton>

                <IonTabButton tab="library" href="/library">
                  <img src="/assets/img/NutriBuddy.png" alt="Images" className="TabIcon" />
                  <IonLabel>NutriBuddy</IonLabel>
                </IonTabButton>

                <IonTabButton tab="search" href="/cart">
                  <span>{totalCount}</span>
                  <img src="/assets/img/Cart.png" alt="Images" className="TabIcon" />                  
                  <IonLabel>Cart</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>}

        </IonReactRouter>
      </IonApp >
  );
};

export default App;
