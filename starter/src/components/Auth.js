import AuthContext from '../store/authContext'
import axios from 'axios'
import { useState, useContext } from 'react'

const Auth = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [register, setRegister] = useState(true)
    const authCtx = useContext(AuthContext)

    const submitHandler = e => {
        e.preventDefault()

        const body = {
            username,
            password
        }

        const url = 'https://socialmtn.devmountain.com'

        axios.post(register ? `${url}/register` : `${url}/login`, body)
            .then(({ res, data }) => {
                console.log('AFTER AUTH', data)
                authCtx.login(res.data.token, res.data.exp, res.data.userId)
            })
            .catch(err => {
                setPassword('')
                setUsername('')
            })

        console.log('submitHandler called')
    }


    return (
        <main>
            <h1>Welcome!</h1>
            <form className='form auth-form' onSubmit={submitHandler}>

                <button className='form-btn'>
                    {register ? 'Sign Up' : 'Login'}
                </button>
                <input
                    type='text'
                    placeholder='username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className='form-input' />
                <input
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='form-input' />

                ...


            </form>
            <button className='form-btn'>Need to {register ? 'Login' : 'Sign Up'}?</button>
        </main>
    )
}

export default Auth