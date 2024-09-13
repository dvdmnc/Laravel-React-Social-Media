import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {

    return (
        <>
            <Head title="Accueil" />
            <header className='flex justify-between items-center p-4'>
                <img src='/images/reseaux-sociaux.png' width='42' height='42' />
                <nav >
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#000000] "
                        >
                            Fil d'actualité
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#000000] "
                            >
                                Connexion
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#000000] "
                            >
                                S'enregistrer
                            </Link>
                        </>
                    )}
                </nav>
            </header>
        </>
    );
}
