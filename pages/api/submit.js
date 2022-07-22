import { google } from 'googleapis';

let options = {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

export default async function handler({ method, body }, res) {
  if (method !== 'POST') return res.status(405).send({ message: 'Only POST allowed' });
  const { name, email, device_type, phone_number, agree_to_reservation, locale } = body;
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key:
          process.env.NODE_ENV === 'development'
            ? process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
            : JSON.parse(process.env.GOOGLE_PRIVATE_KEY),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });
    const sheets = google.sheets({ auth, version: 'v4' });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A1:E1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            name,
            email,
            "'" + (phone_number ?? 'International'),
            device_type,
            agree_to_reservation ?? 'no',
            locale,
            new Date().toLocaleTimeString([], options),
          ],
        ],
      },
    });

    return res.status(200).json({ message: 'Sign up successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: '500 Error' });
  }
}
