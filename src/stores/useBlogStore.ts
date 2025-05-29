
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BlogTemplate = 'standard' | 'featured' | 'gallery' | 'minimal';
export type BlogStatus = 'draft' | 'published' | 'archived';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  updatedAt: string;
  template: BlogTemplate;
  status: BlogStatus;
  featuredImage?: string;
  gallery?: string[];
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  readTime?: number;
}

interface BlogState {
  posts: BlogPost[];
  
  actions: {
    addPost: (post: Omit<BlogPost, 'id' | 'updatedAt'>) => void;
    updatePost: (id: string, updates: Partial<BlogPost>) => void;
    deletePost: (id: string) => void;
    getPostBySlug: (slug: string) => BlogPost | undefined;
    getPublishedPosts: () => BlogPost[];
    clearAll: () => void;
  };
}

export const useBlogStore = create<BlogState>()(
  persist(
    (set, get) => ({
      posts: [],
      
      actions: {
        addPost: (post) =>
          set((state) => ({
            posts: [
              ...state.posts,
              {
                ...post,
                id: `blog_${Date.now()}`,
                updatedAt: new Date().toISOString(),
              },
            ],
          })),
        
        updatePost: (id, updates) =>
          set((state) => ({
            posts: state.posts.map((post) =>
              post.id === id
                ? { ...post, ...updates, updatedAt: new Date().toISOString() }
                : post
            ),
          })),
        
        deletePost: (id) =>
          set((state) => ({
            posts: state.posts.filter((post) => post.id !== id),
          })),
        
        getPostBySlug: (slug) => {
          const state = get();
          return state.posts.find(post => post.slug === slug && post.status === 'published');
        },
        
        getPublishedPosts: () => {
          const state = get();
          return state.posts
            .filter(post => post.status === 'published')
            .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
        },
        
        clearAll: () =>
          set({
            posts: [],
          }),
      },
    }),
    {
      name: 'blog-storage',
    }
  )
);
