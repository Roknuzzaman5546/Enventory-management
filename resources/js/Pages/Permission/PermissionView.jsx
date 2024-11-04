import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react'
import React from 'react'

const PermissionView = ({ auth, permissionRoleData }) => {
    // console.log(permissionRoleData)
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="RoleCreate" />
            <div className=' text-xl font-bold'>PermissionView route</div>
            <div>
            </div>
        </AuthenticatedLayout >
    )
}

export default PermissionView;