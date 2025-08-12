import React, { useEffect, useState } from "react";
import "./Category.css";
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
  IonToolbar,
  IonAlert,
  IonToast,
} from "@ionic/react";
import {
  addOutline,
  createOutline,
  informationCircleOutline,
  trashOutline, // آیکون سطل زباله اضافه شد
} from "ionicons/icons";
import EditCategoryModal from "../components/EditCategoryModal";
import {
  GetCategory,
  PostCategory,
  UpdateCategory,
  DeleteCategoryById,
} from "../api/category";

interface CategoryItem {
  id: string;
  name: string;
}

const Category: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [items, setItems] = useState<CategoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryItem | null>(
    null
  );
  const [toast, setToast] = useState<{
    message: string;
    color: string;
    show: boolean;
  }>({ message: "", color: "", show: false });

  // تابع برای دریافت دسته‌بندی‌ها از API
  const fetchCategories = async () => {
    try {
      const data = await GetCategory();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setToast({
        message: "Failed to load categories.",
        color: "danger",
        show: true,
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      await PostCategory({ name: newCategoryName });
      setNewCategoryName("");
      fetchCategories();
      setToast({
        message: "Category added successfully.",
        color: "success",
        show: true,
      });
    } catch (error) {
      console.error("Failed to add category:", error);
      setToast({
        message: "Failed to add category.",
        color: "danger",
        show: true,
      });
    }
  };

  const handleReorder = (event: CustomEvent) => {
    const reorderedItems = event.detail.complete(items);
    setItems(reorderedItems);
  };

  const openEditModal = (category: CategoryItem) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const confirmDelete = (category: CategoryItem) => {
    setCategoryToDelete(category);
    setShowDeleteAlert(true);
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await DeleteCategoryById(categoryToDelete.id);
      fetchCategories();
      setToast({
        message: "Category deleted successfully.",
        color: "success",
        show: true,
      });
    } catch (error) {
      console.error("Failed to delete category:", error);
      setToast({
        message: "Failed to delete category.",
        color: "danger",
        show: true,
      });
    } finally {
      setShowDeleteAlert(false);
      setCategoryToDelete(null);
    }
  };

  const handleSave = async (id: string, newName: string) => {
    try {
      await UpdateCategory(id, { name: newName });
      fetchCategories();
      setToast({
        message: "Category updated successfully.",
        color: "success",
        show: true,
      });
    } catch (error) {
      console.error("Failed to update category:", error);
      setToast({
        message: "Failed to update category.",
        color: "danger",
        show: true,
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Category</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid className="cat-container" fixed>
          <IonRow>
            <IonCol size="12">
              <IonCard className="cat-card">
                <IonCardHeader>
                  <IonCardTitle>
                    <IonIcon icon={informationCircleOutline} />
                    Add Category
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem className="ion-margin-top">
                    <IonInput
                      label="New Category"
                      labelPlacement="stacked"
                      placeholder="Enter category name"
                      value={newCategoryName}
                      onIonInput={(e) =>
                        setNewCategoryName(e.target.value as string)
                      }
                    />
                  </IonItem>
                  <IonButton
                    expand="block"
                    onClick={handleAddCategory}
                    disabled={!newCategoryName.trim()}
                  >
                    Add <IonIcon icon={addOutline} slot="end" />
                  </IonButton>
                </IonCardContent>
              </IonCard>

              <IonList className={"category-list"}>
                <IonListHeader className={"category-list__header"}>
                  <IonLabel>Categories</IonLabel>
                  <IonToggle
                    checked={!isDisabled}
                    onIonChange={() => setIsDisabled(!isDisabled)}
                  />
                </IonListHeader>
                <IonReorderGroup
                  disabled={true}
                  onIonItemReorder={handleReorder}
                >
                  {items.map((item) => (
                    <IonItem
                      className={"category-list__item custom-item"}
                      key={item.id}
                    >
                      <IonLabel>{item.name}</IonLabel>
                      <IonButton
                        fill="clear"
                        color="medium"
                        onClick={() => openEditModal(item)}
                      >
                        <IonIcon slot="icon-only" icon={createOutline} />
                      </IonButton>
                      <IonButton
                        fill="clear"
                        color="danger"
                        onClick={() => confirmDelete(item)}
                      >
                        <IonIcon slot="icon-only" icon={trashOutline} />
                      </IonButton>
                      <IonReorder slot="end" />
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

              <IonAlert
                isOpen={showDeleteAlert}
                onDidDismiss={() => setShowDeleteAlert(false)}
                header={"Confirm Delete"}
                message={`Are you sure you want to delete "${categoryToDelete?.name}"?`}
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
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Category;
