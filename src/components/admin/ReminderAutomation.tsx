import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNotificationTemplates } from '@/hooks/useNotificationData';
import { useCreateTemplate } from '@/hooks/useNotificationData';
import { useNotificationStore } from '@/stores/useNotificationStore';
import { NotificationRule } from '@/stores/useNotificationStore';

const ruleFormSchema = z.object({
  name: z.string().min(3, {
    message: "Rule name must be at least 3 characters.",
  }),
  trigger: z.enum(['low-lessons', 'payment-due', 'class-upcoming', 'session-completed']),
  templateId: z.string().min(1, {
    message: "Please select a template.",
  }),
  conditions: z.object({
    lessonsRemaining: z.number().optional(),
    daysBefore: z.number().optional(),
    paymentOverdue: z.number().optional(),
  }).optional(),
});

const ReminderAutomation: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: templates, isLoading } = useNotificationTemplates();
  const { mutate: createTemplate } = useCreateTemplate();
  const { actions } = useNotificationStore();
  
  const form = useForm<z.infer<typeof ruleFormSchema>>({
    resolver: zodResolver(ruleFormSchema),
    defaultValues: {
      name: "",
      trigger: 'low-lessons',
      templateId: "",
      conditions: {
        lessonsRemaining: 5,
        daysBefore: 1,
        paymentOverdue: 7,
      },
    },
  });

  const handleCreateRule = (data: {
    name: string;
    trigger: NotificationRule['trigger'];
    templateId: string;
    conditions: Partial<NotificationRule['conditions']>;
  }) => {
    const fullConditions: NotificationRule['conditions'] = {
      lessonsRemaining: data.conditions.lessonsRemaining || 0,
      daysBefore: data.conditions.daysBefore || 0,
      paymentOverdue: data.conditions.paymentOverdue || 0,
    };
    
    actions.addRule({
      name: data.name,
      trigger: data.trigger,
      templateId: data.templateId,
      conditions: fullConditions,
      isActive: true,
    });
    
    setIsDialogOpen(false);
    form.reset();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reminder Automation</CardTitle>
        <CardDescription>
          Set up automated reminders for various events.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={() => setIsDialogOpen(true)}>Create New Rule</Button>

        {/* Dialog */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4">Create New Rule</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleCreateRule)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rule Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter rule name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="trigger"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trigger Event</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select trigger" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low-lessons">Low Lessons</SelectItem>
                              <SelectItem value="payment-due">Payment Due</SelectItem>
                              <SelectItem value="class-upcoming">Class Upcoming</SelectItem>
                              <SelectItem value="session-completed">Session Completed</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="templateId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notification Template</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a template" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {templates?.map((template) => (
                                <SelectItem key={template.id} value={template.id}>
                                  {template.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Conditional Fields based on Trigger */}
                    {form.getValues("trigger") === "low-lessons" && (
                      <FormField
                        control={form.control}
                        name="conditions.lessonsRemaining"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lessons Remaining Threshold</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter number of lessons"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {form.getValues("trigger") === "payment-due" && (
                      <FormField
                        control={form.control}
                        name="conditions.paymentOverdue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Days Overdue</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter number of days"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {form.getValues("trigger") === "class-upcoming" && (
                      <FormField
                        control={form.control}
                        name="conditions.daysBefore"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Days Before Class</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter number of days"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Create Rule</Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReminderAutomation;
