import Transaction from "../components/Transactions";
import Home from "../components/Home";
import Owners from "../components/Owners";
import { Routes, Route } from "react-router-dom";
const Router = (props) => {
  return (
    <Routes>
      {/*<Route path="/" element={<Home/>}/>*/}
      <Route
        path="/"
        element={
          <Home {...props} user={props.user} handleUser={props.handleUser} />
        }
      />
      <Route
        path="/transaction"
        element={<Transaction {...props} user={props.user} />}
      />
      <Route path="/owners" element={<Owners {...props} user={props.user} />} />
    </Routes>
  );
};
export default Router;
