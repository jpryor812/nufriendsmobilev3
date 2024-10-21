import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart, Grid, Area } from 'react-native-svg-charts';
import { Line, Text as SVGText } from 'react-native-svg';
import * as shape from 'd3-shape';

const MessageStatsChart = () => {
  const data = [13, 48, 38, 42, 11, 69, 57];
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const Decorator = ({ x, y, data }) => {
    return data.map((value, index) => (
      <SVGText
        key={index}
        x={x(index)}
        y={y(value) - 10}
        fontSize="12"
        fill="black"
        alignmentBaseline="middle"
        textAnchor="middle"
      >
        {value}
      </SVGText>
    ));
  };

  const HorizontalLine = ({ y }) => (
    <Line
      x1="0%"
      x2="100%"
      y1={y(0)}
      y2={y(0)}
      stroke="rgba(0,0,0,0.2)"
      strokeDasharray={[4, 8]}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stats</Text>
      <Text style={styles.subtitle}>Messages sent</Text>
      <View style={styles.chartContainer}>
        <LineChart
          style={{ height: 200 }}
          data={data}
          svg={{ stroke: 'rgb(134, 65, 244)', strokeWidth: 2 }}
          curve={shape.curveNatural}
          contentInset={{ top: 20, bottom: 20, left: 10, right: 10 }}
        >
          <Area
            svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}
            curve={shape.curveNatural}
          />
          <HorizontalLine />
          <Decorator />
        </LineChart>
        <View style={styles.daysContainer}>
          {days.map((day, index) => (
            <Text key={index} style={styles.dayText}>
              {day}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6f2ff',
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  dayText: {
    fontSize: 12,
  },
});

export default MessageStatsChart;