import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import HomePage from "./components/shared/HomePage";
import AuthRedirect from "./components/AuthRedirect";
import Login from "./components/forms/Login";
import Signup from "./components/forms/Signup";
import { store } from "./app/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route element={<AuthRedirect />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
