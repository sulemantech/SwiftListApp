import React from "react";
import { Image, StyleSheet, View, Text, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoginScreen from "./(auth)/Login";

export default function HomeScreen() {
  const navigation = useNavigation();

  return <LoginScreen navigation={navigation} />;
}

const styles = StyleSheet.create({});
