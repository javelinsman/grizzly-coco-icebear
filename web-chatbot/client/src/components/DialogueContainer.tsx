import { Box } from "grommet";
import React, { createRef, useLayoutEffect, useRef } from "react";
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
  const encryptedPk = useRootSelector((state) => state.auth.encryptedPk);
  const dispatch = useThunkDispatch();

  const refs = useRef([]);
  if (refs.current.length !== dialogs.length) {
    refs.current = new Array(dialogs.length)
      .fill(0)
      .map((_, i) => refs.current[i] || createRef());
  }
  useLayoutEffect(() => {
    console.log({ refs });
    if (refs && refs.current) {
      const ref = refs.current[refs.current.length - 1] as any;
      console.log({ refs, ref });
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [dialogs]);

  if (fetching === "none") {
    dispatch(actionDialog.load.thunk(encryptedPk));
    return <Container />;
  }
  return (
    <Container>
      {dialogs.map((dialog, i) => {
        if (dialog.type === "message") {
          const { authorType: type, nick, message } = dialog;
          return (
            <div ref={refs.current[i]}>
              <MessageBox key={i} type={type} nick={nick} message={message} />
            </div>
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
            <div ref={refs.current[i]}>
              <SelectionBox
                key={i}
                type={type}
                nick={nick}
                message={message}
                options={options}
                selected={selected}
                active={active}
                onSelectOption={(option) => {
                  dispatch(actionDialog.next.thunk(encryptedPk, dialogs, option));
                }}
              />
            </div>
          );
        }
      })}
    </Container>
  );
};

export default DialogueContainer;
