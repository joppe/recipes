import Link from 'next/link';

export default function Home(): JSX.Element {
    return (
        <div>
            <h1>week menu</h1>

            <nav>
                <ul>
                    <li>
                        <Link href="/recipes">
                            <a>Recepten</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/ingredients">
                            <a>Ingredienten</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/units">
                            <a>Eenheden</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
