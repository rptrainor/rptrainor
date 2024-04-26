import posthog from 'posthog-js'
import { createEffect } from 'solid-js'

const Posthog = () => {

  createEffect(() => {
    posthog.init('phc_zNb4WiofibhVaL5DbrRrUBKwAWDZsH1OlkRB1iQSO3O', { api_host: '"https://us.i.posthog.com"' })
  })
  return (
    <></>
  )
}