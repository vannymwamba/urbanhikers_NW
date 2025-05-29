import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertBookingSchema, type Route, type InsertBooking } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const bookingFormSchema = insertBookingSchema.extend({
  bookingDate: z.string().min(1, "Date is required"),
  participants: z.number().min(1, "At least 1 participant required"),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  route: Route | null;
}

export default function BookingModal({ isOpen, onClose, route }: BookingModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      participants: 1,
    },
  });

  const createBookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      if (!route) throw new Error("No route selected");
      
      const bookingData: InsertBooking = {
        routeId: route.id,
        userId: "", // Will be set by the server
        bookingDate: new Date(data.bookingDate),
        participants: data.participants,
        totalPrice: (parseFloat(route.price) * data.participants).toString(),
        status: "confirmed",
      };

      const response = await apiRequest("POST", "/api/bookings", bookingData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Confirmed!",
        description: "Your booking has been successfully created.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      onClose();
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BookingFormData) => {
    createBookingMutation.mutate(data);
  };

  const participants = form.watch("participants");
  const totalPrice = route ? parseFloat(route.price) * participants : 0;

  if (!route) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">Book Your Adventure</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="text-gray-700 font-semibold">Selected Route</Label>
              <div className="bg-gray-50 p-4 rounded-xl border">
                <span className="font-bold text-gray-800">{route.title}</span>
                <div className="text-[#FFD700] font-bold text-lg">${route.price} per person</div>
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="bookingDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">Select Date</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      {...field}
                      min={new Date().toISOString().split('T')[0]}
                      className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="participants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">Number of Participants</FormLabel>
                  <Select 
                    value={field.value.toString()} 
                    onValueChange={(value) => field.onChange(parseInt(value))}
                  >
                    <FormControl>
                      <SelectTrigger className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFD700] focus:border-transparent">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1 Person</SelectItem>
                      <SelectItem value="2">2 People</SelectItem>
                      <SelectItem value="3">3 People</SelectItem>
                      <SelectItem value="4">4 People</SelectItem>
                      <SelectItem value="5">5 People</SelectItem>
                      <SelectItem value="6">6+ People</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total:</span>
                <span className="text-2xl font-bold text-[#FFD700]">${totalPrice.toFixed(2)}</span>
              </div>
              <Button 
                type="submit" 
                disabled={createBookingMutation.isPending}
                className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300"
              >
                {createBookingMutation.isPending ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
