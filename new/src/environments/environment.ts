// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://localhost:8001',
  socketUrl: 'ws://localhost:8001',
  OPENVIDU_SERVER_URL: 'https://video.neuraldating.com:4443',
  OPENVIDU_SERVER_SECRET: 'SECRET',
  GOOGLE_AUTH: '228193226064-4q2oavqmqd07qvma66umhadpjdvt6o6s.apps.googleusercontent.com',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
