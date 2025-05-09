import AsyncStorage from "@react-native-async-storage/async-storage";

export const addItemToSubCategory = async (
    mainCategoryName?: string,
    subCategoryName?: string,
    newItem?: { id: any; name: string; imgPath: string | null },
    itemsStateChange?: any,
    setItemsStateChange?: any,
    savecategoriesToAsyncStorage?: any,
    id?: number,
) => {
    try {
        console.log("🏷️ mainCategoryName:", mainCategoryName);
        console.log("🏷️ subCategoryName:", subCategoryName);
        console.log("🏷️ newItem:", newItem);
        console.log("🏷️ changestate:", itemsStateChange);
        console.log("🏷️ setChangestate:", setItemsStateChange);
        console.log("🏷️ savecategoriesToAsyncStorage:", savecategoriesToAsyncStorage);
        console.log("🏷️ id:", id);
        const stored = await AsyncStorage.getItem("category_list");
        const categoryList = stored ? JSON.parse(stored) : [];

        const mainCategory = categoryList.find((cat: any) => cat.name === mainCategoryName);
        const subCategoryExists = mainCategory?.Categories?.some(
            (sub: any) => sub.name === subCategoryName
        );

        if (!mainCategory || !subCategoryExists) {
            await savecategoriesToAsyncStorage({
                name: mainCategoryName,
                image: "optionalImage",
                Categories: {
                    name: subCategoryName,
                    items: [],
                },
            },
                id,

            );
        }

        // Refetch after ensuring structure
        const updatedStored = await AsyncStorage.getItem("category_list");
        const updatedList = updatedStored ? JSON.parse(updatedStored) : [];

        const finalList = updatedList.map((mainCat: any) => {
            if (mainCat.name === mainCategoryName) {
                return {
                    ...mainCat,
                    Categories: mainCat.Categories.map((subCat: any) => {
                        if (subCat.name === subCategoryName) {
                            return {
                                ...subCat,
                                items: [...(subCat.items || []), newItem],
                            };
                        }
                        return subCat;
                    }),
                };
            }
            return mainCat;
        });

        await AsyncStorage.setItem("category_list", JSON.stringify(finalList));
        setItemsStateChange?.((prev: boolean) => !prev);
        console.log("✅ Item has been added.")
    } catch (error) {
        console.error("❌ Error while adding item:", error);
    }
};
