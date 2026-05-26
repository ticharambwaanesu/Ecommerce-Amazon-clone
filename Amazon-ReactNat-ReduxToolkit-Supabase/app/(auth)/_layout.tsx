import Header from "@/components/Shared/header/Header";
import {
  HeaderLeftBack,
  HeaderTitle,
} from "@/components/Shared/header/HeaderTitleBack";
import { router, Stack } from "expo-router";

export default function AuthLayout() {
  const onGoBack = () => router.back();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: (props) => <Header {...props} />,
        animation: "fade",
        headerLeft: () => <HeaderLeftBack onPress={onGoBack} />,
        headerTitle: () => <HeaderTitle />,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
