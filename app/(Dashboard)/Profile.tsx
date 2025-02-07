import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "@/constants";
// import ProgressCircle from "../../components/progress";
import TextInput2 from "../../components/Input";

const Profile = () => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Profile Coming Soon!</Text> */}
      {/* <ProgressCircle
        percentage={80}
        colors={["#FF5733", "#FFC300", "#DAF7A6"]}
        size={100} // Increase overall size of the progress bar
        strokeWidth={20} // Increase the stroke thickness
        textSize={18} // Increase the text font size
      /> */}
      {/* <ProgressCircle
        percentage={85}
        colors={["#FF5733", "red", "red"]}
        size={80} // Custom size
        strokeWidth={15} // Thicker stroke
        textSize={18} // Larger text
      /> */}
      <TextInput2
        placeholder="Enter Name"
        label={"Name"}
        value={undefined}
        onFocus={undefined}
        onBlur={undefined}
        onChangeText={undefined}
        bgColor="red"
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
