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
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import CardTableSubComponent from "./CardTableSubComponent";
import CardNombreBeneficiario from "./CardNombreBeneficiario";
import CardDniBeneficiario from "./CardDniBeneficiario";
import CardDireccionBeneficiario from "./CardDireccionBeneficiario";

const CardTypesBeneficiario = ({
  color,
  title,
  description,
  total,
  icon,
  type,
  list,
}: any) => {
  return (
    <Card minH="83px" maxW={"800px"}>
      <CardBody>
        <Flex flexDirection="row" align="center" justify="left" w="100%">
          {icon && (
            <Icon
              as={icon}
              w="20%"
              h="100%"
              mr={2}
              color={color === "muni.verde" ? "muni.celeste" : "muni.verde"}
            />
          )}
          <Text fontWeight={"bold"} fontSize={"3xl"} mb={2} color={color} lineHeight={1.0}>
            {title}
          </Text>
        </Flex>
        <Text fontWeight={"bold"} fontSize={"xl"} mb={2}>
          {description}
        </Text>
        {list?.map((item: any, index: number) => (
          <UnorderedList key={index}>
            <ListItem color={"muni.verde"} fontSize={"md"} mb={2}>
              <Text color={"gray.800"}>{item}</Text>
            </ListItem>
          </UnorderedList>
        ))}
      </CardBody>
    </Card>
  );
};

export default CardTypesBeneficiario;
