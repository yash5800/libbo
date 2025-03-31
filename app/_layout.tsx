import { Stack } from "expo-router";
import { createContext, useEffect, useState } from "react";

interface act_type{
  id: number;
  title: string;
  description: string;
  author: string;
  year: number;
  url: string;
  rating: number;
}


interface data_type{
  poppular: [];
  setPoppular?: any;
  recommanded:[];
  setRecommanded?:any;
  books:[];
  setBooks?:any;
  tab:boolean;
  setTab?:any;
  get_search_book?:any;
  act_book:act_type;
  setAct?:any;
  get_recommanded?:any;
}

export const context = createContext<data_type>({
  poppular: [],
  setPoppular: () => {},
  recommanded:[],
  setRecommanded:()=>{},
  books:[],
  setBooks:()=>{},
  tab:false,
  setTab:()=>{},
  get_search_book:()=>{},
  act_book:{
    id: 0,
    title: "",
    description: "",
    author: "",
    year: 0,
    url: "",
    rating: 0,
  },
  setAct:()=>{},
  get_recommanded:()=>{}
})



export default function RootLayout() {  
  const [poppular, setPoppular] = useState<any>([]);
  const [recommanded, setRecommanded] = useState<any>([]);
  const [books, setBooks] = useState<any>([]);
  const [tab,setTab] = useState<boolean>(false);
  const [act_book, setAct] = useState<act_type>({
    id: 0,
    title: "",
    description: "",
    author: "",
    year: 0,
    url: "",
    rating: 0,
  });
  
  const address = 'http://192.168.19.201:5000';

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const res = await fetch(`${address}/api/top`);
        if (res.ok) {
          const data = await res.json();
          setPoppular(data);
          console.log(data);
        }
      } catch (error) {
        console.error('Error fetching popular:', error);
      }
    };
  
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${address}/api/books`);
        if (res.ok) {
          const data = await res.json();
          setBooks(data);
          console.log(data);
        }
      } catch (error) {
        console.error('Error fetching Books:', error);
      }
    };
  
    fetchTop();
    fetchBooks();
  }, [address]); // Only re-run if 'address' changes

  const get_search_book =async (search:{search:string})=>{
    console.log(search)
    try {
      const res = await fetch(`${address}/api/search_recommanded`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(search)
      });
      if (res.ok) {
        const data = await res.json();
        setBooks(data);
        console.log(data);
      }
    } catch (error) {
      console.error('Error fetching Books:', error);
    }
  }

  const get_recommanded =async (search:{search:string})=>{
    console.log('recommanded',search)
    try {
      const res = await fetch(`${address}/api/recommand`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(search)
      });
      if (res.ok) {
        const data = await res.json();
        setRecommanded(data);
        console.log(data);
      }
    } catch (error) {
      console.error('Error fetching Books:', error);
    }
  }

  

  return (
    <context.Provider value={{ poppular:poppular, setPoppular:setPoppular,books:books,setBooks:setBooks,recommanded:recommanded,setRecommanded:setRecommanded,tab:tab,setTab:setTab,get_search_book:get_search_book,act_book:act_book,setAct:setAct,get_recommanded:get_recommanded}}>
      <Stack>
       <Stack.Screen name="(tabs)" options={{headerShown: false}} />
       <Stack.Screen name="book" options={{headerShown: false}} />
      </Stack>
    </context.Provider>
  ) ;
}
