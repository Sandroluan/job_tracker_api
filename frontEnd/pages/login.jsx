import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async () => {
        //console.log(email, password)
        try{
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })
            if(response.ok != true){
                throw new Error('Login failed')
            }
            const data = await response.json()
            //console.log(data)
            localStorage.setItem('token', data.token)
            navigate('/applications')
        }catch(error){
            console.error('Login failed:', error)
        }
    }

    const handleRegister = async () =>{
        if(!email || !password){
                throw new Error ('missing fields')
            }
        try{
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })
            if(response.ok != true){
                throw new Error('register error')
            }
            const data = await response.json()
            console.log(data)
            navigate('/')
            setEmail('')
            setPassword('')
        }catch(error){
            console.error('register error', error)
        }
    }

    return (
        <div>
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Cadastro</button>
        </div>
    );
}