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
import { ProductContext } from "@/Context/CardContext";
import CardComponent from "@/components/Card";
import UserProfile from "@/assets/images/UserProfile.png";
import TasksStatistics from "@/components/TasksStatistics";
import { StatusBar } from "expo-status-bar";
import { COLORS, icons } from "@/constants";
import { FontFamily } from "@/constants/theme";
import { ExternalPathString, router } from "expo-router";
import First from "../../assets/images/SVG/dashboardgrocery.svg";
import Second from "../../assets/images/SVG/dashboardspiritualgoals.svg";
import Third from "../../assets/images/SVG/dashboardpersonalgromming.svg";
import Fourth from "../../assets/images/SVG/thingstodo.svg";
import Fifth from "../../assets/images/SVG/recipe.svg";
import { LinearGradient } from "expo-linear-gradient";
import Card from "@/components/Card";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const Home = () => {
  const { width, height } = useWindowDimensions();
  const [selectedCard, setSelectedCard] = useState(null);
  const [isListLoaded, setIsListLoaded] = useState(false);

  const handleCardClick = (title: any) => {
    setSelectedCard(title);
  };
  const { selectedProducts, userDetails, changestate, setChangestate } =
    useContext(ProductContext);

  const cardDataArray = [
    {
      title: "Grocery List",
      description: "Add needed items.",
      items: "0 Items",
      percentagetext: "Bought",
      percent: "70",
      progress: 0.8,
      Picture: First,
      bgColor: "#9DF4F4",
      badgeColor: "#61CBD6",
    },
    {
      title: "Spiritual Goals",
      description: "Add your spiritual goals.",
      items: "0 Goals",
      percentagetext: "Achieved",
      percent: "30",
      progress: 0.67,
      Picture: Second,
      bgColor: "#98FBCB",
      badgeColor: "#4AA688",
    },
    {
      title: "Personal Grooming",
      description: "Add your grooming tasks in list.",
      items: "0 Tasks",
      percentagetext: "Completed",
      percent: "80",
      progress: 0.72,
      Picture: Third,
      bgColor: "#FEE5D7",
      badgeColor: "#C54B6C",
    },
    {
      title: "Things To Do",
      description: "Add tasks in your to-do list.",
      items: "0 Items",
      percentagetext: "Completed",
      percent: "50",
      progress: 0.5,
      Picture: Fourth,
      bgColor: "#FFD7A6",
      badgeColor: "#D98E33",
    },
    {
      title: "Kitchen Menu",
      description: "Add items to your list.",
      items: "0 Recipies",
      percentagetext: "Cooked",
      percent: "70",
      progress: 0.78,
      Picture: Fifth,
      bgColor: "#FFAEAD",
      badgeColor: "#D66160",
    },
  ];

  const [cardDataFilterArray, setCardDataFilterArray] = useState(cardDataArray);

  const FilterCatagories = (name:any) => {
    const searchedtext = name.toLowerCase();
    if (!searchedtext) {
      return setCardDataFilterArray(cardDataArray);
    }
    setCardDataFilterArray(cardDataFilterArray.filter(item => item.title.toLowerCase().startsWith(searchedtext)));
  };

  const getListFromLocalStorage = async () => {
    setIsListLoaded(false);
    try {
      const storedList = await AsyncStorage.getItem('userLists');
      const list = storedList ? JSON.parse(storedList) : [];
      const formattedList = list
        .map((item:any) => ({
          ...item,
          Picture: item.Picture === 'first' ? First :
            item.Picture === 'seconed' ? Second :
              item.Picture === 'third' ? Third :
                item.Picture === 'fourth' ? Fourth :
                  item.Picture === 'fifth' ? Fifth : item.Picture,
        }))
        .filter((item:any) => item.title);

      const mergedData = formattedList.length > 0 ? [...cardDataArray, ...formattedList] : cardDataArray;

      setCardDataFilterArray(mergedData);
      setIsListLoaded(true);
      setChangestate(false)
    } catch (error) {
      console.error('Error retrieving list:', error);
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
        const itemsFromContext = selectedProducts[card.title] || [];
        const itemCount = itemsFromContext.length;

        totalItems += itemCount;

        return {
          ...card,
          items: `${itemCount} ${card.items.split(' ')[1]}`,
          itemCount,
        };
      });

      const updatedCardDataWithPercentages = updatedCardData.map(card => {
        const percentage = totalItems > 0
          ? Math.round((card.itemCount / totalItems) * 100)
          : 0;

        return {
          ...card,
          percentagetext: `${card.percentagetext.split(' ')[0]} ${percentage}%`,
          // percentage,
        };
      });

      setCardDataFilterArray(updatedCardDataWithPercentages);
    };

    loadSelectedProducts();
  }, [selectedProducts, isListLoaded]);

  console.log("selectedProducts", selectedProducts);

  return (
    <LinearGradient
      colors={["#FFC41F10", "#FFFFFF10", "#FFC41F20"]}
      style={styles.LinearGradient}
    >
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

        <TasksStatistics cardDataArray={cardDataArray} />

        <View style={styles.flatListContainer}>
          <FlatList
            data={cardDataFilterArray}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.cardContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <CardComponent
                data={item}
                onPress={() =>
                  router.push({
                    pathname: "/categories/Categories" as ExternalPathString,
                    params: { name: item.title },
                  })
                }
              />
            )}
          />
        </View>
      </View>{" "}
      {/* closing flatListContainer */}
      <TouchableOpacity style={styles.fixedAddButton}>
        <Text style={styles.icon}> + </Text>
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
  icon: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: width * 0.074,
    marginBottom: width * 0.026,
    marginLeft: 1,
    color: "white",
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
    backgroundColor: "grey",
    borderRadius: 50,
    width: width * 0.106,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});

// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   FlatList,
//   useWindowDimensions,
// } from "react-native";
// import { useContext, useState } from "react";
// import { Image } from "expo-image";
// import { ProductContext } from "@/Context/CardContext";
// import CardComponent from "@/components/Card";
// import UserProfile from "@/assets/images/UserProfile.png";
// import TasksStatistics from "@/components/TasksStatistics";
// import { StatusBar } from "expo-status-bar";
// import { COLORS, icons } from "@/constants";
// import { FontFamily } from "@/constants/theme";
// import { ExternalPathString, router } from "expo-router";
// import First from "../../assets/images/SVG/dashboardgrocery.svg";
// import Second from "../../assets/images/SVG/dashboardspiritualgoals.svg";
// import Third from "../../assets/images/SVG/dashboardpersonalgromming.svg";
// import Fourth from "../../assets/images/SVG/thingstodo.svg";
// import Fifth from "../../assets/images/SVG/recipe.svg";
// import { LinearGradient } from "expo-linear-gradient";
// import Card from "@/components/Card";
// import { Dimensions } from "react-native";

// const { width, height } = Dimensions.get("window");

// const Home = () => {
//   const { userDetails } = useContext(ProductContext);
//   const { width, height } = useWindowDimensions();

//   const cardDataArray = [
//     {
//       title: "Grocery List",
//       description: "Add needed items.",
//       items: "200 Items",
//       percentagetext: "Bought 70%",
//       progress: 0.8,
//       Picture: First,
//       bgColor: "#9DF4F4",
//       badgeColor: "#61CBD6",
//     },
//     {
//       title: "Spiritual Goals",
//       description: "Add your spiritual goals.",
//       items: "10 Goals",
//       percentagetext: "Achieved 30%",
//       progress: 0.67,
//       Picture: Second,
//       bgColor: "#98FBCB",
//       badgeColor: "#4AA688",
//     },
//     {
//       title: "Personal Grooming",
//       description: "Add your grooming tasks in list.",
//       items: "10 Tasks",
//       percentagetext: "Completed 80%",
//       progress: 0.72,
//       Picture: Third,
//       bgColor: "#FEE5D7",
//       badgeColor: "#C54B6C",
//     },
//     {
//       title: "Things To Do",
//       description: "Add tasks in your to-do list.",
//       items: "0 Items",
//       percentagetext: "Completed 50%",
//       progress: 0.5,
//       Picture: Fourth,
//       bgColor: "#FFD7A6",
//       badgeColor: "#D98E33",
//     },
//     {
//       title: "Kitchen Menu",
//       description: "Add items to your list.",
//       items: "500 Items",
//       percentagetext: "Cooked 0%",
//       progress: 0.78,
//       Picture: Fifth,
//       // bgColor: "#FDDC8A",
//       // badgeColor: "#D88D1B",
//       bgColor: "#FFAEAD",
//       badgeColor: "#D66160",
//     },
//   ];

//   const [cardDataFilterArray, setCardDataFilterArray] = useState(cardDataArray);

//   return (
//     <LinearGradient
//       colors={["#FFC41F10", "#FFFFFF10", "#FFC41F20"]}
//       style={styles.LinearGradient}
//     >
//       <View style={styles.container}>
//         <StatusBar style="dark" backgroundColor="#FFFFFF" />

//         {/* User Header */}
//         <View style={styles.userHeaderContainer}>
//           <View style={styles.userHeaderLeft}>
//             <Image
//               source={{ uri: userDetails.UserProfilePicture || UserProfile }}
//               style={styles.userProfileImage}
//             />
//             <View style={styles.userTextContainer}>
//               <Text style={styles.userGreetingText}>Hello!</Text>
//               <Text style={styles.userNameText}>
//                 {userDetails.UserName || "UserName."}
//                 {"."}
//               </Text>
//             </View>
//           </View>

//           {/* Notification Icon */}
//           <TouchableOpacity style={styles.bgbill}>
//             <Image source={icons.Notification1} style={styles.bellIcon} />
//           </TouchableOpacity>
//         </View>

//         {/* Tasks Statistics Component */}
//         <TasksStatistics cardDataArray={cardDataArray} />
//         <View style={styles.flatListContainer}>
//           {/* Card List */}
//           <FlatList
//             data={cardDataFilterArray}
//             keyExtractor={(item, index) => index.toString()}
//             contentContainerStyle={styles.cardContainer}
//             showsVerticalScrollIndicator={false}
//             keyboardShouldPersistTaps="handled"
//             renderItem={({ item }) => (
//               <CardComponent
//                 data={item}
//                 onPress={() =>
//                   router.push({
//                     // pathname: "/(Dashboard)/Categories",
//                     pathname: "/categories/Categories" as ExternalPathString,
//                     params: { name: item.title },
//                   })
//                 }
//               />
//             )}
//             ListFooterComponent={
//               <TouchableOpacity style={styles.card}>
//                 <View style={styles.iconContainer}>
//                   <Text style={styles.icon}> + </Text>
//                 </View>
//                 <Text style={styles.iconText}>Create List</Text>
//               </TouchableOpacity>
//             }
//           />
//         </View>
//       </View>
//     </LinearGradient>
//   );
// };

// export default Home;
// const styles = StyleSheet.create({
//   LinearGradient: {
//     left: 0,
//     right: 0,
//     top: 0,
//     width: "100%",
//     height: "100%",
//     flex: 1,
//     // backgroundColor:"red"
//   },

//   container: {
//     flex: 1,
//     paddingTop: 30,
//     alignItems: "center",
//     // paddingHorizontal: "5%",
//     // backgroundColor: "red",
//     // marginBottom: 310,
//   },
//   userHeaderContainer: {
//     marginTop: height * 0.0421,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginHorizontal: "auto",
//     width: width * 0.8889,
//     backgroundColor: "red",

//     marginVertical: 10,
//     // backgroundColor:"red"
//   },
//   userHeaderLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   userProfileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   flatListContainer: {
//     // backgroundColor: "red",
//     marginBottom: 315,
//   },
//   userTextContainer: {
//     flexDirection: "column",
//   },
//   userGreetingText: {
//     fontSize: 13,
//     color: "#344054",
//     opacity: 0.6,
//     lineHeight: 19.5,
//     fontFamily: "OpenSans-Medium",
//   },
//   userNameText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#4C4C4C",
//     lineHeight: 16,
//     fontFamily: "OpenSans-SemiBold",
//     marginTop: 5,
//   },
//   notificationIcon: {
//     width: 30,
//     height: 30,
//   },
//   caption: {
//     fontFamily: "OpenSans-Regular",
//     fontSize: 12,
//     paddingVertical: "0.2%",
//     color: "#6c6c6c",
//     fontWeight: "300",
//     lineHeight: 13,
//     textAlign: "left",
//   },
//   caption2: {
//     fontFamily: "OpenSans-Regular",
//     fontSize: 13,
//     paddingVertical: "0.4%",
//     color: "#6c6c6c",
//     fontWeight: "300",
//     lineHeight: 23,
//     textAlign: "left",
//   },
//   heading: {
//     fontFamily: "OpenSans-SemiBold",
//     fontSize: 16,
//     color: "#000",
//     paddingVertical: "1%",
//     fontWeight: "600",
//     lineHeight: 16,
//     textAlign: "left",
//   },
//   editcontainer: {
//     width: "100%",
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//     justifyContent: "space-between",
//   },
//   SearchANDFilter: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     marginBottom: 6,
//   },
//   filterimg: {
//     width: 40,
//     aspectRatio: 1,
//   },
//   cardContainer: {
//     // backgroundColor: "#FFFFFF",
//     flexGrow: 1,
//     // marginBottom: 80,
//     zIndex: 999,
//   },
//   scrollContent: {
//     alignItems: "flex-start",
//   },
//   input: {
//     flex: 1,
//     height: 40.5,
//     borderColor: "#52C2FE",
//     borderWidth: 1,
//     borderRadius: 8,
//     backgroundColor: "#FFFFFF",
//     paddingHorizontal: 20,
//     paddingVertical: 0,
//     fontFamily: "OpenSans-Light",
//     fontSize: 14,
//     lineHeight: 40,
//     textAlignVertical: "center",
//   },
//   iconContainer: {
//     backgroundColor: "grey",
//     borderRadius: 50,
//     width: 40,
//     aspectRatio: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   icon: {
//     fontFamily: "OpenSans-SemiBold",
//     fontSize: 28,
//     marginBottom: 10,
//     marginLeft: 1,
//     color: "white",
//   },
//   iconText: {
//     fontFamily: "OpenSans-SemiBold",
//     fontSize: 16,
//     marginBottom: 6,
//     marginLeft: 3,
//     color: "grey",
//     marginTop: 5,
//     textAlign: "center",
//   },
//   bgbill: {
//     backgroundColor: "#FF3837",
//     height: 24,
//     width: 24,
//     borderRadius: 17,
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: "#E24140",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 4,
//     elevation: 6,
//   },
//   card: {
//     width: "98%",
//     height: 60,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     gap: 4,
//     borderRadius: 14,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 5,
//     marginVertical: 10,
//     marginHorizontal: "auto",
//   },
//   bellIcon: {
//     width: 20,
//     height: 20,
//     color: "#fff",
//   },
//   todayProgress_card: {
//     marginTop: 10,
//     // height: hp("20%"),
//     height: 300,
//     width: "100%",
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     gap: 4,
//     borderRadius: 14,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 5,
//     marginVertical: 10,
//     marginHorizontal: "auto",
//   },
//   innerView: {
//     // flexDirection: "row",
//     margin: 10,
//     alignItems: "flex-start",
//     justifyContent: "space-between",
//     width: "100%",
//     gap: 10,
//   },
//   innerText: {
//     fontFamily: "OpenSans-Regular",
//     fontSize: 10,
//     color: "#000",
//     paddingVertical: "0.5%",
//     fontWeight: "400",
//     lineHeight: 12,
//     textAlign: "left",
//   },
//   progressCircles_view: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     // backgroundColor:"black",
//   },
//   motivational_msg_view: {
//     flexDirection: "row",
//     alignItems: "center",
//     // gap: 0,
//     // backgroundColor:"black",
//     marginTop: 5,
//   },
// });
