import { generateUsername } from '$lib/utils'
import { error, redirect } from '@sveltejs/kit'


export const actions = {
	register: async ({ locals, request }: any) => {
        const body = Object.fromEntries(await request.formData())

        let username = generateUsername(body.name.split(' ').join('')).toLowerCase();

        try {
            await locals.pb.collection('users').create({ username, ...body });
            await locals.pb.collection('users').requestVerification(body.email);
        } catch (err) {
            console.log('Error ', err)  
            throw error(500, 'Something went wrong')
        }

        throw redirect(303, '/login')
    },

    verify: async ({ locals, request }: any) => {
        const body = Object.fromEntries(await request.formData())
        return {
            notVerified: true
        }
    }
}