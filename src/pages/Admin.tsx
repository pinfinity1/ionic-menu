import React from "react";
import "./Admin.css"
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";

const Admin: React.FC = () => {


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>Menu Admin</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Admin</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonList inset={true}>
                    <IonItem className="list__items" routerLink={"category"} button={true}
                             routerDirection="none">
                        <IonLabel>Category</IonLabel>
                    </IonItem>
                    <IonItem className="list__items" routerLink={"product"} button={true}
                             routerDirection="none">
                        <IonLabel>Products</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Admin