import styled from "styled-components";

export const CreationOptionsBox = styled.div`
display: block;
flex-direction: column;
justify-content: space-evenly;
background-color: #1E1E1E;
padding: 4px;
min-width: 40px;
max-width: 500px;
border-radius: 10px;
margin: 0 auto;
`;
export const Option = styled.div`
background-color: grey;
width: 25%;
height: 25px;
margin: 18px 0;
border-radius: 10px;
background: #313131;
border: none;
padding: 15px 15px;
display: flex;
flex-wrap: nowrap;
text-align: center;
:hover{
  background: rgba(100, 100, 100, 0.8);
  border-radius: 20px;
  transition: all 0.2s ease-in-out;
}
h1{
    margin: 5px 0 0 8px;
    font-family: 'Montserrat',sans-serif;
    font-weight: 700;
    font-size: 15px;
}
`;
export const CreationBoxText = styled.div`
width: 100%;
border-radius: 10px;
display: flex;
flex-wrap: nowrap;
justify-content: start;
img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #ffffff;
    object-fit: cover;
}
h1{
    font-family: 'Montserrat',sans-serif;
    font-weight: 700;
    font-size: 15px;
}
input{
  font-family: 'Montserrat',sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: #ffffff;
  background-color: rgb(28,28,30);
  box-shadow: 0 0 .4vw rgba(0,0,0,0.5), 0 0 0 .15vw transparent;
  border-radius: 10px;
  border: none;
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
`;
export const UserInfo = styled.div`
display: block;
margin: 10px 10px 0 10px;
button{
    margin-top: 5px;
    width: 30px;
    height: 30px;
    border: none;
    background-color: rgba(250, 250, 250, 0.7);
    border-radius: 5px;
}
`;
export const Form = styled.form`
display: flex;
width: 100%;
justify-content: space-between;
margin-top: 10px;
input{
    width: 95%;
}
div{
    align-self: flex-end;
}
button{
 height: 25px;
 width: 90px;
 align-items: center;
 justify-content: center;
 background-color: #eeeeee4b;
 border-radius: 3px;
 letter-spacing: 1px;
 transition: all 0.2s linear;
 cursor: pointer;
 border: none;
 background: #fff;
 :hover {
 box-shadow: 9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;
 transform: translateY(-2px);
}
}
`;
export const Options = styled.div`
display: flex;
flex-wrap: nowrap;
justify-content: space-evenly;
min-width: 40px;
max-width: 500px;
margin: 0 auto;
`;