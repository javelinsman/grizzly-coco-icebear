import { Box, Button, Grid, Grommet, Text, TextArea } from "grommet";
import React from "react";
import DialogueContainer from "./components/DialogueContainer";
import InputContainer from "./components/InputContainer";

const ChatTitle: React.FC = ({ children }) => (
  <Box width="100%" height="50px" background="rgb(88, 86, 86)">
    <Text margin="auto" style={{ fontSize: "150%" }}>
      {children}
    </Text>
  </Box>
);

function App() {
  return (
      <Grid fill={true} rows={["auto", "1fr", "auto"]}>
        <ChatTitle>증상 문의하기</ChatTitle>
        <DialogueContainer />
        <InputContainer />
      </Grid>
  );
}

export default App;
