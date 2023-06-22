import { useContext, useRef, useState } from "react";
import { Form, Container, Title, Users } from "./layout";
import { AiOutlineSearch } from 'react-icons/ai';
import { findUsers } from "../../services/userApi";
import Context from '../../contexts/Context';
import { useNavigate } from "react-router-dom";

export default function SearchUser() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const { userToken, setUserIdPage } = useContext(Context);
    const userRef = useRef();
    const navigate = useNavigate();
    const token = userToken || localStorage.getItem('token');

    async function search(e) {
        e.preventDefault();

        const name = userRef.current.value
        try {
            setLoading(true);
            const users = await findUsers(token, name);
            setUsers(users);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <Title>Encontre seus amigos!</Title>
            <Form onSubmit={search}>
                <input ref={userRef} type="text" placeholder='Encontrar usuário'></input>
                <button type="submit">
                    <AiOutlineSearch color="#fff" size={20} />
                </button>
            </Form>
            {loading &&
            <Users>Procurando usuários...</Users>
            }
            {!loading && !users[0] && 
            <Users>Nenhum usuário encontrado =(</Users>
            }
            {!loading && users[0] && 
            <Users>
                {users?.map((u) => (
                    <div key={u.id} onClick={() => {
                        navigate(`/user/${u.id}`);
                        localStorage.setItem('userIdPage', u.id);
                        setUserIdPage(u.id)
                    }}>
                        <img src={u.image} alt="user_image" />
                        <h1>{u.name}</h1>
                    </div>
                ))}
            </Users>}
        </Container>
    )
}