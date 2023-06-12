import { error } from "@sveltejs/kit";


export const actions = {
    verify: async ({ request, locals }: any) => {
        const body = Object.fromEntries(await request.formData())

        try {
            await locals.pb.collection('users').requestVerification(body.email);
            return {
                success: true
            }
        } catch (err) {
            console.log('Error: ', err)
            throw error(500, "Something went wrong")
        }
    }
}