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
import { useState } from "react";

export default function ScoopOption({ name, imagePath, updateItemCount }) {
  const [isInvalid, setIsInvalid] = useState(false);
  const handleChange = (value) => {
    updateItemCount(name, value);

    const valueFloat = parseFloat(value);
    setIsInvalid(
      0 >= valueFloat ||
        valueFloat >= 10 ||
        Math.floor(valueFloat) !== valueFloat
    );
  };
  return (
    <Box>
      <Image src={`${baseUrl}/${imagePath}`} alt={`${name} scoop`} w="75%" />
      <FormControl id={`${name}-count`}>
        <FormLabel>{name}</FormLabel>
        <NumberInput
          isInvalid={isInvalid}
          defaultValue={0}
          inputMode="numeric"
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
