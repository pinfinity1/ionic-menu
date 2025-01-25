import React, {useState} from "react";
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
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonReorder,
    IonReorderGroup,
    IonTitle,
    IonToggle,
    IonToolbar
} from "@ionic/react";
import {addOutline, createOutline, informationCircleOutline} from "ionicons/icons";
import {useHistory} from "react-router";


const Category: React.FC = () => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]);
    const history = useHistory();

    const toggleReorder = () => {
        setIsDisabled((prev) => !prev);
    };


    const handleReorder = (event: CustomEvent) => {
        const reorderedItems = event.detail.complete(items);
        setItems(reorderedItems);
        console.log(items)
    };

    const goToEditPage = (categoryName: string) => {
        history.push("/edit-category", {categoryName});
    };


    return (
        <IonPage>
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

            <IonContent fullscreen className={"ion-padding"}>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Category</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonCard className="cat-card">
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


                <IonList className={"category-list"}>
                    <IonListHeader className={"category-list__header"}>
                        <IonLabel content={""}>Categories</IonLabel>
                        <IonToggle checked={!isDisabled} onIonChange={toggleReorder}/>
                    </IonListHeader>
                    <IonReorderGroup disabled={isDisabled} onIonItemReorder={handleReorder}>
                        {items.map((item, index) => (
                            <IonItem className={"category-list__item custom-item"} key={item}>
                                <IonLabel>{item}</IonLabel>
                                <IonButton className={"edit-button"} onClick={() => goToEditPage(item)}>
                                    <IonIcon slot="icon-only" icon={createOutline}></IonIcon>
                                </IonButton>
                                <IonReorder slot="end"/>
                            </IonItem>
                        ))}
                    </IonReorderGroup>
                </IonList>

            </IonContent>
        </IonPage>
    )
}

export default Category