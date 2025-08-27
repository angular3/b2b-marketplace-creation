import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

interface Message {
  id: number;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'image';
  fileUrl?: string;
  fileName?: string;
}

interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  online: boolean;
  type: 'supplier' | 'support' | 'manager';
}

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>("chat-1");
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chats: Chat[] = [
    {
      id: "chat-1",
      name: "ООО Металл-Трейд",
      avatar: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      lastMessage: "Готовы отгрузить заказ завтра утром",
      timestamp: "14:30",
      unreadCount: 2,
      online: true,
      type: "supplier"
    },
    {
      id: "chat-2",
      name: "Техническая поддержка",
      lastMessage: "Проблема решена, проверьте пожалуйста",
      timestamp: "13:45",
      unreadCount: 0,
      online: true,
      type: "support"
    },
    {
      id: "chat-3",
      name: "АО СтройБаза",
      avatar: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      lastMessage: "Спасибо за заказ! Обработаем в течение дня",
      timestamp: "12:20",
      unreadCount: 1,
      online: false,
      type: "supplier"
    },
    {
      id: "chat-4",
      name: "Персональный менеджер",
      avatar: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      lastMessage: "Подготовил отчет по вашим закупкам",
      timestamp: "11:15",
      unreadCount: 0,
      online: true,
      type: "manager"
    }
  ];

  const messages: { [key: string]: Message[] } = {
    "chat-1": [
      {
        id: 1,
        senderId: "supplier-1",
        senderName: "Менеджер ООО Металл-Трейд",
        content: "Добрый день! Ваш заказ на трубы стальные готов к отгрузке.",
        timestamp: "14:25",
        type: "text"
      },
      {
        id: 2,
        senderId: "me",
        senderName: "Вы",
        content: "Отлично! Когда планируете отгрузку?",
        timestamp: "14:27",
        type: "text"
      },
      {
        id: 3,
        senderId: "supplier-1",
        senderName: "Менеджер ООО Металл-Трейд",
        content: "Готовы отгрузить заказ завтра утром",
        timestamp: "14:30",
        type: "text"
      }
    ],
    "chat-2": [
      {
        id: 1,
        senderId: "support",
        senderName: "Техническая поддержка",
        content: "Здравствуйте! Мы получили вашу заявку о проблеме с загрузкой документов.",
        timestamp: "13:30",
        type: "text"
      },
      {
        id: 2,
        senderId: "me",
        senderName: "Вы",
        content: "Да, не могу загрузить сертификаты качества",
        timestamp: "13:32",
        type: "text"
      },
      {
        id: 3,
        senderId: "support",
        senderName: "Техническая поддержка",
        content: "Проблема решена, проверьте пожалуйста",
        timestamp: "13:45",
        type: "text"
      }
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat, messages]);

  const sendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    // Здесь будет логика отправки сообщения
    console.log("Отправка сообщения:", message);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getChatTypeIcon = (type: string) => {
    switch (type) {
      case "supplier":
        return <Icon name="Store" size={14} className="text-blue-600" />;
      case "support":
        return <Icon name="Headphones" size={14} className="text-green-600" />;
      case "manager":
        return <Icon name="User" size={14} className="text-purple-600" />;
      default:
        return <Icon name="MessageCircle" size={14} className="text-gray-600" />;
    }
  };

  const selectedChatData = chats.find(chat => chat.id === selectedChat);
  const chatMessages = selectedChat ? messages[selectedChat] || [] : [];

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Список чатов */}
      <Card className="w-80 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Сообщения</span>
            <Button variant="ghost" size="sm">
              <Icon name="Plus" size={16} />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-full">
            <div className="space-y-1 p-4">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedChat === chat.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm truncate">{chat.name}</h4>
                        {getChatTypeIcon(chat.type)}
                      </div>
                      <span className="text-xs text-gray-500">{chat.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  </div>
                  
                  {chat.unreadCount > 0 && (
                    <Badge className="w-5 h-5 text-xs flex items-center justify-center p-0">
                      {chat.unreadCount}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Область чата */}
      <Card className="flex-1 flex flex-col">
        {selectedChatData ? (
          <>
            {/* Заголовок чата */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedChatData.avatar} />
                      <AvatarFallback>{selectedChatData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {selectedChatData.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedChatData.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      {getChatTypeIcon(selectedChatData.type)}
                      <span>{selectedChatData.online ? 'В сети' : 'Не в сети'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Icon name="Phone" size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="Video" size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="MoreVertical" size={16} />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Сообщения */}
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${msg.senderId === 'me' ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`p-3 rounded-lg ${
                            msg.senderId === 'me'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        <p className={`text-xs text-gray-500 mt-1 ${
                          msg.senderId === 'me' ? 'text-right' : 'text-left'
                        }`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>

            {/* Поле ввода */}
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Icon name="Paperclip" size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Image" size={16} />
                </Button>
                <div className="flex-1">
                  <Input
                    placeholder="Введите сообщение..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <Button onClick={sendMessage} disabled={!message.trim()}>
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <CardContent className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Icon name="MessageCircle" size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Выберите чат</h3>
              <p className="text-gray-600">Выберите чат из списка, чтобы начать общение</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default Chat;