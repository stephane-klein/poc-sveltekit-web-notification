import { migrate } from './lib/server/db.js';

export async function init() {
    migrate();
}
