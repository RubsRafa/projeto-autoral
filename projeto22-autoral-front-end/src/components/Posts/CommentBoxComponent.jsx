import { useNavigate } from 'react-router-dom';
import { CommentBox, UserComment } from './layout';
import { getComments } from '../../services/commentApi';
import { useContext, useEffect, useState } from 'react';
import Context from '../../contexts/Context';

export default function CommentBoxComponent({ setUserIdPage, refresh, p }) {
    const [comments, setComments] = useState([]);
    const { userToken } = useContext(Context);
    const token = userToken || localStorage.getItem('token');
    const navigate = useNavigate();

    async function fetchData() {
        try {
            const allComments = await getComments(token);
            setComments(allComments);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchData();
    },[refresh])
    return (
        <CommentBox>
            {comments.map((c) => {
                if (c.postId === p.id) {
                    return (
                        <UserComment key={c.id}>
                            <img onClick={() => {
                                navigate(`/user/${c.Users.id}`);
                                setUserIdPage(c.Users.id);
                                localStorage.setItem('userIdPage', c.Users.id)
                            }} src={c.Users.image} alt="image_user_comment" />
                            <div>
                                <h1 onClick={() => {
                                    setUserIdPage(c.Users.id);
                                    localStorage.setItem('userIdPage', c.Users.id)
                                    navigate(`/user/${c.Users.id}`);
                                }}>{c.Users.name}<span>{c.createdAt >= c.updatedAt
                                    ? ` • ${c.createdAt.slice(11, 16)} • ${c.createdAt.slice(8, 10)}/${c.createdAt.slice(5, 7)}/${c.createdAt.slice(0, 4)}`
                                    : ` • $${c.updatedAt.slice(11, 16)} • ${c.updatedAt.slice(8, 10)}/${c.updatedAt.slice(5, 7)}/${c.updatedAt.slice(0, 4)}`}</span></h1>
                                <h2>{c.comment}</h2>
                            </div>
                        </UserComment>
                    )
                }
            })}
        </CommentBox>
    )
}