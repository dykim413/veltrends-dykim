import { useGoBack } from '~/hooks/useGoBack';
import Header from '~/components/Header';
import HeaderBackButton from '~/components/HeaderBackButton';
import FullHeightPage from '~/components/FullHeightPage';
import AuthForm from '~/components/AuthForm';
import { ActionFunction, json } from '@remix-run/node';

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const username = form.get('username');
    const password = form.get('password');

    return json({
        username,
        password,
    });
};

export default function Login() {
    const goBack = useGoBack();
    return (
        <FullHeightPage>
            <Header title="로그인" headerLeft={<HeaderBackButton onClick={goBack} />} />
            <AuthForm mode="login" />
        </FullHeightPage>
    );
}
