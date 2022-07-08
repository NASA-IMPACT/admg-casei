#!/bin/zsh
docker run -t -d --name "caseisnapshots" --security-opt seccomp:unconfined --rm --network host --mount type=bind,src=$(pwd),dst=/work --mount type=volume,dst=/work/node_modules -w /work/ mcr.microsoft.com/playwright:v1.22.2-focal-arm64
docker exec -it -w /work/ caseisnapshots yarn install
docker exec -it -w /work/ --env "DEBUG=pw:test*" caseisnapshots xvfb-run npx playwright test --workers 1 --update-snapshots
docker stop caseisnapshots