
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Mail, MessageSquare, Eye } from 'lucide-react';
import { NotificationTemplate } from '@/stores/useNotificationStore';
import { useToast } from '@/hooks/use-toast';

interface TemplateManagerProps {
  templates: NotificationTemplate[];
}

const TemplateManager: React.FC<TemplateManagerProps> = ({ templates }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'email' as 'email' | 'sms' | 'both',
    category: 'custom' as any,
    subject: '',
    content: '',
    isActive: true,
  });
  const { toast } = useToast();

  const handleCreate = () => {
    setSelectedTemplate(null);
    setFormData({
      name: '',
      type: 'email',
      category: 'custom',
      subject: '',
      content: '',
      isActive: true,
    });
    setIsEditing(true);
  };

  const handleEdit = (template: NotificationTemplate) => {
    setSelectedTemplate(template);
    setFormData({
      name: template.name,
      type: template.type,
      category: template.category,
      subject: template.subject || '',
      content: template.content,
      isActive: template.isActive,
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    // In real app, would call API
    toast({
      title: selectedTemplate ? 'Template Updated' : 'Template Created',
      description: `${formData.name} has been ${selectedTemplate ? 'updated' : 'created'} successfully.`,
    });
    setIsEditing(false);
  };

  const handleDelete = (template: NotificationTemplate) => {
    // In real app, would call API
    toast({
      title: 'Template Deleted',
      description: `${template.name} has been deleted successfully.`,
      variant: 'destructive',
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'sms': return <MessageSquare className="h-4 w-4" />;
      case 'both': return <><Mail className="h-3 w-3" /><MessageSquare className="h-3 w-3" /></>;
      default: return <Mail className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'payment-confirmation': return 'bg-green-100 text-green-800';
      case 'lesson-reminder': return 'bg-blue-100 text-blue-800';
      case 'renewal-reminder': return 'bg-orange-100 text-orange-800';
      case 'class-reminder': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Message Templates</h2>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedTemplate ? 'Edit Template' : 'Create New Template'}
              </DialogTitle>
              <DialogDescription>
                Create reusable message templates for different notification types.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Template Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Payment Confirmation"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Delivery Type</Label>
                  <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value: any) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="payment-confirmation">Payment Confirmation</SelectItem>
                      <SelectItem value="lesson-reminder">Lesson Reminder</SelectItem>
                      <SelectItem value="renewal-reminder">Renewal Reminder</SelectItem>
                      <SelectItem value="class-reminder">Class Reminder</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                  <Label htmlFor="active">Active Template</Label>
                </div>
              </div>

              {(formData.type === 'email' || formData.type === 'both') && (
                <div>
                  <Label htmlFor="subject">Email Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g., Payment Confirmation - ThinkBridge"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="content">Message Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter your message content here..."
                  rows={8}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Use variables like {'{clientName}'}, {'{amount}'}, {'{studentName}'} in your message.
                </p>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {selectedTemplate ? 'Update Template' : 'Create Template'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center text-lg">
                      {getTypeIcon(template.type)}
                      <span className="ml-2">{template.name}</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className={getCategoryColor(template.category)}>
                        {template.category.replace('-', ' ')}
                      </Badge>
                      <Badge variant={template.isActive ? 'default' : 'secondary'}>
                        {template.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {/* Preview logic */}}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(template)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(template)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {template.subject && (
                  <p className="font-medium text-sm mb-2">{template.subject}</p>
                )}
                <p className="text-sm text-gray-600 line-clamp-3">
                  {template.content}
                </p>
                <div className="mt-4 flex justify-between text-xs text-gray-500">
                  <span>Variables: {template.variables.length}</span>
                  <span>Updated: {new Date(template.updatedAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {templates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Templates Yet</h3>
            <p className="text-gray-600 mb-4">
              Create your first notification template to get started.
            </p>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TemplateManager;
