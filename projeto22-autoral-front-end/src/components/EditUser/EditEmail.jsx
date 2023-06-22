import { useContext, useState } from "react";
import { EditBox, Input } from "./layout";
import Context from "../../contexts/Context";
import { toast } from "react-toastify";
import { editUser } from "../../services/userApi";

export default function EditEmail({ setEditEmail, setRefresh, refresh }) {
  const [email, setEmail] = useState();
  const { userToken } = useContext(Context);
  const token = userToken || localStorage.getItem('token');

  async function edit(e) {
    e.preventDefault();
    const body = {
      email,
    }
    try {
      await editUser(token, body);
      setEditEmail(false);
      setRefresh(!refresh);
      localStorage.removeItem('userEmail')
      localStorage.setItem('userEmail', email)
    } catch (e) {
      console.log(e);
      setEditEmail(false);
      toast.error('Não foi possível alterar seu email. =( Tente novamente mais tarde')
    }
  }
    return (
        <EditBox onSubmit={edit}>
            <Input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Alterar email" autoComplete="off"></Input>
            <div>
                <button type="submit">Alterar</button>
                <button onClick={() => setEditEmail(false)}>Cancelar</button>
            </div>
        </EditBox>
    )
}