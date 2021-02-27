import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Albums from "./pages/Albums";
import AlbumDetail from "./pages/AlbumDetail";
import MusicDetail from "./pages/MusicDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/albums">
          <Albums />
        </Route>
        <Route path="/albums/:id/">
          <AlbumDetail />
        </Route>
        <Route path="/songs/:id">
          <MusicDetail />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
