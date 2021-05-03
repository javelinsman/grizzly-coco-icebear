import { Box } from "grommet";
import React from "react";
import MessageBox from "./MessageBox";
import SelectionBox from "./SelectionBox";
import { useRootSelector } from "../redux/state/root-state";
import { useThunkDispatch } from "../redux/action/root-action";
import { actionDialog } from "../redux/action/dialog-action";

const Container: React.FC = ({ children }) => (
  <Box
    fill={true}
    overflow={{ vertical: "scroll" }}
    background="rgb(160, 192, 215)"
    className="styled-scroll"
  >
    {children}
  </Box>
);

interface Props {}

const DialogueContainer: React.FC<Props> = () => {
  const dialogs = useRootSelector((state) => state.dialogs.dialogs);
  const fetching = useRootSelector((state) => state.dialogs.fetching);
  const dispatch = useThunkDispatch();
  if (fetching === "none") {
    dispatch(actionDialog.load.thunk());
    return <Container />;
  }
  return (
    <Container>
      {dialogs.map((dialog, i) => {
        if (dialog.type === "message") {
          const { authorType: type, nick, message } = dialog;
          return (
            <MessageBox key={i} type={type} nick={nick} message={message} />
          );
        } else if (dialog.type === "selection") {
          const {
            authorType: type,
            nick,
            message,
            options,
            selected,
            active,
          } = dialog;
          return (
            <SelectionBox
              key={i}
              type={type}
              nick={nick}
              message={message}
              options={options}
              selected={selected}
              active={active}
              onSelectOption={(option) => {
                dispatch(
                  actionDialog.next.thunk(dialogs, option)
                );
              }}
            />
          );
        }
      })}
    </Container>
  );
};

export default DialogueContainer;
