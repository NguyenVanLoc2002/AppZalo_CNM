import { View, Text, Image, ImageBackground, ScrollView, Pressable } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5';

const Notice = ({navigation}) => {

    navigation.setOptions({
        headerRight: () => (
          <View style={{ flexDirection: "row" }}>
            <Pressable>
              <Ionicons name="settings-outline" size={24} color="white"
                style={{ padding: 5, paddingStart: 15 }} />
            </Pressable>
          </View>
        ),
        headerTitle: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text className={"text-white text-xl font-semibold "}>Thông báo mới</Text>
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
    <View className={"bg-white h-full"}>
      {/* Notice đăng story*/}
      <View className={"flex-row items-center h-24 bg-[rgb(226,243,251)] w-full"}>
        <Pressable className={"px-2 w-1/5 h-4/5"}>
          <ImageBackground source={require("/assets/avata-story-1.png")} className={"w-full h-full justify-end items-end"} resizeMode='contain' >
            <View className={"bg-[#9570d9] border-2 border-white rounded-full items-center justify-center w-8 h-8 "}>
              <FontAwesomeIcons name="video" size={14} color="white" />
            </View>
          </ImageBackground>
        </Pressable>
        <View className={"h-3/4 w-3/5 justify-evenly pl-2"}>
          <Text className={"font-bold text-base"}>Hoàng Thư <Text className={"font-medium"}>đăng khoảng khắc mới </Text></Text>
          <Text className={"text-[#adcff4] font-semibold"}>18:40 hôm qua</Text>
        </View>
        <Pressable className={"w-1/6 place-items-end"}>            
          <Image source={require("/assets/ic_threeDots.png")} className={"w-4 h-4"} resizeMode='contain' ></Image>
        </Pressable>
      </View>

      {/* Notice đăng ảnh */}
      <View className={"flex-row items-center h-24 bg-[rgb(226,243,251)] w-full"}>
        <Pressable className={"px-2 w-1/5 h-4/5"}>
          <ImageBackground source={require("/assets/avata-story-3.png")} className={"w-full h-full justify-end items-end"} resizeMode='contain' >
            <View className={"bg-[#73d593] border-2 border-white rounded-full items-center justify-center w-8 h-8 "}>
              <FontAwesomeIcons name="image" size={18} color="white" />
            </View>
          </ImageBackground>
        </Pressable>
        <View className={"h-3/4 w-3/5 justify-evenly pl-2"}>
          <Text className={"font-bold text-base"}>Lê Thị Kim Thoa 
          <Text className={"font-medium"}> vừa đăng 
          <Text className={"font-bold"}> 13 ảnh</Text> mới vào nhật ký sau một thời gian</Text></Text>
          <Text className={"text-[#adcff4] font-semibold"}>18:40 hôm qua</Text>
        </View>
        <Pressable className={"w-1/6 place-items-end"}>            
          <Image source={require("/assets/ic_threeDots.png")} className={"w-4 h-4"} resizeMode='contain' ></Image>
        </Pressable>
      </View>

       {/* Notice bình luận ảnh */}
       <View className={"flex-row items-center h-24 bg-[rgb(226,243,251)] w-full"}>
        <Pressable className={"px-2 w-1/5 h-4/5"}>
          <ImageBackground source={require("/assets/avata-story-4.png")} className={"w-full h-full justify-end items-end"} resizeMode='contain' >
            <View className={"bg-[#f9964e] border-2 border-white rounded-full items-center justify-center w-8 h-8 "}>
              <Ionicons name="chatbox-ellipses" size={18} color="white" />
            </View>
          </ImageBackground>
        </Pressable>
        <View className={"h-3/4 w-3/5 justify-evenly pl-2"}>
          <Text className={"font-bold text-base"}>Trần Thị Yến Nhi
          <Text className={"font-medium"}> vừa bình luận bài viết của bạn</Text> </Text>
          <Text className={"text-[#adcff4] font-semibold"}>2 phút trước</Text>
        </View>
        <Pressable className={"w-1/6 place-items-end"}>            
          <Image source={require("/assets/ic_threeDots.png")} className={"w-4 h-4"} resizeMode='contain' ></Image>
        </Pressable>
      </View>

      {/* Notice bày tỏ cảm xúc tym */}
      <View className={"flex-row items-center h-24 bg-[rgb(226,243,251)] w-full"}>
        <Pressable className={"px-2 w-1/5 h-4/5"}>
          <ImageBackground source={require("/assets/avata-story-4.png")} className={"w-full h-full justify-end items-end"} resizeMode='contain' >
            <View className={"bg-[#ffd9db] border-2 border-white rounded-full items-center justify-center w-8 h-8 "}>
              <Ionicons name="heart" size={18} color="#dd4248" />
            </View>
          </ImageBackground>
        </Pressable>
        <View className={"h-3/4 w-3/5 justify-evenly pl-2"}>
          <Text className={"font-bold text-base"}>Lộc Nguyễn, Bùi Trí Thức
          <Text className={"font-medium"}> bày tỏ cảm xúc với ảnh đại diện của bạn</Text> </Text>
          <Text className={"text-[#adcff4] font-semibold"}>4/12/2023</Text>
        </View>
        <Pressable className={"w-1/6 place-items-end"}>            
          <Image source={require("/assets/ic_threeDots.png")} className={"w-4 h-4"} resizeMode='contain' ></Image>
        </Pressable>
      </View>

      {/* Lặp lại */}

      {/* Notice đăng story*/}
      <View className={"flex-row items-center h-24 bg-[rgb(226,243,251)] w-full"}>
        <Pressable className={"px-2 w-1/5 h-4/5"}>
          <ImageBackground source={require("/assets/avata-story-1.png")} className={"w-full h-full justify-end items-end"} resizeMode='contain' >
            <View className={"bg-[#9570d9] border-2 border-white rounded-full items-center justify-center w-8 h-8 "}>
              <FontAwesomeIcons name="video" size={14} color="white" />
            </View>
          </ImageBackground>
        </Pressable>
        <View className={"h-3/4 w-3/5 justify-evenly pl-2"}>
          <Text className={"font-bold text-base"}>Hoàng Thư <Text className={"font-medium"}>đăng khoảng khắc mới </Text></Text>
          <Text className={"text-[#adcff4] font-semibold"}>18:40 hôm qua</Text>
        </View>
        <Pressable className={"w-1/6 place-items-end"}>            
          <Image source={require("/assets/ic_threeDots.png")} className={"w-4 h-4"} resizeMode='contain' ></Image>
        </Pressable>
      </View>

      {/* Notice đăng ảnh */}
      <View className={"flex-row items-center h-24 bg-[rgb(226,243,251)] w-full"}>
        <Pressable className={"px-2 w-1/5 h-4/5"}>
          <ImageBackground source={require("/assets/avata-story-3.png")} className={"w-full h-full justify-end items-end"} resizeMode='contain' >
            <View className={"bg-[#73d593] border-2 border-white rounded-full items-center justify-center w-8 h-8 "}>
              <FontAwesomeIcons name="image" size={18} color="white" />
            </View>
          </ImageBackground>
        </Pressable>
        <View className={"h-3/4 w-3/5 justify-evenly pl-2"}>
          <Text className={"font-bold text-base"}>Lê Thị Kim Thoa 
          <Text className={"font-medium"}> vừa đăng 
          <Text className={"font-bold"}> 13 ảnh</Text> mới vào nhật ký sau một thời gian</Text></Text>
          <Text className={"text-[#adcff4] font-semibold"}>18:40 hôm qua</Text>
        </View>
        <Pressable className={"w-1/6 place-items-end"}>            
          <Image source={require("/assets/ic_threeDots.png")} className={"w-4 h-4"} resizeMode='contain' ></Image>
        </Pressable>
      </View>

       {/* Notice bình luận ảnh */}
       <View className={"flex-row items-center h-24 bg-[rgb(226,243,251)] w-full"}>
        <Pressable className={"px-2 w-1/5 h-4/5"}>
          <ImageBackground source={require("/assets/avata-story-4.png")} className={"w-full h-full justify-end items-end"} resizeMode='contain' >
            <View className={"bg-[#f9964e] border-2 border-white rounded-full items-center justify-center w-8 h-8 "}>
              <Ionicons name="chatbox-ellipses" size={18} color="white" />
            </View>
          </ImageBackground>
        </Pressable>
        <View className={"h-3/4 w-3/5 justify-evenly pl-2"}>
          <Text className={"font-bold text-base"}>Trần Thị Yến Nhi
          <Text className={"font-medium"}> vừa bình luận bài viết của bạn</Text> </Text>
          <Text className={"text-[#adcff4] font-semibold"}>2 phút trước</Text>
        </View>
        <Pressable className={"w-1/6 place-items-end"}>            
          <Image source={require("/assets/ic_threeDots.png")} className={"w-4 h-4"} resizeMode='contain' ></Image>
        </Pressable>
      </View>

      {/* Notice bày tỏ cảm xúc tym */}
      <View className={"flex-row items-center h-24 bg-[rgb(226,243,251)] w-full"}>
        <Pressable className={"px-2 w-1/5 h-4/5"}>
          <ImageBackground source={require("/assets/avata-story-4.png")} className={"w-full h-full justify-end items-end"} resizeMode='contain' >
            <View className={"bg-[#ffd9db] border-2 border-white rounded-full items-center justify-center w-8 h-8 "}>
              <Ionicons name="heart" size={18} color="#dd4248" />
            </View>
          </ImageBackground>
        </Pressable>
        <View className={"h-3/4 w-3/5 justify-evenly pl-2"}>
          <Text className={"font-bold text-base"}>Lộc Nguyễn, Bùi Trí Thức
          <Text className={"font-medium"}> bày tỏ cảm xúc với ảnh đại diện của bạn</Text> </Text>
          <Text className={"text-[#adcff4] font-semibold"}>4/12/2023</Text>
        </View>
        <Pressable className={"w-1/6 place-items-end"}>            
          <Image source={require("/assets/ic_threeDots.png")} className={"w-4 h-4"} resizeMode='contain' ></Image>
        </Pressable>
      </View>


    </View>
  )
}

export default Notice