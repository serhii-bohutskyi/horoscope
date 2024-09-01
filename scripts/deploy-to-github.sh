#!/bin/bash

# Define paths relative to the script location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR/.."
DEST_DIR="$PROJECT_ROOT/docs"

# Ensure we are in the project root
cd "$PROJECT_ROOT"

# Check if there are any changes in the docs directory
if [ -z "$(git status --porcelain "$DEST_DIR")" ]; then
  echo "No changes to commit."
  exit 0
fi

# Add the files in the docs directory
echo "Adding files from $DEST_DIR..."
git add "$DEST_DIR"

# Commit the changes
COMMIT_MESSAGE="GitHub Pages deploy"
echo "Committing changes with message: $COMMIT_MESSAGE"
git commit -m "$COMMIT_MESSAGE"

# Push the changes to the remote repository
echo "Pushing changes to the remote repository..."
git push origin main

# Confirm completion
echo "Deployment to GitHub Pages completed successfully."

exit 0
