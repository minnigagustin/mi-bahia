import { useEffect, useState } from "react";
import React from "react";
import {
  Box,
  Text,
  Link,
  VStack,
  Flex,
  Image,
  Heading,
  Collapse,
  FormControl,
  Stack,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  HStack,
  Divider,
  Spinner,
  useColorModeValue,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Center,
  PinInput,
  PinInputField,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { AfipIcon, AutenticaIcon, AyudasIcon, MiBahiaIcon } from "../../components/Icons";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  // Chakra color mode
  const titleColor = useColorModeValue("muni.celeste", "teal.200");
  return (
    <>
      <Box
        bg={useColorModeValue("white", "white")}
        px={4}
        display={{ base: "none", md: "none", lg: "block" }}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"right"}>
          <Box>
            <Image
              src={
                "https://www.bahia.gob.ar/wp-content/uploads/2018/04/municipio-de-bahia-blanca.png"
              }
              alt="chakra image"
              maxWidth={{ md: "300px", lg: "200px", base: "200px" }}
            />
          </Box>
        </Flex>
      </Box>
      <Flex position="relative">
        <Flex
          h={{ base: "100vh", md: "100vh", lg: "90vh" }}
          w="100%"
          maxW="1044px"
          mx="auto"
          justifyContent="center"
          pt={{ sm: "10px", md: "0px" }}
        >
          <Flex
            alignItems="center"
            justifyContent="start"
            style={{ userSelect: "none" }}
            w={{ base: "100%", md: "80%", lg: "62%" }}
          >
            <Flex
              direction="column"
              w="100%"
              background="transparent"
              p="20px"
              mt={{ md: "0px", lg: "0px" }}
            >
              <Box
                padding="2"
                // @ts-ignore - "Does not exist" Type Error against Motion
                width="100%"
                height="70%"
                display="flex"
              >
                <MiBahiaIcon w="100%" h="100%" />
              </Box>
              <Text
                mb="30px"
                ms="4px"
                mt="0px"
                color={"blackAlpha.700"}
                fontWeight={600}
                fontSize={{ base: "15px", md: "20px", lg: "20px" }}
              >
                Ingresá al Municipio de Bahia Blanca
              </Text>

              <FormControl>
                <Link href="https://autentica.bahia.gob.ar/">
                  <Button
                    fontSize="10px"
                    type="submit"
                    bg="white"
                    w="100%"
                    h="45"
                    mb="20px"
                    boxShadow="2xl"
                    color="white"
                    mt="10px"
                    _hover={{
                      bg: "black",
                      color: "white",
                    }}
                    _active={{
                      bg: "black",
                      color: "white",
                    }}
                  >
                    <AutenticaIcon w="80%" h="100%" />
                  </Button>
                </Link>
              </FormControl>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
