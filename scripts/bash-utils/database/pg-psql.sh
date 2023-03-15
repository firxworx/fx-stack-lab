#!/usr/bin/env bash

#######################################################################################################################
# Open an interactive postgres prompt by executing `psql` with credentials read from `/apps/api/.env`.
#######################################################################################################################

set -euo pipefail
IFS=$'\n\t'

GIT_REPO_ROOT=$(git rev-parse --show-toplevel)

. "$GIT_REPO_ROOT/scripts/lib/load-env.sh"
loadEnv "$GIT_REPO_ROOT/apps/api/.env"

# #####################################################################################################################
# Script Implementation
# #####################################################################################################################

DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"
psql "$DATABASE_URL"
