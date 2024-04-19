import { createSignal, createResource, Switch, Match, Suspense, createEffect, createMemo, onCleanup } from "solid-js";
import type { LighthouseData } from "../types";
import PagespeedDisplay from "./PagespeedDisplay";
import Loader from "./Loader";

type FetchProps = {
  web_page_url: string,
  strategy: string,
  current_conversion_value: number, // Changed to number
  current_monthly_traffic: number, // Changed to number
  current_conversion_rate: number // Changed to number
};

const sanitizeInputValue = (value: string, defaultValue: number): number => {
  const sanitizedValue = parseFloat(value.replace(/[^0-9.]/g, '')); // Remove non-numeric characters
  return isNaN(sanitizedValue) ? defaultValue : sanitizedValue;
};

const fetchPagespeedData = async (props: FetchProps) => {
  if (!props.web_page_url) return;
  const queryParams = new URLSearchParams({
    web_page_url: props.web_page_url,
    strategy: props.strategy,
    current_conversion_value: props.current_conversion_value.toString(),
    current_monthly_traffic: props.current_monthly_traffic.toString(),
    current_conversion_rate: props.current_conversion_rate.toString() // Assume this API can handle floats
  }).toString();
  const API_URL = `/api/pagespeed?${queryParams}`;
  const response = await fetch(API_URL);
  return response.json() as Promise<LighthouseData>;
};

type Props = {
  web_page_url: string;
  strategy: string;
  current_conversion_value: string;
  current_monthly_traffic: string;
  current_conversion_rate: string;
};

const PagespeedResults = (props: Props) => {
  const [width, setWidth] = createSignal(0);

  // Sanitize and validate input values
  const sanitizedValues = {
    current_conversion_rate: sanitizeInputValue(props.current_conversion_rate, 2), // Default to 2%
    current_monthly_traffic: sanitizeInputValue(props.current_monthly_traffic, 1650), // Default to 1650
    current_conversion_value: sanitizeInputValue(props.current_conversion_value, 42) // Default to $42
  };

  const [resourceParams] = createSignal({
    web_page_url: props.web_page_url,
    strategy: props.strategy || 'mobile',
    current_conversion_value: sanitizedValues.current_conversion_value,
    current_monthly_traffic: sanitizedValues.current_monthly_traffic,
    current_conversion_rate: sanitizedValues.current_conversion_rate
  });

  const [data] = createResource(resourceParams, fetchPagespeedData);

  createEffect(() => {
    if (data.loading) {
      const intervalId = setInterval(() => {
        setWidth((currentWidth) => currentWidth + 1);
      }, 1200);

      onCleanup(() => clearInterval(intervalId));
    }
  });

  const testCountString = createMemo(() => {
    const testCount = (width() / 10).toFixed();
    const isCompletedTestCountPlural = testCount === '1' ? '' : 's';
    return `Completed ${testCount} test${isCompletedTestCountPlural}`;
  });

  return (
      <Suspense fallback={
        <>
          <div class="col-span-3 col-start-1 row-start-2 place-content-end"><p class="text-white w-full text-center uppercase animate-pulse">Completed 0 tests</p></div>
          <div class="col-span-3 col-start-1 row-start-3"><Loader width={0} /></div>
        </>
      }>
        <Switch fallback={
                <>
                <div class="col-span-3 col-start-1 row-start-2 place-content-end"><p class="text-white w-full text-center uppercase animate-pulse">Completed 0 tests</p></div>
                <div class="col-span-3 col-start-1 row-start-3"><Loader width={0} /></div>
              </>
        }>
          <Match when={data.loading}>
            <>
              <div class="col-span-3 col-start-1 row-start-2 place-content-end"><p class="text-white w-full text-center uppercase animate-pulse">{testCountString()}</p></div>
              <div class="col-span-3 col-start-1 row-start-3"><Loader width={width()} /></div>
            </>
          </Match>
          <Match when={data.error}>
            <PagespeedDisplay
              web_page_url={props.web_page_url}
              strategy={props.strategy}
              current_conversion_value={props.current_conversion_value}
              current_monthly_traffic={props.current_monthly_traffic}
              current_conversion_rate={props.current_conversion_rate}
              firstContentfulPaint={data()?.audits['first-contentful-paint']}
              speedIndex={data()?.audits['speed-index']}
              timeToInteractive={data()?.audits['interactive']}
              firstMeaningfulPaint={data()?.audits['first-meaningful-paint']}
              largestContentfulPaint={data()?.audits['largest-contentful-paint']}
              firstInputDelay={data()?.audits['max-potential-fid']}
              cumulativeLayoutShift={data()?.audits['cumulative-layout-shift']}
              timeToFirstByte={data()?.audits['server-response-time']}
              totalBlockingTime={data()?.audits['total-blocking-time']}
              perf={data()?.perf ?? 0}
            />
          </Match>
          <Match when={data()}>
            <PagespeedDisplay
              web_page_url={props.web_page_url}
              strategy={props.strategy}
              current_conversion_value={props.current_conversion_value}
              current_monthly_traffic={props.current_monthly_traffic}
              current_conversion_rate={props.current_conversion_rate}
              firstContentfulPaint={data()?.audits['first-contentful-paint']}
              speedIndex={data()?.audits['speed-index']}
              timeToInteractive={data()?.audits['interactive']}
              firstMeaningfulPaint={data()?.audits['first-meaningful-paint']}
              largestContentfulPaint={data()?.audits['largest-contentful-paint']}
              firstInputDelay={data()?.audits['max-potential-fid']}
              cumulativeLayoutShift={data()?.audits['cumulative-layout-shift']}
              timeToFirstByte={data()?.audits['server-response-time']}
              totalBlockingTime={data()?.audits['total-blocking-time']}
              perf={data()?.perf ?? 0}
            />
          </Match>
        </Switch>
      </Suspense>
  );
};

export default PagespeedResults;
