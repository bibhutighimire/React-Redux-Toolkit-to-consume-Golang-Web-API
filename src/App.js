import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReadEmployees from './features/employees/ReadEmployees'
import CreateEmployee from './features/employees/CreateEmployee'
import UpdateEmployee from './features/employees/UpdateEmployee'
import Home from './components/Home'
import Layout from './components/Layout'
import Prefetch from "./features/auth/Prefetch";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<Prefetch />}>
          <Route path="reademployees" element={<ReadEmployees />} />
          <Route path="createemployee" element={<CreateEmployee />} />
          <Route path=":id" element={<UpdateEmployee />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
