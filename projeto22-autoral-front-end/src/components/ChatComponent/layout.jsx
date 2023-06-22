import styled from "styled-components";

export const ChatComponentBox = styled.div`
width: 75%;
height: 100vh;
position: relative;
h1{
    font-size: 18px;
}
h2{
    font-size: 13px;
    margin-top: 5px;
}
`;
export const UserBar = styled.div`
background-color: #111;
display: flex;
flex-wrap: nowrap;
padding: 8px;
margin-bottom: 10px;
img{
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 15px;
}
h1 {
    align-self: center;
}
`;
export const Messages = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
  div{
    background-color: #222;
    margin: 5px auto;
    width: 90%;
    display: block;
    flex-direction: column;
    padding: 12px;
    border-radius: 10px;
  }
`;
export const OtherUser = styled.div`
  align-self: flex-start;
  h1{
    width: 70%;
    text-align: left;
  }
  h2{
    width: 70%;
    text-align: left;
  }
`;
export const Me = styled.div`
  align-self: flex-end;
`;
export const H1 = styled.h1`
  text-align: right;
  width: 70%;
  margin-left: auto;
`;
export const H2 = styled.h2`
  font-size: 16px;
  text-align: right;
  margin-left: auto;
`;
export const TypeMessage = styled.div`
background-color: rgb(28,28,30);
display: flex;
flex-wrap: nowrap;
position: absolute;
bottom: 0;
left: 0;
width: 100%;
padding: 12px;
justify-content: space-evenly;
align-self: center;
textarea{
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
  transition: 0.2s;
  resize: vertical;
  ::placeholder{
    font-family: 'Montserrat',sans-serif;
    font-weight: 500;
    font-size: 15px;
  }
}
button{
  margin-top: 10px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold; 
  padding: 6px;
}
`;