import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { Tabs } from 'expo-router'
import { context } from '../_layout'

const TabView = ()=>{
  return <View className='w-[100px] justify-center items-center bg-gray-600 rounded-full h-[100px]'>
            <Text className='text-md'>🏠</Text>
         </View>
}

const _layout = () => {
  const {tab} = useContext(context);
  return (
    <Tabs
       screenOptions={{
        tabBarStyle:{
          'display':tab?'none':'flex',
          borderTopRightRadius:40,
          borderTopLeftRadius:40,
          overflow:'hidden',
          height:50,
          position:'absolute'
        },
       }}
      >
       <Tabs.Screen 
         name="index" 
         options={{ 
            tabBarLabel: 'Home',
            tabBarShowLabel:false,
            tabBarIcon: () => <TabView />,
            headerShown: false,
          }} />
    </Tabs>
  )
}

export default _layout