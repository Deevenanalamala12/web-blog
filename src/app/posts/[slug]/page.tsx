import { getPostBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, User, Heart, MessageCircle, Pencil, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { PostClientLayout } from '@/components/post-client-layout';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

type PostPageProps = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <PostClientLayout post={post}>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto mb-8">
          <Button variant="ghost" asChild className="pl-0">
             <Link href="/" className="inline-flex items-center text-primary hover:underline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
            </Link>
          </Button>
        </div>
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <Badge key={category}>
                  <Link href={`/category/${category.toLowerCase().replace(' ', '-')}`}>{category}</Link>
                </Badge>
              ))}
            </div>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary mb-4">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 text-muted-foreground">
               <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                      <AvatarImage src={post.authorImage} alt={post.author} />
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground">{post.author}</span>
              </div>
              <span className="hidden md:inline">·</span>
              <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
              </div>
            </div>
          </header>

          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-lg">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              data-ai-hint={post.dataAiHint}
              priority
            />
          </div>

          <div
            className="prose max-w-none text-lg mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 flex items-center gap-4 border-t pt-6" data-testid="like-and-comment-controls">
              <Button variant="outline" size="lg" className="group" data-testid="like-button">
                  <Heart className="mr-2 h-5 w-5 text-red-500 transition-transform group-hover:scale-110" />
                  <span className="font-bold" data-testid="like-count">{post.likes}</span>
                  <span className="sr-only">Likes</span>
              </Button>
              <div className="flex items-center text-muted-foreground" data-testid="comment-count-wrapper">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  <span data-testid="comment-count">{post.comments.length}</span>
                  <span className="ml-1">Comments</span>
              </div>
          </div>

          <div className="mt-12" data-testid="comments-section">
              <h2 className="font-headline text-3xl mb-6">Comments</h2>
              
              <div className="mt-8" data-testid="comment-form-wrapper">
                {/* This form will be handled by PostClientLayout */}
              </div>

              <div className="space-y-6 mt-8" data-testid="comments-list">
                  {post.comments.length > 0 ? (
                      post.comments.map((comment) => (
                          <Card key={comment.id}>
                              <CardContent className="p-4">
                                  <div className="flex items-start space-x-4">
                                      <Avatar>
                                          <AvatarImage src={comment.authorImage} alt={comment.author} />
                                          <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                          <div className="flex justify-between items-center">
                                              <p className="font-semibold">{comment.author}</p>
                                              <p className="text-xs text-muted-foreground">
                                                  {format(new Date(comment.date), 'MMM d, yyyy')}
                                              </p>
                                          </div>
                                          <p className="text-muted-foreground mt-1">{comment.text}</p>
                                      </div>
                                  </div>
                              </CardContent>
                          </Card>
                      ))
                  ) : (
                      <p className="text-muted-foreground" data-testid="no-comments-message">Be the first to leave a comment!</p>
                  )}
              </div>
          </div>
        </article>
      </div>
    </PostClientLayout>
  );
}
