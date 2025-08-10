import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind, Thermometer, MapPin } from "lucide-react";
import type { WeatherData, GeocodingResponse } from "@/api/types";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

export function CurrentWeather({ data, locationName }: CurrentWeatherProps) {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  // Format temperature
  const formatTemp = (temperature: number) => `${Math.round(temperature)}°`;

  return (
    <Card className="overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side - Weather details */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            {/* Location Header */}
            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {locationName?.name}
                </h2>
                {locationName?.state && (
                  <span className="text-xl text-muted-foreground">
                    , {locationName.state}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {locationName?.country}
              </p>
            </div>

            {/* Current Temperature */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-4">
                <p className="text-8xl font-extrabold tracking-tighter text-primary dark:text-gray-200">
                  {formatTemp(temp)}
                </p>
                <div className="space-y-1">
                  <p className="text-md font-medium text-muted-foreground">
                    Feels like {formatTemp(feels_like)}
                  </p>
                  <div className="flex gap-4 text-sm font-medium">
                    <div className="flex items-center gap-1 text-blue-500">
                      <ArrowDown className="h-4 w-4" />
                      <span>Low: {formatTemp(temp_min)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-red-500">
                      <ArrowUp className="h-4 w-4" />
                      <span>High: {formatTemp(temp_max)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Conditions */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t pt-4 mt-4">
              <div className="flex flex-col items-center justify-center">
                <Droplets className="h-6 w-6 text-blue-500 mb-1" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Humidity</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{humidity}%</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Wind className="h-6 w-6 text-green-500 mb-1" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Wind</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{speed} m/s</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Thermometer className="h-6 w-6 text-red-400 mb-1" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Pressure</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{data.main.pressure} hPa</p>
              </div>
            </div>
          </div>

          {/* Right side - Weather icon and description */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center md:items-end">
            <div className="relative flex aspect-square w-full max-w-[250px] items-center justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={`Current weather: ${currentWeather.description}`}
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>
            <p className="text-xl font-semibold capitalize text-gray-800 dark:text-gray-200 mt-2">
              {currentWeather.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}