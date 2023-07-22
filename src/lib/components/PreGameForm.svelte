<script>
  import {createEventDispatcher} from 'svelte';
  import {supabase} from '../supabaseClient'

  const dispatch = createEventDispatcher();
  let preGameFormData = {
    game_date: '',
    game_opponent: '',
    pre_confidence: 0,
    pre_focus: 0,
    pre_excitement: 0,
    pre_physically_prep: '',
    pre_mentally_prep: ''
  }

  // local storage handling
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   localStorage.setItem('formData', JSON.stringify(preGameFormData))
  //   dispatch('preGameFormSubmitted')
  // }

  // supabase handling of form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data, error} = await supabase.from('game-log-data').insert([preGameFormData])
      if (error) {
        console.error(error)
      } else {
        console.log('Pre Game Form data submitted successfully', data)
        dispatch('preGameFormSubmitted')
      }
    } catch (error) {
      console.error('error in submitting pregame form', error)
    }
  }
</script>

<h2>Pre-Game Log</h2>
<form on:submit={handleSubmit}>
    <label for="date">
      Date:
      <input type="date" name="date" id="date" bind:value={preGameFormData.game_date}>
    </label>
    <label for="opponent">
      Opponent:
      <input type="text" name="opponent" id="opponent" bind:value={preGameFormData.game_opponent}>
    </label>

    <label for="confidence-level">
      Current Confidence Level:
      <input type="range" name="confidence-range" id="confidence-range" bind:value="{preGameFormData.pre_confidence}" min="0" max="10">
      <output for="confidence-range" id="confidence-level">{preGameFormData.pre_confidence}</output>
    </label>

    <label for="focus-level">
      Current Focus Level:
      <input type="range" name="focus-range" id="focus-range" bind:value="{preGameFormData.pre_focus}" min="0" max="10">
      <output for="focus-range" id="focus-level">{preGameFormData.pre_focus}</output>
    </label>

    <label for="excitement-level">
      Current Excitement Level:
      <input type="range" name="excitement-range" id="excitement-range" bind:value="{preGameFormData.pre_excitement}" min="0" max="10">
      <output for="excitement-range" id="excitement-level">{preGameFormData.pre_excitement}</output>
    </label>

    <h3>Are you physically prepared?</h3>
    <label for="physically-yes">
      <input type="radio" name="physically-yes" id="physically-yes" value="yes" bind:group={preGameFormData.pre_physically_prep}>
      Yes
    </label>
    <label for="physically-no">
      <input type="radio" name="physically-no" id="physically-no" value="no" bind:group={preGameFormData.pre_physically_prep}>
      NO
    </label>

    <h3>Are you mentally prepared?</h3>
    <label for="mentally-yes">
      <input type="radio" name="mentally-yes" id="mentally-yes" value="yes" bind:group={preGameFormData.pre_mentally_prep}>
      Yes
    </label>
    <label for="physically-no">
      <input type="radio" name="phypsically-no" id="physically-no" value="no" bind:group={preGameFormData.pre_mentally_prep}>
      NO
    </label>

    <button type="submit">
      Submit
    </button>
</form>
