import { Button, Modal, Table, TableHead } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashUsers() {

    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    useEffect(() => {
        const fetchUsers = async () =>{
            try {
                const res = await fetch(`/api/user/getusers`);
                const data = await res.json();
                if(res.ok){
                    setUsers(data.users);
                    if(data.users.length < 9){
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if(currentUser.isAdmin){
            fetchUsers();
        }
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = users.length;
        try {
            const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
            const data = await res.json();
            if(res.ok){
                setUsers((prev) => [...prev, ...data.users]);
                if(data.users.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

     const handleDeleteUser = async () =>{
         setShowModal(false);
         try {
            const res = await fetch(`/api/user/delete/${userIdToDelete}`,
            {
                method: 'DELETE',
            });
            const data = await res.json();
            if(!res.ok) {
                console.log(data.message);
            }else {
                setUsers((prev) => 
                    prev.filter((user) => user._id !== userIdToDelete)
                );
                // Fetch one more user
                    const startIndex = users.length - 1; // Adjust start index after deletion
                    const moreUsersRes = await fetch(`/api/user/getusers?startIndex=${startIndex}&limit=1`);
                    const moreUsersData = await moreUsersRes.json();
                    if (moreUsersRes.ok && moreUsersData.users.length > 0) {
                        setUsers((prev) => [...prev, ...moreUsersData.users]);
                    } else {
                            setShowMore(false); // If no more users to load
                        }
                    }
        } catch (error) {
            console.log(error.message);
        }
    }
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar
     scrollbar-track-slate-100 scrollbar-thumb-slate-300
      dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
        {currentUser.isAdmin && users.length >0 ? (
            <>
            <Table hoverable className='shadow-md'>
                <Table.Head>
                    <Table.HeadCell>date created</Table.HeadCell>
                    <Table.HeadCell>user image</Table.HeadCell>
                    <Table.HeadCell>username</Table.HeadCell>
                    <Table.HeadCell>email</Table.HeadCell>
                    <Table.HeadCell>admin</Table.HeadCell>
                    <Table.HeadCell>delete</Table.HeadCell>
                </Table.Head>
                {users.map((user) => (
                    <Table.Body className='divide-y' key={user._id}>
                        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                            <Table.Cell>
                                    <img src={user.profilePicture} alt={user.username} className='w-10 h-10 object-cover bg-gray-500 rounded-full'/>
                            </Table.Cell>
                            <Table.Cell>
                                {user.username}
                            </Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{user.isAdmin ? (<FaCheck className='text-green-500' />) : (<FaTimes className='text-red-500' />)}</Table.Cell>
                            <Table.Cell>
                                <span onClick={() =>{
                                    setShowModal(true);
                                    setUserIdToDelete(user._id)
                                }} className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                            </Table.Cell>
                            </Table.Row>
                    </Table.Body>
                ))}
            </Table>
            {
                showMore && (
                    <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>show more</button>
                )
            }
            </>
        ) : (
            <p>You have no users yet!</p>
        )}
        <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
            <Modal.Header/>
            <Modal.Body>
                <div className='text-center'>
                    <HiOutlineExclamationCircle className='w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                    <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this user?</h3>
                    <div className='flex justify-center gap-20'>
                        <Button color='failure' onClick={handleDeleteUser}>Yes, I am sure</Button>
                        <Button color ='gray' onClick={()=>setShowModal(false)}>No, Cancel</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>
  )
}
