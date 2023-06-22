import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signIn } from "../../services/authApi";
import { Box } from "../../styles/SignComponentsLayout";
import Context from "../../contexts/Context";

export default function SignInComponent() {
    const { setUserImage, setUserToken, setUserName, setUserBirthday, setUserId, setUserEmail } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
    }, [])

    async function login(e) {
        e.preventDefault();

        const body = {
            email,
            password,
        }

        try {
            localStorage.clear();
            const data = await signIn(body);
            
            localStorage.setItem('userImage', data.info.image);
            localStorage.setItem('userName', data.info.name);
            localStorage.setItem('userId', data.info.userId);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userBirthday', data.info.birthday)
            localStorage.setItem('userEmail', data.info.email)
            setUserToken(data.token);
            setUserImage(data.info.image);
            setUserName(data.info.name);
            setUserBirthday(data.info.birthday)
            setUserId(data.info.userId)
            setUserEmail(data.info.email)
            
            toast.success('Login feito com sucesso! Divirta-se! =)')
            navigate('/feed')
        } catch (e) {
            console.log(e)
            toast.error('Não foi possível logar! =(')
        }
    }

    return (
        <Box>
            <img src="https://img.freepik.com/vetores-premium/coracao-de-neon-rosa-para-dia-dos-namorados-em-fundo-preto-brickwall-logo-neon_599062-85.jpg" alt="logo_image" />
            <h1 margin={'20px'}>Sign in</h1>
            <h2>Junte-se aos seus amigos e venha se divertir!</h2>

            <form onSubmit={login}>
                <input autoComplete="off" name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} type="text" required></input>
                <input autoComplete="off" name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} type="password" required></input>
                <button type="submit">Logar</button>
            </form>
            <h3 onClick={() => navigate('/sign-up')}>Ainda não está cadastrado? Faça o cadastro!</h3>
        </Box>
    )
}