import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  const dataDir = path.join(process.cwd(), 'data');
  const data = JSON.parse(await fs.readFile(dataDir + '/emails.json', 'utf8'));
  const result = data.find((user) => user.Email === req.body.email);
  if (result) return res.status(200).json(result);
  res.status(404).json({ msg: 'Email Not Found' });
}
