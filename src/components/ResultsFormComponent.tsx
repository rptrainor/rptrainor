import { createSignal } from 'solid-js';
import PagespeedResults from '../components/PagespeedResults'

type Props = {
  web_page_url: string;
  strategy: string;
  current_conversion_rate: string;
  current_conversion_value: string;
  current_monthly_traffic: string;
};

const ResultsFormComponent = (props: Props) => {
  const [currentConversionValue, setCurrentConversionValue] = createSignal(props.current_conversion_value);
  const [currentConversionRate, setCurrentConversionRate] = createSignal(props.current_conversion_rate);
  const [currentMonthlyTraffic, setCurrentMonthlyTraffic] = createSignal(props.current_monthly_traffic);

  return (
    <>
      <form class="col-span-3 h-full place-content-start mx-auto w-fit max-w-4xl">
        <div>
          <div class="grid grid-cols-6 gap-x-1 gap-y-2 xs:gap-x-4 xs:gap-y-4 max-w-xl mx-auto">
            <div class="col-span-3 sm:col-span-2">
              <label
                for="current_conversion_rate"
                class="block text-xs font-medium leading-6 text-white xs:text-sm"
              >
                Conversion rate
              </label>
              <div class="relative mt-2 rounded-xl shadow-sm">
                <input
                  type="text"
                  min="0"
                  max="100"
                  step="1"
                  placeholder="0"
                  name="current_conversion_rate"
                  id="current_conversion_rate"
                  aria-describedby="current_conversion_rate"
                  class="focus:ring-contrast block w-full rounded-xl border-0 bg-brand_gray py-1.5 pr-8 text-white placeholder-white/60 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  value={currentConversionRate()}
                  onChange={(e) => setCurrentConversionRate(e.target.value)}
                />
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span class="text-white sm:text-sm">&#37;</span>
                </div>
              </div>
            </div>

            <div class="col-span-3 sm:col-span-2">
              <label
                for="current_conversion_value"
                class="block text-xs font-medium leading-6 text-white xs:text-sm"
              >
                Conversion value
              </label>
              <div class="relative mt-2 rounded-xl shadow-sm">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span class="text-white sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  name="current_conversion_value"
                  id="current_conversion_value"
                  class="focus:ring-contrast block w-full rounded-xl border-0 bg-brand_gray py-1.5 pl-7 pr-12 text-white placeholder-white/60 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="0.00"
                  aria-describedby="current_conversion_value"
                  value={currentConversionValue()}
                  onChange={(e) => setCurrentConversionValue(e.target.value)}
                />
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span class="text-white sm:text-sm" id="price-currency">USD</span>
                </div>
              </div>
            </div>
            <div class="col-span-6 sm:col-span-2">
              <label
                for="current_monthly_traffic"
                class="block text-xs font-medium leading-6 text-white xs:text-sm"
              >
                Monthly traffic
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  placeholder="0"
                  name="current_monthly_traffic"
                  id="current_monthly_traffic"
                  class="focus:ring-contrast block w-full rounded-xl border-0 bg-brand_gray py-1.5 text-white placeholder-white/60 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  value={currentMonthlyTraffic()}
                  onChange={(e) => setCurrentMonthlyTraffic(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </form >
      <div class="col-span-3 col-start-1 row-start-3 flex flex-col justify-start w-full mx-auto max-w-3xl">
        <PagespeedResults
          web_page_url={props.web_page_url}
          strategy={props.strategy}
          current_conversion_rate={currentConversionRate()}
          current_conversion_value={currentConversionValue()}
          current_monthly_traffic={currentMonthlyTraffic()}
        />
      </div>
    </>
  )
};

export default ResultsFormComponent;