import "./index.css"
import Header from "./header.jsx"
import Main from "./main.jsx"
import {  createRoot  } from "react-dom/client"
createRoot(document.querySelector("#root")).render(
    <>
        <Header/>
        <Main/>
        <h4 className="ftr">Made By Abhinendra</h4>
    </>
)