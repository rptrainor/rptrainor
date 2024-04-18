import { createSignal } from "solid-js";

const [service, setService] = createSignal('Build + Manage');

const PricingSwitch = () => {
  return (
    <div class="w-full">
      <h2 class="text-balance text-center text-lg font-semibold text-white">
        Choose Your Service Level
      </h2>
      <fieldset
        class="mx-auto grid w-full max-w-[325px] grid-cols-2 place-items-center gap-x-0 rounded-full bg-white/10 py-1 text-center text-xs font-semibold leading-5 text-white xs:text-sm sm:text-base"
      >
        <legend class="sr-only">Choose Your Service Level</legend>
        <label class="group cursor-pointer rounded-full px-1 py-1 sm:px-2.5 hover:animate-hover-pop">
          <input
            type="radio"
            name="service"
            value="Build Only"
            class="sr-only"
            onChange={() => setService('Build Only')}
            checked={service() === 'Build Only'}
          />
          <span
            class={service() === 'Build Only'
              ? 'rounded-full bg-white text-background px-[0.12rem] sm:px-2.5 xs:px-1 py-1'
              : 'cursor-pointer'}
          >
            Build Only
          </span>
        </label>
        <label class="group cursor-pointer rounded-full px-1 py-1 sm:px-2.5 hover:animate-hover-pop">
          <input
            type="radio"
            name="service"
            value="Build + Manage"
            class="sr-only"
            onChange={() => setService('Build + Manage')}
            checked={service() === 'Build + Manage'}
          />
          <span
            class={service() === 'Build + Manage'
              ? 'rounded-full bg-white text-background px-[0.12rem] sm:px-2.5 xs:px-1 py-1'
              : 'cursor-pointer'}
          >
            Build + Manage
          </span>
        </label>
      </fieldset>
    </div>

  )
};

export { service }
export default PricingSwitch;