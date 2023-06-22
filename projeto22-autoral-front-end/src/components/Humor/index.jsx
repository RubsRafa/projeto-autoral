import { useContext, useEffect, useRef, useState } from "react";
import { HumorBox } from "./layout";
import { BiLaugh, BiMeh, BiSad, BiSmile, BiTired } from "react-icons/bi";
import { FiTrash, FiEdit2 } from 'react-icons/fi'
import { deleteUserHumorDiary, getUserHumorDiary, putUserHumorDiary } from "../../services/healthApi";
import Context from "../../contexts/Context";
import { toast } from "react-toastify";

export default function Humor({ refresh }) {
    const [humors, setHumors] = useState([]);
    const [edit, setEdit] = useState([]);
    const [loading, setLoading] = useState(false);
    const { userToken } = useContext(Context);
    const newText = useRef();
    const token = userToken || localStorage.getItem('token');
    const color = '#fff';
    const size = 30;

    useEffect(() => {
        fetchData();
    }, [refresh])

    async function fetchData() {
        try {
            setLoading(true);
            const diary = await getUserHumorDiary(token);
            setHumors(diary);
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    }

    async function deleteItem(id) {
        try {
            await deleteUserHumorDiary(token, id);
        } catch (e) {
            console.log(e);
        } finally {
            toast.success('Item deletado com sucesso.');
            fetchData();
        }
    }

    function openToEdit(i) {
        setEdit((prevOpenToEdit) => {
            if (prevOpenToEdit.includes(i)) {
                return []
            } else {
                return [i];
            }
        });
    }

    async function changeHumorText(id) {
        try {
            const body = {
                id,
                text: newText.current.value,
            }
            await putUserHumorDiary(token, body);
        } catch (e) {
            console.log(e);
            toast.error('Hmmm... Deu errim..')
        } finally {
            toast.success('Alterado com sucesso!');
            setEdit([]);
            fetchData();
        }
    }

    return (
        <>
            {loading && <h1>Carregando seu diário...</h1>}
            {!loading && humors[0] &&
                <>
                    {humors.map((h) => (
                        <HumorBox key={h.id} color={h.color}>
                            <div>
                                {h.mood === 1 && <BiTired color={color} size={size} />}
                                {h.mood === 2 && <BiSad color={color} size={size} />}
                                {h.mood === 3 && <BiMeh color={color} size={size} />}
                                {h.mood === 4 && <BiSmile color={color} size={size} />}
                                {h.mood === 5 && <BiLaugh color={color} size={size} />}
                                {edit.includes(h.id) ?
                                    <>
                                        <input ref={newText} placeholder="Na verdade, eu estava..."></input>
                                        <button onClick={() => changeHumorText(h.id)} >Atualizar</button>
                                    </>
                                    :
                                    <>
                                        {h.text && <h1>{h.text}</h1>}
                                    </>
                                }
                            </div>
                            <div>
                                <h1>
                                    {h.date.slice(8, 10)}/{h.date.slice(5, 7)}/{h.date.slice(2, 4)}
                                </h1>
                                <div onClick={() => deleteItem(h.id)}><FiTrash /></div>
                                <div onClick={() => openToEdit(h.id)}><FiEdit2 /></div>
                            </div>

                        </HumorBox>
                    ))}
                </>
            }
        </>
    )
}
