<script lang="ts">
    import { goto } from "$app/navigation";
    import AuthClient from "$lib/db/authClient";
    import DbClient from "$lib/db/dbClient";
    import { onMount } from "svelte";
    

    let data: any = $state({});
    let name: string = $state("");
    let pdfUrl: string = $state("");

    const dbClient = new DbClient();
    const authClient = new AuthClient();

    function addPdf() {
        if (!name || !pdfUrl) {
            alert("Please fill in both fields.");
            return;
        }

        const newSheet = { name, pdfUrl };
        data.sheets = [...(data.sheets || []), newSheet];

        const user = authClient.getUser();
        if (!user) {
            alert("User not authenticated. Please log in.");
            return;
        }

        dbClient.addSheetToUser(user.uid, name, pdfUrl);
        
        // Reset input fields
        name = "";
        pdfUrl = "";
    }

    onMount(async () => {
        const user = await authClient.awaitUser();

        if (!user) {
            goto('/');
            return;
        }
        
        data = await dbClient.getUserData(user.uid);
    });
</script>

<div class="w-full h-screen overflow-hidden flex items-center flex-col gap-10">
    <div class="w-full py-4 flex justify-evenly align-center">
        <div class="flex items-center gap-2 font-[600]">
            Piece name:
            <input type="text" class="border border-gray-300 px-1 font-normal" bind:value={name}/>
        </div>
        <div class="flex items-center gap-2 font-[600]">
            PDF URL:
            <input type="text" class="border border-gray-300 px-1 font-normal" bind:value={pdfUrl}/>
        </div>
        <div>
            <button class="bg-white text-stone-900 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
            onclick={addPdf}>
                Add to library
            </button>
        </div>
    </div>

    <br>
    <div class="w-full h-full overflow-y-auto">
        {#if data.sheets && data.sheets.length > 0}
            <ul>
                {#each data.sheets as piece}
                    <li class="border-b border-gray-200 py-2 px-4">
                        <div class="text-lg font-semibold">{piece.title}</div>
                        <a href={piece.pdfUrl} target="_blank" class="text-blue-600 hover:underline">View PDF</a>
                    </li>
                {/each}
            </ul>
        {:else}
            <div class="text-center text-gray-500">No pieces found in your library.</div>
        {/if}
        </div>  
</div>