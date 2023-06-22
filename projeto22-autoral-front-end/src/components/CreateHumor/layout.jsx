import styled from "styled-components";

export const CreationBox = styled.div`
width: 60%;
margin: 20px auto;
background-color: #111;
border-radius: 10px;
padding: 5px;
img {
    width: 60px;
    height: 60px;
    border-radius: 50px;
}
div{
    display: flex;
    flex-wrap: nowrap;
    padding: 4px;
}
label{
    font-size: 14px;
    width: 20%;
}
`;
export const TextInput = styled.input`
align-self: center;
margin-left: 10px;
font-family: 'Montserrat',sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: #ffffff;
  background-color: rgb(28,28,30);
  box-shadow: 0 0 .4vw rgba(0,0,0,0.5), 0 0 0 .15vw transparent;
  border-radius: 10px;
  border: none;
  width: 85%;
  outline: none;
  padding: 6px;
  height: 25px;
  transition: 0.2s;
  ::placeholder{
    font-family: 'Montserrat',sans-serif;
  font-weight: 500;
  font-size: 15px;
  }
  :hover {
  box-shadow: 0 0 0 .15vw rgba(135, 207, 235, 0.186);
  }
  :focus {
  box-shadow: 0 0 0 .15vw skyblue;
  }
`;
export const ColorPicker = styled.input`
margin-top: 10px;
font-family: 'Montserrat',sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: #ffffff;
  background-color: rgb(28,28,30);
  box-shadow: 0 0 .4vw rgba(0,0,0,0.5), 0 0 0 .15vw transparent;
  border-radius: 10px;
  border: none;
  width: 50px;
  outline: none;
  padding: 2px;
  height: 30px;
  transition: 0.2s;
  ::placeholder{
    font-family: 'Montserrat',sans-serif;
  font-weight: 500;
  font-size: 15px;
  }
  :hover {
  box-shadow: 0 0 0 .15vw rgba(135, 207, 235, 0.186);
  }
  :focus {
  box-shadow: 0 0 0 .15vw skyblue;
  }
`;
export const Pickers = styled.div`
justify-content: space-between;
div{
    display: block;
    background-color: #00000024;
    border-radius: 10px;
    padding: 4px;
}
button{
    margin-top: 10px;
    align-self: center;
    color: #cb93ff;
    border: 2px solid #450085;
    border-radius: 10px;
    padding: 5px 17px;
    background-color: black;
    font-size: 15px;
    :hover {
      box-shadow: 2px 2px 15px #8707ff inset;
    }
    :active {
      box-shadow: 2px 2px 20px #8707ff inset;
    }
  }
`;