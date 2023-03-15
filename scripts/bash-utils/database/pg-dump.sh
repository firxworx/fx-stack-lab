#!/usr/bin/env bash

#######################################################################################################################
# Dump the local postgres database to an SQL file in the ./db-dumps folder
#######################################################################################################################

set -euo pipefail
IFS=$'\n\t'

GIT_REPO_ROOT=$(git rev-parse --show-toplevel)

. "$GIT_REPO_ROOT/scripts/lib/load-env.sh"
loadEnv "$GIT_REPO_ROOT/apps/api/.env"

# #####################################################################################################################
# Configuration Variables
# #####################################################################################################################

# suffix to append to dump filename w/ extension: the datetime followed by a dash will be prefixed to this value
OUTPUT_FILE_SUFFIX="dump.sql"

# output folder path (this path is added to .gitignore)
OUTPUT_PATH="$GIT_REPO_ROOT/database/dumps"

# #####################################################################################################################
# Script Implementation
# #####################################################################################################################

DATETIME=$(date +"%Y-%m-%d-%H%M%S%z")
OUTPUT_FILE="$OUTPUT_PATH/$DATETIME-$OUTPUT_FILE_SUFFIX"

# ensure output path exists
mkdir -p "$OUTPUT_PATH"

# execute pg_dump with required options
PGPASSWORD="$DB_PASSWORD" pg_dump --no-owner --inserts --column-inserts --quote-all-identifiers \
  -h $DB_HOST \
  -p $DB_PORT \
  -U $DB_USER \
  $DB_NAME > "$OUTPUT_FILE"

# example command reference:
# PGPASSWORD="postgres" pg_dump --no-owner --inserts --column-inserts --quote-all-identifiers -h localhost -p 5432 -U postgres db_name > data.sql

echo "dumped database '$DB_NAME' at $DB_HOST:$DB_PORT to: $OUTPUT_PATH"

# note:
# - the --inserts flag generates INSERT statements vs. COPY statements (dump default) as preferred dev behaviour
