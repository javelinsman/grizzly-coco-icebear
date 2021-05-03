import { Box, Button, Text } from "grommet";
import React, { useState } from "react";

interface Props {
  type: "self" | "other";
  nick: string;
  message: string;
  options: string[];
  selected: string | null;
  active: boolean;
}

const SelectionBox: React.FC<Props> = ({
  type,
  nick,
  message,
  options,
  selected,
  active,
}) => {
  const [tempSelected, setTempSelected] = useState(selected || null);

  return (
    <Box
      direction="column"
      align={type === "self" ? "end" : "start"}
      height={{ min: "auto" }}
      pad="medium"
    >
      <Box style={{ fontWeight: "bold" }}>{nick}</Box>
      <Box
        height={{ min: "0px" }}
        width={{ max: "85%" }}
        background={type === "self" ? "rgb(255,236,66)" : "white"}
        margin={{ vertical: "5px" }}
        pad="medium"
        style={{
          border: "0px solid",
          borderRadius: "3px",
        }}
      >
        <Text margin={{ bottom: "10px" }}>{message}</Text>
        {options.map((option) => (
          <Button
            label={option}
            primary={option === tempSelected}
            margin={{ vertical: "5px" }}
            onClick={() => active && setTempSelected(option)}
          />
        ))}
        {active && (
          <Button hoverIndicator={false}>
            <Box
              margin={{ top: "small" }}
              pad={{ horizontal: "medium", vertical: "small" }}
              background="brand"
              style={{ color: "white" }}
            >
              <Text alignSelf="center">응답 제출</Text>
            </Box>
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SelectionBox;
