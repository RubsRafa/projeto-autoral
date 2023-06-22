import { useContext, useEffect, useRef, useState } from "react";
import { getChatMessagesApi, getChatUsersApi, postChatMessagesApi } from "../../services/chatApi";
import { ChatComponentBox, Me, Messages, OtherUser, UserBar, H1, H2, TypeMessage } from "./layout";
import { RiSendPlaneFill } from 'react-icons/ri';
import Context from "../../contexts/Context";

export default function ChatComponent({ chatId }) {
    const [messages, setMessages] = useState([]);
    const { userToken, userId } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const token = userToken || localStorage.getItem('token');
    const userLogged = userId || localStorage.getItem('userId');
    const userChat = chatId || localStorage.getItem('chatUserId');
    const [userInfo, setUserInfo] = useState();
    const [input, setInput] = useState('');
    const messageRef = useRef();

    async function getMessages() {
        try {
            setLoading(true);
            const texts = await getChatMessagesApi(token, userChat);
            setMessages(texts);
            const user = await getChatUsersApi(token);
            setUserInfo(user.filter((u) => u.user.id === userChat)[0]);
        } catch (e) {
            console.log;
        } finally {
            setLoading(false);
        }
    }

    async function sendMessages() {
        try {
            const body = {
                message: messageRef.current.value,
                toId: userChat
            }
            await postChatMessagesApi(token, body)
        } catch (e) {
            console.log(e)
        } finally {
            setInput('');
            getMessages();
        }
    }

    useEffect(() => {
        getMessages();
    }, [userChat])
    return (
        <ChatComponentBox>
            <UserBar>
                {userInfo &&
                    <>
                        <img src={userInfo.user.image} alt="user_image" />
                        <h1>{userInfo.user.name}</h1>
                    </>
                }
            </UserBar>
            {!messages[0] && (
                <Messages>
                    Comece a conversa!
                </Messages>
            )}
            {!loading &&
                <Messages>
                    {messages?.map((m) => (
                        <>
                            {(m.fromId === userLogged || m.toId === userChat) &&
                                <Me key={m.id}>
                                    <H1>{m.message}</H1>
                                    <H2>{m.time.slice(11, 13)}:{m.time.slice(14, 16)}</H2>
                                </Me>
                            }
                            {(m.toId === userLogged || m.fromId === userChat) &&
                                <OtherUser key={m.id}>
                                    <h1>{m.message}</h1>
                                    <h2>{m.time.slice(11, 13)}:{m.time.slice(14, 16)}</h2>
                                </OtherUser>
                            }
                        </>
                    ))}
                </Messages>}
            <TypeMessage>
                <textarea onChange={(e) => setInput(e.target.value)} value={input} autoComplete="off" ref={messageRef} placeholder="Mensagem..."></textarea>
                <button onClick={sendMessages}>
                    <RiSendPlaneFill color="#fff" size={30} />
                </button>
            </TypeMessage>
        </ChatComponentBox>
    )
}