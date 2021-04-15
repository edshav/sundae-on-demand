import { Box } from "@chakra-ui/react";
import { baseUrl } from "api/localApi";

export default function ToppingOptions({ name, imagePath }) {
  return (
    <Box>
      <img src={`${baseUrl}/${imagePath}`} alt={`${name} topping`} />
    </Box>
  );
}
