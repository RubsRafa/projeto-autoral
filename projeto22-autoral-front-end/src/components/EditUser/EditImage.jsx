import { useContext, useState } from "react";
import { EditBox, Input } from "./layout";
import { toast } from "react-toastify";
import { editUser } from "../../services/userApi";
import Context from '../../contexts/Context';

export default function EditImage({ setEditImage, setRefresh, refresh }) {
  const [image, setImage] = useState();
  const { userToken } = useContext(Context);
  const token = userToken || localStorage.getItem('token');

  async function edit(e) {
    e.preventDefault();

    const body = {
      image,
    }
    try {
      await editUser(token, body);
      setEditImage(false);
      setRefresh(!refresh);
      localStorage.removeItem('userImage')
      localStorage.setItem('userImage', image)
    } catch (e) {
      console.log(e);
      setEditImage(false);
      toast.error('Não foi possível alterar sua imagem. =( Tente novamente mais tarde')
    }
  }

    return (
        <EditBox image={'none'} onSubmit={edit}>
            <Input onChange={(e) => setImage(e.target.value)} value={image} type="text" placeholder="Endereço da nova foto" autoComplete="off"></Input>
            <div>
                <button type="submit">Alterar</button>
                <button onClick={() => setEditImage(false)}>Cancelar</button>
            </div>
        </EditBox>
    )
}