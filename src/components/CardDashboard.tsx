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
} from "@chakra-ui/react";

const CardDashboard = ({ color, title, description, total, icon }: any) => {
  return (
    <Card minH="83px">
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
          <Text color={color} fontWeight={"bold"} fontSize={"5xl"}>
            {total}
          </Text>
        </Flex>
        <Text color={"gray.650"} fontWeight={"bold"} fontSize={"xl"}>
          {title}
        </Text>
        <Text color={"gray.650"} maxW={262} mt={2} fontSize={"sm"}>
          {description}
        </Text>
        <Button type="submit" mt={4} color={"#6690F4"} w="full">
          Ver Detalles {">"}
        </Button>
      </CardBody>
    </Card>
  );
};

export default CardDashboard;
