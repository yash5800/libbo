import axios from 'axios';

export const getRec = async()=>{
   axios.get('http://192.168.74.201:5000/api/top')
   .then((response) => {
     return response.data;
   })
   .catch((error) => {
     console.error('Error fetching recommendations:', error);
   })
}