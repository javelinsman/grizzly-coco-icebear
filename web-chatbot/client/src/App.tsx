import { Box, Button, Grid, Text, TextArea } from 'grommet';
import React from 'react';
import MessageBox from './components/MessageBox';

const ChatTitle: React.FC = ({ children }) => (
  <Box width="100%" height="50px" background="rgb(88, 86, 86)">
    <Text margin="auto" style={{ fontSize: "150%" }}>{children} </Text>
  </Box>
)

const Dialog: React.FC = ({ children }) => (
      <Box fill={true} overflow={{ vertical: "scroll" }}
        background="rgb(160, 192, 215)" className="styled-scroll">
          {children}
        </Box>
)

function App() {
  return (
    <Grid fill={true} rows={["auto", "1fr", "auto"]}>
      <ChatTitle>증상 문의하기</ChatTitle>
      <Dialog>
        {new Array(20).fill(0).map(_ => (
          <>
            <MessageBox type="other" nick="알러뷰봇" message={"ㅋㅋㅋㅋㅋㅋㅋㅋ".repeat(Math.floor(Math.random() * 30))} />
            <MessageBox type="self" nick="회원님" message={"ㅋㅋㅋㅋㅋㅋㅋㅋ ".repeat(Math.floor(Math.random() * 30))} />
          </>
        ))}
      </Dialog>
      <Grid columns={["1fr", "auto"]}>
        <TextArea />
        <Button plain label="전송" style={{ backgroundColor: "rgb(88, 86, 86)", color: "white", width: "50px", textAlign: "center"}} />
      </Grid>
    </Grid>
  );
}

export default App;
