"use client";

import { Flex, Rate } from "antd";
import { useState } from "react";

export type ItemRateProps = {
  userRate: number;
  readOnly: boolean;
  updateRate: (rate: number) => void;
};

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

export default function ItemRate({
  userRate,
  readOnly,
  updateRate,
}: ItemRateProps) {
  const [value, setValue] = useState(userRate);

  const onChange = (rate: number) => {
    setValue(rate);
    updateRate(rate);
  };

  return (
    <Flex gap="middle" vertical>
      <Rate
        tooltips={desc}
        onChange={onChange}
        value={value}
        allowClear={true}
        disabled={readOnly}
      />
    </Flex>
  );
}
