import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "@/constants";
import ProgressCircle from "../../components/progress";

const Profile = () => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Profile Coming Soon!</Text> */}
      <ProgressCircle
        percentage={75}
        colors={["#FF5733", "#FFC300", "#DAF7A6"]}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
});

// import { View, StyleSheet } from "react-native";
// import React from "react";
// import { COLORS } from "@/constants";
// import ProgressCircle from "../../components/progress";

// const Profile = () => {
//   return (
//     <View style={styles.container}>
//       <ProgressCircle
//         percentage={75}
//         colors={["#FF5733", "#FFC300", "#DAF7A6"]}
//       />
//     </View>
//   );
// };

// export default Profile;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: COLORS.primary,
//   },
// });
