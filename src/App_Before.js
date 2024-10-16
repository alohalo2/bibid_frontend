import Mainpage from './pages/Mainpage';
import Category from './pages/Category';
import DetailedCategory from './pages/DetailedCategory';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SpecialAuction from './pages/SpecialAuction';
import Layout from './pages/Layout';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {store} from './store/store';
import {PersistGate} from 'redux-persist/integration/react';
import RGRegistration1 from './pages/RGRegistration1';
import RGRegistration2 from './pages/RGRegistration2';
import RGRegistration3 from './pages/RGRegistration3';
import RGRegistration4 from './pages/RGRegistration4';
import JoinRoutes from "./routes/etc2_join/JoinRoutes";
import Login from "./pages/etc2_login/Login";
import FindPassword from "./pages/etc2_join/FindPassword";
import Mypage from './pages/Mypage';
import Mypage_info from './components/Mypage/Mypage_info';
import Mypage_info_update from './components/Mypage/Mypage_info_update';
import Mypage_bids_history from './components/Mypage/Mypage_bids_history';
import Mypage_wallet_management from './components/Mypage/Mypage_wallet_management';
import Mypage_bids_progress from './components/Mypage/Mypage_bids_progress';
import Mypage_qna from './components/Mypage/Mypage_qna';

function App() {
  const persiststore = persistStore(store);

  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persiststore}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Layout/>}>
                <Route path='/mainpage' element={<Mainpage/>}/>
                <Route path='/specialAuction' element={<SpecialAuction/>}/>
                <Route path='/Registration1' element={<RGRegistration1/>}/>
                <Route path='/Registration2' element={<RGRegistration2/>}/>
                <Route path='/Registration3' element={<RGRegistration3/>}/>
                <Route path='/Registration4' element={<RGRegistration4/>}/>
                <Route path='/category' element={<Category/>}/>
                <Route path='/category/:category' element={<DetailedCategory/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path="join/*" element={<JoinRoutes/>}/>
                <Route path="/find-password" element={<FindPassword/>}/>
                <Route path='/mypage/' element={<Mypage/>}>
                  <Route path='info' element={<Mypage_info/>}/>
                  <Route path='update' element={<Mypage_info_update/>}/>
                  <Route path='bids_history' element={<Mypage_bids_history/>}/>
                  <Route path='wallet_management' element={<Mypage_wallet_management/>}></Route>
                  <Route path='bids_progress' element={<Mypage_bids_progress/>}></Route>
                  <Route path='qna' element={<Mypage_qna/>}></Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
  );
}

export default App;


