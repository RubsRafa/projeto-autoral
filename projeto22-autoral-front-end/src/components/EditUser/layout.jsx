import styled from "styled-components";

export const EditBox = styled.form`
border-bottom: ${props => props.image ? props.image : '1px solid gray'};
div{
    margin: 10px auto;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
}
button{
    color: #8707ff;
    border: 2px solid #8707ff;
    border-radius: 10px;
    padding: 5px 17px;
    background: transparent;
    font-size: 15px;
    :hover {
      box-shadow: 2px 2px 15px #8707ff inset;
    }
    :active {
      box-shadow: 2px 2px 20px #8707ff inset;
    }
  }
`;
export const Input = styled.input`
margin: 10px;
  font-family: 'Montserrat',sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: #ffffff;
  background-color: rgb(28,28,30);
  box-shadow: 0 0 .4vw rgba(0,0,0,0.5), 0 0 0 .15vw transparent;
  border-radius: 10px;
  border: none;
  width: 90%;
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