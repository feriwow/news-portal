import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import FlashNews from "./screens/FlashNews";
import { PaperProvider } from "react-native-paper";
import DetailNews from "./screens/DetailNews";
import Header from "./components/header";
import { ApolloProvider } from "@apollo/client";
import client from "./config/index";

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <NavigationContainer>
          <stack.Navigator
            initialRouteName="news"
            screenOptions={{ header: () => <Header></Header> }}
          >
            <stack.Screen name="home" component={Home} />
            <stack.Screen name="news" options={{}} component={FlashNews} />
            <stack.Screen name="detail" component={DetailNews} />
          </stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
