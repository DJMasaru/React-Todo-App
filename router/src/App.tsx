import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from 'react-router-dom'
// import Home from './pages/Home'
// import Posts from './pages/Posts'
import TaskPage from './pages/tasks/index'
import LoginPage from './pages/login/index'
import HelpPage from './pages/help/index'
import {QueryClient, QueryClientProvider} from "react-query";

// このファイルはハンズオン動画のrouter tsxに相当する
const App: React.FC = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            },
            mutations: {
                retry: false
            }
        }
    })
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                {/*ここのheader部は共通部分となる*/}
                <header className="global-head">
                    <ul>
                        <li><Link to="/">ホーム</Link></li>
                        <li><Link to="/help">ヘルプ</Link></li>
                        <li><Link to="/login">ログイン</Link></li>
                        <li><span>ログアウト</span></li>
                    </ul>
                </header>
                <Routes>
                    {/*それぞれ、特定のpathが入力されたらelement名の*/}
                    {/*コンポーネントが埋め込まれるという仕組み*/}
                    <Route path="/" element={<TaskPage />} />
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}
export default App;
