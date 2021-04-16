import { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import AlertBanner from "shared/AlertBanner";
import { localApi } from "api/localApi";
import { options } from "app-constants";

import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [isError, setIsError] = useState();

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

  const optionItems = items.map(({ name, imagePath }) => (
    <ItemComponent key={name} name={name} imagePath={imagePath} />
  ));

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={10}>
      {optionItems}
    </SimpleGrid>
  );
}
