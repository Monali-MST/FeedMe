import {
  View,
  Text,
  Pressable,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import Button from "../components/Button";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const OTPVerification = ({ navigation }) => {
  const [otp, setOtp] = useState("");
  const inputRefs = useRef([]);

  const handleOtpChange = (index, text) => {
    // Limit the OTP input to a specific length (5 digits)
    if (/^\d{0,5}$/.test(text)) {
      setOtp((prevOtp) => {
        const newOtp = prevOtp.split("");
        newOtp[index] = text;
        return newOtp.join("");
      });

      if (text.length === 1 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === "Backspace" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOTP = () => {
    if (!otp || otp.length !== 5) {
      return;
    }

    console.log("OTP:", otp);
    
    // Create an instance of the mock adapter
    const mock = new MockAdapter(axios);

    // Mock the signup API call with success response
    mock.onPost("/api/verifyotp").reply(200, {
      message: "OTP is correct",
    });

    // Call the signup API
    axios
      .post("/api/verifyotp", { otp })
      .then((response) => {
        // Handle success response
        console.log(response.data.message);
        Alert.alert("Verify OTP", "OTP verification successful!");
        navigation.navigate("OTPVerification");
      })
      .catch((error) => {
        // Handle error response
        console.log(error.message);
        Alert.alert("OTP Failed", "Incorrect OTP. Please try again.");
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
            Verification
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
            }}
          >
            Please enter the verification code that was just sent to your email
            address.
          </Text>
        </View>

        <View style={{ marginBottom: 1 }}>
          <View style={styles.otpContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
              <TextInput
                key={index}
                style={[styles.input, otp[index] ? styles.filledInput : null]}
                onChangeText={(text) => handleOtpChange(index, text)}
                value={otp[index] || ""}
                keyboardType="numeric"
                maxLength={1}
                ref={(ref) => (inputRefs.current[index] = ref)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(index, nativeEvent.key)
                }
              />
            ))}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 8,
            width: "100%",
          }}
        >
          <Pressable
            onPress={() => console.log("Resent OTP")}
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
          title="Verify"
          filled
          style={{
            marginTop: 20,
            marginBottom: 4,
          }}
          onPress={handleVerifyOTP}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    fontSize: 24,
    width: 50,
    height: 50,
    textAlign: "center",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  filledInput: {
    borderColor: COLORS.primary,
  },
});

export default OTPVerification;
