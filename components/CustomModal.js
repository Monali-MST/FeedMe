import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const CustomModal = ({ visible, message, onClose }) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: COLORS.black,
  },
  closeButton: {
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  closeButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CustomModal;
