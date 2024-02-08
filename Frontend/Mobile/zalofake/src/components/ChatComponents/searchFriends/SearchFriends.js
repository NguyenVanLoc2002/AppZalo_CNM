import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

function SearchFriends({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Pressable>
            <Ionicons name="qr-code" size={24} color="white" />
          </Pressable>
        </View>
      ),
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 10,
            paddingHorizontal: 5,
            paddingVertical: 10,
            width: 280,
          }}
        >
          <Ionicons name="search" size={22} color="gray" />
          <TextInput
            style={{ marginLeft: 5 }}
            placeholder="Tìm kiếm"
            placeholderTextColor={"gray"}
          />
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
  }, [navigation]);

  // Mảng dữ liệu mẫu
  const [apps, setApps] = useState([
    {
      ten: "Zalo Video",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSD4fmMnGRJGugIDV56D7TRviFe3-Rk5Ci-Q&usqp=CAU",
    },
    {
      ten: "Điểm danh Fama",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAYoqFEFooH83sk6GkVSp5ib6htmdQz2J9qy4WxcFPcxxXjloHUg1rz442YQkCLveSAzk&usqp=CAU",
    },
    {
      ten: "Ví QR",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwMg-9OOtV1FZUI55HYMHnuLNvhVDX7fmAFg&usqp=CAU",
    },
    {
      ten: "Nhạc chờ zMelody",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAn4Y9teGOEChh0jdo8KRuVEWavwMIkm5xbw&usqp=CAU",
    },
    {
      ten: "Tài chính",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUNgD-OnuEdUKy493x-cwfG4usV3s8eqCaaQ&usqp=CAU",
    },
    {
      ten: "Trò chơi",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOrwXNLqvWnAIniBEnl9kmQbbKBH_N3vdiZA&usqp=CAU",
    },
    {
      ten: "Sức khỏe",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8lmScT9BbiPFR8sJc1pURNVH4Q2OfRTyD0Q&usqp=CAU",
    },
    {
      ten: "Mua sấm",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp_lU15FCOZCzZcsR5PFy4R7bI4V9MzfLxOA&usqp=CAU",
    },
    {
      ten: "Tiền ích",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGK0gKAq92F9UD7YFMPWzKvnch39UGJLxFXQ&usqp=CAU",
    },
    {
      ten: "Cơ quan nhà nước",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTayzJi51BSowooHN_vUgXMIsNin9qYWWm3dg&usqp=CAU",
    },
    {
      ten: "Thêm",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAs4NFiTfZlx2QIuLHM065SpQbpcku32bmow&usqp=CAU",
    },
  ]);

  const [users, setUsers] = useState([
    {
      ten: "Nguyen Van A",
      url: "https://randomuser.me/api/portraits/men/68.jpg",
      tinNhan: "Hello",
      soTNChuaDoc: 6,
      thoiGian: 2,
    },
    {
      ten: "Luong thi Tho",
      url: "https://randomuser.me/api/portraits/men/70.jpg",
      tinNhan: "Khoe khong",
      soTNChuaDoc: 0,
      thoiGian: 6,
    },
    {
      ten: "Nguyen Van Teo",
      url: "https://randomuser.me/api/portraits/men/80.jpg",
      tinNhan: "An com chua",
      soTNChuaDoc: 0,
      thoiGian: 0,
    },
    {
      ten: "Le Van Ty",
      url: "https://randomuser.me/api/portraits/men/90.jpg",
      tinNhan: "Dang lam gi the",
      soTNChuaDoc: 5,
      thoiGian: 8,
    },
    {
      ten: "Huynh Quoc Hao",
      url: "https://randomuser.me/api/portraits/men/10.jpg",
      tinNhan: "may gio roi",
      soTNChuaDoc: 7,
      thoiGian: 0,
    },
    {
      ten: "Bui Tri Thuc",
      url: "https://randomuser.me/api/portraits/men/20.jpg",
      tinNhan: "lam bai tap chua",
      soTNChuaDoc: 3,
      thoiGian: 12,
    },
    {
      ten: "Thanh Tam",
      url: "https://randomuser.me/api/portraits/men/53.jpg",
      tinNhan: "lam bai tap chua",
      soTNChuaDoc: 0,
      thoiGian: 5,
    },
    {
      ten: "Hung Dung",
      url: "https://randomuser.me/api/portraits/men/62.jpg",
      tinNhan: "lam bai tap chua",
      soTNChuaDoc: 4,
      thoiGian: 0,
    },
    {
      ten: "Nam",
      url: "https://randomuser.me/api/portraits/men/26.jpg",
      tinNhan: "lam bai tap chua",
      soTNChuaDoc: 7,
      thoiGian: 2,
    },
    {
      ten: "Hau",
      url: "https://randomuser.me/api/portraits/men/63.jpg",
      tinNhan: "lam bai tap chua",
      soTNChuaDoc: 0,
      thoiGian: 3,
    },
  ]);

  const [truyCap, setTruyCap] = useState([
    {
      ten: "Zalo Video",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSD4fmMnGRJGugIDV56D7TRviFe3-Rk5Ci-Q&usqp=CAU",
    },
    {
      ten: "Điểm danh Fama",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAYoqFEFooH83sk6GkVSp5ib6htmdQz2J9qy4WxcFPcxxXjloHUg1rz442YQkCLveSAzk&usqp=CAU",
    },
    {
      ten: "Thêm",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAs4NFiTfZlx2QIuLHM065SpQbpcku32bmow&usqp=CAU",
    },
  ]);
  const [searchHistory, setSearchHistory] = useState([
    "Huynh ",
    "kh",
    "kh",
    "kh",
    "kh",
    "kh",
    "kh",
    "Thuc",
    "Loc",
    "Nhi",
    "Truc",
  ]);
  // Hàm render mỗi mục trong FlatList
  const renderApps = ({ item }) => (
    <Pressable
      style={{
        height: 100,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: item.url }}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
      <Text style={{ textAlign: "center" }}>{item.ten}</Text>
    </Pressable>
  );
  const renderTruyCapNhanh = ({ item }) => (
    <Pressable
      style={{
        height: 100,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: item.url }}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
      <Text style={{ textAlign: "center" }}>{item.ten}</Text>
    </Pressable>
  );
  const renderHistory = ({ item }) => (
    <Pressable style={{ flexDirection: "row" }}>
      <Ionicons
        name="search"
        size={20}
        color="gray"
        style={{ marginHorizontal: 10 }}
      />
      <Text>{item}</Text>
    </Pressable>
  );

  return (
    <View style={{ flex: 1 }}>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Mini Apps bạn có thể tìm</Text>
          <Pressable>
            <Ionicons
              name="close"
              size={24}
              color="gray"
              style={{ padding: 10 }}
            />
          </Pressable>
        </View>
        {/* FlatList component */}
        <View style={{ height: 100 }}>
          <FlatList
            horizontal
            data={apps}
            renderItem={renderApps}
            keyExtractor={(item) => item.ten}
          />
        </View>
        <View
          style={{
            marginVertical: 10,
            height: 1,
            backgroundColor: "gray",
            marginHorizontal: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Liên hệ đã tìm</Text>
        </View>
        <View style={{ height: 100, flexDirection: "row" }}>
          <FlatList
            horizontal
            data={users}
            renderItem={renderApps}
            keyExtractor={(item) => item.ten}
          />
        </View>
        <View
          style={{
            marginVertical: 10,
            height: 1,
            backgroundColor: "gray",
            marginHorizontal: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Truy cập nhanh</Text>
        </View>
        <View
          style={{ height: 100, flexDirection: "row", alignItems: "center" }}
        >
          <FlatList
            horizontal
            data={truyCap}
            renderItem={renderTruyCapNhanh}
            keyExtractor={(item) => item.ten}
            style={{ backgroundColor: "yellow " }}
          />
        </View>
        <View
          style={{
            marginVertical: 10,
            height: 1,
            backgroundColor: "gray",
            marginHorizontal: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Từ khóa đã tìm</Text>
        </View>
        <FlatList
          data={searchHistory}
          renderItem={renderHistory}
          keyExtractor={(item, index) => index.toString()}
        />
        <View
          style={{
            marginVertical: 10,
            height: 1,
            backgroundColor: "gray",
            marginHorizontal: 10,
          }}
        />
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <Text style={{ color: "#0091FF" }}>Chỉnh sửa lịch sử tìm kiếm</Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#0091FF"
            style={{ marginLeft: 5 }}
          />
        </Pressable>
      </View>
    </View>
  );
}

export default SearchFriends;
