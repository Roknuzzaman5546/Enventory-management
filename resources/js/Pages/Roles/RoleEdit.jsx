import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SlateButton from '@/Components/SlateButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';

const RoleEdit = ({ auth, permissions, hasPermissions, role }) => {
    // Initialize `data.permissions` with names from `hasPermissions` if they exist
    const { data, setData, post, processing, errors, reset } = useForm({
        name: role.name,
        permissions: hasPermissions.map(permission => permission) // Get names of existing permissions
    });

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            // Add the permission to the array if checked
            setData('permissions', [...data.permissions, value]);
        } else {
            // Remove the permission from the array if unchecked
            setData('permissions', data.permissions.filter((permission) => permission !== value));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('role.update', role.id), {
            onSuccess: () => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Role has been updated successfully",
                    showConfirmButton: false,
                    timer: 2000
                });
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
            <Head title="Dashboard" />
            <div className="text-xl font-bold">RoleEdit route</div>
            <div className="w-[50%] mx-auto mt-8 bg-slate-300 py-6 px-12 rounded-md">
                <h2 className="text-lg font-semibold my-3 text-center">Edit Role</h2>
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            name="name"
                            defaultValue={role.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="flex justify-between items-center mt-3 flex-wrap">
                        {permissions.map((item) => (
                            <div key={item.id} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    className={`rounded-md cursor-pointer ${hasPermissions.map(permission => (permission == item.name ? `defaultChecked ` : ``))}`}
                                    name="permissions"
                                    id={item.id}
                                    value={item.name}
                                    checked={data.permissions.includes(item.name)} // Check if in `data.permissions`
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor={item.id}>{item.name}</label>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5">
                        <SlateButton>
                            Update
                        </SlateButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default RoleEdit;
