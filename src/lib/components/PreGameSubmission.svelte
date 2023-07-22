  <script>
    import {readable} from 'svelte/store'
    import {supabase} from '$lib/supabaseClient.js'

    const preGameFormData = ([], (set) => {
      const fetchPreGameFormData = async () => {
        try {
          const {preGameData, error} = await supabase
            .from('preGameData')
            .select('*')
            .single()
            if (error) {
              console.error(error)
            } else {
              set(preGameData)
            }
        } catch (error) {
          console.error('error fetching pregame form data', error)
        }
      }
      fetchPreGameFormData()
    })
  </script>

<h2>Pre-Game Data</h2>
{#each $preGameFormData as preGameData}
  <p>Date: {preGameData.date}</p>
  <p>Opponnent: {preGameData.opponent}</p>
  <p>Confidence Level: {preGameData.confidence_level}</p>
  <p>Focus Level: {preGameData.focus_level}</p>
  <p>Excitement Level: {preGameData.excitement_level}</p>
  <p>Were You Physically Prepared?: {preGameData.physically_prepared}</p>
  <p>Were You Mentally Prepared?: {preGameData.mentally_prepared}</p>
{/each}