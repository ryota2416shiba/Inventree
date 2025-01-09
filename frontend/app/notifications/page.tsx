"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle2, MessageSquare, ShoppingCart } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import api from "@/lib/api/client";

interface Notification {
  id: string;
  title: string;
  content: string;
  type: "chat" | "order" | "system";
  read: boolean;
  created_at: string;
}

const NotificationIcon = ({ type }: { type: Notification["type"] }) => {
  switch (type) {
    case "chat":
      return <MessageSquare className="h-5 w-5" />;
    case "order":
      return <ShoppingCart className="h-5 w-5" />;
    case "system":
      return <Bell className="h-5 w-5" />;
  }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await api.notifications.list();
      setNotifications(response.data);
    };
    fetchNotifications();
  }, []);

  const markAsRead = async (id: string) => {
    await api.notifications.markAsRead(id);
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <FadeIn>
        <h1 className="text-3xl font-bold mb-2">通知</h1>
        <p className="text-muted-foreground mb-8">
          取引や問い合わせに関する通知をご確認いただけます
        </p>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-colors ${
                notification.read ? "bg-background" : "bg-primary/5"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full ${
                    notification.read ? "bg-muted" : "bg-primary/10"
                  }`}>
                    <NotificationIcon type={notification.type} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold">{notification.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(notification.created_at), {
                            addSuffix: true,
                            locale: ja
                          })}
                        </span>
                        {!notification.read && (
                          <Badge
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            既読にする
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      {notification.content}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}