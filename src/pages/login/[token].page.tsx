import * as React from "react";
import { useParams } from "next/navigation";
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
import { motion } from "framer-motion";
import { AyudasIcon, MiBahiaIcon } from "@component/components/Icons";
import { useRouter } from "next/router";
import { useAuthStore } from "@component/stores/auth";
import axios from "axios";

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

export default function Home() {
  const { login } = useAuthStore();
  const router = useRouter();
  const color = useColorModeValue("white", "gray.700");

  const handleSubmit = async (token: any) => {
    try {
      const { access, refresh } = await axios
        .get(
          `https://api.autentica.bahia.gob.ar/politicassociales/?alpha=${router.query?.token}`
        )
        .then((response: any) => response.data);
      console.log(access);
      login(access, refresh);
      router.push("/");
    } catch (e) {
      router.push("/login");
    }
  };

  React.useEffect(() => {
    try {
      if (!router.query?.token) {
        console.log("no hay nada");
      } else {
        //@ts-ignore
        handleSubmit(router.query?.token);
      }
    } catch (e) { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
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
            <MiBahiaIcon w="100%" h="100%" />
          </Box>
        </VStack>
      </Flex>
    </>
  );
}
