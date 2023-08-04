<script>
    import GameSubmission from '$lib/components/GameSubmission.svelte'
    import PerformanceChart from '$lib/components/PerformanceChart.svelte'
    import logo from '$lib/assets/logo2.jpg'
</script>
<header class="grid place-content-center">
  <img src="{logo}" alt="stop it goaltending" class="h-full w-72">
  <h1 class="text-3xl font-bold text-center">Game Logger</h1>
</header>

<main class="px-10 bg-black text-white">
  <div class="flex gap-20 my-8 justify-center">
    <a href="/pregame" class="btn">Do Your PreGame Exercise</a>
    <a href="/postgame" class="btn">Do Your PostGame Exercise</a>
  </div>
  <div>
    <h2 class="text-2xl font-bold">Performance Chart</h2>
    <PerformanceChart />
  </div>
  <hr class="py-2">
  <GameSubmission />
</main>

<style>
  .btn {
    @apply border border-white rounded py-3 px-6;
  }
  .btn:hover {
    background-color: #e51736;
    border: 1px solid #e51736;
  }
</style>