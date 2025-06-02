import webpush from 'web-push';
import DB from '$lib/server/db.js';
import { json } from '@sveltejs/kit';

webpush.setVapidDetails(
    'mailto:contact@stephane-klein.info',
    process.env.PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

export async function POST() {
    DB().query(`
        SELECT
            endpoint,
            p256dh,
            auth
        FROM
            push_subscriptions
        ORDER BY
            created_at DESC
    `).map(async (sub) => {
        const result = await webpush.sendNotification(
            {
                endpoint: sub.endpoint,
                keys: {
                    p256dh: sub.p256dh,
                    auth: sub.auth
                }
            },
            JSON.stringify({ // payload
                title: `datetime: ${(new Date()).toISOString()}`
            })
        );
    });
    return json({
        result: 'success'
    });
}
