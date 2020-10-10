import { useRouter } from 'next/router';

export default function Ingredients(): JSX.Element {
    const router = useRouter();

    return (
        <div>
            <h1>ingredient {router.query.name}</h1>
        </div>
    );
}
