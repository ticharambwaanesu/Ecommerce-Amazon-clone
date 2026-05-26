import Header from "@/components/Shared/header/Header";
import {
  HeaderLeftBack,
  HeaderTitle,
} from "@/components/Shared/header/HeaderTitleBack";
import { router, Stack } from "expo-router";

export default function Layout() {
  const onGoBack = () => router.back();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="location"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          headerLeft: () => <HeaderLeftBack onPress={onGoBack} />,
          headerTitle: () => <HeaderTitle />,
        }}
      />
      <Stack.Screen
        name="my_order"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          headerLeft: () => <HeaderLeftBack onPress={onGoBack} />,
          headerTitle: () => <HeaderTitle />,
        }}
      />
      <Stack.Screen
        name="buy_here"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          headerLeft: () => <HeaderLeftBack onPress={onGoBack} />,
          headerTitle: () => <HeaderTitle />,
        }}
      />
    </Stack>
  );
}
