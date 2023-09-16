import { useState } from "react";
import { Button, Space } from "antd-mobile";
import AppLayout from "./components/AppLayout";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./router";
import FullLoading from "./components/FullLoading";

/* const themeConfig = {
  token: {
    // Seed Token，影响范围大
    colorSuccess: "#f60",
  },
  algorithm: [theme.compactAlgorithm],
};

console.log("generateNeutralColorPalettes", theme.getDesignToken(themeConfig)); */

function App() {
  return (
    <div className="app h-full">
      <RouterProvider router={AppRouter()} fallbackElement={<FullLoading getContainer={document.body} />} />
    </div>
  );
}
App.displayName = "App";
export default App;
