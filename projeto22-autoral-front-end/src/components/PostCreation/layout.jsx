import styled from "styled-components";

export const Form = styled.form`
display: flex;
width: 100%;
justify-content: space-between;
margin: 7px 0 7px 7px;
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
 margin: 2px 14px 2px 0;
 cursor: pointer;
 border: none;
 background: #fff;
 :hover {
 box-shadow: 9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;
 transform: translateY(-2px);
}
}
input{
  margin-bottom: 10px;
  font-family: 'Montserrat',sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: #ffffff;
  background-color: rgb(28,28,30);
  box-shadow: 0 0 .4vw rgba(0,0,0,0.5), 0 0 0 .15vw transparent;
  border-radius: 10px;
  border: none;
  width: 165%;
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
export const PostInfo = styled.div`
display: block;
flex-wrap: wrap;
justify-content: space-around;
`;