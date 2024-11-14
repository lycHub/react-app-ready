import { Profiler } from "react";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./router";

function App() {
  function onRender() {
    console.log("onRender");
  }
  return (
    <div className="app h-full">
      <Profiler id="app" onRender={onRender}>
        <RouterProvider
          future={{ v7_startTransition: true }}
          router={AppRouter()}
          // fallbackElement={<MaskBg className="center" />}
        />
      </Profiler>
    </div>
  );
}
App.displayName = "App";
export default App;
