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

const TableGroupFamily = ({
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
              <Th>Individuo</Th>
              <Th isNumeric>Edad</Th>
              <Th>Ing. Laborales</Th>
              <Th>T1</Th>
              <Th>M1</Th>
              <Th>T2</Th>
              <Th>M2</Th>
              <Th>T3</Th>
              <Th>M3</Th>
              <Th>T4</Th>
              <Th>M4</Th>
              <Th>T5</Th>
              <Th>M5</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list?.map((item: any, index: number) => (
              <Tr key={index}>
                <Td>
                  {item.Apellido}, {item.Nombre} ({item.NumeroDocumento})
                </Td>
                <Td fontWeight={"bold"} isNumeric>
                  {item.Edad}
                </Td>
                <Td fontWeight={"bold"} isNumeric>
                  {item.IngresosLaborales}
                </Td>
                <Td fontWeight={"bold"}>{item.ing1}</Td>
                <Td fontWeight={"bold"} isNumeric>
                  {item.mnt1}
                </Td>
                <Td fontWeight={"bold"}>{item.ing2}</Td>
                <Td fontWeight={"bold"} isNumeric>
                  {item.mnt2}
                </Td>
                <Td fontWeight={"bold"}>{item.ing3}</Td>
                <Td fontWeight={"bold"} isNumeric>
                  {item.mnt3}
                </Td>
                <Td fontWeight={"bold"}>{item.ing4}</Td>
                <Td fontWeight={"bold"} isNumeric>
                  {item.mnt4}
                </Td>
                <Td fontWeight={"bold"}>{item.ing5}</Td>
                <Td fontWeight={"bold"} isNumeric>
                  {item.mnt5}
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th fontSize={16}>TOTALES</Th>
              <Th></Th>
              <Th fontSize={16} textAlign="center" color="muni.celeste"></Th>
              <Th fontSize={16} color="muni.celeste">
                0
              </Th>
              <Th fontSize={16} color="muni.celeste">
                {list?.reduce((prev: any, curr: any) => prev + curr.mnt1, 0)}
              </Th>
              <Th fontSize={16} color="muni.celeste"></Th>
              <Th fontSize={16} color="muni.celeste">
                {list?.reduce((prev: any, curr: any) => prev + curr.mnt2, 0)}
              </Th>
              <Th fontSize={16} color="muni.celeste"></Th>
              <Th fontSize={16} color="muni.celeste" isNumeric>
                {list?.reduce((prev: any, curr: any) => prev + curr.mnt3, 0)}
              </Th>
              <Th fontSize={16} color="muni.celeste"></Th>
              <Th fontSize={16} color="muni.celeste" isNumeric>
                {list?.reduce((prev: any, curr: any) => prev + curr.mnt4, 0)}
              </Th>
              <Th fontSize={16} color="muni.celeste"></Th>
              <Th fontSize={16} color="muni.celeste" isNumeric>
                {list?.reduce((prev: any, curr: any) => prev + curr.mnt5, 0)}
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableGroupFamily;
