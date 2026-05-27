import { useEffect, useState } from "react";

export default function Applications(){
    const [applications, setApplications] = useState([])
    useEffect(()=>{
        const fetchApplication = async () =>{
        try{
            const response = await fetch('http://localhost:3000/applications',{
                method:'GET',
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.ok != true){
                throw new Error('Failed request')
            }
            const data = await response.json()
            setApplications(data)
            console.log(data)
        }catch(error){
            console.error('database error', error)
        }
        }
        fetchApplication()
    },[])


    return (
        <div>
            {applications.map((application)=>(
                <div key={application.id}>
                    <p>{application.company}</p>
                    <p>{application.position}</p>
                </div>
            ))}
        </div>
    );
}