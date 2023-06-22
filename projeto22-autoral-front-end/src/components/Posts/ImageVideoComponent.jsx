import { MainImageVideoBox } from './layout';

export default function ImageComponent({ p }) {
    return (
        <MainImageVideoBox>
            {(p.image && !p.video) &&
                <img src={p.image} alt="post_image" />
            }
            {(p.video && !p.image) &&
                <video src={p.video} alt="post_video"></video>
            }
        </MainImageVideoBox>
    )
}