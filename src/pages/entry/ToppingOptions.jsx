import { Box, Checkbox, Image } from "@chakra-ui/react";
import { baseUrl } from "api/localApi";

export default function ToppingOptions({ name, imagePath, updateItemCount }) {
  const handleChange = (e) => {
    const value = e.target.checked ? 1 : 0;
    updateItemCount(name, value);
  };

  return (
    <Box>
      <Image src={`${baseUrl}/${imagePath}`} alt={`${name} topping`} w="75%" />
      <Checkbox onChange={handleChange}>{name}</Checkbox>
    </Box>
  );
}
