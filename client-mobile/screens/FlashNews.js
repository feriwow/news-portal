import { StyleSheet, Text, View, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { useState, useEffect } from "react";
import ButtonCategory from "../components/button";
import CardNews from "../components/cardNews";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@apollo/client";
import { GET_NEWS } from "../config/newsQuery";
import { GET_CATEGORY } from "../config/categoryQuery";
import { ActivityIndicator } from "react-native";

export default function FlashNews({ navigation }) {
  const {loading, error, data} = useQuery(GET_NEWS)
  const {loading : loadingCategory, error: errorCategory, data: dataCategory} = useQuery(GET_CATEGORY)
  // const [input, setInput] = useState();
  // const [news, setNews] = useState();

  // console.log(data.posts, " ini useQuery news");
  // console.log(Object.keys(dataCategory), "ini useQuery category");

  if (loading) {
    return <ActivityIndicator/>
  }

  if (error) {
    return <Text>this is error</Text>
  }

 /*  const getCategory = async () => {
    try {
      const response = await fetch(
        "https://news-portal.fernandarw.xyz/user/category",
        {
          method: "get",
        }
      );
      const toJson = await response.json();
      setInput(toJson);
    } catch (err) {
      console.log(err);
    }
  }; */

/*   const getNews = async () => {
    try {
      const response = await fetch("https://news-portal.fernandarw.xyz/user", {
        method: "get",
      });
      const toJson = await response.json();
      setNews(toJson);
    } catch (err) {
      console.log(err);
    }
  }; */

  /* useEffect(() => {
    getCategory();
    getNews();
  }, []); */

  return (
    // <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[
          styles.container,
          {
            flexDirection: "column",
            backgroundColor: "#e9ecef",
          },
        ]}
      >

        <View style={{ flex: 1, backgroundColor: "white" }}>
          {dataCategory.categories && (
            <ScrollView
              style={{ flexDirection: "row", backgroundColor: "#e9ecef" }}
              horizontal={true}
            >
              {dataCategory.categories.map((el, index) => {
                return <ButtonCategory key={index} item={el} />;
              })}
            </ScrollView>
          )}
        </View>

        <View style={{ flex: 10 }}>
          <FlatList
            ListHeaderComponent={
              <>
                <Text
                  style={{
                    fontSize: 30,
                    textAlign: "center",
                    fontFamily: "serif",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  Latest News
                </Text>
              </>
            }
            data={data.posts}
            renderItem={({ item }) => <CardNews news={item} />}
          />
        </View>
      </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
