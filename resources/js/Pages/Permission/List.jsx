import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react'
import BlueButton from '@/Components/BlueButton';
import SlateButton from '@/Components/SlateButton';
import Swal from 'sweetalert2';

const List = ({ auth, permission }) => {
  const { post } = useForm({
  });

  const handleDelete = (id) => {
    console.log("here id", id)
    post(route('permission.destroy', id), {
      preserveScroll: true,
      onSuccess: () => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "permission deleted successfully",
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
        <div className=' text-xl font-bold'>Permission List route</div>
        <div>
          <BlueButton link={'permission.create'}>
            Permissition
          </BlueButton>
        </div>
      </div>
      <div className='overflow-auto whitespace-nowrap card-shadow-2 border border-[#919EAB33] border-b rounded-xl mt-5'>
        <table className='w-full text-[#333333]'>
          <thead className=' bg-white'>
            <tr className='text-left p-4 justify-between ml-5'>
              <th className='px-3 py-4'>Id</th>
              <th className='px-3 py-4'>Name</th>
              <th className='px-3 py-4'>guard_name</th>
              <th className='px-3 py-4'>created_at</th>
              <th className='px-1 py-4'>Edit</th>
              <th className='px-1 py-4'>Delete</th>
              <th className='px-1 py-4'>View</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              permission?.map((item) => (
                <tr key={item.id} className='text-left p-4 border-dotted border-b border-[#919EAB]'>
                  <td className='px-3 py-4'>{item.id}</td>
                  <td className='px-3 py-4'>{item.name}</td>
                  <td className='px-3 py-4'>{item.guard_name}</td>
                  <td className='px-3 py-4'>{new Date(item.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</td>
                  <td className='px-1 py-3'><Link href={route('permission.edit', item.id)}><SlateButton>Edit</SlateButton></Link></td>
                  <td className='px-1 py-3' onClick={() => handleDelete(item.id)}><Link><SlateButton>Delete</SlateButton></Link> </td>
                  <td className='px-1 py-3'><SlateButton href={('permission.view')}>View</SlateButton></td>
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