import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "Александр",
    lastName: "Петров",
    email: "a.petrov@company.ru",
    phone: "+7 (495) 123-45-67",
    position: "Менеджер по закупкам",
    company: "ООО «Строительная компания»",
    inn: "7701234567",
    address: "г. Москва, ул. Деловая, д. 15",
    website: "https://company.ru",
    description: "Опытный специалист в области корпоративных закупок с 8-летним стажем работы в строительной отрасли."
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    emailNotifications: true,
    smsNotifications: false,
    loginAlerts: true
  });

  const [preferences, setPreferences] = useState({
    language: "ru",
    timezone: "Europe/Moscow",
    currency: "RUB",
    theme: "light"
  });

  const orderHistory = [
    { id: "ORD-2024-001", date: "2024-01-15", amount: 450000, status: "delivered", items: 12 },
    { id: "ORD-2024-002", date: "2024-01-10", amount: 1200000, status: "delivered", items: 8 },
    { id: "ORD-2024-003", date: "2024-01-05", amount: 85000, status: "delivered", items: 25 },
    { id: "ORD-2023-156", date: "2023-12-28", amount: 320000, status: "delivered", items: 15 },
    { id: "ORD-2023-155", date: "2023-12-20", amount: 750000, status: "delivered", items: 6 }
  ];

  const favoriteSuppliers = [
    { name: "ООО Металл-Трейд", category: "Металлопрокат", orders: 24, rating: 4.9 },
    { name: "АО СтройБаза", category: "Стройматериалы", orders: 18, rating: 4.8 },
    { name: "КабельСнаб", category: "Электротехника", orders: 12, rating: 4.9 }
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Профиль пользователя</h1>
          <p className="text-gray-600">Управление личными данными и настройками аккаунта</p>
        </div>
        <Button>
          <Icon name="Save" size={16} className="mr-2" />
          Сохранить изменения
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Боковая панель с аватаром */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg" />
                <AvatarFallback className="text-2xl">АП</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold">{profile.firstName} {profile.lastName}</h3>
              <p className="text-gray-600 text-sm mb-2">{profile.position}</p>
              <p className="text-gray-500 text-sm mb-4">{profile.company}</p>
              
              <div className="space-y-2 mb-4">
                <Badge variant="outline" className="w-full justify-center">
                  <Icon name="CheckCircle" size={14} className="mr-1" />
                  Верифицирован
                </Badge>
                <Badge variant="secondary" className="w-full justify-center">
                  <Icon name="Star" size={14} className="mr-1" />
                  Премиум аккаунт
                </Badge>
              </div>

              <Button variant="outline" className="w-full mb-2">
                <Icon name="Camera" size={16} className="mr-2" />
                Изменить фото
              </Button>
              <Button variant="outline" className="w-full">
                <Icon name="Download" size={16} className="mr-2" />
                Скачать визитку
              </Button>
            </CardContent>
          </Card>

          {/* Статистика */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Статистика</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Всего заказов:</span>
                <span className="font-semibold">127</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Общая сумма:</span>
                <span className="font-semibold">8.2М ₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Поставщиков:</span>
                <span className="font-semibold">34</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">На платформе:</span>
                <span className="font-semibold">2 года</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Основной контент */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile">Профиль</TabsTrigger>
              <TabsTrigger value="company">Компания</TabsTrigger>
              <TabsTrigger value="security">Безопасность</TabsTrigger>
              <TabsTrigger value="preferences">Настройки</TabsTrigger>
              <TabsTrigger value="history">История</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Личная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Имя</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Фамилия</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="position">Должность</Label>
                    <Input
                      id="position"
                      value={profile.position}
                      onChange={(e) => setProfile(prev => ({ ...prev, position: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">О себе</Label>
                    <Textarea
                      id="description"
                      value={profile.description}
                      onChange={(e) => setProfile(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="company" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Информация о компании</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="company">Название компании</Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="inn">ИНН</Label>
                      <Input
                        id="inn"
                        value={profile.inn}
                        onChange={(e) => setProfile(prev => ({ ...prev, inn: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Веб-сайт</Label>
                      <Input
                        id="website"
                        value={profile.website}
                        onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Адрес</Label>
                    <Textarea
                      id="address"
                      value={profile.address}
                      onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Избранные поставщики</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {favoriteSuppliers.map((supplier) => (
                      <div key={supplier.name} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{supplier.name}</h4>
                          <p className="text-sm text-gray-600">{supplier.category} • {supplier.orders} заказов</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
                            <span className="text-sm">{supplier.rating}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Icon name="Heart" size={16} className="text-red-500 fill-current" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Безопасность аккаунта</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Смена пароля</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">Текущий пароль</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">Новый пароль</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                      <Button>Изменить пароль</Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Настройки безопасности</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Двухфакторная аутентификация</p>
                          <p className="text-sm text-gray-600">Дополнительная защита аккаунта</p>
                        </div>
                        <Switch 
                          checked={security.twoFactorAuth}
                          onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, twoFactorAuth: checked }))}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Уведомления о входе</p>
                          <p className="text-sm text-gray-600">Получать уведомления о новых входах</p>
                        </div>
                        <Switch 
                          checked={security.loginAlerts}
                          onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, loginAlerts: checked }))}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Активные сессии</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon name="Monitor" size={20} className="text-gray-600" />
                          <div>
                            <p className="font-medium">Chrome на Windows</p>
                            <p className="text-sm text-gray-600">Москва, Россия • Сейчас</p>
                          </div>
                        </div>
                        <Badge variant="outline">Текущая</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon name="Smartphone" size={20} className="text-gray-600" />
                          <div>
                            <p className="font-medium">Safari на iPhone</p>
                            <p className="text-sm text-gray-600">Москва, Россия • 2 часа назад</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Завершить</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки интерфейса</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="language">Язык интерфейса</Label>
                      <Select value={preferences.language} onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ru">Русский</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="timezone">Часовой пояс</Label>
                      <Select value={preferences.timezone} onValueChange={(value) => setPreferences(prev => ({ ...prev, timezone: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Europe/Moscow">Москва (UTC+3)</SelectItem>
                          <SelectItem value="Europe/London">Лондон (UTC+0)</SelectItem>
                          <SelectItem value="America/New_York">Нью-Йорк (UTC-5)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="currency">Валюта</Label>
                      <Select value={preferences.currency} onValueChange={(value) => setPreferences(prev => ({ ...prev, currency: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="RUB">Российский рубль (₽)</SelectItem>
                          <SelectItem value="USD">Доллар США ($)</SelectItem>
                          <SelectItem value="EUR">Евро (€)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="theme">Тема оформления</Label>
                      <Select value={preferences.theme} onValueChange={(value) => setPreferences(prev => ({ ...prev, theme: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Светлая</SelectItem>
                          <SelectItem value="dark">Темная</SelectItem>
                          <SelectItem value="auto">Автоматически</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>История заказов</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderHistory.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Заказ #{order.id}</h4>
                          <p className="text-sm text-gray-600">{order.date} • {order.items} товаров</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{order.amount.toLocaleString('ru-RU')} ₽</p>
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-6">
                    <Button variant="outline">
                      <Icon name="Eye" size={16} className="mr-2" />
                      Показать все заказы
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;