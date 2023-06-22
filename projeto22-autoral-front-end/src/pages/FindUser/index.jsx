import NavBar from "../../components/NavBar";
import SearchUser from "../../components/SearchUser";
import { Container, OutNavBar } from "../../styles/FeedLayout";

export default function FindUserPage() {
    return (
        <Container>
            <NavBar />
            <OutNavBar>
                <SearchUser />
            </OutNavBar>
        </Container>
    )
}