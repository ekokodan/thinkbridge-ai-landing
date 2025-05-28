
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Play, Pause, Edit, Trash2, Clock, Users, DollarSign, Calendar } from 'lucide-react';
import { NotificationTemplate, NotificationRule } from '@/stores/useNotificationStore';
import { Client } from '@/stores/useAdminStore';
import { useToast } from '@/hooks/use-toast';

interface ReminderAutomationProps {
  templates: NotificationTemplate[];
  clients: Client[];
}

const ReminderAutomation: React.FC<ReminderAutomationProps> = ({ templates, clients }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedRule, setSelectedRule] = useState<NotificationRule | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    trigger: 'low-lessons' as any,
    templateId: '',
    conditions: {
      lessonsRemaining: 2,
      daysBefore: 1,
      paymentOverdue: 7,
    },
    isActive: true,
  });
  const { toast } = useToast();

  // Mock rules data
  const mockRules: NotificationRule[] = [
    {
      id: '1',
      name: 'Low Lessons Warning',
      trigger: 'low-lessons',
      templateId: '3',
      conditions: { lessonsRemaining: 2 },
      isActive: true,
      lastTriggered: '2024-05-27T10:00:00Z',
      createdAt: '2024-05-01T00:00:00Z',
    },
    {
      id: '2',
      name: 'Class Reminder 24h',
      trigger: 'class-upcoming',
      templateId: '2',
      conditions: { daysBefore: 1 },
      isActive: true,
      lastTriggered: '2024-05-26T15:00:00Z',
      createdAt: '2024-05-01T00:00:00Z',
    }
  ];

  const getTriggerIcon = (trigger: string) => {
    switch (trigger) {
      case 'low-lessons': return <Users className="h-4 w-4" />;
      case 'payment-due': return <DollarSign className="h-4 w-4" />;
      case 'class-upcoming': return <Calendar className="h-4 w-4" />;
      case 'session-completed': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTriggerLabel = (trigger: string) => {
    switch (trigger) {
      case 'low-lessons': return 'Low Lessons';
      case 'payment-due': return 'Payment Due';
      case 'class-upcoming': return 'Class Upcoming';
      case 'session-completed': return 'Session Completed';
      default: return trigger;
    }
  };

  const handleCreate = () => {
    setSelectedRule(null);
    setFormData({
      name: '',
      trigger: 'low-lessons',
      templateId: '',
      conditions: {
        lessonsRemaining: 2,
        daysBefore: 1,
        paymentOverdue: 7,
      },
      isActive: true,
    });
    setIsCreating(true);
  };

  const handleEdit = (rule: NotificationRule) => {
    setSelectedRule(rule);
    setFormData({
      name: rule.name,
      trigger: rule.trigger,
      templateId: rule.templateId,
      conditions: rule.conditions,
      isActive: rule.isActive,
    });
    setIsCreating(true);
  };

  const handleSave = () => {
    toast({
      title: selectedRule ? 'Rule Updated' : 'Rule Created',
      description: `${formData.name} has been ${selectedRule ? 'updated' : 'created'} successfully.`,
    });
    setIsCreating(false);
  };

  const handleToggleRule = (ruleId: string, isActive: boolean) => {
    toast({
      title: isActive ? 'Rule Activated' : 'Rule Deactivated',
      description: `The automation rule has been ${isActive ? 'activated' : 'deactivated'}.`,
    });
  };

  const handleTriggerRule = (rule: NotificationRule) => {
    // Find eligible clients for this rule
    let eligibleCount = 0;
    
    switch (rule.trigger) {
      case 'low-lessons':
        eligibleCount = Math.floor(Math.random() * 5) + 1; // Mock calculation
        break;
      case 'class-upcoming':
        eligibleCount = Math.floor(Math.random() * 10) + 1; // Mock calculation
        break;
      default:
        eligibleCount = Math.floor(Math.random() * 3) + 1;
    }

    toast({
      title: 'Rule Triggered',
      description: `${eligibleCount} notifications have been queued for delivery.`,
    });
  };

  const getEligibleClients = (rule: NotificationRule) => {
    // Mock eligible clients calculation
    switch (rule.trigger) {
      case 'low-lessons':
        return Math.floor(Math.random() * 5) + 1;
      case 'class-upcoming':
        return Math.floor(Math.random() * 10) + 1;
      case 'payment-due':
        return Math.floor(Math.random() * 3) + 1;
      default:
        return Math.floor(Math.random() * 2) + 1;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reminder Automation</h2>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              New Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>
                {selectedRule ? 'Edit Automation Rule' : 'Create Automation Rule'}
              </DialogTitle>
              <DialogDescription>
                Set up automatic notification triggers based on specific conditions.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Rule Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Low Lessons Warning"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="trigger">Trigger Event</Label>
                  <Select value={formData.trigger} onValueChange={(value: any) => setFormData({ ...formData, trigger: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low-lessons">Low Lessons Remaining</SelectItem>
                      <SelectItem value="payment-due">Payment Due</SelectItem>
                      <SelectItem value="class-upcoming">Class Upcoming</SelectItem>
                      <SelectItem value="session-completed">Session Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="template">Notification Template</Label>
                  <Select value={formData.templateId} onValueChange={(value) => setFormData({ ...formData, templateId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.filter(t => t.isActive).map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Condition Configuration */}
              <div>
                <Label>Conditions</Label>
                <div className="mt-2 space-y-3">
                  {formData.trigger === 'low-lessons' && (
                    <div>
                      <Label htmlFor="lessonsRemaining" className="text-sm">
                        Trigger when lessons remaining ≤
                      </Label>
                      <Input
                        id="lessonsRemaining"
                        type="number"
                        value={formData.conditions.lessonsRemaining}
                        onChange={(e) => setFormData({
                          ...formData,
                          conditions: { ...formData.conditions, lessonsRemaining: parseInt(e.target.value) }
                        })}
                        min="0"
                        max="10"
                      />
                    </div>
                  )}

                  {formData.trigger === 'class-upcoming' && (
                    <div>
                      <Label htmlFor="daysBefore" className="text-sm">
                        Send reminder (days before class)
                      </Label>
                      <Input
                        id="daysBefore"
                        type="number"
                        value={formData.conditions.daysBefore}
                        onChange={(e) => setFormData({
                          ...formData,
                          conditions: { ...formData.conditions, daysBefore: parseInt(e.target.value) }
                        })}
                        min="0"
                        max="7"
                      />
                    </div>
                  )}

                  {formData.trigger === 'payment-due' && (
                    <div>
                      <Label htmlFor="paymentOverdue" className="text-sm">
                        Trigger when payment overdue by (days)
                      </Label>
                      <Input
                        id="paymentOverdue"
                        type="number"
                        value={formData.conditions.paymentOverdue}
                        onChange={(e) => setFormData({
                          ...formData,
                          conditions: { ...formData.conditions, paymentOverdue: parseInt(e.target.value) }
                        })}
                        min="1"
                        max="30"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="active">Active Rule</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {selectedRule ? 'Update Rule' : 'Create Rule'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Rules Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockRules.map((rule) => {
          const template = templates.find(t => t.id === rule.templateId);
          const eligibleCount = getEligibleClients(rule);
          
          return (
            <Card key={rule.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center text-lg">
                      {getTriggerIcon(rule.trigger)}
                      <span className="ml-2">{rule.name}</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant={rule.isActive ? 'default' : 'secondary'}>
                        {rule.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <Badge variant="outline">
                        {getTriggerLabel(rule.trigger)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleRule(rule.id, !rule.isActive)}
                    >
                      {rule.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(rule)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Template:</p>
                    <p className="text-sm text-gray-600">{template?.name || 'Unknown'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Eligible Recipients:</p>
                    <p className="text-sm text-gray-600">{eligibleCount} clients</p>
                  </div>

                  {rule.lastTriggered && (
                    <div>
                      <p className="text-sm font-medium">Last Triggered:</p>
                      <p className="text-sm text-gray-600">
                        {new Date(rule.lastTriggered).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleTriggerRule(rule)}
                      disabled={!rule.isActive}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Trigger Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Manual Triggers */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Triggers</CardTitle>
          <p className="text-sm text-gray-600">
            Manually trigger notifications for specific scenarios
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col">
              <Users className="mb-2" />
              Low Lessons Alert
              <span className="text-xs text-gray-500">3 clients eligible</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <Calendar className="mb-2" />
              Tomorrow's Classes
              <span className="text-xs text-gray-500">8 reminders</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <DollarSign className="mb-2" />
              Payment Reminders
              <span className="text-xs text-gray-500">2 overdue</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <Clock className="mb-2" />
              Session Follow-ups
              <span className="text-xs text-gray-500">5 completed</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {mockRules.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Automation Rules</h3>
            <p className="text-gray-600 mb-4">
              Set up your first automation rule to streamline your notifications.
            </p>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Create Rule
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReminderAutomation;
