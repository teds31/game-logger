  <script>
    import {supabase} from '$lib/supabaseClient.js'
    let preGameLog = []
    let postGameLog = []
    let gameLog;
    let gameLogs = []

    const getPreGameData = async () => {
      try {
        const {data, error} = await supabase.from('pre-game-log-data').select('*')
        if (error) {
          console.error(error)
        } else {
          preGameLog = data;
        }
      } catch (error) {
        console.error('error in getting pregame data', error)
      }
    }

    const getPostGameData = async () => {
      try {
        const {data, error} = await supabase.from('post-game-log-data').select('*')
        if (error) {
          console.error(error)
        } else {
          postGameLog = data;
        }
      } catch (error) {
        console.error('error in getting postgame data', error)
      }
    }

    const getLogData = async () => {
      await getPreGameData()
      await getPostGameData()
    }

    const addToArray = async () => {
      if (preGameLog.length !== 0 && postGameLog.length !== 0) {
        for (let i = 0; i < preGameLog.length; i++) {
          gameLog = {
            preGameLog: preGameLog[i],
            postGameLog: postGameLog[i]
          }
          gameLogs.push(gameLog)
        }
      }
    }
</script>

<h2 class="text-2xl font-bold">Previous Game Logs</h2>
<div class="game-logs-container p-4 bg-black text-white grid grid-rows-2 grid-flow-col gap-12">
  {#await getLogData()}
    loading game log data
  {:then value}
    {#await addToArray()}
      compiling game log data
    {:then value}
      {#each gameLogs as log}
      <div class="game-log-container">
        <div class="flex gap-6 p-1">
          <div class="flex">
            <h4 class="label">Date:</h4>
            <h4 class="value">{new Date(log.preGameLog.game_date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</h4>
          </div>
          <div class="flex justify-normal">
            <h4 class="label">Opponent:</h4>
            <h4 class="value">{log.preGameLog.game_opponent}</h4>
          </div>
        </div>
        <div class="game-log-data">
          <div class="pregame">
            <div class="flex">
              <p class="label">Pre-Confidence Level:</p>
              <p class="value">
                {log.preGameLog.pre_confidence}
              </p>
            </div>
            <div class="flex">
              <p class="label">Pre-Excitement Level:</p>
              <p class="value">
                {log.preGameLog.pre_excitement}
              </p>
            </div>
            <div class="flex">
              <p class="label">Pre-Focus Level:</p>
              <p class="value">
                {log.preGameLog.pre_focus}
              </p>
            </div>
            <div class="flex">
              <p class="label">Are You Mentally Prepared?:</p>
              <p class="value">
                {#if log.preGameLog.pre_mentally_prep === true}
                  Yes
                {:else}
                  No
                {/if}
              </p>
            </div>
            <div class="flex">
              <p class="label">Are You Mentally Prepared?:</p>
              <p class="value">
                {#if log.preGameLog.pre_physically_prep === true}
                  Yes
                {:else}
                  No
                {/if}
              </p>
            </div>
          </div>
          <div class="postgame">
            <div class="flex">
              <p class="label">Game Confidence Level:</p>
              <p class="value">
                {log.postGameLog.post_confidence}
              </p>
            </div>
            <div class="flex">
              <p class="label">Game Excitement Level:</p>
              <p class="value">
                {log.postGameLog.post_excitement}
              </p>
            </div>
            <div class="flex">
              <p class="label">Game Focus Level:</p>
              <p class="value">
                {log.postGameLog.post_focus}
              </p>
            </div>
            <div class="flex">
              <p class="label">Performance Rating:</p>
              <p class="value">
                {log.postGameLog.performance}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/each}
    {:catch error}
      <p>could not compile data</p>
    {/await}
  {:catch error}
    <p>data not found</p>
  {/await}
</div>

<style lang="postcss">
  .game-log-data {
    @apply flex justify-around mb-4 py-4 w-full;
    border: 1px solid #e51736;
  }

  h4.label {
    @apply font-bold text-lg;
    color: #e51736;
  }

  h4.value {
    @apply font-bold text-lg capitalize ml-2;
  }

  p.label {
    @apply font-bold text-base;
    color: #e51736;}
  p.value {
    @apply  text-base ml-2;
  }
</style>