import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { useContext, useState } from "react";
import { Image } from "expo-image";
import { ProductContext } from "@/Context/CardContext";
import CardComponent from "@/components/Card";
import UserProfile from "@/assets/images/UserProfile.png";
import TasksStatistics from "@/components/TasksStatistics";
import { StatusBar } from "expo-status-bar";
import { COLORS, icons } from "@/constants";
import { FontFamily } from "@/constants/theme";
import { ExternalPathString, router } from "expo-router";
import First from "../../assets/images/SVG/dashboardgrocery.svg"
import Second from "../../assets/images/SVG/dashboardspiritualgoals.svg"
import Third from "../../assets/images/SVG/dashboardpersonalgromming.svg"
import Fourth from "../../assets/images/SVG/thingstodo.svg"
import Fifth from "../../assets/images/SVG/recipe.svg"
import { LinearGradient } from "expo-linear-gradient";
import Card from "@/components/Card";

const Home = () => {
  const { userDetails } = useContext(ProductContext);
  const { width, height } = useWindowDimensions();

  const cardDataArray = [
    {
      title: "Grocery List",
      description: "Add needed items.",
      items: "200 Items",
      percentagetext: "Bought 70%",
      progress: 0.8,
      Picture: First,
      bgColor: "#9DF4F4",
      badgeColor: "#61CBD6",
    },
    {
      title: "Spiritual Goals",
      description: "Add your spiritual goals.",
      items: "10 Goals",
      percentagetext: "Achieved 30%",
      progress: 0.67,
      Picture: Second,
      bgColor: "#98FBCB",
      badgeColor: "#4AA688",
    },
    {
      title: "Personal Grooming",
      description: "Add your grooming tasks in list.",
      items: "10 Tasks",
      percentagetext: "Completed 80%",
      progress: 0.72,
      Picture: Third,
      bgColor: "#FEE5D7",
      badgeColor: "#C54B6C",
    },
    {
      title: "Things To Do",
      description: "Add tasks in your to-do list.",
      items: "0 Items",
      percentagetext: "Completed 50%",
      progress: 0.5,
      Picture: Fourth,
      bgColor: "#FFD7A6",
      badgeColor: "#D98E33",
    },
    {
      title: "Kitchen Menu",
      description: "Add items to your list.",
      items: "500 Recipes",
      percentagetext: "Cooked 0%",
      progress: 0.78,
      Picture: Fifth,
      bgColor: "#FDDC8A",
      badgeColor: "#D88D1B",
    },
  ];

  const [cardDataFilterArray, setCardDataFilterArray] = useState(cardDataArray);

  return (
    <LinearGradient
      colors={["#CBC3FB10", "#CBC3FB20", "#CBC3FB30"]}
      style={styles.LinearGradient}
    >
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor="#FFFFFF" />

        {/* User Header */}
        <View style={styles.userHeaderContainer}>
          <View style={styles.userHeaderLeft}>
            <Image
              source={{ uri: userDetails.UserProfilePicture || UserProfile }}
              style={styles.userProfileImage}
            />
            <View style={styles.userTextContainer}>
              <Text style={styles.userGreetingText}>Hello</Text>
              <Text style={styles.userNameText}>
                {userDetails.UserName || "UserName"}
              </Text>
            </View>
          </View>

          {/* Notification Icon */}
          <TouchableOpacity style={styles.bgbill}>
            <Image source={icons.Notification1} style={styles.bellIcon} />
          </TouchableOpacity>
        </View>

        {/* Tasks Statistics Component */}
        <TasksStatistics cardDataArray={cardDataArray} />
        <View style={styles.flatListContainer}>
          {/* Card List */}
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
                    // pathname: "/(Dashboard)/Categories",
                    pathname: "/categories/Categories" as ExternalPathString,
                    params: { name: item.title },
                  })
                }
              />
            )}
            ListFooterComponent={
              <TouchableOpacity style={styles.card}>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}> + </Text>
                </View>
                <Text style={styles.iconText}>Create List</Text>
              </TouchableOpacity>
            }
          /> 
        </View>
      </View>
    </LinearGradient>
  );
};

export default Home;
const styles = StyleSheet.create({
  LinearGradient: {
    left: 0,
    right: 0,
    top: 0,
    width: "100%",
    height: "100%",
    flex: 1,
    // backgroundColor:"red"
  },

  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: "5%",
    // backgroundColor: "#FFFFFF",
    // marginBottom: 310,
  },
  userHeaderContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "auto",
    width: "100%",
    marginVertical: 10,
    // backgroundColor:"red"
  },
  userHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  userProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  flatListContainer: {
    // backgroundColor: "red",
    marginBottom: 315,
  },
  userTextContainer: {
    flexDirection: "column",
  },
  userGreetingText: {
    fontSize: 13,
    color: "#344054",
    lineHeight: 19.5,
    fontFamily: "OpenSans-Medium",
  },
  userNameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    lineHeight: 16,
    fontFamily: FontFamily.heading,
    marginTop: 5,
  },
  notificationIcon: {
    width: 30,
    height: 30,
  },
  caption: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    paddingVertical: "0.2%",
    color: "#6c6c6c",
    fontWeight: "300",
    lineHeight: 13,
    textAlign: "left",
  },
  caption2: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    paddingVertical: "0.4%",
    color: "#6c6c6c",
    fontWeight: "300",
    lineHeight: 23,
    textAlign: "left",
  },
  heading: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 16,
    color: "#000",
    paddingVertical: "1%",
    fontWeight: "600",
    lineHeight: 16,
    textAlign: "left",
  },
  editcontainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
  },
  SearchANDFilter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  filterimg: {
    width: 40,
    aspectRatio: 1,
  },
  cardContainer: {
    // backgroundColor: "#FFFFFF",
    flexGrow: 1,
    // marginBottom: 80,
    zIndex: 999,
  },
  scrollContent: {
    alignItems: "flex-start",
  },
  input: {
    flex: 1,
    height: 40.5,
    borderColor: "#52C2FE",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 0,
    fontFamily: "Poppins-Light",
    fontSize: 14,
    lineHeight: 40,
    textAlignVertical: "center",
  },
  iconContainer: {
    backgroundColor: "grey",
    borderRadius: 50,
    width: 40,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 28,
    marginBottom: 10,
    marginLeft: 1,
    color: "white",
  },
  iconText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 16,
    marginBottom: 6,
    marginLeft: 3,
    color: "grey",
    marginTop: 5,
    textAlign: "center",
  },
  bgbill: {
    backgroundColor: "#FF3837",
    height: 30,
    width: 30,
    borderRadius: 17,
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
    height: 60,
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
    marginVertical: 10,
    marginHorizontal: "auto",
  },
  bellIcon: {
    width: 20,
    height: 20,
    color: "#fff",
  },
  todayProgress_card: {
    marginTop: 10,
    // height: hp("20%"),
    height: 300,
    width: "100%",
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
    marginVertical: 10,
    marginHorizontal: "auto",
  },
  innerView: {
    // flexDirection: "row",
    margin: 10,
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  innerText: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#000",
    paddingVertical: "0.5%",
    fontWeight: "400",
    lineHeight: 12,
    textAlign: "left",
  },
  progressCircles_view: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    // backgroundColor:"black",
  },
  motivational_msg_view: {
    flexDirection: "row",
    alignItems: "center",
    // gap: 0,
    // backgroundColor:"black",
    marginTop: 5,
  },
});

// import { View, Text } from "react-native";
// import React from "react";

// const Home = () => {
//   return (
//     <View>
//       <Text>Home</Text>
//     </View>
//   );
// };

// export default Home;
