import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToast } from '@/components/ToastComponet';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState({});
  const [hasCleared, setHasCleared] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [storedLists, setStoredLists] = useState([]);
  const [storedCategories, setStoredCategories] = useState([]);
  const [userDetails, setUserDetails] = useState({
    UserName: "",
    UserEmail: "",
    UserMobileNo: "",
    UserLocation: "",
    UserProfilePicture: 'https://via.placeholder.com/150',
  });
  const [changestate, setChangestate] = useState(false);
  const [itemsStateChange, setItemsStateChange] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const lists = await getStoredLists();
      const stored = await AsyncStorage.getItem('category_list');
      const parsedStored = stored ? JSON.parse(stored) : [];
      // await AsyncStorage.removeItem("myLists");
      // await AsyncStorage.removeItem("selectedProducts");
      // await AsyncStorage.removeItem('category_list');  
      // await AsyncStorage.removeItem('myLists');  
      setStoredCategories(parsedStored);
      setStoredLists(lists);
    };
    console.log("--------------------------------", itemsStateChange)
    fetchData();
  }, [changestate, itemsStateChange]);

  useEffect(() => {
    const loadSelectedProducts = async () => {
      try {
        getStoredLists();
        const storedProducts = await AsyncStorage.getItem('selectedProducts');
        if (storedProducts) {
          setSelectedProducts(JSON.parse(storedProducts));
        }
      } catch (error) {
        console.error('Failed to load selected products:', error);
      }
    };

    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const { username, profilePicture } = JSON.parse(userData);
          setUserDetails(prevDetails => ({
            ...prevDetails,
            UserName: username || prevDetails.UserName,
            UserProfilePicture: profilePicture || prevDetails.UserProfilePicture,
          }));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
    loadSelectedProducts();
  }, []);

  const updateSelectedProducts = async (ListName, product) => {
    console.log("I am  Here", ListName, product);
    const updatedProducts = { ...selectedProducts };

    if (!updatedProducts[ListName]) {
      updatedProducts[ListName] = [];
    }

    const isSelected = updatedProducts[ListName].some(selected => selected.id === product.id);

    if (isSelected) {
      updatedProducts[ListName] = updatedProducts[ListName].filter(selected => selected.id !== product.id);
    } else {
      updatedProducts[ListName].push({ name: product.name, imgPath: product.imgPath, id: product.id });
    }

    setSelectedProducts(updatedProducts);
    console.log("------------ Updated Products--------- ", updatedProducts);
    await AsyncStorage.setItem('selectedProducts', JSON.stringify(updatedProducts));
  };

  const ListStorefnc = async (name, description, image) => {
    try {
      const storedListsJSON = await AsyncStorage.getItem("myLists");
      const storedLists = storedListsJSON ? JSON.parse(storedListsJSON) : [];

      // ✅ Determine the new ID
      const newId =
        storedLists.length > 0
          ? Math.max(...storedLists.map((list) => Number(list.id))) + 1
          : 6;

      const newList = {
        id: newId,
        title: name,
        description,
        items: "0 Items",
        percentagetext: "Bought",
        percent: "0",
        progress: 0.0,
        Picture: image,
        bgColor: "#9DF4F4",
        badgeColor: "#61CBD6",
      };

      storedLists.push(newList);
      await AsyncStorage.setItem("myLists", JSON.stringify(storedLists));
    } catch (error) {
      console.error("❌ Error storing list:", error);
    }
  };

  const getStoredLists = async () => {
    try {
      const storedListsJSON = await AsyncStorage.getItem("myLists");
      return storedListsJSON ? JSON.parse(storedListsJSON) : [];
    } catch (error) {
      console.error("Error getting lists:", error);
      return [];
    }
  };

  const savecategoriesToAsyncStorage = async (categoryCreation, id) => {
    try {
      const existing = await AsyncStorage.getItem("category_list");
      const existingData = existing ? JSON.parse(existing) : [];
      // Find if a category with the same name already exists
      const existingIndex = existingData.findIndex(
        (cat) => cat.name === categoryCreation.name
      );

      if (existingIndex !== -1) {
        // Add new subcategory to the existing category
        const updatedCategories = [
          ...existingData[existingIndex].Categories,
          {
            ...categoryCreation.Categories,
            id:
              existingData[existingIndex].Categories.slice(-1)[0]?.id + 1 || 1,
          },
        ];

        // Update the specific category in the array
        existingData[existingIndex] = {
          ...existingData[existingIndex],
          Categories: updatedCategories,
        };

        await AsyncStorage.setItem("category_list", JSON.stringify(existingData));
      } else {
        // Add new category object with initial Categories array
        const newCategory = {
          ...categoryCreation,
          id: id ?? (existingData[existingData.length - 1]?.id > 5
            ? existingData[existingData.length - 1].id + 1
            : 6),

          Categories: [
            {
              ...categoryCreation.Categories,
              id: 1,
            },
          ],
        };

        const updatedData = [...existingData, newCategory];

        await AsyncStorage.setItem("category_list", JSON.stringify(updatedData));
        // showToast({
        //   title: "Category Created",
        //   message: `Category has been added successfully!`,
        //   type: "success",
        // });


      }
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };



  const getLocalCategory = async (id, MyListCollection) => {
    // Try finding in memory
    const localCategory = MyListCollection.find((categoryObj) => {
      return categoryObj.id === Number(id);
    });

    if (localCategory) {
      return localCategory;
    }

    // Fallback to AsyncStorage
    try {
      const stored = await AsyncStorage.getItem('myCategories');
      if (stored) {
        const parsed = JSON.parse(stored);
        const asyncCategory = parsed.find((cat) => cat.id === Number(id));
        return asyncCategory || null;
      }
    } catch (err) {
      console.error('Error accessing AsyncStorage:', err);
    }

    return null;
  };




  const updateSelectedProductsQuantity = async (ListName, product) => {
    const updatedProducts = { ...selectedProducts };

    if (updatedProducts[ListName] && updatedProducts[ListName].length > 0) {
      updatedProducts[ListName].pop();
    }

    updatedProducts[ListName].push(product);

    setSelectedProducts(updatedProducts);
    await AsyncStorage.setItem('selectedProducts', JSON.stringify(updatedProducts));
  };

  const clearSelectedProducts = async () => {
    if (!hasCleared) {
      setSelectedProducts({});
      await AsyncStorage.removeItem('selectedProducts');
      setHasCleared(true);
    }
  };

  // Load notifications from AsyncStorage
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem(`${userDetails.UserName}-notifications`);
        if (storedNotifications) {
          setNotifications(JSON.parse(storedNotifications));
        }
      } catch (error) {
        console.error('Failed to load notifications:', error);
      }
    };

    loadNotifications();
  }, []);

  // Save notifications to AsyncStorage whenever they change
  useEffect(() => {
    const saveNotifications = async () => {
      try {
        await AsyncStorage.setItem(`${userDetails.UserName}-notifications`, JSON.stringify(notifications));
      } catch (error) {
        console.error('Failed to save notifications:', error);
      }
    };

    saveNotifications();
  }, [notifications]);

  const addNotification = (notification) => {
    setNotifications((prev) => {
      const isDuplicate = prev.some((n) =>
        n.title === notification.title &&
        Math.abs(n.time - notification.time) >= 60000
      );

      if (!isDuplicate) {
        return [...prev, notification];
      }
      return prev;
    });

  };

  return (
    <ProductContext.Provider value={{
      changestate, setChangestate,
      notifications, addNotification,
      selectedProducts,
      updateSelectedProducts,
      clearSelectedProducts,
      ListStorefnc,
      updateSelectedProductsQuantity,
      isAuthenticated,
      setIsAuthenticated,
      storedLists, setStoredLists,
      userDetails, setUserDetails,
      savecategoriesToAsyncStorage,
      storedCategories, setStoredCategories,
      itemsStateChange, setItemsStateChange
    }}>
      {children}
    </ProductContext.Provider>
  );
};
