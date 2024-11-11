import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react'
import BlueButton from '@/Components/BlueButton';
import SlateButton from '@/Components/SlateButton';
import Swal from 'sweetalert2';

const ProductList = ({ auth, products }) => {
    const { post, processing } = useForm();

    const updateStatus = (productId, status) => {
        post(route('product.update', productId), {
            preserveScroll: true,
            data: { status },
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: status === 'accepted' ? 'Accepted!' : 'Rejected!',
                    text: `Product has been ${status}.`,
                    timer: 1500,
                    showConfirmButton: false,
                });
            },
            onError: () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Something went wrong.',
                });
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Product | List" />
            <div className='flex justify-between items-center'>
                <div className='text-xl font-bold'>Product List</div>
            </div>
            <div className='overflow-auto whitespace-nowrap card-shadow-2 border border-[#919EAB33] border-b rounded-xl mt-5'>
                <table className='w-full text-[#333333]'>
                    <thead className='bg-white'>
                        <tr className='text-left p-4 justify-between ml-5'>
                            <th className='px-3 py-4'>Id</th>
                            <th className='px-3 py-4'>Name</th>
                            <th className='px-3 py-4'>Quantity</th>
                            <th className='px-3 py-4'>Status</th>
                            <th className='px-1 py-4'>Accept</th>
                            <th className='px-1 py-4'>Reject</th>
                            <th className='px-1 py-4'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((item) => (
                            <tr key={item.id} className='text-left p-4 border-dotted border-b border-[#919EAB]'>
                                <td className='px-3 py-4'>{item.id}</td>
                                <td className='px-3 py-4'>{item.name}</td>
                                <td className='px-3 py-4'>{item.quantity}</td>
                                <td className='px-3 py-4'>{item.status}</td>
                                <td className='px-1 py-3'
                                    onClick={() => updateStatus(item.id, 'accepted')}
                                    disabled={processing}
                                >
                                    <SlateButton>
                                        Accept
                                    </SlateButton>
                                </td>
                                <td className='px-1 py-3'
                                    onClick={() => updateStatus(item.id, 'rejected')}
                                    disabled={processing}
                                >
                                    <SlateButton>Reject</SlateButton>
                                </td>
                                <td className='px-1 py-3'>
                                    <SlateButton disabled={processing}>Delete</SlateButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
};

export default ProductList;
