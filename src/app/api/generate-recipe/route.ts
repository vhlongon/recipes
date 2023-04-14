import { getUserSettings } from '@/lib/data';
import { generatePrompt, parseAnswer } from '@/lib/recipe';
import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  const body = await request.json();

  const prompt = generatePrompt(body);
  const promptLength = prompt.length;
  const settings = await getUserSettings();

  try {
    const config = {
      model: 'text-davinci-003',
      prompt,
      temperature: settings?.temperature || 1,
      max_tokens: (settings?.maxTokens || 4000) - promptLength,
    };

    const response = await openai.createCompletion(config);

    const answer = response.data.choices[0].text ?? '';
    const { description, instructions, hashtags } = parseAnswer(answer);

    return NextResponse.json(
      {
        data: {
          description,
          instructions,
          hashtags,
          ingredients: body.ingredients,
          preparationTime: body.preparationTime,
          type: body.type,
          portions: body.portions,
          kcal: body.kcal,
          title: body.title,
        },
      },
      {
        status: 200,
        statusText: 'ok',
      }
    );
  } catch (error: any) {
    console.log('🚀 ~ error:', error);
    const message = `could not generate recipe: ${error.message}`;
    return NextResponse.json(
      { data: { message } },
      {
        status: 500,
        statusText: message,
      }
    );
  }
}
