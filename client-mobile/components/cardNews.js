import { useEffect, useState } from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import { GET_NEWS } from "../config/newsQuery";
import { useQuery } from "@apollo/client";

export default function CardNews({ news }) {
  // console.log(news, "di card");

  const navigation = useNavigation();
  var relativeTime = require("dayjs/plugin/relativeTime");

  const displayDate = (date) => {
    dayjs.extend(relativeTime);
    let diff = dayjs().diff(dayjs(date), "days");
    if (diff > 3) {
      return dayjs(news.createdAt).format("MMM, DD YYYY");
    } else {
      return dayjs(news.createdAt).fromNow();
    }
  };
  return (
    <Card mode="outlined" theme={{ colors: { surface: "#e9ecef" } }}>
      <Card.Title
        titleStyle={{ fontWeight: "bold" }}
        title={news.title}
        subtitle={displayDate(news.createdAt)}
      />

      <Card.Cover source={{ uri: news.imgUrl }} />
      <Card.Content>
        <Text variant="bodyMedium" numberOfLines={3} ellipsizeMode="tail">
          {news.content}
        </Text>
      </Card.Content>
      <Button
        mode="contained"
        disabled
        style={{ width: 125, marginTop: 10, height:40, justifyContent: "space-between", alignSelf:"auto", marginLeft:5, borderRadius:5 }}
      >
      <Fontisto name="hashtag" size={12} color="black"/>
      <Text style={{color:"black"}}>
      {news.Category.name}
      </Text>
      </Button>
      <Card.Actions>
        <Button
          style={{ backgroundColor: "black", borderColor: "white" }}
          textColor="white"
          onPress={() => navigation.navigate(`detail`, {id: news.id})}
        >
          Detail
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  forCategory: {
    flexDirection: "row",
    gap: 4,
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "white",
    color: "white",
    textAlign: "left",
  },
});
