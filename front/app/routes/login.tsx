import { useGoBack } from '~/hooks/useGoBack';
import styled from 'styled-components';
import Header from '~/components/Header';
import HeaderBackButton from '~/components/HeaderBackButton';

export default function Login() {
    const goBack = useGoBack();
    return (
        <Page>
            <Header title="로그인" headerLeft={<HeaderBackButton onClick={goBack} />} />
        </Page>
    );
}

const Page = styled.div``;
