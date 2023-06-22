import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Title, UserInfoBox, Box, BoxFollowers, ImageBox, NameBox, BirthdayBox, EmailBox, PasswordBox } from "./layout";
import Context from "../../contexts/Context";
import { AiFillEdit } from "react-icons/ai";
import EditImage from "../EditUser/EditImage";
import EditName from "../EditUser/EditName";
import EditEmail from '../EditUser/EditEmail';
import EditPassword from '../EditUser/EditPassword';
import EditBirthday from '../EditUser/EditBirthday';
import { followUser, getFollows, unfollowUser } from "../../services/followsApi";
import { toast } from "react-toastify";
import { getUserInfoApi } from "../../services/userApi";

export default function UserInfo({ id, refresh, setRefresh }) {
    const navigate = useNavigate();
    const { userId, userToken, setUserIdPage } = useContext(Context);
    const userIdLogged = Number(userId) || Number(localStorage.getItem('userId'));
    const [userInfo, setUserInfo] = useState();
    const [editImage, setEditImage] = useState(false);
    const [editName, setEditName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [editBirthday, setEditBirthday] = useState(false);
    const [follow, setFollow] = useState(false);
    const [userFollows, setUserFollows] = useState();
    const [hasFollows, setHasFollows] = useState(0);
    const token = userToken || localStorage.getItem('token');

    async function getUserFollows() {
        try {
            const getUserInfo = await getUserInfoApi(token, id);
            setUserInfo(getUserInfo);

            const follows = await getFollows(token, id);
            const isMyFollow = await getFollows(token, userIdLogged);
            setFollow(isMyFollow.find((f) => f.userId === userIdLogged))
            setUserFollows(follows);
            setHasFollows(follows.length);
        } catch (e) {
            console.log(e);
            toast.error('Não foi possível carregar quem esse usuário segue.')
        }
    }

    async function startFollowing(userIdIFollow) {
        const body = {
            userIdIFollow
        }
        try {
            await followUser(token, body);
            getUserFollows();
        } catch (e) {
            console.log(e);
            toast.error('Não foi possível seguir esse usuário! Tente novamente mais tarde.')
        }
    }

    async function stopFollowing(followId) {
        try {
            await unfollowUser(token, followId);
            getUserFollows();
        } catch (e) {
            console.log(e);
            toast.error('Não foi possível deixar de seguir esse usuário! Tente novamente mais tarde.')
        }
    }

    useEffect(() => {
        getUserFollows();
    }, [refresh])

    return (

        <>
            {(userInfo && userIdLogged !== userInfo.id) &&
                <UserInfoBox>
                    <Box onClick={() => navigate('/feed')}>Voltar para a timeline</Box>
                    {userInfo && <Box>
                        <img src={userInfo.image} alt="user_image_page" />
                        <h1>{userInfo.name}</h1>
                        {userInfo.birthday && <h2>birthday: {userInfo.birthday.slice(8, 10)}/{userInfo.birthday.slice(5, 7)}/{userInfo.birthday.slice(0, 4)}</h2>}

                        {follow &&
                            <button onClick={() => stopFollowing(follow.id)}>Unfollow</button>
                        }

                        {!follow &&
                            <button onClick={() => startFollowing(userInfo.id)}>Follow</button>
                        }


                    </Box>}
                    <BoxFollowers>
                        {hasFollows === 0 &&
                            <h2>Esse user ainda não segue ninguém.</h2>
                        }
                        {hasFollows !== 0 &&
                            <>
                                <h2>Quem esse user segue</h2>
                                {userFollows?.map((u, i) =>
                                    <div key={i} onClick={() => {
                                        navigate(`/user/${u.userIdIFollow}`);
                                        setRefresh(!refresh);
                                        setUserIdPage(u.userIdIFollow);
                                        localStorage.setItem('userIdPage', u.userIdIFollow)
                                    }}>
                                        <img src={u.userImage} alt="user_image_page" />
                                        <h1>{u.userName}</h1>
                                    </div>
                                )}
                            </>
                        }
                    </BoxFollowers>
                </UserInfoBox>}

            {(userInfo && userIdLogged === userInfo.id) &&
                <UserInfoBox>
                    <Box onClick={() => navigate('/feed')}>Voltar para a timeline</Box>
                    {userInfo && <Box>
                        <Title>Você</Title>

                        {editImage ?
                            <EditImage refresh={refresh} setRefresh={setRefresh} setEditImage={setEditImage} />
                            :
                            <ImageBox onClick={() => setEditImage(true)}>
                                <img src={userInfo.image} alt="user_image_page" />
                            </ImageBox>}

                        {editName ?
                            <EditName refresh={refresh} setRefresh={setRefresh} setEditName={setEditName} />
                            :
                            <NameBox onClick={() => setEditName(true)}>
                                <h1>{userInfo.name}</h1>
                            </NameBox>}

                        {editEmail ?
                            <EditEmail refresh={refresh} setRefresh={setRefresh} setEditEmail={setEditEmail} />
                            :
                            <EmailBox onClick={() => setEditEmail(true)}>
                                <h1>{userInfo.email}</h1>
                            </EmailBox>}

                        {editPassword ?
                            <EditPassword refresh={refresh} setRefresh={setRefresh} setEditPassword={setEditPassword} />
                            :
                            <PasswordBox onClick={() => setEditPassword(true)}>
                                <h1>Mudar senha <AiFillEdit /></h1>
                            </PasswordBox>}

                        {editBirthday ?
                            <EditBirthday refresh={refresh} setRefresh={setRefresh} setEditBirthday={setEditBirthday} />
                            :
                            <BirthdayBox onClick={() => setEditBirthday(true)}>
                                {userInfo.birthday && <h1>{userInfo.birthday.slice(8, 10)}/{userInfo.birthday.slice(5, 7)}/{userInfo.birthday.slice(0, 4)}</h1>}
                                {!userInfo.birthday && <h1>Adicionar data de aniversário</h1>
                                }
                            </BirthdayBox>}

                    </Box>}
                    <BoxFollowers>
                        {hasFollows === 0 &&
                            <h2>Você ainda não segue ninguém.</h2>
                        }
                        {hasFollows !== 0 &&
                            <>
                                <h2>Você segue</h2>
                                {userFollows?.map((u, i) =>
                                    <div key={i} onClick={() => {
                                        navigate(`/user/${u.userIdIFollow}`);
                                        setRefresh(!refresh);
                                        setUserIdPage(u.userIdIFollow);
                                        localStorage.setItem('userIdPage', u.userIdIFollow)
                                    }}>
                                        <img src={u.userImage} alt="user_image_page" />
                                        <h1>{u.userName}</h1>
                                    </div>
                                )}
                            </>
                        }
                    </BoxFollowers>
                </UserInfoBox>}
        </>
    )
}