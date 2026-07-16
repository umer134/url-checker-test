import { Modal } from "../UI/Modal/Modal";

import { Button } from "../UI/Button/Button";

interface Props {
  open: boolean;

  loading: boolean;

  onConfirm(): void;

  onClose(): void;
}

export function CancelJobModal({
  open,

  loading,

  onConfirm,

  onClose,
}: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <h3>Cancel job?</h3>

      <p>Current URL checks that have not started will be cancelled.</p>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "24px",
        }}
      >
        <Button onClick={onClose} disabled={loading}>
          Keep running
        </Button>

        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {loading ? "Cancelling..." : "Cancel job"}
        </Button>
      </div>
    </Modal>
  );
}
