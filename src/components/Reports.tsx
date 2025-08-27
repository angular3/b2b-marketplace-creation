import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [reportType, setReportType] = useState("sales");

  // Готовые отчеты
  const savedReports = [
    {
      id: 1,
      name: "Отчет по продажам за декабрь 2023",
      type: "Продажи",
      created: "2024-01-05",
      size: "2.4 MB",
      format: "PDF",
      status: "ready"
    },
    {
      id: 2,
      name: "Анализ поставщиков Q4 2023",
      type: "Поставщики",
      created: "2024-01-03",
      size: "1.8 MB",
      format: "Excel",
      status: "ready"
    },
    {
      id: 3,
      name: "Финансовый отчет 2023",
      type: "Финансы",
      created: "2024-01-02",
      size: "3.2 MB",
      format: "PDF",
      status: "processing"
    }
  ];

  // Шаблоны отчетов
  const reportTemplates = [
    {
      id: "sales-summary",
      name: "Сводка продаж",
      description: "Общая статистика продаж за выбранный период",
      category: "Продажи",
      icon: "TrendingUp"
    },
    {
      id: "supplier-performance",
      name: "Эффективность поставщиков",
      description: "Анализ работы поставщиков и качества поставок",
      category: "Поставщики",
      icon: "Users"
    },
    {
      id: "financial-report",
      name: "Финансовый отчет",
      description: "Детальный анализ доходов, расходов и прибыли",
      category: "Финансы",
      icon: "DollarSign"
    },
    {
      id: "inventory-analysis",
      name: "Анализ товарных остатков",
      description: "Отчет по складским остаткам и оборачиваемости",
      category: "Склад",
      icon: "Package"
    },
    {
      id: "customer-analysis",
      name: "Анализ клиентов",
      description: "Статистика по клиентам и их покупательской активности",
      category: "Клиенты",
      icon: "UserCheck"
    },
    {
      id: "regional-report",
      name: "Региональный отчет",
      description: "Анализ продаж и активности по регионам",
      category: "География",
      icon: "MapPin"
    }
  ];

  // Данные для таблиц
  const salesData = [
    { product: "Трубы стальные", quantity: 1250, revenue: 5600000, margin: 22.5 },
    { product: "Цемент", quantity: 850, revenue: 3200000, margin: 18.2 },
    { product: "Кабель ВВГ", quantity: 420, revenue: 2100000, margin: 28.1 },
    { product: "Профнастил", quantity: 680, revenue: 1800000, margin: 15.8 },
    { product: "Упаковка", quantity: 2100, revenue: 950000, margin: 35.2 }
  ];

  const supplierData = [
    { name: "ООО Металл-Трейд", orders: 156, onTime: 98, quality: 4.9, revenue: 12500000 },
    { name: "АО СтройБаза", orders: 134, onTime: 95, quality: 4.8, revenue: 9800000 },
    { name: "КабельСнаб", orders: 98, onTime: 97, quality: 4.9, revenue: 7200000 },
    { name: "ПакСервис", orders: 87, onTime: 92, quality: 4.6, revenue: 5400000 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-green-100 text-green-800">Готов</Badge>;
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Обработка</Badge>;
      case "error":
        return <Badge variant="destructive">Ошибка</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const generateReport = (templateId: string) => {
    console.log("Генерация отчета:", templateId);
    // Здесь будет логика генерации отчета
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Отчеты и аналитика</h1>
          <p className="text-gray-600">Создание и управление отчетами по всем аспектам бизнеса</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Icon name="Settings" size={16} className="mr-2" />
            Настройки отчетов
          </Button>
          <Button>
            <Icon name="Plus" size={16} className="mr-2" />
            Создать отчет
          </Button>
        </div>
      </div>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">Шаблоны</TabsTrigger>
          <TabsTrigger value="saved">Готовые отчеты</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          <TabsTrigger value="scheduled">Расписание</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Шаблоны отчетов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reportTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name={template.icon as any} size={24} className="text-primary" />
                        </div>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                      
                      <Button 
                        className="w-full" 
                        onClick={() => generateReport(template.id)}
                      >
                        <Icon name="FileText" size={16} className="mr-2" />
                        Создать отчет
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Готовые отчеты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon name="FileText" size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{report.type}</span>
                          <span>•</span>
                          <span>{report.created}</span>
                          <span>•</span>
                          <span>{report.size}</span>
                          <span>•</span>
                          <span>{report.format}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getStatusBadge(report.status)}
                      {report.status === "ready" && (
                        <>
                          <Button variant="ghost" size="sm">
                            <Icon name="Eye" size={16} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="Download" size={16} />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="sm">
                        <Icon name="MoreVertical" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Фильтры */}
          <Card>
            <CardHeader>
              <CardTitle>Настройки анализа</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Период</label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Неделя</SelectItem>
                      <SelectItem value="month">Месяц</SelectItem>
                      <SelectItem value="quarter">Квартал</SelectItem>
                      <SelectItem value="year">Год</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Тип отчета</label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Продажи</SelectItem>
                      <SelectItem value="suppliers">Поставщики</SelectItem>
                      <SelectItem value="products">Товары</SelectItem>
                      <SelectItem value="regions">Регионы</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button className="w-full">
                    <Icon name="Search" size={16} className="mr-2" />
                    Применить фильтры
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Таблицы данных */}
          {reportType === "sales" && (
            <Card>
              <CardHeader>
                <CardTitle>Анализ продаж по товарам</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Товар</TableHead>
                      <TableHead>Количество</TableHead>
                      <TableHead>Выручка</TableHead>
                      <TableHead>Маржинальность</TableHead>
                      <TableHead>Доля</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell>{item.quantity.toLocaleString('ru-RU')}</TableCell>
                        <TableCell>{item.revenue.toLocaleString('ru-RU')} ₽</TableCell>
                        <TableCell>{item.margin}%</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={(item.revenue / 5600000) * 100} className="w-16" />
                            <span className="text-sm">{((item.revenue / 5600000) * 100).toFixed(1)}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {reportType === "suppliers" && (
            <Card>
              <CardHeader>
                <CardTitle>Анализ эффективности поставщиков</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Поставщик</TableHead>
                      <TableHead>Заказы</TableHead>
                      <TableHead>Вовремя</TableHead>
                      <TableHead>Качество</TableHead>
                      <TableHead>Выручка</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supplierData.map((supplier, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{supplier.name}</TableCell>
                        <TableCell>{supplier.orders}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={supplier.onTime} className="w-16" />
                            <span className="text-sm">{supplier.onTime}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
                            <span>{supplier.quality}</span>
                          </div>
                        </TableCell>
                        <TableCell>{(supplier.revenue / 1000000).toFixed(1)}М ₽</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Автоматические отчеты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Icon name="Calendar" size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Настройте автоматические отчеты</h3>
                <p className="text-gray-600 mb-6">
                  Создавайте отчеты по расписанию и получайте их автоматически на email
                </p>
                <Button>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать расписание
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;