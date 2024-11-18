import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react'
import BlueButton from '@/Components/BlueButton';
import SlateButton from '@/Components/SlateButton';
import Swal from 'sweetalert2';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

const ProductSell = ({ userData, product }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: product.name,
        quantity: '',
        status: product.status,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('product.sell.update', product.id), {
            onSuccess: () => {
            },
            onError: (errors) => {
                // console.log(errors)
                if (errors) {
                    Swal.fire({
                        title: 'Error!',
                        text: errors.name ? errors.name : errors.email,
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                }
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={userData}
        >
            <Head title="Dashboard" />
            <div className=' flex justify-between items-center'>
                <div className=' text-xl font-bold'>Product Sell route</div>
                <div>
                    <BlueButton link={'product.index'}>
                        All Product
                    </BlueButton>
                </div>
            </div>
            <div className='w-[45%] mx-auto mt-8 bg-slate-300 py-6 px-14 rounded-md'>
                <h2 className=' text-lg font-semibold my-3 text-center'>Sell Product</h2>
                <form onSubmit={submit} >
                    <div>
                        <InputLabel htmlFor="name" value="Product Name*" />
                        <TextInput
                            id="name"
                            name="name"
                            value={product.name}
                            placeholder={'Product name'}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className='mt-4'>
                        <InputLabel htmlFor="quantity" value="Product Quantity*" />
                        <TextInput
                            id="quantity"
                            name="quantity"
                            value={data.quantity}
                            placeholder={'Product quantity'}
                            type="number"
                            className="mt-1 block w-full"
                            autoComplete="quantity"
                            isFocused={true}
                            onChange={(e) => setData('quantity', e.target.value)}
                            required
                        />
                        <InputError message={errors.quantity} className="mt-2" />
                    </div>
                    <SlateButton className=' mt-5'>
                        Sell
                    </SlateButton>
                </form>
            </div>
        </AuthenticatedLayout >
    );
};

export default ProductSell;