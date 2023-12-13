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
import CardNombreBeneficiario from "./CardNombreBeneficiario";
import CardDniBeneficiario from "./CardDniBeneficiario";
import CardDireccionBeneficiario from "./CardDireccionBeneficiario";
import { AppDispatch } from "@component/store";
import { useDispatch, useSelector } from "react-redux";
import { checkBeneficiario } from "@component/store/consultaSlice";

const CardFormBeneficiario = ({
  color,
  title,
  description,
  total,
  icon,
  type,
  list,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { calles } = useSelector((resp: any) => resp.consulta);
  return (
    <Card minH="83px">
      <CardBody>
        <Text fontWeight={"bold"} fontSize={"xl"} mb={2} color={"gray.800"}>
          Consulta de Beneficiario
        </Text>
        <Tabs align="center" variant="soft-rounded" isFitted>
          <TabList>
            <Tab fontSize={14} _selected={{ color: "white", bg: "#6690F4" }}>
              Por NOMBRE Y APELLIDO
            </Tab>
            <Tab fontSize={14} _selected={{ color: "white", bg: "#6690F4" }}>
              Por DNI
            </Tab>
            <Tab
              fontSize={14}
              _selected={{ color: "white", bg: "#6690F4" }}
              isDisabled={calles.length === 0}
            >
              Por DIRECCIÓN
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <CardNombreBeneficiario />
            </TabPanel>
            <TabPanel>
              <CardDniBeneficiario />
            </TabPanel>
            <TabPanel>
              <CardDireccionBeneficiario />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default CardFormBeneficiario;
