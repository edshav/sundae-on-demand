import axios from "axios";
import { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import AlertBanner from "shared/AlertBanner";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";

export default function Options({ optionsType }) {
  const [items, setItems] = useState([]);
  const [isError, setIsError] = useState();

  // optionsType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionsType}`)
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
    optionsType === "scoops" ? ScoopOptions : ToppingOptions;

  const optionItems = items.map(({ name, imagePath }) => (
    <ItemComponent key={name} name={name} imagePath={imagePath} />
  ));

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={10}>
      {optionItems}
    </SimpleGrid>
  );
}
