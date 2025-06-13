#!/bin/bash
cd /home/kavia/workspace/code-generation/transitpulse-india-39017-0ff6742e/transitpulse_india
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

