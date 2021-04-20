import { Heading } from "@chakra-ui/react";

function H1Heading({ children, ...props }) {
  return (
    <Heading as="h1" size="2xl" mb={4} {...props}>
      {children}
    </Heading>
  );
}

export default H1Heading;
