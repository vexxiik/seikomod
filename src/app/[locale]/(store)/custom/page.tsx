"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CustomWatchPage() {
  const t = useTranslations('Custom');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        <div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">{t('title')}</h1>
          <p className="text-lg text-muted-foreground mb-8">
            {t('description')}
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">1</div>
              <div>
                <h3 className="font-bold text-xl mb-2">{t('step1Title')}</h3>
                <p className="text-muted-foreground">{t('step1Desc')}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">2</div>
              <div>
                <h3 className="font-bold text-xl mb-2">{t('step2Title')}</h3>
                <p className="text-muted-foreground">{t('step2Desc')}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold shrink-0">3</div>
              <div>
                <h3 className="font-bold text-xl mb-2">{t('step3Title')}</h3>
                <p className="text-muted-foreground">{t('step3Desc')}</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="bg-card/50 border-none shadow-lg">
          <CardContent className="p-8 md:p-10">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center space-y-4 h-full min-h-[300px]">
                <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 dark:bg-green-900/30 dark:text-green-400">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold">{t('successTitle')}</h3>
                <p className="text-muted-foreground">
                  {t('successDesc')}
                </p>
                <Button 
                  className="mt-6" 
                  variant="outline" 
                  onClick={() => setIsSubmitted(false)}
                >
                  {t('sendAnother')}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('name')}</Label>
                  <Input id="name" required placeholder="" className="h-12 bg-background" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input id="email" type="email" required placeholder="" className="h-12 bg-background" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="style">{t('style')}</Label>
                  <Input id="style" placeholder={t('stylePlaceholder')} className="h-12 bg-background" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">{t('idea')}</Label>
                  <Textarea 
                    id="message" 
                    required
                    placeholder={t('ideaPlaceholder')} 
                    className="min-h-[150px] bg-background resize-none"
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-lg bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl shadow-md">
                  {isSubmitting ? t('submitting') : t('submit')}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
