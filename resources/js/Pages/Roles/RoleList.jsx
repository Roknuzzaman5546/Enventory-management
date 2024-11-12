import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react'
import BlueButton from '@/Components/BlueButton';
import SlateButton from '@/Components/SlateButton';
import Swal from 'sweetalert2';

const RoleList = ({ auth, role }) => {

    const { post } = useForm({
    });

    const handleDelete = (id) => {
        console.log("here id", id)
        post(route('role.destroy', id), {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "role deleted successfully",
                    showConfirmButton: false,
                    timer: 2000
                });
            },
            onError: (errors) => {
                console.log(errors);
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while deleting the student.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            },
        });
    };
    
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />
            <div className=' flex justify-between items-center'>
                <div className=' text-xl font-bold'>RoleList route</div>
                <div>
                    <BlueButton link={'role.create'}>
                        Role
                    </BlueButton>
                </div>
            </div>
            <div className='overflow-auto whitespace-nowrap card-shadow-2 border border-[#919EAB33] border-b rounded-xl mt-5'>
                <table className='w-full text-[#333333]'>
                    <thead className=' bg-white'>
                        <tr className='text-left p-4 justify-between ml-5'>
                            <th className='px-3 py-4'>Id</th>
                            <th className='px-3 py-4'>Name</th>
                            <th className='px-3 py-4'>Permission</th>
                            <th className='px-3 py-4'>created_at</th>
                            <th className='px-1 py-4'>Edit</th>
                            <th className='px-1 py-4'>Delete</th>
                            <th className='px-1 py-4'>View</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            role?.map((item) => (
                                <tr key={item.id} className='text-left p-4 border-dotted border-b border-[#919EAB] h-10'>
                                    <td className='px-3 py-4'>{item.id}</td>
                                    <td className='px-3 py-4'>{item.name}</td>
                                    <td className='px-3 py-4 flex flex-wrap'>{item?.permissions?.map((permission) => <div key={permission.id}>{`${permission.name},`}</div>)}</td>
                                    <td className='px-3 py-4'>{new Date(item.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</td>
                                    <td className='px-1 py-3'><Link href={route('role.edit', item.id)}><SlateButton>Edit</SlateButton></Link></td>
                                    <td className='px-1 py-3' onClick={() => handleDelete(item.id)}><Link><SlateButton>Delete</SlateButton></Link> </td>
                                    <td className='px-1 py-3'><SlateButton>View</SlateButton></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout >
    )
}

export default RoleList