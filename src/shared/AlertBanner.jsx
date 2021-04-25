import { Alert, AlertIcon } from "@chakra-ui/react";
import { defaultErrorMessage } from "app-constants";

export default function AlertBanner({
  alertMessage = defaultErrorMessage,
  alertStatus = "error",
}) {
  return (
    <Alert
      // @ts-ignore
      status={alertStatus}
      variant="subtle"
    >
      <AlertIcon />
      {alertMessage}
    </Alert>
  );
}
