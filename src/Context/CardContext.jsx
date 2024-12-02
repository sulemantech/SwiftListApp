import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState({});
  const [hasCleared, setHasCleared] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/150');
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
      // try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const { username, profilePicture } = JSON.parse(userData);
          setUserName(username);
          setProfilePicture(profilePicture);
        }
      // } catch (error) {
      //   console.error('Error loading user data:', error);
      // }
    };

    
    loadUserData();
    loadSelectedProducts();
  }, []);

  const updateSelectedProducts = async (ListName, product) => {
    const updatedProducts = { ...selectedProducts };

    if (!updatedProducts[ListName]) {
      updatedProducts[ListName] = [];
    }

    const isSelected = updatedProducts[ListName].some(selected => selected.name === product.name);

    if (isSelected) {
      updatedProducts[ListName] = updatedProducts[ListName].filter(selected => selected.name !== product.name);
    } else {
      updatedProducts[ListName].push({ name: product.name, imgPath: product.imgPath });
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

  return (
    <ProductContext.Provider value={{
      changestate, setChangestate,
      selectedProducts,
      updateSelectedProducts,
      clearSelectedProducts,
      updateSelectedProductsQuantity,
      isAuthenticated,
      setIsAuthenticated,
      userName,
      setUserName,
      profilePicture, setProfilePicture
    }}>
      {children}
    </ProductContext.Provider>
  );
};
