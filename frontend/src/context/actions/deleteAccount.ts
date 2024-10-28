import { AuthTokens } from '../types/AuthTypes';


interface UseAccountClosureProps {
    authTokens: AuthTokens | null,
    logoutUser: () => void;
}

export const useAccountClosure = ({ authTokens, logoutUser }: UseAccountClosureProps) => {
    const handleAccountClosure = async () => {
        if (!authTokens) {
            console.error('No auth tokens found. Unable to close account.');
            return;
        }

        try {
            const response = await fetch(import.meta.env.VITE_USER_AUTHE_DELETE_ACCOUNT, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });

            if (response.ok) {
                console.log('Account closed successfully backend');
                logoutUser();
            } else {
                console.error('Failed to close account');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return { handleAccountClosure };
};
