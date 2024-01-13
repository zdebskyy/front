import { Link, Route, Routes } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
// import Books from './components/Books'
import Audio from './components/Audio'
import './App.css'
import { Container } from '@mui/material';


function App() {
  return (
    <>
    <CssBaseline/>
    <Container className='container' maxWidth='xl'>
    <nav>
      <ul className='nav-container'>
        <Link to={'/audio-player'} className='nav-item'>Audio Player</Link>
        <Link to={'/audio'} className='nav-item'>Multi Track Player</Link>
      </ul>
    </nav>
    <Routes>
      {/* <Route path='/books' element={<Books/>}/>        */}
      <Route path='/audio' element={<Audio/>}/> 
      <Route path='/audio-player' element={<Audio/>}/> 
      <Route/>
      <Route />
    </Routes>
    </Container>
    </>
  )
}

export default App
