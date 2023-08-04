<script>
  import {createEventDispatcher} from 'svelte';
  import {supabase} from '../supabaseClient'

  const dispatch = createEventDispatcher();

  let postGameFormData = {

    post_confidence: 0,
    post_focus: 0,
    post_excitement: 0,
    performance: 0,
  }

  // supabase handling of form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data, error} = await supabase.from('post-game-log-data').insert([postGameFormData])
      if (error) {
        console.error(error)
      } else {
        dispatch('postGameFormSubmitted')
        console.log('post Game Form data submitted successfully', data)
      }
    } catch (error) {
      console.error('error in submitting postgame form', error)
    }
  }

</script>
<main class="h-full px-6">
  <h2 class="text-2xl text-white font-bold">Post-Game Log</h2>
  <form on:submit|preventDefault={handleSubmit} class="my-8 flex flex-col">
      <label for="post-confidence-range">
        Post Confidence Level:
        <input type="range" name="post-confidence-range" id="post-confidence-range" bind:value="{postGameFormData.post_confidence}" min="0" max="10">
        <output for="post-confidence-range" id="post-confidence-range">{postGameFormData.post_confidence}</output>
      </label>

      <label for="focus-level">
        Post Focus Level:
        <input type="range" name="focus-range" id="focus-range" bind:value="{postGameFormData.post_focus}" min="0" max="10">
        <output for="focus-range" id="focus-level">{postGameFormData.post_focus}</output>
      </label>

      <label for="excitement-level">
        Post Excitement Level:
        <input type="range" name="excitement-range" id="excitement-range" bind:value="{postGameFormData.post_excitement}" min="0" max="10">
        <output for="excitement-range" id="excitement-level">{postGameFormData.post_excitement}</output>
      </label>

      <label for="performance">
        Performance Rating:
        <input type="range" name="performance" id="performance" bind:value="{postGameFormData.performance}" min="0" max="10">
        <output for="performance" id="performance">{postGameFormData.performance}</output>
      </label>

      <button type="submit" class="text-black bg-white py-4 rounded w-48">
        Submit
      </button>
  </form>
</main>

<style lang="postcss">
  label {
    @apply my-4;
    color: #e51736;
  }
</style>