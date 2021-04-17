import {
  Box,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { baseUrl } from "api/localApi";

export default function ScoopOptions({ name, imagePath, updateItemCount }) {
  const handleChange = (value) => {
    updateItemCount(name, value);
  };
  return (
    <Box>
      <img src={`${baseUrl}/${imagePath}`} alt={`${name} scoop`} />
      <FormControl id={`${name}-count`}>
        <FormLabel>{name}</FormLabel>
        <NumberInput defaultValue={0} onChange={handleChange}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </Box>
  );
}
