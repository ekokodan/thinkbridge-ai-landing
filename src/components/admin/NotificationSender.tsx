
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Send, Users, User, Eye } from 'lucide-react';
import { NotificationTemplate } from '@/stores/useNotificationStore';
import { Client } from '@/stores/useAdminStore';
import { useToast } from '@/hooks/use-toast';

interface NotificationSenderProps {
  templates: NotificationTemplate[];
  clients: Client[];
}

const NotificationSender: React.FC<NotificationSenderProps> = ({ templates, clients }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [previewContent, setPreviewContent] = useState<string>('');
  const { toast } = useToast();

  const template = templates.find(t => t.id === selectedTemplate);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const newTemplate = templates.find(t => t.id === templateId);
    if (newTemplate) {
      // Initialize variables with empty values
      const initialVariables: Record<string, string> = {};
      newTemplate.variables.forEach(variable => {
        initialVariables[variable] = '';
      });
      setVariables(initialVariables);
      updatePreview(newTemplate.content, initialVariables);
    }
  };

  const handleVariableChange = (variable: string, value: string) => {
    const newVariables = { ...variables, [variable]: value };
    setVariables(newVariables);
    if (template) {
      updatePreview(template.content, newVariables);
    }
  };

  const updatePreview = (content: string, vars: Record<string, string>) => {
    let preview = content;
    Object.entries(vars).forEach(([key, value]) => {
      const regex = new RegExp(`\\{${key}\\}`, 'g');
      preview = preview.replace(regex, value || `{${key}}`);
    });
    setPreviewContent(preview);
  };

  const handleClientToggle = (clientId: string) => {
    setSelectedClients(prev => 
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const selectAllClients = () => {
    setSelectedClients(clients.map(c => c.id));
  };

  const clearAllClients = () => {
    setSelectedClients([]);
  };

  const handleSend = () => {
    if (!template || selectedClients.length === 0) {
      toast({
        title: 'Missing Information',
        description: 'Please select a template and at least one recipient.',
        variant: 'destructive',
      });
      return;
    }

    // In real app, would call API
    toast({
      title: 'Notifications Sent',
      description: `${selectedClients.length} notifications have been queued for delivery.`,
    });

    // Reset form
    setSelectedTemplate('');
    setSelectedClients([]);
    setVariables({});
    setPreviewContent('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Send Notifications</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Template Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Template</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a notification template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.filter(t => t.isActive).map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      <div className="flex items-center space-x-2">
                        <span>{template.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {template.type}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {template && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium">{template.name}</p>
                  <p className="text-xs text-gray-600">{template.category.replace('-', ' ')}</p>
                  {template.subject && (
                    <p className="text-xs text-gray-600 mt-1">Subject: {template.subject}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Variable Configuration */}
          {template && template.variables.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Message Variables</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {template.variables.map((variable) => (
                  <div key={variable}>
                    <Label htmlFor={variable}>{variable}</Label>
                    <Input
                      id={variable}
                      value={variables[variable] || ''}
                      onChange={(e) => handleVariableChange(variable, e.target.value)}
                      placeholder={`Enter ${variable}`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Recipient Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Select Recipients</span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={selectAllClients}>
                    <Users className="h-4 w-4 mr-1" />
                    All
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearAllClients}>
                    Clear
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {clients.map((client) => (
                  <div key={client.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={client.id}
                      checked={selectedClients.includes(client.id)}
                      onCheckedChange={() => handleClientToggle(client.id)}
                    />
                    <Label htmlFor={client.id} className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-gray-600">{client.email}</p>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
              {selectedClients.length > 0 && (
                <div className="mt-4 p-2 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    {selectedClients.length} recipient{selectedClients.length > 1 ? 's' : ''} selected
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Message Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {template ? (
                <div className="space-y-4">
                  {template.subject && (
                    <div>
                      <Label className="text-xs text-gray-500">EMAIL SUBJECT</Label>
                      <div className="p-3 bg-gray-50 rounded border">
                        {template.subject}
                      </div>
                    </div>
                  )}
                  <div>
                    <Label className="text-xs text-gray-500">MESSAGE CONTENT</Label>
                    <div className="p-4 bg-gray-50 rounded border min-h-[200px]">
                      <pre className="whitespace-pre-wrap text-sm font-sans">
                        {previewContent || template.content}
                      </pre>
                    </div>
                  </div>
                  {template.variables.length > 0 && (
                    <div>
                      <Label className="text-xs text-gray-500">AVAILABLE VARIABLES</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.variables.map((variable) => (
                          <Badge key={variable} variant="outline" className="text-xs">
                            {'{' + variable + '}'}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a template to see preview</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Send Button */}
          <Card>
            <CardContent className="pt-6">
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleSend}
                disabled={!template || selectedClients.length === 0}
              >
                <Send className="mr-2 h-4 w-4" />
                Send to {selectedClients.length} Recipient{selectedClients.length !== 1 ? 's' : ''}
              </Button>
              {(!template || selectedClients.length === 0) && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  Select a template and recipients to send
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationSender;
