import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { EditBox, Input } from "./layout";
import { editUser } from "../../services/userApi";
import Context from '../../contexts/Context';

export default function EditPassword({ setEditPassword, setRefresh, refresh }) {
  const [confirmPassword, setConfirmPassword] = useState();
  const [password, setPassword] = useState();
  const { userToken } = useContext(Context);
  const token = userToken || localStorage.getItem('token');

  async function edit(e) {
    e.preventDefault();

    const body = {
      confirmPassword,
      password,
    }
    try {
      await editUser(token, body);
      setEditPassword(false);
      setRefresh(!refresh);
    } catch (e) {
      console.log(e);
      setEditPassword(false);
      toast.error('Não foi possível alterar sua senha. =( Tente novamente mais tarde')
    }
  }

    return (
        <EditBox onSubmit={edit}>
            <Input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="password" placeholder="Confirme a senha atual" autoComplete="off"></Input>
            <Input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Nova senha" autoComplete="off"></Input>
            <div>
                <button type="submit">Alterar</button>
                <button onClick={() => setEditPassword(false)}>Cancelar</button>
            </div>
        </EditBox>
    )
}