import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SlateButton from '@/Components/SlateButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react'
import React from 'react'
import Swal from 'sweetalert2';

const RoleCreate = ({ auth }) => {
    const { data, setData, post, processing, errors, reset, } = useForm({
        name: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('role.store'), {
            onSuccess: () => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Role is create Successfully",
                    showConfirmButton: false,
                    timer: 2000
                });
            },
            onError: (errors) => {
                console.log(errors)
                if (errors) {
                    Swal.fire({
                        title: 'Error!',
                        text: errors.name ? errors.name : errors.email,
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                }
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />
            <div className=' text-xl font-bold'>RoleCreate route</div>
            <div className=' w-[50%] mx-auto mt-8 bg-slate-300 py-6 px-12 rounded-md'>
                <h2 className=' text-lg font-semibold my-3 text-center'>Create Role</h2>
                <form onSubmit={submit} >
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
                    <SlateButton className=' mt-5'>
                        Create
                    </SlateButton>
                </form>
            </div>
        </AuthenticatedLayout >
    )
}

export default RoleCreate