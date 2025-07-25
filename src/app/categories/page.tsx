import { getCategories } from '@/lib/data';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Hash } from 'lucide-react';

export const metadata = {
  title: 'Categories | Inkwell',
  description: 'Browse all categories on the Inkwell blog.',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="font-headline text-5xl font-bold text-primary">Categories</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore topics and find content that interests you.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link href={`/category/${category.slug}`} key={category.slug}>
              <Card className="p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-primary/5">
                <div className="flex flex-col items-center justify-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                     <Hash className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="font-headline text-xl font-semibold text-foreground">
                    {category.name}
                  </h2>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
