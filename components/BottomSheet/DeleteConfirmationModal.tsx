import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface DeleteConfirmationModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Trash Icon */}
          <Ionicons
            name="trash-outline"
            size={width * 0.15}
            color="#B3261E"
            style={{ marginBottom: height * 0.015 }}
          />

          {/* Warning Text */}
          <Text style={styles.message}>
            Are you sure you want{"\n"}to delete reminder?
          </Text>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.okButton} onPress={onConfirm}>
              <Text style={styles.okButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmationModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: height * 0.03,
    alignItems: "center",
    paddingHorizontal: width * 0.05,
  },
  message: {
    fontSize: width * 0.045,
    fontFamily: "OpenSans-Medium",
    textAlign: "center",
    color: "#5C5C5C",
    marginBottom: height * 0.03,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#5C5C5C",
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#5C5C5C",
    fontSize: width * 0.04,
    fontFamily: "OpenSans-SemiBold",
  },
  okButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#B3261E",
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
  },
  okButtonText: {
    color: "#fff",
    fontSize: width * 0.04,
    fontFamily: "OpenSans-SemiBold",
  },
});
