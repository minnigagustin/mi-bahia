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
import CardTableSubComponent from "./CardTableSubComponent";
import { useSelector } from "react-redux";

const CardBeneficiarioData = ({
  color,
  title,
  description,
  total,
  icon,
  list,
}: any) => {
  const { user } = useSelector((resp: any) => resp.consulta);
  return (
    <>
      <Card minH="83px">
        <CardBody>
          <Text fontWeight={"bold"} fontSize={"xl"} mb={2} color={"gray.800"}>
            Datos Principales
          </Text>
          <Flex
            flexDirection="row"
            borderTopWidth={0.02}
            borderColor={"gray.300"}
            pt={2}
            align="center"
            justify="left"
            w="100%"
          >
            <Text fontSize={"xl"} mb={2} w={24} color={"gray.800"}>
              Nombre
            </Text>
            <Text
              fontWeight={"bold"}
              ml={8}
              fontSize={"xl"}
              mb={2}
              color={"muni.verde"}
            >
              {user.Nombre}
            </Text>
          </Flex>
          <Flex
            flexDirection="row"
            borderTopWidth={0.02}
            borderColor={"gray.300"}
            pt={2}
            align="center"
            justify="left"
            w="100%"
          >
            <Text fontSize={"xl"} mb={2} w={24} color={"gray.800"}>
              Apellido
            </Text>
            <Text
              fontWeight={"bold"}
              ml={8}
              fontSize={"xl"}
              mb={2}
              color={"muni.verde"}
            >
              {user.Apellido}
            </Text>
          </Flex>
          <Flex
            flexDirection="row"
            borderTopWidth={0.02}
            borderColor={"gray.300"}
            pt={2}
            align="center"
            justify="left"
            w="100%"
          >
            <Text fontSize={"xl"} mb={2} w={24} color={"gray.800"}>
              DNI
            </Text>
            <Text
              fontWeight={"bold"}
              ml={8}
              fontSize={"xl"}
              mb={2}
              color={"muni.verde"}
            >
              {user.NumeroDocumento !== 0 && user.NumeroDocumento}
            </Text>
          </Flex>
          <Flex
            flexDirection="row"
            borderTopWidth={0.02}
            borderColor={"gray.300"}
            pt={2}
            align="center"
            justify="left"
            w="100%"
          >
            <Text fontSize={"xl"} mb={2} w={24} color={"gray.800"}>
              Dirección
            </Text>
            <Text
              fontWeight={"bold"}
              ml={8}
              fontSize={"xl"}
              mb={2}
              color={"muni.verde"}
            >
              {user.Calle} {user.Altura !== 0 && user.Altura}
            </Text>
          </Flex>
          <Flex
            flexDirection="row"
            borderTopWidth={0.02}
            borderColor={"gray.300"}
            pt={2}
            align="center"
            justify="left"
            w="100%"
          >
            <Text fontSize={"xl"} mb={2} w={24} color={"gray.800"}>
              Barrio
            </Text>
            <Text
              fontWeight={"bold"}
              ml={8}
              fontSize={"xl"}
              mb={2}
              color={"muni.verde"}
            >
              {user.Barrio}
            </Text>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default CardBeneficiarioData;
