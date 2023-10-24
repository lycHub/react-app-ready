import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSafeState } from "ahooks";
import { Button } from "antd-mobile";

function Basic() {
  const [show, setShow] = useSafeState(false);

  return (
    <div className="motion-demo">
      <Button onClick={() => setShow(!show)}>toggle</Button>
      <AnimatePresence>
        {
          show ? <motion.div
            className="motion-box"
            initial={{ x: 0 }}
            animate={{ x: 100 }}
            exit={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          /> : null
        }
      </AnimatePresence>
    </div>
  );
}
Basic.displayName = 'Basic';
export default Basic;
