class Api {
        static baseUrl() { 
            return 'http://localhost:3000/'; 
        }
        static headers() {
                return {
                    headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                    }
                }
        }

        // static baseUrl = 'http://localhost:3001';
        // static headers = {
        //   "Accept": "application/json",
        //   "Content-Type": "application/json"
        // }
      
        static async get(url) {
            const response = await fetch(Api.baseUrl + url);
            const data = await response.json();
            return data;
          }
        
        static async post(url, data) {
          const response = await fetch(Api.baseUrl + url, {
            method: "POST",
            headers: Api.headers,
            body: JSON.stringify(data)
          })
            const object = await response.json();
            return object;
        }
    }