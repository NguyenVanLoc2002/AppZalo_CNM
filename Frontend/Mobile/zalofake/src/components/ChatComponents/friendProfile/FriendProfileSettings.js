import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Switch } from 'react-native';
const FriendProfileSettings = () => {
    const [isFavorite, setFavorite] = useState(false);
const toggleFavorite = () => setFavorite(previousState => !previousState);

const [isNotification, setNotification] = useState(true);
const toggleNotification = () => setNotification(previousState => !previousState);

const [isBlockJournal, setBlockJournal] = useState(true);
const toggleBlockJournal = () => setBlockJournal(previousState => !previousState);

const [isHideJournal, setHideJournal] = useState(true);
const toggleHideJournal = () => setHideJournal(previousState => !previousState);

    return (
        <View style={{ flex: 1, backgroundColor: '#E5E9EB' }}>
            <View style={{ backgroundColor: 'white' }}>
                <Pressable style={{ height: 50, paddingStart: 22, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18 }}>Thông tin</Text>
                </Pressable>
                <View style={{ height: 1, backgroundColor: 'gray', marginLeft: 20, marginEnd: 10, opacity: 0.2 }} />
                <Pressable style={{ height: 50, paddingStart: 22, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18 }}>Đổi tên gợi nhớ</Text>
                </Pressable>
                <View style={{ height: 1, backgroundColor: 'gray', marginLeft: 20, marginEnd: 10, opacity: 0.2 }} />
                <Pressable style={{ height: 50, paddingStart: 22, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18 }}>Đánh dấu bạn thân</Text>
                        <View style={{ flex: 1 }} />

                        <Switch
                            trackColor={{ false: '#767577', true: '#0091FF' }}
                            thumbColor={isFavorite ? '#0091FF' : '#f4f3f4'}
                            onValueChange={toggleFavorite}
                            value={isFavorite}
                            style={{ marginEnd: 15 }}
                        />
                    </View>
                </Pressable>
                <View style={{ height: 1, backgroundColor: 'gray', marginLeft: 20, marginEnd: 10, opacity: 0.2 }} />
                <Pressable style={{ height: 50, backgroundColor: 'white', paddingStart: 22, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18 }}>Giới thiệu cho bạn bè</Text>
                </Pressable>
            </View>
            <Pressable style={{ height: 80, backgroundColor: 'white', paddingStart: 22, justifyContent: 'center', marginTop: 10 }}>
                <Text style={{ fontWeight: '600', fontSize: 18, color: '#0091FF' }}>Thông báo</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 18 }}>Nhận thông báo về hoạt động của người này</Text>
                    <View style={{ flex: 1 }} />

                    <Switch
                        trackColor={{ false: '#767577', true: '#0091FF' }}
                        thumbColor={isNotification ? '#0091FF' : '#f4f3f4'}
                        onValueChange={toggleNotification}
                        value={isNotification}
                        style={{ marginEnd: 15 }}
                    />
                </View>
            </Pressable>
            <View style={{ height: 130, backgroundColor: 'white', paddingStart: 22, marginTop: 10, justifyContent: 'center' }}>
                <Text style={{ fontWeight: '600', fontSize: 18, color: '#0091FF' }}>Cài đặt riêng tư</Text>
                <Pressable style={{ height: 50, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18 }}>Chặn xem nhật ký của tôi</Text>
                        <View style={{ flex: 1 }} />
                        <Switch
                            trackColor={{ false: '#767577', true: '#0091FF' }}
                            thumbColor={isBlockJournal ? '#0091FF' : '#f4f3f4'}
                            onValueChange={toggleBlockJournal}
                            value={isBlockJournal}
                            style={{ marginEnd: 15 }}
                        />
                    </View>
                </Pressable>
                <View style={{ height: 1, backgroundColor: 'gray', paddingStart: 20, marginEnd: 10, opacity: 0.2 }} />
                <Pressable style={{ height: 50, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18 }}>Ẩn nhật ký của người này</Text>
                        <View style={{ flex: 1 }} />
                        <Switch
                            trackColor={{ false: '#767577', true: '#0091FF' }}
                            thumbColor={isHideJournal ? '#0091FF' : '#f4f3f4'}
                            onValueChange={toggleHideJournal}
                            value={isHideJournal}
                            style={{ marginEnd: 15 }}
                        />
                    </View>
                </Pressable>
            </View>
            <View style={{ height: 1, marginLeft: 20, marginRight: 10, opacity: 0.2 }} />
            <View style={{ flex: 1, backgroundColor: 'white', marginTop:10}}>
                <Pressable style={{ height: 50, paddingStart: 22, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18 }}>Báo xấu</Text>
                </Pressable>
                <View style={{ height: 1, backgroundColor: 'gray', marginLeft: 20, marginEnd: 10, opacity: 0.2 }} />
                <Pressable style={{ height: 50, paddingStart: 22, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, color:'red' }}>Xóa bạn</Text>
                </Pressable>
                <View style={{ height: 1, backgroundColor: 'gray', marginLeft: 20, marginEnd: 10, opacity: 0.2 }} />
            </View>
        </View>
    )
}

export default FriendProfileSettings