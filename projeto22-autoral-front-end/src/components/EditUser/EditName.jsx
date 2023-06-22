import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { EditBox, Input } from "./layout";
import { editUser } from "../../services/userApi";
import Context from '../../contexts/Context';

export default function EditName({ setEditName, setRefresh, refresh }) {
  const [name, setName] = useState();
  const { userToken } = useContext(Context);
  const token = userToken || localStorage.getItem('token');

  async function edit(e) {
    e.preventDefault();
   
    const body = {
      name,
    }
    try {
      await editUser(token, body);
      setEditName(false);
      setRefresh(!refresh);
      localStorage.removeItem('userName')
      localStorage.setItem('userName', name)
    } catch (e) {
      console.log(e);
      setEditName(false);
      toast.error('Não foi possível alterar seu nome de usuário. =( Tente novamente mais tarde')
    }
  }  
  
  return (
        <EditBox onSubmit={edit}>
            <Input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Alterar nome" autoComplete="off"></Input>
            <div>
                <button type="submit">Alterar</button>
                <button onClick={() => setEditName(false)}>Cancelar</button>
            </div>
        </EditBox>
    )
}