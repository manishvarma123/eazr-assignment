

export const getToken = () =>{
    localStorage.getItem('eazr-token')
}

export function generateStaticParams() {
    try {
        // const res = await fetch('https://eazrdaily.eazr.in/users', {
        //     headers: {
        //         Authorization: `Bearer ${getToken()}`,
        //     },
        // });
        // const json = await res.json();
        // const data = json?.data;

        // // Verify the response format and adjust as needed
        // const users = Array.isArray(data) ? data : data.users; // Modify "data.users" based on the actual API response structure
        const {users} = useSelector((state)=>state.auth);

        // Ensure `users` is an array of objects with an `id` property
        if (!Array.isArray(users)) {
            throw new Error('Expected an array of users');
        }

        return users.map((user) => ({ id: user.id.toString() }));
    } catch (error) {
        console.error('Error in generateStaticParams:', error);
        return []; // Return an empty array to avoid build errors
    }
}