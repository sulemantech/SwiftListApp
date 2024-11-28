import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState({});
  const [hasCleared, setHasCleared] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('User Name');
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

    const loadUserName = async () => {
      const user = auth().currentUser;
      if (user) {
        const storedUserName = user.displayName || await AsyncStorage.getItem('userName');
        setUserName(storedUserName || 'User Name');
      }
    };

    loadSelectedProducts();
    loadUserName();
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
      setUserName
    }}>
      {children}
    </ProductContext.Provider>
  );
};
