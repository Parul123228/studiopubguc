"use client";

import { useEffect, useState } from "react";
import { database } from "@/lib/firebase";
import { ref, onValue, off } from "firebase/database";
import type { Order } from "@/types";
import { updateOrderStatus } from "./actions";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const ordersRef = ref(database, "orders");
    const listener = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const ordersList: Order[] = Object.values(data);
        // Sort by most recent first
        ordersList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setOrders(ordersList);
      } else {
        setOrders([]);
      }
      setIsLoading(false);
    });

    return () => {
      off(ordersRef, "value", listener);
    };
  }, []);

  const handleStatusChange = async (orderId: string, status: "Pending" | "Delivered") => {
    try {
      await updateOrderStatus(orderId, status);
      toast({
        title: "Success",
        description: `Order ${orderId.slice(0,6)}... status updated to ${status}.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update order status.",
      });
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm card-glow-border">
      <CardContent className="p-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Player ID</TableHead>
                <TableHead>UC Pack</TableHead>
                <TableHead>Buyer Name</TableHead>
                <TableHead>UPI</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-28 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(order.createdAt), "dd MMM, hh:mm a")}
                    </TableCell>
                    <TableCell>{order.playerId}</TableCell>
                    <TableCell>{order.ucPack}</TableCell>
                    <TableCell>{order.buyerName}</TableCell>
                    <TableCell>{order.upiNumber}</TableCell>
                    <TableCell className="text-right">
                       <Select 
                          defaultValue={order.status}
                          onValueChange={(value: "Pending" | "Delivered") => handleStatusChange(order.id, value)}
                        >
                          <SelectTrigger className={`w-[120px] ${order.status === 'Delivered' ? 'border-green-500' : 'border-amber-500'}`}>
                              <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="Delivered">Delivered</SelectItem>
                          </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
