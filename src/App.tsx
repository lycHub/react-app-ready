import { useState } from "react";
import { Button, Space } from "antd-mobile";
import "./App.scss";

/* const themeConfig = {
  token: {
    // Seed Token，影响范围大
    colorSuccess: "#f60",
  },
  algorithm: [theme.compactAlgorithm],
};

console.log("generateNeutralColorPalettes", theme.getDesignToken(themeConfig)); */

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app h-full">
      <h1>app</h1>
      <ul>
        <li>aa</li>
        <li>bb</li>
      </ul>
      <Space wrap>
        <Button color='primary' fill='solid'>
          Solid
        </Button>
        <Button color='primary' fill='outline'>
          Outline
        </Button>
        <Button color='primary' fill='none'>
          None
        </Button>
      </Space>
    </div>
  );
}
App.displayName = "App";
export default App;
