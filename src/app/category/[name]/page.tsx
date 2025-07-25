import { getPostsByCategory, getCategoryBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import PostCard from '@/components/post-card';

type CategoryPageProps = {
  params: {
    name: string;
  };
};

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.name);
  if (!category) {
    return {
      title: 'Category not found',
    };
  }
  return {
    title: `${category.name} | Inkwell`,
    description: `Posts in the ${category.name} category.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const posts = await getPostsByCategory(params.name);
  const category = await getCategoryBySlug(params.name);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-12 text-center">
        <p className="text-primary font-semibold mb-2">Category</p>
        <h1 className="font-headline text-5xl font-bold text-foreground">{category.name}</h1>
      </header>
      
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">There are no posts in this category yet.</p>
      )}
    </div>
  );
}
