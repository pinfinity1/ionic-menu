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
    IonCol,
    IonContent,
    IonGrid,
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
    IonRow,
    IonTitle,
    IonToggle,
    IonToolbar
} from "@ionic/react";
import {addOutline, createOutline, informationCircleOutline} from "ionicons/icons";
import EditCategoryModal from "../components/EditCategoryModal";


const Category: React.FC = () => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [items, setItems] = useState([
        {id: "1", name: "Item 1"},
        {id: "2", name: "Item 2"},
        {id: "3", name: "Item 3"},
        {id: "4", name: "Item 4"},
        {id: "5", name: "Item 5"},
    ]);
    const [selectedCategory, setSelectedCategory] = useState<{ id: string; name: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    
    const toggleReorder = () => {
        setIsDisabled((prev) => !prev);
    };
    
    
    const handleReorder = (event: CustomEvent) => {
        const reorderedItems = event.detail.complete(items);
        setItems(reorderedItems);
        console.log(items)
    };
    
    const openEditModal = (category: { id: string; name: string }) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };
    
    
    const closeEditModal = () => {
        setIsModalOpen(false);
        setSelectedCategory(null);
    };
    
    
    const handleSave = (id: string, newName: string) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === id ? {...item, name: newName} : item))
        );
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
            
            <IonContent className={""}>
                <IonGrid className="cat-container" fixed>
                    <IonRow>
                        <IonCol size="12">
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
                                    <IonToggle checked={ !isDisabled} onIonChange={toggleReorder}/>
                                </IonListHeader>
                                <IonReorderGroup disabled={isDisabled} onIonItemReorder={handleReorder}>
                                    {items.map((item, index) => (
                                        <IonItem className={"category-list__item custom-item"} key={item.id}>
                                            <IonLabel>{item.name}</IonLabel>
                                            <IonButton onClick={() => openEditModal(item)}>
                                                <IonIcon slot="icon-only" icon={createOutline}></IonIcon>
                                            </IonButton>
                                            <IonReorder slot="end"/>
                                        </IonItem>
                                    ))}
                                </IonReorderGroup>
                            </IonList>
                            
                            {selectedCategory && (
                                <EditCategoryModal
                                    isOpen={isModalOpen}
                                    onClose={closeEditModal}
                                    category={selectedCategory}
                                    onSave={handleSave}
                                />
                            )}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Category