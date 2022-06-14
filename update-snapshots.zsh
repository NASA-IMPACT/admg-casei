#!/bin/zsh
docker run -t -d --name "caseisnapshots" --rm --network host -v $(pwd):/work/ -w /work/ mcr.microsoft.com/playwright:v1.22.0-focal
docker exec -it -w /work/ caseisnapshots npm install
docker exec -it -w /work/ caseisnapshots npx playwright test --update-snapshots
docker stop caseisnapshots