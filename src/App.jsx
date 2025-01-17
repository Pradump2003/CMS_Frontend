import Navbar from "./component/Navbar";
import CustomRoutes from "./routes";

export default function App() {
  return (
    <div className="bg-white min-h-screen overflow-auto">
      <Navbar />
      <CustomRoutes />
    </div>
  );
}
