import { useEffect, useState } from "react";
import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import AlertBanner from "shared/AlertBanner";
import { localApi } from "api/localApi";
import { options, pricePerItem } from "app-constants";
import { useOrderDetails } from "contexts/OrderDetails";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [isError, setIsError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    localApi
      .get(`/${optionType}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, [optionType]);

  if (isError) {
    return <AlertBanner />;
  }

  const ItemComponent =
    optionType === options.scoops ? ScoopOptions : ToppingOptions;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map(({ name, imagePath }) => (
    <ItemComponent
      key={name}
      name={name}
      imagePath={imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  return (
    <>
      <Heading as="h2">{title}</Heading>
      <Text>{pricePerItem[optionType]} each</Text>
      <Text>
        {title} total: {orderDetails.totals[optionType]} each
      </Text>
      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        {optionItems}
      </SimpleGrid>
    </>
  );
}
