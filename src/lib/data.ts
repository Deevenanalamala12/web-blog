
import type { Post, Category, Comment } from './types';

// Helper function to create a URL-friendly slug
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes
};


const categories: Category[] = [
  { name: 'Web Design', slug: 'web-design' },
  { name: 'Technology', slug: 'technology' },
  { name: 'Personal Growth', slug: 'personal-growth' },
  { name: 'Creative Writing', slug: 'creative-writing' },
  { name: 'UI/UX', slug: 'ui-ux' },
];

let posts: Post[] = [
  {
    id: '1',
    slug: 'the-art-of-minimalism-in-modern-web-design',
    title: 'The Art of Minimalism in Modern Web Design',
    author: 'Eleanor Vance',
    authorImage: 'https://placehold.co/100x100.png',
    date: '2024-07-21',
    categories: ['Web Design', 'UI/UX'],
    imageUrl: 'https://placehold.co/800x400.png',
    dataAiHint: 'minimalist web',
    excerpt: 'Discover how stripping back to the essentials can create a more powerful and engaging user experience in the digital age.',
    content: `
      <p>In a world saturated with information, minimalism in web design isn't just a stylistic choice; it's a strategic one. By embracing negative space, clean typography, and a limited color palette, designers can guide users more effectively and create a sense of calm and clarity.</p>
      <h2>The Philosophy of "Less is More"</h2>
      <p>The core principle of minimalism is to remove all that is unnecessary to let the content shine. This means every element on the page must have a purpose. If it doesn't contribute to the user's understanding or journey, it's noise. This approach forces designers to prioritize what's truly important.</p>
      <img src="https://placehold.co/700x350.png" alt="A clean workspace" data-ai-hint="clean workspace">
      <h3>Key Elements of Minimalist Design:</h3>
      <ul>
        <li><strong>Generous Whitespace:</strong> Also known as negative space, it gives content room to breathe and reduces cognitive load.</li>
        <li><strong>Flat Textures:</strong> Removing gradients, shadows, and textures for a clean, two-dimensional look.</li>
        <li><strong>Bold Typography:</strong> With fewer elements competing for attention, type becomes a primary design element.</li>
      </ul>
      <blockquote>"Simplicity is the ultimate sophistication." - Leonardo da Vinci</blockquote>
      <p>Ultimately, a minimalist design respects the user's time and attention. It's a declaration that you value their focus and are committed to delivering a straightforward, high-impact experience.</p>
    `,
    likes: 128,
    comments: [
      { id: 'c1-1', author: 'Liam Gallagher', authorImage: 'https://placehold.co/40x40.png', text: 'Great read! This really clarifies the purpose behind minimalism.', date: '2024-07-22' },
      { id: 'c1-2', author: 'Sophia Chen', authorImage: 'https://placehold.co/40x40.png', text: 'I\'ve been trying to implement this in my projects. The point about whitespace is key.', date: '2024-07-22' },
    ],
  },
  {
    id: '2',
    slug: 'navigating-the-future-of-ai',
    title: 'Navigating the Future of Artificial Intelligence',
    author: 'Marcus Holloway',
    authorImage: 'https://placehold.co/100x100.png',
    date: '2024-07-20',
    categories: ['Technology'],
    imageUrl: 'https://placehold.co/800x450.png',
    dataAiHint: 'artificial intelligence',
    excerpt: 'AI is evolving at an unprecedented rate. What does this mean for our future, and how can we prepare for the changes to come?',
    content: `
      <h2>The AI Revolution is Here</h2>
      <p>Artificial Intelligence is no longer a concept from science fiction; it's a driving force in our daily lives. From recommendation algorithms to autonomous vehicles, AI's integration into society is reshaping industries and creating new possibilities.</p>
      <p>The potential for AI to solve some of the world's most pressing problems—like climate change and disease—is immense. However, it also brings complex ethical questions about privacy, bias, and the future of work.</p>
      <h3>Preparing for an AI-Driven World</h3>
      <ol>
        <li><strong>Continuous Learning:</strong> Skills will need to adapt. Emphasize creativity, critical thinking, and emotional intelligence.</li>
        <li><strong>Ethical Frameworks:</strong> We must develop robust guidelines for AI development to ensure it benefits all of humanity.</li>
        <li><strong>Public Discourse:</strong> Open conversations about AI's role in society are crucial to navigate its development responsibly.</li>
      </ol>
      <p>The future of AI is not predetermined. It is a future we will all build together through our choices, policies, and innovations.</p>
    `,
    likes: 256,
    comments: [
       { id: 'c2-1', author: 'David Lee', authorImage: 'https://placehold.co/40x40.png', text: 'A very balanced perspective on a complex topic.', date: '2024-07-21' },
    ],
  },
  {
    id: '3',
    slug: 'the-power-of-habit',
    title: 'The Power of Habit: Small Changes, Remarkable Results',
    author: 'Aria Montgomery',
    authorImage: 'https://placehold.co/100x100.png',
    date: '2024-07-18',
    categories: ['Personal Growth'],
    imageUrl: 'https://placehold.co/800x500.png',
    dataAiHint: 'building habits',
    excerpt: 'Your life today is essentially the sum of your habits. How can you build good ones and break bad ones to achieve your goals?',
    content: `
      <h2>Understanding the Habit Loop</h2>
      <p>At its core, every habit follows a simple neurological loop: cue, routine, and reward. Understanding this structure is the first step to taking control of your habits.</p>
      <ul>
          <li><strong>Cue:</strong> The trigger that tells your brain to go into automatic mode and which habit to use.</li>
          <li><strong>Routine:</strong> The physical, mental, or emotional action you take.</li>
          <li><strong>Reward:</strong> The positive reinforcement that helps your brain remember the loop for the future.</li>
      </ul>
      <p>To change a habit, you must keep the old cue and reward but insert a new routine. For example, if your cue is feeling tired (cue) and you usually grab a sugary snack (routine) for a quick energy boost (reward), you could try substituting the routine with a 5-minute walk.</p>
      <blockquote>"We are what we repeatedly do. Excellence, then, is not an act, but a habit." - Will Durant</blockquote>
      <p>Start small. The goal is to make the new routine as easy as possible to build momentum. Over time, these small, consistent actions compound into significant personal transformation.</p>
    `,
    likes: 312,
    comments: [],
  },
  {
    id: '4',
    slug: 'a-journey-through-the-stars',
    title: 'A Journey Through the Stars: A Short Story',
    author: 'Kaelen',
    authorImage: 'https://placehold.co/100x100.png',
    date: '2024-07-15',
    categories: ['Creative Writing', 'Technology'],
    imageUrl: 'https://placehold.co/800x550.png',
    dataAiHint: 'starry galaxy',
    excerpt: 'The freighter hummed, a lonely sound in the vast emptiness. Elara watched the nebulae swirl outside the viewport, a cosmic ballet of dust and gas.',
    content: `
      <p>The freighter hummed, a lonely sound in the vast emptiness. Elara watched the nebulae swirl outside the viewport, a cosmic ballet of dust and gas. Her destination: Xylos, a planet said to be made of crystal, orbiting a dying star.</p>
      <p>She was a cartographer of forgotten worlds, a seeker of beauty in the universe's quiet corners. The data chips in her pocket held maps of star systems no one had seen in centuries. But Xylos was different. It wasn't on any known chart.</p>
      <h2>The Whisper of a Legend</h2>
      <p>The legend spoke of a place where light itself was trapped, refracting through the planet's core to create a perpetual dawn. It was a poet's dream, an artist's muse. For Elara, it was the ultimate map to draw.</p>
      <blockquote>The ship's AI, Kai, broke the silence. "Approaching the coordinates. Gravitational anomalies detected."</blockquote>
      <p>Elara smiled. Anomalies were where the interesting things happened. As the ship broke through the stellar dust, Xylos came into view. It wasn't just crystal. It was alive, a symphony of light and color that defied every law of physics she knew. She had found it. And now, she had a new map to create.</p>
    `,
    likes: 450,
    comments: [
        { id: 'c4-1', author: 'Jenna', authorImage: 'https://placehold.co/40x40.png', text: 'Beautifully written!', date: '2024-07-16' },
        { id: 'c4-2', author: 'Markus', authorImage: 'https://placehold.co/40x40.png', text: 'I could picture everything perfectly. More stories please!', date: '2024-07-17' },
    ],
  },
];

// Simulate API calls
export const getPosts = async (): Promise<Post[]> => {
  return new Promise(resolve => setTimeout(() => resolve([...posts].reverse()), 50));
};

export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
  return new Promise(resolve => setTimeout(() => resolve(posts.find(p => p.slug === slug)), 50));
};

export const getCategories = async (): Promise<Category[]> => {
  return new Promise(resolve => setTimeout(() => resolve(categories), 50));
};

export const getCategoryBySlug = async (slug: string): Promise<Category | undefined> => {
  return new Promise(resolve => setTimeout(() => resolve(categories.find(c => c.slug === slug)), 50));
};

export const getPostsByCategory = async (categorySlug: string): Promise<Post[]> => {
    const category = await getCategoryBySlug(categorySlug);
    if (!category) return [];
    return new Promise(resolve => setTimeout(() => resolve(posts.filter(p => p.categories.includes(category.name)).reverse()), 50));
};

// CUD operations
type CreatePostData = {
    title: string;
    content: string;
    imageUrl: string;
    author: string;
    authorImage: string;
};

export const createPost = async (postData: CreatePostData): Promise<Post> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const newPost: Post = {
                id: String(posts.length + 1),
                slug: createSlug(postData.title),
                title: postData.title,
                content: postData.content,
                imageUrl: postData.imageUrl,
                author: postData.author,
                authorImage: postData.authorImage,
                date: new Date().toISOString(),
                categories: ['Technology'], // Default category for now
                excerpt: postData.content.substring(0, 150).replace(/<[^>]+>/g, '') + '...',
                likes: 0,
                comments: [],
                dataAiHint: 'user generated content',
            };
            posts.push(newPost);
            resolve(newPost);
        }, 500);
    });
};

type UpdatePostData = {
    title: string;
    content: string;
    imageUrl: string;
};

export const updatePost = async (slug: string, postData: UpdatePostData): Promise<Post> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const postIndex = posts.findIndex(p => p.slug === slug);
            if (postIndex === -1) {
                return reject(new Error('Post not found'));
            }
            const originalPost = posts[postIndex];
            const updatedPost = {
                ...originalPost,
                ...postData,
                title: postData.title,
                slug: originalPost.title === postData.title ? originalPost.slug : createSlug(postData.title),
                excerpt: postData.content.substring(0, 150).replace(/<[^>]+>/g, '') + '...',
            };
            posts[postIndex] = updatedPost;
            resolve(updatedPost);
        }, 500);
    });
};

export const deletePost = async (slug: string): Promise<{ success: boolean }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const postIndex = posts.findIndex(p => p.slug === slug);
             if (postIndex === -1) {
                return reject(new Error('Post not found'));
            }
            posts = posts.filter(p => p.slug !== slug);
            resolve({ success: true });
        }, 500);
    });
};

export const likePost = async (slug: string): Promise<Post> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const postIndex = posts.findIndex(p => p.slug === slug);
            if (postIndex === -1) {
                return reject(new Error('Post not found'));
            }
            posts[postIndex].likes++;
            resolve(posts[postIndex]);
        }, 200);
    });
};

export const addComment = async (slug: string, commentData: { text: string; author: string; authorImage: string; }): Promise<Post> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const postIndex = posts.findIndex(p => p.slug === slug);
            if (postIndex === -1) {
                return reject(new Error('Post not found'));
            }
            const newComment: Comment = {
                id: `c${posts[postIndex].id}-${posts[postIndex].comments.length + 1}`,
                text: commentData.text,
                author: commentData.author,
                authorImage: commentData.authorImage,
                date: new Date().toISOString(),
            };
            posts[postIndex].comments.push(newComment);
            resolve(posts[postIndex]);
        }, 300);
    });
};
