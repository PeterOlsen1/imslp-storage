<script>
    import { goto } from "$app/navigation";
    import AuthClient from "$lib/db/authClient";
    import DbClient from "$lib/db/dbClient";

    const authClient = new AuthClient();
    const dbClient = new DbClient();

    async function login() {
        try {
            let user = await authClient.loginWithGoogle();
            if (user) {
                const user = authClient.getUser();
                if (!user) return;

                dbClient.createUser(user);
                goto('/home');
            }
            else {
                throw new Error("Login failed, user is null");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    }
</script>

<div class="w-full h-screen overflow-hidden flex items-center justify-center flex-col gap-10">
    <div class="text-center">
        <div class="text-3xl font-[600]">
            IMSLP Storage
        </div>
        <br>
        <div>
            Ditch the unnecessary tabs, keep all your music in one place.
            <br>
            Login below to get started.
        </div>
    </div>
    <button onclick={login} class="bg-white text-stone-900 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer">
        login with google
    </button>
</div>