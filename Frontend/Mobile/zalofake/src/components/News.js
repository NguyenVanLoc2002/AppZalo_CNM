import { View, Text, Image, ImageBackground, ScrollView, Pressable } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5';
import ChatComponent from './ChatComponent'

const News = ({ navigation }) => {

  navigation.setOptions({
    headerRight: () => (
      <View style={{ flexDirection: "row" }}>
        <Pressable>
          <Ionicons name="image" size={24} color="white"
            style={{ padding: 5, paddingStart: 15 }} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Notice")}>
          <FontAwesomeIcons name="bell" size={24} color="white" style={{ padding: 5 }} />
        </Pressable>
      </View>
    ),
    headerTitle: () => (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="search" size={24} color="white"
          style={{ position: "absolute", marginLeft: 10 }} />
        <Text className={"text-[#71b9fe] text-xl font-semibold ml-12"}>Tìm kiếm</Text>
      </View>
    ),
    headerStyle: {
      backgroundColor: "#0091FF",
      shadowColor: "#fff",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 20,
    },
  });

  return (
    <View>

      {/* Đăng status */}
      <View className={"flex-row bg-white p-2 items-center"}>
        <View className={"w-1/5"}>
          <Image source={require('/assets/avata-story-3.png')} className={"w-16 h-16"}></Image>
        </View>
        <Pressable className={"w-4/5"} onPress={() => { navigation.navigate("PostStatus") }}>
          <Text className={"text-[#545454] text-lg"}>Hôm nay bạn thế nào?</Text>
        </Pressable>
      </View>

      {/* Button: ảnh, video, albul, kỉ niệm */}
      <View className={"flex-row bg-white w-full px-3.5 py-2 justify-between"}>
        <Pressable className={"flex-row items-center bg-[#D9D9D9] rounded-xl w-1/5 justify-evenly"}>
          <Ionicons name="image" size={30} color="#56ce83" />
          <Text className={"font-semibold"}>Ảnh</Text>
        </Pressable>
        <Pressable className={"flex-row items-center bg-[#D9D9D9] rounded-xl w-1/5 justify-evenly"}>
          <Ionicons name="videocam" size={30} color="#df34be" />
          <Text className={"font-semibold"}>Video</Text>
        </Pressable>
        <Pressable className={"flex-row items-center bg-[#D9D9D9] rounded-xl w-1/5 justify-evenly"}>
          <Ionicons name="albums" size={30} color="#0a6bf4" />
          <Text className={"font-semibold"}>Album</Text>
        </Pressable>
        <Pressable className={"flex-row items-center bg-[#D9D9D9] rounded-xl w-1/4 justify-evenly"}>
          <FontAwesomeIcons name="clock" size={30} color="#e67627" />
          <Text className={"font-semibold"}>Kỷ niệm</Text>
        </Pressable>
      </View>

      {/* List story */}
      <View className={"bg-white my-2 "}>
        <Text className={"font-bold text-base px-2"}>Khoảng khắc</Text>
        <View className={"flex-row w-full justify-between p-2"}>
          <Pressable>
            <ImageBackground source={require("/assets/story_1.png")} className={" w-20 h-28 justify-end items-center"}>
              <Pressable className={"w-8 h-8 rounded-full items-center justify-center bg-clip bg-gradient-to-b from-[#169dff] to-[#996cff]"}>
                <FontAwesomeIcons name="pen" size={10} color="white" />
              </Pressable>
              <Text className={"font-bold text-slate-400 text-xs"}>Tạo mới</Text>
            </ImageBackground>
          </Pressable>

          <Pressable>
            <ImageBackground source={require("/assets/story_2.png")} className={"w-20 h-28 justify-end items-center"}>
              <Image source={require("/assets/avata-story-3.png")} className={"w-8 h-8"}></Image>
              <Text className={"font-bold text-slate-400 text-xs"}>Cristiano</Text>
            </ImageBackground>
          </Pressable>

          <Pressable>
            <ImageBackground source={require("/assets/story_2.png")} className={"w-20 h-28 justify-end items-center"}>
              <Image source={require("/assets/avata-story-1.png")} className={"w-8 h-8"}></Image>
              <Text className={"font-bold text-slate-400 text-xs"}>Cristiano</Text>
            </ImageBackground>
          </Pressable>

          <Pressable>
            <ImageBackground source={require("/assets/story_2.png")} className={"w-20 h-28 justify-end items-center"}>
              <Image source={require("/assets/avata-story-1.png")} className={"w-8 h-8"}></Image>
              <Text className={"font-bold text-slate-400 text-xs"}>Cristiano</Text>
            </ImageBackground>
          </Pressable>
        </View>
      </View>

      {/* List status */}
      {/* Status 1 */}
      <View className={"bg-white w-full"}>
        <View className={"flex-row w-full justify-between px-4"}>
          <Pressable>
            <Image source={require("/assets/avata-story-1.png")} className={"w-12 h-12"}></Image>
          </Pressable>
          <View className={"w-3/4 justify-center pl-2"}>
            <Pressable>
              <Text className={"font-semibold"}>Thuỳ Linh</Text>
            </Pressable>
            <Text className={"text-xs"}>9 phút trước</Text>
          </View>
          <Pressable className={"w-8 items-center justify-center"}>
            <Image source={require("/assets/ic_threeDots.png")} className={"w-4 h-4"} resizeMode='contain' ></Image>
          </Pressable>
        </View>
        <View className={"px-4 py-2"}>
          <Text className={"text-blue-800"}>“KHI BẠN CHỌN BÌNH YÊN, NÓ ĐI KÈM VỚI RẤT NHIỀU LỜI TẠM BIỆT”  </Text>
        </View>
        <View className={"w-full h-52 bg-gray-400 items-center justify-center"}>
          <Image source={require("/assets/status-1.png")} className={"w-11/12 h-44"}></Image>
        </View>
        <View className={"w-11/12 self-center py-2"}>
          <View className={"flex-row"}>
            <Pressable className={"px-2"}>
              <Ionicons name="heart" size={22} color="#ef243a" />
            </Pressable>
            <Text className={"w-2/3 font-semibold text-gray-500 text-base"}>Trần Hằng và 15 người khác </Text>
            <Text className={" font-semibold text-gray-500 text-base"}>1 bình luận </Text>
          </View>
          <View className={"flex-row w-2/5 justify-evenly py-2"}>
            <Pressable className={"rounded-xl bg-gray-100 flex-row px-1 items-center"}>
              <Ionicons name="heart-outline" size={22} color="black" />
              <Text className={"text-base font-medium px-1"}>Thích</Text>
            </Pressable>
            <Pressable className={"rounded-xl bg-gray-100 flex-row px-2"}>
              <Ionicons name="chatbox-ellipses-outline" size={22} color="black" />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Status 2 */}
      <View className={"bg-white w-full"}>
        <View className={"flex-row w-full justify-between px-4"}>
          <Pressable>
            <Image source={require("/assets/avata-story-1.png")} className={"w-12 h-12"}></Image>
          </Pressable>
          <View className={"w-3/4 justify-center pl-2"}>
            <Pressable>
              <Text className={"font-semibold"}>Thuỳ Linh</Text>
            </Pressable>
            <Text className={"text-xs"}>9 phút trước</Text>
          </View>
          <Pressable className={"w-8 items-center justify-center"}>
            <Image source={require("/assets/ic_threeDots.png")} className={"w-4 h-4"} resizeMode='contain' ></Image>
          </Pressable>
        </View>
        <View className={"px-4 py-2"}>
          <Text className={"text-blue-800"}>“KHI BẠN CHỌN BÌNH YÊN, NÓ ĐI KÈM VỚI RẤT NHIỀU LỜI TẠM BIỆT”  </Text>
        </View>
        <View className={"w-full h-52 bg-gray-400 items-center justify-center"}>
          <Image source={require("/assets/status-1.png")} className={"w-11/12 h-44"}></Image>
        </View>
        <View className={"w-11/12 self-center py-2"}>
          <View className={"flex-row"}>
            <Pressable className={"px-2"}>
              <Ionicons name="heart" size={22} color="#ef243a" />
            </Pressable>
            <Text className={"w-2/3 font-semibold text-gray-500 text-base"}>Trần Hằng và 15 người khác </Text>
            <Text className={" font-semibold text-gray-500 text-base"}>1 bình luận </Text>
          </View>
          <View className={"flex-row w-2/5 justify-evenly py-2"}>
            <Pressable className={"rounded-xl bg-gray-100 flex-row px-1 items-center"}>
              <Ionicons name="heart-outline" size={22} color="black" />
              <Text className={"text-base font-medium px-1"}>Thích</Text>
            </Pressable>
            <Pressable className={"rounded-xl bg-gray-100 flex-row px-2"}>
              <Ionicons name="chatbox-ellipses-outline" size={22} color="black" />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Status 3 */}
      <View className={"bg-white w-full"}>
        <View className={"flex-row w-full justify-between px-4"}>
          <Pressable>
            <Image source={require("/assets/avata-story-1.png")} className={"w-12 h-12"}></Image>
          </Pressable>
          <View className={"w-3/4 justify-center pl-2"}>
            <Pressable>
              <Text className={"font-semibold"}>Thuỳ Linh</Text>
            </Pressable>
            <Text className={"text-xs"}>9 phút trước</Text>
          </View>
          <Pressable className={"w-8 items-center justify-center"}>
            <Image source={require("/assets/ic_threeDots.png")} className={"w-4 h-4"} resizeMode='contain' ></Image>
          </Pressable>
        </View>
        <View className={"px-4 py-2"}>
          <Text className={"text-blue-800"}>“KHI BẠN CHỌN BÌNH YÊN, NÓ ĐI KÈM VỚI RẤT NHIỀU LỜI TẠM BIỆT”  </Text>
        </View>
        <View className={"w-full h-52 bg-gray-400 items-center justify-center"}>
          <Image source={require("/assets/status-1.png")} className={"w-11/12 h-44"}></Image>
        </View>
        <View className={"w-11/12 self-center py-2"}>
          <View className={"flex-row"}>
            <Pressable className={"px-2"}>
              <Ionicons name="heart" size={22} color="#ef243a" />
            </Pressable>
            <Text className={"w-2/3 font-semibold text-gray-500 text-base"}>Trần Hằng và 15 người khác </Text>
            <Text className={" font-semibold text-gray-500 text-base"}>1 bình luận </Text>
          </View>
          <View className={"flex-row w-2/5 justify-evenly py-2"}>
            <Pressable className={"rounded-xl bg-gray-100 flex-row px-1 items-center"}>
              <Ionicons name="heart-outline" size={22} color="black" />
              <Text className={"text-base font-medium px-1"}>Thích</Text>
            </Pressable>
            <Pressable className={"rounded-xl bg-gray-100 flex-row px-2"}>
              <Ionicons name="chatbox-ellipses-outline" size={22} color="black" />
            </Pressable>
          </View>
        </View>
      </View>

    </View>
  )
}

export default News