import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = () => {
	const isLoggedIn = useSelector(state => state.user.isLoggedIn);
	!isLoggedIn
		? toast('You must log in to continue.', { autoClose: 3000 })
		: null;
	return isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
