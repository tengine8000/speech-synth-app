<script>
  import { onMount } from "svelte";
  import SpeechContainer from "../components/SpeechContainer.svelte";

  let voices = [];
  let browserSpeechSupport = false;

  onMount(() => {
    speechSynthesis.onvoiceschanged = () => {
        // voices = speechSynthesis.getVoices().filter((voice) => voice.lang === "en-US");
        const uniqueLang = voices.map(voice => voice.lang);
        console.log("Unique Languages",uniqueLang);

        voices = speechSynthesis.getVoices();

        if(voices.length === 0 ){
          console.log("Browser does not support voice speechSynthesis, Bro!");
        }else {
          browserSpeechSupport = true;
          // console.table(voices);
        }

    };
  })


</script>
<div>
  <h1 class="text-4xl font-bold text-gray-100 my-6">
    🙉 Speak to Me
  </h1>
  {#if browserSpeechSupport}
    <i class="text-green-500 font-serif px-2">Hurray! Your browser supports speech synthesis.</i>
    <SpeechContainer voices={voices}/>
  {:else }
    <i class="text-red-500 font-serif px-2 ">Oops! No support for speech synthesis on this browser. Try latest Chrome browser.</i>
  {/if}
</div>

<style lang="postcss">
    /** {*/
    /*    border: solid red 2px;*/
    /*}*/
</style>

