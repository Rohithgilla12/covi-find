import { Button, Text } from "@chakra-ui/react";
import React from "react";

interface FilterButtonProps {
  count: number;
  onClick: any;
  name: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  count,
  name,
  onClick,
}) => {
  return (
    <Button
      width="100%"
      variant="outline"
      flexGrow={1}
      mx={1}
      background="#E5dfdf"
      flexDir="column"
      w={"fit-content"}
      onClick={onClick}
      _focus={{
        background: "#D2E2C7",
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
