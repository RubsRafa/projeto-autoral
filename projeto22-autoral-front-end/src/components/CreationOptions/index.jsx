import { CreationOptionsBox, Option, CreationBoxText, UserInfo, Form, Options } from './layout';
import PostCreation from "../PostCreation";
import { useContext, useState } from "react";
import Context from "../../contexts/Context";
import { sendPost } from '../../services/postApi';

import { toast } from "react-toastify";
import { IoIosVideocam } from 'react-icons/io';
import { BsImages } from 'react-icons/bs';
import { TbSend } from 'react-icons/tb';

export default function CreationOptions({ refresh, setRefresh }) {
    const { userImage, userToken } = useContext(Context);
    const [createPost, setCreatePost] = useState(false);
    const [type, setType] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [video, setVideo] = useState('');
    const token = userToken || localStorage.getItem('token')
    const userLogedImage = userImage || localStorage.getItem('userImage');
    

    function startCreateMode(choosen) {
        setCreatePost(true);
        setType(choosen);
    }

    function cancelPost() {
        setCreatePost(false);
    }

    async function toPost(e) {
        e.preventDefault();

        const videoRegex = /\.(mp4|mov|avi|wmv)$/i;
        const imageRegex = /\.(jpg|jpeg|png|gif|bmp|svg)$/i;

        let newType = 1;
        if (type === 'Image') newType = 2;
        if (type === 'Video') newType = 3;

        const newText = text !== '' ? text : null;
        const newImage = (image !== '' || imageRegex.test(image)) ? image : null;
        const newVideo = (video !== '' || videoRegex.test(video)) ? video : null;

        const body = {
            type: newType,
            video: newVideo,
            image: newImage,
            text: newText,
        }

        try {
            await sendPost(body, token);
            toast.success('Postado com sucesso! =)');
            cancelPost();
            setText('');
            setImage('');
            setVideo('');
            setType('');
            setRefresh(!refresh);
        } catch (e) {
            console.log(e);
            toast.error('Não foi possível postar! =(')
        }
    }

    return (
        <CreationOptionsBox>
            <CreationBoxText>
                <UserInfo>
                    <img src={userLogedImage} alt="user_image" />
                </UserInfo>
                <Form>
                    <input onChange={(e) => setText(e.target.value)} value={text} type="text" maxLength={300} placeholder="Comece um assunto amigável!"></input>
                </Form>
            </CreationBoxText>

            {!createPost && <Options>
                <Option onClick={() => startCreateMode('Image')}>
                    <BsImages color="#ffffff" size={30} />
                    <h1> Foto</h1>
                </Option>
                {/* <Option onClick={() => startCreateMode('Video')}>
                    <IoIosVideocam color="#ffffff" size={30} />
                    <h1> Vídeo</h1>
                </Option> */}
                <Option onClick={toPost}>
                    <TbSend color="#ffffff" size={30} />
                    <h1> Postar</h1>
                </Option>
            </Options>}

            {createPost &&
             <PostCreation 
             type={type} 
             toPost={toPost} 
             cancelPost={cancelPost}
             image={image}
             setImage={setImage}
             video={video}
             setVideo={setVideo}
             />
            }

        </CreationOptionsBox>
    )
}