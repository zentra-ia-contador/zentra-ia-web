const RAILWAY_URL = process.env.RAILWAY_SCRAPER_URL
const RAILWAY_KEY = process.env.RAILWAY_API_KEY

export const railwayFetch = async (endpoint: string, body: object) => {
  if (!RAILWAY_URL || !RAILWAY_KEY) {
    throw new Error("Railway no configurado. Agrega RAILWAY_SCRAPER_URL y RAILWAY_API_KEY a las variables de entorno de Vercel.")
  }
  const response = await fetch(`${RAILWAY_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': RAILWAY_KEY,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    throw new Error(`Railway error: ${response.status} ${response.statusText}`)
  }
  return response.json()
}
