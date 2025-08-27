import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";
import Icon from "@/components/ui/icon";

const Analytics = () => {
  const [period, setPeriod] = useState("6months");
  const [metric, setMetric] = useState("revenue");

  // Данные для различных графиков
  const revenueData = [
    { period: "Янв 2024", revenue: 2400000, profit: 480000, orders: 45, avgCheck: 53333 },
    { period: "Фев 2024", revenue: 1800000, profit: 360000, orders: 38, avgCheck: 47368 },
    { period: "Мар 2024", revenue: 3200000, profit: 640000, orders: 62, avgCheck: 51613 },
    { period: "Апр 2024", revenue: 2800000, profit: 560000, orders: 55, avgCheck: 50909 },
    { period: "Май 2024", revenue: 3600000, profit: 720000, orders: 71, avgCheck: 50704 },
    { period: "Июн 2024", revenue: 4200000, profit: 840000, orders: 83, avgCheck: 50602 }
  ];

  const categoryPerformance = [
    { category: "Металлопрокат", revenue: 8500000, growth: 15.2, margin: 22 },
    { category: "Стройматериалы", revenue: 6200000, growth: 8.7, margin: 18 },
    { category: "Электроника", revenue: 4100000, growth: 25.3, margin: 28 },
    { category: "Упаковка", revenue: 2800000, growth: 12.1, margin: 15 },
    { category: "Канцелярия", revenue: 1900000, growth: 5.4, margin: 35 }
  ];

  const supplierMetrics = [
    { name: "ООО Металл-Трейд", orders: 156, revenue: 12500000, satisfaction: 4.9, onTime: 98 },
    { name: "АО СтройБаза", orders: 134, revenue: 9800000, satisfaction: 4.8, onTime: 95 },
    { name: "КабельСнаб", orders: 98, revenue: 7200000, satisfaction: 4.9, onTime: 97 },
    { name: "ПакСервис", orders: 87, revenue: 5400000, satisfaction: 4.6, onTime: 92 },
    { name: "ОфисСнаб", orders: 76, revenue: 4100000, satisfaction: 4.4, onTime: 89 }
  ];

  const regionData = [
    { region: "Москва", revenue: 8900000, orders: 167, growth: 12.5 },
    { region: "СПб", revenue: 5600000, orders: 98, growth: 8.3 },
    { region: "Екатеринбург", revenue: 3400000, orders: 67, growth: 15.7 },
    { region: "Новосибирск", revenue: 2800000, orders: 54, growth: 22.1 },
    { region: "Казань", revenue: 2100000, orders: 43, growth: 18.9 }
  ];

  return (
    <div className="space-y-6">
      {/* Заголовок и фильтры */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Аналитика и отчеты</h1>
          <p className="text-gray-600">Детальный анализ бизнес-показателей</p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Месяц</SelectItem>
              <SelectItem value="quarter">Квартал</SelectItem>
              <SelectItem value="6months">6 месяцев</SelectItem>
              <SelectItem value="year">Год</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Icon name="Download" size={16} className="mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="categories">Категории</TabsTrigger>
          <TabsTrigger value="suppliers">Поставщики</TabsTrigger>
          <TabsTrigger value="regions">Регионы</TabsTrigger>
          <TabsTrigger value="forecasts">Прогнозы</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Основные показатели */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Общая выручка</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23.0М ₽</div>
                <div className="flex items-center text-sm text-green-600">
                  <Icon name="TrendingUp" size={16} className="mr-1" />
                  +12.5% к прошлому периоду
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Валовая прибыль</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.6М ₽</div>
                <div className="flex items-center text-sm text-green-600">
                  <Icon name="TrendingUp" size={16} className="mr-1" />
                  +8.3% к прошлому периоду
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Маржинальность</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">20.1%</div>
                <div className="flex items-center text-sm text-red-600">
                  <Icon name="TrendingDown" size={16} className="mr-1" />
                  -1.2% к прошлому периоду
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Конверсия</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.8%</div>
                <div className="flex items-center text-sm text-green-600">
                  <Icon name="TrendingUp" size={16} className="mr-1" />
                  +0.5% к прошлому периоду
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Графики динамики */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Динамика выручки и прибыли</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenue: { label: "Выручка", color: "#0088FE" },
                    profit: { label: "Прибыль", color: "#00C49F" }
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="revenue" stackId="1" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="profit" stackId="2" stroke="#00C49F" fill="#00C49F" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Количество заказов и средний чек</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    orders: { label: "Заказы", color: "#FFBB28" },
                    avgCheck: { label: "Средний чек", color: "#FF8042" }
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar yAxisId="left" dataKey="orders" fill="#FFBB28" />
                      <Line yAxisId="right" type="monotone" dataKey="avgCheck" stroke="#FF8042" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Анализ по категориям товаров</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryPerformance.map((category) => (
                  <div key={category.category} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{category.category}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span>Выручка: {(category.revenue / 1000000).toFixed(1)}М ₽</span>
                        <span className={`flex items-center ${category.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          <Icon name={category.growth > 0 ? "TrendingUp" : "TrendingDown"} size={14} className="mr-1" />
                          {category.growth > 0 ? '+' : ''}{category.growth}%
                        </span>
                        <span>Маржа: {category.margin}%</span>
                      </div>
                    </div>
                    <div className="w-32">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(category.revenue / 8500000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Рейтинг поставщиков</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplierMetrics.map((supplier, index) => (
                  <div key={supplier.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{supplier.name}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span>{supplier.orders} заказов</span>
                          <span>{(supplier.revenue / 1000000).toFixed(1)}М ₽</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium">{supplier.satisfaction}</div>
                        <div className="text-gray-500">Рейтинг</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{supplier.onTime}%</div>
                        <div className="text-gray-500">В срок</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Анализ по регионам</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: { label: "Выручка", color: "#0088FE" },
                  orders: { label: "Заказы", color: "#00C49F" }
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="region" type="category" width={100} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecasts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Прогнозы развития</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg">
                  <Icon name="TrendingUp" size={32} className="mx-auto mb-4 text-green-600" />
                  <h3 className="text-lg font-semibold mb-2">Рост выручки</h3>
                  <p className="text-2xl font-bold text-green-600">+18%</p>
                  <p className="text-sm text-gray-600 mt-2">Прогноз на следующий квартал</p>
                </div>
                
                <div className="text-center p-6 border rounded-lg">
                  <Icon name="Users" size={32} className="mx-auto mb-4 text-blue-600" />
                  <h3 className="text-lg font-semibold mb-2">Новые поставщики</h3>
                  <p className="text-2xl font-bold text-blue-600">+250</p>
                  <p className="text-sm text-gray-600 mt-2">Ожидается в ближайшие 3 месяца</p>
                </div>
                
                <div className="text-center p-6 border rounded-lg">
                  <Icon name="ShoppingBag" size={32} className="mx-auto mb-4 text-purple-600" />
                  <h3 className="text-lg font-semibold mb-2">Объем заказов</h3>
                  <p className="text-2xl font-bold text-purple-600">+22%</p>
                  <p className="text-sm text-gray-600 mt-2">Прогнозируемый рост</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;