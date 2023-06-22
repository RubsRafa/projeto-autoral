import styled from "styled-components";

export const NoContent = styled.div`
margin: 100px auto;
font-family: 'Montserrat', sans-serif;
font-size: 30px;
`;
export const BoxPost = styled.div`
background-color: #1E1E1E;
padding: 10px;
min-width: 40px;
max-width: 500px;
border-radius: 10px;
margin: 20px auto;
font-family: 'Montserrat', sans-serif;
h1{
    font-size: 12px;
    margin: 3px 0 0 8px;
    :hover{
        cursor: pointer;
    }
}
h2{
    font-size: 15px;
    margin: 8px 0 0 10px;
}
`;
export const RepostBox = styled.div`
border-bottom: 1px solid gray;
justify-content: space-between;
font-size: 12px;
display: flex;
flex-wrap: nowrap;
position: relative;
h1{
    font-weight: 700;
}
h2{
    font-size: 12px;
}
img{
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-bottom: 4px;
    object-fit: cover;
}
button {
    width: 25px;
    height: 25px;
    border: none;
    color: #fff;
    background-color: transparent;
    border-radius: 50%;
    :hover{
        background-color: rgba(250, 250, 250, 0.5);
        cursor: pointer;
    }
}
`;
export const RepostInfo = styled.div`
justify-items: start;
display: flex;
flex-wrap: nowrap;
:hover{
  cursor: pointer;
}
h1{
  align-self: center;
}
`;
export const UserInfoBox = styled.div`
display: flex;
flex-wrap: nowrap;
margin-top: 8px;
justify-content: space-between;
img{
    width: 55px;
    height: 55px;
    border-radius: 50%;
    margin-bottom: 2px;
    object-fit: cover;
}
`;
export const ConfigBox = styled.div`
display: flex;
flex-direction: column;
text-align: center;
position: relative;
button{
    width: 25px;
    height: 25px;
    border: none;
    color: #fff;
    background-color: transparent;
    border-radius: 50%;
    :hover{
        background-color: rgba(250, 250, 250, 0.5);
        cursor: pointer;
    }
}
`;
export const OutFollowBox = styled.div`
justify-content: flex-start;
display: flex;
flex-wrap: nowrap;
div{
    margin: 0 0 0 4px;
    justify-content: flex-start;
    text-align: start;
}
h1{
    font-size: 14px;
}
span{
    font-size: 12px;
    margin-left: 8px;
    color: gray;
}
`;
export const MainTextBox = styled.div`
font-size: 15px;
text-align: justify;
margin: 7px 8px;
`;
export const MainImageVideoBox = styled.div`
img{
    width: 100%;
    border-radius: 5px;
}
`;
export const PostInfo = styled.div`
padding: 5px;
display: flex;
flex-wrap: nowrap;
justify-content: space-between;
border-bottom: 1px solid gray;
div{
    display: flex;
    flex-wrap: nowrap;
    :hover{
        cursor: pointer;
        text-decoration: underline;
    }
}
`;
export const Options = styled.div`
display: flex;
flex-wrap: nowrap;
justify-content: space-around;
margin-top: 6px;
div{
    :hover{
        cursor: pointer;
        transform: scale(1.2);
        
    }
}
`;
export const AddComment = styled.div`
display: flex;
flex-wrap: nowrap;
justify-content: space-between;
width: 100%;

img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
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
  width: 85%;
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
    border: none;
}
`;
export const CommentForm = styled.form`
margin: 5px;
width: 100%;
button{
    background-color: transparent;
}
`;
export const CommentBox = styled.div`
background-color: transparent;
`;
export const UserComment = styled.div`
display: flex;
flex-wrap: nowrap;
justify-content: flex-start;
padding: 5px;
border-bottom: 1px solid gray;
img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}
div{
    display: block;
    text-align: start;
}
h1{
    font-weight: 700;
}
h2{
    font-size: 14px;
}
span{
    color: gray;
}
`;
export const Item = styled.div`
background-color: #222;
border-radius: 5px;
padding: 8px;
position: absolute;
top: 0;
right: -140px;
display: block;
flex-direction: column;
div{
    display: flex;
    flex-wrap: nowrap;
    margin: 5px 0 5px 0;
    border-bottom: 1px solid gray;
}
h1{
    align-items: center;
    font-size: 12px;
    font-weight: 400;
}
`;