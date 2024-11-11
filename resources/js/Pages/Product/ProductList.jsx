import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react'
import BlueButton from '@/Components/BlueButton';
import SlateButton from '@/Components/SlateButton';
import Swal from 'sweetalert2';

const ProductList = ({ auth }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />
            <div className=' flex justify-between items-center'>
                <div className=' text-xl font-bold'>Product List route</div>
                <div>
                    <BlueButton link={'permission.create'}>
                        Product
                    </BlueButton>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}

export default ProductList