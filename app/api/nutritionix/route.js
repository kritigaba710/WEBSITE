import axios from 'axios';

export async function POST(req) {
  try {
    const body = await req.json();
    const { query, duration, weight } = body;

    if (!query || !duration || !weight) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 }
      );
    }

    const options = {
      method: 'POST',
      url: 'https://trackapi.nutritionix.com/v2/natural/exercise',
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': process.env.NUTRITIONIX_APP_ID,
        'x-app-key': process.env.NUTRITIONIX_APP_KEY,
      },
      data: {
        query: `${query} for ${duration} minutes`,
      },
      
    };

    const response = await axios.request(options);
    return new Response(JSON.stringify(response.data), { status: 200 });

  } catch (error) {
    console.error('API route error:', error?.response?.data || error.message);
    return new Response(JSON.stringify({ error: 'Failed to calculate calories' }), {
      status: 500,
    });
  }
}
