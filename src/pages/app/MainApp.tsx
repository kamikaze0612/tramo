import { Outlet } from "react-router-dom";

import Container from "./Container";
import Map from "./Map";

function MainApp() {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <Container>
        <Outlet />
      </Container>
      <Map />
    </div>
  );
}

export default MainApp;
