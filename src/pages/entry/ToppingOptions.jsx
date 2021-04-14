import { Box } from "@chakra-ui/react";

export default function ToppingOptions({ name, imagePath }) {
  return (
    <Box>
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
    </Box>
  );
}
