import AWS from "aws-sdk";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { sampleData } from "./pages/Constants/sets";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CreateButton from "./pages/Common/CreateButton/CreateButton";
import ShowcaseCard from "./pages/Common/ShowcaseCard/ShowcaseCard";
import RecordButton from "./pages/Common/RecordButton/RecordButton";
import ControlButton from "./pages/Common/ControlButton/ControlButton";
import Wizard from "./pages/Wizard/Wizard";
import Home from "./pages/Home/Home";
import Read from "./pages/Read/Read";
import CreateStory from "./pages/CreateStory/CreateStory";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/start",
    element: <Wizard />,
  },
  {
    path: "/read/:id",
    element: <Read />,
  },
  {
    path: "/create",
    element: <CreateStory />,
  },
]);

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_Key,
  secretAccessKey: process.env.REACT_APP_SECRET_Key,
  region: "us-east-1",
});

function App() {
  return (
    <div className="App">
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
