#!/bin/bash

# Define paths relative to the script location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR/.."
ANGULAR_APP_DIR="$PROJECT_ROOT/horoscope-ui"
DEST_DIR="$PROJECT_ROOT/docs"

# Build the Angular application with a base-href of '/'
echo "Building Angular application..."
cd "$ANGULAR_APP_DIR"
ng build --base-href "/"

# Copy the build output to the docs directory
echo "Copying build output to $DEST_DIR..."
rm -rf "$DEST_DIR"
mkdir -p "$DEST_DIR"
cp -r "$ANGULAR_APP_DIR/dist/horoscope-ui/browser/"* "$DEST_DIR/"

echo "Build and copy completed successfully."
