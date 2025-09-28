import { useState } from "react";
import { Droplets, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface SoilReading {
  moisture: number;
  status: "dry" | "optimal" | "wet";
  recommendation: string;
  timestamp: Date;
}

const SoilMoistureTest = () => {
  const [moistureInput, setMoistureInput] = useState("");
  const [currentReading, setCurrentReading] = useState<SoilReading | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeMoisture = async () => {
    const moisture = parseFloat(moistureInput);
    
    if (isNaN(moisture) || moisture < 0 || moisture > 100) {
      toast({
        title: "Invalid Input",
        description: "Please enter a moisture percentage between 0 and 100",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    let status: "dry" | "optimal" | "wet";
    let recommendation: string;

    if (moisture < 30) {
      status = "dry";
      recommendation = "Soil is too dry. Increase irrigation frequency and consider mulching to retain moisture.";
    } else if (moisture > 70) {
      status = "wet";
      recommendation = "Soil moisture is too high. Reduce watering and improve drainage to prevent root rot.";
    } else {
      status = "optimal";
      recommendation = "Soil moisture is at optimal levels. Continue current watering schedule.";
    }

    const reading: SoilReading = {
      moisture,
      status,
      recommendation,
      timestamp: new Date()
    };

    setCurrentReading(reading);
    setIsAnalyzing(false);

    toast({
      title: "Soil Analysis Complete",
      description: `Moisture level: ${moisture}% - ${status.toUpperCase()}`,
      variant: status === "optimal" ? "default" : "destructive"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "dry": return "destructive";
      case "optimal": return "success";
      case "wet": return "warning";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "dry": return <TrendingDown className="h-4 w-4" />;
      case "optimal": return <Minus className="h-4 w-4" />;
      case "wet": return <TrendingUp className="h-4 w-4" />;
      default: return <Minus className="h-4 w-4" />;
    }
  };

  const getMoistureColor = (moisture: number) => {
    if (moisture < 30) return "bg-red-500";
    if (moisture > 70) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Droplets className="h-5 w-5 mr-2 text-blue-500" />
          Soil Moisture Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="moisture" className="text-sm font-medium">
              Soil Moisture Percentage
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="moisture"
                type="number"
                placeholder="Enter moisture % (0-100)"
                value={moistureInput}
                onChange={(e) => setMoistureInput(e.target.value)}
                min="0"
                max="100"
                className="flex-1"
              />
              <Button 
                onClick={analyzeMoisture}
                disabled={isAnalyzing || !moistureInput}
              >
                {isAnalyzing ? "Analyzing..." : "Test"}
              </Button>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p className="mb-2">Manual input methods:</p>
            <ul className="space-y-1 text-xs">
              <li>• Use a soil moisture meter</li>
              <li>• Visual inspection (dry/moist/wet)</li>
              <li>• Squeeze test method</li>
              <li>• Sensor integration (coming soon)</li>
            </ul>
          </div>
        </div>

        {/* Results Section */}
        {currentReading && (
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Latest Reading</h4>
              <Badge variant={getStatusColor(currentReading.status) as any}>
                {getStatusIcon(currentReading.status)}
                {currentReading.status.toUpperCase()}
              </Badge>
            </div>

            {/* Moisture Meter */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Moisture Level</span>
                <span className="font-medium">{currentReading.moisture}%</span>
              </div>
              <div className="relative">
                <Progress 
                  value={currentReading.moisture} 
                  className="h-3"
                />
                <div 
                  className={`absolute top-0 left-0 h-3 rounded-full transition-all ${getMoistureColor(currentReading.moisture)}`}
                  style={{ width: `${currentReading.moisture}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Dry (0%)</span>
                <span>Optimal (30-70%)</span>
                <span>Wet (100%)</span>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-background/50 rounded-lg p-4 border">
              <h5 className="font-medium text-foreground mb-2">Recommendation</h5>
              <p className="text-sm text-muted-foreground">{currentReading.recommendation}</p>
            </div>

            {/* Timestamp */}
            <p className="text-xs text-muted-foreground">
              Last updated: {currentReading.timestamp.toLocaleString()}
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setMoistureInput("20")}
          >
            Dry (20%)
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setMoistureInput("50")}
          >
            Optimal (50%)
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setMoistureInput("80")}
          >
            Wet (80%)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoilMoistureTest;