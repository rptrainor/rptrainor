import { Switch, Match } from "solid-js";

import { service } from "./PricingSwitch";
const Plans = () => {
  return (
    <div
      class="col-span-2 col-start-1 row-start-2 flex flex-col gap-y-4 rounded-md bg-white/5 p-4 ring-2 ring-black"
    >
      <Switch>
        <Match when={service() === 'Build + Manage'}>
        <div class="flex flex-col space-y-4 justify-between sm:h-64 h-auto">
            <h3 id="tier-startup" class="text-xl font-bold leading-8 tracking-tight text-white xs:h-12 h-16">
              Build + Manage Service
            </h3>

            <p class="flex items-baseline gap-x-1">
              <span class="text-xl font-bold tracking-tight text-white">$1,247</span>
              <span class="text-sm font-semibold leading-6 text-gray-200">/month</span>
            </p>
            <small class="block text-sm leading-snug text-gray-200 grow h-auto">
              Our comprehensive Done-For-You service includes expertly crafted campaigns and continuous management, designed to stabilize your lead generation and ensure sustained business growth.
            </small>
            <a
              href="https://buy.stripe.com/28ofZ884Ia9KaDmcMQ"
              aria-describedby="tier-startup"
              class="block rounded-md bg-white px-3 py-2 text-center text-lg font-semibold leading-6 text-background shadow-sm hover:animate-hover-pop focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Buy plan
            </a>
          </div>
        </Match>
        <Match when={service() === 'Build Only'}>
          <div class="flex flex-col space-y-4 justify-between sm:h-64 h-auto">
            <h3 id="tier-startup" class="text-xl font-bold leading-8 tracking-tight text-white xs:h-12 h-16">
              Build Only Service</h3>
            <p class="flex items-baseline gap-x-1">
              <span class="text-xl font-bold tracking-tight text-white">$873</span>
              <span class="text-sm font-semibold leading-6 text-gray-200">once</span>
            </p>
            <small class="block text-sm leading-snug text-gray-200 grow h-auto">
              Invest once and reap the benefits indefinitely with a high-quality, professionally designed landing page crafted to convert visitors into leads efficiently.
            </small>
            <a
              href="https://buy.stripe.com/fZedR00Cgeq06n6149"
              aria-describedby="tier-startup"
              class="block rounded-md bg-white px-3 py-2 text-center text-lg font-semibold leading-6 text-background shadow-sm hover:animate-hover-pop focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Buy plan
            </a>
          </div>
        </Match>
      </Switch>
    </div >
  )
};

export default Plans;