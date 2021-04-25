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
import { isNotNegativeInt } from "utils";

export default function ScoopOption({ name, imagePath, updateItemCount }) {
  const [isValid, setIsValid] = useState(true);
  const handleChange = (value) => {
    updateItemCount(name, value);

    setIsValid(isNotNegativeInt(value));
  };
  return (
    <Box>
      <Image src={`${baseUrl}/${imagePath}`} alt={`${name} scoop`} w="75%" />
      <FormControl id={`${name}-count`}>
        <FormLabel>{name}</FormLabel>
        <NumberInput
          isInvalid={!isValid}
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
