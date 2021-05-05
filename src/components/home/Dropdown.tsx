import { Button, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import NextLink from "next/link";

interface DropdownProps {}

export const Dropdown: React.FC<DropdownProps> = ({}) => {
  const [option, setOption] = useState<string>("");

  const { data: dropDownData, error: _mapError } = useSWR(
    `https://ach4l.pythonanywhere.com/covifind/dropdown`,
    fetcher
  );
  return (
    <>
      <Select
        my={2}
        py={2}
        background={"gray.100"}
        color="black"
        onChange={(event) => {
          setOption(event.target.value);
        }}
        placeholder="Select city"
      >
        {dropDownData &&
          dropDownData.map((item: { id: string; name: string }) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
      </Select>
      {option.length > 0 && (
        <NextLink href={`map/${option}`}>
          <Button width="100%" my={2} py={2} variant="solid" colorScheme="blue">
            Go
          </Button>
        </NextLink>
      )}
    </>
  );
};
