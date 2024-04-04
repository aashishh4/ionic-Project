import { IonCol, IonGrid, IonPage, IonContent, IonRow,  IonLabel, IonButton} from "@ionic/react";
import Header from "../../components/Header";
const OrderList = () => {
    const orderArray = [1,2,3,4,5]
    return (
        <IonPage>
            <Header />
            <IonContent className="ion-padding-horizontal" >
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <h3>Order List</h3>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                {orderArray.map((val)=>(
                    <IonGrid className="order-list ion-margin-vertical" key={val}>
                    <IonRow className="ion-padding-horizontal ion-padding-vertical">
                        <IonCol >
                            <IonLabel>
                                <h5>  Ali Akbar</h5>
                            </IonLabel>
                        </IonCol>
                        <IonCol className="ion-text-right">
                            <IonLabel>
                                <h5>27/10/23</h5></IonLabel>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-padding-horizontal ion-padding-bottom">
                        <IonCol >
                            <IonLabel>
                                <h5>testingmail2023@mailinator.com</h5>
                            </IonLabel>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-padding-horizontal">
                        <IonCol >
                            <IonLabel className="ion-padding-right">
                                <h5 className="order-address"> Address : liv-in-nature-grain-livenature-container
                                    liv-in-nature-grain-livenature</h5>
                            </IonLabel>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-padding-horizontal ion-padding-vertical">
                       <div className="order-btn">
                            <IonButton expand="full"  shape="round">COD</IonButton>
                            <IonButton expand="full"  shape="round">Pending</IonButton>
                            <IonButton expand="full"  shape="round">View</IonButton>
                       </div>
                    </IonRow>
                </IonGrid>
                ))}
            </IonContent>
        </IonPage>
    )
}

export default OrderList;