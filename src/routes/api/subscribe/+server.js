import { json } from '@sveltejs/kit';
import DB from '$lib/server/db.js';

export async function POST({ request, getClientAddress }) {
    const subscription = await request.json();

    const result = DB().prepare(`
        INSERT INTO push_subscriptions
        (
            endpoint,
            p256dh,
            auth,
            user_agent,
            updated_at
        )
        VALUES (
            :endpoint,
            :p256ph,
            :auth,
            :user_agent,
            CURRENT_TIMESTAMP
        )
        ON CONFLICT(endpoint) DO UPDATE SET
            p256dh = excluded.p256dh,
           auth = excluded.auth,
            user_agent = excluded.user_agent,
            updated_at = CURRENT_TIMESTAMP
    `).run({
        endpoint: subscription.endpoint,
        p256ph: subscription.keys.p256dh,
        auth: subscription.keys.auth,
        user_agent: request.headers.get('user-agent') || ''
    });
    return json({ 
      success: true, 
      id: result.lastInsertRowid,
      message: 'Subscription saved'
    });
};
