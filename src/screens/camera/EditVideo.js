import React, {useRef, useState, useCallback, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView, Alert, Button, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MediaType } from 'expo-media-library';
import styles from '../../styles/editvideostyles';
import { theme } from '../../core/theme';
import { Video } from 'expo-av';
import Slider from "@react-native-community/slider";


export default function EditVideo({navigation, route}) {

  function goBack () {
    navigation.reset({
        index: 0,
        routes: [{ name: 'Record' }],
      })
  }

  const gotoPost = (video) => {
    navigation.navigate("Post", {
        video: video
    });
  }

  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [record, setRecord] = useState(null);
  const [position, setPosition] = useState(0);
  const [data, setData] = useState(null);

  //const { params } = route.params;
  useEffect(() => {
      if (route.params.videoClip) {
        setRecord(route.params.videoClip[0].uri);
        setData(route.params.videoClip[0]);
        //console.log(route.params.videoClip[0].uri);
      }
      else if(route.params.recordClip){
        setRecord(route.params.recordClip.uri);
        setData(route.params.recordClip);
        //console.log(route.params.recordClip.uri);
      }
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.AndroidSafeArea}>
        <View 
         //title={status.isPlaying ? 'Pause' : 'Play'}
        //  onPress={() =>
        //    status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
        //  }
        style={styles.container}>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: record,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
          <View style={styles.row}>
            <View style={styles.buttons}>
              <Button 
              title='Cancel'
                onPress = {
                  () => goBack()
                }
              />
            </View>
            <View style={styles.buttons}>
              <Button 
              title='Create Post'
                onPress = {
                  () => gotoPost(data)
                }
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
