<script lang="ts">
    import { goto } from "$app/navigation";
    import AuthClient from "$lib/db/authClient";
    import DbClient from "$lib/db/dbClient";
    import { onMount } from "svelte";
    

    let data: any = $state({});
    let title: string = $state("");
    let pdfUrl: string = $state("");

    const dbClient = new DbClient();
    const authClient = new AuthClient();

    function addPdf() {
        if (!title || !pdfUrl) {
            alert("Please fill in both fields.");
            return;
        }

        const newSheet = { title, url: pdfUrl };
        data.sheets = [...(data.sheets || []), newSheet];

        const user = authClient.getUser();
        if (!user) {
            alert("User not authenticated. Please log in.");
            return;
        }

        dbClient.addSheetToUser(user.uid, title, pdfUrl);
        
        // Reset input fields
        title = "";
        pdfUrl = "";
    }

    onMount(async () => {
        const user = await authClient.awaitUser();

        if (!user) {
            goto('/');
            return;
        }
        
        data = await dbClient.getUserData(user.uid);
        console.log(data);
    });
</script>

<div class="w-full h-screen overflow-hidden flex items-center flex-col gap-10">
    <div class="w-full py-4 flex justify-evenly align-center">
        <div class="flex items-center gap-2 font-[600]">
            Piece title:
            <input type="text" class="border border-gray-300 px-1 font-normal" bind:value={title}/>
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
    <div class="w-full h-full overflow-y-auto flex flex-col items-center">
        {#if data.sheets && data.sheets.length > 0}
            <div class="text-2xl font-semibold mb-4">Your Library</div>
            <div class="w-[90%] ml-auto mr-auto flex flex-wrap justify-center gap-4">
                {#each data.sheets as piece}
                    <div class="mb-4 p-4 border border-gray-300 rounded-md flex flex-col items-center">
                        <div class="text-lg font-semibold">{piece.title}</div>
                        <a href={piece.url} target="_blank" class="text-blue-600 hover:underline">View PDF</a>
                    </div>
                {/each}
            </div>
        {:else}
            <div class="text-center text-gray-500">No pieces found in your library.</div>
        {/if}
        </div>  
</div>