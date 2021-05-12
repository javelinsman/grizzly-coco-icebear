import { Box, Grid, Text } from "grommet";
import React from "react";
import { useParams } from "react-router";
import { actionAuth } from "../redux/action/auth-action";
import { useThunkDispatch } from "../redux/action/root-action";
import { useRootSelector } from "../redux/state/root-state";
import DialogueContainer from "./DialogueContainer";
import InputContainer from "./InputContainer";

interface Props {}

const ChatTitle: React.FC = ({ children }) => (
  <Box width="100%" height="50px" background="rgb(88, 86, 86)">
    <Text margin="auto" style={{ fontSize: "150%" }}>
      {children}
    </Text>
  </Box>
);

const MainContainer: React.FC<Props> = () => {
  const { patientId } = useParams<{patientId: string}>();
  const pk = useRootSelector(state => state.auth.encryptedPk);
  const dispatch = useThunkDispatch();
  if (!pk) {
    dispatch(actionAuth.setEncryptedPK(patientId || "anonymous"))
    return <div />
  }

  return (
    <Grid fill={true} rows={["auto", "1fr", "auto"]}>
      <ChatTitle>증상 문의하기</ChatTitle>
      <DialogueContainer />
      <InputContainer />
    </Grid>
  );
};

export default MainContainer;
