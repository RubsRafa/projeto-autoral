import { Container, OutNavBar, Title } from '../../styles/FeedLayout'
import NavBar from '../../components/NavBar';
import Humor from '../../components/Humor';
import CreateHumor from '../../components/CreateHumor';
import { useState } from 'react';

export default function MentalHealth() {
    const [refresh, setRefresh] = useState(false);
    return (
        <Container>
            <NavBar />
            <OutNavBar>
                <Title>Olá, como você está se sentindo hoje?</Title>
                <CreateHumor refresh={refresh} setRefresh={setRefresh} />
                <Humor refresh={refresh} />
            </OutNavBar>
        </Container>
    )
}