import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from '@remix-run/react';
import GlobalStyle from '~/components/GlobalStyle';
import { getMyAccount, User } from './lib/api/auth';
import { setClientCookie } from './lib/client';

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'New Remix App',
    viewport: 'width=device-width,initial-scale=1',
});

export const loader: LoaderFunction = async ({ request }) => {
    const cookie = request.headers.get('Cookie');
    if (!cookie) {
        return null;
    }

    setClientCookie(cookie);
    return await getMyAccount();
};

export default function App() {
    const data = useLoaderData<User | null>();

    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
                {typeof document === 'undefined' ? '__STYLES__' : null}
            </head>
            <body>
                <GlobalStyle />
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

export function CatchBoundary() {}
