import { useNavigate } from "react-router-dom";
import { RepostBox, RepostInfo } from "./layout";
import EditPostOptions from "./EditPostOptions";

export default function RepostedComponent({ p, setUserIdPage, openEdit, openEditBox, userLoggedId, refresh, setRefresh }) {
    const navigate = useNavigate();
    return (
        <>
            <RepostBox>
                <RepostInfo onClick={() => {
                    navigate(`/user/${p.repostedById}`);
                    setUserIdPage(p.repostedById);
                    localStorage.setItem('userIdPage', p.repostedById)
                }}>
                    <img src={p.repostedByImage} alt="image_user_reposted" />
                    <h1>{p.repostedByName}</h1><h2>repostou isso</h2>
                </RepostInfo>
                {(p.repostedById === Number(userLoggedId) || p.userId === Number(userLoggedId)) &&
                    <button onClick={() => openEdit(p.id)}>•••</button>
                }
                {(openEditBox.includes(p.id)) &&
                    <EditPostOptions
                        postId={p.id}
                        userReposted={p.repostedById === Number(userLoggedId)}
                        userOwnThisPost={p.userId === Number(userLoggedId)}
                        refresh={refresh}
                        setRefresh={setRefresh}
                    />

                }
            </RepostBox>
        </>

    )
}