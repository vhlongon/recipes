import { getUser } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log('here');
  try {
    const user = await getUser();
    console.log('🚀 ~ user:', user);

    return NextResponse.json(
      { data: { user } },
      {
        status: 200,
        statusText: 'ok',
      }
    );
  } catch (error: any) {
    const message = `could not get user: ${error.message}`;
    return NextResponse.json(
      { data: { message } },
      {
        status: 500,
        statusText: message,
      }
    );
  }
}
