import React from "react";
import {
  VStack,
  Button,
  Text,
  Stack,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Card,
  CardBody,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";

const CardTableSubComponent = ({
  color,
  title,
  description,
  total,
  icon,
  list,
}: any) => {
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color={"muni.verde"}>Nombre Prestacíon</Th>
              <Th color={"muni.verde"} isNumeric>
                Cantidad Items
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {list?.map((item: any, index: number) => (
              <Tr key={index}>
                <Td>
                  {item.Beneficio}{" "}
                  {item.category && (
                    <Button
                      ml={4}
                      color="#6690F4"
                      fontSize={12}
                      borderColor="#6690F4"
                      variant="outline"
                    >
                      {item.category}
                    </Button>
                  )}
                </Td>
                <Td fontWeight={"bold"} isNumeric>
                  {item.Cantidad}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CardTableSubComponent;
