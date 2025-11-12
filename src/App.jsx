import LoginPage from './Common/login.jsx'
import { Routes, Route } from 'react-router-dom'
import LoginProvider from './context/LoginContext.jsx'
import SelectProfile from "./pages/selectProfile/SelectProfile.jsx"
import Footer from './common/Footer.jsx'
import Detail from './pages/Detail/Detail.jsx'
import DataProvider from './context/DataContext.jsx'
import Header from './common/Header.jsx'
import Home from './pages/home/Home.jsx'
import Movie from './pages/movie/Movie.jsx'
/// 테스트용
import Test from './pages/Test.jsx'
import SearchProvider from './context/SearchContext.jsx'
import WishProvider from './context/WishContext.jsx'
import InputPage from './pages/inputPage/InputPage.jsx'
import Recommand from './pages/recommand/Recommand.jsx'

function App() {

  return (
    <DataProvider>
      <WishProvider>
      <LoginProvider>
    <SearchProvider>
    
      <Header/>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/search" element={<InputPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/reco" element={<Recommand />} />
        <Route path="/test" element={<Test />} />
        <Route path="/selectProfile" element={<SelectProfile />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
      {/* <Footer/> */}
      {/* css 부족해서 죽여놈 */}
    </SearchProvider>
     </LoginProvider>
     </WishProvider>
    </DataProvider>
  )
}

export default App
