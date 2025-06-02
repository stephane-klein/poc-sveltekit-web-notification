<script>
import { onMount } from 'svelte';
import { browser } from '$app/environment';
import { PUBLIC_VAPID_PUBLIC_KEY } from '$env/static/public';

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

onMount(async () => {
    console.log(browser);
    if (browser) {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            try {
                const registration = await navigator.serviceWorker.getRegistration();

                if (registration) {
                    const permission = await Notification.requestPermission();

                    if (permission === 'granted') {
                        const subscription = await registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_PUBLIC_KEY)
                        });

                        await fetch('/api/subscribe', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(subscription)
                        });
                    }
                } else {
                    console.log('No Service Worker registered');
                }
            } catch (error) {
                console.error('Error accessing SW:', error);
            }
        }

    }
});
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
