import {existsSync} from 'node:fs';
import path from 'node:path';

export function sampleFileExists(file: string) {
  if (!/^[a-z0-9][a-z0-9.-]*$/i.test(file)) return false;
  return existsSync(path.join(process.cwd(), 'public', 'samples', file));
}
