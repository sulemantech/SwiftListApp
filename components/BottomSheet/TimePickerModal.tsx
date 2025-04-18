import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import Modal from "react-native-modal";

interface TimePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (time: string) => void;
}

const ITEM_HEIGHT = 40;

const hours = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0")
);
const minutes = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0")
);
const periods = ["AM", "PM"];

const TimePickerModal: React.FC<TimePickerModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const [selectedHour, setSelectedHour] = useState("10");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedPeriod, setSelectedPeriod] = useState("AM");

  const hourRef = useRef<FlatList>(null);
  const minuteRef = useRef<FlatList>(null);
  const periodRef = useRef<FlatList>(null);

  const handleConfirm = () => {
    const time = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;
    onConfirm(time);
  };

  const renderItem = (item: string, selectedItem: string) => (
    <View style={styles.item}>
      <Text
        style={[
          styles.itemText,
          selectedItem === item && styles.selectedItemText,
        ]}
      >
        {item}
      </Text>
    </View>
  );

  const handleScroll = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
    list: "hour" | "minute" | "period"
  ) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);

    if (list === "hour") {
      setSelectedHour(hours[index]);
    } else if (list === "minute") {
      setSelectedMinute(minutes[index]);
    } else if (list === "period") {
      setSelectedPeriod(periods[index]);
    }
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      style={styles.modal}
      backdropOpacity={0.3}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver
    >
      <View style={styles.container}>
        <Text style={styles.title}>Time</Text>

        {/* 🟣 Label Row */}
        <View style={styles.labelRow}>
          <Text style={[styles.labelText,{left: -15}]}>Hours</Text>
          <Text style={styles.labelText}>Minutes</Text>
          <Text style={styles.labelText}></Text> {/* Empty for AM/PM */}
        </View>

        <View style={styles.pickerContainer}>
          {/* 🟣 Top and Bottom separators */}
          <View style={styles.separatorTopRow}>
            <View style={styles.separatorSmall} />
            <View style={styles.separatorSmall} />
            <View style={styles.separatorSmall} />
          </View>
          <View style={styles.separatorBottomRow}>
            <View style={styles.separatorSmall} />
            <View style={styles.separatorSmall} />
            <View style={styles.separatorSmall} />
          </View>

          {/* Hours */}
          <FlatList
            ref={hourRef}
            data={hours}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            style={[styles.flatList,{left: 2}]}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            bounces={true}
            contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
            onScroll={(e) => handleScroll(e, "hour")}
            scrollEventThrottle={16}
            renderItem={({ item }) => renderItem(item, selectedHour)}
          />

          <Text style={styles.separator}>:</Text>

          {/* Minutes */}
          <FlatList
            ref={minuteRef}
            data={minutes}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            style={[styles.flatList,{left: -10}]}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            bounces={true}
            contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
            onScroll={(e) => handleScroll(e, "minute")}
            scrollEventThrottle={16}
            renderItem={({ item }) => renderItem(item, selectedMinute)}
          />

          {/* AM / PM */}
          <FlatList
            ref={periodRef}
            data={periods}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            style={[styles.flatList,{left: -4}]}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            bounces={true}
            contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
            onScroll={(e) => handleScroll(e, "period")}
            scrollEventThrottle={16}
            renderItem={({ item }) => renderItem(item, selectedPeriod)}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={onClose}
            style={[styles.button, styles.cancelButton]}
          >
            <Text style={[styles.buttonText, { color: "#7B61FF" }]}>
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleConfirm}
            style={[styles.button, styles.okButton]}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    width: "85%",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    // color: "red",
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 5,
    // color: "red",
    marginRight: 25,
  },
  labelText: {
    fontSize: 14,
    color: "#5C5C5C",
    textAlign: "center",
    marginTop: 10,
    opacity: 0.6,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    position: "relative",
    height: 200,
    // backgroundColor:"red",
  },
  separatorTopRow: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
    height: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    zIndex: 1,
  },
  separatorBottomRow: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    height: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    zIndex: 1,
  },
  separatorSmall: {
    width: 40,
    height: 1,
    backgroundColor: "#A9A0F0",
    opacity: 0.7,
  },
  flatList: {
    height: 200,
    width: 60,
    // backgroundColor: "red",
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  itemText: {
    fontSize: 18,
    color: "#888",
  },
  selectedItemText: {
    fontSize: 20,
    color: "#A9A0F0",
    fontWeight: "bold",
  },
  separator: {
    fontSize: 24,
    marginHorizontal: 8,
    color: "#A9A0F0",
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 8,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#A9A0F0",
    backgroundColor: "transparent",
  },
  okButton: {
    backgroundColor: "#A9A0F0",
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#fff",
  },
});

export default TimePickerModal;
