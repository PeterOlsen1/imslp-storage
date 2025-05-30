<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
</script>

<div class="w-full h-screen overflow-hidden bg-stone-900 text-white flex items-center justify-center flex-col">
	{@render children()}
</div>
