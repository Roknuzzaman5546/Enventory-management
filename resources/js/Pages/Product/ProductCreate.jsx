import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react'
import BlueButton from '@/Components/BlueButton';
import SlateButton from '@/Components/SlateButton';
import Swal from 'sweetalert2';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

const ProductCreate = ({ auth }) => {
    const { data, setData, post, processing, errors, reset, } = useForm({
        name: '',
        details: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('product.store'), {
            onSuccess: () => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Role is create Successfully",
                    showConfirmButton: false,
                    timer: 2000
                });
            },
            onError: (errors) => {
                console.log(errors)
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
            user={auth.user}
        >
            <Head title="Dashboard" />
            <div className=' flex justify-between items-center'>
                <div className=' text-xl font-bold'>Product Add route</div>
                <div>
                    <BlueButton link={'permission.create'}>
                        Product
                    </BlueButton>
                </div>
            </div>
            <div className='w-[45%] mx-auto mt-8 bg-slate-300 py-6 px-14 rounded-md'>
                <h2 className=' text-lg font-semibold my-3 text-center'>Add Product</h2>
                <form onSubmit={submit} >
                    <div>
                        <InputLabel htmlFor="name" value="Product Name*" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
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
                        <InputLabel htmlFor="details" value="Product Details" />
                        <TextInput
                            id="details"
                            name="name"
                            value={data.details}
                            placeholder={'add your product details'}
                            className="mt-1 block w-full"
                            autoComplete="details"
                            isFocused={true}
                            onChange={(e) => setData('details', e.target.value)}
                            required
                        />
                        <InputError message={errors.details} className="mt-2" />
                    </div>
                    <SlateButton className=' mt-5'>
                        Add
                    </SlateButton>
                </form>
            </div>
        </AuthenticatedLayout >
    )
}

export default ProductCreate;