import ReactEcharts from "echarts-for-react";
import { useTheme } from "@mui/material/styles";

export default function PropertyCoverageChart({ height = "300px" }) {
  const theme = useTheme();

  const option = {
    legend: {
      bottom: 0,
      show: true,
      itemGap: 20,
      icon: "circle",
      textStyle: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: "roboto" }
    },
    tooltip: { show: true, trigger: "item", formatter: "{a} <br/>{b}: {c} ({d}%)" },
    series: [
      {
        name: "Coverage Distribution",
        type: "pie",
        hoverOffset: 5,
        radius: ["45%", "72.55%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        stillShowZeroSum: false,
        labelLine: { show: false },
        label: {
          show: false,
          fontSize: 13,
          formatter: "{a}",
          position: "center",
          fontFamily: "roboto",
          color: theme.palette.text.secondary
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "14",
            padding: 4,
            fontWeight: "normal",
            formatter: "{b} ({d}%)"
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        },
        data: [
          { value: 40, name: "Mapped", itemStyle: { color: "#1976d2" } },
          { value: 30, name: "Unmapped", itemStyle: { color: "#4caf50" } },
          { value: 20, name: "In Progress", itemStyle: { color: "#ff9800" } },
          { value: 10, name: "Pending", itemStyle: { color: "#f44336" } }
        ]
      }
    ]
  };

  return <ReactEcharts style={{ height }} option={option} />;
}
