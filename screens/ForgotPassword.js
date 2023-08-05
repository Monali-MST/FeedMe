import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CustomModal from "../components/CustomModal";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");;
  const [emailError, setEmailError] = useState("");

  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    setEmailError("");

    if (email.trim() === "") {
      setEmailError("Email is required!");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (true) {
      console.log("OTP is sent");
      setSuccessModalVisible(true);
    } else {
      setErrorModalVisible(true);
    }
  };

  const handleSuccessModalClose = () => {
    setSuccessModalVisible(false);
  };

  const handleErrorModalClose = () => {
    setErrorModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginVertical: 12,
              color: COLORS.black,
            }}
          >
            Reset Password
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
            }}
          >
            Enter your E-mail. We will send you 5 digits varification code.
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
            Email address
          </Text>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              style={{ width: "100%" }}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          {emailError ? (
            <Text style={{ color: COLORS.red }}>{emailError}</Text>
          ) : null}
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
            width: "100%",
          }}
        >
          <Pressable
            onPress={() => navigation.navigate("ForgotPassword")}
            style={{ position: "absolute", right: 1 }}
          >
            <Text
              style={{
                color: COLORS.primary,
                fontWeight: "bold",
              }}
            >
              Resend ?
            </Text>
          </Pressable>
        </View>

        <Button
          title="Confirm"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
          onPress={handleLogin}
        />

        {/* Success Modal */}
        <CustomModal
          visible={successModalVisible}
          message="OTP is sent to your email!"
          onClose={handleSuccessModalClose}
        />

        {/* Error Modal */}
        <CustomModal
          visible={errorModalVisible}
          message="Invalid email !"
          onClose={handleErrorModalClose}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22,
          }}
        >
          <Text style={{ fontSize: 16, color: COLORS.black }}>
            Don't have an account ?{" "}
          </Text>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: "bold",
                marginLeft: 6,
              }}
            >
              Register
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
