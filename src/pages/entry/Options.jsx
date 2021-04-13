import axios from "axios";
import { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import ScoopOptions from "./ScoopOptions";

export default function Options({ optionsType }) {
  const [items, setItems] = useState([]);

  // optionsType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionsType}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        // TODO: handle error response
      });
  }, [optionsType]);

  // TODO: replace `null` with ToppingOptions when available
  const ItemComponent = optionsType === "scoops" ? ScoopOptions : null;

  const optionItems = items.map(({ name, imagePath }) => (
    <ItemComponent key={name} name={name} imagePath={imagePath} />
  ));

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={10}>
      {optionItems}
    </SimpleGrid>
  );
}
