import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminRoute = () => {
	const isAdmin = useSelector(state => state.user.isAdmin);
	!isAdmin
		? toast('You do not have permission to access', { autoClose: 3000 })
		: null;
	return isAdmin ? <Outlet /> : <Navigate to='/main-home' />;
};

export default AdminRoute;
