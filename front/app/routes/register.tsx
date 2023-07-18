import { useGoBack } from '~/hooks/useGoBack';
import styled from 'styled-components';
import HeaderBackButton from '~/components/HeaderBackButton';
import Header from '~/components/Header';
import FullHeightPage from '~/components/FullHeightPage';
import AuthForm from '~/components/AuthForm';

export default function Register() {
    const goBack = useGoBack();
    return (
        <FullHeightPage>
            <Header title="회원가입" headerLeft={<HeaderBackButton onClick={goBack} />} />
            <AuthForm mode="register" />
        </FullHeightPage>
    );
}
