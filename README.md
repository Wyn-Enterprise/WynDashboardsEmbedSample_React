# WynDashboardsEmbedSample_React

This sample demonstrates the use of Wyn Dashboard Designer & Viewer connected to the Wyn portal in a ReactJS app.

## System requirements

This sample requires:
 * [Node.js](https://nodejs.org/en/download/) 10.14.0 or newer
 * [Wyn Enterprise](https://wyn.grapecity.com/demos/request/trial) 5.1 or newer
## Build and run the sample

### Steps

1. Open cmd.exe and go to the root directory WynDashboardsEmbedSample_React
2. Run `npm install`
3. Run `npm update @grapecity/wyn-integration --latest`
4. Run 'npm run start'

### Wyn Enterprise System Configurations for API usage
1. On the Administrator Portal after installing Wyn Enterprise, open the System Configuration Page. 
2. Add http://localhost:3000 (or the host application URL) in the "Allowed CORS Origins" section. 
3. Add 'content-disposition' and 'location' in the "Exposed Headers" section. 

### About semantic versioning

package.json
```
"package-name": "~x.y.z"
```

- x - major releases
- y - minor releases
- z - patch releases
- ~ - updating packages as instructed will update to the latest patch

### Documentation

- [Developer Documentation](https://wyn.grapecity.com/docs/dev-docs/)
