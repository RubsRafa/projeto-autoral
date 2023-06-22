import styled from "styled-components";

export const Bar = styled.div`
width: 80px;
height: 100vh;
display: block;
flex-wrap: nowrap;
flex-direction: column;
background-color: #111111;
position: fixed;
h1{
   display: none;
}
:hover{
   width: 160px;
   transition: all 0.4s ease-out;
   justify-content: space-around;
   h1{
      opacity: 100%;
      margin-left: 2px;
      font-size: 14px;
      display: flex;
      align-self: center;
   }
   button{
      margin-left: 10px;
   }
}
`;

export const Options = styled.button`
 width: 65px;
 height: 65px;
 margin: 18px 0;
 border-radius: 50px;
 background: #313131;
  border: none;
  padding: 15px 15px;
 :hover{
    background: rgba(100, 100, 100, 0.8);
    border-radius: 20px;
    transition: all 0.4s ease-in-out;
 }
`;
export const Box = styled.div`
display: flex;
flex-wrap: nowrap;
justify-content: space-around;
:hover{
   width: 100%;
   transition: all 0.4s ease-in-out;
   background: rgba(30, 30, 30, 0.8);
   border-radius: 10px;
}
`;