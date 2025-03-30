import { Stack } from "expo-router";
import { createContext, useEffect, useState } from "react";

interface data_type{
  recommendations: [];
  setRecommendations?: any;
}

export const context = createContext<data_type>({
  recommendations: [],
  setRecommendations: () => {},
})

export default function RootLayout() {  
  const [recommendations, setRecommendations] = useState<any>([]);
  useEffect(() => {
    const fetchRecommendations = async () => {
      try{
        const res = await fetch('http://192.168.74.201:5000/api/top');
        if(res.ok) {
          const data = await res.json();
          setRecommendations(data);
          console.log(data);
        }
      }
      catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  },[setRecommendations]);

  return (
    <context.Provider value={{ recommendations:recommendations, setRecommendations:setRecommendations }}>
      <Stack>
       <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      </Stack>
    </context.Provider>
  ) ;
}
