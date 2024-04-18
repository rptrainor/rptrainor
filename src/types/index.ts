type NumericUnit = "millisecond" | "unitless";
type ScoreDisplayMode = "numeric" | "binary";

export type LighthouseData = {
  id: string; // => ID will be the page url
  audits: {
    'first-contentful-paint': DataRunOutput;
    'largest-contentful-paint': DataRunOutput;
    'interactive': DataRunOutput;
    'max-potential-fid': DataRunOutput;
    'cumulative-layout-shift': DataRunOutput;
    'server-response-time': DataRunOutput;
    'total-blocking-time': DataRunOutput;
    'speed-index': DataRunOutput;
    'first-meaningful-paint': DataRunOutput;
  },
  perf: number;
  lcp: number;
  fid: number;
  cls: number;
  tbt: number;
  fcp: number;
  tti: number;
  average_conversion_value: string;
  current_monthly_traffic: string;
};

export type DataRunOutput = {
  id: string; // => lighthouse field id
  title: string; // => readable title
  description: string;
  score: number;
  scoreDisplayMode: ScoreDisplayMode;
  displayValue: string;
  numericValue: number;
  numericUnit: NumericUnit;
};
