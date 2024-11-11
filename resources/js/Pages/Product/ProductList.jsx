import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react'
import BlueButton from '@/Components/BlueButton';
import SlateButton from '@/Components/SlateButton';
import Swal from 'sweetalert2';

const ProductList = ({ auth, products }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Product | list" />
            <div className=' flex justify-between items-center'>
                <div className=' text-xl font-bold'>Product List route</div>
            </div>
            <div className='overflow-auto whitespace-nowrap card-shadow-2 border border-[#919EAB33] border-b rounded-xl mt-5'>
                <table className='w-full text-[#333333]'>
                    <thead className=' bg-white'>
                        <tr className='text-left p-4 justify-between ml-5'>
                            <th className='px-3 py-4'>Id</th>
                            <th className='px-3 py-4'>Name</th>
                            <th className='px-3 py-4'>Quantity</th>
                            <th className='px-3 py-4'>Status</th>
                            <th className='px-1 py-4'>Acchept</th>
                            <th className='px-1 py-4'>Reject</th>
                            <th className='px-1 py-4'>Delete</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map((item) => (
                                <tr key={item.id} className='text-left p-4 border-dotted border-b border-[#919EAB]'>
                                    <td className='px-3 py-4'>{item.id}</td>
                                    <td className='px-3 py-4'>{item.name}</td>
                                    <td className='px-3 py-4'>{item?.quantity}</td>
                                    <td className='px-3 py-4'>{item?.status}</td>
                                    <td className='px-1 py-3'><Link><SlateButton>Acchept</SlateButton></Link></td>
                                    <td className='px-1 py-3'><Link><SlateButton>Reject</SlateButton></Link> </td>
                                    <td className='px-1 py-3'><SlateButton>Delete</SlateButton></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout >
    )
}

export default ProductList;