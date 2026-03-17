"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, MessageSquare, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useCivic } from "@/context/civic-context";
import { useToast } from "@/hooks/use-toast";

export default function FeedbackPage() {
  const { addFeedback } = useCivic();
  const { toast } = useToast();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    // Simulate API lag
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addFeedback({ rating, comment });
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Feedback Received",
      description: "Thank you for helping us improve Sahayam Sewa Connect.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-20 flex flex-col items-center text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold">Review Submitted!</h1>
        <p className="text-muted-foreground max-w-sm">
          Your feedback has been successfully recorded and shared with our civic intelligence team.
        </p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline">Submit another review</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Platform Feedback</h1>
        <p className="text-muted-foreground">Share your experience with Sahayam Sewa Connect to help us enhance civic outcomes.</p>
      </div>

      <Card className="border-none shadow-lg overflow-hidden">
        <div className="bg-primary/5 p-6 border-b flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle>Share Your Review</CardTitle>
            <CardDescription>How would you rate your mission experience?</CardDescription>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <CardContent className="p-8 space-y-8">
            <div className="space-y-4 text-center">
              <Label className="text-sm font-bold uppercase tracking-widest opacity-60">Overall Rating</Label>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-all hover:scale-110 focus:outline-none"
                  >
                    <Star 
                      className={`w-10 h-10 ${
                        star <= rating 
                          ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]" 
                          : "text-muted-foreground/20"
                      }`} 
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm font-bold text-amber-600">
                {rating === 1 ? "Poor" : rating === 2 ? "Fair" : rating === 3 ? "Good" : rating === 4 ? "Very Good" : "Excellent"}
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="comment" className="text-sm font-bold text-muted-foreground">Civic Experience Details</Label>
              <Textarea 
                id="comment"
                placeholder="Tell us about the ease of use, mission relevance, or areas for improvement..."
                className="min-h-[150px] bg-muted/30 border-none focus-visible:ring-primary/20 resize-none text-base"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="p-8 pt-0">
            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-bold gap-2 shadow-lg shadow-primary/20" 
              disabled={isSubmitting || !comment.trim()}
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              Submit My Review
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}