import React from 'react';
import {
   View,
   FlatList,
   Image,
   Text,
   TouchableOpacity,
   StyleSheet,
   TextInput,
   Dimensions,
   KeyboardAvoidingView,
 } from 'react-native';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');
var data = [];
const conversation = [
  {
    sent: true,
    msg: 'all cool!',
  },
  {
    sent: false,
    msg: 'Hey wassup?',
  },
];

const EachMsg = (props) => {
  if (props.sent === false) {
    return (
      <View style={styles.eachMsg}>
        <Image source={{ uri: props.image }}style={styles.userPic} />
        <View style={styles.msgBlock}>
          <Text style={styles.msgTxt}>{props.msg}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.rightMsg} >
      <View style={styles.rightBlock} >
        <Text style={styles.rightTxt}>{props.msg}</Text>
      </View>
      <Image source={{ uri: 'https://i.imgur.com/XzcwQxq.jpg' }} />
    </View>
  );
};

class ChatView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msgs: [],
      msg: '',
    };
    this.send = this.send.bind(this);
    this.reply = this.reply.bind(this);
  }

  reply() {
    conversation.unshift({
      sent: false,
      msg: 'React Native is Awesome!',
    });
    this.setState({
      msgs: [],
    });
  }

  send() {
    if (this.state.msg.length > 0) {
      conversation.unshift({
        sent: true,
        msg: this.state.msg,
      });
      this.setState({
        msgs: [],
        msg: '',
      });
      setTimeout(() => {
        this.reply();
      }, 2000);
    }
  }


  render() {
    return (
      <View style={styles.image}>
          <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>
            <FlatList
              enableEmptySections
              noScroll
              renderScrollComponent={props =>
                <InvertibleScrollView {...props} inverted />}
              data={this.state.data}
              contentContainerStyle={{ justifyContent: 'flex-end' }}
              renderRow={rowData => <EachMsg {...rowData} image={this.props.image} />}
            />
            <View style={styles.input}>
                <TextInput
                  style={{ flex: 1 }}
                  value={this.state.msg}
                  onChangeText={msg => this.setState({ msg })}
                  blurOnSubmit={false}
                  onSubmitEditing={() => this.send()}
                  placeholder="Type a message"
                  returnKeyType="send"
                />
            </View>
          </KeyboardAvoidingView>
      </View>
    );
  }
}

export default ChatView;

const styles = StyleSheet.create({
  keyboard: {
    //flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  chatImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  input: {
    padding: 10,
    height: 40,
    width: width - 20,
    backgroundColor: '#fff',
    margin: 10,
    marginTop: 750,
    zIndex: 1,
    borderRadius: 5,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  eachMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
  },
  rightMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    alignSelf: 'flex-end',
  },
  userPic: {
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  msgBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  rightBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: '#97c163',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  msgTxt: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
  },
  rightTxt: {
    fontSize: 15,
    color: '#202020',
    fontWeight: '600',
  },
});
