export interface Comment {
  id: string;
  author: string;
  authorImage: string;
  text: string;
  date: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorImage: string;
  date: string;
  categories: string[];
  imageUrl: string;
  dataAiHint: string;
  excerpt: string;
  content: string; // This will be HTML
  likes: number;
  comments: Comment[];
}

export interface Category {
  name: string;
  slug: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string; // Should be omitted in client-side data
    image?: string;
}
