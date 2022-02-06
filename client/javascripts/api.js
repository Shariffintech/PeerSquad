/*jshint esversion:8*/

class Api {

        static baseUrl = 'http://localhost:3000';
        static headers = {
          "Accept": "application/json",
          "Content-Type": "application/json"
          }
      
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

        static async patch(url, data) {
          const response = await fetch(Api.baseUrl + url, {
            method: "PATCH",
            headers: Api.headers,
            body: JSON.stringify(data)
          })
            const object = await response.json();
            return object;
        }

        // static async delete(url) {
          
          
        //   const response = await fetch(Api.baseUrl + , {
        //     method: "DELETE",
        //     headers: Api.headers
        //   })
        //   console.log(response);
        //     const object = await response.json();
        //     return object;
   
        // }
    }