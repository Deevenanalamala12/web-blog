import type { Post } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            data-ai-hint={post.dataAiHint}
          />
        </div>
      </Link>
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          {post.categories.map((category) => (
             <Badge key={category} variant="secondary" className="font-normal">{category}</Badge>
          ))}
        </div>
        <CardTitle className="font-headline text-xl leading-tight">
          <Link href={`/posts/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm">{post.excerpt}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center text-sm text-muted-foreground w-full">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1.5" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center ml-auto">
             <Calendar className="h-4 w-4 mr-1.5" />
            <time dateTime={post.date}>{format(new Date(post.date), 'MMM d, yyyy')}</time>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
