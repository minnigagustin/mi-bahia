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
const CardAtencion = ({
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
            <Th color={"muni.verde"}>DIAGNOSTICO</Th>
            <Th color={"muni.verde"}>UNIDAD SANITARIA</Th>
            <Th color={"muni.verde"}>FECHA</Th>

            <Th color={"muni.verde"}>TIPO</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list?.map((item: any, index: number) => (
            <Tr key={index}>
              <Td>{item.DIAGNOSTICO}</Td>
              <Td>{item.UNIDADSANITARIA}</Td>
              <Td>{moment(item.FECHA).format("DD/MM/YY")}</Td>
              <Td>{item.TIPO}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CardAtencion;
