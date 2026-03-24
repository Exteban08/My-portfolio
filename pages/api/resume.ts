import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

/** Filenames under public/documents (not exposed in the download name). */
const RESUME_FILES = {
  en: 'Esteban-Gonzalez-CV-en.pdf',
  es: 'Esteban-Gonzalez-CV-es.pdf',
} as const;

const DOWNLOAD_FILENAME = 'Esteban-Gonzalez-CV.pdf';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end();
  }

  const raw = typeof req.query.lang === 'string' ? req.query.lang : 'en';
  const lang = raw.toLowerCase().startsWith('es') ? 'es' : 'en';

  const fileName = RESUME_FILES[lang];
  const filePath = path.join(process.cwd(), 'public', 'documents', fileName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).end('Not found');
  }

  const buf = fs.readFileSync(filePath);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${DOWNLOAD_FILENAME}"; filename*=UTF-8''${encodeURIComponent(DOWNLOAD_FILENAME)}`,
  );
  res.setHeader('Content-Length', String(buf.length));
  res.setHeader('Cache-Control', 'private, max-age=3600');

  return res.status(200).send(buf);
}
