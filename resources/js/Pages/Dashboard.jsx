import BlueButton from '@/Components/BlueButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ userData }) {
    console.log(userData);
    return (
        <AuthenticatedLayout
            user={userData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Hey, {userData?.name} Welcome to Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex justify-between items-center px-5">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                        {
                            (userData?.roles.some(role => role.name === 'seller' || role.name === 'consumer')) ? (
                                <div>
                                    <BlueButton link={'sellProduct.create'}>
                                        Show all Product
                                    </BlueButton>
                                </div>
                            ) : (
                                <div>
                                    <div>
                                        <BlueButton link={'product.create'}>
                                            Add Product
                                        </BlueButton>
                                    </div>
                                    <div>
                                        <BlueButton link={'permission.create'}>
                                            Permission
                                        </BlueButton>
                                    </div>
                                    <div>
                                        <BlueButton link={'role.create'}>
                                            Role
                                        </BlueButton>
                                    </div>
                                </div>

                            )
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}