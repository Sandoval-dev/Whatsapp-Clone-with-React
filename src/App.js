import Sidebar from './components/Sidebar';
import PageContainer from './containers/PageContainer';
import './index.css'
import Chat from './pages/Chat';
import ChatDetail from './pages/ChatDetail';
import Login from './pages/Login';
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


function App() {
  const { user } = useSelector(state => state.user)
  return (
    <>
      {
        !user ? <Login /> :
          <Router>
            <PageContainer>
            <Sidebar />
            <Routes>
              <Route path='/' element={<Chat />} />
              <Route path='chat/:id' element={<ChatDetail />} />
            </Routes>
            </PageContainer>
          </Router>
      }
    </>

  );
}

export default App;
