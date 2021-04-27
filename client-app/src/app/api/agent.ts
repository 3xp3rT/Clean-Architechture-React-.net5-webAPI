import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';
axios.defaults.baseURL='http://localhost:5000';
const responseBody=<T>(response:AxiosResponse<T>)=> response.data;

const sleep=(delay:number)=>{
return new Promise((resolve)=>{
setTimeout(resolve,delay)

})
}

axios.interceptors.response.use(async response =>{
 try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})
const request ={
    get:<T>(url:string)=>axios.get<T>(url).then(responseBody),
    post:<T>(url:string,body:{})=>axios.post<T>(url,body).then(responseBody),
    put:<T>(url:string,body:{})=>axios.put<T>(url,body).then(responseBody),
    del:<T>(url:string)=>axios.delete<T>(url).then(responseBody)
}
const Activites={
list:()=>request.get<Activity[]>('/activites'),
details:(id:string)=> request.get<Activity>(`/activites/${id}`),
create:(activity:Activity)=>axios.post<void>(`/activites`,activity),
update:(activity:Activity)=>axios.put<void>(`/activites/${activity}`,activity),
delete:(id:string)=>axios.delete<void>(`/activites/${id}`)
}
const agent={
    Activites
}
export default agent;