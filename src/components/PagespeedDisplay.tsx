import { createMemo } from 'solid-js';

import { type DataRunOutput } from "../types";
import ScoreChart, { getClassByScore } from "./ScoreChart";

type Props = {
  web_page_url: string;
  strategy: string;
  current_conversion_rate: string;
  current_monthly_traffic: string;
  current_conversion_value: string;
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
    const baseConversionRate = parseFloat(props.current_conversion_rate || "0");

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
    const number_of_traffic = parseFloat(props.current_monthly_traffic || "0");
    return number_of_traffic * (parseFloat(props.current_conversion_rate || "0") / 100)
  });

  const improved_conversion_count = createMemo(() => {
    const number_of_traffic = parseFloat(props.current_monthly_traffic || "0");
    return number_of_traffic * (improved_conversion_rate() / 100)
  });

  const current_monthly_revenue = createMemo(() => {
    const number_of_traffic = parseFloat(props.current_monthly_traffic || "0");
    return number_of_traffic * (parseFloat(props.current_conversion_rate || "0") / 100) * parseFloat(props.current_conversion_value || "0")
  });

  const improved_monthly_revenue = createMemo(() => {
    const number_of_traffic = parseFloat(props.current_monthly_traffic || "0");
    return number_of_traffic * (improved_conversion_rate() / 100) * parseFloat(props.current_conversion_value || "0")
  });

  return (
    <>
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-4 grid-rows-auto col-span-3 col-start-1 row-start-3">

        <div class="flex flex-col bg-brand_gray rounded-xl border border-black px-4 py-2">
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

        <div class="flex flex-col bg-brand_gray rounded-xl border border-black px-4 py-2">
          <p class="text-lg font-medium leading-6 text-gray-200">Conversion Rate</p>
          <p class="flex items-baseline gap-x-2 flex-col">
            <span class="text-lg text-slow uppercase font-semibold">Now</span>
            <span class="text-2xl font-semibold tracking-tight text-white">{parseInt(props.current_conversion_rate || "0").toFixed(2)}&#37;</span>
          </p>
          <p class="flex items-baseline gap-x-2 flex-col">
            <span class="text-lg text-fast uppercase font-semibold">Improved</span>
            <span class="text-2xl font-semibold tracking-tight text-white">{improved_conversion_rate().toFixed(2)}&#37;</span>
          </p>
        </div>

        <div class="flex flex-col bg-brand_gray rounded-xl border border-black px-4 py-2">
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

        <div class="flex flex-col bg-brand_gray rounded-xl border border-black px-4 py-2">
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
    </>
  );
}
