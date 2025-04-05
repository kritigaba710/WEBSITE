// app/api/chat/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { message } = await req.json();

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await res.json();
    const reply = data.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('Error in /api/chat:', err);
    return NextResponse.json(
      { error: 'Something went wrong on the server.' },
      { status: 500 }
    );
  }
}
