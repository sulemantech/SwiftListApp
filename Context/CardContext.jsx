import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState({});
  const [hasCleared, setHasCleared] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userDetails, setUserDetails] = useState({
    UserName: "",
    UserEmail: "",
    UserMobileNo: "",
    UserLocation: "",
    UserProfilePicture: 'https://via.placeholder.com/150',
  });
  const [changestate, setChangestate] = useState(false);

  useEffect(() => {
    const loadSelectedProducts = async () => {
      try {
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

  const updateSelectedProducts = async (ListID, product) => {
    console.log(ListID , product)
    const updatedProducts = { ...selectedProducts };

    if (!updatedProducts[ListID]) {
      updatedProducts[ListID] = [];
    }

    const isSelected = updatedProducts[ListID].some(selected => selected.id === product.id);

    if (isSelected) {
      updatedProducts[ListID] = updatedProducts[ListID].filter(selected => selected.id !== product.id);
    } else {
      updatedProducts[ListID].push({ name: product.name, imgPath: product.imgPath , id: product.id });
    }

    setSelectedProducts(updatedProducts);
    await AsyncStorage.setItem('selectedProducts', JSON.stringify(updatedProducts));
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
      updateSelectedProductsQuantity,
      isAuthenticated,
      setIsAuthenticated,
      userDetails, setUserDetails,
    }}>
      {children}
    </ProductContext.Provider>
  );
};
