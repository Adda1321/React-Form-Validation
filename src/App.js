import "./App.css";
import CustomForm from "./components/form/CustomForm";

import Footer from "./components/Footer";
import NavBar from "./components/NavBar"; 
function App() {
  return (
    <div>
      <NavBar />
      <div>
        <CustomForm /> 
      </div>
      <Footer />
    </div>
  );
}

export default App;
