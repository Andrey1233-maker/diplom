import { Outlet } from "react-router-dom";
import { Header, Footer } from "../../components";

import "./TemplatePage.styles.css";

export default function TemplatePage() {
  return (
    <div class="page">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
