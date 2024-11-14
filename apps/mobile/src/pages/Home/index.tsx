import React from "react";
import { motion } from "framer-motion";
import {
  Button,
  DatePicker,
  Input,
  Select,
  TimePicker,
  Typography,
} from "antd";
import { xmData } from "../../apis/xmly";
import { useMount } from "ahooks";
import axios from "axios";
import { Icon, addCollection, addIcon } from "@iconify/react";
import { json } from "react-router-dom";
import "./style.scoped.scss";
// import cssString from "./style.scoped.scss?raw";

function kebabCaseForPath(path: string) {
  return path.split("/").filter(Boolean).join("-");
}
function Home() {
  useMount(() => {
    // console.log("cssString>>>", cssString);
    fetch("https://dogapi.dog/api/v2/breeds")
      .then((res) => res.json())
      .then((res) => {
        if (import.meta.env.DEV) {
          axios.post("/gen-dts", { [kebabCaseForPath("/api/v2/breeds")]: res });
        }
      });
  });

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.4 }}
    >
      <img src="/images/doc.png" alt="doc" width="48" height="48" />
      <div className="btn-group">
        <p className="text-p">text</p>
        <Button type="primary">Click</Button>
        <a>link</a>
        <Typography.Link>Alink</Typography.Link>
      </div>
      <div className="form-controls">
        <div className="from-control">
          <Input className="zs-input" variant="borderless" allowClear />
        </div>
        <div className="from-control">
          <Input.TextArea
            className="zs-input"
            variant="borderless"
            allowClear
          />
        </div>
        <div className="from-control">
          <Select
            className="zs-select"
            style={{ width: "300px" }}
            mode="multiple"
            showSearch
            allowClear
            optionFilterProp="label"
            variant="borderless"
            options={[{ label: "撒旦撒", value: "aa" }]}
          />
        </div>
        <div className="from-control">
          <DatePicker className="zs-picker" variant="borderless" allowClear />
        </div>
        <div className="from-control">
          <TimePicker className="zs-picker" variant="borderless" allowClear />
        </div>
      </div>

      <Icon icon="mdi-light:home" />
      <Icon icon="zs:search" style={{ color: "blue" }} />
      <Icon icon="zs:shopping" style={{ color: "red" }} />
      <Icon icon="zs:user" style={{ color: "yellow", fontSize: "24px" }} />
    </motion.div>
  );
}

Home.displayName = "Home";
export default Home;
