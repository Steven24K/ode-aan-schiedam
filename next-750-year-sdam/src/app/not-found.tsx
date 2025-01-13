import { Hero } from '@/components/Hero';
import Link from 'next/link';

export default function NotFound() {
    return <main>
        <Hero title={Promise.resolve('Pagina niet gevonden')} color='sunny-yellow'/>
        <div className="flex items-center justify-center h-96">
        <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-2xl text-gray-600 mt-4">Dat is een error</p>
            <p className="text-gray-500 mt-2">Sorry, de pagina waar je naar zoekt bestaat niet meer of is verplaatst.</p>

            <Link className="text-blue-500 hover:underline mt-4 block" href="/">
                Ga terug naar het begin
            </Link>
        </div>
    </div>
    </main>

}