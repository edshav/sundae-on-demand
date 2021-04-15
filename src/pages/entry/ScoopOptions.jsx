import { Box } from "@chakra-ui/react";
import { baseUrl } from "api/localApi";

export default function ScoopOptions({ name, imagePath }) {
  return (
    <Box>
      <img src={`${baseUrl}/${imagePath}`} alt={`${name} scoop`} />
    </Box>
  );
}
