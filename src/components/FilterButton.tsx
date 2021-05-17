import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { Options, useSelectedButton } from "../context/ButtonSelection";

interface FilterButtonProps {
  count: number;
  onClick: any;
  name: string;
  option: Options;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  count,
  name,
  onClick,
  option,
}) => {
  const { selctedButton } = useSelectedButton();

  return (
    <Button
      width="100%"
      variant="outline"
      flexGrow={1}
      mx={1}
      background={selctedButton === option ? "#7AA776" : "#E5dfdf"}
      flexDir="column"
      w={"fit-content"}
      onClick={onClick}
      _focus={{
        background: "#7AA776",
      }}
      _active={{
        background: "#7AA776",
      }}
    >
      <Text fontSize="md" color="black">
        {name}
      </Text>
      <Text fontSize="x-small" color="black">
        {count}
      </Text>
    </Button>
  );
};

export default FilterButton;
