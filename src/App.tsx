import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ConfigProvider} from "antd";
import {lazy, Suspense} from "react";


const Home = lazy(()=> import("./pages/Home.tsx"))
const SingleGame = lazy(()=> import("./pages/SingleGame.tsx"))


function App() {

  return (
    <>
        <ConfigProvider
            theme={{
                "token": {
                    "colorPrimary": "#772fdc",
                    "colorInfo": "#772fdc"
                },

            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/"
                           element={
                        <Suspense fallback={<h1>Loading</h1>}><Home/></Suspense>}
                />
                    <Route path="/game/:gameId" element={
                        <Suspense fallback={<h1>Loading</h1>}><SingleGame/></Suspense>
                    } />
                </Routes>
            </BrowserRouter>
        </ConfigProvider>

    </>
  )
}

export default App
