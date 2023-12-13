import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@component/styles/Home.module.css";
import {
    Card,
    CardBody,
    Container,
    Flex,
    Grid,
    HStack,
    SimpleGrid,
    Skeleton,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import CardDashboard from "@component/components/CardDashboard";
import CardTable from "@component/components/CardTable";
import dynamic from "next/dynamic";
import CardTableSimple from "@component/components/CardTableSimple";
import Header from "@component/components/Header";

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
    FiTruck,
    FiMessageCircle,
    FiBarChart,
    FiBookOpen,
} from "react-icons/fi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@component/store";
import moment from "moment";
import { useAuthStore } from "@component/stores/auth";
import { getVencimientos } from "@component/store/vencimientosSlice";
import { getHospital } from "@component/store/hospitalSlice";

const CardChart = dynamic(
    () => {
        return import("@component/components/CardChart");
    },
    { ssr: false }
);

const MyCalendar = dynamic(
    () => {
        return import("@component/components/Calendar");
    },
    { ssr: false }
);

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getVencimientos())
        dispatch(getHospital())

    }, []);
    return (
        <>
            <Header>
                <Container minHeight="100vh" maxW="full" h={"full"} bg="#EEF1F9">
                    <MyCalendar />
                </Container>
            </Header>
        </>
    );
}
