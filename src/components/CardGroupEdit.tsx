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
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import CardTableSimple from "./CardTableSimple";
import CardTableSubComponent from "./CardTableSubComponent";
import { GruposIcon } from "./Icons";
import TableGroupFamily from "./TableGroupFamily";
import { useSelector } from "react-redux";

const CardGroupEdit = ({
  color,
  title,
  description,
  total,
  icon,
  children,
}: any) => {
  return (
    <Accordion mt={7} allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton
            bg={"muni.celeste"}
            borderRadius={4}
            p={4}
            _hover={{ opacity: 0.8 }}
          >
            <Flex flexDirection="row" align="center" justify="left" w="100%">
              <Icon
                as={icon}
                w="6%"
                display={{ base: "none", md: "flex" }}
                ml={4}
                h="100%"
                color={"white"}
                opacity={0.7}
              />
              <Text fontWeight={"bold"} fontSize={"3xl"} ml={4} color={"white"}>
                {title}
              </Text>
            </Flex>
            <AccordionIcon color={"white"} />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} bg={"white"}>
          {children}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default CardGroupEdit;
