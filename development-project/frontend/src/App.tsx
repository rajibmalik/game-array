import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Library from "./pages/Library";
import Dashboard from "./pages/Dashboard";
import AuthCallback from "./components/AuthCallback"; // Import the new component
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/library" element={<Library />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/auth/steam/callback" element={<AuthCallback />} /> // */}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
