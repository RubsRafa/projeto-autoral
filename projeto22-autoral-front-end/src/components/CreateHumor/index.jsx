import { useContext, useRef, useState } from "react";
import { ColorPicker, CreationBox, Pickers, TextInput } from "./layout";
import { BiLaugh, BiMeh, BiSad, BiSmile, BiTired } from "react-icons/bi";
import { postUserHumorDiary } from "../../services/healthApi";
import Context from "../../contexts/Context";
import { toast } from "react-toastify";

export default function CreateHumor({ refresh, setRefresh}) {
    const humorColorRef = useRef();
    const [mood, setMood] = useState(3);
    const textRef = useRef();
    const color = "#fff";
    const size = 35;
    const { userToken, userImage } = useContext(Context);
    const token = userToken || localStorage.getItem('token');
    const image = userImage || localStorage.getItem('userImage')

    async function saveMood() {
        try {
            const body = {
                text: textRef.current.value,
                color: humorColorRef.current.value,
                mood,
            }
            await postUserHumorDiary(token, body);
            setRefresh(!refresh)
        } catch (e) {
            console.log(e);
            toast.error('Seu sentimento não foi aceito! Tente novamente mais tarde. Ou não.')
        } finally {
            setMood(3)
            toast.success('Sentimento adicionado com sucesso! >.<')
        }
    }

    return (
        <CreationBox>
            <div>
                <img src={image} alt="user_image" />
                <TextInput autoComplete="off" ref={textRef} placeholder="Eu estou..."></TextInput>
            </div>
            <Pickers>
                <div>
                    <h1>Escolha uma cor para o seu humor</h1>
                    <ColorPicker autoComplete="off" ref={humorColorRef} type="color"></ColorPicker>
                </div>
                <div>
                    <h1>Escolha uma carinha</h1>
                    <BiTired onClick={() => setMood(1)} color={color} size={mood !== 1 ? size : 40} />
                    <BiSad onClick={() => setMood(2)} color={color} size={mood !== 2 ? size : 40} />
                    <BiMeh onClick={() => setMood(3)} color={color} size={mood !== 3 ? size : 40} />
                    <BiSmile onClick={() => setMood(4)} color={color} size={mood !== 4 ? size : 40} />
                    <BiLaugh onClick={() => setMood(5)} color={color} size={mood !== 5 ? size : 40} />
                </div>
                <div>
                    <button onClick={() => saveMood()}>Salvar</button>
                </div>
            </Pickers>
        </CreationBox>
    )
}