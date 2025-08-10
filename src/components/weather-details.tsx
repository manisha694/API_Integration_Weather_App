import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Sunrise, Sunset, Compass, Gauge, Eye } from "lucide-react";
import { format } from "date-fns";
import type { WeatherData } from "@/api/types";

interface WeatherDetailsProps {
  data: WeatherData;
}

export function WeatherDetails({ data }: WeatherDetailsProps) {
  const { wind, main, sys, visibility } = data;

  // Format time using date-fns
  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  // Convert wind degree to direction
  const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  // Convert meters to kilometers for visibility
  const formatVisibility = (meters: number) => {
    return `${(meters / 1000).toFixed(1)} km`;
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-amber-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-indigo-500",
    },
    {
      title: "Wind Direction",
      value: getWindDirection(wind.deg),
      icon: Compass,
      color: "text-green-500",
      iconTransform: `rotate(${wind.deg}deg)`,
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-rose-500",
    },
    {
      title: "Visibility",
      value: formatVisibility(visibility),
      icon: Eye,
      color: "text-cyan-500",
    },
  ];

  return (
    <Card className="flex-1 transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex-shrink-0">
                <detail.icon
                  className={`h-6 w-6 ${detail.color} transition-transform duration-500`}
                  style={{ transform: detail.iconTransform }}
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
                  {detail.title}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {detail.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
