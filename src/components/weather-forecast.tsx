import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { format } from "date-fns";
import type { ForecastData } from "@/api/types";

interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

export function WeatherForecast({ data }: WeatherForecastProps) {
  // Group forecast by day and get daily min/max
  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }

    return acc;
  }, {} as Record<string, DailyForecast>);

  // Get next 5 days
  const nextDays = Object.values(dailyForecasts).slice(1, 6);

  // Format temperature
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {nextDays.map((day) => (
            <div
              key={day.date}
              className="flex items-center gap-4 rounded-xl border p-4 transition-all duration-200 ease-in-out hover:bg-gray-50 hover:dark:bg-gray-800 hover:shadow-md"
            >
              {/* Day and Description */}
              <div className="flex flex-col items-center flex-1">
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                  alt={day.weather.description}
                  className="h-12 w-12"
                />
                <p className="font-semibold text-center text-sm mt-1">
                  {format(new Date(day.date * 1000), "EEE")}
                </p>
                <p className="text-xs text-muted-foreground capitalize text-center">
                  {day.weather.description}
                </p>
              </div>

              {/* Temperatures */}
              <div className="flex items-center justify-center gap-4 flex-1">
                <div className="flex items-center">
                  <ArrowDown className="h-4 w-4 text-blue-500" />
                  <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    {formatTemp(day.temp_min)}
                  </span>
                </div>
                <div className="flex items-center">
                  <ArrowUp className="h-4 w-4 text-red-500" />
                  <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    {formatTemp(day.temp_max)}
                  </span>
                </div>
              </div>

              {/* Details (Humidity and Wind) */}
              <div className="flex justify-end gap-4 flex-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">{day.humidity}%</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Wind className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">{day.wind}m/s</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
