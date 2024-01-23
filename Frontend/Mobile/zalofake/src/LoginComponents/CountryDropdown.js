import { View, Text, Pressable, Image, TextInput,Picker  } from "react-native";
import React, { useState } from 'react';

const countries = [
  'VN',
  'USA',
  'UK',
  'Cam',
];

const CountryDropdown = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);

    return (
      <View className="relative  text-left w-75">
        <Picker
          selectedValue={selectedCountry}
          onValueChange={(itemValue) => setSelectedCountry(itemValue)}
          className="  py-2 focus:outline-none focus:border-sky-300 text font-bold text-sky-400"
        >
          {countries.map((country, index) => (
            <Picker.Item   key={index} label={country} value={country} />
          ))}
        </Picker>
      </View>
    );
  };


export default CountryDropdown;