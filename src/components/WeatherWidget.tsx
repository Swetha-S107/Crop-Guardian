import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Thermometer, Droplets, Wind, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  forecast: {
    day: string;
    high: number;
    low: number;
    condition: string;
  }[];
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock weather data - in real app, this would call a weather API
    const mockWeather: WeatherData = {
      location: "Agricultural Region",
      temperature: 24,
      condition: "Partly Cloudy",
      humidity: 68,
      windSpeed: 12,
      visibility: 10,
      forecast: [
        { day: "Today", high: 26, low: 18, condition: "sunny" },
        { day: "Tomorrow", high: 23, low: 16, condition: "cloudy" },
        { day: "Wednesday", high: 21, low: 14, condition: "rainy" },
        { day: "Thursday", high: 25, low: 17, condition: "sunny" },
      ]
    };

    // Simulate API call
    setTimeout(() => {
      setWeather(mockWeather);
      setLoading(false);
    }, 1000);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case "cloudy":
      case "partly cloudy":
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case "rainy":
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

  const getConditionAdvice = (condition: string, humidity: number) => {
    if (condition.toLowerCase().includes("rain")) {
      return { text: "High disease risk - monitor crops closely", color: "destructive" };
    } else if (humidity > 70) {
      return { text: "Humid conditions - watch for fungal diseases", color: "warning" };
    } else {
      return { text: "Good growing conditions", color: "success" };
    }
  };

  if (loading) {
    return (
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Weather & Climate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-8 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weather) return null;

  const advice = getConditionAdvice(weather.condition, weather.humidity);

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center">
          {getWeatherIcon(weather.condition)}
          <span className="ml-2">Weather & Climate</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Weather */}
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground mb-1">
            {weather.temperature}°C
          </div>
          <p className="text-muted-foreground mb-2">{weather.condition}</p>
          <p className="text-sm text-muted-foreground">{weather.location}</p>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center">
              <Droplets className="h-4 w-4 text-blue-500 mr-1" />
            </div>
            <p className="text-sm font-medium">{weather.humidity}%</p>
            <p className="text-xs text-muted-foreground">Humidity</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center">
              <Wind className="h-4 w-4 text-gray-500 mr-1" />
            </div>
            <p className="text-sm font-medium">{weather.windSpeed} km/h</p>
            <p className="text-xs text-muted-foreground">Wind</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center">
              <Eye className="h-4 w-4 text-gray-500 mr-1" />
            </div>
            <p className="text-sm font-medium">{weather.visibility} km</p>
            <p className="text-xs text-muted-foreground">Visibility</p>
          </div>
        </div>

        {/* Farming Advice */}
        <div className="bg-background/50 rounded-lg p-3 border">
          <Badge variant={advice.color as any} className="mb-2">
            Crop Advisory
          </Badge>
          <p className="text-sm text-muted-foreground">{advice.text}</p>
        </div>

        {/* 4-Day Forecast */}
        <div>
          <h4 className="font-medium text-foreground mb-3">4-Day Forecast</h4>
          <div className="grid grid-cols-4 gap-2">
            {weather.forecast.map((day, index) => (
              <div key={index} className="text-center space-y-1">
                <p className="text-xs text-muted-foreground">{day.day}</p>
                <div className="flex justify-center">
                  {getWeatherIcon(day.condition)}
                </div>
                <div className="text-xs">
                  <p className="font-medium">{day.high}°</p>
                  <p className="text-muted-foreground">{day.low}°</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;