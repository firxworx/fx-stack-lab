#!/usr/bin/env bash

#######################################################################################################################
# Drop all tables in the 'public' schema of the project database, preserving functions, views, etc.
#
# - loads credentials from `apps/api/.env`
# - exits with status 1 if the database has no tables to drop
#######################################################################################################################

set -euo pipefail
IFS=$'\n\t'

GIT_REPO_ROOT=$(git rev-parse --show-toplevel)

. "$GIT_REPO_ROOT/scripts/lib/load-env.sh"
loadEnv "$GIT_REPO_ROOT/apps/api/.env"

# #####################################################################################################################
# Configuration Variables
# #####################################################################################################################

DB_SCHEMA="public"

# #####################################################################################################################
# Script Implementation
# #####################################################################################################################

DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"

# notes:
# - the psql command doesn't like `schema` specified via the url e.g.
#   - DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME?schema=public"
# - if you follow the alternate approach of dropping the public schema and recreating it there are consequences
#   with more recent versions of postgres including that permissions must then be recreated via GRANT queries

# execute query to generate 'DROP TABLE' statements for all tables in the database
DROP_QUERY=$(psql "$DATABASE_URL" -t -c "SELECT 'DROP TABLE IF EXISTS \"' || tablename || '\" CASCADE;' FROM pg_tables WHERE schemaname = '$DB_SCHEMA'")

QL=${#DROP_QUERY}
if [ "$QL" = "0" ]; then
  echo "Database '$DB_NAME' schema '$DB_SCHEMA' has no tables to drop."
  exit 1
fi

# execute drop queries via a single command to execute as a single transaction
psql "$DATABASE_URL" -c "$DROP_QUERY"

if [ $? -eq 0 ]; then
  echo "Dropped all tables in database '$DB_NAME' schema '$DB_SCHEMA'."
else
  echo "Error dropping tables in database '$DB_NAME' schema '$DB_SCHEMA'."
fi
