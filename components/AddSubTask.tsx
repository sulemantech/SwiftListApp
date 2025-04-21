import { Image } from "expo-image";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ListRenderItem,
} from "react-native";
import { ScreenWidth } from "@rneui/base";

type SubTaskInput = {
  id: number;
  value: string;
  isCompleted: boolean;
  isEditing: boolean;
};

const AddSubTask: React.FC = () => {
  const [inputs, setInputs] = useState<SubTaskInput[]>([]);
  const [showSubTasks, setShowSubTasks] = useState(true);
  const [activePopupId, setActivePopupId] = useState<number | null>(null);

  const handleAddInput = () => {
    setInputs((prev) => [
      ...prev,
      { id: Date.now(), value: "", isCompleted: false, isEditing: true },
    ]);
  };

  const handleInputChange = (text: string, id: number) => {
    setInputs((prev) =>
      prev.map((input) => (input.id === id ? { ...input, value: text } : input))
    );
  };

  const handleRemoveInput = (id: number) => {
    setInputs((prev) => prev.filter((input) => input.id !== id));
  };

  const handleCheck = (id: number) => {
    setInputs((prev) =>
      prev.map((input) =>
        input.id === id
          ? { ...input, isCompleted: true, isEditing: false }
          : input
      )
    );
  };

  const handleEdit = (id: number) => {
    setInputs((prev) =>
      prev.map((input) =>
        input.id === id
          ? {
              ...input,
              isEditing: true,
              isCompleted: false, // make it editable again
            }
          : input
      )
    );
    setActivePopupId(null); // optional but good for consistency
  };

  const renderItem: ListRenderItem<SubTaskInput> = ({ item }) => {
    const showOptions = activePopupId === item.id;

    return (
      <View style={styles.inputRow}>
        <TextInput
          placeholder="    •   Input the sub-task"
          style={[styles.input, item.isCompleted && { color: "#999" }]}
          value={item.value}
          onChangeText={(text) => handleInputChange(text, item.id)}
          placeholderTextColor="#bbb"
          editable={item.isEditing}
        />

        {item.isEditing ? (
          <>
            <TouchableOpacity
              onPress={() => handleCheck(item.id)}
              style={styles.iconButton}
            >
              <Feather name="check" size={15} color="#7CD78F" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleRemoveInput(item.id)}
              style={styles.iconButtoncross}
            >
              <Feather name="x" size={15} color="#B20B1F" />
            </TouchableOpacity>
          </>
        ) : (
          <View style={{ position: "relative", zIndex: 9999 }}>
            <TouchableOpacity
              onPress={() => setActivePopupId(showOptions ? null : item.id)}
            >
              <Feather name="more-horizontal" size={20} color="#999" />
            </TouchableOpacity>

            {showOptions && (
              <View style={styles.popupDialog}>
                <TouchableOpacity
                  onPress={() => handleEdit(item.id)}
                  style={styles.popupOption}
                >
                  <Text style={styles.popupText}>Edit</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          inputs.length > 0 && {
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
          },
        ]}
      >
        <Text style={styles.text}>Add Sub Task</Text>
        <TouchableOpacity style={styles.plusSign} onPress={handleAddInput}>
          <Feather name="plus" size={20} color="#A9A0F0" />
        </TouchableOpacity>
      </View>

      {showSubTasks && (
        <View style={{ width: "90%", alignSelf: "center", zIndex: 10 }}>
          <FlatList
            data={inputs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
      )}

      {inputs.length >= 1 && (
        <TouchableOpacity
          style={[
            styles.chevronbar,
            {
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            },
          ]}
          onPress={() => setShowSubTasks(!showSubTasks)}
        >
          <Feather
            name={showSubTasks ? "chevron-up" : "chevron-down"}
            size={20}
            color="#A9A0F0"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddSubTask;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    height: 52,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    //   marginBottom: 10,
  },
  text: {
    color: "#4C4C4C",
    fontSize: 16,
    fontFamily: "OpenSans-SemiBold",
  },
  plusSign: {
    backgroundColor: "#F3F3FD",
    height: 32,
    width: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  plusText: {
    color: "#A9A0F0",
    fontSize: 30,
    marginTop: -6,
  },
  iconButton: {
    marginHorizontal: 4,
    backgroundColor: "#7CD78F20",
    padding: 4,
    borderRadius: 50,
  },
  iconButtoncross: {
    marginHorizontal: 4,
    backgroundColor: "#B20B1F20",
    padding: 4,
    borderRadius: 50,
  },

  inputRow: {
    flexDirection: "row",
    backgroundColor: "#fff", // same as container
    paddingHorizontal: 16,
    alignItems: "center",
    height: 52,
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // for Android shadow
  },
  input: {
    flex: 1,
    color: "#000",
    fontSize: 16,
    marginRight: 10,
  },
  popupDialog: {
    position: "absolute",
    left: -70,
    top: -20,
    width: ScreenWidth * 0.15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    zIndex: 9999,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },

  popupOption: {
    paddingVertical: 6,
  },

  popupText: {
    fontSize: 14,
    color: "#4C4C4C",
    fontFamily: "OpenSans-SemiBold",
  },

  check: {
    fontSize: 20,
    marginRight: 10,
  },
  cross: {
    justifyContent: "center",
    alignItems: "center",
  },
  chevronbar: {
    backgroundColor: "#fff",
    width: ScreenWidth * 0.9,
    height: 40,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
});
