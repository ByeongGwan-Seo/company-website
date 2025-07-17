import "./App.css";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import About from "./Pages/About/About";
import Leadership from "./Pages/Leadership/Leadership";
import Service from "./Pages/Service/Service";
import Board from "./Pages/Board/Board";
import Contact from "./Pages/Contact/Contact";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/leadership",
        element: <Leadership />,
      },
      {
        path: "/service",
        element: <Service />,
      },
      {
        path: "/board",
        element: <Board />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
