#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/../"

VAPID_KEYS=$(pnpm run -s generate-vapid-keys)

cat <<EOF > ./.secret
# The PUBLIC_ prefix is present here to allow SvelteKit frontend pages to access this variable
# more info, see: https://svelte.dev/docs/kit/$env-static-public
export PUBLIC_VAPID_PUBLIC_KEY="$(echo $VAPID_KEYS | jq -r .publicKey)"
export VAPID_PRIVATE_KEY=$(echo $VAPID_KEYS | jq -r .privateKey)
EOF
