import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import '../global.css';
import { useContext, useEffect,useState } from "react";
import { context } from "../_layout";


interface data_type{
  id: number;
  title: string;
  description: string;
  author: string;
  year: number;
  url: string;
  rating: number;
}

export default function Index() {
  const {recommendations} = useContext(context);
  
  return (
    <SafeAreaView className="w-full h-full bg-white">
      <ScrollView 
        contentContainerClassName="flex items-center justify-center gap-5 pl-5 pr-5"
        horizontal={true}
      >
        {recommendations.length > 0 ?
        recommendations.map((item:data_type) => (
          <View key={item.id} className="bg-gray-200  rounded-lg p-4 w-40 h-40">
            {/* <Text className="text-center">{item.year}</Text>
            <Text className="text-center">{item.author}</Text>
            <Text className="text-center">{item.title}</Text>
            <Text className="text-center">{item.description}</Text> */}
            <Image source={{uri: 'https://imgs.search.brave.com/GVcDP9cX1YLhjAXS0-gIVZzpPpmCYLlsOHfwIOt7VfU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/dHdvLXRvbmUtaW5r/LWNsb3VkLmpwZz93/aWR0aD0xMDAwJmZv/cm1hdD1wanBnJmV4/aWY9MCZpcHRjPTA'}} 
              className="w-[110px] h-[150px]" />
            <Text className="text-center">{item.rating}</Text>
          </View>
        ))
      : <Text className="text-red-500">Loading..</Text>
      }


      </ScrollView>
    </SafeAreaView>
  );
}

