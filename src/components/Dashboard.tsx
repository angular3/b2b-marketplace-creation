import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import Icon from "@/components/ui/icon";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Данные для аналитики
  const salesData = [
    { month: "Янв", sales: 2400000, orders: 45 },
    { month: "Фев", sales: 1800000, orders: 38 },
    { month: "Мар", sales: 3200000, orders: 62 },
    { month: "Апр", sales: 2800000, orders: 55 },
    { month: "Май", sales: 3600000, orders: 71 },
    { month: "Июн", sales: 4200000, orders: 83 }
  ];

  const categoryData = [
    { name: "Металлопрокат", value: 35, color: "#0088FE" },
    { name: "Стройматериалы", value: 28, color: "#00C49F" },
    { name: "Электроника", value: 18, color: "#FFBB28" },
    { name: "Упаковка", value: 12, color: "#FF8042" },
    { name: "Прочее", value: 7, color: "#8884D8" }
  ];

  const recentOrders = [
    { id: "ORD-2024-001", company: "ООО Стройком", amount: 450000, status: "processing", date: "2024-01-15" },
    { id: "ORD-2024-002", company: "АО Металлург", amount: 1200000, status: "delivered", date: "2024-01-14" },
    { id: "ORD-2024-003", company: "ИП Электро", amount: 85000, status: "pending", date: "2024-01-13" }
  ];

  const topSuppliers = [
    { name: "ООО Металл-Трейд", orders: 156, revenue: 12500000, rating: 4.9 },
    { name: "АО СтройБаза", orders: 134, revenue: 9800000, rating: 4.8 },
    { name: "КабельСнаб", orders: 98, revenue: 7200000, rating: 4.9 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Доставлен</Badge>;
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">В обработке</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Ожидает</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Панель управления</h1>
          <p className="text-gray-600">Обзор деятельности и ключевые показатели</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Экспорт отчета
          </Button>
          <Button size="sm">
            <Icon name="Plus" size={16} className="mr-2" />
            Новый заказ
          </Button>
        </div>
      </div>

      {/* Основные метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Общий оборот</CardTitle>
            <Icon name="DollarSign" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.2М ₽</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> к прошлому месяцу
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные заказы</CardTitle>
            <Icon name="ShoppingBag" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">354</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> к прошлому месяцу
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Поставщики</CardTitle>
            <Icon name="Users" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,547</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+156</span> новых за месяц
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Средний чек</CardTitle>
            <Icon name="TrendingUp" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">51,400 ₽</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">-2.1%</span> к прошлому месяцу
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Графики и аналитика */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Динамика продаж</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sales: { label: "Продажи", color: "#0088FE" },
                orders: { label: "Заказы", color: "#00C49F" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sales" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Распределение по категориям</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: "Доля", color: "#0088FE" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Детальная информация */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Последние заказы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{order.company}</p>
                    <p className="text-sm text-gray-600">#{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{order.amount.toLocaleString('ru-RU')} ₽</p>
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Топ поставщики</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSuppliers.map((supplier, index) => (
                <div key={supplier.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{supplier.name}</p>
                      <p className="text-sm text-gray-600">{supplier.orders} заказов</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{(supplier.revenue / 1000000).toFixed(1)}М ₽</p>
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
                      <span className="text-sm">{supplier.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;