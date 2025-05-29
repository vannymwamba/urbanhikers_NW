import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { insertRouteSchema, type InsertRoute } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";

type RouteFormData = Omit<InsertRoute, 'createdBy'>;

export default function CreateRoute() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();

  const form = useForm<RouteFormData>({
    resolver: zodResolver(insertRouteSchema.omit({ createdBy: true })),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      duration: "",
      distance: "",
      difficulty: "Easy",
      price: "0",
      imageUrl: "",
      isPublic: true,
    },
  });

  const createRouteMutation = useMutation({
    mutationFn: async (data: RouteFormData) => {
      const response = await apiRequest("POST", "/api/routes", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Route Created!",
        description: "Your route has been successfully created.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/routes"] });
      setLocation("/");
    },
    onError: (error) => {
      toast({
        title: "Failed to Create Route",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RouteFormData) => {
    createRouteMutation.mutate(data);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-24 flex items-center justify-center">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="pt-6 text-center">
              <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
              <p className="text-gray-600 mb-6">
                You need to sign in to create a route.
              </p>
              <Button 
                onClick={() => window.location.href = "/api/login"}
                className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black px-6 py-3 rounded-full font-bold"
              >
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto max-w-4xl px-6">
          <section className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Create Your Route</h1>
            <p className="text-xl text-gray-600">
              Share your favorite walking path with the urban explorer community
            </p>
          </section>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Route Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Route Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Historic Downtown Walking Tour"
                            {...field}
                            className="py-3 border-gray-300 focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your route, what makes it special, and what explorers can expect to see..."
                            rows={4}
                            {...field}
                            className="border-gray-300 focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold">Category</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger className="py-3 border-gray-300 focus:ring-2 focus:ring-[#FFD700] focus:border-transparent">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Historic">Historic</SelectItem>
                              <SelectItem value="Art & Culture">Art & Culture</SelectItem>
                              <SelectItem value="Food & Drink">Food & Drink</SelectItem>
                              <SelectItem value="Nature">Nature</SelectItem>
                              <SelectItem value="Architecture">Architecture</SelectItem>
                              <SelectItem value="Shopping">Shopping</SelectItem>
                              <SelectItem value="Nightlife">Nightlife</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold">Difficulty</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger className="py-3 border-gray-300 focus:ring-2 focus:ring-[#FFD700] focus:border-transparent">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Easy">Easy</SelectItem>
                              <SelectItem value="Moderate">Moderate</SelectItem>
                              <SelectItem value="Hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold">Duration</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., 2.5 hrs"
                              {...field}
                              className="py-3 border-gray-300 focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="distance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold">Distance</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., 3.2 km"
                              {...field}
                              className="py-3 border-gray-300 focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold">Price ($)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="0.00"
                              {...field}
                              className="py-3 border-gray-300 focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Image URL (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://example.com/image.jpg"
                            {...field}
                            className="py-3 border-gray-300 focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-4 pt-6">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setLocation("/")}
                      className="px-8 py-3 rounded-full"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      disabled={createRouteMutation.isPending}
                      className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black px-8 py-3 rounded-full font-bold transition-all duration-300 hover:shadow-lg"
                    >
                      {createRouteMutation.isPending ? "Creating..." : "Create Route"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
