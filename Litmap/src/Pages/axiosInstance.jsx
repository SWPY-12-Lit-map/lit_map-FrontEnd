import axios from 'axios';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'https://api.litmap.store/api',
  withCredentials: true, // 쿠키를 포함하여 요청
});

axiosInstance.interceptors.request.use((config) => {
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [name, value] = cookie.split('=');
    acc[name] = value;
    return acc;
  }, {});
  const litmapEmail = cookies['litmapEmail'];
  if (litmapEmail) {
    config.headers['Authorization'] = `Bearer ${litmapEmail}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
