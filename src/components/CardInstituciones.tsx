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
const CardInstituciones = ({
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
            <Th color={"muni.verde"}>CATEGORIA</Th>
            <Th color={"muni.verde"}>BENEFICIO</Th>
            <Th color={"muni.verde"}>INSTITUCION</Th>
            <Th color={"muni.verde"}>SEDE</Th>
            <Th color={"muni.verde"}>FRECUENCIA</Th>
            <Th color={"muni.verde"}>Duracion</Th>
            <Th color={"muni.verde"}>FECHA</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list?.map((item: any, index: number) => (
            <Tr key={index}>
              <Td>{item.Categoria}</Td>
              <Td>{item.Beneficio}</Td>
              <Td>{item.Institucion}</Td>
              <Td>{item.sede}</Td>
              <Td>{item.Frecuencia}</Td>
              <Td>{item.Frecuencia}</Td>
              <Td>{moment(item.FECHA).format("DD/MM/YY")}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CardInstituciones;
