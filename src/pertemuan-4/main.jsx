import { createRoot } from "react-dom/client";
import './tailwind.css';
import FrameworkListSearchFilter from "./FrameworkListSearchFilter"; // Sesuaikan nama filenya
import ResponsiveGrid from "./ResponsiveGrid";


createRoot(document.getElementById("root")).render(
  <div>
    {/* Cukup panggil yang ada fiturnya saja agar tidak double */}
    <ResponsiveGrid  />
  </div>
);