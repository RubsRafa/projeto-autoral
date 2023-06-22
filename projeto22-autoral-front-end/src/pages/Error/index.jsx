import styled from "styled-components"

export function ErrorPage() {
    return (
        <Container>
            <h1>Erro 404</h1>
            <h1>Essa página não existe! :(</h1>
        </Container>
    )
}

const Container = styled.div`
background-color: black;
width: 100vw;
height: 100vh;
display: block;
h1{
    text-align: center;
    margin-top: 200px;
    font-size: 30px;
}
`;