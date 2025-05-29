
import React, { useState } from 'react';
import { useBlogStore, BlogPost, BlogTemplate, BlogStatus } from '@/stores/useBlogStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Eye, Calendar, User } from 'lucide-react';
import { toast } from 'sonner';

const BlogManagement: React.FC = () => {
  const { posts, actions } = useBlogStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    publishDate: new Date().toISOString().split('T')[0],
    template: 'standard' as BlogTemplate,
    status: 'draft' as BlogStatus,
    featuredImage: '',
    gallery: [] as string[],
    tags: [] as string[],
    seoTitle: '',
    seoDescription: '',
    readTime: 5,
  });

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: '',
      publishDate: new Date().toISOString().split('T')[0],
      template: 'standard',
      status: 'draft',
      featuredImage: '',
      gallery: [],
      tags: [],
      seoTitle: '',
      seoDescription: '',
      readTime: 5,
    });
  };

  const handleCreatePost = () => {
    if (!formData.title || !formData.slug || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    actions.addPost({
      ...formData,
      publishDate: new Date(formData.publishDate).toISOString(),
      tags: formData.tags.filter(tag => tag.trim() !== ''),
    });

    toast.success('Blog post created successfully');
    setIsCreateOpen(false);
    resetForm();
  };

  const handleUpdatePost = () => {
    if (!editingPost || !formData.title || !formData.slug || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    actions.updatePost(editingPost.id, {
      ...formData,
      publishDate: new Date(formData.publishDate).toISOString(),
      tags: formData.tags.filter(tag => tag.trim() !== ''),
    });

    toast.success('Blog post updated successfully');
    setEditingPost(null);
    resetForm();
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      publishDate: new Date(post.publishDate).toISOString().split('T')[0],
      template: post.template,
      status: post.status,
      featuredImage: post.featuredImage || '',
      gallery: post.gallery || [],
      tags: post.tags,
      seoTitle: post.seoTitle || '',
      seoDescription: post.seoDescription || '',
      readTime: post.readTime || 5,
    });
  };

  const handleDeletePost = (id: string) => {
    actions.deletePost(id);
    toast.success('Blog post deleted successfully');
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim());
    setFormData(prev => ({ ...prev, tags }));
  };

  const PostForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Enter blog post title"
        />
      </div>

      <div>
        <Label htmlFor="slug">Slug *</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
          placeholder="url-friendly-slug"
        />
      </div>

      <div>
        <Label htmlFor="excerpt">Excerpt *</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
          placeholder="Brief description of the post"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="content">Content *</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          placeholder="Blog post content (HTML supported)"
          rows={10}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
            placeholder="Author name"
          />
        </div>

        <div>
          <Label htmlFor="publishDate">Publish Date</Label>
          <Input
            id="publishDate"
            type="date"
            value={formData.publishDate}
            onChange={(e) => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="template">Template</Label>
          <Select value={formData.template} onValueChange={(value: BlogTemplate) => setFormData(prev => ({ ...prev, template: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="gallery">Gallery</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value: BlogStatus) => setFormData(prev => ({ ...prev, status: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="featuredImage">Featured Image URL</Label>
        <Input
          id="featuredImage"
          value={formData.featuredImage}
          onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={formData.tags.join(', ')}
          onChange={(e) => handleTagsChange(e.target.value)}
          placeholder="technology, education, tutorial"
        />
      </div>

      <div>
        <Label htmlFor="readTime">Read Time (minutes)</Label>
        <Input
          id="readTime"
          type="number"
          value={formData.readTime}
          onChange={(e) => setFormData(prev => ({ ...prev, readTime: parseInt(e.target.value) || 5 }))}
          min="1"
        />
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Blog Management</h1>
          <p className="text-slate-600">Create and manage blog posts</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Blog Post</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new blog post.
              </DialogDescription>
            </DialogHeader>
            <PostForm />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePost}>
                Create Post
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>
            {posts.length} total posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Publish Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{post.title}</div>
                      <div className="text-sm text-slate-500">/{post.slug}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      post.status === 'published' ? 'default' :
                      post.status === 'draft' ? 'secondary' : 'destructive'
                    }>
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="capitalize">{post.template}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.publishDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {post.status === 'published' && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                            <Eye className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={() => handleEditPost(post)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Post Dialog */}
      <Dialog open={!!editingPost} onOpenChange={(open) => !open && setEditingPost(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>
              Update the blog post details.
            </DialogDescription>
          </DialogHeader>
          <PostForm />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingPost(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdatePost}>
              Update Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogManagement;
