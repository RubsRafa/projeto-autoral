import styled from "styled-components";

export const Container = styled.div`
margin: 120px auto;
width: 50%;
`;
export const Form = styled.form`
display: flex;
width: 100%;
justify-content: space-evenly;
margin: 50px 0 7px 7px;
padding: 4px;
div{
    align-self: flex-end;
}
button{
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
 cursor: pointer;
 font-weight: bold;
 :hover {
 box-shadow: 0 0 10px #ae00ff, 0 0 25px #001eff, 0 0 50px #ae00ff;
 transition-delay: 0.1s;
}
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
  width: 70%;
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
export const Title = styled.div`
margin: 0 auto;
font-size: 30px;
`;
export const Users = styled.div`
padding: 5px;
display: flex;
flex-wrap: wrap;
justify-content: space-evenly;
div{
    background-color: #222;
    border-radius: 20px;
    padding: 10px;
    width: fit-content;
}
img{
    width: 80px;
    height: 80px;
    border-radius: 15px;
    object-fit: cover;
}
h1{
    margin-top: 4px;
    font-size: 20px;
}
`;