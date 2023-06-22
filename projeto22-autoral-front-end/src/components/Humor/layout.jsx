import styled from "styled-components";

export const HumorBox = styled.div`
background-color: ${props => props.color && props.color};
width: 70%;
margin: 8px auto;
display: flex;
flex-wrap: nowrap;
justify-content: space-between;
border-radius: 5px;
div{
    display: flex;
    flex-wrap: nowrap;
    align-self: center;
    padding: 4px;
    justify-content: space-between;
}
h1{
    align-self: center;
    font-size: 16px;
    margin-right: 5px;
}
:hover{
    padding: 1px;
    border: 1px solid #fff;
    transition: all 0.2s ease-in-out;
}
input{
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
  width: 100%;
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
}
button{
    margin-left: 10px;
    width: 60%;
 outline: none;
 border: 1px solid #303030;
 background: #212121;
 color: #ae00ff;
 text-transform: uppercase;
 letter-spacing: 2px;
 font-size: 15px;
 overflow: hidden;
 transition: 0.2s;
 border-radius: 20px;
 padding: 4px;
 cursor: pointer;
 font-weight: bold;
 :hover {
 box-shadow: 0 0 10px #ae00ff, 0 0 25px #001eff, 0 0 50px #ae00ff;
 transition-delay: 0.1s;
}
}
`;