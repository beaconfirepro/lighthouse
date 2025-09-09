'use client';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const connectionString = process.env.NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING;

export const appInsights =
  connectionString
    ? new ApplicationInsights({ config: { connectionString } })
    : undefined;

appInsights?.loadAppInsights();

export const trackPageView = () => appInsights?.trackPageView();
