import axios from 'axios';
import { response } from 'express';

const url ='http://localhost:5000/api/states_total';

class Service{


    static getStatesWiseTotalCount(){
        return axios.get(url).then(response=>{
            return response.data
        });
        /*return new Promise(async (resolve,reject)=>{
            try{
                const res=await axios.get(url);
                const data=res.data;
                resolve(
                    data.map(s =>({
                        ...s,
                        createdAt:new Date(s.Last_Updated_Time)
                    }))
                );

            }catch(err){
                reject(err);
            }
        });
        */
    }
}

export default Service;