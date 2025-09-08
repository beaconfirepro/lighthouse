import appInsights from 'applicationinsights';

const conn = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;

if (conn) {
  appInsights
    .setup(conn)
    .setAutoCollectConsole(true, true)
    .start();
}
