import styled from "styled-components";

export const Box = styled.div`
width: 520px;
height: 540px;
border-radius: 15px;
display: block;
flex-wrap: wrap;
justify-content: center;
margin: 60px auto;
text-align: center;
box-shadow: 0px 0px 16px 1px #ffffff;
font-family: 'Montserrat', sans-serif;
    
h1{
    margin-top: ${props => props.margin ? '60px' : '30px'}
}
h2{
    margin: 5px 0;
    font-size: 20px;
}
h3{
    margin: 5px 0;
    text-decoration: underline;
}
img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    object-fit: cover;
}
input{
  margin: 5px auto;
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
  padding: 8px;
  height: 30px;
  transition: 0.2s;
  ::placeholder{
    font-family: 'Montserrat',sans-serif;
  font-weight: 500;
  font-size: 15px;
  padding: 8px;
  }
  :hover {
  box-shadow: 0 0 0 .15vw rgba(135, 207, 235, 0.186);
  }
  :focus {
  box-shadow: 0 0 0 .15vw skyblue;
  }
}
button{
    margin: 10px auto;
    width: 50%;
    height: 30px;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    border: none;
    border-radius: 50px;
    background: #e0e0e0;
}
`;