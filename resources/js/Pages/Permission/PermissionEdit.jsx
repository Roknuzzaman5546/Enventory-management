import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SlateButton from '@/Components/SlateButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react'
import React from 'react'
import Swal from 'sweetalert2';

const PermissionEdit = ({ auth, permission }) => {
    console.log(permission.name)
    const { data, setData, post, processing, errors, reset, } = useForm({
        name: permission.name
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('role.update', permission.id), {
            onSuccess: () => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Role is update Successfully",
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
            <div className=' text-xl font-bold'>PermissionEdit route</div>
            <div className=' w-[50%] mx-auto mt-8 bg-slate-300 py-6 px-12 rounded-md'>
                <h2 className=' text-lg font-semibold my-3 text-center'>Edit Role</h2>
                <form onSubmit={submit} >
                    {
                        permission?.name ? (
                            <div>
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    defaultValue={permission.name}  // Set the initial default value
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}  // Handle change
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                        ) : ""
                    }
                    <SlateButton className=' mt-5'>
                        Update
                    </SlateButton>


                </form>
            </div>

        </AuthenticatedLayout >
    )
}


export default PermissionEdit