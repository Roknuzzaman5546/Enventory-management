import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react'
import BlueButton from '@/Components/BlueButton';
import SlateButton from '@/Components/SlateButton';

const List = ({ auth, permission }) => {
  console.log(permission.data)
  return (
    <AuthenticatedLayout
      user={auth.user}
    >
      <Head title="Dashboard" />
      <div className=' flex justify-between items-center'>
        <div className=' text-xl font-bold'>Role List route</div>
        <div>
          <BlueButton link={'role.create'} />
        </div>
      </div>
      <div className='overflow-auto whitespace-nowrap card-shadow-2 border border-[#919EAB33] border-b rounded-xl'>
        <table className='w-full text-[#333333]'>
          <thead className=' bg-white'>
            <tr className='text-left p-4 justify-between ml-5'>
              <th className='px-3 py-4'>Id</th>
              <th className='px-3 py-4'>Name</th>
              <th className='px-3 py-4'>guard_name</th>
              <th className='px-3 py-4'>created_at</th>
              <th className='px-3 py-4'>Edit</th>
              <th className='px-3 py-4'>Delete</th>
              <th className='px-3 py-4'>View</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              permission?.data?.map((item) => (
                <tr key={item.id} className='text-left p-4 border-dotted border-b border-[#919EAB]'>
                  <td className='px-3 py-4'>{item.id}</td>
                  <td className='px-3 py-4'>{item.name}</td>
                  <td className='px-3 py-4'>{item.guard_name}</td>
                  <td className='px-3 py-4'>{item.created_at}</td>
                  <td className='px-3 py-4'><SlateButton>Edit</SlateButton></td>
                  <td className='px-3 py-4'><SlateButton>Delete</SlateButton></td>
                  <td className='px-3 py-4'><SlateButton>View</SlateButton></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout >
  )
}

export default List