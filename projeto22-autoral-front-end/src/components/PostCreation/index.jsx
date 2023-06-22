import { PostInfo, Form } from './layout';

export default function PostCreation({ type, toPost, cancelPost, image, setImage, video, setVideo }) {

    return (
        <>
            {type === 'Image' &&
                <Form onSubmit={toPost}>
                    <PostInfo>
                        <input onChange={(e) => setImage(e.target.value)} value={image} type="text" placeholder="Endereço da imagem"></input>
                    </PostInfo>
                    <div>
                        <div><button onClick={cancelPost}>Cancelar</button></div>
                        <div><button type="submit">Postar</button></div>
                    </div>
                </Form>}
            {type === 'Video' &&
                <Form onSubmit={toPost}>
                    <PostInfo>
                        <input onChange={(e) => setVideo(e.target.value)} value={video} type="text" placeholder="Endereço do vídeo"></input>
                    </PostInfo>
                    <div>
                        <div><button onClick={cancelPost}>Cancelar</button></div>
                        <div><button type="submit">Postar</button></div>
                    </div>
                </Form>}
        </>
    )
}