import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Badge, useTheme } from "@rneui/themed";
import { CardWithCounter } from "./CardWithCouter";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ProductContext } from "../Context/CardContext";
import { Divider, Theme, Switch } from "@rneui/themed";
import CalendarTabBar from "./CalanderTabBar";
import { useRouter } from "expo-router";
const { width } = Dimensions.get("window");

interface BottomSheetComponentProps {
  selecteditem: string;
  ListName: string;
  setIsProductSelected: (value: boolean) => void;
  // setSnapIndex: (index: number) => void;
  // snapIndex: number;
}

interface ItemsQuantity {
  Quantity: string | number;
  unit: string;
  urgency: boolean;
}

const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({
  selecteditem,
  ListName,
  setIsProductSelected,
  // setSnapIndex,
  // snapIndex,
}) => {
  const [itemsQuantity, setItemsQuantity] = useState<ItemsQuantity>({
    Quantity: "",
    unit: "",
    urgency: false,
  });
    const [snapIndex, setSnapIndex] = useState<number>(0);
  

  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const { theme } = useTheme();

  const snapPoints = useMemo(() => ["25%", "55%", "90%" , "99%"], []);
  const ItemValues: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20];
  const { selectedProducts, updateSelectedProductsQuantity } =
    useContext(ProductContext);

  const SelectQuantity = useCallback((Quantity: number | string) => {
    setItemsQuantity((prevState) => ({
      ...prevState,
      Quantity: Quantity !== undefined ? Quantity : prevState.Quantity,
    }));
    setSelectedValue(Number(Quantity));
  }, []);
  const [checked, setChecked] = useState(false);

  const toggleSwitch = () => {
    setChecked(!checked);
  };
  const NUMBERS = Array.from({ length: 31 }, (_, index) =>
    (index + 1).toString()
  );
  const Quntity = ["kg", "Litre", "Dozen"];
  const Time = ["Per Day", "Per Week", "Per Month"];

  useEffect(() => {
    if (itemsQuantity.Quantity) {
      handleSelectedElementQuantity(ListName);
    }
  }, [itemsQuantity, ListName]);

  const handleSelectedElementQuantity = async (listName: string) => {
    if (!itemsQuantity.Quantity) return;

    if (selectedProducts[listName] && selectedProducts[listName].length > 0) {
      const updatedList = [...selectedProducts[listName]];
      const lastElement = updatedList[updatedList.length - 1];

      const updatedLastElement = {
        ...lastElement,
        Quantity: itemsQuantity.Quantity,
        unit: itemsQuantity.unit,
        urgency: itemsQuantity.urgency,
      };

      try {
        await updateSelectedProductsQuantity(listName, updatedLastElement);
      } catch (error) {
        console.error("Error handling product selection:", error);
      }
    }
  };
  const router = useRouter();
  const handleSnapPress = (index: any) => {
    setSnapIndex(index);
    // if (index === 4) {
    //   setIsProductSelected(false)
    //   router.push("/BottomsheetPage/BottomsheetPage");
    // }
  };

  return (
    <BottomSheet
      index={snapIndex}
      onChange={(index) => handleSnapPress(index)}
      snapPoints={snapPoints}
      backgroundComponent={({ style }) => (
        <View style={[style, styles.background]} />
      )}
      handleIndicatorStyle={styles.handleIndicator} //
    >
      <BottomSheetView  style={styles.contentContainer}>
        <View style={styles.bottomSheetHeader}>
          <Text style={styles.bottomSheetHeadertext}>{selecteditem}</Text>
          <Text
            onPress={() => setIsProductSelected(false)}
            style={styles.doneText}
          >
            Done
          </Text>
        </View>
        {/* divider */}
        <View style={styles.divider} />
        <View style={styles.FromCategoryContainer}>
          <Text style={styles.Category}>Categories</Text>
          <Badge
            value={`${ListName}`}
            badgeStyle={styles.CategoryContainer}
            textStyle={styles.CategoryName}
          />
        </View>
      </BottomSheetView>
      {/*======================== old code ======================*/}
      <BottomSheetView style={styles.counterCardWrapper}>
        <View style={styles.counterCard}>
          <Text> </Text>
          <Text style={styles.CardName}>Counter</Text>
          <Switch
            value={checked}
            onValueChange={(value) => setChecked(value)}
          />
        </View>
        <Divider
          width={1.5}
          color={theme?.colors?.primary}
          style={{ marginVertical: 10 }}
        />
        <View style={styles.counterCard}>
          <View style={styles.LabelCounter}>
            <Text style={styles.CounterLabeltext}>Quantity</Text>
            <CardWithCounter Element={NUMBERS} />
          </View>
          <View style={styles.LabelCounter}>
            <Text style={styles.CounterLabeltext}>Unit</Text>
            <CardWithCounter Element={Quntity} />
          </View>
          <View style={styles.LabelCounter}>
            <Text style={styles.CounterLabeltext}> </Text>
            <CardWithCounter Element={Time} />
          </View>
        </View>
      </BottomSheetView>
      <CalendarTabBar/>
    </BottomSheet>
  );
};

export default BottomSheetComponent;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#F3F3FD",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
  },
  bottomSheetHeader: {
    display: "flex",
    width: "90%",
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  counterCardWrapper: {
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    width: "90%",
    marginHorizontal: "auto",
    padding: 10,
    borderRadius: 15,
    flexDirection: "column",
  },
  counterCard: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  doneText: {
    fontFamily: "OpenSans-Medium",
    fontSize: 14,
    textAlign: "center",
    paddingTop: 26,
    color: "#5C5C5C",
  },
  bottomSheetHeadertext: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 18,
    textAlign: "center",
    paddingTop: 28,
    color: "#4C4C4C",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#cccc",
    marginTop: 20,
    opacity: 1,
  },
  FromCategoryContainer: {
    display: "flex",
    width: "90%",
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  Category: {
    fontFamily: "OpenSans-Medium",
    fontSize: 14,
    textAlign: "center",
    color: "#5C5C5C",
  },
  CategoryContainer: {
    height: 22,
    backgroundColor: "#007AFF26",
    paddingHorizontal: 5,
  },
  LabelCounter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  CategoryName: {
    fontFamily: "OpenSans-Regular",
    fontSize: 12,
    textAlign: "center",
    color: "#4C4C4C",
  },
  CardName: {
    fontFamily: "OpenSans-Bold",
    fontSize: 16,
    textAlign: "center",
    color: "#4C4C4C",
  },

  buttonsLabeltext: {
    width: "100%",
    fontFamily: "OpenSans-Bold",
    fontSize: 16,
    textAlign: "left",
    marginVertical: 4,
    color: "#4C4C4C",
    backgroundColor: "red",
  },
  TextInput2: {
    width: "94%",
  },
  contentContainer2: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 2,
    alignItems: "center",
  },
  contentContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 10,
  },
  CounterLabeltext: {
    fontFamily: "OpenSans-Bold",
    fontSize: 16,
    textAlign: "center",
    color: "#4C4C4C",
  },
  bottomSheetview: {
    width: 32,
    aspectRatio: 1,
    marginHorizontal: 6,
    backgroundColor: "#52c2fe",
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheettext: {
    fontFamily: "OpenSans-Bold",
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
  CheckboxesContainer: {
    marginTop: 15,
    width: "96%",
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  selectedItem: {
    backgroundColor: "#E36A4A",
  },
  handleIndicator: {
    backgroundColor: "#5C5C5C", // Change this to your desired color
    width: 58.43, // Adjust width if needed
    height: 3, // Adjust thickness if needed
    borderRadius: 10, // Keeps it rounded
    opacity: 0.3,
  },
});
