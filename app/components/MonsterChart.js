import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const MonsterChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const options = {
        title: {
          text: 'Horários com Maior Ocorrência de Invocação de Monstros',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: data.labels,
          axisLabel: {
            formatter: function (value) {
              return new Date(value).toLocaleTimeString();
            }
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          type: 'bar',
          data: data.values,
          itemStyle: {
            color: 'rgba(75, 192, 192, 0.8)'
          }
        }]
      };
      chart.setOption(options);
      return () => {
        chart.dispose();
      };
    }
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default MonsterChart;
