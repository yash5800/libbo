import { View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, SafeAreaView, TextInput, FlatList } from 'react-native'
import React, { useCallback, useContext, useRef, useState } from 'react'
import { context } from '@/app/_layout';
import { glass, rate, rec } from '@/lib/icon';
import '../global.css'
import { useRouter } from 'expo-router';



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
  const {poppular,tab,setTab,books,setBooks,get_search_book,setAct,act_book,get_recommanded} = useContext(context);
  const router = useRouter();
  const [search,setSearch] = useState('');

  const show = useCallback((val:boolean)=>{
      setTab(val)
    },[setTab])

  const handleSubmit = useCallback(()=>{
    if(search == '') return null
     console.log(search)
     get_search_book({search:search})
  },[search,get_search_book])

  const openBook = useCallback(()=>{
       router.push('/book')
  },[setAct,act_book])

  const fallbackImage = 'https://raw.githubusercontent.com/yash5800/libbo/master/assets/books_images/no_cover.jpg';
  


  return (
    <SafeAreaView className="w-full h-full bg-slate-800 flex flex-col justify-between">
     <ScrollView
      showsVerticalScrollIndicator={false}
     >
      <View className="flex flex-col items-start  mt-6 h-[300px] "> 
    <Text className="text-lg font-semibold text-white px-5">Most People Liked ❤️</Text>
    <ScrollView 
      contentContainerClassName="flex items-center justify-center -mt-12 gap-5 pl-5 pr-5"
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {poppular.length > 0 ?
      poppular.map((item:data_type) => (
        <View key={item.id} className="flex justify-center items-center flex-col w-[120px] h-[195px] rounded-2xl bg-white overflow-hidden shadow-xl shadow-black">
          <TouchableOpacity onPress={()=>{
            setAct(item);
            get_recommanded({search:item.title})
            openBook();
          }}>
          <Image source={{uri: `https://raw.githubusercontent.com/yash5800/libbo/master/assets/books_images/${item.url}`}} 
            className="w-[160px] h-[200px] " resizeMode="contain" 
            />
          </TouchableOpacity>
        </View>
      ))
    : <Text className="text-blue-500 text-center">Loading..</Text>
    }
    </ScrollView>
      </View>
      <View className='w-full relative px-3 -mt-10'>
         <TextInput 
          placeholder='Search book...'
          value={search} 
          onChangeText={(text)=>{
            setSearch(text)
            handleSubmit()
          }}
          className={`w-full border-2 border-white py-3 rounded-full text-lg text-white px-6 ${'placeholder:text-gray-500'} font-light`}
          onFocus={() => show(true)}
          onBlur={() => {
            console.log('Blurred with search:', search);
            show(false);
          }}
         />
         <TouchableOpacity className='absolute flex justify-center items-center right-7 h-full'
         onPress={handleSubmit}
         >
           <Image source={glass} className='size-10 opacity-80' resizeMode='contain' tintColor={'white'}/>
         </TouchableOpacity>
      </View>
      <View className="py-5 px-5 -mt-2">
      { search!='' && <Text className='text-2xl text-slate-300 font-light'>Search Result : {search}</Text>}
        <FlatList<data_type>
          keyboardShouldPersistTaps="handled"
          scrollEnabled={false}
          data={books}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: 'space-evenly',gap:3,marginTop:20 }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
           <View key={item.id} className='flex flex-col gap-2'>
            <View className="flex justify-center items-center flex-col w-[100px] h-[165px] rounded-2xl bg-white overflow-hidden shadow-xl shadow-black">
            <TouchableOpacity onPress={()=>{
            setAct(item);
            get_recommanded({search:item.title})
            openBook();
             }}>
            <Image source={{uri: `https://raw.githubusercontent.com/yash5800/libbo/master/assets/books_images/${item.url}`}} 
              className="w-[140px] h-[180px] " resizeMode="contain" />
            </TouchableOpacity>
           </View>
           <Text className='text-white font-thin text-sm w-[100px] text-center'
             numberOfLines={2}
             ellipsizeMode='tail'
            >
              {item.title}
            </Text>
          </View>
  
          )}

        />
      </View>
     </ScrollView>
    </SafeAreaView>
  );
}

