import { createMemo } from 'solid-js';

import { type DataRunOutput } from "../types";
import ScoreChart, { getClassByScore } from "./ScoreChart";
import { resultFormStore } from "../stores/resultFormStore";

type Props = {
  web_page_url: string;
  strategy: string;
  firstContentfulPaint: DataRunOutput | undefined;
  speedIndex: DataRunOutput | undefined;
  timeToInteractive: DataRunOutput | undefined;
  firstMeaningfulPaint: DataRunOutput | undefined;
  largestContentfulPaint: DataRunOutput | undefined;
  firstInputDelay: DataRunOutput | undefined;
  cumulativeLayoutShift: DataRunOutput | undefined;
  timeToFirstByte: DataRunOutput | undefined;
  totalBlockingTime: DataRunOutput | undefined;
  perf: number;
};

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function PagespeedDisplay(props: Props) {

  const improved_conversion_rate = createMemo(() => {
    const baseConversionRate = parseFloat(resultFormStore.current_conversion_rate || "0");
  
    const currentLCPScore = props.largestContentfulPaint?.score || 0;

    // Calculate improvement factor based on Rakuten's observed outcome
    const improvementFactor = (1 - currentLCPScore) * 0.6113;
  
    // Calculate the improved conversion rate based on the improvement factor
    const improvedConversionRate = baseConversionRate + (baseConversionRate * improvementFactor);
  
    // Cap the conversion rate at 100%
    const standardizedConversionRate = improvedConversionRate > 100 ? 100 : improvedConversionRate;
  
    return parseFloat(standardizedConversionRate.toFixed(2));
  });
  
  const current_conversion_count = createMemo(() => {
    const number_of_traffic = parseFloat(resultFormStore.current_monthly_traffic || "0");
    return number_of_traffic * (parseFloat(resultFormStore.current_conversion_rate || "0") / 100)
  });

  const improved_conversion_count = createMemo(() => {
    const number_of_traffic = parseFloat(resultFormStore.current_monthly_traffic || "0");
    return number_of_traffic * (improved_conversion_rate() / 100)
  });

  const current_monthly_revenue = createMemo(() => {
    const number_of_traffic = parseFloat(resultFormStore.current_monthly_traffic || "0");
    return number_of_traffic * (parseFloat(resultFormStore.current_conversion_rate || "0") / 100) * parseFloat(resultFormStore.current_conversion_value || "0")
  });

  const improved_monthly_revenue = createMemo(() => {
    const number_of_traffic = parseFloat(resultFormStore.current_monthly_traffic || "0");
    return number_of_traffic * (improved_conversion_rate() / 100) * parseFloat(resultFormStore.current_conversion_value || "0")
  });

  return (
    <>
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-2 gap-y-4 grid-rows-auto col-span-3 col-start-1 row-start-2">

        <div class="flex flex-col">
          <p class="text-lg font-medium leading-6 text-gray-200">Performance Score</p>
          <p class="flex items-baseline gap-x-2 flex-col">
            <span class="text-lg text-slow uppercase font-semibold">Now</span>
            <span class="text-2xl font-semibold tracking-tight text-white">{(props.perf * 100).toFixed(0)}</span>
          </p>
          <p class="flex items-baseline gap-x-2 flex-col">
            <span class="text-lg text-fast uppercase font-semibold">Improved</span>
            <span class="text-2xl font-semibold tracking-tight text-white">100</span>
          </p>
        </div>

        <div class="flex flex-col">
          <p class="text-lg font-medium leading-6 text-gray-200">Conversion Rate</p>
          <p class="flex items-baseline gap-x-2 flex-col">
            <span class="text-lg text-slow uppercase font-semibold">Now</span>
            <span class="text-2xl font-semibold tracking-tight text-white">{parseInt(resultFormStore.current_conversion_rate || "0").toFixed(2)}&#37;</span>
          </p>
          <p class="flex items-baseline gap-x-2 flex-col">
            <span class="text-lg text-fast uppercase font-semibold">Improved</span>
            <span class="text-2xl font-semibold tracking-tight text-white">{improved_conversion_rate().toFixed(2)}&#37;</span>
          </p>
        </div>

        <div class="flex flex-col">
          <p class="text-lg font-medium leading-6 text-gray-200">Monthly Conversions</p>
          <p class="flex items-baseline gap-x-2 flex-col">
            <span class="text-lg text-slow uppercase font-semibold">Now</span>
            <span class="text-2xl font-semibold tracking-tight text-white">{current_conversion_count().toFixed(0)}</span>
          </p>
          <p class="flex items-baseline gap-x-2 flex-col">
            <span class="text-lg text-fast uppercase font-semibold">Improved</span>
            <span class="text-2xl font-semibold tracking-tight text-white">{improved_conversion_count().toFixed(0)}</span>
          </p>
        </div>

        <div class="flex flex-col">
          <p class="text-lg font-medium leading-6 text-gray-200">Monthly Revenue</p>
          <p class="flex items-baseline gap-x-2 flex-col">
            <span class="text-lg text-slow uppercase font-semibold">Now</span>
            <span class="text-2xl font-semibold tracking-tight text-white">{usd.format(current_monthly_revenue())}</span>
          </p>
          <p class="flex items-baseline gap-x-2 flex-col">
            <span class="text-lg text-fast uppercase font-semibold">Improved</span>
            <span class="text-2xl font-semibold tracking-tight text-white">{usd.format(improved_monthly_revenue())}</span>
          </p>
        </div>

      </div>

      <dl class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 grid-rows-auto col-span-3 col-start-1 row-start-3">

        <div class="relative overflow-hidden rounded-xl">
          <dt>
            <ScoreChart score={props.firstContentfulPaint?.score} variant="small" />

            <p class="ml-16 truncate text-lg font-medium text-white">{props.firstContentfulPaint?.title}</p>
          </dt>
          <dd class="ml-16 flex flex-col items-baseline">
            <p class={`${getClassByScore(props.firstContentfulPaint?.score || 0)} text-2xl font-semibold`}>{props.firstContentfulPaint?.displayValue}</p>
            <p class='text-gray-200 text-sm text-wrap max-w-full'>First Contentful Paint marks the time at which the first text or image is painted.</p>
          </dd>
        </div>

        <div class="relative overflow-hidden rounded-xl">
          <dt>
            <ScoreChart score={props.largestContentfulPaint?.score} variant="small" />

            <p class="ml-16 truncate text-lg font-medium text-white">{props.largestContentfulPaint?.title}</p>
          </dt>
          <dd class="ml-16 flex flex-col items-baseline">
            <p class={`${getClassByScore(props.largestContentfulPaint?.score || 0)} text-2xl font-semibold`}>{props.largestContentfulPaint?.displayValue}</p>
            <p class='text-gray-200 text-sm text-wrap max-w-full'>Largest Contentful Paint marks the time at which the largest text or image is painted</p>
          </dd>
        </div>

        <div class="relative overflow-hidden rounded-xl">
          <dt>
            <ScoreChart score={props.totalBlockingTime?.score} variant="small" />

            <p class="ml-16 truncate text-lg font-medium text-white">{props.totalBlockingTime?.title}</p>
          </dt>
          <dd class="ml-16 flex flex-col items-baseline">
            <p class={`${getClassByScore(props.totalBlockingTime?.score || 0)} text-2xl font-semibold`}>{props.totalBlockingTime?.displayValue}</p>
            <p class='text-gray-200 text-sm text-wrap max-w-full'>Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds</p>
          </dd>
        </div>

        <div class="relative overflow-hidden rounded-xl">
          <dt>
            <ScoreChart score={props.cumulativeLayoutShift?.score} variant="small" />

            <p class="ml-16 truncate text-lg font-medium text-white">{props.cumulativeLayoutShift?.title}</p>
          </dt>
          <dd class="ml-16 flex flex-col items-baseline">
            <p class={`${getClassByScore(props.cumulativeLayoutShift?.score || 0)} text-2xl font-semibold`}>{props.cumulativeLayoutShift?.displayValue}</p>
            <p class='text-gray-200 text-sm text-wrap max-w-full'>Cumulative Layout Shift measures the movement of visible elements within the viewport.</p>
          </dd>
        </div>

        <div class="relative overflow-hidden rounded-xl">
          <dt>
            <ScoreChart score={props.firstInputDelay?.score} variant="small" />

            <p class="ml-16 truncate text-lg font-medium text-white">{props.firstInputDelay?.title}</p>
          </dt>
          <dd class="ml-16 flex flex-col items-baseline">
            <p class={`${getClassByScore(props.firstInputDelay?.score || 0)} text-2xl font-semibold`}>{props.firstInputDelay?.displayValue}</p>
            <p class='text-gray-200 text-sm text-wrap max-w-full'>The maximum potential First Input Delay that your users could experience is the duration of the longest task.</p>
          </dd>
        </div>

        <div class="relative overflow-hidden rounded-xl">
          <dt>
            <ScoreChart score={props.speedIndex?.score} variant="small" />

            <p class="ml-16 truncate text-lg font-medium text-white">{props.speedIndex?.title}</p>
          </dt>
          <dd class="ml-16 flex flex-col items-baseline">
            <p class={`${getClassByScore(props.speedIndex?.score || 0)} text-2xl font-semibold`}>{props.speedIndex?.displayValue}</p>
            <p class='text-gray-200 text-sm text-wrap max-w-full'>Speed Index shows how quickly the contents of a page are visibly populated</p>
          </dd>
        </div>

      </dl>
    </>
  );
}
