

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Pencil, Heart, Loader2, MessageCircle } from "lucide-react";
import { format } from 'date-fns';

import { useAuth } from "@/context/AuthContext";
import type { Post, Comment as CommentType } from "@/lib/types";
import { likePost, addComment } from "@/lib/data";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

function CommentForm({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: (text: string) => Promise<void>;
  isSubmitting: boolean;
}) {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    await onSubmit(commentText);
    setCommentText("");
  };

  return (
    <Card>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Label htmlFor="comment" className="font-semibold">
            Leave a Comment
          </Label>
          <Textarea
            id="comment"
            placeholder="Write your comment here..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
            rows={3}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Comment
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}


export function PostClientLayout({ children, post }: { children: React.ReactNode, post: Post }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [likes, setLikes] = useState(post.likes);
  const [isLiking, setIsLiking] = useState(false);
  const [comments, setComments] = useState<CommentType[]>(post.comments);
  const [isCommenting, setIsCommenting] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      const updatedPost = await likePost(post.slug);
      setLikes(updatedPost.likes);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to like post. Please try again.",
      });
    } finally {
      setIsLiking(false);
    }
  };

  const handleAddComment = async (text: string) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Not authorized",
        description: "You must be logged in to comment.",
      });
      return;
    }
    setIsCommenting(true);
    try {
      const updatedPost = await addComment(post.slug, {
        text,
        author: user.name,
        authorImage: user.image || "https://placehold.co/40x40.png",
      });
      setComments(updatedPost.comments);
       toast({
        title: "Comment Added!",
        description: "Your comment has been successfully posted.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add comment. Please try again.",
      });
    } finally {
      setIsCommenting(false);
    }
  };

  const childrenWithInjectedProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.props.className?.includes('container')) {
      const article = child.props.children.find((c: any) => c.type === 'article');
      
      if (!React.isValidElement(article) || !article.props || !article.props.children) {
        return child;
      }
      
      const articleChildren = React.Children.toArray(article.props.children);
      
      // Inject like/comment controls functionality
      const controlsIndex = articleChildren.findIndex(
        (c: any) => React.isValidElement(c) && c.props['data-testid'] === 'like-and-comment-controls'
      );

      if (controlsIndex !== -1) {
        const controls = articleChildren[controlsIndex] as React.ReactElement;
        
        const likeButton = React.Children.toArray(controls.props.children).find(
            (c: any) => React.isValidElement(c) && c.props['data-testid'] === 'like-button'
        ) as React.ReactElement | undefined;

        const commentCountWrapper = React.Children.toArray(controls.props.children).find(
            (c: any) => React.isValidElement(c) && c.props['data-testid'] === 'comment-count-wrapper'
        ) as React.ReactElement | undefined;
        
        let finalControlsChildren = [...React.Children.toArray(controls.props.children)];

        if(likeButton) {
            const newLikeButton = React.cloneElement(likeButton, {
                onClick: handleLike,
                disabled: isLiking,
                children: [
                    isLiking ? <Loader2 className="mr-2 h-5 w-5 animate-spin" key="loader"/> : <Heart className="mr-2 h-5 w-5 text-red-500 transition-transform group-hover:scale-110" key="icon"/>,
                    <span className="font-bold" data-testid="like-count" key="like-count">{likes}</span>,
                    <span className="sr-only" key="sr-only-likes">Likes</span>
                ]
            });
            const likeButtonIndex = finalControlsChildren.findIndex((c:any) => React.isValidElement(c) && c.props['data-testid'] === 'like-button');
            if(likeButtonIndex !== -1) finalControlsChildren[likeButtonIndex] = newLikeButton;
        }

        if (commentCountWrapper) {
            const newCommentCount = React.cloneElement(commentCountWrapper, {
                children: [
                    <MessageCircle className="mr-2 h-5 w-5" key="icon"/>,
                    <span data-testid="comment-count" key="count">{comments.length}</span>,
                    <span className="ml-1" key="text">Comments</span>
                ]
            });
            const commentCountIndex = finalControlsChildren.findIndex((c:any) => React.isValidElement(c) && c.props['data-testid'] === 'comment-count-wrapper');
            if(commentCountIndex !== -1) finalControlsChildren[commentCountIndex] = newCommentCount;
        }

        if (user) {
          finalControlsChildren.push(
            <Button variant="outline" size="lg" asChild className="ml-auto" key="edit-button">
              <Link href={`/posts/${post.slug}/edit`}>
                <Pencil className="mr-2 h-5 w-5" />
                Edit
              </Link>
            </Button>
          );
        }

        const newControls = React.cloneElement(controls, {}, ...finalControlsChildren);
        articleChildren[controlsIndex] = newControls;
      }
      
      // Inject comment form and list
      const commentsSectionIndex = articleChildren.findIndex(c => (c as any)?.props?.['data-testid'] === 'comments-section');
      if (commentsSectionIndex !== -1) {
          const commentsSection = articleChildren[commentsSectionIndex] as React.ReactElement;
          const commentsSectionChildren = React.Children.toArray(commentsSection.props.children);

          // Inject form
          const formWrapperIndex = commentsSectionChildren.findIndex(c => (c as any)?.props?.['data-testid'] === 'comment-form-wrapper');
          if(formWrapperIndex !== -1 && user) {
            commentsSectionChildren[formWrapperIndex] = <CommentForm key="comment-form" onSubmit={handleAddComment} isSubmitting={isCommenting} />;
          }

          // Inject updated comments list
          const listWrapperIndex = commentsSectionChildren.findIndex(c => (c as any)?.props?.['data-testid'] === 'comments-list');
          if (listWrapperIndex !== -1) {
            const newList = comments.length > 0 ? (
                comments.map((comment) => (
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
            );

            const listWrapper = commentsSectionChildren[listWrapperIndex] as React.ReactElement;
            commentsSectionChildren[listWrapperIndex] = React.cloneElement(listWrapper, {}, newList);
          }

          const newCommentsSection = React.cloneElement(commentsSection, {}, ...commentsSectionChildren);
          articleChildren[commentsSectionIndex] = newCommentsSection;
      }

      const newArticle = React.cloneElement(article, {}, ...articleChildren);
      
      const newContainerChildren = child.props.children.map((c: any) => c.type === 'article' ? newArticle : c);

      return React.cloneElement(child, {}, ...newContainerChildren);
    }
    return child;
  });

  return <>{childrenWithInjectedProps}</>;
}
