import styled from "styled-components";

export const UsersChatBox = styled.div`
width: 25%;
background-color: #111;
padding: 6px;
`;
export const Title = styled.div`
margin: 20px auto;
font-size: 20px;
`;
export const Users = styled.div`
display: flex;
flex-wrap: nowrap;
background-color: #333;
border-radius: 10px;
margin-top: 6px;
:hover{
    background-color: #444;
}
div{
    display: block;
    padding: 6px;
}
h1{
    align-self: flex-start;
    font-size: 18px;
    text-align: start;
    margin-top: 10px;
}
h2{
    align-self: flex-end;
    font-size: 14px;
    text-align: start;
    margin-top: 16px;
}
img{
    border-radius: 50px;
    width: 60px;
    height: 60px;
    object-fit: cover;
}
`;