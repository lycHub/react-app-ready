import { useState } from "react";
import { Space, Typography, ConfigProvider, theme } from "antd";

const { Text, Link } = Typography;

import "./App.css";

const themeConfig = {
  token: {
    // Seed Token，影响范围大
    colorSuccess: "#FDCA3F",
  },
  algorithm: [theme.compactAlgorithm],
};

// console.log("generateNeutralColorPalettes", theme.generateNeutralColorPalettes);

function App() {
  const [count, setCount] = useState(0);

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="app h-full">
        <h1>app</h1>
        <Space direction="vertical">
          <Text>Ant Design (default)</Text>
          <Text type="secondary">Ant Design (secondary)</Text>
          <Text type="success">Ant Design (success)</Text>
          <Text type="warning">Ant Design (warning)</Text>
          <Text type="danger">Ant Design (danger)</Text>
          <Text disabled>Ant Design (disabled)</Text>
          <Text mark>Ant Design (mark)</Text>
          <Text code>Ant Design (code)</Text>
          <Text keyboard>Ant Design (keyboard)</Text>
          <Text underline>Ant Design (underline)</Text>
          <Text delete>Ant Design (delete)</Text>
          <Text strong>Ant Design (strong)</Text>
          <Text italic>Ant Design (italic)</Text>
          <Link href="https://ant.design" target="_blank">
            Ant Design (Link)
          </Link>
        </Space>
      </div>
    </ConfigProvider>
  );
}
App.displayName = "App";
export default App;
