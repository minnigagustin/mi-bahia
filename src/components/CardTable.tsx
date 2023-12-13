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
} from "@chakra-ui/react";
import CardTableSimple from "./CardTableSimple";
import CardTableSubComponent from "./CardTableSubComponent";
import { useSelector } from "react-redux";

const CardTable = ({ color, title, description, total, icon }: any) => {
  const { prestacionesregistradas } = useSelector((resp: any) => resp.inicio);
  return (
    <Card minH="83px">
      <CardBody>
        <Text fontWeight={"bold"} fontSize={"xl"} mb={2} color={"gray.800"}>
          Prestaciones
        </Text>
        <Tabs align="center" variant="soft-rounded" isFitted>
          <TabList>
            <Tab _selected={{ color: "white", bg: "#6690F4" }}>
              Total Registradas
            </Tab>
            <Tab isDisabled _selected={{ color: "white", bg: "#6690F4" }}>
              Disponibles por Categoría
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <CardTableSubComponent list={prestacionesregistradas} />
            </TabPanel>
            <TabPanel>
              <CardTableSubComponent />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default CardTable;
