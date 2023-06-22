import { Container, Logo } from "../../styles/SignPagesLayouts";
import SignUpComponent from '../../components/Signup';

export default function SignUp() {
    return (
        <Container>
            <Logo>
                <h1>Friendly</h1>
            </Logo>
            <SignUpComponent />
        </Container>
    )
}