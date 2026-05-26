import Header from "@/components/Shared/header/Header";
import {
  HeaderLeftBack,
  HeaderTitle,
} from "@/components/Shared/header/HeaderTitleBack";
import { RootState } from "@/store";
import { AmazonEmberBold } from "@/utils/Constant";
import { Entypo } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

interface Tab {
  name: string;
  icon: "add-to-list" | "archive";
}

export default function TabLayout() {
  const onGoBack = () => router.back();
  const unshippedCount = useSelector(
    (state: RootState) => state.shippedCount.shippedCount
  );
  const tabs: Tab[] = [
    {
      name: "seller_page",
      icon: "add-to-list",
    },
    {
      name: "product_ordered",
      icon: "archive",
    },
  ];
  return (
    <Tabs>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarStyle: {
              borderTopWidth: 1,
              borderTopColor: "lightgray",
            },
            header: (props) => <Header {...props} />,
            headerLeft: () => <HeaderLeftBack onPress={onGoBack} />,
            headerTitle: () => <HeaderTitle />,
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  flex: 1,
                  marginTop: -5,
                  gap: 10,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: 50,
                    height: 4,
                    borderRadius: 20,
                    backgroundColor: focused ? "#238db0" : "transparent",
                  }}
                />
                <Entypo
                  name={tab.icon}
                  size={30}
                  color={focused ? "#238db0" : "#959493ff"}
                />
                {tab.name === "product_ordered" && (
                  <Text
                    style={{
                      paddingHorizontal: 4,
                      borderRadius: 10,
                      position: "absolute",
                      top: 8,
                      backgroundColor:
                        unshippedCount === 0 ? "transparent" : "#de1b1bff",
                      fontFamily: AmazonEmberBold,
                      fontSize: 12,
                      color: unshippedCount === 0 ? "transparent" : "white",
                    }}
                  >
                    {unshippedCount}
                  </Text>
                )}
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
