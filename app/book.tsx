import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { context } from './_layout'
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

const book = () => {
    const {setAct,recommanded,get_recommanded,act_book} = useContext(context);
    const router = useRouter();

    const openBook = useCallback(()=>{
         router.push('/book')
    },[setAct])
    
  


  return (
   <SafeAreaView className='h-full bg-white'>
    <ScrollView
     showsVerticalScrollIndicator={false}
    >
    <View className='w-full h-[280px] bg-gray-700 flex justify-center items-center rounded-3xl'>
     <Text className='font-medium text-lg text-center text-white w-[300px] absolute top-10'
      numberOfLines={1}
      ellipsizeMode='tail'
     >{act_book.title}</Text>
     <Text className='font-light text-lg text-center text-yellow-200 absolute top-16'
      numberOfLines={1}
      ellipsizeMode='tail'
     >{act_book.author}</Text>
     <View className='absolute top-[130px] right-6'>
       <Text className='font-semibold text-lg text-yellow-300'>⏱ year</Text>
       <Text className='font-medium text-white text-center'>{act_book.year}</Text>
     </View>
     <View className='absolute top-[140px] left-6 flex flex-row justify-center items-center gap-1'>
       <Text className='font-semibold text-lg text-white'>☆</Text>
       <Text className='font-thin  text-white'>{act_book.rating}</Text>
     </View>

     <View className='w-[200px] bg-black relative '>
        <Image 
         source={{uri: `https://raw.githubusercontent.com/yash5800/libbo/master/assets/books_images/${act_book.url}`}} 
         className="w-full h-[350px] absolute -mt-14" 
         resizeMode="contain" 
         />
     </View>
     </View>     
     <View className='mt-[190px] px-5'>
       <View>
          <Text className='text-xl font-semibold'>Description:</Text>
          <Text className='text-lg ml-4 font-normal text-slate-600'>{act_book.description}</Text>
       </View>      
     </View>  
        <View className="flex flex-col items-start  mt-6 h-[300px] "> 
         <Text className="text-lg font-semibold text-slate-700 px-5">Similar Recommanded Books!</Text>
         <ScrollView 
           contentContainerClassName="flex items-center justify-center -mt-12 gap-5 pl-5 pr-5"
           horizontal={true}
           showsHorizontalScrollIndicator={false}
         >
           {recommanded.length > 0 ?
           recommanded.map((item:data_type) => (
             <View key={item.id} className="flex justify-center items-center flex-col w-[120px] h-[195px] rounded-2xl bg-white overflow-hidden shadow-xl shadow-black">
               <TouchableOpacity onPress={()=>{
                 setAct(item);
                 get_recommanded({search:item.title})
                 openBook();
               }}>
               <Image source={{uri: `https://raw.githubusercontent.com/yash5800/libbo/master/assets/books_images/${item.url}`}} 
                 className="w-[160px] h-[200px] " resizeMode="contain" />
               </TouchableOpacity>
             </View>
           ))
         : <Text className="text-blue-500 text-center">Loading..</Text>
         }
         </ScrollView>
           </View>
     </ScrollView>
   </SafeAreaView>
  )
}

export default book