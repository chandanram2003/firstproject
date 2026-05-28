import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import AddEdit from "./components/AddEdit";
import View from "./components/View";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <BrowserRouter>
    <ToastContainer position="top-center"></ToastContainer>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/update/:id" component={AddEdit}></Route>
        <Route exact path="/add" component={AddEdit}></Route>
        <Route exact path="/view/:id" component={View}></Route>
      </Switch>
    </BrowserRouter>
  );
}
export default App;