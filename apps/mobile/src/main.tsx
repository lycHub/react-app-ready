import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import { ConfigProvider } from 'antd';
import axios from 'axios';
import { addCollection } from '@iconify/react';

const ResetFormConfig = {
  borderRadius: 0,
  paddingInline: 0,
}

const MainColorConfig = {
  font: '#32373e',
  blue: '#0072ef',
  red: '#ed4f4f',
  green: '#3ad2a3',
  yellow: '#fdca3f',
}

axios.get('/public/zs.json').then(({ data }) => {
  // console.log(data);
  addCollection(data);
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    theme={{
      token: {
        colorTextBase: MainColorConfig.font,

        colorPrimary: MainColorConfig.blue,
        colorLink: MainColorConfig.blue,
        colorInfo: MainColorConfig.blue,
        colorInfoText: MainColorConfig.blue,
        colorPrimaryText: MainColorConfig.blue,

        // 红
        colorError: MainColorConfig.red,
        colorErrorText: MainColorConfig.red,
        colorHighlight: MainColorConfig.red,

        colorSuccess: MainColorConfig.green,
        colorSuccessText: MainColorConfig.green,

        colorWarning: MainColorConfig.yellow,
        colorWarningText: MainColorConfig.yellow
      },
      components: {
        Input: ResetFormConfig,
        InputNumber: ResetFormConfig,
        DatePicker: ResetFormConfig,
        ColorPicker: ResetFormConfig,
      }
    }}>
    <StrictMode><App /></StrictMode>

  </ConfigProvider>
)
