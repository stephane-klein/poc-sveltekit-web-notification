#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/../"

cat <<EOF > ./.secret
# The PUBLIC_ prefix is present here to allow SvelteKit frontend pages to access this variable
# more info, see: https://svelte.dev/docs/kit/$env-static-public
export PUBLIC_VAPID_PUBLIC_KEY="$(pnpm run -s generate-vapid-keys | jq -r .publicKey)"
export VAPID_PRIVATE_KEY=$(pnpm run -s generate-vapid-keys | jq -r .privateKey)
EOF
