<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome5";
import { useAuthContext } from "../../contexts/AuthContext";
import { format } from "date-fns";
=======
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Image, Pressable, TextInput, ScrollView, Modal, Button } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome5";
import { useAuthContext } from "../../contexts/AuthContext";
import { format } from 'date-fns';
import RadioButton from 'react-native-radio-buttons-group';
>>>>>>> fd8078664ae63edd525eecfa08f84476c46796a1

const PersonalInfo = ({ navigation }) => {
  const { authUser } = useAuthContext();
  const gender = authUser?.profile?.gender === "male" ? "Nam" : "Nữ";
  const [visible, setVisible] = React.useState(false);

  const dob = authUser?.profile?.dob;
  let dobFormat = format(new Date(dob), "dd/MM/yyyy");
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", paddingHorizontal: 5 }}>
          <Pressable style={{ paddingHorizontal: 8 }}>
            <Ionicons name="sync-circle-outline" size={24} color="white" />
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("PersonalDetail");
            }}
            style={{ paddingHorizontal: 8 }}
          >
            <Ionicons
              name="ellipsis-horizontal-sharp"
              size={24}
              color="white"
            />
          </Pressable>
        </View>
      ),
      headerTitle: () => (
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Thông tin cá nhân
        </Text>
      ),

      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#0091FF",
        shadowColor: "#fff",
      },
    });
  }, [navigation]);

  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const radioButtons = useMemo(() => ([
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Nam',
      value: 'option1',
      color: 'blue',
      size: 24,
      
    },
    {
      id: '2',
      label: 'Nữ',
      value: 'option2',
      color: 'blue',
      size: 24
    }
  ]), []);
  const [selectedId, setSelectedId] = useState();


  return (
<<<<<<< HEAD
    <ScrollView style={{ backgroundColor: "#EFEFEF", flex: 1 }}>
      <View style={{}}>
        <Image
          source={{
            uri:
              authUser?.profile?.background?.url ||
              "https://fptshop.com.vn/Uploads/Originals/2021/6/23/637600835869525914_thumb_750x500.png",
          }}
          style={{ width: "100%", height: 250 }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: -100,
            alignItems: "left",
            marginBot: 100,
            paddingBottom: 10,
            paddingLeft: 10,
          }}
        >
          <Image
            source={{
              uri:
                authUser?.profile?.avatar?.url ||
                "https://fptshop.com.vn/Uploads/Originals/2021/6/23/637600835869525914_thumb_750x500.png",
=======
    <View style={{ backgroundColor: "#EFEFEF", flex: 1 }}>
      <ScrollView >
        <View>
          <Image
            source={{
              uri: authUser?.profile?.background?.url,
>>>>>>> fd8078664ae63edd525eecfa08f84476c46796a1
            }}
            style={{ width: "100%", height: 250 }}
          />
<<<<<<< HEAD
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: 20,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
              {authUser?.profile?.name}
            </Text>
          </View>
        </View>
        <View
          style={{ backgroundColor: "#fff", paddingTop: 15, paddingLeft: 10 }}
        >
          <Text style={{ fontSize: 18, fontWeight: "500", paddingBottom: 10 }}>
            Thông tin cá nhân
          </Text>
          <View>
            <View
              style={{
                height: 50,
                paddingTop: 15,
                borderBottomWidth: 1,
                borderBottomColor: "#bbb",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text style={{ width: "30%", fontSize: 16, fontWeight: "400" }}>
                Giới tính
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "400" }}>{gender}</Text>
            </View>
            <View
              style={{
                height: 50,
                paddingTop: 15,
                borderBottomWidth: 1,
                borderBottomColor: "#bbb",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text style={{ width: "30%", fontSize: 16, fontWeight: "400" }}>
                Ngày sinh
              </Text>

              <Text style={{ fontSize: 16, fontWeight: "400" }}>
                {dobFormat}
              </Text>
            </View>
            <View
              style={{
                height: 100,
                paddingTop: 15,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text style={{ width: "30%", fontSize: 16, fontWeight: "400" }}>
                Điện thoại
              </Text>
              <View
                style={{
                  width: "67%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "400" }}>
                  {authUser?.phone}
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "400", color: "gray" }}
                >
                  Số điện thoại này chỉ hiển thị với người có lưu số bạn trong
                  danh bạ máy
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 20,
                paddingTop: 10,
              }}
            >
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "#bbb" : "#d9d9d9",
                    borderRadius: 30,
                    width: "80%",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 50,
                    flexDirection: "row",
                  },
                ]}
              >
                <FontAwesomeIcons name="edit" size={24} color="black" />
                <Text
                  style={{ fontSize: 16, fontWeight: "500", paddingLeft: 15 }}
                >
                  Chỉnh sửa
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
=======
          <View style={{ display: "flex", flexDirection: 'row', marginTop: -100, alignItems: "left", marginBot: 100, paddingBottom: 10, paddingLeft: 10 }}>
            <Pressable onPress={() => setModalVisible(true)} >
              <Image
                source={{
                  uri: authUser?.profile?.avatar?.url,
                }}
                style={{ width: 75, height: 75, borderRadius: 48 }}

              /></Pressable>
            <View style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', paddingLeft: 20 }}><Text style={{ fontSize: 18, fontWeight: "bold", color: '#fff' }}>{authUser?.profile?.name}</Text></View>
          </View>
          <View style={{ backgroundColor: "#fff", paddingTop: 15, paddingLeft: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "500", paddingBottom: 10 }}>Thông tin cá nhân</Text>
            <View>
              <View style={{ height: 50, paddingTop: 15, borderBottomWidth: 1, borderBottomColor: '#bbb', display: "flex", flexDirection: 'row' }}>
                <Text style={{ width: '30%', fontSize: 16, fontWeight: "400" }}>Giới tính</Text>
                <Text style={{ fontSize: 16, fontWeight: "400" }}>{gender}</Text>
              </View>
              <View style={{ height: 50, paddingTop: 15, borderBottomWidth: 1, borderBottomColor: '#bbb', display: "flex", flexDirection: 'row' }}>
                <Text style={{ width: '30%', fontSize: 16, fontWeight: "400" }}>Ngày sinh</Text>

                <Text style={{ fontSize: 16, fontWeight: "400" }}>{dobFormat}</Text>
              </View>
              <View style={{ height: 100, paddingTop: 15, display: "flex", flexDirection: 'row' }}>
                <Text style={{ width: '30%', fontSize: 16, fontWeight: "400" }}>Điện thoại</Text>
                <View style={{ width: '67%', display: "flex", flexDirection: 'column' }}>
                  <Text style={{ fontSize: 16, fontWeight: "400" }}>{authUser?.phone}</Text>
                  <Text style={{ fontSize: 14, fontWeight: "400", color: "gray" }}>Số điện thoại này chỉ hiển thị với người có lưu số bạn trong danh bạ máy</Text>
                </View >
              </View>
              <View style={{ display: "flex", justifyContent: 'center', alignItems: 'center', paddingBottom: 20, paddingTop: 10 }}>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? '#bbb' : '#d9d9d9',
                      borderRadius: 30,
                      width: '80%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 50,
                      flexDirection: 'row'
                    },
                  ]}
                  onPress={() => {
                    setShowModal(!showModal);
                  }}
                >
                  <FontAwesomeIcons name="edit" size={24} color="black" /><Text style={{ fontSize: 16, fontWeight: "500", paddingLeft: 15 }}>Chỉnh sửa</Text></Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ backgroundColor: 'white', padding: 20, width: '100%', height: 300 }}>
              <Pressable style={{ width: '100%', alignItems: 'center', height: 30, justifyContent: 'flex-start' }}
                onPress={() => setModalVisible(!modalVisible)}>
                <View style={{ width: '20%', height: 6, backgroundColor: '#e0e3e5', borderRadius: 20 }}></View>
              </Pressable>
              <Text style={{ color: '#6c8dc1', fontWeight: 'bold', margin: 10, fontSize: 16 }}>Ảnh đại diện</Text>
              <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                <FontAwesomeIcons name="user-circle" size={30} color="gray" />
                <Text style={{ margin: 15, fontSize: 16, justifyContent: 'center', fontWeight: '400' }}>Xem ảnh đại diện</Text>
              </View>
              <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                <Ionicons name="camera-outline" size={30} color="gray" />
                <Text style={{ margin: 15, fontSize: 16, justifyContent: 'center', fontWeight: '400' }}>Chụp ảnh mới</Text>
              </View>
              <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                <Ionicons name="image-outline" size={30} color="gray" />
                <Text style={{ margin: 15, fontSize: 16, justifyContent: 'center', fontWeight: '400' }}>Chọn ảnh trên máy</Text>
              </View>

            </View>
          </View>
        </Modal>

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={showModal}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#0091FF', width: '100%', height: '12%', alignItems: 'flex-end' }}>
              <Pressable style={{ paddingHorizontal: 15 }} onPress={() => { setShowModal(!showModal); }}>
                <Ionicons name="arrow-back" size={34} color="white" style={{ marginBottom: 7 }} />
              </Pressable>
              <Text style={{ color: 'white', marginBottom: 15, fontSize: 20, fontWeight: 'bold' }}>Chỉnh sửa thông tin</Text>
            </View>
            <View style={{ display: 'flex', padding: 20, flexDirection: 'row', height: '25%'}}>
              <Pressable onPress={() => setModalVisible(true)} >
                <Image
                  source={{
                    uri: authUser?.profile?.avatar?.url,
                  }}
                  style={{ width: 85, height: 85, borderRadius: 48 }}
                /></Pressable>
              <View style={{justifyContent: 'flex-end'}}>
                <View style={{ flexDirection: 'row', height: 60, width: '63%', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, borderBottomWidth: 1, borderBlockColor: '#e0e3e5' }}>
                  <Text style={{ fontSize: 18 }}>{authUser?.profile?.name}</Text>
                  <FontAwesomeIcons name="pencil-alt" size={24} color="black" />
                </View>
                <View style={{ flexDirection: 'row', height: 60, width: '63%', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, borderBottomWidth: 1, borderBlockColor: '#e0e3e5' }}>
                  <Text style={{ fontSize: 18 }}>{dobFormat}</Text>
                  <FontAwesomeIcons name="pencil-alt" size={24} color="black" />
                </View>
                <View style={{height: 60, justifyContent: 'center'}}>
                  <RadioButton
                    radioButtons={radioButtons}
                    onPress={setSelectedId}
                    selectedId={selectedId}
                    layout='row' 
                    labelStyle= {{fontSize: 18}}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
>>>>>>> fd8078664ae63edd525eecfa08f84476c46796a1
      </View>
    </View>
  );
};

export default PersonalInfo;
