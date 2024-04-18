import { Switch, Match } from "solid-js";

import { service } from "./PricingSwitch";
const Plans = () => {
  return (
    <div
      class="col-span-2 col-start-1 row-start-2 flex flex-col gap-y-4 rounded-md bg-white/5 p-4 ring-2 ring-black"
    >
      <Switch>
        <Match when={service() === 'Build + Manage'}>
          <div class="flex flex-col space-y-4 h-full">
            <h3 id="tier-startup" class="text-xl font-bold leading-8 tracking-tight text-white sm:h-16 md:h-8 xs:h-8 h-16">
              Build + Manage Service
            </h3>

            <p class="flex items-baseline gap-x-1">
              <span class="text-4xl font-bold tracking-tight text-white">$834</span>
              <span class="text-sm font-semibold leading-6 text-gray-300">/month</span>
            </p>
            <small class="block text-sm leading-snug text-gray-300 md:h-24 sm:h-28 xs:h-20 h-32 grow lg:h-20">
            Our comprehensive Done-For-You service includes expertly crafted campaigns and continuous management, designed to stabilize your lead generation and ensure sustained business growth. Experience the peace of mind that comes from having a steady stream of high-quality leads.
            </small>
            <a
              href="https://buy.stripe.com/aEU9AK2Ko2HicLufZ0"
              aria-describedby="tier-startup"
              class="block rounded-md bg-white px-3 py-2 text-center text-lg font-semibold leading-6 text-background shadow-sm hover:animate-hover-pop focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Buy plan
            </a>
          </div>
        </Match>
        <Match when={service() === 'Build Only'}>
          <div class="flex flex-col space-y-4 h-full">

            <h3 id="tier-startup" class="text-xl font-bold leading-8 tracking-tight text-white sm:h-16 md:h-8 xs:h-8 h-16">
              Build Only Service</h3>
            <p class="flex items-baseline gap-x-1">
              <span class="text-4xl font-bold tracking-tight text-white">$457</span>
              <span class="text-sm font-semibold leading-6 text-gray-300">once</span>
            </p>
            <small class="block text-sm leading-snug text-gray-300 md:h-24 sm:h-28 xs:h-20 h-32 grow lg:h-20">
            Invest once and reap the benefits indefinitely with a high-quality, professionally designed landing page crafted to convert visitors into leads efficiently.
            </small>
            <a
              href="https://buy.stripe.com/6oE28i1Gk3Lm3aUdQT"
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