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
  useDisclosure,
} from "@chakra-ui/react";
import CardDashboard from "@component/components/CardDashboard";
import {
  AtencionIcon,
  GruposIcon,
  HacinamientoIcon,
  InstitucionalIcon,
  IntervencionesIcon,
  MaterialesIcon,
  PersonasIcon,
  PrestacionesIcon,
  ServiciosIcon,
  SocialIcon,
  TenenciaIcon,
} from "@component/components/Icons";
import CardTable from "@component/components/CardTable";
import dynamic from "next/dynamic";
import CardTableSimple from "@component/components/CardTableSimple";
import CardFormBeneficiario from "@component/components/CardFormBeneficiario";
import CardBeneficiarioData from "@component/components/CardBeneficiarioData";
import CardGroupFamily from "@component/components/CardGroupFamily";
import CardTypesBeneficiario from "@component/components/CardTypesBeneficiario";
import { FiHome } from "react-icons/fi";
import { LoadSpinner } from "@component/components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { checkBeneficiario, getCalles } from "@component/store/consultaSlice";
import { AppDispatch } from "@component/store";
import Header from "@component/components/Header";
import CardAtencion from "@component/components/CardAtencion";
import CardAyudas from "@component/components/CardAyudas";
import CardGroupEdit from "@component/components/CardGroupEdit";
import CardInstituciones from "@component/components/CardInstituciones";
import TableGroupFamily from "@component/components/TableGroupFamily";
import { useEffect } from "react";
import ModalUsers from "@component/components/ModalUsers";

const CardChart = dynamic(
  () => {
    return import("@component/components/CardChart");
  },
  { ssr: false }
);
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getCalles());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    user,
    loading,
    error: hasError,
    atencionMedica,
    servicios,
    ayudas,
    hacinamiento,
    materiales,
    instituciones,
    grupoFamiliar,
    vivienda,
  } = useSelector((resp: any) => resp.consulta);
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const onClose = () => {
    console.log("hola");

    return "hola";
  };

  const calculateEstadoMateriales = (datos: any) => {
    let estado = "grave";

    const {
      IDViviendaTecho,
      IDViviendaPared,
      IDViviendaPiso,
      ViviendaCieloraso,
    } = datos;

    if (
      !(
        IDViviendaTecho === 4 ||
        IDViviendaTecho === 9 ||
        IDViviendaTecho === 14
      ) &&
      !(
        IDViviendaPared === 10 ||
        IDViviendaPared === 9 ||
        IDViviendaPared === 8 ||
        IDViviendaPared === 5
      )
    ) {
      estado = "insatisfactoria";
    }

    if (
      (IDViviendaTecho === 1 ||
        IDViviendaTecho === 2 ||
        IDViviendaTecho === 3) &&
      (IDViviendaPared === 1 ||
        IDViviendaPared === 3 ||
        IDViviendaPared === 4) &&
      (IDViviendaPiso === 5 || IDViviendaPiso === 6 || IDViviendaPiso === 9) &&
      ViviendaCieloraso === 1
    ) {
      estado = "satisfactoria";
    }

    if (
      (IDViviendaTecho === 1 ||
        IDViviendaTecho === 2 ||
        IDViviendaTecho === 3) &&
      (IDViviendaPared === 1 ||
        IDViviendaPared === 3 ||
        IDViviendaPared === 4) &&
      (IDViviendaPiso === 5 || IDViviendaPiso !== 4) &&
      ViviendaCieloraso === 0
    ) {
      estado = "basica";
    }

    if (
      (IDViviendaTecho === 1 ||
        IDViviendaTecho === 2 ||
        IDViviendaTecho === 3) &&
      (IDViviendaPared === 1 ||
        IDViviendaPared === 3 ||
        IDViviendaPared === 4) &&
      !(
        IDViviendaPiso === 5 ||
        IDViviendaPiso === 6 ||
        IDViviendaPiso === 9 ||
        IDViviendaPiso === 4
      ) &&
      ViviendaCieloraso === 1
    ) {
      estado = "basica";
    }

    if (IDViviendaPiso === 4) {
      estado = "grave";
    }

    if (
      IDViviendaTecho === 4 ||
      IDViviendaTecho === 9 ||
      IDViviendaTecho === 14
    ) {
      estado = "grave";
    }

    if (
      datos.piso === "Sin datos" &&
      datos.pared === "Sin datos" &&
      datos.techo === "Sin datos"
    ) {
      estado = "sin datos!";
    }

    return estado;
  };

  const calculateEstadoHacinamiento = (datos: any) => {
    let estado = "insatisfactoria";
    let p = datos["qtyPersonas"];
    let h = datos["ViviendaHogares"];
    let e = datos["ViviendaUsoCompartidoDormitorio"];

    e += 1;

    let porCuarto = p / e;
    if (porCuarto <= 2 && h <= 1) {
      estado = "satisfactoria";
    }

    if (porCuarto <= 3 && porCuarto > 2 && h <= 1) {
      estado = "basica";
    }
    if (porCuarto > 3) {
      estado = "grave";
    }
    return estado;
  };

  return (
    <>
      <Head>
        <title>Ayudas Sociales | MBB</title>
        <meta name="description" content="Ayuda Sociales | MBB" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <Container minHeight="100vh" maxW="full" h={"full"} bg="#EEF1F9">
          <Grid
            templateColumns={{ md: "1fr", lg: "1.2fr 1.2fr" }}
            templateRows={{ md: "1fr auto", lg: "1fr" }}
            my="26px"
            gap="24px"
          >
            <CardFormBeneficiario />
            {loading ? <LoadSpinner /> : <CardBeneficiarioData />}
          </Grid>

          <SimpleGrid
            minChildWidth="300px"
            justifyContent={"center"}
            templateRows={{ md: "1fr auto", lg: "1fr" }}
            my="26px"
            gap="24px"
          >
            {Object.keys(vivienda).length !== 0 &&
              vivienda.IDViviendaTipo !== 0 && (
                <CardTypesBeneficiario
                  title={vivienda.propiedad}
                  color="muni.verde"
                  description="Tipo de Tenencia"
                  list={[
                    `${vivienda.ocupacion}`,
                    `${vivienda.propiedad}`,
                    `(${vivienda.anios} años, ${vivienda.meses} meses)`,
                  ]}
                  icon={TenenciaIcon}
                />
              )}
            {Object.keys(materiales).length !== 0 &&
              materiales.IDViviendaTecho !== 0 && (
                <CardTypesBeneficiario
                  title={calculateEstadoMateriales(materiales)}
                  color="muni.celeste"
                  description="Calidad de Materiales"
                  list={[
                    `Techo: ${materiales.techo}`,
                    `Pared: ${materiales.pared}`,
                    `Piso: ${materiales.piso}`,
                  ]}
                  icon={MaterialesIcon}
                />
              )}
            {Object.keys(servicios).length !== 0 && (
              <CardTypesBeneficiario
                title={`${Object.values(servicios)?.reduce(
                  (sum: number, item: any) => {
                    return item === "-" ? sum - 0 : sum + 1;
                  },
                  0
                )}/5`}
                color="muni.verde"
                description="Servicios Públicos"
                list={[
                  `Agua: ${servicios.AGUA !== "-"
                    ? servicios.AGUA
                    : "No corresponde / Otros"
                  }`,
                  `Desague: ${servicios.BANIODESAGUE !== "-"
                    ? servicios.BANIODESAGUE
                    : "No corresponde / Otros"
                  }`,
                  `Baño: ${servicios.BANIOTIENE !== "-"
                    ? servicios.BANIOTIENE
                    : "No corresponde / Otros"
                  }`,
                  `Gas: ${servicios.GAS !== "-"
                    ? servicios.GAS
                    : "No corresponde / Otros"
                  }`,
                  `Electricidad: ${servicios.ELECTRI !== "-"
                    ? servicios.ELECTRI
                    : "No corresponde / Otros"
                  }`,
                ]}
                icon={ServiciosIcon}
              />
            )}

            {Object.keys(hacinamiento).length !== 0 && (
              <CardTypesBeneficiario
                title={calculateEstadoHacinamiento(hacinamiento)}
                color="muni.celeste"
                description="Hacinamiento"
                list={[
                  `Personas: ${hacinamiento.qtyPersonas}`,
                  `Cuartos: ${hacinamiento.ViviendaUsoCompartidoDormitorio}`,
                  `Hogares: ${hacinamiento.ViviendaHogares}`,
                ]}
                icon={HacinamientoIcon}
              />
            )}
          </SimpleGrid>
          {instituciones.length !== 0 && (
            <CardGroupEdit
              title="Ayudas Instituciones"
              icon={InstitucionalIcon}
            >
              <CardInstituciones list={instituciones} />
            </CardGroupEdit>
          )}
          {ayudas.length !== 0 && (
            <CardGroupEdit title="Ayudas Sociales" icon={SocialIcon}>
              <CardAyudas list={ayudas} />
            </CardGroupEdit>
          )}
          {grupoFamiliar.length !== 0 && (
            <CardGroupEdit title="Grupo Familiar" icon={GruposIcon}>
              <TableGroupFamily list={grupoFamiliar} />
            </CardGroupEdit>
          )}
          {atencionMedica.length !== 0 && (
            <CardGroupEdit title="Atención Médica" icon={AtencionIcon}>
              <CardAtencion list={atencionMedica} />
            </CardGroupEdit>
          )}
        </Container>
      </Header>
    </>
  );
}
