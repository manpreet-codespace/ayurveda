import React from 'react'
import EditButton from '../Components/EditButton'
import DeleteButton from '../Components/DeleteButton'

const Disease = () => {
    return (
        <>
            <h1 className='text-[26px] font-semibold px-12'>Categories  of  Disease</h1>
            <section className='bg-white w-11/12 p-10 flex gap-6 mx-auto mt-4 rounded-xl'>
                <input type='text' onChange={(e) => e.target.value} placeholder='Categories of disease' className=' p-2 w-4/12 border border-gray-300 rounded-sm' />
                <button className='px-4 py-2 bg-black text-white font-semibold tracking-widest rounded-lg'>Save</button>
            </section>
            <section className='bg-white w-11/12 p-10 flex flex-col gap-6 mx-auto rounded-xl mt-4'>
                <div>
                    <h2 className='mb-2 font-semibold '>Name of Diseases</h2>
                    <select className='border border-gray-300 p-2 w-3/12 text-sm' >
                        <option value="none">Categories</option>
                        <option value="For Men">For Men</option>
                    </select>
                </div>
                <div className='flex gap-6'>
                    <input type="text" placeholder='Name of Disease' onChange={(e) => e.target.value} className='p-2 w-4/12 border border-gray-300 rounded-sm' />
                    <button className='bg-black text-white px-4 py-2 tracking-wides font-semibold rounded-lg'>Save</button>
                </div>
            </section>

            <section>
                <table className='w-11/12 mx-auto  m-10 bg-white rounded-lg  mt-10'>
                    <tr>
                        <th className='p-2'>Name</th>
                        <th className="p-2">Categories</th>
                        <th className='p-2'>Actions</th>
                    </tr>
                    <tr className='text-center'>
                        <td>Men Health</td>
                        <td>For Men</td>
                        <td className='flex justify-center items-center gap-2 p-2'>
                            <EditButton btn="Edit"/>
                            <DeleteButton deleteBtn="Delete"/>
                        </td>
                    </tr>
                </table>
            </section>
        </>

    )
}


export default Disease