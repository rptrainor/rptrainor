import { createResource, Switch, createSignal, Match, Suspense, createEffect, createMemo, onCleanup } from "solid-js";
import PagespeedDisplay from "./PagespeedDisplay";
import Loader from "./Loader";
import { fetchWithTimeout } from "./fetchWithTimeout";

interface TestResult {
    statusCode: number;
    data: any;  // Define a more specific type or interface for the data if possible
}

interface ApiResponse {
    statusCode: number;
    testId?: string;
    resultsUrl?: string;
    message?: string;
}


const pollForResults = async (jsonUrl: string, retryInterval = 10000, timeout = 3333): Promise<TestResult> => {
    while (true) {
        try {
            // console.log(`Polling results from: ${jsonUrl}`);
            const response = await fetchWithTimeout(jsonUrl, { timeout });
            if (!response.ok) {
                throw new Error(`Server responded with an error: ${response.status}`);
            }

            const data: TestResult = await response.json();
            // console.log(`Received data: ${JSON.stringify(data)}`);
            switch (data.statusCode) {
                case 200:
                    // console.log('Test completed successfully.');
                    return data;  // Test completed successfully
                case 101:
                    // console.log('Test still running, retrying...');
                    await new Promise(resolve => setTimeout(resolve, retryInterval));
                    break;  // Continue the loop after a delay
                case 100:
                    // console.log('Just started test still running, retrying...');
                    await new Promise(resolve => setTimeout(resolve, retryInterval));
                    break;  // Continue the loop after a delay
                default:
                    // console.log(`Unexpected status code received: ${data.statusCode}`);
                    throw new Error(`Test failed or unavailable, status code: ${data.statusCode}`);
            }
        } catch (error) {
            // console.error('Error polling for results:', error);
            throw error;  // Rethrow to be caught by the caller
        }
    }
};


const fetchPagespeedData = async (props: { web_page_url: string; strategy: string }): Promise<any> => {
    const initiationResponse = await fetch(`/api/pagespeed?web_page_url=${encodeURIComponent(props.web_page_url)}&strategy=${props.strategy}`);
    if (!initiationResponse.ok) {
        throw new Error(`Failed to initiate test: ${initiationResponse.status} ${initiationResponse.statusText}`);
    };

    const initiationData: ApiResponse = await initiationResponse.json();
    if (!initiationData.resultsUrl) {
        throw new Error('Response did not contain results URL')
    };

    return await pollForResults(initiationData.resultsUrl);
};

type Props = {
    web_page_url: string;
    strategy: string;
    current_conversion_rate: string;
    current_monthly_traffic: string;
    current_conversion_value: string;
};

const PagespeedResults = (props: Props) => {
    const [width, setWidth] = createSignal(0);
    const [data] = createResource(() => fetchPagespeedData(props), {
        initialValue: []
    });

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
                    {null}
                </Match>
                <Match when={data()}>
                    <PagespeedDisplay
                        web_page_url={props.web_page_url}
                        strategy={props.strategy}
                        current_conversion_value={props.current_conversion_value}
                        current_monthly_traffic={props.current_monthly_traffic}
                        current_conversion_rate={props.current_conversion_rate}
                        firstContentfulPaint={data()?.data?.lighthouse?.audits["first-contentful-paint"]}
                        speedIndex={data()?.data?.lighthouse?.audits['speed-index']}
                        timeToInteractive={data()?.data?.lighthouse?.audits['interactive']}
                        firstMeaningfulPaint={data()?.data?.lighthouse?.audits['first-meaningful-paint']}
                        largestContentfulPaint={data()?.data?.lighthouse?.audits['largest-contentful-paint']}
                        firstInputDelay={data()?.data?.lighthouse?.audits['max-potential-fid']}
                        cumulativeLayoutShift={data()?.data?.lighthouse?.audits['cumulative-layout-shift']}
                        timeToFirstByte={data()?.data?.lighthouse?.audits['server-response-time']}
                        totalBlockingTime={data()?.data?.lighthouse?.audits['total-blocking-time']}
                        perf={data()?.data?.lighthouse?.categories?.performance?.score ?? 0}
                    />
                </Match>
            </Switch>
        </Suspense>
    );
};

export default PagespeedResults;
