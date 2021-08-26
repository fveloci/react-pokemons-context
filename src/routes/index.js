import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../views/Home";
import Four0Four from "../views/404";
import PokeDetail from "../views/PokeDetail";
import ScrollToTop from "../components/ScrollToTop";

export default function Routes(){    
    return (        
        <Router>
            <ScrollToTop/>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/pokemon/:id" exact>
                    <PokeDetail />
                </Route>
                <Route>
                    <Four0Four />
                </Route>
            </Switch>            
        </Router>
    );
}