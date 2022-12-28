import { DatePicker, Space } from "antd";
import moment from "moment";
import React from "react";

const range = (start, end) => {
  const result = [];

  for (let i = start; i < end; i++) {
    result.push(i);
  }

  return result;
}; // eslint-disable-next-line arrow-body-style

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
};

const onChange = (value, dateString) => {
  console.log("Selected Time: ", value);
  console.log("Formatted Selected Time: ", dateString);
};

const onOk = (value) => {
  console.log("onOk: ", value);
};

const newRange = range(0, 24).splice(10, 24);
// const finalRange = newRange.splice(8, 0, 9);
console.log(newRange);
// console.log(finalRange);

const disabledDateTime = () => ({
  disabledHours: () => range(0, 24).splice(17, 24),
  disabledMinutes: () => range(),
  disabledSeconds: () => [],
});
console.log(newRange);

const Picker = () => (
  <Space direction="vertical" size={12}>
    <DatePicker
      onChange={onChange}
      onOk={onOk}
      format="YYYY-MM-DD HH:mm:ss"
      disabledDate={disabledDate}
      disabledTime={disabledDateTime}
      showTime={{
        defaultValue: moment("00:00:00", "HH:mm:ss"),
      }}
    />
  </Space>
);

export default Picker;
