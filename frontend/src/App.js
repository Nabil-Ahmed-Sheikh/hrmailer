import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ListEmployeeScreen from "./screens/ListEmployeeScreen";
import AddEmployeeScreen from "./screens/AddEmployeeScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/add" component={AddEmployeeScreen} exact />
          <Route path="/employees/:page" component={ListEmployeeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
