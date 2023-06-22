import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box } from "../../styles/SignComponentsLayout";
import { signUp } from "../../services/authApi";

export default function SignUpComponent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState('');
    const [birthday, setBirthday] = useState();
    const imageRegex = /\.(jpg|jpeg|png|gif)$/i;
    let defaultImage = 'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png';
    const navigate = useNavigate();

    async function register(e) {
        e.preventDefault();
        
        let formatDate;
        if (birthday) {
            const parts = birthday.split('-');

            const day = parseInt(parts[2]);
            const month = parseInt(parts[1]);
            const year = parseInt(parts[0]);

            const date = new Date(year, month - 1, day);
            formatDate = date.toISOString();
        }

        if (password !== confirmPassword) {
            toast.error('As senhas devem ser iguais!')
        } else {
            const updatedImage = image !== '' ? image : defaultImage;
            const body = (birthday) ? {
                name,
                email,
                password,
                image: updatedImage,
                birthday: formatDate,
            } : {
                name,
                email,
                password,
                image: updatedImage
            }


            try {
                await signUp(body);
                toast.success('Cadastro feito com sucesso! Redirecionando para o login.')
                navigate('/')
            } catch (e) {
                console.log(e)
                toast.error('Não foi possível fazer o cadastro!')
            }
        }
    }

    return (
        <Box>
            <img src={imageRegex.test(image) ? image : defaultImage} alt="user_image" />
            <h1>Sign up</h1>
            <h2>Crie uma conta</h2>

            <form onSubmit={register}>
                <input autoComplete="off" name='name' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} type="text" required></input>
                <input autoComplete="off" name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} type="text" required></input>
                <input autoComplete="off" name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} type="password" required></input>
                <input autoComplete="off" name='confirmPassword' placeholder='Confirm password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="password" required></input>
                <input autoComplete="off" name='image' placeholder='Image' onChange={(e) => { setImage(e.target.value) }} value={image} type="text"></input>
                <input autoComplete="off" name='birthday' placeholder='Birthday' onChange={(e) => setBirthday(e.target.value)} value={birthday} format='dd-MM' type="date"></input>
                <button type="submit">Cadastre-se!</button>
            </form>
            <h3 onClick={() => navigate('/')}>Já está cadastrado? Faça o login!</h3>
        </Box>
    )
}
