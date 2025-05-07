
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Zap, Save, RefreshCcw, Code, FileCode, Lock } from "lucide-react";
import { toast } from "sonner";

const AIEngineerPage = () => {
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [creativityLevel, setCreativityLevel] = useState([65]);
  const [maxTokens, setMaxTokens] = useState([3000]);
  const [promptTemplate, setPromptTemplate] = useState(
    `As an AI code reviewer, analyze the submitted code for:
1. Potential bugs or errors
2. Performance optimizations
3. Security vulnerabilities
4. Code style and readability issues
5. Suggest improvements with code examples`
  );
  const [customInstructions, setCustomInstructions] = useState("");
  const [advancedSettings, setAdvancedSettings] = useState({
    includeBestPractices: true,
    includeExamples: true,
    addReasoningExplanations: true,
    focusOnPerformance: true,
    focusOnSecurity: true
  });

  const handleSaveSettings = () => {
    toast.success("AI Engineer settings saved successfully");
  };

  const handleResetDefaults = () => {
    setSelectedModel("gpt-4o");
    setCreativityLevel([65]);
    setMaxTokens([3000]);
    setPromptTemplate(
      `As an AI code reviewer, analyze the submitted code for:
1. Potential bugs or errors
2. Performance optimizations
3. Security vulnerabilities
4. Code style and readability issues
5. Suggest improvements with code examples`
    );
    setCustomInstructions("");
    setAdvancedSettings({
      includeBestPractices: true,
      includeExamples: true,
      addReasoningExplanations: true,
      focusOnPerformance: true,
      focusOnSecurity: true
    });
    toast.info("Settings reset to defaults");
  };

  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold tracking-tight mb-1">AI Engineer Configuration</h1>
              <p className="text-muted-foreground">
                Customize how your AI Engineer reviews code and provides feedback
              </p>
            </div>
            
            <Tabs defaultValue="general">
              <TabsList className="mb-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="prompt">Prompt Template</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Model Selection</CardTitle>
                    <CardDescription>
                      Choose which AI model powers your code reviews
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div 
                        className={`cursor-pointer border rounded-lg p-4 ${
                          selectedModel === "gpt-4o-mini" ? "border-primary bg-primary/5" : ""
                        }`}
                        onClick={() => setSelectedModel("gpt-4o-mini")}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">GPT-4o Mini</h3>
                          <Badge variant="outline">Fast</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Balances speed and quality for efficient reviews
                        </p>
                        <div className="text-xs text-muted-foreground">
                          3 reviews per credit
                        </div>
                      </div>
                      
                      <div 
                        className={`cursor-pointer border rounded-lg p-4 ${
                          selectedModel === "gpt-4o" ? "border-primary bg-primary/5" : ""
                        }`}
                        onClick={() => setSelectedModel("gpt-4o")}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">GPT-4o</h3>
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary">Recommended</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Best balance of quality and performance
                        </p>
                        <div className="text-xs text-muted-foreground">
                          1 review per credit
                        </div>
                      </div>
                      
                      <div 
                        className={`cursor-pointer border rounded-lg p-4 ${
                          selectedModel === "gpt-4.5-preview" ? "border-primary bg-primary/5" : ""
                        }`}
                        onClick={() => setSelectedModel("gpt-4.5-preview")}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">GPT-4.5 Preview</h3>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Premium</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Highest quality for complex codebases
                        </p>
                        <div className="text-xs text-muted-foreground">
                          2 credits per review
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Review Style</CardTitle>
                    <CardDescription>
                      Adjust how your AI Engineer approaches code reviews
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">Creativity Level</label>
                        <span className="text-sm text-muted-foreground">{creativityLevel}%</span>
                      </div>
                      <Slider 
                        value={creativityLevel} 
                        onValueChange={setCreativityLevel}
                        max={100}
                        step={1}
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">More Conservative</span>
                        <span className="text-xs text-muted-foreground">More Creative</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">Response Length (max tokens)</label>
                        <span className="text-sm text-muted-foreground">{maxTokens}</span>
                      </div>
                      <Slider 
                        value={maxTokens} 
                        onValueChange={setMaxTokens}
                        min={1000}
                        max={8000}
                        step={100}
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">Concise</span>
                        <span className="text-xs text-muted-foreground">Detailed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="prompt" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Review Prompt Template</CardTitle>
                    <CardDescription>
                      Customize the instructions given to the AI for code reviews
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      className="min-h-[200px] font-mono text-sm"
                      value={promptTemplate}
                      onChange={(e) => setPromptTemplate(e.target.value)}
                      placeholder="Enter your custom review prompt..."
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Variables: {"{language}"}, {"{file_name}"}, {"{repository}"}, {"{team_best_practices}"}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Custom Instructions</CardTitle>
                    <CardDescription>
                      Add specific instructions or knowledge for your AI Engineer
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      className="min-h-[150px]"
                      value={customInstructions}
                      onChange={(e) => setCustomInstructions(e.target.value)}
                      placeholder="Example: Our team follows the Airbnb style guide for JavaScript. We prefer functional components in React..."
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Configuration</CardTitle>
                    <CardDescription>
                      Fine-tune how your AI Engineer analyzes code
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Include Best Practices</h3>
                          <p className="text-sm text-muted-foreground">
                            Recommend language-specific best practices
                          </p>
                        </div>
                        <Switch 
                          checked={advancedSettings.includeBestPractices}
                          onCheckedChange={(checked) => 
                            setAdvancedSettings(prev => ({...prev, includeBestPractices: checked}))
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Include Code Examples</h3>
                          <p className="text-sm text-muted-foreground">
                            Provide example code with suggestions
                          </p>
                        </div>
                        <Switch 
                          checked={advancedSettings.includeExamples}
                          onCheckedChange={(checked) => 
                            setAdvancedSettings(prev => ({...prev, includeExamples: checked}))
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Explain Reasoning</h3>
                          <p className="text-sm text-muted-foreground">
                            Add explanations for each suggestion
                          </p>
                        </div>
                        <Switch 
                          checked={advancedSettings.addReasoningExplanations}
                          onCheckedChange={(checked) => 
                            setAdvancedSettings(prev => ({...prev, addReasoningExplanations: checked}))
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Focus on Performance</h3>
                          <p className="text-sm text-muted-foreground">
                            Emphasize performance optimizations
                          </p>
                        </div>
                        <Switch 
                          checked={advancedSettings.focusOnPerformance}
                          onCheckedChange={(checked) => 
                            setAdvancedSettings(prev => ({...prev, focusOnPerformance: checked}))
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Focus on Security</h3>
                          <p className="text-sm text-muted-foreground">
                            Prioritize security vulnerabilities
                          </p>
                        </div>
                        <Switch 
                          checked={advancedSettings.focusOnSecurity}
                          onCheckedChange={(checked) => 
                            setAdvancedSettings(prev => ({...prev, focusOnSecurity: checked}))
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Language-Specific Settings</CardTitle>
                    <CardDescription>
                      Configure settings for specific programming languages
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-full">
                          <Input placeholder="Language (e.g., JavaScript)" />
                        </div>
                        <Button variant="outline" size="sm">
                          <FileCode className="mr-2 h-4 w-4" />
                          Add
                        </Button>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-yellow-500">JavaScript</Badge>
                            <span className="text-sm font-medium">Custom Rules</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Code className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Using ESLint configuration with Airbnb style guide
                        </p>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-blue-500">TypeScript</Badge>
                            <span className="text-sm font-medium">Custom Rules</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Code className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Using strict TypeScript rules with custom type checking
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 flex items-center justify-between">
              <Button variant="outline" onClick={handleResetDefaults}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Reset to Defaults
              </Button>
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIEngineerPage;
