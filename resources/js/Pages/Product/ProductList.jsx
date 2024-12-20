import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import SlateButton from '@/Components/SlateButton';
import Swal from 'sweetalert2';

const ProductList = ({ auth, products }) => {
    const [product, setProduct] = useState(null)
    const { data, setData, post, processing } = useForm({
        status: '',
    });
    const updateStatus = (productId, status) => {
        setData('status', status)
        if (product == status) {
            post(route('product.update', productId), {
                preserveScroll: true,
                onSuccess: () => {
                    Swal.fire({
                        icon: 'success',
                        title: status === 'accepted' ? 'Accepted!' : 'Rejected!',
                        text: `Product has been ${status} .`,
                        timer: 1500,
                        showConfirmButton: false,
                    });
                },
                onError: (errors) => {
                    console.log("Error:", errors);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Something went wrong.',
                    });
                }
            });
        }
    };
    const { props } = usePage();
    const { success } = props;
    const acceptProducts = products.filter((item) => item.status == "accepted")

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Product | List" />
            <div className='flex justify-between items-center'>
                <div className='text-xl font-bold'>Product List</div>
            </div>
            {
                success &&
                <div className='text-center text-green-500 font-bold'>
                    {success}
                </div>
            }

            <div className='overflow-auto whitespace-nowrap card-shadow-2 border border-[#919EAB33] border-b rounded-xl mt-5 mb-10'>
                {
                    auth?.user?.roles[0]?.name == 'seller' ?
                        <table className='w-full text-[#333333]'>
                            <thead className='bg-white'>
                                <tr className='text-left p-4 justify-between ml-5'>
                                    <th className='px-3 py-4'>Id</th>
                                    <th className='px-3 py-4'>Name</th>
                                    <th className='px-3 py-4'>Quantity</th>
                                    <th className='px-1 py-4'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {acceptProducts?.map((item) => (
                                    <tr key={item.id} className='text-left p-4 border-dotted border-b border-[#919EAB]'>
                                        <td className='px-3 py-4'>{item.id}</td>
                                        <td className='px-3 py-4'>{item.name}</td>
                                        <td className='px-3 py-4'>{item.quantity}</td>
                                        <td className='px-1 py-3'
                                            onClick={() => setProduct('accepted')}
                                        >
                                            <Link href={route('product.sell', item.id)}>
                                                <SlateButton
                                                >
                                                    sell
                                                </SlateButton>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        :
                        auth?.user?.roles[0]?.name == 'consumer' ?
                            <table className='w-full text-[#333333]'>
                                <thead className='bg-white'>
                                    <tr className='text-left p-4 justify-between ml-5'>
                                        <th className='px-3 py-4'>Id</th>
                                        <th className='px-3 py-4'>Name</th>
                                        <th className='px-3 py-4'>Quantity</th>
                                        <th className='px-1 py-4'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.map((item) => (
                                        <tr key={item.id} className='text-left p-4 border-dotted border-b border-[#919EAB]'>
                                            <td className='px-3 py-4'>{item.id}</td>
                                            <td className='px-3 py-4'>{item.name}</td>
                                            <td className='px-3 py-4'>{item.quantity}</td>
                                            <td className='px-1 py-3'
                                                onClick={() => setProduct('accepted')}
                                            >
                                                <p>
                                                    <SlateButton
                                                    >
                                                        view
                                                    </SlateButton>
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            :
                            <table className='w-full text-[#333333]'>
                                <thead className='bg-white'>
                                    <tr className='text-left p-4 justify-between ml-5'>
                                        <th className='px-3 py-4'>Id</th>
                                        <th className='px-3 py-4'>Name</th>
                                        <th className='px-3 py-4'>Quantity</th>
                                        <th className='px-3 py-4'>Status</th>
                                        <th className='px-1 py-4'>Accept</th>
                                        <th className='px-1 py-4'>Reject</th>
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
                                                onClick={() => setProduct('accepted')}
                                            >
                                                <p
                                                    onClick={() => updateStatus(item.id, 'accepted')}
                                                    disabled={processing}
                                                >
                                                    <SlateButton
                                                    >
                                                        Accept
                                                    </SlateButton>
                                                </p>
                                            </td>
                                            <td className='px-1 py-3'
                                                onClick={() => setProduct('rejected')}
                                            >
                                                <p
                                                    onClick={() => updateStatus(item.id, 'rejected')}
                                                    disabled={processing}
                                                >
                                                    <SlateButton
                                                    >
                                                        Reject
                                                    </SlateButton>
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                }
            </div>
        </AuthenticatedLayout>
    );
};

export default ProductList;
