import { Bar, Box, Options } from './layout';
import { BiUser } from 'react-icons/bi';
import { FaUserFriends, FaGamepad } from 'react-icons/fa';
import { RiMentalHealthFill } from 'react-icons/ri';
import { AiOutlineLogout, AiFillHome, AiFillMessage } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "../../contexts/Context";

export default function NavBar() {
    const navigate = useNavigate();
    const { userId, setUserIdPage } = useContext(Context);
    const id = localStorage.getItem('userId') || userId;
    const color = '#fff';
    const size = 30;
    return (
        <Bar>
            <Box>
                <Options onClick={() => {
                    navigate(`/feed`);
                }}>
                    <AiFillHome color={color} size={size} />
                </Options>
                <h1>Feed</h1>
            </Box>

            <Box>
                <Options onClick={() => {
                    navigate(`/user/${id}`);
                    setUserIdPage(id);
                    localStorage.setItem('userIdPage', id)
                }}>
                    <BiUser color={color} size={size} />
                </Options>
                <h1>Você</h1>
            </Box>

            <Box>
                <Options onClick={() => {
                    navigate('/find');
                }}>
                    <FaUserFriends color={color} size={size} />
                </Options>
                <h1>Amigos</h1>
            </Box>

            <Box>
                <Options onClick={() => {
                    navigate('/chat')
                }}>
                    <AiFillMessage color={color} size={size} />
                </Options>
                <h1>Chat</h1>
            </Box>

            <Box>
                <Options onClick={() => {
                    navigate('/health');
                }}>
                    <RiMentalHealthFill color={color} size={size} />
                </Options>
                <h1>Diário</h1>
            </Box>
            {/* <Options>
                <FaGamepad color={color} size={size} />
            </Options> */}

            <Box>
                <Options onClick={() => {
                    navigate('/');
                    localStorage.clear();
                }}>
                    <AiOutlineLogout color={color} size={size} />
                </Options>
                <h1>Sair</h1>
            </Box>
        </Bar>
    )
}