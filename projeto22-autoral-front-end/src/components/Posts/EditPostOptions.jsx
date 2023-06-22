import { useContext } from 'react';
import { deleteUserPostApi } from '../../services/postApi';
import { Item } from './layout';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import Context from '../../contexts/Context';
import { toast } from 'react-toastify';
import { deleteRepostApi } from '../../services/repostApi';

export default function EditPostOptions({ postId, userReposted, userOwnThisPost, refresh, setRefresh }) {
    const { userToken } = useContext(Context);
    const token = userToken || localStorage.getItem('token');

    async function deletePost(postId) {
        try {
            await deleteUserPostApi(token, postId)
            setRefresh(!refresh);
        } catch (e) {
            console.log(e)
            toast.error('Não foi possível apagar seu post. Mais sorte na próxima!')
        } finally {
            toast.success('Post apagado com sucesso!')
        }
    }

    async function deleteRePost(postId) {
        try {
            await deleteRepostApi(token, postId)
            setRefresh(!refresh);
        } catch (e) {
            console.log(e)
            toast.error('Não foi possível apagar seu repost. Mais sorte na próxima!')
        } finally {
            toast.success('Repost apagado com sucesso!')
        }
    }
    return (
        <>
            <Item>
                <>
                    {userReposted &&
                        <div onClick={() => deleteRePost(postId)}>
                            <AiFillDelete color="#fff" size={15} />
                            <h1>Apagar repost</h1>
                        </div>}
                </>
                <>
                    {userOwnThisPost &&
                        <div onClick={() => deletePost(postId)}>
                            <AiFillDelete color="#fff" size={15} />
                            <h1>Apagar post</h1>
                        </div>}
                    {/* <div>
                        <AiFillEdit color="#fff" size={15} />
                        <h1>Editar post</h1>
                    </div> */}
                </>
            </Item>
        </>
    )
}
