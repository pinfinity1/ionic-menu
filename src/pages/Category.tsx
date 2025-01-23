import React from "react";
import "./Category.css"
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {addOutline, informationCircleOutline} from "ionicons/icons";


const Category: React.FC = () => {


    return (
        <IonPage>
            {/*<IonHeader>*/}
            {/*    <IonToolbar>*/}
            {/*        <IonButtons slot="start">*/}
            {/*            <IonBackButton></IonBackButton>*/}
            {/*        </IonButtons>*/}
            {/*        <IonTitle>Back Button</IonTitle>*/}
            {/*    </IonToolbar>*/}
            {/*</IonHeader>*/}
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/"/>
                    </IonButtons>
                    <IonTitle>
                        Category
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Category</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonCard className="cat-card ion-margin-top">
                    <IonCardHeader>
                        <IonCardTitle>
                            <IonIcon icon={informationCircleOutline}/>
                            Add Category
                        </IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <IonItem className="ion-margin-top">
                            <IonInput label="New Category" labelPlacement="stacked"
                                      placeholder=" ">

                            </IonInput>
                        </IonItem>

                        <IonButton expand="block">
                            Add
                            <IonIcon icon={addOutline} slot="end"/>
                        </IonButton>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default Category