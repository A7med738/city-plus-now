import { useState } from "react";
import { 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  Bell,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface QueueItem {
  id: string;
  patientName: string;
  service: string;
  doctor: string;
  queueNumber: number;
  status: "waiting" | "in-progress" | "completed";
  estimatedWait: number;
  arrivalTime: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  isActive: boolean;
  currentPatient?: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  averageWaitTime: number;
}

const mockQueueData: QueueItem[] = [
  {
    id: "1",
    patientName: "أحمد محمد",
    service: "الطوارئ",
    doctor: "د. سارة أحمد",
    queueNumber: 1,
    status: "in-progress",
    estimatedWait: 0,
    arrivalTime: "10:30 ص"
  },
  {
    id: "2",
    patientName: "فاطمة علي",
    service: "الطب العام",
    doctor: "د. محمد حسن",
    queueNumber: 2,
    status: "waiting",
    estimatedWait: 15,
    arrivalTime: "10:45 ص"
  },
  {
    id: "3",
    patientName: "خالد سعد",
    service: "طب الأسنان",
    doctor: "د. نورا عبدالله",
    queueNumber: 3,
    status: "waiting",
    estimatedWait: 30,
    arrivalTime: "11:00 ص"
  }
];

const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "د. سارة أحمد",
    specialty: "الطوارئ",
    isActive: true,
    currentPatient: "أحمد محمد"
  },
  {
    id: "2",
    name: "د. محمد حسن",
    specialty: "الطب العام",
    isActive: true
  },
  {
    id: "3",
    name: "د. نورا عبدالله",
    specialty: "طب الأسنان",
    isActive: false
  }
];

const mockServices: Service[] = [
  {
    id: "1",
    name: "الطوارئ",
    description: "خدمات الطوارئ الطبية",
    isActive: true,
    averageWaitTime: 10
  },
  {
    id: "2",
    name: "الطب العام",
    description: "الرعاية الطبية العامة",
    isActive: true,
    averageWaitTime: 20
  },
  {
    id: "3",
    name: "طب الأسنان",
    description: "خدمات طب الأسنان",
    isActive: true,
    averageWaitTime: 25
  }
];

export default function AdminDashboard() {
  const [queueData, setQueueData] = useState<QueueItem[]>(mockQueueData);
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [services, setServices] = useState<Service[]>(mockServices);
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: QueueItem['status']) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: QueueItem['status']) => {
    switch (status) {
      case 'waiting': return 'في الانتظار';
      case 'in-progress': return 'قيد المعالجة';
      case 'completed': return 'مكتمل';
      default: return 'غير محدد';
    }
  };

  const handleNextPatient = (doctorId: string) => {
    // Logic to move to next patient
    console.log("Next patient for doctor:", doctorId);
  };

  const handleCompletePatient = (queueId: string) => {
    setQueueData(prev => 
      prev.map(item => 
        item.id === queueId 
          ? { ...item, status: 'completed' as const }
          : item
      )
    );
  };

  const filteredQueue = queueData.filter(item =>
    item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20" dir="rtl">
      {/* Header */}
      <div className="bg-background border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">لوحة إدارة المركز الطبي</h1>
            <p className="text-muted-foreground">مركز المدينة الطبي - إدارة الأدوار والخدمات</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 ml-2" />
              الإشعارات
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 ml-2" />
              الإعدادات
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي المرضى</p>
                  <p className="text-2xl font-bold text-foreground">{queueData.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">في الانتظار</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {queueData.filter(item => item.status === 'waiting').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">قيد المعالجة</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {queueData.filter(item => item.status === 'in-progress').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">الأطباء النشطين</p>
                  <p className="text-2xl font-bold text-green-600">
                    {doctors.filter(doctor => doctor.isActive).length}
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="queue" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="queue">إدارة الأدوار</TabsTrigger>
            <TabsTrigger value="doctors">الأطباء</TabsTrigger>
            <TabsTrigger value="services">الخدمات</TabsTrigger>
          </TabsList>

          {/* Queue Management Tab */}
          <TabsContent value="queue" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    إدارة الأدوار
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="البحث في الأدوار..."
                      className="w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button size="sm">
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة مريض
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredQueue.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold text-primary">{item.queueNumber}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{item.patientName}</h3>
                          <p className="text-sm text-muted-foreground">{item.service} - {item.doctor}</p>
                          <p className="text-xs text-muted-foreground">الوصول: {item.arrivalTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(item.status)}>
                          {getStatusText(item.status)}
                        </Badge>
                        {item.status === 'waiting' && (
                          <span className="text-sm text-muted-foreground">
                            ~{item.estimatedWait} دقيقة
                          </span>
                        )}
                        <div className="flex gap-2">
                          {item.status === 'waiting' && (
                            <Button size="sm" variant="outline" onClick={() => handleNextPatient(item.doctor)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                          )}
                          {item.status === 'in-progress' && (
                            <Button size="sm" onClick={() => handleCompletePatient(item.id)}>
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Doctors Management Tab */}
          <TabsContent value="doctors" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    إدارة الأطباء
                  </CardTitle>
                  <Button size="sm">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة طبيب
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                        <Badge className={doctor.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {doctor.isActive ? 'نشط' : 'غير نشط'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">التخصص: {doctor.specialty}</p>
                      {doctor.currentPatient && (
                        <p className="text-sm text-blue-600 mb-3">المريض الحالي: {doctor.currentPatient}</p>
                      )}
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Management Tab */}
          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    إدارة الخدمات
                  </CardTitle>
                  <Button size="sm">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة خدمة
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h3 className="font-semibold text-foreground">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                        <p className="text-xs text-muted-foreground">
                          متوسط وقت الانتظار: {service.averageWaitTime} دقيقة
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={service.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {service.isActive ? 'نشط' : 'غير نشط'}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

