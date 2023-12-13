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
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const CardChart = ({ color, title, description, total, icon }: any) => {
  const { prestacionesregistradas } = useSelector((resp: any) => resp.inicio);
  const labels = prestacionesregistradas.map((calle: any) => {
    return calle.Beneficio;
  });
  const series = prestacionesregistradas.map((calle: any) => {
    return calle.Cantidad;
  });
  return (
    <Card minH="83px">
      <CardBody>
        <Text fontWeight={"bold"} fontSize={"xl"} mb={2} color={"gray.800"}>
          Porcentajes de Prestaciones por Categoría
        </Text>
        <Chart
          options={{
            dataLabels: {
              enabled: false,
            },
            labels: labels,
            chart: {
              type: "pie",
            },
            legend: {
              position: "left",
              fontSize: "20",
              fontWeight: "bold",
              //@ts-ignore
              formatter: function (seriesName, opts) {
                return [
                  " ",
                  opts.w.globals.series[opts.seriesIndex],
                  " - ",
                  seriesName,
                ];
              },
            },
            responsive: [
              {
                breakpoint: 1760,
                options: {
                  chart: {
                    width: 670,
                    height: 900,
                  },
                  legend: {
                    position: "left",
                  },
                },
              },

              {
                breakpoint: 1680,
                options: {
                  chart: {
                    width: 600,
                    height: 400,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 1500,
                options: {
                  chart: {
                    width: 530,
                    height: 400,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 1430,
                options: {
                  chart: {
                    width: 500,
                    height: 400,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 1330,
                options: {
                  chart: {
                    width: 450,
                    height: 400,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 1260,
                options: {
                  chart: {
                    width: 424,
                    height: 400,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 1000,
                options: {
                  chart: {
                    width: 270,
                    height: 500,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 960,
                options: {
                  chart: {
                    width: 600,
                    height: 500,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 800,
                options: {
                  chart: {
                    width: 400,
                    height: 400,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 680,
                options: {
                  chart: {
                    width: 480,
                    height: 480,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 300,
                    height: 300,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
          }}
          series={series}
          type="donut"
          width="690"
        />
      </CardBody>
    </Card>
  );
};

export default CardChart;
