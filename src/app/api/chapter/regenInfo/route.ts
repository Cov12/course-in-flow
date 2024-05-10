// /api/chapter/regenInfo

import { prisma } from "@/lib/db/db";
import { strict_output } from "@/lib/openai/gpt";
import {
  getQuestions,
  getTranscript,
  searchYoutube,
} from "@/lib/youtube/youtube";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodyParser = z.object({
  chapterId: z.string(),
});

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const { chapterId } = bodyParser.parse(body);
        const chapter = await prisma.chapter.findUnique({
          where: {
            id: chapterId,
          },
        });
        if (!chapter) {
            return NextResponse.json(
              {
                success: false,
                error: "Chapter could not be regenerated",
              },
              { status: 404 }
            );
          }
          const videoId:string = await searchYoutube(chapter.youtubeSearchQuery!);
          let transcript = await getTranscript(videoId);
          let maxLength = 1000;
      
          transcript = transcript.split(" ").slice(0, maxLength).join(" ");

          if(transcript.length === 0 || transcript === null) {
            const { summary }: { summary: string } = await strict_output(
                "You are an AI capable of summarising a course chapter",
                `summarise the main topic of ${chapter} in 500 words or less using ${chapter.youtubeSearchQuery} and do not include sponsors or anything unrelated to the main topic`,
                { summary: "summary of the transcript" }
              );
          } else {
            const { summary }: { summary: string } = await strict_output(
                "You are an AI capable of summarising a youtube transcript",
                `summarise ${transcript} in 250 words or less and do not include sponsors or anything unrelated to the main topic, also do not introduce what the summary is about`,
                { summary: "summary of the transcript" }
              );
          }

    } catch (error) {
        
    }
}