import { Box, Text } from "grommet";
import React from "react";

interface Props {
  type: "self" | "other";
  nick: string;
  message: string;
}

const MessageBox: React.FC<Props> = ({ type, nick, message }) => {
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
        <Text style={{ wordBreak: "break-word"}}>{message}</Text>
      </Box>
    </Box>
  );
};

export default MessageBox;
