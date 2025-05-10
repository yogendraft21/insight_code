import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  AlertCircle, 
  Code, 
  Github, 
  GitBranch, 
  GitPullRequest, 
  Terminal, 
  Shield, 
  Zap,
  CheckCircle, 
  Bot,
  FileCode,
  PenTool,
  Lock,
  File
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SettingsPopup = ({ isOpen, onClose }) => {
  const [generalSettings, setGeneralSettings] = useState({
    aiName: "CodeReviewer AI",
    defaultBranch: "main",
    pullRequestPrefix: "AI-REVIEW: ",
    autoAssignReviews: true,
    autoMergeApproved: false,
    notifyOnCompletion: true,
    reviewTemplate: "## AI Code Review Summary\n\n{summary}\n\n### Key Issues\n\n{issues}\n\n### Suggestions\n\n{suggestions}"
  });
  
  const [reviewRules, setReviewRules] = useState({
    autoReview: true,
    securityScanning: true,
    performanceAnalysis: true,
    styleGuideEnforcement: true,
    testCoverageAnalysis: false,
    documentationCheck: true,
    severityThreshold: 2, 
    commentStyle: "inline",
    ignoredFiles: [
      "*.lock",
      "package-lock.json",
      "yarn.lock",
      "dist/*",
      "build/*"
    ]
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    githubEnabled: true,
    gitlabEnabled: false,
    bitbucketEnabled: false,
    slackNotifications: true,
    emailNotifications: true,
    jiraIntegration: false,
  });

  const [aiModelSettings, setAiModelSettings] = useState({
    model: "ai-reviewer-v2",
    confidenceThreshold: 85,
    languageTone: "neutral",
    suggestionDetail: "detailed",
    maxCommentsPerReview: 20,
    excludedLanguages: ["markdown", "txt"],
    customPrompt: ""
  });

  const [languageSettings, setLanguageSettings] = useState({
    javascript: {
      enabled: true,
      customRules: ["no-console", "prefer-const"]
    },
    python: {
      enabled: true,
      customRules: ["PEP8", "type-hints"]
    },
    java: {
      enabled: true,
      customRules: []
    },
    csharp: {
      enabled: false,
      customRules: []
    },
    go: {
      enabled: false,
      customRules: []
    }
  });

  const handleGeneralSettingChange = (key, value) => {
    setGeneralSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleReviewRuleChange = (key, value) => {
    setReviewRules(prev => ({ ...prev, [key]: value }));
  };

  const handleToggleChange = (settingsObj, setSettingsObj, key) => {
    setSettingsObj(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLanguageToggle = (language) => {
    setLanguageSettings(prev => ({
      ...prev,
      [language]: {
        ...prev[language],
        enabled: !prev[language].enabled
      }
    }));
  };

  const handleSave = () => {
    // Here you would typically save settings to your backend
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0 max-h-[85vh] flex flex-col">
        <DialogHeader className="p-6 pb-2 flex-shrink-0">
          <DialogTitle>AI Code Reviewer Settings</DialogTitle>
          <DialogDescription>
            Configure how your AI reviewer analyzes code and interacts with your repositories
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full flex flex-col flex-1 overflow-hidden">
          <TabsList className="px-6 border-b rounded-none flex-shrink-0">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="review">Review Rules</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="ai-model">AI Model</TabsTrigger>
            <TabsTrigger value="languages">Languages</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            {/* General Settings Tab */}
            <TabsContent value="general" className="h-full overflow-y-auto overflow-x-hidden p-6 pt-4 focus:outline-none space-y-5 data-[state=inactive]:hidden">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-name">AI Reviewer Name</Label>
                  <Input
                    id="ai-name"
                    value={generalSettings.aiName}
                    onChange={(e) => handleGeneralSettingChange("aiName", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Name displayed in review comments and notifications
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-branch">Default Branch</Label>
                  <Input
                    id="default-branch"
                    value={generalSettings.defaultBranch}
                    onChange={(e) => handleGeneralSettingChange("defaultBranch", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Branch to compare PRs against (usually main or master)
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="review-template">Review Comment Template</Label>
                <textarea
                  id="review-template"
                  className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                  value={generalSettings.reviewTemplate}
                  onChange={(e) => handleGeneralSettingChange("reviewTemplate", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Template for PR summary comments. Variables: {"{summary}"}, {"{issues}"}, {"{suggestions}"}
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-medium">Default Behaviors</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-assign" className="text-sm">Auto-assign AI to Review</Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically assign the AI to review all new PRs
                      </p>
                    </div>
                    <Switch
                      id="auto-assign"
                      checked={generalSettings.autoAssignReviews}
                      onCheckedChange={(value) => handleGeneralSettingChange("autoAssignReviews", value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-merge" className="text-sm">Auto-merge Approved PRs</Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically merge PRs that pass AI review
                      </p>
                    </div>
                    <Switch
                      id="auto-merge"
                      checked={generalSettings.autoMergeApproved}
                      onCheckedChange={(value) => handleGeneralSettingChange("autoMergeApproved", value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notify-completion" className="text-sm">Notify on Review Completion</Label>
                      <p className="text-xs text-muted-foreground">
                        Send notification when AI review is complete
                      </p>
                    </div>
                    <Switch
                      id="notify-completion"
                      checked={generalSettings.notifyOnCompletion}
                      onCheckedChange={(value) => handleGeneralSettingChange("notifyOnCompletion", value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Review Rules Tab */}
            <TabsContent value="review" className="h-full overflow-y-auto overflow-x-hidden p-6 pt-4 focus:outline-none space-y-6 data-[state=inactive]:hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-review" className="text-base">Automatic Review</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically review pull requests when they're opened or updated
                  </p>
                </div>
                <Switch
                  id="auto-review"
                  checked={reviewRules.autoReview}
                  onCheckedChange={(value) => handleReviewRuleChange("autoReview", value)}
                />
              </div>

              <div className="border-t pt-4">
                <h3 className="mb-3 font-medium flex items-center gap-2">
                  <FileCode size={16} />
                  Review Capabilities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <Switch
                      id="security-scanning"
                      checked={reviewRules.securityScanning}
                      onCheckedChange={(value) => handleReviewRuleChange("securityScanning", value)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="security-scanning" className="flex items-center gap-1.5">
                        <Shield size={14} className="text-red-500" />
                        Security Scanning
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Detect security vulnerabilities in code
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Switch
                      id="performance-analysis"
                      checked={reviewRules.performanceAnalysis}
                      onCheckedChange={(value) => handleReviewRuleChange("performanceAnalysis", value)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="performance-analysis" className="flex items-center gap-1.5">
                        <Zap size={14} className="text-amber-500" />
                        Performance Analysis
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Identify performance bottlenecks
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Switch
                      id="style-guide"
                      checked={reviewRules.styleGuideEnforcement}
                      onCheckedChange={(value) => handleReviewRuleChange("styleGuideEnforcement", value)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="style-guide" className="flex items-center gap-1.5">
                        <Terminal size={14} className="text-blue-500" />
                        Style Guide Enforcement
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Check code against style guidelines
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Switch
                      id="test-coverage"
                      checked={reviewRules.testCoverageAnalysis}
                      onCheckedChange={(value) => handleReviewRuleChange("testCoverageAnalysis", value)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="test-coverage" className="flex items-center gap-1.5">
                        <CheckCircle size={14} className="text-green-500" />
                        Test Coverage Analysis
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Verify test coverage for new code
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Switch
                      id="documentation-check"
                      checked={reviewRules.documentationCheck}
                      onCheckedChange={(value) => handleReviewRuleChange("documentationCheck", value)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="documentation-check" className="flex items-center gap-1.5">
                        <File size={14} className="text-purple-500" />
                        Documentation Check
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Ensure code is properly documented
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="mb-3 font-medium flex items-center gap-2">
                  <AlertCircle size={16} />
                  Issue Reporting
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Severity Threshold</Label>
                    <div className="flex items-center gap-2">
                      <Slider 
                        value={[reviewRules.severityThreshold]} 
                        min={0} 
                        max={4} 
                        step={1} 
                        className="flex-1"
                        onValueChange={([value]) => handleReviewRuleChange("severityThreshold", value)}
                      />
                      <div className="w-14 text-center">
                        <Badge variant={
                          reviewRules.severityThreshold === 0 ? "outline" :
                          reviewRules.severityThreshold === 1 ? "secondary" :
                          reviewRules.severityThreshold === 2 ? "default" :
                          reviewRules.severityThreshold === 3 ? "destructive" :
                          "destructive"
                        }>
                          {
                            reviewRules.severityThreshold === 0 ? "Info" :
                            reviewRules.severityThreshold === 1 ? "Low" :
                            reviewRules.severityThreshold === 2 ? "Medium" :
                            reviewRules.severityThreshold === 3 ? "High" :
                            "Critical"
                          }
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Only report issues at or above this severity level
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="comment-style" className="text-sm">Comment Style</Label>
                    <Select 
                      value={reviewRules.commentStyle}
                      onValueChange={(value) => handleReviewRuleChange("commentStyle", value)}
                    >
                      <SelectTrigger id="comment-style">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inline">Inline Comments</SelectItem>
                        <SelectItem value="summary">Summary Comment</SelectItem>
                        <SelectItem value="both">Both Inline & Summary</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      How the AI should provide feedback on pull requests
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="mb-3 font-medium">Files to Ignore</h3>
                <div className="space-y-2">
                  <Label htmlFor="ignored-files" className="text-sm">Ignored File Patterns</Label>
                  <textarea
                    id="ignored-files"
                    className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm font-mono"
                    value={reviewRules.ignoredFiles.join('\n')}
                    onChange={(e) => handleReviewRuleChange("ignoredFiles", e.target.value.split('\n'))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Files matching these patterns will be excluded from AI review (one pattern per line)
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Integrations Tab */}
            <TabsContent value="integrations" className="h-full overflow-y-auto overflow-x-hidden p-6 pt-4 focus:outline-none data-[state=inactive]:hidden">
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 font-medium flex items-center gap-2">
                  <GitPullRequest size={16} />
                  Repository Integrations
                </h3>
                
                <div className="space-y-3 border rounded-md divide-y">
                  <div className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Github size={16} />
                      <span>GitHub</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={integrationSettings.githubEnabled ? "outline" : "secondary"} className={
                        integrationSettings.githubEnabled ? "bg-green-500/10 text-green-600 hover:bg-green-500/10" : ""
                      }>
                        {integrationSettings.githubEnabled ? "Connected" : "Disconnected"}
                      </Badge>
                      <Switch
                        checked={integrationSettings.githubEnabled}
                        onCheckedChange={() => handleToggleChange(integrationSettings, setIntegrationSettings, "githubEnabled")}
                      />
                    </div>
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GitBranch size={16} />
                      <span>GitLab</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={integrationSettings.gitlabEnabled ? "outline" : "secondary"} className={
                        integrationSettings.gitlabEnabled ? "bg-green-500/10 text-green-600 hover:bg-green-500/10" : ""
                      }>
                        {integrationSettings.gitlabEnabled ? "Connected" : "Disconnected"}
                      </Badge>
                      <Switch
                        checked={integrationSettings.gitlabEnabled}
                        onCheckedChange={() => handleToggleChange(integrationSettings, setIntegrationSettings, "gitlabEnabled")}
                      />
                    </div>
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GitBranch size={16} />
                      <span>Bitbucket</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={integrationSettings.bitbucketEnabled ? "outline" : "secondary"} className={
                        integrationSettings.bitbucketEnabled ? "bg-green-500/10 text-green-600 hover:bg-green-500/10" : ""
                      }>
                        {integrationSettings.bitbucketEnabled ? "Connected" : "Disconnected"}
                      </Badge>
                      <Switch
                        checked={integrationSettings.bitbucketEnabled}
                        onCheckedChange={() => handleToggleChange(integrationSettings, setIntegrationSettings, "bitbucketEnabled")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="mb-3 font-medium">Notification Channels</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="slack-notif" className="text-sm font-medium">Slack Notifications</Label>
                      <p className="text-xs text-muted-foreground">
                        Send review results to Slack
                      </p>
                    </div>
                    <Switch
                      id="slack-notif"
                      checked={integrationSettings.slackNotifications}
                      onCheckedChange={() => handleToggleChange(integrationSettings, setIntegrationSettings, "slackNotifications")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notif" className="text-sm font-medium">Email Notifications</Label>
                      <p className="text-xs text-muted-foreground">
                        Send review results via email
                      </p>
                    </div>
                    <Switch
                      id="email-notif"
                      checked={integrationSettings.emailNotifications}
                      onCheckedChange={() => handleToggleChange(integrationSettings, setIntegrationSettings, "emailNotifications")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="jira-integration" className="text-sm font-medium">Jira Integration</Label>
                      <p className="text-xs text-muted-foreground">
                        Create Jira tickets for critical issues
                      </p>
                    </div>
                    <Switch
                      id="jira-integration"
                      checked={integrationSettings.jiraIntegration}
                      onCheckedChange={() => handleToggleChange(integrationSettings, setIntegrationSettings, "jiraIntegration")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* AI Model Tab */}
            <TabsContent value="ai-model" className="h-full overflow-y-auto overflow-x-hidden p-6 pt-4 focus:outline-none data-[state=inactive]:hidden">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="ai-model" className="text-sm">AI Model</Label>
                <Select 
                  value={aiModelSettings.model}
                  onValueChange={(value) => setAiModelSettings(prev => ({ ...prev, model: value }))}
                >
                  <SelectTrigger id="ai-model">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai-reviewer-v1">AI Reviewer v1 (Legacy)</SelectItem>
                    <SelectItem value="ai-reviewer-v2">AI Reviewer v2 (Recommended)</SelectItem>
                    <SelectItem value="ai-reviewer-v3-beta">AI Reviewer v3 (Beta)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Select which AI model to use for code reviews
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Confidence Threshold</Label>
                  <span className="text-sm font-medium">{aiModelSettings.confidenceThreshold}%</span>
                </div>
                <Slider 
                  value={[aiModelSettings.confidenceThreshold]} 
                  min={50} 
                  max={95} 
                  step={5} 
                  className="flex-1"
                  onValueChange={([value]) => setAiModelSettings(prev => ({ ...prev, confidenceThreshold: value }))}
                />
                <p className="text-xs text-muted-foreground">
                  Minimum confidence required for the AI to report an issue
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language-tone" className="text-sm">Comment Tone</Label>
                <Select 
                  value={aiModelSettings.languageTone}
                  onValueChange={(value) => setAiModelSettings(prev => ({ ...prev, languageTone: value }))}
                >
                  <SelectTrigger id="language-tone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="concise">Concise</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  The tone used in AI-generated comments
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="suggestion-detail" className="text-sm">Suggestion Detail</Label>
                <Select 
                  value={aiModelSettings.suggestionDetail}
                  onValueChange={(value) => setAiModelSettings(prev => ({ ...prev, suggestionDetail: value }))}
                >
                  <SelectTrigger id="suggestion-detail">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brief">Brief</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                    <SelectItem value="educational">Educational (with explanations)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  How detailed AI suggestions should be
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max-comments" className="text-sm">Maximum Comments Per Review</Label>
                <Input
                  id="max-comments"
                  type="number"
                  min={1}
                  max={100}
                  value={aiModelSettings.maxCommentsPerReview}
                  onChange={(e) => setAiModelSettings(prev => ({ ...prev, maxCommentsPerReview: parseInt(e.target.value) }))}
                />
                <p className="text-xs text-muted-foreground">
                  Limit the number of comments to avoid overwhelming developers
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-prompt" className="text-sm">Custom AI Instructions</Label>
                <textarea
                  id="custom-prompt"
                  className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                  value={aiModelSettings.customPrompt}
                  onChange={(e) => setAiModelSettings(prev => ({ ...prev, customPrompt: e.target.value }))}
                  placeholder="Add custom instructions for the AI reviewer here..."
                />
                <p className="text-xs text-muted-foreground">
                  Provide additional instructions to guide the AI when reviewing code
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Languages Tab */}
          <TabsContent value="languages" className="p-6 pt-4 focus:outline-none">
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Select which programming languages the AI reviewer should analyze and configure language-specific rules.
              </p>

              <div className="space-y-4">
                {Object.entries(languageSettings).map(([language, settings]) => (
                  <div key={language} className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id={`lang-${language}`}
                          checked={settings.enabled}
                          onCheckedChange={() => handleLanguageToggle(language)}
                        />
                        <Label htmlFor={`lang-${language}`} className="font-medium capitalize">
                          {language}
                        </Label>
                      </div>
                      
                      {settings.enabled && (
                        <Badge variant="outline" className="bg-green-500/10 text-green-600 hover:bg-green-500/10">
                          Enabled
                        </Badge>
                      )}
                    </div>
                    
                    {settings.enabled && (
                      <div className="space-y-3 pl-6">
                        <div className="space-y-2">
                          <Label htmlFor={`rules-${language}`} className="text-sm">Custom Linting Rules</Label>
                          <Input
                            id={`rules-${language}`}
                            value={settings.customRules.join(', ')}
                            onChange={(e) => {
                              const rules = e.target.value ? e.target.value.split(',').map(r => r.trim()) : [];
                              setLanguageSettings(prev => ({
                                ...prev,
                                [language]: {
                                  ...prev[language],
                                  customRules: rules
                                }
                              }));
                            }}
                            placeholder="comma-separated list of rules"
                          />
                          <p className="text-xs text-muted-foreground">
                            Language-specific rules the AI should check for
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          </div>
        </Tabs>

        <DialogFooter className="p-4 border-t">
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsPopup;