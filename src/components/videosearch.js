import React from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import { Image, TouchableWithoutFeedback, Dimensions } from "react-native";

const VideoSearch = (props) => {
    return(
        <MasonryList
            data={props.data}
            keyExtractor={(item, index) => item.id.toString() }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={ {
                margin: 0,
                backgroundColor: '#fff',
            }}
            renderItem={ ({item})  => (
                <TouchableWithoutFeedback key={item.id}>
                    <Image
                        source={{uri: item.screenshot}}
                        lazy
                        style={{
                            margin: 1,
                            width: Dimensions.get('window').width/3.05, 
                            height: Dimensions.get('window').width * 0.65,
                            borderRadius: 5,
                            resizeMode: 'cover',

                        }}
                        />
                </TouchableWithoutFeedback >
            )}
            numColumns={3}
        />
    )
}

export default VideoSearch;