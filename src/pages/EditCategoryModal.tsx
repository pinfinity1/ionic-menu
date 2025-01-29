import React, {useState} from "react";
import {IonButton, IonContent, IonHeader, IonInput, IonModal, IonTitle, IonToolbar,} from "@ionic/react";

interface EditCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: { id: string; name: string };
    onSave: (id: string, newName: string) => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
                                                                 isOpen,
                                                                 onClose,
                                                                 category,
                                                                 onSave,
                                                             }) => {
    const [categoryName, setCategoryName] = useState(category.name);

    const handleSave = () => {
        onSave(category.id, categoryName);
        onClose();
    };

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
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
                <IonButton expand="full" onClick={handleSave}>
                    Save Changes
                </IonButton>
                <IonButton expand="full" color="light" onClick={onClose}>
                    Cancel
                </IonButton>
            </IonContent>
        </IonModal>
    );
};

export default EditCategoryModal;