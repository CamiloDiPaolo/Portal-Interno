<script lang="ts">
	import { fade } from 'svelte/transition';

	export let type: string;
	export let message: string;
</script>

<div
	transition:fade
	id="toast-undo"
	class={`flex items-center p-4 w-auto max-w-xs text-gray-900 ${
		type == 'success' ? 'bg-lime-500' : 'bg-rose-600'
	} rounded-lg shadow absolute bottom-2 left-1 z-50`}
	role="alert"
>
	<div class="text-sm font-normal">
		{message}
	</div>
</div>
