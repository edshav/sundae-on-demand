import { Heading } from "@chakra-ui/react";

function H2Heading({ children, ...props }) {
  return (
    <Heading as="h2" size="xl" {...props}>
      {children}
    </Heading>
  );
}

export default H2Heading;
