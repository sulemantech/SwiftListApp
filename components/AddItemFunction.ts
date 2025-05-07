import AsyncStorage from "@react-native-async-storage/async-storage";

export const addItemToSubCategory = async (
    mainCategoryName: string,
    subCategoryName: string,
    newItem: { id: any; name: string; imgPath: string | null },
    changestate: any,
    setChangestate: any,
) => {
    try {
        console.log(mainCategoryName , subCategoryName , newItem )
        const stored = await AsyncStorage.getItem("category_list");
        console.log(stored)
        if (!stored) return;

        const categoryList = JSON.parse(stored);

        const updatedList = categoryList.map((mainCat: any) => {
            if (mainCat.name === mainCategoryName) {
                return {
                    ...mainCat,
                    Categories: mainCat.Categories.map((subCat: any) => {
                        if (subCat.name === subCategoryName) {
                            return {
                                ...subCat,
                                items: [...subCat.items, newItem],
                            };
                        }
                        return subCat;
                    }),
                };
            }
            return mainCat;
        });

        await AsyncStorage.setItem("category_list", JSON.stringify(updatedList));
        console.log("✅ Item successfully added!");
        setChangestate(!changestate);
    } catch (error) {
        console.error("❌ Error while adding item:", error);
    }
};