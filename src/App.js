import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom"

import Menu from "./components/menu"
import AddFile from "./components/controls/addFile";
import "./app.css"

const App = () => {
    const navigate = useNavigate()

    return (
        <>
            <Routes>
                <Route path="" element={
                    <>
                        <Menu />
                        <div id="container">

                            <AddFile />
                        </div>
                    </>
                }></Route>

            </Routes>
        </>
    )
}

export default App