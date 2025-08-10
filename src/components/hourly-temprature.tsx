import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import type { ForecastData } from "@/api/types";

interface HourlyTemperatureProps {
  data: ForecastData;
}

interface ChartData {
  time: string;
  temp: number;
  feels_like: number;
}

// Custom tooltip component for a better user experience
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    // Find the temperature and feels_like data from the payload
    const temp = payload.find(p => p.dataKey === "temp");
    const feels_like = payload.find(p => p.dataKey === "feels_like");

    return (
      <div className="rounded-xl border bg-background p-4 shadow-lg text-sm">
        <p className="text-muted-foreground font-medium mb-1">{payload[0].payload.time}</p>
        {temp && (
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <p>
              Temperature: <span className="font-bold">{temp.value}°C</span>
            </p>
          </div>
        )}
        {feels_like && (
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-slate-500" />
            <p>
              Feels like: <span className="font-bold">{feels_like.value}°C</span>
            </p>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export function HourlyTemperature({ data }: HourlyTemperatureProps) {
  // Get today's forecast data and format for chart
  const chartData: ChartData[] = data.list
    .slice(0, 8) // Get next 24 hours (3-hour intervals)
    .map((item) => ({
      time: format(new Date(item.dt * 1000), "ha"),
      temp: Math.round(item.main.temp),
      feels_like: Math.round(item.main.feels_like),
    }));

  return (
    <Card className="flex-1 transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Today's Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: -10 }}>
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="temp"
                name="Temperature"
                stroke="#3b82f6" // A more vivid blue
                strokeWidth={2}
                dot={{ strokeWidth: 1, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                name="Feels Like"
                stroke="#64748b" // Consistent gray for a secondary line
                strokeWidth={2}
                dot={{ strokeWidth: 1, r: 4 }}
                activeDot={{ r: 6 }}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
