import React, { useState, useEffect, useRef } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonModal,
  IonTitle,
  IonToolbar,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
} from "@ionic/react";
import { GetCategory } from "../api/category";
import { camera, trashOutline } from "ionicons/icons";
import api from "../config/api";
import { ProductItem, Category } from "../types";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductItem | null;
  onSave: (
    id: string,
    data: Partial<ProductItem>,
    newImage: File | null,
    shouldDeleteImage: boolean
  ) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onSave,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productData, setProductData] = useState<Partial<ProductItem>>({});
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [imageWasRemoved, setImageWasRemoved] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId,
      });

      if (product.image) {
        setImagePreviewUrl(
          `${api.defaults.baseURL}product/images/${product.id}`
        );
      } else {
        setImagePreviewUrl(null);
      }

      setNewImageFile(null);
      setImageWasRemoved(false);
    }
  }, [product, isOpen]);

  useEffect(() => {
    if (isOpen) {
      const fetchCategories = async () => {
        try {
          const data = await GetCategory();
          setCategories(data);
        } catch (error) {
          console.error("Failed to fetch categories:", error);
        }
      };
      fetchCategories();
    }
  }, [isOpen]);

  const handleSave = () => {
    if (product) {
      onSave(product.id, productData, newImageFile, imageWasRemoved);
    }
  };

  const handleChange = (key: keyof ProductItem, value: any) => {
    setProductData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageWasRemoved(false);
    }
  };

  const handleDeleteCurrentImage = () => {
    setImagePreviewUrl(null);
    setNewImageFile(null);
    setImageWasRemoved(true);
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Product</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard className="ion-margin-bottom">
          <IonCardHeader>
            <IonCardTitle>Edit Details</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonSelect
                label="Category"
                labelPlacement="stacked"
                value={productData.categoryId}
                disabled
              >
                {categories.map((cat) => (
                  <IonSelectOption key={cat.id} value={cat.id}>
                    {cat.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonInput
                label="Product Name"
                labelPlacement="stacked"
                value={productData.name}
                onIonInput={(e) => handleChange("name", e.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonTextarea
                label="Product Description"
                labelPlacement="stacked"
                value={productData.description}
                onIonInput={(e) => handleChange("description", e.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                type="number"
                label="Product Price"
                labelPlacement="stacked"
                value={productData.price}
                onIonInput={(e) =>
                  handleChange("price", parseInt(e.target.value as string, 10))
                }
              />
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Edit Image</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*"
            />
            {imagePreviewUrl ? (
              <div className="image-preview-container ion-margin-bottom">
                <img
                  src={imagePreviewUrl}
                  alt="Product Preview"
                  className="image-preview"
                />
              </div>
            ) : (
              <p className="ion-text-center ion-margin-bottom">No Image</p>
            )}

            <IonButton
              expand="block"
              onClick={() => fileInputRef.current?.click()}
            >
              Change Image
              <IonIcon slot="start" icon={camera} />
            </IonButton>

            {product?.image && (
              <IonButton
                expand="block"
                color="danger"
                fill="outline"
                className="ion-margin-top"
                onClick={handleDeleteCurrentImage}
              >
                Delete Current Image
                <IonIcon slot="start" icon={trashOutline} />
              </IonButton>
            )}
          </IonCardContent>
        </IonCard>

        <IonButton
          expand="full"
          onClick={handleSave}
          className="ion-margin-top"
        >
          Save All Changes
        </IonButton>
        <IonButton expand="full" color="light" onClick={onClose}>
          Cancel
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default EditProductModal;
