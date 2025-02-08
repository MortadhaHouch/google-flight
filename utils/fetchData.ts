import { Dispatch, SetStateAction } from "react";

export default async function fetchData(url:string,setIsLoading:Dispatch<SetStateAction<boolean>>,extraHeaders?:object|null){
    try {
        setIsLoading(true)
        const request = await fetch(url,{
            headers:{
                'Content-Type':'application/json',
                ...extraHeaders
            }
        })
        const data = await request.json();
        setIsLoading(false);
        return data;
    } catch (error) {
        setIsLoading(false);
        console.log(error);
    }finally{
        setIsLoading(false);
    }
}