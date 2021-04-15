import { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import AlertBanner from "shared/AlertBanner";
import { localApi } from "api/localApi";
import { options } from "app-constants";

import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";

export default function Options({ optionsType }) {
  const [items, setItems] = useState([]);
  const [isError, setIsError] = useState();

  // optionsType is 'scoops' or 'toppings'
  useEffect(() => {
    localApi
      .get(`/${optionsType}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, [optionsType]);

  if (isError) {
    return <AlertBanner />;
  }

  const ItemComponent =
    optionsType === options.scoops ? ScoopOptions : ToppingOptions;

  const optionItems = items.map(({ name, imagePath }) => (
    <ItemComponent key={name} name={name} imagePath={imagePath} />
  ));

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={10}>
      {optionItems}
    </SimpleGrid>
  );
}
