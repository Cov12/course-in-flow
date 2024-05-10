// /api/course/regenerateChapter

import { NextResponse } from "next/server";
import { createChaptersSchema } from "@/validators/course";
import { ZodError } from "zod";
import { strict_output } from "@/lib/openai/gpt";
import { getUnsplashImage } from "@/lib/unsplash/unsplash";
import { prisma } from "@/lib/db/db";
import { getAuthSession } from "@/lib/auth/auth";
import { checkSubscription } from "@/lib/stripe/subscription";

export async function POST(req: Request, res: Response) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return new NextResponse("unauthorised", { status: 401 });
          }
          const isPro = await checkSubscription();
          if (session.user.credits <= 0 && !isPro) {
            return new NextResponse("no credits", { status: 402 });
          }
          const body = await req.json();

          type outputUnit = {
            title: string;
            chapters: {
              youtube_search_query: string;
              chapter_title: string;
            }[];
          }[];
    } catch (error) {
        
    }
}