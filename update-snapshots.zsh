#!/bin/zsh
docker run -t -d --name "caseisnapshots" --rm --network host -v $(pwd):/work/ -w /work/ mcr.microsoft.com/playwright:v1.22.2-focal
docker exec -it -w /work/ caseisnapshots npm install
docker exec -it -w /work/ --env "DEBUG=pw:test*" caseisnapshots xvfb-run npx playwright test --workers 1 --update-snapshots
docker stop caseisnapshots