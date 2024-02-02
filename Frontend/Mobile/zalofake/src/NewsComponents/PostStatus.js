import { View, Text, Switch, Pressable, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5';

const PostStatus = ({ navigation }) => {

    navigation.setOptions({
        headerRight: () => (
            <View className={"flex-row items-center"}>
                <Switch
                    className={"mx-4"}
                    trackColor={{ false: '#0eaaff', true: '#81b0ff' }}
                    thumbColor={'white'}
                    ios_backgroundColor="#3e3e3e"
                // onValueChange={toggleSwitch}
                // value={isEnabled}
                />
                <Pressable>
                    <Text className={"text-gray-400 text-lg font-semibold mr-2"}>Đăng</Text>
                </Pressable>
            </View>
        ),
        headerTitle: () => (
            <View style={{ alignItems: "center" }}>
                <View className={"flex-row items-center"}>
                    <Ionicons name="people" size={22} color="#828282" className={"px-1"} />
                    <Text className={"text-xl font-bold px-1"}>Tất cả bạn bè</Text>
                    <Pressable className={"pb-2 px-1"}>
                        <FontAwesomeIcons name="sort-down" size={22} color="black" className={"px-1 bg-yellow-400"} />
                    </Pressable>
                </View>
                <Text className={"text-gray-400 font-medium text-xs"}>Xem bởi bạn bè trên Zalo</Text>
            </View>
        ),
        headerStyle: {
            backgroundColor: "white",
            shadowColor: "#fff",
        },
        headerTintColor: "black",
        headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
        },
    });
    return (
        <View className={"bg-white h-full"}>
            {/* BODY */}

            {/* Nhập status */}
            <View className={"h-1/2 p-4"}>
                <Text className={"text-gray-400 text-lg"}>Bạn đang nghĩ gì?</Text>
            </View>

            {/* Các button: Nhạc, Album, Tag */}
            <View className={"flex-row px-6"}>
                <Pressable className={"mx-1 flex-row border border-gray-400 h-9 rounded-lg w-24 justify-evenly items-center"}>
                    <FontAwesomeIcons name="music" size={18} color="black" />
                    <Text className={"font-semibold"}>Nhạc</Text>
                </Pressable>

                <Pressable className={"mx-1 flex-row border border-gray-400 h-9 rounded-lg w-24 justify-evenly items-center"}>
                    <Ionicons name="albums" size={18} color="black" />
                    <Text className={"font-semibold"}>Album</Text>
                </Pressable>

                <Pressable className={"mx-1 flex-row border border-gray-400 h-9 rounded-lg w-28 justify-evenly items-center"}>
                    <FontAwesomeIcons name="tag" size={18} color="black" />
                    <Text className={"font-semibold"}>Với bạn bè</Text>
                </Pressable>
            </View>

            {/* View chọn ảnh trong albums */}
            <View className={"py-2"}>
                {/* View icon */}
                <View className={"flex-row px-4"}>
                    <View className={"w-3/5"}>
                        <Pressable className={""}>
                            <Image source={require("/assets/face-laugh.png")} className={"w-8 h-8"} resizeMode='contain' ></Image>
                        </Pressable>
                    </View>

                    <View className={"w-2/4 flex-row justify-evenly px-2"}>
                        <Pressable>
                            <FontAwesomeIcons name="image" size={28} color="#1294fd" />
                        </Pressable>

                        <Pressable>
                            <FontAwesomeIcons name="video" size={28} color="#9C9C9C" />
                        </Pressable>

                        <Pressable>
                            <Ionicons name="location" size={28} color="#9C9C9C" />
                        </Pressable>
                    </View>
                </View>

                {/* View image */}
                <View className={"grid grid-cols-3 gap-4"}>
                    <Pressable>
                        <Image source={require("/assets/story_1.png")} className={"w-28 h-28"} resizeMode='contain'></Image>
                    </Pressable>
                    <Pressable>
                        <Image source={require("/assets/story_1.png")} className={"w-28 h-28"} resizeMode='contain'></Image>
                    </Pressable>
                    <Pressable>
                        <Image source={require("/assets/story_1.png")} className={"w-28 h-28"} resizeMode='contain'></Image>
                    </Pressable>
                    <Pressable>
                        <Image source={require("/assets/story_1.png")} className={"w-28 h-28"} resizeMode='contain'></Image>
                    </Pressable>
                    <Pressable>
                        <Image source={require("/assets/story_1.png")} className={"w-28 h-28"} resizeMode='contain'></Image>
                    </Pressable>
                    <Pressable>
                        <Image source={require("/assets/story_1.png")} className={"w-28 h-28"} resizeMode='contain'></Image>
                    </Pressable>
                    <Pressable>
                        <Image source={require("/assets/story_1.png")} className={"w-28 h-28"} resizeMode='contain'></Image>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default PostStatus