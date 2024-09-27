import { createStackNavigator } from "@react-navigation/stack";
import SCREENS from "../screens";
import Onboarding from "../screens/intro/Onbording";
import LoginScreen from "../screens/auth/LoginScreen";

const Stack = createStackNavigator();

const StackNavigation = () =>{
    return <Stack.Navigator initialRouteName={SCREENS.intro}>
        <Stack.Screen name={SCREENS.intro} component={Onboarding} options={{headerShown:false}}/>
        <Stack.Screen name={SCREENS.login} component={LoginScreen} options={{headerShown:false}}/>

    </Stack.Navigator>
}

export default StackNavigation;