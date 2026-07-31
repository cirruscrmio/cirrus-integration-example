#!/bin/bash

set -euo pipefail

read -rp "Enter the new service name (e.g. cirrus-service-orders): " SERVICE_NAME

if [[ -z "$SERVICE_NAME" ]]; then
  echo "Service name cannot be empty."
  exit 1
fi

echo "Renaming cirrus-service-template → $SERVICE_NAME ..."

# Determine OS-specific sed command
if [[ "$OSTYPE" == "darwin"* ]]; then
  SED_INPLACE=("sed" "-i" "")
else
  SED_INPLACE=("sed" "-i")
fi


replace_in_file() {
  local pattern="$1"
  local replacement="$2"

  find . \
    -type f \
    ! -path "./.git/*" \
    ! -path "./node_modules/*" \
    ! -name "bootstrap.sh" \
    -exec grep -Il "$pattern" {} + \
    | while read -r file; do
        perl -pi -e "s/\Q$pattern\E/$replacement/g" "$file"
      done
}

# Replace name in file contents without cirrus prefix (including dash). Service
# name without the cirrus prefix is used in e.g. package names.
replace_in_file "service-template" "${SERVICE_NAME//cirrus-/}"

# Replace name in file contents but with underscore. This is used e.g. in metrics
replace_in_file "cirrus_service_template" "${SERVICE_NAME//-/_}"

# Rename matching files and directories (depth-first)
find . \
  -depth \
  -name "*cirrus-service-template*" \
  ! -path "./.git/*" \
  ! -path "./node_modules/*" \
  | while read -r path; do
      new_path="$(echo "$path" | sed "s/cirrus-service-template/$SERVICE_NAME/g")"
      mv "$path" "$new_path"
    done

# Remove --dry-run from workflow files to enable real deployments
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' '/--dry-run/d' .github/workflows/*.yaml
else
  sed -i '/--dry-run/d' .github/workflows/*.yaml
fi

# Delete script folder including this script
rm -r ./scripts

echo "✅ Done. Project renamed to $SERVICE_NAME."
