#!/bin/bash

# Usage: ./update-savepoint.sh "Your commit message"

if [ -z "$1" ]; then
  echo "Please provide a commit message."
  exit 1
fi

# Commit changes
git add .
git commit -m "$1"

# Overwrite savepoint.log with latest commit hash and message
git log --oneline -1 > savepoint.log

# Append folder structure (up to 2 levels)
tree -L 2 >> savepoint.log

# Append high-level description (edit as needed)
echo -e "\nSavepoint: AI Dashboard Monorepo" >> savepoint.log
echo "- Backend: FP-style Task API, Notes & AI features, tests passing" >> savepoint.log
echo "- Frontend: React dashboard scaffold + Notes component" >> savepoint.log
echo "- Folder structure updated with note-related controllers, services, and tests" >> savepoint.log

echo "Savepoint updated successfully!"