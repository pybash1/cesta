import React from "react";
import {
  Modal,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  FormElement,
} from "@nextui-org/react";

interface InputModalProps {
  title?: string | React.ReactNode;
  onSubmit?: (value: string) => void;
  label?: string;
  visible: boolean;
  handleClose: () => void;
}

export const InputModal: React.FC<InputModalProps> = ({
  title = "Create New Node",
  onSubmit,
  label = "Value",
  visible,
  handleClose,
}) => {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleClose();
    if (onSubmit) onSubmit(value);
    console.log("closed");
  };

  const onChange = (e: React.ChangeEvent<FormElement>) => {
    setValue(e.target.value);
  };

  return (
    <Modal
      closeButton
      onClose={handleClose}
      aria-labelledby="modal-title"
      open={visible}
      as="form"
      onSubmit={handleSubmit}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          {title}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder={label}
          onChange={onChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button autoFocus auto type="submit">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
