import { useState } from "react";
import Context from './Context';

const Provider = ({ children }) => {
    const [userId, setUserId] = useState();
    const [userImage, setUserImage] = useState('');
    const [userToken, setUserToken] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userBirthday, setUserBirthday] = useState('');
    const [userIdPage, setUserIdPage] = useState(0);

    return (
        <Context.Provider value={{
            userId, 
            setUserId,
            userImage,
            setUserImage,
            userToken,
            setUserToken,
            userName,
            setUserName,
            userEmail,
            setUserEmail,
            userBirthday,
            setUserBirthday,
            userIdPage,
            setUserIdPage
        }}>
            {children}
        </Context.Provider>
    );
}

export default Provider;