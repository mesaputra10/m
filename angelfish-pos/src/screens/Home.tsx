import * as React from "react";
import {StyleSheet, View} from "react-native";

const data = Array.from(new Array(3)).map((_val, i) => ({
  icon:
    "https://ae01.alicdn.com/kf/HTB1JG5HntnJ8KJjSszdq6yxuFXao/MIFA-Black-Graffiti-Bluetooth-Speaker-IPX5-Waterproof-Bluetooth-4-2-Wireless-Speaker-Micro-SD-Built-in.jpg",
  text: `name${i}`
}));

export default class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <View>
        {/*<Grid data={data} square={false} columnNum={3} />*/}
        {/*<Card>*/}
          {/*<Card.Header title="This is title" />*/}
          {/*<Card.Body />*/}
        {/*</Card>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
        flexDirection:'row'
    },
    quarterPart:{
        flex:.35
    }
});
