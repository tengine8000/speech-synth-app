<script>
  import SpeechForm from "./SpeechForm.svelte";
   export let voices;
</script>

<div class="container w-full h-full">
<SpeechForm voices={voices}/>
</div>