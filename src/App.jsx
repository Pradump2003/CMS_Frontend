import Navbar from "./component/navbar/Navbar";
import CustomRoutes from "./routes";

export default function App() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <CustomRoutes />
    </div>
  );
}
