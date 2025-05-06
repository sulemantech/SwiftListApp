import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";
import { ProductContext } from "@/Context/CardContext";
import CardComponent from "@/components/Card";
import UserProfile from "@/assets/images/UserProfile.png";
import TasksStatistics from "@/components/TasksStatistics";
import { StatusBar } from "expo-status-bar";
import { COLORS, icons } from "@/constants";
import { ExternalPathString, router } from "expo-router";
import First from "../../assets/images/SVG/dashboardgrocery.svg";
import Second from "../../assets/images/SVG/dashboardspiritualgoals.svg";
import Third from "../../assets/images/SVG/dashboardpersonalgromming.svg";
import Fourth from "../../assets/images/SVG/thingstodo.svg";
import Fifth from "../../assets/images/SVG/recipe.svg";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconWithCircle from "@/components/IconWithCircle";
import CreateButton from "@/components/CreateButton";

const { width, height } = Dimensions.get("window");

const Home = () => {
  const { width, height } = useWindowDimensions();
  const [selectedCard, setSelectedCard] = useState(null);
  const [isListLoaded, setIsListLoaded] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [cardTitles, setCardTitles] = useState<string[]>([]);

  const handleCardClick = (title: any) => {
    setSelectedCard(title);
  };
  const { selectedProducts, userDetails, changestate, setChangestate } =
    useContext(ProductContext);

  const cardDataArray = [
    {
      id: 1,
      title: "Grocery List",
      description: "Add needed items.",
      items: "0 Items",
      percentagetext: "Bought",
      percent: "70",
      progress: 0.0,
      Picture: First,
      bgColor: "#9DF4F4",
      badgeColor: "#61CBD6",
    },
    {
      id: 2,
      title: "Spiritual Goals",
      description: "Add your spiritual goals.",
      items: "0 Goals",
      percentagetext: "Achieved",
      percent: "30",
      progress: 0.0,
      Picture: Second,
      bgColor: "#98FBCB",
      badgeColor: "#4AA688",
    },
    {
      id: 3,
      title: "Personal Grooming",
      description: "Add your grooming tasks in list.",
      items: "0 Tasks",
      percentagetext: "Completed",
      percent: "80",
      progress: 0.0,
      Picture: Third,
      bgColor: "#FEE5D7",
      badgeColor: "#C54B6C",
    },
    {
      id: 4,
      title: "Things To Do",
      description: "Add tasks in your to-do list.",
      items: "0 Items",
      percentagetext: "Completed",
      percent: "50",
      progress: 0.0,
      Picture: Fourth,
      bgColor: "#FFD7A6",
      badgeColor: "#D98E33",
    },
    {
      id: 5,
      title: "Kitchen Menu",
      description: "Add items to your list.",
      items: "0 Recipies",
      percentagetext: "Cooked",
      percent: "70",
      progress: 0.0,
      Picture: Fifth,
      bgColor: "#FFAEAD",
      badgeColor: "#D66160",
    },
  ];

  const [cardDataFilterArray, setCardDataFilterArray] = useState(cardDataArray);

  const FilterCatagories = (name: any) => {
    const searchedtext = name.toLowerCase();
    if (!searchedtext) {
      return setCardDataFilterArray(cardDataArray);
    }
    setCardDataFilterArray(
      cardDataFilterArray.filter((item) =>
        item.title.toLowerCase().startsWith(searchedtext)
      )
    );
  };

  useEffect(() => {
    getListFromLocalStorage();
  }, [isBlur]);

  const getListFromLocalStorage = async () => {
    setIsListLoaded(false);
    try {
      const storedList = await AsyncStorage.getItem("myLists");
      console.log(storedList);
      const list = storedList ? JSON.parse(storedList) : [];
      const formattedList = list
        .map((item: any) => ({
          ...item,
          Picture:
            item.Picture === "first"
              ? First
              : item.Picture === "seconed"
              ? Second
              : item.Picture === "third"
              ? Third
              : item.Picture === "fourth"
              ? Fourth
              : item.Picture === "fifth"
              ? Fifth
              : item.Picture,
        }))
        .filter((item: any) => item.title);

      const mergedData =
        formattedList.length > 0
          ? [...cardDataArray, ...formattedList]
          : [...cardDataArray];
      const titleArray = mergedData.slice(5).map((item) => item.title);
      setCardTitles(titleArray);

      setCardDataFilterArray(mergedData);
      setIsListLoaded(true);
      setChangestate(false);
    } catch (error) {
      console.error("Error retrieving list:", error);
    }
  };

  useEffect(() => {
    getListFromLocalStorage();
  }, [changestate]);

  useEffect(() => {
    if (!isListLoaded) return;
    const loadSelectedProducts = () => {
      let totalItems = 0;

      const updatedCardData = cardDataFilterArray.map((card) => {
        const itemsFromContext = selectedProducts[card.id] || [];
        const itemCount = itemsFromContext.length;

        totalItems += itemCount;

        return {
          ...card,
          items: `${itemCount} ${card.items.split(" ")[1]}`,
          itemCount,
        };
      });

      const updatedCardDataWithPercentages = updatedCardData.map((card) => {
        const percentage =
          totalItems > 0 ? Math.round((card.itemCount / totalItems) * 100) : 0;
        const progress = !isNaN(percentage) ? percentage / 100 : 0;

        return {
          ...card,
          progress,
          percentagetext: `${card.percentagetext.split(" ")[0]} ${percentage}%`,
          // percentage,
        };
      });

      setCardDataFilterArray(updatedCardDataWithPercentages);
    };

    loadSelectedProducts();
  }, [selectedProducts, isListLoaded]);
  const CreateList = () => {
    setIsBlur((prev) => !prev);
  };

  return (
    <LinearGradient
      colors={["#FFC41F10", "#FFFFFF10", "#FFC41F20"]}
      style={[styles.LinearGradient]}
    >
      {isBlur && (
        <BlurView
          intensity={100}
          tint="light"
          style={[StyleSheet.absoluteFill, { zIndex: 10, borderRadius: 10 }]}
        />
      )}
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor="#FFFFFF" />

        <View
          style={[
            styles.userHeaderContainer,
            { marginTop: height * 0.0421, width: width * 0.8889 },
          ]}
        >
          <View style={styles.userHeaderLeft}>
            <Image
              source={{ uri: userDetails.UserProfilePicture || UserProfile }}
              style={styles.userProfileImage}
            />
            <View style={styles.userTextContainer}>
              <Text style={styles.userGreetingText}>Hello!</Text>
              <Text style={styles.userNameText}>
                {userDetails.UserName || "UserName."}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.bgbill}>
            <Image source={icons.Notification1} style={styles.bellIcon} />
          </TouchableOpacity>
        </View>

        <TasksStatistics cardDataArray={cardDataFilterArray} />

        <View style={styles.flatListContainer}>
          <FlatList
            data={cardDataFilterArray}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={[
              styles.cardContainer,
              { paddingBottom: height * 0.09 },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <CardComponent
                data={item}
                onPress={() =>
                  router.push({
                    pathname: "/categories/Categories" as ExternalPathString,
                    params: { name: item.title, id: item.id },
                  })
                }
              />
            )}
          />
        </View>
      </View>
      {isBlur && <CreateButton  screen="list" categories={cardTitles} />}
      <TouchableOpacity
        onPress={() => CreateList()}
        style={styles.fixedAddButton}
      >
        <Text style={styles.icon}> {isBlur ? " × " : " + "} </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  LinearGradient: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: height * 0.03,
    // backgroundColor: "red",
  },
  userHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "auto",
    // marginVertical: height * 0.012,
    marginBottom: height * 0.0244,
    // backgroundColor: "red",
  },
  userHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  userProfileImage: {
    width: width * 0.1066,
    height: width * 0.1066,
    borderRadius: width * 0.066,
    marginRight: width * 0.026,
  },
  flatListContainer: {
    marginBottom: height * 0.39,
    backgroundColor: "transparent",

    // backgroundColor: "red",
  },
  userTextContainer: {
    flexDirection: "column",
  },
  userGreetingText: {
    fontSize: width * 0.034,
    color: "#5C5C5C",
    opacity: 0.6,
    lineHeight: width * 0.048,
    fontFamily: "OpenSans-Medium",
    // backgroundColor: "red",
  },
  userNameText: {
    fontSize: width * 0.042,
    color: "#4C4C4C",
    lineHeight: width * 0.042,
    fontFamily: "OpenSans-SemiBold",
    fontWeight: "600",
    marginTop: width * 0.013,
    // backgroundColor: "red",
  },
  notificationIcon: {
    width: width * 0.08,
    height: width * 0.08,
  },
  cardContainer: {
    flexGrow: 1,
    zIndex: 999,
  },
  iconContainer: {
    backgroundColor: "grey",
    borderRadius: 50,
    width: width * 0.106,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  iconText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: width * 0.042,
    marginBottom: width * 0.016,
    marginLeft: 3,
    color: "grey",
    marginTop: width * 0.013,
    textAlign: "center",
  },
  bgbill: {
    backgroundColor: "#FF3837",
    height: width * 0.064,
    width: width * 0.064,
    borderRadius: width * 0.045,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#E24140",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
  card: {
    width: "98%",
    height: height * 0.07,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: height * 0.012,
    marginHorizontal: "auto",
  },
  bellIcon: {
    width: width * 0.0533,
    height: width * 0.0533,
    color: "#fff",
  },
  fixedAddButton: {
    position: "absolute",
    bottom: height * 0.1,
    right: width * 0.055,
    backgroundColor: "#A9A0F0",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    aspectRatio: 1,
    zIndex: 999,
  },
  icon: {
    fontFamily: "OpenSans-Light",
    fontSize: width * 0.12,
    color: "white",
    textAlign: "center",
    lineHeight: 60,
  },
  AddITems: {
    position: "absolute",
    bottom: height * 0.2,
    right: width * 0.1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    // width: 60,
    aspectRatio: 1,
    zIndex: 999,
    gap: 10,
  },
});
