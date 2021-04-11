import { useState } from "react";
import {
  Button,
  Checkbox,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
export default function SummaryForm() {
  const [isChecked, setIsChecked] = useState(false);
  const onCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const termsAndConditions = (
    <Text as="span">
      I agree to{" "}
      <Popover trigger="hover">
        <PopoverTrigger>
          <Text as="span" color="cyan.700" fontWeight="bold">
            Terms and Conditions
          </Text>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>No ice cream will actually be delivered</PopoverBody>
        </PopoverContent>
      </Popover>
    </Text>
  );

  return (
    <VStack w="400px" spacing={4}>
      <Checkbox colorScheme="cyan" onChange={onCheckboxChange}>
        {termsAndConditions}
      </Checkbox>
      <Button colorScheme="cyan" isDisabled={!isChecked}>
        Confirm order
      </Button>
    </VStack>
  );
}
