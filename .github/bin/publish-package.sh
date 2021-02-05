#!/bin/bash

export PATH=$(yarn global dir)/node_modules/.bin:${PATH}

if [ -n "${GITHUB_HEAD_REF}" ]; then
  export BRANCH="${GITHUB_HEAD_REF#refs/heads/}"
else
  export BRANCH="${GITHUB_REF#refs/heads/}"
fi

export BUILD_NUM=${GITHUB_RUN_NUMBER}
export tag=$(build-utils publishprepare --branch "${BRANCH}" --build-num "${BUILD_NUM}")
echo "${tag}"
npm publish --tag "${tag}" --verbose || true
