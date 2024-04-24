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
      <form class="col-span-3 h-full place-content-end">
        <div class="space-y-2 xs:space-y-4">
          <h1
            class="w-full text-balance text-center text-xl font-semibold text-white xs:text-3xl md:text-4xl"
          >
            Google Core Web Vitals ROI Calculator
          </h1>
          <p
            class="mt-1 w-full text-balance text-center text-xs text-gray-200 xs:text-sm md:text-lg"
          >
            Find out how much money you are losing due to slow-loading pages.
          </p>
        </div>

        <div>
          <div class="grid grid-cols-8 gap-x-1 gap-y-2 xs:gap-x-4 xs:gap-y-4">
            <div class="col-span-full">
              <label
                for="web_page_url"
                class="block text-xs font-medium leading-6 text-white xs:text-sm"
              >
                Landing page URL
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="web_page_url"
                  id="web_page_url"
                  autocomplete="url"
                  required
                  placeholder="https://example.com/landing-page"
                  value={props.web_page_url}
                  class="block w-full rounded-xl border-0 bg-white/10 py-1.5 text-white placeholder-white/60 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-contrast sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="col-span-4 xs:col-span-4 sm:col-span-2">
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
                  class="focus:ring-contrast block w-full rounded-xl border-0 bg-white/10 py-1.5 pr-8 text-white placeholder-white/60 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  value={currentConversionRate()}
                  onChange={(e) => setCurrentConversionRate(e.target.value)}
                />
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span class="text-white sm:text-sm">&#37;</span>
                </div>
              </div>
            </div>

            <div class="col-span-4 xs:col-span-4 sm:col-span-2">
              <label
                for="strategy"
                class="block text-xs font-medium leading-6 text-white xs:text-sm">
                Device
              </label>
              <div class="mt-2">
                <select
                  id="strategy"
                  name="strategy"
                  class="block w-full rounded-xl border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-contrast sm:text-sm sm:leading-6 [&_*]:text-black"
                >
                  <option value="mobile" selected={props.strategy === 'mobile'}>Mobile</option>
                  <option value="desktop" selected={props.strategy === 'desktop'}>Desktop</option>
                </select>
              </div>
            </div>

            <div class="col-span-full xs:col-span-4 sm:col-span-2">
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
                  class="focus:ring-contrast block w-full rounded-xl border-0 bg-white/10 py-1.5 pl-7 pr-12 text-white placeholder-white/60 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
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
            <div class="col-span-full xs:col-span-4 sm:col-span-2">
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
                  class="focus:ring-contrast block w-full rounded-xl border-0 bg-white/10 py-1.5 text-white placeholder-white/60 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  value={currentMonthlyTraffic()}
                  onChange={(e) => setCurrentMonthlyTraffic(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div class='mt-4 flex items-center justify-end'>
          <button
            type="submit"
            class="rounded-xl border-contrast bg-white px-3 py-2 text-sm font-semibold text-background shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-contrast"
          >
            Calculate
          </button>
        </div>
      </form >
      <PagespeedResults
        web_page_url={props.web_page_url}
        strategy={props.strategy}
        current_conversion_rate={currentConversionRate()}
        current_conversion_value={currentConversionValue()}
        current_monthly_traffic={currentMonthlyTraffic()}
      />
    </>
  )
};

export default ResultsFormComponent;