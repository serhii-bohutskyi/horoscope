#!/bin/bash

# Define paths relative to the script location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Run the build and copy script
echo "Running build-and-copy.sh..."
"$SCRIPT_DIR/build-and-copy.sh"

# Run the deploy to GitHub script
echo "Running deploy-to-github.sh..."
"$SCRIPT_DIR/deploy-to-github.sh"

echo "All tasks completed successfully."
