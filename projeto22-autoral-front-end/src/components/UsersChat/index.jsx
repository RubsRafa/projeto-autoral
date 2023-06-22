import { useContext, useEffect, useState } from "react";
import { Title, Users, UsersChatBox } from "./layout";
import Context from "../../contexts/Context";
import { getChatUsersApi } from "../../services/chatApi";

export default function UsersChat({ setChatId }) {
    const [users, setUsers] = useState([]);
    const { userToken } = useContext(Context);
    const token = userToken || localStorage.getItem('token');

    async function getUsers() {
        try {
            const chatUsers = await getChatUsersApi(token);
            setUsers(chatUsers);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <UsersChatBox>
            <Title>Converse com seus amigos!</Title>
            {!users[0] &&
                <>
                    <h1>Você ainda não segue ninguém...</h1>
                    <span>Siga seus amigos para conversar com eles</span>
                </>
            }
            {users.map((u) => (
                <Users onClick={() => {
                    setChatId(u.user.id);
                    localStorage.setItem('chatUserId', u.user.id)
                }} key={u.user.id}>
                    <div>
                        <img src={u.user.image} alt="user_image" />
                    </div>
                    <div>
                        <h1>{u.user.name}</h1>
                        <h2>{u.message}</h2>
                    </div>
                </Users>
            ))}
        </UsersChatBox>
    )
}