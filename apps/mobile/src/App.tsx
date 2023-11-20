import { Profiler } from "react";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./router";
import { MaskBg } from '@app-ready/libs';

function App() {
  function onRender() { }
  return (
    <div className="app h-full">
      <Profiler id="app" onRender={onRender}>
        <RouterProvider router={AppRouter()} fallbackElement={<MaskBg className="center" />} />
      </Profiler>
    </div>
  );
}
App.displayName = "App";
export default App;
