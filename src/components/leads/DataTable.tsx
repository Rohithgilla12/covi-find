import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Box,
  Input,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import NextLink from "next/link";
import TimeAgo from "react-timeago";

interface DataTableProps {
  leadData: any;
}

export const DataTable: React.FC<DataTableProps> = ({ leadData }) => {
  const data = React.useMemo(() => leadData, []);

  const columns: any = React.useMemo(
    () => [
      {
        Header: "Resource Type",
        accessor: "Resource_Type",
      },
      {
        Header: "Available",
        accessor: "Available",
        Cell: ({ cell: { value } }: any) =>
          value === "Available" ? "✅" : "❌",
      },
      {
        Header: "Name",
        accessor: "Name",
      },
      {
        Header: "District",
        accessor: "District",
      },
      {
        Header: "Contact",
        accessor: "Contact",
        Cell: ({ cell: { value } }: any) => (
          <NextLink href={`tel:${value}`}>{value}</NextLink>
        ),
      },
      {
        Header: "Last Verified",
        accessor: "Last_Verified_DT",
        Cell: ({ cell: { value } }: any) => <TimeAgo date={value} />,
      },
    ],
    []
  );

  const [filterInput, setFilterInput] = useState("");

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const handleFilterChange = (e: any) => {
    const value = e.target.value || undefined;
    setGlobalFilter(value);
    setFilterInput(value);
  };

  return (
    <Box background={"#FDFBED"} overflowX="scroll" w={"full"}>
      <Input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search"}
      />
      <Table size="sm" {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render("Header")}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => (
                  <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
