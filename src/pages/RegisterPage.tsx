import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import api, { RegisterRequest } from "@/lib/api";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setLoading, setUser, setError } from "@/lib/redux/slices/userSlice";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("weak");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (password.length === 0) {
      setPasswordStrength("weak");
    } else if (password.length < 6) {
      setPasswordStrength("weak");
    } else if (password.length < 10) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("strong");
    }
  }, [password]);

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case "weak":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "strong":
        return "bg-green-500";
      default:
        return "bg-red-500";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const registerData: RegisterRequest = {
        name: username,
        email,
        password,
      };

      const response = await api.auth.register(registerData);

      localStorage.setItem("authToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      dispatch(setUser(response.user));

      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      dispatch(
        setError(error.response?.data?.message || "Failed to create account")
      );
      toast.error(
        error.response?.data?.message ||
          "Failed to create account. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary/30 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground h-8 w-8 rounded flex items-center justify-center font-bold">
              IC
            </div>
            <span className="font-bold text-xl">InsightCode</span>
          </Link>
        </div>

        <div className="bg-card border rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            Create your account
          </h1>

          {/* <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2" 
              onClick={() => handleOAuthSignup("GitHub")}
              disabled={isLoading}
            >
              <div className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center text-white text-xs">G</div>
              <span>Sign up with GitHub</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2" 
              onClick={() => handleOAuthSignup("Google")}
              disabled={isLoading}
            >
              <div className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center text-white text-xs">G</div>
              <span>Sign up with Google</span>
            </Button>
          </div>
          
          <div className="flex items-center my-6">
            <Separator className="flex-1" />
            <span className="mx-4 text-sm text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div> */}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOffIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </button>
              </div>

              {/* Password strength indicator */}
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-muted-foreground capitalize">
                      Password strength: {passwordStrength}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`}
                      style={{
                        width:
                          passwordStrength === "weak"
                            ? "33%"
                            : passwordStrength === "medium"
                            ? "66%"
                            : "100%",
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              Already have an account?
            </span>{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <span>By signing up, you agree to our</span>{" "}
          <Link to="/terms" className="underline hover:text-foreground">
            Terms of Service
          </Link>{" "}
          <span>and</span>{" "}
          <Link to="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
