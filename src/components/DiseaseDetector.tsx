import { useState, useRef } from "react";
import { Camera, Upload, Loader2, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface DiseaseDiagnosis {
  cropName: string;
  diseaseName: string;
  severity: "mild" | "moderate" | "severe";
  confidence: number;
  explanation: string;
  culturalPractices: string[];
  isPremium: boolean;
}

const DiseaseDetector = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiseaseDiagnosis | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Mock disease data for demonstration
  const mockDiagnoses: DiseaseDiagnosis[] = [
    {
      cropName: "Tomato",
      diseaseName: "Late Blight",
      severity: "moderate",
      confidence: 89,
      explanation: "Late blight is a fungal disease that affects tomato plants, causing dark spots on leaves and stems. It thrives in cool, wet conditions.",
      culturalPractices: [
        "Remove affected plant parts immediately",
        "Improve air circulation around plants",
        "Avoid overhead watering",
        "Apply mulch to prevent soil splash"
      ],
      isPremium: false
    },
    {
      cropName: "Wheat",
      diseaseName: "Rust Disease",
      severity: "severe",
      confidence: 94,
      explanation: "Wheat rust is a serious fungal disease that can cause significant yield losses. Orange-brown pustules appear on leaves and stems.",
      culturalPractices: [
        "Plant resistant varieties",
        "Monitor weather conditions",
        "Remove volunteer wheat plants",
        "Proper crop rotation"
      ],
      isPremium: false
    },
    {
      cropName: "Potato",
      diseaseName: "Healthy",
      severity: "mild",
      confidence: 96,
      explanation: "Your potato plants appear healthy! Continue monitoring for any changes and maintain good cultural practices.",
      culturalPractices: [
        "Continue regular watering schedule",
        "Maintain proper soil pH (6.0-7.0)",
        "Hill soil around plants",
        "Monitor for pest activity"
      ],
      isPremium: false
    }
  ];

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setUploadedImage(imageUrl);
      analyzeCrop(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const analyzeCrop = async (imageUrl: string) => {
    setIsAnalyzing(true);
    setDiagnosis(null);

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Return random diagnosis for demo
    const randomDiagnosis = mockDiagnoses[Math.floor(Math.random() * mockDiagnoses.length)];
    setDiagnosis(randomDiagnosis);
    setIsAnalyzing(false);

    toast({
      title: "Analysis Complete",
      description: `Disease detection completed with ${randomDiagnosis.confidence}% confidence`,
      variant: "default"
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild": return "success";
      case "moderate": return "warning";
      case "severe": return "destructive";
      default: return "secondary";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "mild": return <CheckCircle className="h-4 w-4" />;
      case "moderate": return <AlertTriangle className="h-4 w-4" />;
      case "severe": return <AlertTriangle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  return (
    <section className="py-16 bg-gradient-earth">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Crop Disease Detection
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Upload a photo of your crop to get instant disease identification and treatment recommendations
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="h-5 w-5 mr-2 text-primary" />
                  Upload Crop Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!uploadedImage ? (
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        Drop your crop image here or click to browse
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          variant="outline"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Choose File
                        </Button>
                        <Button variant="secondary">
                          <Camera className="h-4 w-4 mr-2" />
                          Take Photo
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative rounded-lg overflow-hidden">
                        <img
                          src={uploadedImage}
                          alt="Uploaded crop"
                          className="w-full h-64 object-cover"
                        />
                      </div>
                      <Button
                        onClick={() => {
                          setUploadedImage(null);
                          setDiagnosis(null);
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Upload Different Image
                      </Button>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2 text-primary" />
                  Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isAnalyzing ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">Analyzing your crop...</p>
                    <Progress value={75} className="w-full max-w-xs mx-auto" />
                    <p className="text-sm text-muted-foreground mt-2">AI model processing image</p>
                  </div>
                ) : diagnosis ? (
                  <div className="space-y-6">
                    {/* Disease Info */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {diagnosis.cropName} - {diagnosis.diseaseName}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={getSeverityColor(diagnosis.severity) as any}>
                            {getSeverityIcon(diagnosis.severity)}
                            {diagnosis.severity.toUpperCase()}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {diagnosis.confidence}% confidence
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2">What is this?</h4>
                      <p className="text-sm text-muted-foreground">{diagnosis.explanation}</p>
                    </div>

                    {/* Cultural Practices */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Recommended Actions (Free)</h4>
                      <ul className="space-y-1">
                        {diagnosis.culturalPractices.map((practice, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <CheckCircle className="h-3 w-3 text-success mr-2 mt-0.5 flex-shrink-0" />
                            {practice}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Premium Unlock */}
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-foreground">Unlock Treatment Prescriptions</h4>
                          <p className="text-sm text-muted-foreground">Get detailed organic & chemical treatment options</p>
                        </div>
                        <Button variant="default" className="bg-accent hover:bg-accent/90">
                          Go Premium
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Info className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Upload an image to start analysis</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiseaseDetector;