
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Code, MessageSquare } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import { Badge } from "@/components/ui/badge";

const SampleReview = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sample AI Code Review</h1>
        <p className="text-muted-foreground mt-2">
          Experience how our AI analyzes your code and provides actionable insights
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pull Request #42: Add user authentication flow</CardTitle>
                <CardDescription>Opened 2 days ago by Alex Kim</CardDescription>
              </div>
              <Badge variant="outline" className="ml-2">Sample</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="comments">
              <TabsList className="mb-4">
                <TabsTrigger value="comments">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  AI Comments (3)
                </TabsTrigger>
                <TabsTrigger value="code">
                  <Code className="h-4 w-4 mr-2" />
                  Code Changes
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="comments" className="space-y-4">
                <div className="border rounded-lg">
                  <div className="bg-muted/50 px-4 py-2 border-b">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">auth.js</span> - Line 24-30
                    </div>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="bg-accent/30 rounded-md p-3 border border-accent">
                      <pre className="text-xs overflow-x-auto">
                        <code>{`function authenticate(user, token) {
  if (token != null && validateToken(token)) {
    // Set user session
    sessionStorage.user = user;
    return true;
  } else {
    return false;
  }
}`}</code>
                      </pre>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-medium text-primary">AI</span>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="bg-card border rounded-lg p-3 shadow-sm">
                          <p className="text-sm font-medium">Security Issue: Loose Equality Comparison</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            You're using loose equality (`!=`) which can lead to unexpected type coercion. For tokens, it's safer to use strict equality (`!==`) to ensure both type and value are checked.
                          </p>
                        </div>
                        <div className="bg-card border rounded-lg p-3 shadow-sm">
                          <p className="text-sm font-medium">Suggested fix:</p>
                          <div className="bg-muted rounded-md p-2 mt-2">
                            <pre className="text-xs overflow-x-auto">
                              <code>{`if (token !== null && validateToken(token)) {`}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="bg-muted/50 px-4 py-2 border-b">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">auth.js</span> - Line 45-55
                    </div>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="bg-accent/30 rounded-md p-3 border border-accent">
                      <pre className="text-xs overflow-x-auto">
                        <code>{`function validateToken(token) {
  // Decode the token
  const decoded = decodeToken(token);
  
  // Check if token is expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    return false;
  }
  
  return true;
}`}</code>
                      </pre>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-medium text-primary">AI</span>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="bg-card border rounded-lg p-3 shadow-sm">
                          <p className="text-sm font-medium">Error Handling Improvement</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            The function doesn't handle cases where token decoding might fail. If <code>decodeToken()</code> throws an error or returns null, accessing <code>decoded.exp</code> will cause a runtime error.
                          </p>
                        </div>
                        <div className="bg-card border rounded-lg p-3 shadow-sm">
                          <p className="text-sm font-medium">Suggested implementation:</p>
                          <div className="bg-muted rounded-md p-2 mt-2">
                            <pre className="text-xs overflow-x-auto">
                              <code>{`function validateToken(token) {
  try {
    // Decode the token
    const decoded = decodeToken(token);
    
    // Check if decoded exists and has expiration
    if (!decoded || typeof decoded.exp !== 'number') {
      return false;
    }
    
    // Check if token is expired
    const currentTime = Date.now() / 1000;
    return decoded.exp >= currentTime;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
}`}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg">
                  <div className="bg-muted/50 px-4 py-2 border-b">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">General Feedback</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-medium text-primary">AI</span>
                      </div>
                      <div className="bg-card border rounded-lg p-3 shadow-sm flex-1">
                        <p className="text-sm font-medium">Performance Impact Analysis</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          The authentication implementation looks good overall, with proper separation of concerns. Using <code>sessionStorage</code> for user data works for simple cases but has limitations:
                        </p>
                        <ul className="text-sm text-muted-foreground mt-2 list-disc pl-5 space-y-1">
                          <li>It's cleared when the tab is closed, unlike <code>localStorage</code></li>
                          <li>Not secure for storing sensitive information (consider HttpOnly cookies)</li>
                          <li>Storage is limited to strings, so objects need serialization</li>
                        </ul>
                        <p className="text-sm text-muted-foreground mt-2">
                          Consider using a dedicated auth management library for production applications.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="code">
                <div className="border rounded-lg">
                  <div className="bg-muted/50 px-4 py-2 border-b flex items-center justify-between">
                    <div className="text-sm font-medium">auth.js</div>
                    <Badge variant="outline">Modified</Badge>
                  </div>
                  <div className="p-4">
                    <pre className="text-xs bg-accent/30 rounded-md p-3 border border-accent overflow-x-auto">
                      <code>{`import jwt from 'jsonwebtoken';
import { config } from './config';

/**
 * User authentication module
 * Handles token validation and user sessions
 */

/**
 * Authenticate a user with the provided credentials
 * @param {Object} credentials - User login credentials
 * @returns {Promise<Object>} Authentication result with token
 */
async function login(credentials) {
  try {
    // API call to authentication endpoint would go here
    const response = await apiCall('/auth/login', credentials);
    
    if (response.token) {
      return {
        success: true,
        token: response.token,
        user: response.user
      };
    }
    
    return {
      success: false,
      error: 'Invalid credentials'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Validate the user's token and set up session
 * @param {Object} user - User data
 * @param {string} token - JWT token
 * @returns {boolean} Authentication success
 */
function authenticate(user, token) {
  if (token != null && validateToken(token)) {
    // Set user session
    sessionStorage.user = user;
    return true;
  } else {
    return false;
  }
}

/**
 * Validate a JWT token
 * @param {string} token - JWT token to validate
 * @returns {boolean} Token validity
 */
function validateToken(token) {
  // Decode the token
  const decoded = decodeToken(token);
  
  // Check if token is expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    return false;
  }
  
  return true;
}

/**
 * Decode a JWT token
 * @param {string} token - JWT token
 * @returns {Object} Decoded token payload
 */
function decodeToken(token) {
  return jwt.decode(token);
}

/**
 * Clear user session
 */
function logout() {
  sessionStorage.removeItem('user');
}

export {
  login,
  authenticate,
  validateToken,
  logout
};`}</code>
                    </pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button onClick={onNext} className="ml-auto">
              Continue to Dashboard
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <FeatureCard
          icon={<Code className="h-5 w-5" />}
          title="Intelligent Code Analysis"
          description="Our AI detects bugs, security issues, and performance problems before they reach production."
        />
        <FeatureCard
          icon={<MessageSquare className="h-5 w-5" />}
          title="Contextual Feedback"
          description="Get specific, actionable suggestions with code examples tailored to your codebase."
        />
        <FeatureCard
          icon={<ChevronRight className="h-5 w-5" />}
          title="Continuous Learning"
          description="The AI adapts to your team's preferences and coding style over time."
        />
      </div>
    </div>
  );
};

export default SampleReview;
