import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../../Components/Message';
import Loader from '../../Components/Loader';
import { toast } from 'react-toastify';
import { useGetUsersQuery, useDeleteUserMutation } from '../../Slices/usersApiSlice';


const UserListScreen = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  
    const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();
  
    const deleteHandler = async (id) => {
      if (window.confirm('Are you sure you want to delete this user?')) {
        try {
          await deleteUser(id);
          refetch();
          toast.success("User deleted successfully");
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    };
  

    return <>
        <h1>Users</h1>
        {loadingDelete && <Loader />}
        {isLoading ? (<Loader />) : error ? (<Message variant="danger">{error}</Message>
        ) : (
            <Table striped hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { users.map((user) => (
                        <tr key={user._id}>
                             <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>
                                { user.isAdmin ? (
                                    <FaCheck style={{ color: 'green' }} />
                                ) : (
                                    <FaTimes style={{ color: 'red' }} />
                                    )}
                            </td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button className='btn-sm' variant='info'>
                                        <FaEdit />
                                    </Button>
                                </LinkContainer>
                                <Button 
                                    variant='danger'
                                    className='btn-sm'
                                    style={{ marginLeft: '8px' }}
                                    onClick={() => deleteHandler(user._id)}
                                    >
                                        <FaTrash style={{ color: 'white' }} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>
};

export default UserListScreen;