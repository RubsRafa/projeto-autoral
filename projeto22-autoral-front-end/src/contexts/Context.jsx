import { createContext } from "react";

const Context = createContext({
    userId: null,
    userImage: null,
    userToken: null,
    userName: null,
    userBirthday: null,
    userEmail: null,
    userIdPage: null,
});

export default Context;