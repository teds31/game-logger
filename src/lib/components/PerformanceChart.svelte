<script>
  import { onMount } from 'svelte'
  import {supabase} from '$lib/supabaseClient.js'
  import Chart from 'svelte-frappe-charts';
  let preGameLog = []
  let postGameLog = []
  let dateArr = []
  let performanceArr = []

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

    const createDataArr = async () => {
      preGameLog.forEach(log => {
        dateArr.push(log.game_date)
      });

      postGameLog.forEach(log => {
        log.performance = parseInt(log.performance)
        performanceArr.push(log.performance)
      });
    }

    let data;

    const getLogData = async () => {
      await getPreGameData()
      await getPostGameData()
      await createDataArr()
      data = {
        labels: dateArr,
        datasets: [
          {
            name: "Performance",
            values: performanceArr
          }
        ]
      }
    }

</script>

{#await getLogData()}
  getting chart performance data
{:then value}
<Chart data={data} type="line" />
{:catch error}
  <p>error in getting chart data</p>
{/await}


