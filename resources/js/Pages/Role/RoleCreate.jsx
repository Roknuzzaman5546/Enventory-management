import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react'
import React from 'react'

const RoleCreate = ({ auth }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />
            <div>RoleCreate route</div>
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
            </form>
        </AuthenticatedLayout >
    )
}

export default RoleCreate