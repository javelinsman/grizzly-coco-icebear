import { Box, Button, Text } from "grommet";
import React, { useState } from "react";
import { useThunkDispatch } from "../redux/action/root-action";

interface Props {
  type: "self" | "other";
  nick: string;
  message: string;
  options: { id: string; value: string }[];
  selected: string | null;
  active: boolean;
  onSelectOption: (option: { id: string; value: string }) => any;
}

const SelectionBox: React.FC<Props> = ({
  type,
  nick,
  message,
  options,
  selected,
  active,
  onSelectOption,
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
        <Text style={{ wordBreak: "break-word" }} margin={{ bottom: "10px" }}>
          {message}
        </Text>
        {options.map((option, i) => (
          <Button
            key={i}
            label={option.value}
            primary={option.id === tempSelected}
            margin={{ vertical: "5px" }}
            onClick={() => active && setTempSelected(option.id)}
          />
        ))}
        {active && (
          <Button hoverIndicator={false}>
            <Box
              margin={{ top: "small" }}
              pad={{ horizontal: "medium", vertical: "small" }}
              background="brand"
              style={{ color: "white" }}
              onClick={() => {
                if (tempSelected) {
                  const option = options.find((o) => o.id === tempSelected);
                  if (option) {
                    onSelectOption(option);
                  }
                }
              }}
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
