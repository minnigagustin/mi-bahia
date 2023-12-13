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
import moment from "moment";
const CardAyudas = ({
  color,
  title,
  description,
  total,
  icon,
  type,
  list,
}: any) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th color={"muni.verde"}>FECHA</Th>
            <Th color={"muni.verde"}>AYUDA</Th>
            <Th color={"muni.verde"}>ASISTENTE</Th>
            <Th color={"muni.verde"}>ESTADO</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list?.map((item: any, index: number) => (
            <Tr key={index}>
              <Td>{item.FechaOperacion}</Td>
              <Td fontWeight={"bold"}>{item.Ayuda}</Td>
              <Td>{item.Asistente === "-" ? "" : item.Asistente}</Td>
              <Td>{item.Estado}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CardAyudas;
