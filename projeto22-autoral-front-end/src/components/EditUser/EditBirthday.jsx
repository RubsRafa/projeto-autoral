import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { EditBox, Input } from "./layout";
import { editUser } from "../../services/userApi";
import Context from '../../contexts/Context';

export default function EditBirthday({ setEditBirthday, setRefresh, refresh }) {
  const [birthday, setBirthday] = useState();
  const { userToken } = useContext(Context);
  const token = userToken || localStorage.getItem('token');

  async function edit(e) {
    e.preventDefault();

    const parts = birthday.split('-');
    
    const day = parseInt(parts[2]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[0]);

    const date = new Date(year, month - 1, day);
    const formatDate = date.toISOString();
   
    const body = {
      birthday: formatDate,
    }
    try {
      await editUser(token, body);
      setEditBirthday(false);
      setRefresh(!refresh);
      localStorage.removeItem('userBirthday')
      localStorage.setItem('userBirthday', formatDate)
    } catch (e) {
      console.log(e);
      setEditBirthday(false);
      toast.error('Não foi possível alterar a data de aniversário. =( Tente novamente mais tarde')
    }
  }
  return (
    <EditBox onSubmit={edit}>
      <Input onChange={(e) => setBirthday(e.target.value)} value={birthday} type="date" placeholder="Alterar data de aniversário" autoComplete="off"></Input>
      <div>
        <button type="submit">Alterar</button>
        <button onClick={() => setEditBirthday(false)}>Cancelar</button>
      </div>
    </EditBox>
  )
}
