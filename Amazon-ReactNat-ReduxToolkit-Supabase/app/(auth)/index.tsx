import DefaultButton from "@/components/Shared/DefaultButton";
import { setSession } from "@/store/slices/authSlice";
import { supabase } from "@/supabase";
import { AmazonEmber, AmazonEmberLight } from "@/utils/Constant";
import { Checkbox } from "expo-checkbox";
import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, Pressable, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";

enum Step {
  "EMAIL" = 1,
  "PASSWORD" = 2,
}
export default function SignIn() {
  const dispatch = useDispatch();
  const [step, setStep] = useState(Step.EMAIL);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  async function login() {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.signInWithPassword({ email, password });
      dispatch(setSession(session));
      router.replace("/(tabs)");
    } catch (error) {
      console.log(error);
    }
  }
  const register = () => router.push("/(auth)/signup");
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        padding: 20,
        gap: 20,
        backgroundColor: "white",
      }}
    >
      <Text
        style={{
          alignSelf: "flex-start",
          fontSize: 20,
          fontWeight: "bold",
          fontFamily: AmazonEmber,
        }}
      >
        Sign in {step === Step.EMAIL && "or Create an account"}
      </Text>
      <View
        style={{
          width: "100%",
          gap: 15,
        }}
      >
        {step === Step.EMAIL ? (
          <Text
            style={{
              alignSelf: "flex-start",
              fontSize: 16,
              fontWeight: "bold",
              fontFamily: AmazonEmber,
            }}
          >
            Enter Email
          </Text>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              gap: 10,
            }}
          >
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 16,
                fontWeight: "bold",
                fontFamily: AmazonEmber,
              }}
            >
              {email}
            </Text>
            <Pressable onPress={() => setStep(Step.EMAIL)}>
              <Text
                style={{
                  textDecorationLine: "underline",
                  color: "#f1b101ff",
                }}
              >
                Change
              </Text>
            </Pressable>
          </View>
        )}
        {step === Step.EMAIL ? (
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={{
              borderWidth: 1,
              borderRadius: 4,
              borderColor: "#ccc",
              padding: 10,
              fontFamily: AmazonEmber,
            }}
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
          />
        ) : (
          <>
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={{
                borderWidth: 1,
                borderRadius: 4,
                borderColor: "#ccc",
                padding: 10,
              }}
              placeholder="Password"
              secureTextEntry={!showPassword}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Checkbox
                value={showPassword}
                onValueChange={setShowPassword}
                style={{
                  margin: 8,
                }}
                color={showPassword ? "#f1b023ff" : undefined}
              />
              <Text>Show Password</Text>
            </View>
          </>
        )}
      </View>
      <DefaultButton
        style={[{ width: "100%" }, email.length < 5 && { opacity: 0.5 }]}
        onPress={() => {
          if (step === Step.EMAIL) setStep(Step.PASSWORD);
          else login();
        }}
        disabled={email.length < 5}
      >
        {step === Step.EMAIL ? "Continue" : "Sign In"}
      </DefaultButton>
      <Pressable onPress={register}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "800",
            fontFamily: AmazonEmber,
          }}
        >
          Don&apos;t have an account?{" "}
          <Text style={{ color: "#f1b023ff" }}>Sign up</Text>
        </Text>
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontFamily: AmazonEmber }}>
          By continuing, you agree to Amazon&apos;s{" "}
        </Text>
        <Text
          style={{
            textDecorationLine: "underline",
            color: "#146eb4",
            fontFamily: AmazonEmberLight,
          }}
        >
          Conditions
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          height: 3,
          backgroundColor: "lightgray",
          width: Dimensions.get("window").width,
        }}
      />
      <View style={{ gap: 20 }}>
        <View style={{ flexDirection: "row", gap: 20 }}>
          {["Conditions of use", "Privacy Notice", "Help"].map((link) => (
            <Text
              key={link}
              style={{
                fontSize: 16,
                textDecorationLine: "underline",
                color: "#146eb4",
                fontFamily: AmazonEmberLight,
              }}
            >
              {link}
            </Text>
          ))}
        </View>
        <Text
          style={{
            color: "gray",
            fontSize: 14,
            fontFamily: AmazonEmberLight,
          }}
        >
          © 1996-2025, Amazon.in, Inc. or its affiliates
        </Text>
      </View>
    </View>
  );
}
