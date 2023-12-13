import * as React from "react";
import {
  Box,
  Text,
  VStack,
  Grid,
  SkeletonText,
  Skeleton,
  useColorModeValue,
  SimpleGrid,
  HStack,
  Spinner,
  Stack,
  Flex,
  keyframes,
} from "@chakra-ui/react";
import { AyudasIcon, IndicadoresIcon } from "./Icons";
import { motion } from "framer-motion";

const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(0);}
  50% { transform: scale(1.5) rotate(360deg);}
  100% { transform: scale(1) rotate(720deg);}

`;

const animationKeyframesnew = keyframes`
  0% { opacity: 1}
  50% { opacity: 0}
  100% { opacity: 1}

`;

const animation = `${animationKeyframesnew} 2s  ease-in-out infinite`;

export const LoginCarga = () => {
  const color = useColorModeValue("white", "gray.700");
  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        minHeight="87vh"
        bg={color}
      >
        <VStack spacing={6}>
          <Box
            as={motion.div}
            animation={animation}
            padding="2"
            // @ts-ignore - "Does not exist" Type Error against Motion
            width="100%"
            height="70%"
            display="flex"
          >
            <AyudasIcon w="100%" h="100%" />
          </Box>
        </VStack>
      </Flex>
    </>
  );
};
