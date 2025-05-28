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
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MoreVertical, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAdminStore, Tutor } from '@/stores/useAdminStore';

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  subjects: z.array(z.string()).min(1, {
    message: "Please select at least one subject.",
  }),
  role: z.enum(['admin', 'tutor', 'content-manager']),
  status: z.enum(['active', 'inactive']),
  hourlyRate: z.number().min(1, {
    message: "Hourly rate must be greater than 0.",
  }),
  bio: z.string().optional(),
  permissions: z.object({
    canManageClients: z.boolean().optional(),
    canManageStudents: z.boolean().optional(),
    canManagePayments: z.boolean().optional(),
    canManageContent: z.boolean().optional(),
    canManageTutors: z.boolean().optional(),
    canSendNotifications: z.boolean().optional(),
    canViewAnalytics: z.boolean().optional(),
  }).optional(),
});

const TutorManagement: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTutor, setEditingTutor] = useState<Tutor | null>(null);
  const { tutors, actions } = useAdminStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subjects: [],
      role: 'tutor',
      status: 'active',
      hourlyRate: 0,
      bio: "",
      permissions: {
        canManageClients: false,
        canManageStudents: false,
        canManagePayments: false,
        canManageContent: false,
        canManageTutors: false,
        canSendNotifications: false,
        canViewAnalytics: false,
      }
    },
  });

  const handleSubmit = (data: any) => {
    const tutorData = {
      ...data,
      permissions: {
        canManageClients: data.permissions?.canManageClients || false,
        canManageStudents: data.permissions?.canManageStudents || false,
        canManagePayments: data.permissions?.canManagePayments || false,
        canManageContent: data.permissions?.canManageContent || false,
        canManageTutors: data.permissions?.canManageTutors || false,
        canSendNotifications: data.permissions?.canSendNotifications || false,
        canViewAnalytics: data.permissions?.canViewAnalytics || false,
      }
    };

    if (editingTutor) {
      actions.updateTutor(editingTutor.id, tutorData);
    } else {
      actions.addTutor(tutorData);
    }
    
    setIsDialogOpen(false);
    setEditingTutor(null);
    form.reset();
  };

  const handleEdit = (tutor: Tutor) => {
    setEditingTutor(tutor);
    form.setValue("name", tutor.name);
    form.setValue("email", tutor.email);
    form.setValue("phone", tutor.phone);
    form.setValue("subjects", tutor.subjects);
    form.setValue("role", tutor.role);
    form.setValue("status", tutor.status);
    form.setValue("hourlyRate", tutor.hourlyRate);
    form.setValue("bio", tutor.bio || "");
    form.setValue("permissions", tutor.permissions || {
      canManageClients: false,
      canManageStudents: false,
      canManagePayments: false,
      canManageContent: false,
      canManageTutors: false,
      canSendNotifications: false,
      canViewAnalytics: false,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    actions.deleteTutor(id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tutor Management</CardTitle>
        <CardDescription>
          Manage tutors, roles, and permissions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={() => {
          setIsDialogOpen(true);
          setEditingTutor(null);
          form.reset();
        }}>Add New Tutor</Button>

        {/* Tutor Table */}
        <ScrollArea>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tutors.map((tutor) => (
                <TableRow key={tutor.id}>
                  <TableCell>{tutor.name}</TableCell>
                  <TableCell>{tutor.email}</TableCell>
                  <TableCell>{tutor.phone}</TableCell>
                  <TableCell>{tutor.role}</TableCell>
                  <TableCell>{tutor.status}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEdit(tutor)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(tutor.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>

        {/* Dialog */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4">{editingTutor ? 'Edit Tutor' : 'Add New Tutor'}</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter tutor name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subjects"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subjects</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange([value])}
                            defaultValue={field.value[0]}
                            multiple
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select subjects" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="math">Math</SelectItem>
                              <SelectItem value="science">Science</SelectItem>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="history">History</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="tutor">Tutor</SelectItem>
                              <SelectItem value="content-manager">Content Manager</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="hourlyRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hourly Rate</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter hourly rate"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter bio"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Permissions */}
                    <div className="space-y-2">
                      <FormLabel>Permissions</FormLabel>
                      <div className="rounded-md border p-4">
                        <FormField
                          control={form.control}
                          name="permissions.canManageClients"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel className="text-sm">
                                  Manage Clients
                                </FormLabel>
                                <FormDescription>
                                  Allow tutor to manage client accounts.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="permissions.canManageStudents"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel className="text-sm">
                                  Manage Students
                                </FormLabel>
                                <FormDescription>
                                  Allow tutor to manage student accounts.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="permissions.canManagePayments"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel className="text-sm">
                                  Manage Payments
                                </FormLabel>
                                <FormDescription>
                                  Allow tutor to manage payments.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="permissions.canManageContent"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel className="text-sm">
                                  Manage Content
                                </FormLabel>
                                <FormDescription>
                                  Allow tutor to manage content.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name="permissions.canManageTutors"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel className="text-sm">
                                  Manage Tutors
                                </FormLabel>
                                <FormDescription>
                                  Allow tutor to manage other tutor accounts.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="permissions.canSendNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel className="text-sm">
                                  Send Notifications
                                </FormLabel>
                                <FormDescription>
                                  Allow tutor to send notifications.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="permissions.canViewAnalytics"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel className="text-sm">
                                  View Analytics
                                </FormLabel>
                                <FormDescription>
                                  Allow tutor to view analytics.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsDialogOpen(false);
                          setEditingTutor(null);
                          form.reset();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">{editingTutor ? 'Update Tutor' : 'Add Tutor'}</Button>
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

export default TutorManagement;
