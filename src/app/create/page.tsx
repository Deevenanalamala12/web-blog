"use client";

import { useState, ChangeEvent, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createPost } from '@/lib/data';
import { useAuth } from '@/context/AuthContext';

const QuillEditor = dynamic(() => import('@/components/QuillEditor'), { ssr: false });

export default function CreatePostPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); // We're not using a real upload, but keeping state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: 'destructive',
          title: 'Image too large',
          description: 'Please upload an image smaller than 4MB.',
        });
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
        toast({ variant: 'destructive', title: 'Not authorized', description: 'You must be logged in to create a post.' });
        return;
    }
    if (!imagePreview) {
        toast({ variant: 'destructive', title: 'Missing Image', description: 'Please upload a featured image.' });
        return;
    }

    setIsSubmitting(true);
    try {
        const newPost = await createPost({
            title,
            content,
            imageUrl: imagePreview,
            author: user.name,
            authorImage: user.image || 'https://placehold.co/100x100.png'
        });
        toast({
            title: 'Post Created!',
            description: 'Your new blog post has been successfully created.',
        });
        router.push(`/posts/${newPost.slug}`);
    } catch (error) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to create post. Please try again.',
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="font-headline text-5xl font-bold text-primary">Create New Post</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Share your story with the world.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl text-primary">Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base">Title</Label>
                <Input 
                  id="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your post title" 
                  required 
                  className="text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content" className="text-base">Content</Label>
                <QuillEditor value={content} onChange={setContent} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl text-primary">Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                  onClick={handleUploadClick}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/png, image/jpeg, image/gif"
                  />
                  <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                    <UploadCloud className="h-12 w-12" />
                    <p className="font-semibold">Click to upload or drag and drop</p>
                    <p className="text-sm">PNG, JPG, GIF (up to 4MB)</p>
                  </div>
                </div>
                {imagePreview && (
                  <div className="mt-4">
                    <p className="font-semibold mb-2">Image Preview:</p>
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                       <Image
                        src={imagePreview}
                        alt="Selected image preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
