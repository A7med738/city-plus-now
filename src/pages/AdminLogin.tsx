import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Building2,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    centerId: "",
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // محاكاة تسجيل الدخول
    setTimeout(() => {
      if (formData.centerId === "CENTER001" && 
          formData.username === "admin" && 
          formData.password === "admin123") {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في لوحة الإدارة",
        });
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: "البيانات المدخلة غير صحيحة",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4" dir="rtl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-500/5 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500/5 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Back Button */}
      <Button
        onClick={goBack}
        variant="ghost"
        size="sm"
        className="absolute top-4 left-4 z-10"
      >
        <ArrowLeft className="w-4 h-4 ml-2" />
        العودة للتطبيق
      </Button>

      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-gradient-card shadow-card border-border">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
              <Building2 className="w-6 h-6 text-blue-500" />
              تسجيل دخول الإدارة
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              لوحة تحكم المراكز الطبية
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Center ID */}
              <div className="space-y-2">
                <Label htmlFor="centerId" className="text-sm font-medium text-foreground">
                  رقم المركز
                </Label>
                <Input
                  id="centerId"
                  name="centerId"
                  type="text"
                  placeholder="أدخل رقم المركز"
                  value={formData.centerId}
                  onChange={handleInputChange}
                  required
                  className="text-right"
                />
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-foreground">
                  اسم المستخدم
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="أدخل اسم المستخدم"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="text-right"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  كلمة المرور
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة المرور"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="text-right pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    جاري تسجيل الدخول...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    تسجيل الدخول
                  </div>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted/20 rounded-lg">
              <h4 className="text-sm font-medium text-foreground mb-2">بيانات تجريبية:</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <p><strong>رقم المركز:</strong> CENTER001</p>
                <p><strong>اسم المستخدم:</strong> admin</p>
                <p><strong>كلمة المرور:</strong> admin123</p>
              </div>
            </div>

            {/* Help Text */}
            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                تواجه مشكلة في تسجيل الدخول؟ 
                <Button variant="link" className="p-0 h-auto text-xs text-blue-500">
                  اتصل بالدعم الفني
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

