import { Box, Checkbox } from "@chakra-ui/react";
import { baseUrl } from "api/localApi";

export default function ToppingOptions({ name, imagePath, updateItemCount }) {
  const handleChange = (e) => {
    const value = e.target.checked ? 1 : 0;
    updateItemCount(name, value);
  };

  return (
    <Box>
      <img src={`${baseUrl}/${imagePath}`} alt={`${name} topping`} />
      <Checkbox onChange={handleChange}>{name}</Checkbox>
    </Box>
  );
}
