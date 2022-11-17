import axios from 'axios';
class PhoneService {
    constructor() {
      this.api = axios.create({
        baseURL: "http://localhost:5005/api"
      });
  
      // Automatically set JWT token in the headers for every request
      this.api.interceptors.request.use((config) => {
        // Retrieve the JWT token from the local storage
        const storedToken = localStorage.getItem("authToken");
  
        if (storedToken) {
          config.headers = { Authorization: `Bearer ${storedToken}` };
        }
  
        return config;
      });
    }
  
    // GET CURRENT USER (send user.username from context)
    getPhones() {
      return this.api.get()
    }

    getPhoneInfo(idPhone){
        return this.api.get(`/${idPhone}`)
    }
  }
  
  // Create one instance of the service
  const phoneService = new PhoneService();
  
  export default phoneService;