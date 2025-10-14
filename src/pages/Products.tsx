import React, { useState, useEffect, useRef } from "react";
import "./Products.css";
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
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
  IonAlert,
} from "@ionic/react";
import {
  addOutline,
  camera,
  createOutline,
  informationCircleOutline,
  trashOutline,
  closeCircleOutline,
} from "ionicons/icons";
import { GetCategory } from "../api/category";
import {
  UpdateProduct,
  DeleteProductById,
  PostProduct,
  PostProductImage,
} from "../api/product";
import EditProductModal from "../components/EditProductModal";
import api from "../config/api";
import { ProductItem, Category } from "../types";

const Products: React.FC = () => {
  const [categoriesForForm, setCategoriesForForm] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productContent, setProductContent] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number | undefined>();
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [allData, setAllData] = useState<Category[]>([]);
  const [selectedFilterCategory, setSelectedFilterCategory] =
    useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ProductItem | null>(
    null
  );
  const [toast, setToast] = useState<{
    message: string;
    color: string;
    show: boolean;
  }>({ message: "", color: "", show: false });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const data = await GetCategory(true);
      setAllData(data);
      setCategoriesForForm(
        data.map(({ id, name }) => ({ id, name, products: [] }))
      );
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setToast({
        message: "Failed to load data.",
        color: "danger",
        show: true,
      });
    }
  };

  const handleFormSubmit = async () => {
    if (!categoryId || !productName || productPrice === undefined) {
      setToast({
        message: "Please fill all required fields.",
        color: "warning",
        show: true,
      });
      return;
    }
    try {
      const productPayload = {
        categoryId: categoryId,
        name: productName,
        description: productContent,
        price: productPrice,
      };
      const productResponse = await PostProduct(productPayload);
      if (productImageFile && productResponse.id) {
        const formData = new FormData();
        formData.append("image", productImageFile);
        await PostProductImage(productResponse.id, formData);
      }
      setToast({
        message: "Product added successfully!",
        color: "success",
        show: true,
      });
      resetForm();
      fetchAllData();
    } catch (error) {
      console.error("Failed to add product:", error);
      setToast({
        message: "Failed to add product.",
        color: "danger",
        show: true,
      });
    }
  };

  const resetForm = () => {
    setCategoryId("");
    setProductName("");
    setProductContent("");
    setProductPrice(undefined);
    setProductImageFile(null);
    setImagePreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProductImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProductImageFile(null);
    setImagePreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openEditModal = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = async (
    id: string,
    data: Partial<ProductItem>,
    newImage: File | null
  ) => {
    try {
      await UpdateProduct(id, data);

      if (newImage) {
        const formData = new FormData();
        formData.append("image", newImage);
        await PostProductImage(id, formData);
      } else if (selectedProduct?.image && !data.image) {
        // ...
      }

      fetchAllData();
      setIsModalOpen(false);
      setToast({
        message: "Product updated successfully.",
        color: "success",
        show: true,
      });
    } catch (error) {
      console.error("Failed to update product:", error);
      setToast({
        message: "Failed to update product.",
        color: "danger",
        show: true,
      });
    }
  };

  const confirmDelete = (product: ProductItem) => {
    setProductToDelete(product);
    setShowDeleteAlert(true);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    try {
      await DeleteProductById(productToDelete.id);
      fetchAllData();
      setToast({
        message: "Product deleted successfully.",
        color: "success",
        show: true,
      });
    } catch (error) {
      console.error("Failed to delete product:", error);
      setToast({
        message: "Failed to delete product.",
        color: "danger",
        show: true,
      });
    } finally {
      setShowDeleteAlert(false);
      setProductToDelete(null);
    }
  };

  const getDisplayedProducts = () => {
    if (!selectedFilterCategory) return [];
    const selectedCat = allData.find((c) => c.id === selectedFilterCategory);
    return selectedCat ? selectedCat.products : [];
  };

  const displayedProducts = getDisplayedProducts();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Products</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid className="cat-container" fixed>
          <IonRow>
            <IonCol size="12">
              <IonCard className="prod-card">
                <IonCardHeader>
                  <IonCardTitle>
                    <IonIcon icon={informationCircleOutline} /> Add Product
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonSelect
                      label="Category"
                      labelPlacement="stacked"
                      value={categoryId}
                      placeholder="Select Category"
                      onIonChange={(e) => setCategoryId(e.detail.value!)}
                    >
                      {categoriesForForm.map((cat) => (
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
                      placeholder="Enter product name"
                      value={productName}
                      onIonInput={(e) =>
                        setProductName(e.target.value as string)
                      }
                    />
                  </IonItem>
                  <IonItem>
                    <IonTextarea
                      label="Product Description"
                      labelPlacement="stacked"
                      placeholder="Enter description"
                      value={productContent}
                      onIonInput={(e) =>
                        setProductContent(e.target.value as string)
                      }
                    />
                  </IonItem>
                  <IonItem>
                    <IonInput
                      type="number"
                      label="Product Price"
                      labelPlacement="stacked"
                      placeholder="Enter price"
                      value={productPrice}
                      onIonInput={(e) =>
                        setProductPrice(parseInt(e.target.value as string, 10))
                      }
                    />
                  </IonItem>
                  <div className="ion-margin-top">
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    {!imagePreviewUrl && (
                      <IonButton
                        onClick={() => fileInputRef.current?.click()}
                        className="img-btn"
                      >
                        Image <IonIcon slot="start" icon={camera} />
                      </IonButton>
                    )}
                    {imagePreviewUrl && (
                      <div className="image-preview-container">
                        <img
                          src={imagePreviewUrl}
                          alt="Product Preview"
                          className="image-preview"
                        />
                        <IonButton
                          onClick={removeImage}
                          size="small"
                          fill="clear"
                          color="danger"
                          className="remove-image-btn"
                        >
                          <IonIcon slot="icon-only" icon={closeCircleOutline} />
                        </IonButton>
                      </div>
                    )}
                  </div>
                  <IonButton
                    className="submit_btn"
                    expand="block"
                    onClick={handleFormSubmit}
                  >
                    Add Product <IonIcon icon={addOutline} slot="end" />
                  </IonButton>
                </IonCardContent>
              </IonCard>

              <IonCard className="ion-margin-top">
                <IonCardHeader>
                  <IonCardTitle>Manage Products</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonSelect
                      label="Select a category to see its products"
                      labelPlacement="stacked"
                      value={selectedFilterCategory}
                      onIonChange={(e) =>
                        setSelectedFilterCategory(e.detail.value!)
                      }
                      placeholder="Select One"
                    >
                      {categoriesForForm.map((cat) => (
                        <IonSelectOption key={cat.id} value={cat.id}>
                          {cat.name}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                  {selectedFilterCategory && (
                    <IonList>
                      {displayedProducts && displayedProducts.length > 0 ? (
                        displayedProducts.map((product) => (
                          <IonItem key={product.id}>
                            {product.image?.url && (
                              <img
                                src={`${api.defaults.baseURL}${product.image.url}`}
                                alt={product.name}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  marginRight: "10px",
                                  borderRadius: "4px",
                                }}
                              />
                            )}
                            <IonLabel>
                              <h2>{product.name}</h2>
                              <p>{product.price} Toman</p>
                            </IonLabel>
                            <IonButton
                              fill="clear"
                              color="medium"
                              onClick={() => openEditModal(product)}
                            >
                              <IonIcon slot="icon-only" icon={createOutline} />
                            </IonButton>
                            <IonButton
                              fill="clear"
                              color="danger"
                              onClick={() => confirmDelete(product)}
                            >
                              <IonIcon slot="icon-only" icon={trashOutline} />
                            </IonButton>
                          </IonItem>
                        ))
                      ) : (
                        <IonItem lines="none">
                          <IonLabel className="ion-text-center">
                            No products found in this category.
                          </IonLabel>
                        </IonItem>
                      )}
                    </IonList>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        <EditProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
          onSave={handleSave}
        />
        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header={"Confirm Delete"}
          message={`Are you sure you want to delete "${productToDelete?.name}"?`}
          buttons={[
            { text: "Cancel", role: "cancel" },
            { text: "Delete", handler: handleDelete },
          ]}
        />
        <IonToast
          isOpen={toast.show}
          onDidDismiss={() => setToast({ ...toast, show: false })}
          message={toast.message}
          duration={2000}
          color={toast.color}
        />
      </IonContent>
    </IonPage>
  );
};

export default Products;
