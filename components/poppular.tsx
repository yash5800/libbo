import { View, Text, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import { context } from '@/app/_layout';
import { rate, rec } from '@/lib/icon';

interface data_type{
  id: number;
  title: string;
  description: string;
  author: string;
  year: number;
  url: string;
  rating: number;
}

const Poppular = () => {
  const {poppular} = useContext(context);

  return (
    <View className="flex flex-col items-start mt-6 h-[300px] "> 
    <Text className="text-lg font-semibold text-white px-3">Most People Liked ❤️</Text>
    <ScrollView 
      contentContainerClassName="flex items-center justify-center gap-5 pl-5 pr-5"
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {poppular.length > 0 ?
      poppular.map((item:data_type) => (
        <View key={item.id} className="bg-gray-200 rounded-lg overflow-hidden">
          <ImageBackground source={rec} className="flex justify-center items-center flex-col p-4 w-[200px] h-[230px]">
          <TouchableOpacity onPress={()=>{}}>
             {/* <Text className="text-center">{item.year}</Text>
          <Text className="text-center">{item.author}</Text>
          <Text className="text-center">{item.title}</Text>
          <Text className="text-center">{item.description}</Text> */}
          <Image source={{uri: `https://raw.githubusercontent.com/yash5800/libbo/master/assets/books_images/${item.url}`}} 
            className="w-[130px] h-[160px]" resizeMode="contain" />
          </TouchableOpacity>
          <View className="flex w-full flex-row justify-center items-center gap-2">
            <Image source={rate} className="size-7"/>
            <Text className="text-center text-lg font-medium text-green-400 mt-1.5">{item.rating}</Text>
          </View>
         </ImageBackground>
        </View>
      ))
    : <Text className="text-blue-500 text-center">Loading..</Text>
    }
    </ScrollView>
   </View>
  )
}

export default Poppular