import { useRouter } from 'next/router';

export default function Recipes(): JSX.Element {
    const router = useRouter();

    return (
        <div>
            <h1>recept {router.query.name}</h1>
        </div>
    );
}
