#!/bin/bash
set -e
ROOT_DIR=$(dirname "$0")/..
ZIP_NAME="community-chat-platform.zip"
cd "$ROOT_DIR"
if [ -f "$ZIP_NAME" ]; then
  rm "$ZIP_NAME"
fi
zip -r "$ZIP_NAME" . -x "*.git*" -x "*.DS_Store" -x "$ZIP_NAME"
exit 0
# TODO: Add checksum verification