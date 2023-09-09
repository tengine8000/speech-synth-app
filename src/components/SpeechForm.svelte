<script xmlns="http://www.w3.org/1999/html">
  export let voices;
  let rate = 0.82;
  let pitch = 1;
  let volume = 0.5;

  let playButtonText = 'PLAY';
  let pauseButtonText = 'PAUSE';
  let paused = false;
  let playing = false;
  let stopped = false;
  let selectedVoice;
  let text = 'Early in the morning I still get a little bit nervous\n' +
    'Fighting my anxiety constantly, I try to control it\n' +
    'Even when I know it\'s been forever I can still feel the spin\n' +
    'Hurts when I remember and I never wanna feel it again\n' +
    'Don\'t know if you get it \'cause I can\'t express how thankful I am\n' +
    'That you were always with me when it hurts, I know that you\'d understand';

  const printVoice = (voice) => {
    if(voice){
      return `${voice.name} | ${voice.lang}`;
    }
    return "";
  };
  const play = () => {
    speechSynthesis.pause();
    speechSynthesis.speak(getUtterance());
    speechSynthesis.resume();
    playing = true;
    stopped = false;
    paused = false;
  }

  const getUtterance = () => {
    speechSynthesis.cancel();
    if(!text){
      alert("Enter some text!");
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.voice = selectedVoice;
    utterance.volume = volume;
    return utterance;
  }

  const stop = () => {
    speechSynthesis.cancel()
    stopped = true;
    paused = true;
    playing = false;
  }
  const pause = () => {
    paused = !paused;
    if(paused){
      speechSynthesis.resume();
    }else {
      speechSynthesis.pause();
    }
  }

  /** @type {import('./$types').Snapshot<string>} */
  export const snapshot = {
    capture: () => text,
    restore: (value) => text = value
  };

</script>
<div class="container columns-2">
  <form method="get" id="speechForm" class="py-1 break-after-column">
    <label for="rate" class="mx-2 text-gray-100">Rate {rate}</label><br>
    <input class="mx-2 my-2" type="range" min="0.1" step="0.1" max="3" bind:value={rate} on:change={() => play()} name="rate" id="rate"/><br>

    <label for="pitch" class="mx-2 text-gray-100">Pitch {pitch}</label><br>
    <input class="mx-2 my-2" type="range" min="0.1" step="0.1" max="4" bind:value={pitch} on:change={() => play()}  name="pitch" id="pitch"/><br>

    <label for="volume" class="mx-2 text-gray-100">Volume {volume}</label><br>
    <input class="mx-2 my-2" type="range" min="0.1" step="0.1" max="1" bind:value={volume} on:change={() => play()} name="volume" id="volume"/><br>

    <label for="voice" class="mx-2 text-gray-100">Voice </label><br>
    <select id="voice" class="focus:outline-none mx-2 my-2 p-2" bind:value={selectedVoice} on:change={() => play()} >
      {#each voices as voice, index}
        <option value={voice}>🗣️ {printVoice(voice)}</option>
      {/each}
    </select><br>
    <button class="w-1/4 bg-amber-50 rounded p-1 my-6 mx-2 font-bold active:bg-amber-400 hover:bg-amber-200 focus:outline-none focus:ring focus:ring-amber-500" type="submit" on:click={() => play()}>
      {playButtonText}
    </button>
    <button class="w-1/4 bg-amber-50 rounded p-1 my-6 mx-2 font-bold active:bg-amber-400 hover:bg-amber-200 focus:outline-none focus:ring focus:ring-amber-500" type="submit" on:click={() => pause()}>
      {pauseButtonText}
    </button>
    <button class="w-1/4 bg-amber-50 rounded p-1 my-6 mx-2 font-bold active:bg-amber-400 hover:bg-amber-200 focus:outline-none focus:ring focus:ring-amber-500" type="submit" on:click={() => stop()}>
      STOP
    </button>
  </form>

  <label for="textPad" class="text-gray-100">Write something here</label>
  <textarea
    name="textPad"
    id="textPad"
    form="speechForm"
    rows="10"
    placeholder="Enter text here..."
    class="w-full h-full text-amber-700 bg-amber-100 focus:outline-none"
    bind:value={text}
    on:change={() => play()}
  ></textarea>
</div>

<style lang="postcss">
  textarea {
      padding: 15px;
  }
</style>
