import styled from "styled-components";

export const Container = styled.div`
display: block;
text-align: center;
margin: 0 auto;
display: flex;
flex-wrap: nowrap;
`;
export const Logo = styled.div`
font-size: 40px;
font-family: 'Caveat', cursive;
height: 100px;
width: 100%;
`;
export const OutNavBar = styled.div`
display: block;
width: 100%;
margin-top: 100px;
margin-left: 80px;
@media(max-width: 700px){
    margin-left: 0;
}
`;
export const MainContainer = styled.div`
opacity: 90%;
height: 100vh;
display: flex;
flex-wrap: nowrap;
justify-content: space-around;
@media(max-width: 700px){
    margin-top: 60px;
}

`;
export const UserPostsBox = styled.div`
background-color: transparent;
width: 100%;
margin: 0 auto;
border-right: 1px solid gray;
`;
export const Title = styled.div`
font-size: 22px;
margin: 0 auto;
`;