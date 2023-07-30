import { useGoBack } from '~/hooks/useGoBack';
import Header from '~/components/Header';
import HeaderBackButton from '~/components/HeaderBackButton';
import FullHeightPage from '~/components/FullHeightPage';
import AuthForm from '~/components/AuthForm';
import { ActionFunction, json } from '@remix-run/node';
import { login } from '~/lib/api/auth';
import { AppError, extractError } from '~/lib/error';
import { ThrownResponse, useCatch } from '@remix-run/react';

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const username = form.get('username');
    const password = form.get('password');

    if (typeof username !== 'string' || typeof password !== 'string') {
        return;
    }

    try {
        const { headers, result } = await login({ username, password });
        return json(result, {
            headers,
        });
    } catch (e) {
        const error = extractError(e);
        throw json(error, {
            status: error.statusCode,
        });
    }
};

interface Props {
    error?: AppError;
}

export default function Login({ error }: Props) {
    const goBack = useGoBack();
    return (
        <FullHeightPage>
            <Header title="로그인" headerLeft={<HeaderBackButton onClick={goBack} />} />
            <AuthForm mode="login" error={error} />
        </FullHeightPage>
    );
}

export function CatchBoundary() {
    const caught = useCatch<ThrownResponse<number, AppError>>();
    console.log(caught);

    return <Login error={caught.data} />;
}
