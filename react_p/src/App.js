
import './App.css';
import{BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Home";
import CreatePost from "./CreatePost";
import PostEdit from "./PostEdit";
import PostDetail from "./PostDetail"

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"/create"} element={<CreatePost/>}/>
            <Route path={"/post/:id"} element={<PostDetail/>}/>
            <Route path={"/post/edit/:id"} element={<PostEdit/>}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;

// / - post list
// /create - post create
// /edit/:id - post edit
