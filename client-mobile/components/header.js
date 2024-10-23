import { View, Text } from "react-native"
import { useNavigation } from "@react-navigation/native";

export default function Header(){
  const navigation = useNavigation();
    return(
        <View
          style={{
            height:80,
            backgroundColor: "black",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ color: "white", fontSize: 22 }}
            onPress={() => navigation.navigate("news")}
          >
            ⚡️ BNCC ⚡️
          </Text>
          {/* <Button title="ini home tes" onPress={()=> navigation.navigate("home")}/> */}
        </View>
    )
}