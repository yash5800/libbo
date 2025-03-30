import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs>
       <Tabs.Screen 
         name="index" 
         options={{ 
            tabBarLabel: 'Home',
            tabBarIcon: () => <Text>🏠</Text>,
            headerShown: false,
          }} />
    </Tabs>
  )
}

export default _layout