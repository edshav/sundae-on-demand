import {
  Box,
  FormControl,
  FormLabel,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { baseUrl } from "api/localApi";

export default function ScoopOptions({ name, imagePath, updateItemCount }) {
  const handleChange = (value) => {
    if (parseInt(value) < 0) return;
    updateItemCount(name, value);
  };
  return (
    <Box>
      <Image src={`${baseUrl}/${imagePath}`} alt={`${name} scoop`} w="75%" />
      <FormControl id={`${name}-count`}>
        <FormLabel>{name}</FormLabel>
        <NumberInput
          defaultValue={0}
          inputMode="numeric"
          min={0}
          max={10}
          onChange={handleChange}
        >
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
