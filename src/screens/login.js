import React from "react";
import { Text, View, TextInput, Button, Alertm, StyleSheet} from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../use-auth";
import { useNavigation } from "@react-navigation/native";



export default function Login() {
  const navigation = useNavigation();
  const authHook = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ username, password }) => {
    console.log({ username, password })
    // try {
      await authHook.login(username, password);
    //   navigation.navigate("CurrentStandings");
    // } catch (e) {
    //   // Handle login error
    //   console.error(error);
    //   Alert.alert(
    //     "Login failed",
    //     "Please check your credentials and try again."
    //   );
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>Please Log In to Continue</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="username"
      />
      {errors.username && <Text style={styles.error}>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            secureTextEntry
          />
        )}
        name="password"
      />
      {errors.password && <Text style={styles.error}>This is required.</Text>}

      <Button title="Log In" onPress={handleSubmit(onSubmit)} />

      <Text style={{color: 'blue', marginTop: 15}}
      onPress={() => navigation.navigate('Register')}>
      Don't have an account? Register here.
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  topText:{
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
  }
});
