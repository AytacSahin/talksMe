import { BrowserRouter } from "react-router-dom";
import { MyProvider } from "./context/Context";
import SiteNavigation from "./navigation/SiteNavigation";

function App() {
  
  return (
    <BrowserRouter>
      <MyProvider>
        <SiteNavigation />
      </MyProvider>
    </BrowserRouter>
  );
}

export default App;
