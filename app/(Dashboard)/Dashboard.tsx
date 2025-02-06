import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import { ScrollView } from "react-native";
// import Filtericon from '../../assets/images/filtericon.png';
import first from "../../assets/images/SVG/dashboardgrocery.svg";
import seconed from "../../assets/images/SVG/dashboardspiritualgoals.svg";
import third from "../../assets/images/SVG/dashboardpersonalgromming.svg";
import fourth from "../../assets/images/SVG/thingstodo.svg";
import fifth from "../../assets/images/SVG/recipe.svg";
import bell from "../../assets/images/SVG/dashboard/bell.svg";
import CardComponent from "../../components/Card";
const UserProfile = require("../../assets/images/UserProfile.png");
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, icons } from "../../constants";
import { FontFamily } from "@/constants/theme";
import ProgressCircle from "../../components/progress";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import CircularProgress from "react-native-progress";
import { Svg, Circle } from "react-native-svg";

const Dashboard = () => {
  const cardDataArray = [
    {
      title: "Grocery List",
      description: "Add needed items.",
      items: "200 Items",
      percentagetext: "Bought 70%",
      progress: 0.8,
      color: "#008B94",
      Picture: first,
      bgColor: "#9DF4F4",
      badgeColor: "#61CBD6",
    },
    {
      title: "Spiritual Goals",
      description: "Add your spiritual goals.",
      items: "10 Goals",
      percentagetext: "Achieved 30%",
      progress: 0.67,
      Picture: seconed,
      bgColor: "#98FBCB",
      badgeColor: "#4AA688",
    },
    {
      title: "Personal Grooming",
      description: "Add your grooming tasks in list.",
      items: "10 Tasks",
      percentagetext: "Completed 80%",
      progress: 0.72,
      Picture: third,
      bgColor: "#FEE5D7",
      badgeColor: "#C54B6C",
    },
    {
      title: "Things To Do",
      description: "Add tasks in your to do list.",
      items: "0 Items",
      percentagetext: "Completed 50%",
      progress: 0.5,
      Picture: fourth,
      bgColor: "#FFCBA1",
      badgeColor: "#E36A4A",
    },
    {
      title: "Kitchen Menu",
      description: "Add items to your list.",
      items: "500 Recipes",
      percentagetext: "Cooked 0%",
      progress: 0.78,
      Picture: fifth,
      bgColor: "#FDDC8A",
      badgeColor: "#D88D1B",
    },
  ];

  const [cardDataFilterArray, setCardDataFilterArray] = useState(cardDataArray);
  const [value, setValue] = useState(0);

  return (
    <>
      {/* {selectedCard ? (
        <ItemsList ItemName={selectedCard} ListName={selectedCard.title} onBackPress={handleBackPress} />
        ) : ( */}
      <LinearGradient
        colors={["#FFC41F10", "#FFFFFF10", "#FFC41F20"]}
        style={styles.LinearGradient}
      />
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        <View style={styles.userHeaderContainer}>
          <View style={styles.userHeaderLeft}>
            <Image source={UserProfile} style={styles.userProfileImage} />
            {/* <Image
                  source={{ uri: userDetails.UserProfilePicture }}
                  style={styles.userProfileImage}
                /> */}
            <View style={styles.userTextContainer}>
              <Text style={styles.userGreetingText}>Hello,</Text>
              {/* <Text style={styles.userNameText}>{userDetails.UserName}!</Text> */}
              <Text style={styles.userNameText}>MetaFront! LLP.</Text>
            </View>
          </View>
          <View style={styles.bgbill}>
            <Image source={icons.Notification1} style={styles.bellIcon} />
          </View>
        </View>
        {/* <View style={styles.SearchANDFilter}>
              <TextInput onChangeText={(text) => { FilterCatagories(text) }} style={[styles.input , {color: colorScheme === 'dark' ? '#000' : '#000'} ]} />
              <Image style={styles.filterimg} source={Filtericon} />
            </View> */}
        <View style={styles.todayProgress_card}>
          <LinearGradient
            colors={["#9584F8", "#9584F810", "#9584F820"]}
            style={styles.LinearGradient}
          >
            <View style={styles.innerView}>
              <Text style={styles.innerText}>Today’s Progress</Text>
              {/* <CircularProgress/> */}

              <View style={styles.progressCircles_view}>
                {cardDataArray.map((cardDataArray, index) => (
                  <ProgressCircle
                    key={index}
                    percentage={
                      cardDataArray.progress ? cardDataArray.progress * 100 : 1
                    } 
                    colors={[
                      "#FFF",
                      cardDataArray.badgeColor,
                      cardDataArray.badgeColor,
                    ]}
                    size={40}
                    strokeWidth={7}
                    textSize={10}
                  />
                ))}
              </View>
              <View style={styles.motivational_msg_view}>
                <Image
                  source={UserProfile}
                  style={[
                    styles.userProfileImage,
                    { width: 17.69, height: 17.69 },
                  ]}
                />
                <View
                  style={{
                    backgroundColor: "#8879F6",
                    justifyContent: "center",
                    borderRadius: 11.17,
                    width: 208,
                    height: 19,
                    left: -4,
                  }}
                >
                  <Text
                    style={[
                      styles.innerText,
                      { color: "#FFF", textAlign: "center" },
                    ]}
                  >
                    🎉 Keep the pace! You’re doing great.
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
        <ScrollView
          style={styles.cardContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* <View style={styles.editcontainer}>
                <Text style={styles.heading}>Your Lists</Text>
                <TouchableOpacity
                  activeOpacity={0.4}
                  style={styles.skip}
                // onPress={() => navigation.navigate(SCREENS.Theme)}
                >
                  <Text style={styles.heading}>Edit</Text>
                </TouchableOpacity>
              </View> */}
          {cardDataFilterArray.map((data, index) => (
            <CardComponent
              key={index}
              data={data}
              // onPress={() => handleCardClick(data)}
            />
          ))}

          <TouchableOpacity
            //  onPress={() => navigation.navigate(SCREENS.Theme)}
            style={styles.card}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.icon}> + </Text>
            </View>
            <Text style={styles.iconText}>Create List</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {/* )} */}
    </>
  );
};

const styles = StyleSheet.create({
  LinearGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
    borderTopLeftRadius: 14, // Set your desired border radius
    borderTopRightRadius: 14, // Set your desired border radius
    overflow: "hidden", // Ensures content doesn't overflow
  },

  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: "5%",
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#FFFFFF",
    flexGrow: 1,
    // marginBottom: 80,
    zIndex: 100,
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
    height: hp("20%"),
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

export default Dashboard;
