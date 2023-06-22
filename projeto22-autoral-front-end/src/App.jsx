import { BrowserRouter, Route, Routes } from "react-router-dom"
import GlobalStyle from "./styles/GlobalStyle"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import Provider from './contexts/Provider';
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Feed from "./pages/Feed";
import UserPage from "./pages/UserPage";
import FindUserPage from "./pages/FindUser";
import MentalHealth from "./pages/MentalHealth";
import Chat from "./pages/Chat";
import { ErrorPage } from "./pages/Error";

function App() {

  return (
    <BrowserRouter>
      <GlobalStyle />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        newestOnTop={false}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        theme="dark"
      />

      <Provider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/find" element={<FindUserPage />} />
          <Route path="/health" element={<MentalHealth />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App
