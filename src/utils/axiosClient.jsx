import axios  from "axios";

const axiosClient = axios.create ( {
baseURL: import.meta.env.REACT_APP_API_URL,
timeout:10000,
headers:{ 'Content-type': 'application/json',
"Access-Control-Allow-Origin": "*"
}
});

export default axiosClient;