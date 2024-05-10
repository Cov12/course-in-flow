import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";
import { strict_output } from "../openai/gpt";
import { google } from "googleapis";

export async function searchYoutube(searchQuery: string) {
  searchQuery = encodeURIComponent(searchQuery);
  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${searchQuery}&videoDuration=medium&videoEmbeddable=true&type=video&maxResults=5&videoCaption=closedCaption`
  );
  if (!data) {
    console.log("youtube failed (youtube.ts)");
    return null;
  }
  if (data.items[0] == undefined) {
    console.log("youtube fail");
    return null;
  }
  return data.items[0].id.videoId;
}

export async function getTranscriptYouTubeAPI(videoId: string) {
  try {
    // URL for the captions request
    const captionsUrl = `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${process.env.YOUTUBE_API_KEY}`;

    try {
      // Make the HTTP GET request for captions
      let transcript = "";
      axios.get(captionsUrl)
        .then(captionsResponse => {
          console.log('captionsResponse:', captionsResponse.data.items.caption);
          // Loop through the captions (if available)

          captionsResponse.data.items.forEach((caption: { snippet: { textOriginal: any; }; }) => {
            console.log('Caption:', caption);
            transcript += caption.snippet.textOriginal + " ";

          });
        })
      return transcript.replaceAll("\n", "");
    } catch (error) {
      console.log(error);
      return "";
    }
  } catch (error) {

  }
}

export async function getTranscript(videoId: string) {
  try {
    let transcript_arr = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "en",
      country: "EN",
    });
    console.log("transcript_arr: ", transcript_arr.length)
    let transcript = "";
    for (let t of transcript_arr) {
      transcript += t.text + " ";
    }
    return transcript.replaceAll("\n", "");
  } catch (error) {
    console.log(error);
    return "";
  }
}


export async function getQuestions(
  transcript: string,
  course_title: string
) {
  type Question = {
    question: string;
    answer: string;
    option1: string;
    option2: string;
    option3: string;
  };
  const questions: Question[] = await strict_output(
    "You are a helpful AI that is able to generate multiple-choice questions and answers, the length of each answer should not be more than 15 words",
    new Array(5).fill(
      `You are to generate a random hard multiple-choice question question about ${course_title} with context of the following transcript: ${transcript}`
    ),
    {
      question: "question",
      answer: "answer to multiple-choice question with max length of 15 words",
      option1: "option 1 to multiple-choice question with max length of 15 words",
      option2: "option 2 to multiple-choice question with max length of 15 words",
      option3: "option 3 to multiple-choice question with max length of 15 words",
    }
  );
  return questions;
}
