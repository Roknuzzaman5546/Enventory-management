import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function EditUser({ auth, user, roles, userRole }) {
    const { data, setData, post, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
        roles: userRole || [],
    });
    console.log(roles, userRole);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('users.update', user.id));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            // Add the permission to the array if checked
            setData('roles', [...data.roles, value]);
        } else {
            // Remove the permission from the array if unchecked
            setData('roles', data.roles.filter((permission) => permission !== value));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Product | List" />
            <div className="container mx-auto p-6">
                <div className='flex justify-between items-center'>
                    <div className='text-xl font-bold'>Product List</div>
                    <a href={route('users.index')} className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded">
                        Back
                    </a>
                </div>
                {Object.keys(errors).length > 0 && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        <strong>Whoops!</strong> There were some problems with your input.
                        <ul>
                            {Object.values(errors).map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            className="form-control w-full border rounded py-2 px-3"
                            placeholder="Name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            className="form-control w-full border rounded py-2 px-3"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            className="form-control w-full border rounded py-2 px-3"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control w-full border rounded py-2 px-3"
                            placeholder="Confirm Password"
                            value={data.confirmPassword}
                            onChange={(e) => setData('confirmPassword', e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-3">
                        {roles.map((item) => (
                            <div key={item.id} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    className={`rounded-md cursor-pointer ${userRole.map(permission => (permission == item.name ? `defaultChecked ` : ``))}`}
                                    name="Role"
                                    id={item.id}
                                    value={item.name}
                                    checked={data.roles.includes(item.name)} // Check if in `data.permissions`
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor={item.id}>{item.name}</label>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
