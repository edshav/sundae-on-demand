import { useState } from "react";
import {
  Checkbox,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import PrimaryButton from "shared/PrimaryButton";
export default function SummaryForm({ setPageToConfirmation }) {
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
    <VStack w="400px" spacing={4} mx="auto" mt={16}>
      <Checkbox colorScheme="cyan" onChange={onCheckboxChange}>
        {termsAndConditions}
      </Checkbox>
      <PrimaryButton
        colorScheme="cyan"
        isDisabled={!isChecked}
        onClick={setPageToConfirmation}
      >
        Confirm order
      </PrimaryButton>
    </VStack>
  );
}
