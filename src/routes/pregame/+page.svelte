<script>
  import PreGameForm from '$lib/components/PreGameForm.svelte'
//   import PreGameSubmission from '$lib/components/PreGameSubmission.svelte'

  let formSubmitted = false
</script>

{#if !formSubmitted}
   <PreGameForm on:formSubmitted={() => {formSubmitted = true}} />
{:else}
   <!-- <PreGameSubmission /> -->
   there will be data here
{/if}

<a href="/">Return to Dashboard</a>

