import React from 'react';
import { Text, View, Image } from 'react-native';

const ChatItem = ({ item }) => {
  
  return (
    <View style={{ flexDirection: 'row',alignItems: 'center',paddingHorizontal:20, paddingVertical:10, backgroundColor:'white'}}>
      <Image source={{ uri: item.url }} style={{ width: 55, height: 55, borderRadius: 25 }} />
      <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', paddingStart: 10, justifyContent: 'space-between', marginBottom: 10 }}>
            <Text style={{ fontSize: 20 }}>{item.ten}</Text>
            <Text>{item.thoiGian} phút</Text>
          </View>
          <View style={{ flexDirection: 'row', paddingStart: 10, justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, opacity: 0.5, overflow : 'hidden', width: '300px'}} numberOfLines={1}>{item.tinNhan}</Text>
            <Text style={{ backgroundColor: 'red', width: 20, height: 20, textAlign: 'center', borderRadius: 25 }}>{item.soTNChuaDoc}</Text>
          </View>
        </View>
    </View>
  );
};

export default ChatItem;
