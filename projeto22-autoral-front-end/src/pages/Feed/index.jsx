import { Container, Logo, OutNavBar, MainContainer } from '../../styles/FeedLayout';
import NavBar from '../../components/NavBar';
import Timeline from '../../components/Timeline';
import { useState } from 'react';

export default function Feed() {
    const [refresh, setRefresh] = useState(false);
    return (
        <Container>
            <NavBar />
            <OutNavBar>
                <Logo><h1>Friendly</h1></Logo>
                <MainContainer>
                    <Timeline refresh={refresh} setRefresh={setRefresh} />
                    {/* <MainInfo>
                        <Info>INFO</Info>
                    </MainInfo> */}
                </MainContainer>
            </OutNavBar>
        </Container>
    )
}