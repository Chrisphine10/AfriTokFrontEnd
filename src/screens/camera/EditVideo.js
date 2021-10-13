import React, {useRef, useState, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView, Alert, Button } from 'react-native';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MediaType } from 'expo-media-library';
import styles from '../../styles/editvideostyles';
import { theme } from '../../core/theme';
import { Video } from 'expo-av';


export default function EditVideo({navigation, route}) {

  function goBack () {
    navigation.reset({
        index: 0,
        routes: [{ name: 'Record' }],
      })
  }
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [record, setRecord] = useState(null);
  //console.log(record);


  //const { params } = route.params;
  useEffect(() => {
      if (route.params.videoClip) {
        setRecord(route.params.videoClip[0].uri);
        console.log(route.params.videoClip[0].uri);
      }
      else if(route.params.recordClip){
        setRecord(route.params.recordClip.uri);
        console.log(route.params.recordClip.uri);
      }
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.AndroidSafeArea}>
        <View style={styles.container}>
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
        <View style={styles.buttons}>
          <Button
            title={status.isPlaying ? 'Pause' : 'Play'}
            onPress={() =>
              status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }
          />
          <Button 
          title='Back'
            onPress = {
              () => goBack()
            }
          />
        </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
