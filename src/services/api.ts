export async function callApi<T>(url: string, body: any, headers?: any): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  })

  const json = await response.json()

  if (!response.ok) {
    throw new Error(json?.error?.msg || 'Unknown error')
  }
  return json
}
