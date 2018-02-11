#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


cd $DIR/gb-web
npm run build


cd ..
mkdir -p public/images
cp gb-web/src/images/* public/images
firebase deploy --only hosting
