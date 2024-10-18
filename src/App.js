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
import JoinRoutes from "./routes/etc2_join/JoinRoutes";
import Login from "./pages/etc2_login/Login";
import Mypage from './pages/Mypage';
import Mypage_info from './components/Mypage/Mypage_info';
import Mypage_info_update from './components/Mypage/Mypage_info_update';
import Mypage_bids_history from './components/Mypage/Mypage_bids_history';
import Mypage_wallet_management from './components/Mypage/Mypage_wallet_management';
import Mypage_bids_progress from './components/Mypage/Mypage_bids_progress';
import Mypage_qna from './components/Mypage/Mypage_qna';
import RegistrationForm from './pages/RegistrationForm';
import useFCM from './util/useFCM';
import FindMember from './pages/etc2_find/FindMember';
import CategoryItemDetail from './components/categoryItemDetail/CategoryItemDetail';

function App() {

    useFCM();

    const persiststore = persistStore(store);

    return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persiststore}>
                        <Routes>
                            <Route path='/login' element={<Login/>}/>
                            <Route path='/find' element={<FindMember/>}/>
                            <Route path='/' element={<Layout/>}>
                                <Route index element={<Mainpage/>}/>
                                <Route path='/specialAuction' element={<SpecialAuction/>}/>
                                <Route path='/registration/*' element={<RegistrationForm/>}/>
                                <Route path='/category' element={<Category/>}/>
                                <Route path='/category/:category' element={<DetailedCategory/>}/>
                                <Route path='/category-itemdetail/:auctionNumber' element={<CategoryItemDetail/>}/>
                                {/* mypage 에서 지정한 mui 버튼 스타일 충돌 */}
                                <Route path="join/*" element={<JoinRoutes/>}/>
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
                </PersistGate>
            </Provider>
    );
}

export default App;


