import styled from "styled-components";

export const Title = styled.div`
margin: 7px auto;
font-size: 18px;
font-family: 'Montserrat',sans-serif;
`;
export const UserInfoBox = styled.div`
width: 50%;
padding: 10px;
`;
export const Box = styled.div`
background-color: #222;
border-radius: 10px;
margin: 40px auto;
padding: 10px;
max-width: 300px;
img{
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
}
h1{
    margin: 20px 0 10px 0;
    font-size: 22px;
}
h2{
    font-size: 16px;
    margin-bottom: 20px;
}
button {
 position: relative;
 padding: 1em 1.8em;
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
`;
export const BoxFollowers = styled.div`
background-color: #222;
border-radius: 10px;
margin: 50px auto;
padding: 10px;
max-width: 400px;
div{
    display: flex;
    flex-wrap: nowrap;
    padding: 4px;
    border-bottom: 1px solid gray;
}
img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}
h1{
    font-size: 18px;
    align-self: center;
    margin-left: 10px;
}
h2 {
    font-size: 15px;
    margin-bottom: 10px;
}
`;
export const ImageBox = styled.div`
margin: 0 auto;
img{
    width: 160px;
    height: 160px;
    border-radius: 50%;
    object-fit: cover;
}
`;
export const NameBox = styled.div`
border-bottom: 1px solid gray;
h1{
    font-size: 24px;
}
:hover{
    cursor: pointer;
    text-decoration: underline;
}
`;
export const BirthdayBox = styled.div`
border-bottom: 1px solid gray;
h1{
    font-size: 16px;
}
:hover{
    cursor: pointer;
    text-decoration: underline;
}
`;
export const EmailBox = styled.div`
border-bottom: 1px solid gray;
h1{
    font-size: 15px;
}
:hover{
    cursor: pointer;
    text-decoration: underline;
}
`;
export const PasswordBox = styled.div`
border-bottom: 1px solid gray;
h1{
    font-size: 15px;
    :hover{
    cursor: pointer;
    text-decoration: underline;
}
}
`;