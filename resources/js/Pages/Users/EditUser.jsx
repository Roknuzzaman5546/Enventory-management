import React from 'react';
import { useForm } from '@inertiajs/react';

export default function EditUser({ user, roles, userRole }) {
    const { data, setData, put, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
        roles: userRole || [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('users.update', user.id));
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Edit User</h2>
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

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                    <select
                        multiple
                        className="form-control w-full border rounded py-2 px-3"
                        value={data.roles}
                        onChange={(e) =>
                            setData('roles', Array.from(e.target.selectedOptions, (option) => option.value))
                        }
                    >
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
