// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const getBaseUrl = (): string => {
  if(window.location.href.match(/localhost/) !== null) {
    return 'http://localhost:3000';
  }
  if(window.location.href.match(/github/) !== null) {
    return 'https://lakhveerchahal-super-duper-computing-9j7jvx4w4pw29xp6-3000.preview.app.github.dev';
  }
  if(window.location.href.match(/gitpod/) !== null) {
    return 'https://3000-lakhveerchahal-mapchat-98yso9v04p0.ws-us83.gitpod.io';
  }
  return 'http://localhost:3000';
}

export const environment = {
  production: false,
  baseUrl: getBaseUrl(),
  mapboxAccessToken: 'pk.eyJ1IjoibGFraHZlZXItY2hhaGFsIiwiYSI6ImNreG12M3MxYjBxNG8ycGtvdTZhM2d3NGsifQ.PJWMHzFUX0g0yxT_3YY-6Q',
  supabaseUrl: 'https://oxugcoujdesmsjdwkgqg.supabase.co',
  supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94dWdjb3VqZGVzbXNqZHdrZ3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgwNTIzNzQsImV4cCI6MTk3MzYyODM3NH0.Kseu2SujLhFet7SLITDRiUHg0etSS-yvaAh55cTVQNA'
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
