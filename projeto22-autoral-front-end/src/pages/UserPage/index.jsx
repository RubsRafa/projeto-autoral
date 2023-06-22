import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, MainContainer, OutNavBar, UserPostsBox } from "../../styles/FeedLayout";
import NavBar from "../../components/NavBar";
import Posts from "../../components/Posts/Posts";
import UserInfo from "../../components/UserInfo";

export default function UserPage() {
    const { id } = useParams();
    const [refresh, setRefresh] = useState(false);

    return (
        <Container>
            <NavBar />
            <OutNavBar>
                <MainContainer>
                    <UserPostsBox>
                        <Posts id={id} refresh={refresh} setRefresh={setRefresh} isTimeline={false} />
                    </UserPostsBox>
                    <UserInfo id={id} refresh={refresh} setRefresh={setRefresh} />
                </MainContainer>
            </OutNavBar>
        </Container>
    )
}