import { useGoBack } from '~/hooks/useGoBack';
import styled from 'styled-components';
import HeaderBackButton from '~/components/HeaderBackButton';
import Header from '~/components/Header';
import FullHeightPage from '~/components/FullHeightPage';
import AuthForm from '~/components/AuthForm';
import {
    ActionFunction,
    json,
    createCookie,
    Response,
    Headers,
    unstable_composeUploadHandlers,
} from '@remix-run/node';
import { register } from '~/lib/api/auth';
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
        const { headers, result } = await register({ username, password });
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

export default function Register({ error }: Props) {
    const goBack = useGoBack();
    return (
        <FullHeightPage>
            <Header title="회원가입" headerLeft={<HeaderBackButton onClick={goBack} />} />
            <AuthForm mode="register" error={error} />
        </FullHeightPage>
    );
}

export function CatchBoundary() {
    const caught = useCatch<ThrownResponse<number, AppError>>();
    return <Register error={caught.data} />;
}
