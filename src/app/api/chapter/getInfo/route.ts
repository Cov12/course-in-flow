// /api/chapter/getInto

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
      include: {
        questions: true
      }
    });
    if (!chapter) {
      return NextResponse.json(
        {
          success: false,
          error: "Chapter not found",
        },
        { status: 404 }
      );
    }
    const videoId: string = await searchYoutube(chapter.youtubeSearchQuery!);
    let transcript = await getTranscript(videoId);
    let maxLength = 750;

    transcript = transcript.split(" ").slice(0, maxLength).join(" ");

    const { summary }: { summary: string } = (transcript.length === 0 || transcript === null) ? await strict_output(
      "You are an AI capable of creating a comprehensive compliance training course chapter",
      `design a training module focusing on the main topic of ${chapter} in 750 words or less using ${chapter.youtubeSearchQuery}, and do not include anything unrelated to the main topic. The training should be immersive with real-world examples and guidelines on best practices`,
      { summary: "summary of the transcript" }
    ) : await strict_output(
      "You are an AI capable of summarising a youtube transcript",
      "summarise in 250 words or less and do not talk of the sponsors or anything unrelated to the main topic, also do not introduce what the summary is about.\n" +
      transcript,
      { summary: "summary of the transcript" }
    );

    const questions = await getQuestions(
      (transcript.length === 0 ? summary : transcript),
      chapter.name
    );

    await prisma.question.createMany({
      data: questions.map((question) => {
        let options = [
          question.answer,
          question.option1,
          question.option2,
          question.option3,
        ];
        options = options.sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          chapterId: chapterId,
        };
      }),
    });

    await prisma.chapter.update({
      where: { id: chapterId },
      data: {
        videoId: videoId,
        summary: summary,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid body, no chapterID provided",
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "unknown",
        },
        { status: 500 }
      );
    }
  }
}
