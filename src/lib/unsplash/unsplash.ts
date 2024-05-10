import axios from "axios";
export const getUnsplashImage = async (query: string) => {

const API_CLIENTID = process.env.NEXT_PUBLIC_API_CLIENTID;
const API_URL = `https://api.unsplash.com/search/photos?page=1&client_id=${API_CLIENTID}`;
try {
  const { data } = await axios.get(`${API_URL}&query=${query}`)
  console.log('unsplash data: ',data.results[0])
  return data.results[0].urls.small_s3;
} catch (error) {
  console.error
  return 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=8aae34cf35df31a592f0bef16e6342ef'
}
};
