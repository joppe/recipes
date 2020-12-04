#!/bin/bash

TARGET="./src/server/graphql/resolvers-types.ts"
./node_modules/.bin/graphql-codegen --config ./codegen.yml
./node_modules/.bin/prettier --write $TARGET
echo -e "/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */\n$(cat $TARGET)" > $TARGET
