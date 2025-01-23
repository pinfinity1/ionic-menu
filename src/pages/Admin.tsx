import React from "react";
import {
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    isPlatform
} from "@ionic/react";
import {chevronForwardOutline} from "ionicons/icons";
import "./Admin.css"

const Admin: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Menu Administer</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonList className="admin-list ion-padding">
                    <IonListHeader className={"ion-padding-bottom"}>
                        <IonLabel>Fast Food</IonLabel>
                    </IonListHeader>
                    <IonItem button className={"admin-list__item"} routerLink={"category"} routerDirection="none">
                        <IonLabel className={"ion-padding-start"}>
                            Category
                        </IonLabel>
                        {isPlatform('android') || isPlatform("desktop") ?
                            <IonIcon slot="end" icon={chevronForwardOutline}/> : ""
                        }
                    </IonItem>

                    <IonItem button routerLink={"products"} routerDirection="none">
                        <IonLabel className={"ion-padding-start"}>Products</IonLabel>
                        {isPlatform('android') || isPlatform("desktop") ?
                            <IonIcon slot="end" icon={chevronForwardOutline}/> : ""
                        }
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Admin