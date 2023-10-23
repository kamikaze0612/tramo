import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Homepage from "./pages/home/Homepage";
import Login from "./pages/login/Login";
import Contact from "./pages/contact/Contact";
import MainApp from "./pages/app/MainApp";
import CityList from "./pages/app/CityList";
import CountryList from "./pages/app/CountryList";
import ErrorEl from "./ui/ErrorEl";
import City from "./pages/app/City";
import Form from "./pages/app/Form";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/app",
      element: <MainApp />,
      children: [
        {
          path: "cities",
          element: <CityList />,
          errorElement: <ErrorEl />,
        },
        {
          path: "form",
          element: <Form />,
        },
        {
          path: "cities/:id",
          element: <City />,
        },
        {
          element: <Navigate replace to="cities" />,
          index: true,
        },
        {
          path: "countries",
          element: <CountryList />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
