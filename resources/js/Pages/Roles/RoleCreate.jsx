import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SlateButton from '@/Components/SlateButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';

const RoleCreate = ({ auth, permissition }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        permissions: [] // Initialize permissions as an array
    });

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            // Add the permission to the array
            setData('permissions', [...data.permissions, value]);
        } else {
            // Remove the permission from the array
            setData('permissions', data.permissions.filter((permission) => permission !== value));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('role.store'), {
            onSuccess: () => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Role is created Successfully",
                    showConfirmButton: false,
                    timer: 2000
                });
                reset(); // Optional: reset the form on success
            },
            onError: (errors) => {
                console.log(errors);
                if (errors) {
                    Swal.fire({
                        title: 'Error!',
                        text: errors.name ? errors.name : errors.email,
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    });
                }
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="RoleCreate" />
            <div className="text-xl font-bold">RoleCreate route</div>
            <div className="w-[50%] mx-auto mt-8 bg-slate-300 py-6 px-12 rounded-md">
                <h2 className="text-lg font-semibold my-3 text-center">Create Role</h2>
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
                    <div className="flex justify-between items-center mt-3">
                        {permissition.map((item) => (
                            <div key={item.id} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    className="rounded-md cursor-pointer"
                                    name="permissions"
                                    id={item.id}
                                    value={item.name}
                                    checked={data.permissions.includes(item.name)}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor={item.id}>{item.name}</label>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5">
                        <SlateButton>
                            Create
                        </SlateButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default RoleCreate;
