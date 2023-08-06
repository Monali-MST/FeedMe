import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

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

    // Create an instance of the mock adapter
    const mock = new MockAdapter(axios);

    // Mock the signup API call with success response
    mock.onPost("/api/forgotpassword").reply(200, {
      message: "OTP is sent",
    });

    // Call the signup API
    axios
      .post("/api/forgotpassword", { email })
      .then((response) => {
        // Handle success response
        console.log(response.data.message);
        Alert.alert("OTP send", "The one-time password (OTP) has been sent successfully.!");
        navigation.navigate("OTPVerification");
      })
      .catch((error) => {
        // Handle error response
        console.log(error.message);
        Alert.alert("OTP Failed", "An error occurred while sending the OTP.");
      });
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

        <Button
          title="Confirm"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
          onPress={handleLogin}
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
