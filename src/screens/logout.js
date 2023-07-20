import { useEffect } from "react";
import { View, Text } from "react-native";
import { useAuth } from "../use-auth";

export default function Logout () {
    const authHook = useAuth();

    useEffect(()=>{
        authHook.logout()
    }, [])

    return <View>
        <Text>Log out screen</Text>
    </View>
}