import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ButtonCategory({item}){
 return (
    <Button
            mode="outlined"
            dark="true"
            textColor="gray"
            style={{ width: 100, marginTop: 10, height:40, justifyContent: "space-between", alignSelf:"auto", marginLeft:5}}
            labelStyle={{ fontSize: 10 }}
            onPress={() => console.log(item)}
            buttonColor="white"
          >
            {item.name}
          </Button>
 )   
}