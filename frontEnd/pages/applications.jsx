import { useEffect, useState } from "react";

export default function Applications(){
    const [applications, setApplications] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [company, setCompany] = useState('')
    const [position, setPosition] = useState('')
    const [status, setStatus] = useState('applied')

    const fetchApplication = async () =>{
        try{
            const response = await fetch('http://localhost:3000/applications',{
                method:'GET',
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
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

    useEffect(()=>{
        fetchApplication()
    },[])

        const handleAssignement = async () =>{
            try{
                const response = await fetch('http://localhost:3000/applications',{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({company, position, status })
                })
                if(response.ok != true){
                    throw new Error ("Failed request")
                }
                await fetchApplication()
                setIsModalOpen(false)
                setCompany('')
                setPosition('')
                setStatus('applied') 
            }catch{
                console.error({error:"Failed to add"})
            }
        }


    return (
        <div>
            {applications.map((application)=>(
                <div key={application.id}>
                    <p>{application.company}</p>
                    <p>{application.position}</p>
                </div>
            ))}
            <button onClick={()=>setIsModalOpen(true)}>New assignment</button>
            {isModalOpen &&  <div>
                    <label htmlFor="company">Company</label>
                    <input 
                        type="text" 
                        value={company} 
                        onChange={(e)=>{setCompany(e.target.value)}}
                    />

                    <label htmlFor="company">Position</label>
                    <input 
                        type="text" 
                        value={position} 
                        onChange={(e)=>{{setPosition(e.target.value)}}}
                    />

                    <select 
                        value = {status}    
                        onChange={(e)=>{setStatus(e.target.value)}}>
                        <option value="" disabled selected>status</option>
                        <option value="applied">applied</option>
                        <option value="interview">interview</option>
                        <option value="rejected">rejected</option>
                    </select>
                    <button onClick={handleAssignement}>Add</button>
                </div>}
        </div>
    );
}