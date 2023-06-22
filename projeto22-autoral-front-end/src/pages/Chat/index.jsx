import { useState } from "react";
import ChatComponent from "../../components/ChatComponent";
import NavBar from "../../components/NavBar";
import UsersChat from "../../components/UsersChat";
import { Container, OutNavBar } from "./layout";

export default function Chat() {
    const [chatId, setChatId] = useState(0);
    return (
        <Container>
            <NavBar />
            <OutNavBar>
                <UsersChat setChatId={setChatId} />
                <ChatComponent chatId={chatId} />
            </OutNavBar>
        </Container>
    )
}