import React, { ReactNode, ReactText, useEffect, useState } from "react";
import Head from "next/head";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Tag,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiUser,
  FiUsers,
  FiSearch,
  FiPackage,
  FiPieChart,
  FiMessageCircle,
} from "react-icons/fi";
import { IconType } from "react-icons";
import {
  AtencionIcon,
  AyudasIcon,
  CalendarioIcon,
  ConsultaIcon,
  DocumentosIcon,
  GruposIcon,
  IndicadoresIcon,
  IntervencionesIcon,
  MiBahiaIcon,
  PersonasIcon,
  PrestacionesIcon,
  ReclamosIcon,
  SaludIcon,
  licenciaIcon,
  notificacionesIcon,
} from "./Icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { link } from "fs";
import { useGetDashboard } from "@component/hooks/dashboard";
import { LoginCarga } from "./LoginCarga";
import { useAuthStore } from "@component/stores/auth";

interface LinkItemProps {
  name: string;
  path?: string;
  icon: any;
  disabled?: boolean;
}


const LinkItems: Array<LinkItemProps> = [
  { name: "Escritorio", path: "/", icon: IndicadoresIcon },
  /* { name: "Notificaciones", path: "/notificaciones", icon: notificacionesIcon }, */
  { name: "Mis documentos", path: "/misdocumentos", icon: DocumentosIcon },
  { name: "Calendario", path: "/vencimientos", icon: CalendarioIcon },
  { name: "Licencia de Conducir", path: "/licencia", icon: licenciaIcon },
  { name: "Reclamos", path: "/reclamos", icon: ReclamosIcon },
  { name: "Historia Clinica", path: "/salud", icon: SaludIcon },





];

export default function Header({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const color = useColorModeValue("gray.100", "gray.900");
  const { isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router]);
  if (isLoading) {
    return <Spinner w="50px" h="50px" thickness="5px" />;
  }
  return (
    <>
      <Head>
        <title>Mi Bahia | MBB</title>
        <meta name="description" content="Ayuda Sociales | MBB" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box minH="100vh" bg={color}>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} />
        <Box ml={{ base: 0, md: 280 }} p="4">
          {children}
        </Box>
      </Box>
    </>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const router = useRouter();

  const activeLink = LinkItems.find(item => item.path === router.pathname);
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue({ base: '#4383D4', md: 'white' }, "gray.900")}
      w={{ base: "full", md: 300 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Box display={{ base: "flex", md: "none" }} bg={"white"} h={16} alignItems={"center"} justifyContent="center" mx="auto">
        <MiBahiaIcon display={{ base: "flex", md: "none" }} w="30%" h="100%" />
      </Box>
      <Flex h="16" alignItems="center" mx="8" justifyContent="space-between" >
        <Icon as={MiBahiaIcon} w={{ base: "40%", md: "60%" }} display={{ base: 'none', md: 'flex' }} h="100%" />
        {activeLink && (
          <HStack color={"white"} display={{ base: 'flex', md: 'none' }}>
            <Icon as={activeLink.icon} color={"white"} fontSize={28} />
            <Text color={"white"} fontWeight={"bold"} fontSize={20} pt={2} pb={2}>
              {activeLink.name}
            </Text>
          </HStack>
        )}
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} color={"white"} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.disabled ? "Muy pronto..." : link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  path?: string;
}
const NavItem = ({ icon, children, path = "/", ...rest }: NavItemProps) => {
  const router = useRouter();
  return (
    <Link href={path} passHref={true} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={{ base: null, md: router.pathname == path ? "#6690F4" : "" }}
        color={{ base: 'white', md: router.pathname == path ? "white" : "black" }}

        _hover={{
          base: {
            bg: router.pathname !== path ? "gray.100" : "", color: router.pathname !== path ? "black" : null
          }, md: {
            bg: router.pathname !== path ? "gray.100" : ""
          },
        }}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="20" as={icon} />}
        {children}
      </Flex>
    </Link >

  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { logout } = useAuthStore();
  const { dashboard, isLoading } = useGetDashboard();

  const router = useRouter();

  const activeLink = LinkItems.find(item => item.path === router.pathname);
  return (
    <>
      <Box display={{ base: "flex", md: "none" }} bg={"white"} h={16} alignItems={"center"} justifyContent="center" mx="auto">
        <MiBahiaIcon display={{ base: "flex", md: "none" }} w="30%" h="100%" />
      </Box>

      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        maxH={16}

        alignItems="center"
        bg={useColorModeValue({ base: '#4383D4', md: 'white' }, "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
        {...rest}
      >
        {activeLink && (<HStack>
          <Icon as={activeLink.icon} color={"white"} />
          <Text color={"white"} fontWeight={"bold"} fontSize={20} pt={2} pb={2}>{activeLink.name}</Text></HStack>)}
        <Icon
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          color={"white"}
          as={FiMenu}
        />
        <HStack display={{ base: "none", md: "flex" }} spacing={{ base: "0", md: "6" }}>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack> <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-end"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm" fontWeight={800}>

                    {dashboard.last_name}                     {dashboard.first_name}

                  </Text>
                  <Tag size={"sm"} variant='solid' bg='muni.verde'>
                    Nivel 2
                  </Tag>
                </VStack>
                  <Avatar
                    size={"sm"}
                    src={
                      "https://posturas.com.ar/download/multimedia.normal.a4cd505fa4ac2558.6465207765657274685f6e6f726d616c2e6a7067.jpg"
                    }
                  />

                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <MenuItem onClick={logout}>Cerrar sesion</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    </>
  );
};
