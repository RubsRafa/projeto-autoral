import { PostInfo,  } from "./layout";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { BsStars } from 'react-icons/bs';
import UsersLikeInfo from "./UsersLikeInfo";

export default function PostInfoComponent({ setShowLikes, p, openComment, showLikes, allLikes }) {

    return (

        <PostInfo>
            <div onClick={() => setShowLikes(!showLikes)}>
                <BsStars color="yellow" />
                <h1 id={`users_like${p.id}`}>{p.Likes.length} pessoas</h1>
            </div>
            <div onClick={() => { openComment(p.id) }}>
                <h1>{p.Comments.length} comentários</h1>
            </div>

            <ReactTooltip
                anchorSelect={`#users_like${p.id}`}
                place="left"
                size={30}
                content={
                    <ul>
                        {allLikes.map((u, i) => {
                            if (u.postId === p.id) {
                                return (
                                    <li key={i}>
                                        <UsersLikeInfo userName={u.Users.name} />
                                    </li>
                                )
                            }
                        })
                        }
                    </ul>
                }
            />

        </PostInfo>

    )
}