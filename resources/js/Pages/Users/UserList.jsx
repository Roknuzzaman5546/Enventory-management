import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';

export function UserList({ auth, userData }) {
    const { data, setData, post, processing, success } = useForm({
        status: '',
    });
    console.log(success);

    // const handleDelete = (id) => {
    //     if (confirm('Are you sure you want to delete this user?')) {
    //         Inertia.delete(route('users.destroy', id));
    //     }
    // };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Product | List" />

            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-4">
                    <div className='text-xl font-bold'>Product List</div>
                    <Link
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                    href={route('users.create')}
                    >
                        Create New User
                    </Link>
                </div>

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        <p>{success}</p>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 border-b">Id</th>
                                <th className="px-4 py-2 border-b">Name</th>
                                <th className="px-4 py-2 border-b">Email</th>
                                <th className="px-4 py-2 border-b">Roles</th>
                                <th className="px-4 py-2 border-b" width="280px">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData?.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b text-center">{user.id}</td>
                                    <td className="px-4 py-2 border-b">{user.name}</td>
                                    <td className="px-4 py-2 border-b">{user.email}</td>
                                    <td className='px-3 py-4'>{user?.roles?.map((role) => <div key={role.id}>{`${role.name},`}</div>)}</td>
                                    <td className="px-4 py-2 border-b space-x-2">
                                        <Link
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded text-sm"
                                        href={route('users.edit', user.id)}
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded text-sm"
                                        // onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default UserList;
