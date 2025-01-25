// فایل: EditCategoryPage.tsx
import React, {useEffect, useState} from "react";
import {IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar,} from "@ionic/react";
import {useLocation} from "react-router-dom";

const EditCategory: React.FC = () => {
    const location = useLocation();
    const [categoryName, setCategoryName] = useState("");

    // دریافت داده‌های Category از route
    useEffect(() => {
        if (location.state) {
            setCategoryName(location.state.params);
        }
    }, [location.state]);

    // تابع برای ذخیره تغییرات
    const saveChanges = () => {
        console.log("Category updated:", categoryName);
        // در اینجا می‌توانید تغییرات را ذخیره کنید (مثلاً با API)
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Edit Category</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonInput
                    value={categoryName}
                    onIonChange={(e) => setCategoryName(e.detail.value!)}
                    placeholder="Category Name"
                />
                <IonButton expand="full" onClick={saveChanges}>
                    Save Changes
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default EditCategory;