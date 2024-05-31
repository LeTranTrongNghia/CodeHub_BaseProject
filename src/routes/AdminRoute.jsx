import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminRoute = () => {
	const isAdmin = useSelector(state => state.user.isAdmin);
	console.log('🚀 ~ AdminRoute ~ isAdmin:', isAdmin);
	!isAdmin
		? toast('You do not have permission to access this resource', {
				autoClose: 1000,
		  })
		: null;
	return isAdmin ? <Outlet /> : <Navigate to='/' />;
};

export default AdminRoute;
