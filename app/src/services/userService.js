export const fetchCurrentUserData = async (username) => {
    try {
        const response = await fetch('http://localhost:5050/users');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        return users.find(user => user.username === username) || null;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}; 