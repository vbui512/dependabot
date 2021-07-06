import React, { useContext } from "react";
import { Provider } from "react-native-paper";
import theme from "../../util/theme.styles";
import { screensForUser, stackParamList, StackScreenName } from "../../util/screens";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

interface HomeScreenProps {
    navigation: StackNavigationProp<stackParamList, StackScreenName.HOME>;
}

const HomeScreen = (props: HomeScreenProps) => {
    const Tab = createMaterialBottomTabNavigator();
    const { authState } = useContext(AuthContext);
    const authContext = useContext(AuthContext);

    React.useEffect(
        () =>
            props.navigation.addListener("beforeRemove", (e) => {
                e.preventDefault();
                Alert.alert("Alert", "Do you want to logout?", [
                    { text: "Don't Logout", style: "cancel", onPress: () => {} },
                    {
                        text: "Logout",
                        style: "destructive",
                        onPress: () => {
                            props.navigation.dispatch(e.data.action);
                            //authContext.logout();
                        },
                    },
                ]);
            }),
        [props.navigation]
    );

    return (
        <Provider theme={theme}>
            <Tab.Navigator>
                {screensForUser(
                    authState.state === "loggedIn" || authState.state === "previouslyLoggedIn"
                        ? authState.currentUser
                        : undefined
                ).map((screen) => (
                    <Tab.Screen
                        key={screen.name}
                        name={screen.name}
                        component={screen.Component}
                        options={{ tabBarIcon: screen.iconName }}
                    />
                ))}
            </Tab.Navigator>
        </Provider>
    );
};

export default HomeScreen;
