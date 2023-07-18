import { View, Text, StyleSheet, ScrollView, Share, Image } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import AntDesign from '@expo/vector-icons/AntDesign';
import {Dimensions} from 'react-native';
import { useQuery } from "@apollo/client";
import { ONE_NEWS } from "../config/newsQuery";
import { ActivityIndicator } from "react-native-paper";
const DEVICE_WIDTH = Dimensions.get('window').width

export default function DetailNews({route}) {
  const {loading, error, data} = useQuery(ONE_NEWS, {
    variables: {postId : +route.params.id}
  })

 
  // console.log(data.post.Tags);
  // return null
  // console.log(route.params, "route params");
//  return null
  if(loading) return <ActivityIndicator/>
  if (error) {
    return <Text>error....</Text>
  }

  // console.log(route);
  return (
    <>
      <View style={styles.container}>
        <ScrollView bounces={false} style={{paddingLeft:10, paddingRight:10 }}>
        <Text style={styles.newsTitle}> {data.post.title} </Text>
          <Image
            source={{
              uri: data.post.imgUrl,
            }}
            style={styles.imageStyle}
            contentFit="cover"
          />
          <Text>posted by {data.post.User.email}</Text>
          <Text>{data.post.createdAt}</Text>
          <Text style={styles.forCategory}>
          <AntDesign name="tags" size={20} color="white" />
            {data.post.Category.name} </Text>
          {data.post.Tags.map((el, index)=>{
            return (
              <Text key={index} style={{fontWeight: 900}}> #{el.name}</Text>
            )
          })}
          <Text style={{textAlign : "justify"}}>
            {data.post.content}
          </Text>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop:5
  },
  imageStyle: {
    height: 220,
    width: DEVICE_WIDTH,
    alignSelf: "center",
  },
  newsTitle: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "black",
    marginHorizontal: 20,
    marginVertical: 14,
  },
  forCreator: {
    fontSize: 12,
    fontFamily: "sans-serif-condensed",
    color: "black",
    marginHorizontal: 20,
  },
  forCategory:{
    flexDirection: "row",
    gap: 4,
    marginRight: 220,
    marginVertical: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#6c757d",
    color: "white",
    textAlign:"left"

  }


});
