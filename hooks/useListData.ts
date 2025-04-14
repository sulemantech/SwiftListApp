// hooks/useListData.ts
import { useMemo } from "react";
import { MyListCollection } from "@/constants/Data";

export const useListData = (listName?: string, categoryName?: string) => {
  const matchingList = useMemo(() => {
    return MyListCollection.find(
      (item) => item.name.toLowerCase() === listName?.toLowerCase()
    );
  }, [listName]);

  const matchingCategory = useMemo(() => {
    return matchingList?.Categories.find(
      (cat) => cat.name.toLowerCase() === categoryName?.toLowerCase()
    );
  }, [matchingList, categoryName]);

  const allLists = useMemo(() => MyListCollection.map((item) => item.name), []);
  const allCategories = useMemo(() => matchingList?.Categories.map((cat) => cat.name) || [], [matchingList]);
  const allProducts = useMemo(() => matchingCategory?.items || [], [matchingCategory]);

  return {
    allLists,
    matchingList,
    allCategories,
    matchingCategory,
    allProducts,
  };
};
