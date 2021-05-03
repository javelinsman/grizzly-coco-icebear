import { Button, Grid, TextArea } from "grommet";
import React, { useState } from "react";
import { actionDialog } from "../redux/action/dialog-action";
import { useThunkDispatch } from "../redux/action/root-action";
import { useRootSelector } from "../redux/state/root-state";

interface Props {}

const InputContainer: React.FC<Props> = () => {
  const inputState = useRootSelector((state) => state.dialogs.input);
  const dialogs = useRootSelector((state) => state.dialogs.dialogs);
  const dispatch = useThunkDispatch();
  const [text, setText] = useState("");
  if (inputState === "freeform") {
    return (
      <Grid columns={["1fr", "auto"]}>
        <TextArea value={text} onChange={(e) => setText(e.target.value)} />
        <Button
          plain
          label="전송"
          style={{
            backgroundColor: "rgb(88, 86, 86)",
            color: "white",
            width: "50px",
            textAlign: "center",
          }}
          onClick={() => {
            dispatch(
              actionDialog.next.thunk(dialogs, {
                id: "freeform-answer",
                value: text,
              })
            );
          }}
        />
      </Grid>
    );
  } else if (inputState === "init") {
    return (
      <Button
        plain
        label="문의 시작하기"
        style={{
          backgroundColor: "rgb(88, 86, 86)",
          color: "white",
          height: "50px",
          textAlign: "center",
        }}
        onClick={() => {
          dispatch(
            actionDialog.next.thunk(dialogs, {
              id: "init",
              value: "",
            })
          );
        }}
      />
    );
  } else if (inputState === "disable") {
    return (
      <Button
        plain
        label="문의 진행중..."
        style={{
          backgroundColor: "rgb(88, 86, 86)",
          color: "white",
          height: "50px",
          textAlign: "center",
        }}
        disabled={true}
      />
    );
  }
  return <div />;
};

export default InputContainer;
