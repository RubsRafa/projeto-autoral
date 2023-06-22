import { Container, Logo } from "../../styles/SignPagesLayouts";
import SignInComponent from "../../components/Signin";

export default function SignIn() {
    return (
        <Container>
            <Logo><h1>Friendly</h1></Logo>
            <SignInComponent />
        </Container>
    )
}