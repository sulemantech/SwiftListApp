import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState({});
  const [hasCleared, setHasCleared] = useState(false); 

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

  const clearSelectedProducts = async () => {
    if (!hasCleared) {
      setSelectedProducts({}); 
      await AsyncStorage.removeItem('selectedProducts' , 'selectedProductsGrocery List');
      setHasCleared(true);
    }
  };

  return (
    <ProductContext.Provider value={{ selectedProducts, updateSelectedProducts, clearSelectedProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
