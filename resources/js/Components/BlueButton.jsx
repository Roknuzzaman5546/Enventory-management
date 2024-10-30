import { Link } from '@inertiajs/react'
import React from 'react'

const BlueButton = ({ link }) => {
    return (
        <div>
            <Link href={route(link)} className="bg-blue-500 p-3 rounded">Role</Link>
        </div>
    )
}

export default BlueButton