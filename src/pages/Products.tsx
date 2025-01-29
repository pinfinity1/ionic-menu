import React, {useState} from "react";
import "./Products.css"
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
    IonPage,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {addOutline, camera, informationCircleOutline} from "ionicons/icons";


const Products: React.FC = () => {
    const [category, setCategory] = useState<string>('');
    const [productName, setProductName] = useState<string>('');
    const [productContent, setProductContent] = useState<string>('');
    const [productPrice, setProductPrice] = useState<number>(0);
    const [productImage, setProductImage] = useState<string>('');

    const handleSubmit = () => {
        // Handle form submission
        console.log({category, productName, productContent, productPrice, productImage});
    };

    const openFileDialog = () => {
        (document as any).getElementById("file-upload").click();
    };

    const setImage = (_event: any) => {
        let f = _event.target.files![0];
        console.log(f)
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/"/>
                    </IonButtons>
                    <IonTitle>Products</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonGrid className="cat-container" fixed>
                    <IonRow>
                        <IonCol size="12">
                            <IonHeader collapse="condense">
                                <IonToolbar>
                                    <IonTitle size="large">Products</IonTitle>
                                </IonToolbar>
                            </IonHeader>

                            <IonCard className="prod-card">
                                <IonCardHeader>
                                    <IonCardTitle>
                                        <IonIcon icon={informationCircleOutline}/>
                                        Add Product
                                    </IonCardTitle>
                                </IonCardHeader>

                                <IonCardContent>
                                    <IonItem>
                                        <IonSelect justify={"space-between"} label={"Category"}
                                                   value={category}
                                                   placeholder="Select Category"
                                                   onIonChange={e => setCategory(e.detail.value!)}>
                                            <IonSelectOption value="دسته 1">دسته 1</IonSelectOption>
                                            <IonSelectOption value="دسته 2">دسته 2</IonSelectOption>
                                        </IonSelect>
                                    </IonItem>
                                    <IonItem className="ion-margin-top">
                                        <IonInput
                                            label="Product Name"
                                            labelPlacement="stacked"
                                            placeholder=" ">
                                        </IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonTextarea
                                            label="Product Description"
                                            labelPlacement="stacked"
                                            value={productContent}
                                            onIonChange={e => setProductContent(e.detail.value!)}/>
                                    </IonItem>
                                    <IonItem>
                                        <IonInput
                                            type="number"
                                            label="Product Price"
                                            labelPlacement="stacked"
                                            value={productPrice}
                                            onIonChange={e => setProductPrice(parseInt(e.detail.value!, 10))}/>
                                    </IonItem>
                                    <input
                                        type="file"
                                        id="file-upload"
                                        style={{display: "none"}}
                                        onChange={setImage}
                                    />

                                    <IonButton
                                        onClick={openFileDialog} className="img-btn">
                                        image
                                        <IonIcon slot="start" icon={camera}></IonIcon>
                                    </IonButton>

                                    <IonButton className={"submit_btn"} expand="block" onClick={handleSubmit}>
                                        Add
                                        <IonIcon icon={addOutline} slot="end"/>
                                    </IonButton>
                                </IonCardContent>
                            </IonCard>

                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Products