import Link from 'next/link';
import PostCard from '@/components/post-card';
import { getPosts, getCategories } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Home() {
  const posts = await getPosts();
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary">Welcome to Inkwell</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Your new space to read, write, and connect. Explore stories and ideas from writers on any topic.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <main className="lg:col-span-8">
          <h2 className="font-headline text-3xl mb-6 pb-2 border-b-2 border-primary/20">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </main>
        <aside className="lg:col-span-4">
          <div className="sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-xl text-primary">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-3">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      className="text-foreground hover:text-primary transition-colors duration-200 ease-in-out font-medium"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
