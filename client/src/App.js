import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import landingPg from "./components/landingPg";
import  card from './components/card'
import Home from "./components/home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component = {landingPg}/>
           
          <Route exact path="/home" component = {Home}/>
          
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
