import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      title: "Новый заказ от ООО Стройком",
      message: "Поступил заказ на сумму 450,000 ₽",
      time: "5 минут назад",
      read: false,
      priority: "high"
    },
    {
      id: 2,
      type: "payment",
      title: "Платеж получен",
      message: "Поступил платеж от АО Металлург на сумму 1,200,000 ₽",
      time: "1 час назад",
      read: false,
      priority: "medium"
    },
    {
      id: 3,
      type: "supplier",
      title: "Новый поставщик",
      message: "ООО ТехПоставка подал заявку на регистрацию",
      time: "2 часа назад",
      read: true,
      priority: "low"
    },
    {
      id: 4,
      type: "system",
      title: "Обновление системы",
      message: "Запланировано техническое обслуживание на 15:00",
      time: "3 часа назад",
      read: true,
      priority: "medium"
    },
    {
      id: 5,
      type: "delivery",
      title: "Доставка завершена",
      message: "Заказ #ORD-2024-156 успешно доставлен",
      time: "5 часов назад",
      read: true,
      priority: "low"
    }
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    paymentAlerts: true,
    supplierNews: true,
    systemUpdates: false,
    marketingEmails: false
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <Icon name="ShoppingBag" size={20} className="text-blue-600" />;
      case "payment":
        return <Icon name="CreditCard" size={20} className="text-green-600" />;
      case "supplier":
        return <Icon name="Users" size={20} className="text-purple-600" />;
      case "system":
        return <Icon name="Settings" size={20} className="text-orange-600" />;
      case "delivery":
        return <Icon name="Truck" size={20} className="text-teal-600" />;
      default:
        return <Icon name="Bell" size={20} className="text-gray-600" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive" className="text-xs">Высокий</Badge>;
      case "medium":
        return <Badge variant="secondary" className="text-xs">Средний</Badge>;
      case "low":
        return <Badge variant="outline" className="text-xs">Низкий</Badge>;
      default:
        return null;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Уведомления</h1>
          <p className="text-gray-600">
            Управление уведомлениями и настройки оповещений
            {unreadCount > 0 && (
              <Badge className="ml-2">{unreadCount} непрочитанных</Badge>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Icon name="CheckCheck" size={16} className="mr-2" />
            Отметить все как прочитанные
          </Button>
          <Button variant="outline">
            <Icon name="Settings" size={16} className="mr-2" />
            Настройки
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">
            Все ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Непрочитанные ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="orders">
            Заказы
          </TabsTrigger>
          <TabsTrigger value="payments">
            Платежи
          </TabsTrigger>
          <TabsTrigger value="settings">
            Настройки
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`transition-all ${!notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </h3>
                        {getPriorityBadge(notification.priority)}
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Icon name="Check" size={16} />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {notifications.filter(n => !n.read).map((notification) => (
            <Card key={notification.id} className="border-l-4 border-l-blue-500 bg-blue-50/30">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{notification.title}</h3>
                        {getPriorityBadge(notification.priority)}
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Icon name="Check" size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {notifications.filter(n => !n.read).length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Icon name="CheckCircle" size={48} className="mx-auto text-green-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Все уведомления прочитаны</h3>
                <p className="text-gray-600">У вас нет непрочитанных уведомлений</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          {notifications.filter(n => n.type === 'order').map((notification) => (
            <Card key={notification.id} className={`transition-all ${!notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </h3>
                        {getPriorityBadge(notification.priority)}
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Icon name="Check" size={16} />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          {notifications.filter(n => n.type === 'payment').map((notification) => (
            <Card key={notification.id} className={`transition-all ${!notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </h3>
                        {getPriorityBadge(notification.priority)}
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Icon name="Check" size={16} />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Настройки уведомлений</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Способы доставки уведомлений</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email уведомления</p>
                      <p className="text-sm text-gray-600">Получать уведомления на электронную почту</p>
                    </div>
                    <Switch 
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push уведомления</p>
                      <p className="text-sm text-gray-600">Получать уведомления в браузере</p>
                    </div>
                    <Switch 
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, pushNotifications: checked }))}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS уведомления</p>
                      <p className="text-sm text-gray-600">Получать SMS на мобильный телефон</p>
                    </div>
                    <Switch 
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, smsNotifications: checked }))}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Типы уведомлений</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Обновления заказов</p>
                      <p className="text-sm text-gray-600">Уведомления о статусе заказов</p>
                    </div>
                    <Switch 
                      checked={settings.orderUpdates}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, orderUpdates: checked }))}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Платежные уведомления</p>
                      <p className="text-sm text-gray-600">Уведомления о поступлении платежей</p>
                    </div>
                    <Switch 
                      checked={settings.paymentAlerts}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, paymentAlerts: checked }))}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Новости поставщиков</p>
                      <p className="text-sm text-gray-600">Уведомления о новых поставщиках и товарах</p>
                    </div>
                    <Switch 
                      checked={settings.supplierNews}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, supplierNews: checked }))}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Системные обновления</p>
                      <p className="text-sm text-gray-600">Уведомления об обновлениях системы</p>
                    </div>
                    <Switch 
                      checked={settings.systemUpdates}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, systemUpdates: checked }))}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Маркетинговые рассылки</p>
                      <p className="text-sm text-gray-600">Получать информацию о акциях и предложениях</p>
                    </div>
                    <Switch 
                      checked={settings.marketingEmails}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, marketingEmails: checked }))}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Отменить</Button>
                <Button>Сохранить настройки</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;