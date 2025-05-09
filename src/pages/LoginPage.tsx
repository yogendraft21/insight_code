import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api, { LoginRequest } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setError, setLoading, setUser } from "@/lib/redux/slices/userSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const loginData: LoginRequest = {
        email,
        password,
      };

      const response = await api.auth.login(loginData);

      localStorage.setItem("authToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      dispatch(setUser(response.user));

      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      dispatch(
        setError(error.response?.data?.message || "Invalid email or password")
      );
      toast.error(
        error.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
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
            Sign in to your account
          </h1>

          {/* <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2" 
              onClick={() => handleOAuthLogin("GitHub")}
              disabled={isLoading}
            >
              <div className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center text-white text-xs">G</div>
              <span>Sign in with GitHub</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2" 
              onClick={() => handleOAuthLogin("Google")}
              disabled={isLoading}
            >
              <div className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center text-white text-xs">G</div>
              <span>Sign in with Google</span>
            </Button>
          </div>
          
          <div className="flex items-center my-6">
            <Separator className="flex-1" />
            <span className="mx-4 text-sm text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div> */}

          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              Don't have an account?
            </span>{" "}
            <Link
              to="/signup"
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <span>By signing in, you agree to our</span>{" "}
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

export default LoginPage;
