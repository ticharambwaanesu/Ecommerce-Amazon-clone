import store, { persistor } from "@/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";

import { setSession } from "@/store/slices/authSlice";
import { supabase } from "@/supabase";
import { ActivityIndicator, AppState, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistGate } from "redux-persist/integration/react";
SplashScreen.preventAutoHideAsync();

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

function Layout() {
  const dispatch = useDispatch();
  const [loaded, error] = useFonts({
    "Amazon-Ember": require("@/assets/fonts/Amazon-Ember.ttf"),
    "Amazon-Ember-Bold": require("@/assets/fonts/Amazon-Ember-Bold.ttf"),
    "Amazon-Ember-Light": require("@/assets/fonts/Amazon-Ember-Light.ttf"),
  });
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session));
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, seesion) => {
      dispatch(setSession(seesion));
    });
    return () => {
      subscription?.unsubscribe();
    };
  }, [dispatch]);
  useEffect(() => {
    if (loaded || error) {
      setTimeout(() => SplashScreen.hideAsync(), 1000);
    }
  }, [error, loaded]);
  if (!loaded && !error) {
    return null;
  }
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <PersistGate
          loading={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size={"large"} />
            </View>
          }
          persistor={persistor}
        >
          <Layout />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
