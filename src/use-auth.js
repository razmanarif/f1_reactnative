import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const AuthContext = React.createContext(undefined);
export function useAuth() {
  const useAuthContext = React.useContext(AuthContext);
  if (!useAuthContext) {
    throw new Error("Not in provider");
  }
  return useAuthContext;
}

export function AuthProvider(props) {
  const [isAuth, setIsAuth] = React.useState(false);

  function logout () {
    console.log("Logged out")
    setIsAuth(false)

}
  async function login(username, password) {
    try {
        console.log("login: ", { username, password })
    //   const response = await axios.post("http://172.21.49.49:3002/user/login", {
     const response = await axios.post("https://b2b0-202-184-110-126.ngrok.io/user/login", {
        username: username,
        password: password
      });

      console.log(username, password);
      console.log(response.data)

      const { token, user } = response.data;
      setIsAuth(true);
    } catch (error) {
      // Handle login error
      console.error(error);
      Alert.alert(
        "Login failed",
        "Please check your credentials and try again."
      );
    }


  }
  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
