import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import React, { useContext } from "react";
import auth from "@react-native-firebase/auth";
import profile from "../../assets/images/profilepage/profile.png";
// import changepassword from "../../assets/images/profilepage/changepassword.png";
import changepassword from "../../assets/images/profilepage/changepassword.png";
import notification from "../../assets/images/profilepage/notification.png";
import language from "../../assets/images/profilepage/language.png";
import darkmode from "../../assets/images/profilepage/darkmode.png";
import aboutapp from "../../assets/images/profilepage/aboutapp.png";
import ratereview from "../../assets/images/profilepage/ratereview.png";
import privacypolicy from "../../assets/images/profilepage/privacypolicy.png";
import termsconditions from "../../assets/images/profilepage/termsconditions.png";
import help from "../../assets/images/profilepage/help.png";
import logout from "../../assets/images/profilepage/logout.png";
import deleteaccount from "../../assets/images/profilepage/deleteaccount.png";
import Edit from "../../assets/images/profilepage/Edit.png";
import Edit1 from "../../assets/images/profilepage/Edit1.png";
import ChevronIcon from "../../assets/images/SVG/profilepage/chevron.svg";
import LabelWithBtn from "../../components/LabelWithBtn";
import UserProfile from "../../assets/images/UserProfile.png";

import Header from "../../components/Header";
import { router } from "expo-router";

const Profile = () => {
  const handleLogout = async () => {
    try {
      await auth().signOut();
      router.replace("/");
      // navigation.replace('Login');
    } catch (error: any) {
      console.error("Logout error: ", error.message);
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth().currentUser;

    if (user) {
      Alert.alert(
        "Delete Account",
        "Are you sure you want to delete your account? This action cannot be undone.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                await user.delete();
                Alert.alert(
                  "Account Deleted",
                  "Your account has been successfully deleted."
                );
                // navigation.replace(SCREENS.login);
              } catch (error: any) {
                if (error.code === "auth/requires-recent-login") {
                  Alert.alert(
                    "Re-Authentication Required",
                    "Please sign in again to delete your account."
                  );
                } else {
                  Alert.alert("Error", error.message);
                }
              }
            },
          },
        ]
      );
    } else {
      Alert.alert("Error", "No user is currently signed in.");
    }
  };

  const handleBackPress = () => {
    router.back();
    return true;
  };

  return (
    <ScrollView style={styles.container}>
      <Header title="Profile" Rightelement={true} onBack={handleBackPress} />

      <View style={styles.profileContainer}>
        <View style={styles.card}>
          {/* <Image
            source={{ uri: userDetails?.UserProfilePicture }}
            style={styles.profileImage}
          />  */}
          {/* <Image
            source={{ uri: userDetails?.UserProfilePicture }}
            style={styles.profileImage}
          />  */}
          <Image source={UserProfile} style={styles.profileImage} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>Syed Abdullah</Text>
            {/* <Text style={styles.name}>{userDetails?.UserName}</Text> */}
            <Text style={styles.email}>{"Premium Member"}</Text>
          </View>
          {/* <TouchableOpacity><Edit /></TouchableOpacity> */}
          <TouchableOpacity>
            <Image source={Edit1} style={styles.editImage} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardsContainer}>
        <Text style={styles.buttonText}>My Account</Text>
        <View style={styles.cards}>
          <LabelWithBtn text="Profile Details" IconsURL={profile} />
          <LabelWithBtn text="Change Password" IconsURL={changepassword} />
        </View>
      </View>

      <View style={styles.cardsContainer}>
        <Text style={styles.buttonText}>Settings</Text>
        <View style={styles.cards}>
          <LabelWithBtn text="Notification" IconsURL={notification} />
          <LabelWithBtn text="Language" IconsURL={language} />
          <LabelWithBtn text="Dark Mode" IconsURL={darkmode} />
        </View>
      </View>

      <View style={styles.cardsContainer}>
        <Text style={styles.buttonText}>About</Text>
        <View style={styles.cards}>
          <LabelWithBtn text="About App" IconsURL={aboutapp} />
          <LabelWithBtn text="Rate & Review" IconsURL={ratereview} />
          <LabelWithBtn text="Privacy Policy" IconsURL={privacypolicy} />
          <LabelWithBtn text="Terms & Conditions" IconsURL={termsconditions} />
          <LabelWithBtn text="Help" IconsURL={help} />
        </View>
      </View>

      <View style={styles.cardsContainer}>
        <View style={styles.cards}>
          <LabelWithBtn
            text="Log Out"
            onPress={handleLogout}
            IconsURL={logout}
          />
          <LabelWithBtn
            text="Delete Account"
            IconsURL={deleteaccount}
            onPress={handleDeleteAccount}
          />
        </View>
      </View>

      <View style={styles.bottommargin}></View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EFF9FF" },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },
  cardsContainer: { width: "90%", alignSelf: "center", marginTop: 8 },
  buttonText: {
    fontFamily: "Poppins-Bold",
    color: "#0c0c0c",
    fontSize: 13,
    lineHeight: 19.5,
    marginLeft: 8,
    marginVertical: 3,
  },
  cards: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    borderBottomWidth: 4,
    borderRightWidth: 2,
    borderColor: "#007AFF26",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderBottomWidth: 4,
    borderRightWidth: 2,
    borderColor: "#007AFF26",
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: { width: 60, height: 60, borderRadius: 35, marginRight: 12 },
  textContainer: { flex: 1 },
  name: {
    fontSize: 16,
    fontFamily: "OpenSans-Medium",
    color: "#0c0c0c",
    lineHeight: 16,
  },
  email: {
    fontSize: 13,
    fontFamily: "OpenSans-Medium",
    color: "#52C2FE",
    lineHeight: 19.5,
  },
  bottommargin: { height: 90 },
  editImage: {
    width: 20,
    height: 20,
  },
});

// import React, { useContext } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   Alert,
//   ScrollView,
// } from "react-native";
// import auth from "@react-native-firebase/auth";
// import { ProductContext } from "../../Context/CardContext";
// import LabelWithBtn from "../../components/LabelWithBtn";
// import Header from "@/components/Header";
// import profile from "../../assets/images/SVG/profilepage/profile.svg";
// import changepassword from "../../assets/images/SVG/profilepage/logout.svg";
// import notification from "../../assets/images/SVG/profilepage/notification.svg";
// import language from "../../assets/images/SVG/profilepage/language.svg";
// import darkmode from "../../assets/images/SVG/profilepage/darkmode.svg";
// import aboutapp from "../../assets/images/SVG/profilepage/aboutapp.svg";
// import ratereview from "../../assets/images/SVG/profilepage/raterevieww.svg";
// import privacypolicy from "../../assets/images/SVG/profilepage/privacypolicy.svg";
// import termsconditions from "../../assets/images/SVG/profilepage/termsconditions.svg";
// import help from "../../assets/images/SVG/profilepage/help.svg";
// import logout from "../../assets/images/SVG/profilepage/logoutt.svg";
// import deleteaccount from "../../assets/images/SVG/profilepage/deleteaccount.svg";
// import Edit from "../../assets/images/SVG/profilepage/edit.svg";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";

// type ProfileProps = NativeStackScreenProps<any, "Profile">;

// const Profile: React.FC<ProfileProps> = ({ navigation }) => {
//   // const { userDetails } = useContext(ProductContext);

//   const handleLogout = async () => {
//     try {
//       await auth().signOut();
//       navigation.replace("Login");
//     } catch (error: any) {
//       console.error("Logout error:", error.message);
//     }
//   };

//   const handleDeleteAccount = async () => {
//     const user = auth().currentUser;
//     if (user) {
//       Alert.alert(
//         "Delete Account",
//         "Are you sure you want to delete your account? This action cannot be undone.",
//         [
//           { text: "Cancel", style: "cancel" },
//           {
//             text: "Delete",
//             style: "destructive",
//             onPress: async () => {
//               try {
//                 await user.delete();
//                 Alert.alert(
//                   "Account Deleted",
//                   "Your account has been successfully deleted."
//                 );
//                 // navigation.replace(SCREENS.login);
//               } catch (error: any) {
//                 if (error.code === "auth/requires-recent-login") {
//                   Alert.alert(
//                     "Re-Authentication Required",
//                     "Please sign in again to delete your account."
//                   );
//                 } else {
//                   Alert.alert("Error", error.message);
//                 }
//               }
//             },
//           },
//         ]
//       );
//     } else {
//       Alert.alert("Error", "No user is currently signed in.");
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Header title="Profile" Rightelement onBack={() => navigation.goBack()} />
//       <View style={styles.profileContainer}>
//         <View style={styles.card}>
//           <Image
//             // source={{ uri: userDetails?.UserProfilePicture }}
//             style={styles.profileImage}
//           />
//           <View style={styles.textContainer}>
//             {/* <Text style={styles.name}>{userDetails?.UserName}</Text> */}
//             <Text style={styles.email}>Premium Member</Text>
//           </View>
//           <TouchableOpacity>
//             <Edit />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.cardsContainer}>
//         <Text style={styles.buttonText}>My Account</Text>
//         <View style={styles.cards}>
//           <LabelWithBtn text="Profile Details" IconsURL={profile} />
//           <LabelWithBtn text="Change Password" IconsURL={changepassword} />
//         </View>
//       </View>

//       <View style={styles.cardsContainer}>
//         <Text style={styles.buttonText}>Settings</Text>
//         <View style={styles.cards}>
//           <LabelWithBtn text="Notification" IconsURL={notification} />
//           <LabelWithBtn text="Language" IconsURL={language} />
//           <LabelWithBtn text="Dark Mode" IconsURL={darkmode} />
//         </View>
//       </View>

//       <View style={styles.cardsContainer}>
//         <Text style={styles.buttonText}>About</Text>
//         <View style={styles.cards}>
//           <LabelWithBtn text="About App" IconsURL={aboutapp} />
//           <LabelWithBtn text="Rate & Review" IconsURL={ratereview} />
//           <LabelWithBtn text="Privacy Policy" IconsURL={privacypolicy} />
//           <LabelWithBtn text="Terms & Conditions" IconsURL={termsconditions} />
//           <LabelWithBtn text="Help" IconsURL={help} />
//         </View>
//       </View>

//       <View style={styles.cardsContainer}>
//         <View style={styles.cards}>
//           <LabelWithBtn
//             text="Log Out"
//             onPress={handleLogout}
//             IconsURL={logout}
//           />
//           <LabelWithBtn
//             text="Delete Account"
//             IconsURL={deleteaccount}
//             onPress={handleDeleteAccount}
//           />
//         </View>
//       </View>
//       <View style={styles.bottommargin}></View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#EFF9FF" },
//   profileContainer: { flex: 1, alignItems: "center", marginTop: 6 },
//   cardsContainer: { width: "90%", alignSelf: "center", marginTop: 8 },
//   buttonText: {
//     fontFamily: "Poppins-Bold",
//     fontSize: 13,
//     color: "#0c0c0c",
//     marginLeft: 8,
//     marginVertical: 3,
//   },
//   cards: {
//     flex: 1,
//     width: "100%",
//     borderRadius: 10,
//     borderColor: "#007AFF26",
//     backgroundColor: "#fff",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   card: {
//     width: "90%",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 10,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   profileImage: { width: 60, height: 60, borderRadius: 35, marginRight: 12 },
//   textContainer: { flex: 1 },
//   name: { fontSize: 16, fontFamily: "OpenSans-Medium", color: "#0c0c0c" },
//   email: { fontSize: 13, fontFamily: "OpenSans-Medium", color: "#52C2FE" },
//   bottommargin: { height: 90 },
// });

// export default Profile;
