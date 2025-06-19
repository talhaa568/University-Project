export const config = {
  api: {
    externalResolver: true,
  },
};
export default async function handler(req, res) {
  const { value, ip } = req.query;

  if (!value || !ip) {
    return res.status(400).json({ error: 'Missing value or IP address' });
  }

  try {
    const response = await fetch(`http://${ip}/output?value=${value}`);
    const text = await response.text();
    res.status(200).json({ status: 'OK', response: text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reach ESP32', details: error.message });
  }
}