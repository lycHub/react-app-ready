import { Profiler } from "react";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./router";
import FullLoading from "./components/FullLoading";

function App() {
  function onRender() { }
  return (
    <div className="app h-full">
      <Profiler id="app" onRender={onRender}>
        <RouterProvider router={AppRouter()} fallbackElement={<FullLoading getContainer={document.body} />} />
      </Profiler>
    </div>
  );
}
App.displayName = "App";
export default App;
