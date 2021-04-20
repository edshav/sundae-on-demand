import { Button } from "@chakra-ui/react";

function PrimaryButton({ children, ...props }) {
  return (
    <Button colorScheme="teal" {...props}>
      {children}
    </Button>
  );
}

export default PrimaryButton;
