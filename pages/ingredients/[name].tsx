import { useRouter } from 'next/router';

export default function Ingredients(): JSX.Element {
    const router = useRouter();

    console.log(router.query);

    return (
        <div>
            <h1>ingredient {router.query.name}</h1>
        </div>
    );
}
