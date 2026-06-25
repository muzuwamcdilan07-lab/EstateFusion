import ReactEcharts from "echarts-for-react";
import { useTheme } from "@mui/material/styles";

export default function PropertyTrendChart({ height = "300px" }) {
  const theme = useTheme();

  const option = {
    tooltip: {
      show: true,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      textStyle: { color: "#fff" }
    },
    legend: {
      top: 0,
      textStyle: { color: theme.palette.text.secondary }
    },
    grid: {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40
    },
    xAxis: {
      type: "category",
      data: ["0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"],
      axisLine: { show: true, lineStyle: { color: theme.palette.divider } },
      splitLine: { show: false }
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      splitLine: { show: true, lineStyle: { color: theme.palette.divider } }
    },
    series: [
      {
        name: "Properties Mapped",
        type: "line",
        smooth: true,
        data: [3, 4.5, 5, 4, 6, 7, 6.5, 7, 8, 8.5, 9],
        itemStyle: { color: theme.palette.primary.main },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: theme.palette.primary.light
              },
              {
                offset: 1,
                color: theme.palette.primary.lighter || "rgba(25, 118, 210, 0.1)"
              }
            ]
          }
        },
        lineStyle: { width: 3 }
      }
    ]
  };

  return <ReactEcharts style={{ height }} option={option} />;
}
